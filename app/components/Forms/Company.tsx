import { customInputBoxTheme, customselectTheme, customsubmitTheme } from "@/app/SiteTheme/Theme";
import { Alert, Button, Card, FileInput, Label, Radio, Select, TextInput } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { useState } from "react";
import TruthfullAlert from "../Alets/TruthfullAlert";
import { DirectorTable } from "../Tables/DirectorsTable";
import Business from "../Documents/Business";
import Procurement from "../Documents/Procurement";
import Building from "../Documents/Building";
import Franchisee from "../Documents/Franchisee";

const Company = () => {
    const [email, setemail] = useState("info@marumoholdings.co.za");
    const [phone, setphone] = useState("");
    const [name, setname] = useState("");
    const [saId, setsaId] = useState("");
    const [isProcessingBasicInfo, setBasicInfo] = useState<boolean>(false);
    const [isProcessingDocuments, setDocuments] = useState<boolean>(false);
    const [isProcessingDirectors, setDirectors] = useState<boolean>(false);
    const [CompanyName, setCompanyName] = useState("");
    const [CompReg, setCompReg] = useState("");
    const [EmpStatus, setEmpStatus] = useState("---");
    const [selectedLoanType, setSelectedLoanType] = useState<string>('Business');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedLoanType(event.target.value);
    };
    return (
        <div className="w-full overflow-clip h-full mt-18 mb-8 items-center justify-center">
            <div className=" items-center">
                <div>
                    <Card className="h-fit m-4">

                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Provide necessary details of your company.</h3>

                        <div className="space-y-6">
                            <TruthfullAlert />
                            <form>
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
                                            <div className="mb-2 block">
                                                <Label htmlFor="empstatus" value="District *" />
                                            </div>
                                            <Select sizing="sm" value={EmpStatus} onChange={(e) => setEmpStatus(e.target.value)} className="min-w-[250px] max-w-md" id="empstatus" theme={customselectTheme} color={"success"} required>
                                                <option >---</option>
                                                <option >Capricorn</option>
                                                <option >Mopani</option>
                                                <option >Sekhukhune</option>
                                                <option >Vhembe</option>
                                                <option >Waterberg</option>

                                            </Select>
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
                                        
                                    </div>

                                </div>
                                <Button className="mt-2" isProcessing={isProcessingBasicInfo} disabled={isProcessingBasicInfo} type="submit" theme={customsubmitTheme} color="appsuccess">Save</Button>
                            </form>

                            <hr />
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
                            {selectedLoanType.toLocaleLowerCase()=="business" ? <Business/> :
                            selectedLoanType.toLocaleLowerCase()=="procurement" ? <Procurement/> :
                            selectedLoanType.toLocaleLowerCase()=="building" ? <Building/> :
                            selectedLoanType.toLocaleLowerCase()=="franchisee" ? <Franchisee/> :null}
                            <hr />
                            <span className="bg-appGreen p-1 text-white">Shareholder/Director&apos;s Documents</span>
                            <form>
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
                                                <Label htmlFor="sanames" value="Email" />
                                            </div>
                                            <TextInput
                                                sizing="sm"
                                                className="min-w-[250px] max-w-md"
                                                id="sanames" minLength={1}
                                                theme={customInputBoxTheme} color={"focuscolor"}
                                                type="email" required />
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
                                                <Label htmlFor="file-upload-helper-text" value="Proof of Residence (Not older than 3 months)*" />
                                            </div>
                                            <FileInput className="max-w-md"
                                                sizing="sm" id="file-upload-helper-text" accept="application/pdf" helperText=".pdf(MAX. 10MB)." />
                                        </div>
                                        <div>
                                            <div>
                                                <Label htmlFor="file-upload-helper-text" value="Certified SA-ID (card/booklet) (Not older than 3 months)*" />
                                            </div>
                                            <FileInput className="max-w-md"
                                                sizing="sm" id="file-upload-helper-text" accept="application/pdf" helperText=".pdf(MAX. 10MB)." />
                                        </div>

                                    </div>

                                    <DirectorTable />
                                </div>
                                <Button isProcessing={isProcessingDirectors} disabled={isProcessingDirectors} type="submit" theme={customsubmitTheme} color="appsuccess">Save</Button>

                            </form>

                        </div>

                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Company;