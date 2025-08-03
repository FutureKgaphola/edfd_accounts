"use client";

import { failureMessage, successMessage } from "@/app/notifications/successError";
import { customCheckboxTheme, customInputBoxTheme, customsubmitTheme } from "@/app/SiteTheme/Theme";
import { Alert, Button, Checkbox, Label, Modal, Radio, TextInput, Spinner } from "flowbite-react";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { GiTakeMyMoney } from "react-icons/gi";
import axios from "axios";
import useProfile from "@/app/hooks/useProfile";
import useFetchLeadAddress from "@/app/hooks/useFetchLeadAddress";
import useFetchLeadBanking from "@/app/hooks/useFetchLeadBanking";

interface FormErrors {
  loanType?: string;
  amount?: string;
  tncs?: string;
}

export function ConfirmApplicationModal({ 
  DistID, 
  DistrName,
  user_email,
  regNo,
  companyName, 
  setOpenModal, 
  openModal 
}: { 
  DistID: string,
  DistrName: string,
  user_email: string,
  regNo: string,
  companyName: string,
  setOpenModal: Dispatch<SetStateAction<boolean>>, 
  openModal: boolean 
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: contacts, isLoading: isLoadingContacts } = useProfile();
  const { data: address, isLoading: isLoadingAddress } = useFetchLeadAddress();
  const { data: banking, isLoading: isLoadingBanking } = useFetchLeadBanking();

  const [selectedLoanType, setSelectedLoanType] = useState<string>('Business');
  const [companyDocs, setCompanyDocs] = useState<any[]>([]);
  const [CompanyContacts, setCompanyContacts] = useState<any>();
  const [CompanyAddress, setCompanyAddress] = useState<any>();
  const [CompanyBanking, setCompanyBanking] = useState<any>();
  const [Directors, setDirectors] = useState<any[]>([]);
  const [Amount, setAmount] = useState('');
  const [isUploading, setisUploading] = useState(false);
  const [tncs, setTnCs] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!selectedLoanType) {
      newErrors.loanType = "Please select a loan type";
    }
    
    if (!Amount || isNaN(Number(Amount)) || Number(Amount) < 10000 || Number(Amount) > 50000000) {
      newErrors.amount = "Please enter a valid amount between 10,000 and 50,000,000";
    }
    
    if (!tncs) {
      newErrors.tncs = "You must accept the terms and conditions";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchDocs = async (LoanType: string) => {
    if (!regNo) return [];
    
    try {
      const loanCat_id = ( 
        LoanType === 'Business' ? "0" : 
        LoanType === 'Procurement' ? "1" :
        LoanType === 'Building' ? "2" : 
        LoanType === 'Franchisee' ? "3" : ""
      );
      
      const resp = await axios.get(
        `/api/companies/documents/retrive?regNo=${regNo}&loanCat_id=${loanCat_id}`
      );
      
      return resp.data?.documents || [];
    } catch (error) {
      console.error("Error fetching documents:", error);
      return [];
    }
  };

  const fetchContacts = async (userid: string) => {
    if (!regNo) return;
    
    try {
      const resp = await axios.get(`/api/companies/retrive/getone?reg=${userid}`);
      return resp.data?.company;
    } catch (error) {
      console.error("Error fetching contacts:", error);
      return null;
    }
  };

  const fetchCompanyAddress = async (userid: string, regNo: string) => {
    if (!regNo) return;
    
    try {
      const resp = await axios.get(`/api/companies/retrive/CompanyAddress?id=${userid}&regNo=${regNo}`);
      return resp.data?.user;
    } catch (error) {
      console.error("Error fetching company address:", error);
      return null;
    }
  };

  const fetchCompanyBanking = async (userid: string, regNo: string) => {
    if (!regNo) return;
    
    try {
      const resp = await axios.get(`/api/companies/retrive/banking?id=${userid}&regNo=${regNo}`);
      return resp.data?.user;
    } catch (error) {
      console.error("Error fetching company banking:", error);
      return null;
    }
  };

  const fetchDirectors = async () => {
    if (!regNo) return [];
    
    try {
      const resp = await axios.get(`/api/Directors/retrive?regno=${regNo}`);
      return resp.data?.directors || [];
    } catch (error) {
      console.error("Error fetching directors:", error);
      return [];
    }
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLoanType(event.target.value);
    setErrors({...errors, loanType: undefined});
    
    try {
      const docs = await fetchDocs(event.target.value);
      setCompanyDocs(docs);
    } catch (error) {
      console.error("Error handling loan type change:", error);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    setAmount(value);
    setErrors({...errors, amount: undefined});
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsInitialLoading(true);
        
        const [
          initialDocs, 
          initialContacts, 
          initialAddress, 
          initialBanking, 
          directors
        ] = await Promise.all([
          fetchDocs(selectedLoanType ?? 'Business'),
          fetchContacts(regNo),
          fetchCompanyAddress(user_email, regNo),
          fetchCompanyBanking(user_email, regNo),
          fetchDirectors()
        ]);
        
        setCompanyDocs(initialDocs);
        setCompanyContacts(initialContacts);
        setCompanyAddress(initialAddress);
        setCompanyBanking(initialBanking);
        setDirectors(directors);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    if (regNo && user_email) {
      fetchInitialData();
    }
  }, [selectedLoanType, regNo, user_email]);

  const SubmitApplication = async () => {
    if (!validateForm()) return;
    
    setisUploading(true);
    
    try {
      const response = await axios.post('/api/companies/apply', {
        user_email,
        companyName,
        districtId: DistID,
        regNo,
        amount: Amount,
        loanDocs: selectedLoanType,
        leadContacts: contacts,
        leadAddress: address,
        leadBanking: banking,
        companyDocs,
        Companycontacts: CompanyContacts,
        Companyaddress: CompanyAddress,
        Companybanking: CompanyBanking,
        CompanyDirector: Directors,
      });

      if (response.status === 200 || response.status === 201) {
        successMessage(response.data.message || "Application submitted successfully.");
        router.back();
      } else {
        setSelectedLoanType("Business");
        failureMessage(response.data?.message || "Something went wrong. Please try again.");
      }
    } catch (error: any) {
      setSelectedLoanType("Business");
      console.error("API error:", error);
      const apiMessage = error?.response?.data?.message ||
        error?.message ||
        "An unexpected error occurred.";
      failureMessage(apiMessage);
    } finally {
      setAmount('');
      setSelectedLoanType("Business");
      setisUploading(false);
      setOpenModal(false);
    }
  };

  const formattedAmount = Amount ? Number(Amount).toLocaleString() : '';

  if (isInitialLoading) {
    return (
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Loading Application Details</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col items-center justify-center py-8">
            <Spinner size="xl" />
            <p className="mt-4 text-gray-600">Loading your application data...</p>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal show={openModal} onClose={() =>{
      setOpenModal(false);
      setSelectedLoanType("Business");
    } }>
      <Modal.Header>Confirmation of your details</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <fieldset className="flex max-w-md flex-wrap gap-4">
            <legend className="mb-4 text-nowrap">Choose the loan you want to apply for</legend>
            {errors.loanType && (
              <p className="text-red-500 text-sm -mt-2">{errors.loanType}</p>
            )}

            <div className="flex items-center gap-2">
              <Radio
                id="business-loan"
                name="loanType"
                value="Business"
                checked={selectedLoanType === 'Business'}
                onChange={handleChange}
              />
              <Label htmlFor="business-loan">Business</Label>
            </div>

            <div className="flex items-center gap-2">
              <Radio
                id="procurement-loan"
                name="loanType"
                value="Procurement"
                checked={selectedLoanType === 'Procurement'}
                onChange={handleChange}
              />
              <Label htmlFor="procurement-loan">Procurement</Label>
            </div>

             <div className="flex items-center gap-2">
              <Radio
                id="building-loan"
                name="loanType"
                value="Building"
                checked={selectedLoanType === 'Building'}
                onChange={handleChange}
              />
              <Label htmlFor="building-loan">Building</Label>
            </div>

            <div className="flex items-center gap-2">
              <Radio
                id="franchisee-loan"
                name="loanType"
                value="Franchisee"
                checked={selectedLoanType === 'Franchisee'}
                onChange={handleChange}
              />
              <Label htmlFor="franchisee-loan">Franchisee</Label>
            </div>
          </fieldset>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="money" value="Requested Amount" />
            </div>
            <TextInput
              value={formattedAmount}
              onChange={handleAmountChange}
              min={10000}
              max={50000000}
              maxLength={8}
              theme={customInputBoxTheme}
              color={errors.amount ? "failure" : "focuscolor"}
              icon={GiTakeMyMoney}
              id="money" 
              type="text" 
              placeholder="10,000" 
              required 
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
            )}
          </div>

          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Your company profile will be reviewed by LEDA through various stages and will keep you updated as your application progresses.
            The outcome of this processes may be successful in your favour or rejected in accordance with our application criteria.
          </p>

          <div>
            <Alert color="warning" icon={HiInformationCircle} rounded>
              <span className="font-medium">Please note!</span> Personal data may be collected in order to process your loan. Take note of our T&C's and POPI ACT for your assurance.
            </Alert>
            <h4 className="mt-2 font-medium">Please confirm and give your consent for the following:</h4>
            <ul className="list-disc ml-8 mt-2 space-y-1">
              <li>
                I am not currently insolvent, receiving debt counselling or have a pending debt review or insolvency application.
              </li>
              <li>
                LEDA will use my personal data only to provide me with the service or product that I am applying for. I have read the <a className="text-appGreen underline" href="#" target="_blank">Privacy Statement</a>.
              </li>
            </ul>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Checkbox 
                checked={tncs} 
                onChange={() => {
                  setTnCs(!tncs);
                  setErrors({...errors, tncs: undefined});
                }} 
                id="agree" 
                theme={customCheckboxTheme} 
                color={errors.tncs ? "failure" : "success"} 
              />
              <Label htmlFor="agree">I have read and agree to the above</Label>
            </div>
          </div>
          {errors.tncs && (
            <p className="text-red-500 text-sm -mt-4">{errors.tncs}</p>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          isProcessing={isUploading} 
          disabled={isUploading} 
          as={"button"} 
          theme={customsubmitTheme} 
          color="success" 
          onClick={SubmitApplication}
        >
          {isUploading ? 'Submitting...' : 'I accept'}
        </Button>
        <Button color="gray" onClick={() =>{
          setAmount('');
          setTnCs(false);
          setOpenModal(false);
        } }>
          Decline
        </Button>
      </Modal.Footer>
    </Modal>
  );
}