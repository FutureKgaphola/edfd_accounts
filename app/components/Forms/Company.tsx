import { customInputBoxTheme, customsubmitTheme } from "@/app/SiteTheme/Theme";
import { Alert, Button, Card, FileInput, Label, Radio, TextInput } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { FormEvent, useEffect, useState } from "react";
import { DirectorTable } from "../Tables/DirectorsTable";
import Business from "../Documents/Business";
import Procurement from "../Documents/Procurement";
import Building from "../Documents/Building";
import ProfileList from "../Alerts/ProfileList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import SelectDistrict from "../Select/SelectDistrict";
import { useAddCompanies } from "@/app/hooks/useAddCompany";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PDFUploader from "../../components/PDFUploader";
import { SelectedCompanyAction } from "@/lib/features/Companies/SelectedCompanySlice";
import { CompanyInfoAlert } from "../Alerts/CompanyInfoAlert";
import DirectorsForm from "../Modal/Directors";


const Company = () => {
    const queryClient = useQueryClient();
    const { handleAddCompanies, loading } = useAddCompanies();

    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [CompanyName, setCompanyName] = useState("");
    const [CompReg, setCompReg] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [selectedLoanType, setSelectedLoanType] = useState<string>('Business');
    const Authprop = useSelector((state: RootState) => state.AuthReducer);
    const Companyprop = useSelector((state: RootState) => state.CompanyReducer);
    const authEmail = Authprop?.user?.user_email ?? "";

    const dispatch = useDispatch();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedLoanType(event.target.value);
        dispatch(SelectedCompanyAction.SetGlobalselectedcompLoanType({ loanCat_id: (event.target.value == "Business" ? '0' : event.target.value == "Procurement" ? '1' : event.target.value == "Building" ? '2' : event.target.value == "Franchisee" ? '3' : '') }));
    };

    useEffect(() => {
        setSelectedLoanType('Business');
        SelectedCompanyAction.SetGlobalselectedcompLoanType({ loanCat_id: '0' })
    }, [])

    const [SelectedDistrict, setSelectedDistrict] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        await addCompanyMutation();
    }

    const resetCompanyInfoForm = () => {
        setemail("");
        setphone("");
        setCompReg("");
        setCompanyName("");
    }

    const { mutateAsync: addCompanyMutation } = useMutation({
        mutationFn: () => handleAddCompanies({
            user_email: authEmail, compName: CompanyName, phone: phone, regNo: CompReg, districtName: SelectedDistrict, compEmail: email
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Registeredcompanies"] });
            resetCompanyInfoForm();
        }
    });

    const selectedprop = useSelector((state: RootState) => state.SelectedCompanyReducer);
    const regNo = selectedprop.regNo;
    return (
        <div className="w-full overflow-clip h-full mt-18 mb-8 items-center justify-center">
            <div className=" items-center">
                <div>
                    <Card className="h-fit m-4">

                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Provide necessary details of your company.</h3>

                        <div className="space-y-6">
                            <ProfileList user_email={authEmail} />
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <div className="xl:flex lg:flex gap-2">
                                    <div className="xl:flex gap-2 border p-2 rounded border-gray-200">

                                        <div>

                                            <div>
                                                <div className="mb-2 block">
                                                    <Label htmlFor="email" value="Email *" />
                                                </div>
                                                <TextInput
                                                    className="min-w-[250px] max-w-md"
                                                    onChange={(e) => setemail(e.target.value)}
                                                    value={email}
                                                    id="email"
                                                    type="email"
                                                    sizing="sm"
                                                    placeholder="info@mailprovider.co.za"
                                                    theme={customInputBoxTheme} color={"focuscolor"}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <div className="mb-2 block">
                                                    <Label htmlFor="phone" value="Phone *" />
                                                </div>
                                                <TextInput
                                                    className="min-w-[250px] max-w-md"
                                                    onChange={(e) => setphone(e.target.value)}
                                                    value={phone}
                                                    sizing="sm"
                                                    id="phone" minLength={10} maxLength={10}
                                                    theme={customInputBoxTheme} color={"focuscolor"}
                                                    type="text" required />
                                            </div>

                                            <SelectDistrict SelectedDistrict={SelectedDistrict} setSelectedDistrict={setSelectedDistrict} />
                                        </div>

                                        <div>
                                            <div>
                                                <div className="mb-2 block">
                                                    <Label htmlFor="cmpName" value="Company name *" />

                                                </div>
                                                <TextInput
                                                    className="min-w-[250px] max-w-md"
                                                    onChange={(e) => setCompanyName(e.target.value)}
                                                    value={CompanyName}
                                                    sizing="sm"
                                                    id="cmpName" theme={customInputBoxTheme} color={"focuscolor"} type="text" required />
                                            </div>
                                            <div>
                                                <div className="mb-2 block">
                                                    <Label htmlFor="regNo" value="Registration No. *" />

                                                </div>
                                                <TextInput
                                                    className="min-w-[250px] max-w-md"
                                                    onChange={(e) => setCompReg(e.target.value)}
                                                    value={CompReg}
                                                    sizing="sm"
                                                    id="regNo" placeholder="YYYY/NNNNNN/XX" theme={customInputBoxTheme} color={"focuscolor"} type="text" required />
                                            </div>
                                            <Button className="mt-2" isProcessing={loading} disabled={loading} type="submit" theme={customsubmitTheme} color="appsuccess">{loading ? "Adding..." : "Add"}</Button>
                                        </div>


                                    </div>

                                    {regNo && regNo?.trim() !== "" && regNo?.trim() !== "---" && <CompanyInfoAlert regNo={regNo} />}

                                </div>


                            </form>

                            <hr />
                            {
                                Companyprop?.companies?.length > 0 && regNo && regNo !== "" && regNo !== "---" ?
                                    (
                                        <div>
                                            <span className="bg-appGreen p-1 text-white">Company Documents</span>
                                            <Alert color="warning" icon={HiInformationCircle}>
                                                <span className="font-medium">Info alert!</span> All documents must be of an extension file .pdf and should not exceed 40 MB individually.
                                            </Alert>
                                            <fieldset className="flex max-w-md flex-wrap gap-4">
                                                <legend className="mb-4 text-nowrap">Choose for which loan type you will be using this Document for?</legend>

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
                                            {(() => {
                                                const loanType = selectedLoanType.toLocaleLowerCase();
                                                return loanType === "business" ? <Business /> :
                                                    loanType === "procurement" ? <Procurement /> :
                                                        loanType === "building" ? <Building /> :
                                                            loanType === "franchisee" ? <PDFUploader /> : null;
                                            })()}

                                            <div>
                                                <hr className="mt-4" />
                                                <span className="bg-appGreen p-1 text-white">Shareholder/Director&apos;s Documents</span>
                                                <div className="flex-col gap-2 pt-2">
                                                     <Button size="sm" theme={customsubmitTheme} onClick={()=>setOpenModal(true)} color="appsuccess">Add a Director</Button>
                                                    <DirectorsForm openModal={openModal}  setOpenModal={setOpenModal} />
                                                    <DirectorTable />
                                                </div>
                                            </div>

                                        </div>
                                    ) : null
                            }

                        </div>

                    </Card>
                </div>
            </div >
        </div >
    );
}

export default Company;