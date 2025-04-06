import useProfile from "@/app/hooks/useProfile";
import useSubmitPersonal from "@/app/hooks/useUpdatePersonal";
import { customInputBoxTheme, customsubmitTheme, NetworkTitle } from "@/app/SiteTheme/Theme";
import { NetworkMessage } from "@/app/TempData/StaticData";
import { Alert, Button, FileInput, Label, Radio, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Offline, Online } from "react-detect-offline";
import { handleDownload } from "@/app/services/FileDownloader";

const Contacts = () => {
    
    const [username, SetUserName] = useState("");
    const [IdNo, setIdNo] = useState("");
    const [id, setId] = useState("");
    const [userphone, setuserphone] = useState("");
    const [Name, SetName] = useState("");
    const [LName, SetLName] = useState("");
    
    const [filename, setFilename] = useState('');
    const [ServerFileName, setServerFileName] = useState('');
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [Filerror, setError] = useState('');
    const [CompReg, setCompReg] = useState("");
    //spouse
    const [SpouceName, SetSpouceName] = useState("");
    const [Spoucephone, SetSpoucephone] = useState("");
    const [SpouceEmail, SetSpouceEmail] = useState("");
    const [SpouceSID, SetSpouceSID] = useState("");
    const [ServerSpMFileName, SetServerSpMFileName] = useState('');
    const [ServerSpIdFileName, SetServerSpIdFileName] = useState('');
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
   
    // useEffect(() => {
    //     if (data) {
    //         const { first_name, last_name, phone, saId, user_email, filename: fln, id } = data;
    //         SetUserName(user_email ?? "");
    //         setIdNo(saId || "");
    //         setuserphone(phone || "");
    //         SetName(first_name || "");
    //         SetLName(last_name || "");
    //         setServerFileName(fln || "");
    //         setId(id ?? "");
    //     }
    // }, [data, success]);
    return (
        <div className="relative mt-2 sm:mt-4 md:mt-4">
            <p className="text-sm absolute left-2 -top-3 bg-appGreen text-white font-poppinsRegular rounded p-1">Personal (Identification)</p>
            <form className="max-w-md gap-4 w-fit border shadow rounded p-4 pt-3">
                <div className="grid gap-2 grid-cols-2">
                    <div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Trade Name *" />
                            </div>
                            <TextInput sizing="sm" onChange={(e: any) => SetName(e.target.value)} value={Name} theme={customInputBoxTheme} color={"focuscolor"}  id="name" type="text" placeholder="Trade Name" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="Lname" value="Tax Number *" />
                            </div>
                            <TextInput sizing="sm" onChange={(e: any) => SetLName(e.target.value)} value={LName} theme={customInputBoxTheme} color={"focuscolor"}  id="Lname" type="text" placeholder="Tax Number" required />
                        </div>
                        

                    </div>

                    <div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="regNo" value="Registration No. *" />

                            </div>
                            <TextInput

                                onChange={(e) => setCompReg(e.target.value)}
                                value={CompReg}
                                sizing="sm"
                                id="regNo" placeholder="YYYY/NNNNNN/XX" theme={customInputBoxTheme} color={"focuscolor"} type="text" required />
                        </div>


                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="VAT Number *" />
                            </div>
                            <TextInput className="hover:cursor-not-allowed" sizing="sm" readOnly
                                onChange={(e: any) => SetUserName(e.target.value)} value={username} theme={customInputBoxTheme} color={"focuscolor"} id="email1" type="text" placeholder="VAT Number" required />
                        </div>
                    </div>
                </div>
                <Offline>
                    <Alert color="warning" >
                        <span className="font-medium">Info alert!</span> {NetworkTitle}
                        <p className="text-xs text-gray-500">{NetworkMessage}</p>
                    </Alert></Offline>

                
                <Online>
                    <Button className="mt-2 w-fit" theme={customsubmitTheme} type="submit" color="appsuccess">Save</Button>
                    {/* <p className="text-sm">You may be required to login again after this action.</p> */}
                </Online>
            </form>
        </div>
    );
}

export default Contacts;