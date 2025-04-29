
"use client";

import { failureMessage, successMessage } from "@/app/notifications/successError";
import { customCheckboxTheme, customInputBoxTheme, customsubmitTheme } from "@/app/SiteTheme/Theme";
import { Alert, Button, Checkbox, Label, Modal, Radio, TextInput } from "flowbite-react";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { GiTakeMyMoney } from "react-icons/gi";
import axios from "axios";

export function ConfirmApplicationModal({ DistID, DistrName,user_email,regNo,companyName, setOpenModal, openModal }: { DistID:string,DistrName:string,user_email:string,regNo:string,companyName:string,setOpenModal: Dispatch<SetStateAction<boolean>>, openModal: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedLoanType, setSelectedLoanType] = useState<string>('Business');
  const loans = "Business";
  const [Amount,setAmount]=useState('0');
  const [isUploading,setisUploading]=useState(false);
  const [tncs, setTnCs] = useState<boolean>(false);
  const gotoTypeLoan = `https://edfd-sub-website.vercel.app/details/${loans.toLocaleLowerCase()}`;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLoanType(event.target.value);
  };
  
  const SubmitApplication = async () => {
    if (!Amount || Amount === '0') {
      failureMessage("Please enter a valid amount.");
      return;
    }
  
    setisUploading(true);
  
    try {
      const response = await axios.post('/api/companies/apply', {
        user_email,
        companyName,
        districtId: DistID,
        regNo,
        amount: Amount,
        loanDocs: selectedLoanType,
      });
  
      const { status, data } = response;
  
      if (status == 200 || status == 201) {
        successMessage(data.message || "Application submitted successfully.");
        router.back();
      } else {
        failureMessage(data?.message || "Something went wrong. Please try again.");
      }
  
    } catch (error: any) {
      console.error("API error:", error);
  
      // Attempt to extract error from response if available
      const apiMessage =
        error?.response?.data?.message ||
        error?.message ||
        "An unexpected error occurred.";
  
      failureMessage(apiMessage);
  
    } finally {
      setisUploading(false);
      setOpenModal(false);
    }
  };
  
  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Confirmation of your details</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <fieldset className="flex max-w-md flex-wrap gap-4">
              <legend className="mb-4 text-nowrap">Choose the loan you want to apply for</legend>

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

              <p className="mt-1">Selected Loan Type: {selectedLoanType}</p>
            </fieldset>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="money" value="Requested Amount" />
              </div>
              <TextInput
              onChange={(e)=>setAmount(e.target.value)}
                min={10000}
                max={50000000}
                maxLength={8}
                minLength={5}
                theme={customInputBoxTheme}
                color={"focuscolor"}
                icon={GiTakeMyMoney}
                id="money" type="text" placeholder="10 000" required />
            </div>

            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Your company profile will be reviwed by LEDA through various stages and will keep you updated as your application progresses.
              The outcome of this processes may be succesful in your favour or rejected in accordance with our application creteria.
            </p>

            <div>
              <Alert color="warning" icon={HiInformationCircle} rounded>
                <span className="font-medium">Please note!</span> Personal data may be collected in order to process your loan. take note of our tnc&apos;s and POPI ACT for your assurance.
              </Alert>
              <h4>Please confirm and give your consent for the following:</h4>
              <ul className="list-disc ml-8">
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
                <Checkbox checked={tncs} onChange={() => setTnCs(tncs ? false : true)} id="agree" theme={customCheckboxTheme} color="success" />
                <Label htmlFor="agree">I have read and agree to the above</Label>
              </div>

            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button isProcessing={isUploading} disabled={isUploading} as={"button"} theme={customsubmitTheme} color="success" onClick={() => {
            if (tncs === false) return;
            SubmitApplication();
          }}>I accept</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
