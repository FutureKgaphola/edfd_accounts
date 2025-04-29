
import { customInputBoxTheme, customselectTheme, customsubmitTheme } from "@/app/SiteTheme/Theme";
import { Alert, Badge, Button, FileInput, Label, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiCloudDownload } from "react-icons/hi";
import { CiBank } from "react-icons/ci";

import { failureMessage } from "@/app/notifications/successError";
import { handleDownload } from "@/app/services/FileDownloader";
import useFetchCompanyBanking from "@/app/hooks/useFetchCompanyBanking";
import useUpdateCompanyBanking from "@/app/hooks/useUpdateCompanyBanking";

const BankingUpt = () => {
    const { data, isLoading, error } = useFetchCompanyBanking();
    const { loading, error: errorp, success, submitForm } = useUpdateCompanyBanking();
    const [ServerFileName, setServerFileName] = useState('');
    const [UserEmail, SetUserEmail] = useState("");
    const [bank, Setbank] = useState("");
    const [bankOther, SetbankOther] = useState("");
    const [user_id, setuser_id] = useState("");
    const [branch, SetBranck] = useState("");
    const [branchCode, setBranchCode] = useState("");
    const [accountNumber, SetAccountNumber] = useState("");
    const [accountHoldername, SetAccountHolderName] = useState("");
    const [accountType, SetaccountType] = useState('');
    const [files, setFiles] = useState<(File | null)[]>([null]);
    const [FileIndexes, setFileIndexes] = useState<(number | null)[]>([]);

    const handleFileChange = (index: number, file: File | null) => {
        if (file) {
            if (file.type !== 'application/pdf') {
                failureMessage('Please upload a valid PDF file.');
                return;
            }
            if (file.size > 40 * 1024 * 1024) {
                failureMessage('File size must be less than 40 MB.');
                return;
            }
        }

        const updatedFiles = [...files];
        updatedFiles[index] = file;
        setFiles(updatedFiles);
        setFileIndexes([...FileIndexes, index]);
    };
    useEffect(() => {
        if (data) {
            // const { id, holderEmail } = data;
            SetUserEmail(data.holderEmail || "");
            Setbank(data.bankName || "");
            setuser_id(data.id || "");
            SetBranck(data.branchName || "");
            setBranchCode(data.branchCode || "");
            SetAccountNumber(data.accountNumber || "");
            SetAccountHolderName(data.accountHolder || "");
            SetaccountType(data.accountType || "");
            setServerFileName(data.filename || "");
        }
    }, [data, success]);


    const Banks = [
        { id: '0', BankName: "Absa", branchCode: '632005' },
        { id: '1', BankName: "Capitec", branchCode: '470010' },
        { id: '2', BankName: "Ned Bank", branchCode: '198765' },
        { id: '3', BankName: "Standard Bank", branchCode: '051001' },
        { id: '4', BankName: "FNB", branchCode: '250655' },
        { id: '5', BankName: "Investec Bank", branchCode: '580105' },
        { id: '6', BankName: "Other/Not Listed", branchCode: '' }
    ];

    return (
        <div className="relative mt-2 sm:mt-4 md:mt-4">
            <p className="text-sm flex absolute left-2 -top-3 bg-appGreen text-white font-poppinsRegular rounded p-1">Banking
                {<Badge color="success" className="text-xs w-fit">{bank}</Badge>}
            </p>
            <form onSubmit={(e) => submitForm(e, bank == "Other/Not Listed" ? bankOther : bank, branch, branchCode, accountNumber, accountHoldername, accountType, files, user_id || "", UserEmail || "")}
                className="max-w-md gap-4 w-fit border shadow rounded p-4 pt-3">
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
                                    <option onSelect={() => setBranchCode(b?.branchCode)} key={b.id} value={b?.BankName}>{b?.BankName}</option>
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
                                <TextInput sizing="sm"
                                    maxLength={20}
                                    onChange={(e: any) => SetbankOther(e.target.value)} value={bankOther} theme={customInputBoxTheme} color={"focuscolor"} icon={CiBank} id="Lname" type="text" placeholder="Bank" required />
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
                        <TextInput
                            autoComplete="off"
                            sizing="sm" onChange={(e: any) => SetAccountNumber(e.target.value)} value={accountNumber} theme={customInputBoxTheme} color={"focuscolor"} icon={CiBank} id="Lname" type="text" placeholder="Account Number" required />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="Lname" value="Account Holder Name *" />
                        </div>
                        <TextInput
                            autoComplete="off"
                            sizing="sm" onChange={(e: any) => SetAccountHolderName(e.target.value)} value={accountHoldername} theme={customInputBoxTheme} color={"focuscolor"} icon={CiBank} id="Lname" type="text" placeholder="Account Holder Name" required />
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
                        <div className="flex gap-1">
                            {ServerFileName ? (<HiCloudDownload onClick={() => handleDownload(user_id, UserEmail, ServerFileName, 'companyproofBankng')} className="hover:cursor-pointer" width={35} height={35} />) : null}
                            <p className="text-xs">{ServerFileName}</p>
                        </div>
                        <FileInput className="max-w-md mt-2"
                            key={ServerFileName + loading}
                            onChange={(e) => handleFileChange(0, e.target.files?.[0] || null)}
                            sizing="sm" id="postal" accept="application/pdf" helperText=".pdf(MAX. 40MB)." />
                    </div>
                </div>
                <Button isProcessing={loading} disabled={loading} className="mt-2 w-fit" theme={customsubmitTheme} type="submit" color="appsuccess">Save</Button>
            </form>
        </div>
    );
}

export default BankingUpt;