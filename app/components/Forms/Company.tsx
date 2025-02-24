import { customInputBoxTheme, customselectTheme, customsubmitTheme } from "@/app/SiteTheme/Theme";
import { Alert, Button, Card, FileInput, FooterDivider, Label, Radio, Select, TextInput } from "flowbite-react";
import Link from "next/link";
import { HiMail, HiInformationCircle } from "react-icons/hi";
import Image from "next/image";
import tree from '../../assets/images/tree.jpg'
import { useState } from "react";
import TruthfullAlert from "../Alets/TruthfullAlert";
import { ListingsTable } from "../Tables/ListingsTable";
import { DirectorTable } from "../Tables/DirectorsTable";

const Company = () => {
    const [email, setemail] = useState("info@marumoholdings.co.za");
    const [phone, setphone] = useState("");
    const [name, setname] = useState("");
    const [saId, setsaId] = useState("");

    const [CompanyName, setCompanyName] = useState("");
    const [CompReg, setCompReg] = useState("");
    const [EmpStatus, setEmpStatus] = useState("---");
    return (
        <div className="w-full overflow-clip h-full mt-18 mb-8 items-center justify-center">
            <div className=" items-center">
                <div>
                    <Card className="h-fit m-4">
                        <form>
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Provide necessary details of your company.</h3>

                            <div className="space-y-6">
                                <TruthfullAlert />
                                <fieldset className="flex max-w-md flex-wrap gap-4">
                                    <legend className="mb-4">Choose for which loan type you will be using this company for?</legend>
                                    <div className="flex items-center gap-2">
                                        <Radio id="united-state" name="countries" value="USA" defaultChecked />
                                        <Label htmlFor="united-state">Business</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Radio id="germany" name="countries" value="Germany" />
                                        <Label htmlFor="germany">Procurement</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Radio id="spain" name="countries" value="Spain" />
                                        <Label htmlFor="spain">Building</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Radio id="uk" name="countries" value="United Kingdom" />
                                        <Label htmlFor="uk">Franchaisee</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Radio id="uk" name="countries" value="United Kingdom" />
                                        <Label htmlFor="uk">Both Business & Frachaisee</Label>
                                    </div>

                                </fieldset>
                                <div className="xl:flex gap-2">

                                    <div>

                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="email" value="Email *" />
                                            </div>
                                            <TextInput
                                                className="min-w-[250px] max-w-md"
                                                onChange={(e) => setemail(e.target.value)}
                                                readOnly
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
                                                className="min-w-[250px]"
                                                onChange={(e) => setphone(e.target.value)}
                                                value={phone}
                                                sizing="sm"
                                                id="phone" minLength={10} maxLength={10}
                                                theme={customInputBoxTheme} color={"focuscolor"}
                                                type="text" required />
                                        </div>
                                        <div>
                                            <div>
                                                <Label htmlFor="file-upload-helper-text" value="Proof of Business Address *" />
                                            </div>
                                            <FileInput className="max-w-md"
                                                sizing="sm" id="file-upload-helper-text" accept="application/pdf" helperText=".pdf(MAX. 10MB)." />
                                        </div>

                                    </div>

                                    <div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="cmpName" value="Company name *" />

                                            </div>
                                            <TextInput
                                                className="min-w-[250px]"
                                                onChange={(e) => setCompanyName(e.target.value)}
                                                value={CompanyName}
                                                sizing="sm"
                                                id="cmpName" theme={customInputBoxTheme} color={"focuscolor"} type="text" required />
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="regNo" value="Registation N0. *" />

                                            </div>
                                            <TextInput
                                                className="min-w-[250px]"
                                                onChange={(e) => setCompReg(e.target.value)}
                                                value={CompReg}
                                                sizing="sm"
                                                id="regNo" placeholder="YYYY/NNNNNN/XX" theme={customInputBoxTheme} color={"focuscolor"} type="text" required />
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="empstatus" value="Yearly Turn over *" />
                                            </div>
                                            <Select sizing="sm" value={EmpStatus} onChange={(e) => setEmpStatus(e.target.value)} className="min-w-[250px] max-w-md" id="empstatus" theme={customselectTheme} color={"success"} required>
                                                <option >---</option>
                                                <option >less - R100 000</option>
                                                <option >R100 000 - R500 000</option>
                                                <option >R500 000 - R800 000</option>
                                                <option >R800 000 - R1 000 000</option>
                                                <option >R1 000 000 - above</option>
                                            </Select>
                                        </div>
                                    </div>

                                </div>

                                <hr />
                                <span className="bg-appGreen p-1 text-white">Company Documents</span>
                                <Alert color="warning" icon={HiInformationCircle}>
                                    <span className="font-medium">Info alert!</span> All documents must be of an extension file .pdf and should not exceed 40 MB individually.
                                </Alert>
                                <div className="">
                                    <div className="flex justify-between items-center">
                                        <p className="text-wrap text-sm">Cession Agreement *</p>
                                        <div className="flex gap-1 items-center">
                                            <FileInput
                                                className="max-w-md"
                                                sizing="sm" id="file-upload-helper-text" accept="application/pdf" />

                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="flex justify-between items-center">
                                        <p className="text-wrap text-sm">Appointment Letter/Order/JBCC contract/Service Level Agrement & Specification*</p>
                                        <div className="flex gap-1 items-center">
                                            <FileInput
                                                className="max-w-md"
                                                sizing="sm" id="file-upload-helper-text" accept="application/pdf" />

                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-wrap text-sm">Resolution for delegationof authority to act on behalf of the company if there is more than one memeber/director</p>
                                        <div className="flex gap-1 items-center">
                                            <FileInput
                                                className="max-w-md"
                                                sizing="sm" id="file-upload-helper-text" accept="application/pdf" />

                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="flex justify-between items-center">
                                        <p className="text-wrap text-sm">Lease Agreement/Letter of Intent to Lease/Proof of Business Address *</p>
                                        <div className="flex gap-1 items-center">
                                            <FileInput
                                                className="max-w-md"
                                                sizing="sm" id="file-upload-helper-text" accept="application/pdf" />

                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="flex justify-between items-center">
                                        <p className="text-wrap text-sm">Affidavit declaring the company address of registration Office *</p>
                                        <div className="flex gap-1 items-center">
                                            <FileInput
                                                className="max-w-md"
                                                sizing="sm" id="file-upload-helper-text" accept="application/pdf" />

                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="flex justify-between items-center">
                                        <p className="text-wrap text-sm">Six months bank statement of an active business *</p>
                                        <div className="flex gap-1 items-center">
                                            <FileInput
                                                className="max-w-md"
                                                sizing="sm" id="file-upload-helper-text" accept="application/pdf" />

                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="flex justify-between items-center">
                                        <p className="text-wrap text-sm">Quotation with bankng details for the respective supplier and delivery cost <br></br>(Delivery cost can be free, included OR charged for Delivery/Transport) *</p>
                                        <div className="flex gap-1 items-center">
                                            <FileInput
                                                className="max-w-md"
                                                sizing="sm" id="file-upload-helper-text" accept="application/pdf" />

                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-wrap text-sm font-bold">If you are aware of that you are listed, then attach one of the following</p>
                                            <ul className="list-disc ml-4">
                                                <li className="text-wrap text-sm">Proof of payment if debt is settled in full</li>
                                                <li className="text-wrap text-sm">A latter from the creditor indicating the nature of thepayment arrangements if the dept is still having an outstanding.</li>
                                                <li className="text-wrap text-sm">Proof of payment</li>
                                            </ul>
                                        </div>
                                        <div className="flex gap-1 items-center">
                                            <FileInput
                                                className="max-w-md"
                                                sizing="sm" id="file-upload-helper-text" accept="application/pdf" />

                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="flex justify-between items-center">
                                        <p className="text-wrap text-sm">Declaration in case of unmarried applicant (Affidavit)/Copy of Death certificate in case of <br></br> widow/widower/copy of degree of devorce in case of divorcee/copy of Marriage certificate in case od married couple *</p>
                                        <div className="flex gap-1 items-center">
                                            <FileInput
                                                className="max-w-md"
                                                sizing="sm" id="file-upload-helper-text" accept="application/pdf" />

                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="flex justify-between items-center">
                                        <p className="text-wrap text-sm"><a className="underline text-appGreen" target="_blank" href="#">Statement of personal Assets and Liabilities</a> of memebers/directors of the company. (click on the link to download the form)*</p>
                                        <div className="flex gap-1 items-center">
                                            <FileInput
                                                className="max-w-md"
                                                sizing="sm" id="file-upload-helper-text" accept="application/pdf" />

                                        </div>
                                    </div>
                                    <hr></hr>
                                </div>
                                <hr />
                                <span className="bg-appGreen p-1 text-white">Shareholder/Director&apos;s Documents</span>
                                <div className="flex w-full justify-between">
                                    <div className="gap-2 max-w-md">
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="sanames" value="Full Names as recorded on SA-ID card/booklet*" />
                                            </div>
                                            <TextInput
                                                sizing="sm"
                                                className="min-w-[250px] max-w-md"
                                                onChange={(e) => setphone(e.target.value)}
                                                value={phone}
                                                id="sanames" minLength={1}
                                                theme={customInputBoxTheme} color={"focuscolor"}
                                                type="text" required />
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="sanames" value="Phone" />
                                            </div>
                                            <TextInput
                                                sizing="sm"
                                                className="min-w-[250px] max-w-md"
                                                onChange={(e) => setphone(e.target.value)}
                                                value={phone}
                                                id="sanames" minLength={1}
                                                theme={customInputBoxTheme} color={"focuscolor"}
                                                type="text" required />
                                        </div>
                                        <div>
                                            <div>
                                                <Label htmlFor="file-upload-helper-text" value="Proof of Residence *" />
                                            </div>
                                            <FileInput className="max-w-md"
                                                sizing="sm" id="file-upload-helper-text" accept="application/pdf" helperText=".pdf(MAX. 10MB)." />
                                        </div>
                                        <div>
                                            <div>
                                                <Label htmlFor="file-upload-helper-text" value="Certified SA-ID (card/booklet)*" />
                                            </div>
                                            <FileInput className="max-w-md"
                                                sizing="sm" id="file-upload-helper-text" accept="application/pdf" helperText=".pdf(MAX. 10MB)." />
                                        </div>

                                    </div>

                                    <DirectorTable />
                                </div>

                                <div className="w-full">
                                    <Button type="submit" theme={customsubmitTheme} color="appsuccess">add Director/Member</Button>
                                </div>
                                <hr></hr>
                                <p>Click the save button when you are done with adding your content or data under this tab</p>
                                <div className="w-full">
                                    <Button type="submit" theme={customsubmitTheme} color="appsuccess">Save</Button>
                                </div>

                            </div>
                        </form>

                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Company;