import { customInputBoxTheme, customselectTheme, customsubmitTheme } from "@/app/SiteTheme/Theme";
import { Alert, Button, Card, FileInput, FooterDivider, Label, Select, TextInput } from "flowbite-react";
import Link from "next/link";
import { HiMail, HiInformationCircle } from "react-icons/hi";
import Image from "next/image";
import tree from '../../assets/images/tree.jpg'
import { useState } from "react";
import TruthfullAlert from "../Alets/TruthfullAlert";

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
                                <div className="xl:flex gap-2">
                                    <div>
                                        <div>
                                            <Label htmlFor="file-upload-helper-text" value="B-BBEE Certification *" />
                                        </div>
                                        <FileInput
                                            className="max-w-md"
                                            sizing="sm" id="file-upload-helper-text" accept="application/pdf" helperText=".pdf(MAX. 10MB)." />
                                    </div>
                                    <div>
                                        <div>
                                            <Label htmlFor="file-upload-helper-text" value="Tax Clearence *" />
                                        </div>
                                        <FileInput className="max-w-md"
                                            sizing="sm" id="file-upload-helper-text" accept="application/pdf" helperText=".pdf(MAX. 10MB)." />
                                    </div>
                                    <div>
                                        <div>
                                            <Label htmlFor="file-upload-helper-text" value="Company Certificate *" />
                                        </div>
                                        <FileInput className="max-w-md"
                                            sizing="sm" id="file-upload-helper-text" accept="application/pdf" helperText=".pdf(MAX. 10MB)." />
                                    </div>
                                    <div>
                                        <div>
                                            <Label htmlFor="file-upload-helper-text" value="Proof of account *" />
                                        </div>
                                        <FileInput className="max-w-md"
                                            sizing="sm" id="file-upload-helper-text" accept="application/pdf" helperText=".pdf(MAX. 10MB)." />
                                    </div>
                                </div>
                                <hr />
                                <span className="bg-appGreen p-1 text-white">Shareholder Documents</span>
                                <div className="gap-2">
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="phone" value="Number of Shareholders *" />
                                        </div>
                                        <TextInput
                                            sizing="sm"
                                            className="min-w-[250px] max-w-md"
                                            onChange={(e) => setphone(e.target.value)}
                                            value={phone}
                                            id="phone" minLength={10} maxLength={10}
                                            theme={customInputBoxTheme} color={"focuscolor"}
                                            type="number" required />
                                    </div>
                                    <div>
                                        <div>
                                            <Label htmlFor="file-upload-helper-text" value="Compined Certified of SA-ID copies *" />
                                        </div>
                                        <FileInput className="max-w-md"
                                            sizing="sm" id="file-upload-helper-text" accept="application/pdf" helperText=".pdf(MAX. 10MB)." />
                                    </div>


                                </div>
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