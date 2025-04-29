
import { customInputBoxTheme, customsubmitTheme, customSwitch } from "@/app/SiteTheme/Theme";
import { Button, FileInput, Label, TextInput, ToggleSwitch } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiCloudDownload } from "react-icons/hi";
import { CiHome } from "react-icons/ci";
import { GiPostOffice } from "react-icons/gi";
import { failureMessage } from "@/app/notifications/successError";
import useUpdateLeadAddress from "@/app/hooks/useUpdateLeadAddress";
import useFetchLeadAddress from "@/app/hooks/useFetchLeadAddress";
import { handleDownload } from "@/app/services/FileDownloader";

const Address = () => {

    const [physical, setPhysical] = useState("");
    const [postal, setPostal] = useState("");
    const [UserEmail, SetUserEmail] = useState("");
    const [user_id, setuser_id] = useState("");
    const [ServerFileName, setServerFileName] = useState('');
    const [Filerror, setError] = useState('');
    const [switch1, setSwitch1] = useState(false);
    const [files, setFiles] = useState<(File | null)[]>([null]);
    const [FileIndexes, setFileIndexes] = useState<(number | null)[]>([]);
    const { data, isLoading, error } = useFetchLeadAddress();
    const { loading, error: errorp, success, submitForm } = useUpdateLeadAddress();
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
            const { id, holderEmail } = data;
            SetUserEmail(holderEmail || "");
            setuser_id(id || "");
            setPhysical(data.physicalAddress || "");
            setPostal(data.postal || "");
            setServerFileName(data.filename || "");
        }
    }, [data, success]);
    return (
        <div className="relative mt-2 sm:mt-4 md:mt-4">
            <p className="text-sm absolute left-2 -top-3 bg-appGreen text-white font-poppinsRegular rounded p-1">Address</p>
            <form className="max-w-md gap-4 w-fit border shadow rounded p-4 pt-3" onSubmit={(e) => submitForm(e, physical, postal, files, user_id, UserEmail)}>
                <div className=" mt-4">
                    <ToggleSwitch color="green" theme={customSwitch} checked={switch1} label="Is your Physical address the same as Postal address?" onChange={() => {
                        setSwitch1(!switch1);
                        if (!switch1) {
                            setPostal(physical);
                        }
                    }} />
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Physical Address *" />
                        </div>
                        <TextInput sizing="sm" onChange={(e: any) => {
                            const val = e.target.value;
                            setPhysical(val);
                            if (switch1) {
                                setPostal(val);
                            }
                        }} value={physical} theme={customInputBoxTheme} color={"focuscolor"} icon={CiHome} id="name" type="text" placeholder="Physical Address" required />
                    </div>
                    {
                        switch1 ? null : (<div>
                            <div className="mb-2 block">
                                <Label htmlFor="Lname" value="Postal Address *" />
                            </div>
                            <TextInput sizing="sm" onChange={(e: any) => setPostal(e.target.value)} value={postal} theme={customInputBoxTheme} color={"focuscolor"} icon={GiPostOffice} id="Lname" type="text" placeholder="Postal Address" required />
                        </div>)
                    }
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="postal" value="Proof of Address *" />
                        </div>
                        <div className="flex gap-1">
                            {ServerFileName ? (<HiCloudDownload onClick={() => handleDownload(user_id, UserEmail, ServerFileName, 'leadproofAddress')} className="hover:cursor-pointer" width={35} height={35} />) : null}
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

export default Address;