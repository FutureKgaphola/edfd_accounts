import { customsubmitTheme } from "@/app/SiteTheme/Theme";
import { Alert, Button, Card, Label, Radio, Timeline, TimelineContent, TimelineItem, TimelinePoint, TimelineTime } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { useEffect, useState } from "react";
import { DirectorTable } from "../Tables/DirectorsTable";
import Business from "../Documents/Business";
import Procurement from "../Documents/Procurement";
import Building from "../Documents/Building";
import ProfileList from "../Alerts/ProfileList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { SelectedCompanyAction } from "@/lib/features/Companies/SelectedCompanySlice";
import DirectorsForm from "../Modal/Directors";
import EditDirectors from "../Modal/EditDirectors";
import Franchisee from "../Documents/Franchisee";
import Contacts from "./Company/Contacts";
import ContactsUpt from "./Company/UpdateUI/Contacts";
import AddressUpt from "./Company/UpdateUI/Address";
import BankingUpt from "./Company/UpdateUI/Banking";


const Company = () => {

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
        SelectedCompanyAction.SetGlobalselectedcompLoanType({ loanCat_id: '0' });
    }, []);

    const selectedprop = useSelector((state: RootState) => state.SelectedCompanyReducer);
    const prop = useSelector((state: RootState) => state.AddCompSliceReducer);
    const regNo = selectedprop.regNo;
    return (
        <div className="w-full overflow-clip h-full mt-18 mb-8 items-center justify-center">
            <div className=" items-center">
                <div>
                    <Card className="h-fit m-4">

                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Provide necessary details of your company.</h3>

                        <div className="space-y-6">
                            <ProfileList user_email={authEmail} />
                            {
                                prop.isShowForms ? (
                                    <div className="lg:flex xl:flex gap-2 pt-4 lg:overflow-x-auto xl:overflow-x-auto sm:overflow-y-auto md:overflow-y-auto max-w-full">
                                        <Contacts />
                                        <Timeline>
                                            <TimelineItem>
                                                <TimelinePoint />
                                                <TimelineContent>
                                                    <TimelineTime color="#000000">Add A company here</TimelineTime>
                                                </TimelineContent>
                                            </TimelineItem>
                                            <TimelineItem>
                                                <TimelinePoint />
                                                <TimelineContent>
                                                    <TimelineTime>Select your company from the dropdown</TimelineTime>
                                                </TimelineContent>
                                            </TimelineItem>
                                            <TimelineItem>
                                                <TimelinePoint />
                                                <TimelineContent>
                                                    <TimelineTime>Click on update to add more details of your company</TimelineTime>
                                                </TimelineContent>
                                            </TimelineItem>
                                        </Timeline>
                                    </div>

                                ) : null
                            }
                            {
                                !prop.isShowForms && prop.actionClicked == "Update" && Companyprop?.companies?.length > 0 && regNo && regNo !== "" && regNo !== "---" ? (
                                    <div className="lg:flex xl:flex gap-2 pt-4 lg:overflow-x-auto xl:overflow-x-auto sm:overflow-y-auto md:overflow-y-auto max-w-full">
                                        <ContactsUpt />
                                        <AddressUpt />
                                        <BankingUpt />
                                    </div>
                                ) : null
                            }

                            <hr />
                            {
                                !prop.isShowForms && prop.actionClicked == "Documents" && Companyprop?.companies?.length > 0 && regNo && regNo !== "" && regNo !== "---" ?
                                    (
                                        <div>
                                            <span className="bg-appGreen p-1 text-white">Company Documents</span>
                                            <Alert color="warning" icon={HiInformationCircle}>
                                                <span className="font-medium">Info alert!</span> All documents must be of an extension file .pdf and should not exceed 20 MB individually.
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
                                                            loanType === "franchisee" ? <Franchisee /> : null;
                                            })()}

                                        </div>
                                    ) : null
                            }

                            {
                                !prop.isShowForms && prop.actionClicked == "Director" && Companyprop?.companies?.length > 0 && regNo && regNo !== "" && regNo !== "---" ? (
                                    <div>
                                        <hr className="mt-4" />
                                        <span className="bg-appGreen p-1 text-white">Shareholder/Director&apos;s Documents</span>
                                        <div className="flex-col gap-2 pt-2">
                                            <Button size="sm" theme={customsubmitTheme} onClick={() => setOpenModal(true)} color="appsuccess">Add a Director</Button>
                                            <DirectorsForm openModal={openModal} setOpenModal={setOpenModal} />
                                            <EditDirectors />
                                            <DirectorTable />
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