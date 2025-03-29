
import useSubmitPersonal from "@/app/hooks/useSubmitPersonal";
import { customInputBoxTheme, customselectTheme, customsubmitTheme, NetworkTitle } from "@/app/SiteTheme/Theme";
import { NetworkMessage } from "@/app/TempData/StaticData";
import { Alert, Button, FileInput, Label, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { Offline, Online } from "react-detect-offline";
import { handleDownload } from "@/app/services/FileDownloader";
import { CiBank } from "react-icons/ci";

const BankingUpt = () => {
    const [bank, Setbank] = useState("");
    const [branch, SetBranck] = useState("");
    const [branchCode, setBranchCode] = useState("");
    const [accountNumber, SetAccountNumber] = useState("");
    const [accountname, SetAccountName] = useState("");
    const [accountType, SetaccountType] = useState('');
    const [Filename, setFilename] = useState('');
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [Filerror, setError] = useState('');
    const { loading, error: errorp, success, submitForm } = useSubmitPersonal();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            if (event.target.files === undefined || event.target.files === null) { setFilename(""); setPdfFile(null); return; }
            if (event.target.files[0] === undefined || event.target.files[0] === null) { setFilename(""); setPdfFile(null); return; }
            setFilename(event.target.files[0].name);

            // Validate the file size (should not exceed 40MB)
            if (file.size > 40 * 1024 * 1024) {  // 40MB in bytes
                setError('File size exceeds the 40MB limit.');
                setPdfFile(null);  // Clear the file
            } else {
                setError('');
                setPdfFile(file);
            }
        }
    };
    useEffect(() => {
        // if (data) {
        //     const { first_name, last_name, phone, saId, user_email, filename: fln, id } = data;
        //     SetUserName(user_email || "");
        //     setIdNo(saId || "");
        //     setuserphone(phone || "");
        //     SetName(first_name || "");
        //     SetLName(last_name || "");
        //     setServerFileName(fln || "");
        //     setId(id || "");
        // }
    }, []);

    const Banks = [
        { id: '0', BankName: "Absa", branchCode: '632005' },
        { id: '1', BankName: "Capitec", branchCode: '470010' },
        { id: '2', BankName: "Ned Bank", branchCode: '198765' },
        { id: '3', BankName: "Standard Bank", branchCode: '051001' },
        { id: '4', BankName: "FNB", branchCode: '250655' },
        { id: '5', BankName: "Investec Bank", branchCode: '580105' },
        { id: '6', BankName: "Other/Not Listed", branchCode: '' }
    ]
    return (
        <div className="relative mt-2 sm:mt-4 md:mt-4">
            <p className="text-sm absolute left-2 -top-3 bg-appGreen text-white font-poppinsRegular rounded p-1">Banking</p>
            <form className="max-w-md gap-4 w-fit border shadow rounded p-4 pt-3">
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Bank *" />
                        </div>
                        <Select sizing="sm"
                            onChange={(e: any) => {
                                const selectedBank = Banks.find(b => b.BankName === e.target.value);
                                Setbank(e.target.value);
                                setBranchCode(selectedBank?.branchCode || "");
                            }}
                            className="max-w-2xl ml-2"
                            id="Service"
                            theme={customselectTheme}
                            color="success"
                            required
                        >
                            <option>---</option>
                            {
                                Banks?.map((b: any) => (
                                    <option onSelect={()=>setBranchCode(b?.branchCode)} key={b.id} value={b?.BankName}>{b?.BankName}</option>
                                ))
                            }
                        </Select>
                    </div>

                    {
                        bank == "Other/Not Listed" ? (
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="Bank" value="State your Bank *" />
                                </div>
                                <TextInput sizing="sm" onChange={(e: any) => Setbank(e.target.value)} value={branch} theme={customInputBoxTheme} color={"focuscolor"} icon={CiBank} id="Lname" type="text" placeholder="Bank" required />
                            </div>
                        ) : null
                    }

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="Lname" value="Branch *" />
                        </div>
                        <TextInput sizing="sm" onChange={(e: any) => SetBranck(e.target.value)} value={branch} theme={customInputBoxTheme} color={"focuscolor"} icon={CiBank} id="Lname" type="text" placeholder="Branch" required />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="Lname" value="Branch Code *" />
                        </div>
                        <TextInput sizing="sm" onChange={(e: any) => setBranchCode(e.target.value)} value={branchCode} theme={customInputBoxTheme} color={"focuscolor"} icon={CiBank} id="Lname" type="text" placeholder="Branch Code" required />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="Lname" value="Account Number *" />
                        </div>
                        <TextInput sizing="sm" onChange={(e: any) => SetAccountNumber(e.target.value)} value={accountNumber} theme={customInputBoxTheme} color={"focuscolor"} icon={CiBank} id="Lname" type="text" placeholder="Account Number" required />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="Lname" value="Account Holder Name *" />
                        </div>
                        <TextInput sizing="sm" onChange={(e: any) => SetAccountName(e.target.value)} value={accountname} theme={customInputBoxTheme} color={"focuscolor"} icon={CiBank} id="Lname" type="text" placeholder="Account Holder Name" required />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="Lname" value="Account Type *" />
                        </div>
                        <TextInput sizing="sm" onChange={(e: any) => SetaccountType(e.target.value)} value={accountType} theme={customInputBoxTheme} color={"focuscolor"} icon={CiBank} id="Lname" type="text" placeholder="Account Type" required />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="postal" value="Proof of Account *" />
                        </div>
                        <FileInput className="max-w-md mt-2"
                            onChange={handleFileChange}
                            sizing="sm" id="postal" accept="application/pdf" helperText=".pdf(MAX. 40MB)." />
                    </div>
                </div>

                <Offline>
                    <Alert color="warning" icon={HiInformationCircle}>
                        <span className="font-medium">Info alert!</span> {NetworkTitle}
                        <p className="text-xs text-gray-500">{NetworkMessage}</p>
                    </Alert></Offline>

                <Online>
                    <Button className="mt-2 w-fit" theme={customsubmitTheme} type="submit" color="appsuccess">Update</Button>
                </Online>
            </form>
        </div>
    );
}

export default BankingUpt;