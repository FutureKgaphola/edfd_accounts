
import { customInputBoxTheme, customsubmitTheme, customSwitch, NetworkTitle } from "@/app/SiteTheme/Theme";
import { NetworkMessage } from "@/app/TempData/StaticData";
import { Alert, Button, FileInput, Label, TextInput, ToggleSwitch } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiInformationCircle, HiUserAdd } from "react-icons/hi";
import { Offline, Online } from "react-detect-offline";
import { CiHome } from "react-icons/ci";
import { GiPostOffice } from "react-icons/gi";
import { handleDownload } from "@/app/services/FileDownloader";

const Address = () => {

    const [physical, setPhysical] = useState("");
    const [postal, SetPostal] = useState("");

    const [filename, setFilename] = useState('');
    const [ServerFileName, setServerFileName] = useState('');
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [Filerror, setError] = useState('');
    const [switch1, setSwitch1] = useState(false);
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
        //     SetPostal(user_email || "");
        //     setPhysical(saId || "");
        // }
    }, []);
    return (
        <div className="relative mt-2 sm:mt-4 md:mt-4">
            <p className="text-sm absolute left-2 -top-3 bg-appGreen text-white font-poppinsRegular rounded p-1">Address</p>
            <form className="max-w-md gap-4 w-fit border shadow rounded p-4 pt-3">
                <div className=" mt-4">
                    <ToggleSwitch color="green" theme={customSwitch} checked={switch1} label="Is your Physical address the same as Postal address?" onChange={setSwitch1} />
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Physical Address *" />
                        </div>
                        <TextInput sizing="sm" onChange={(e: any) => setPhysical(e.target.value)} value={physical} theme={customInputBoxTheme} color={"focuscolor"} icon={CiHome} id="name" type="text" placeholder="Physical Address" required />
                    </div>
                    {
                        switch1 ? null : (<div>
                            <div className="mb-2 block">
                                <Label htmlFor="Lname" value="Postal Address *" />
                            </div>
                            <TextInput sizing="sm" onChange={(e: any) => SetPostal(e.target.value)} value={postal} theme={customInputBoxTheme} color={"focuscolor"} icon={GiPostOffice} id="Lname" type="text" placeholder="Postal Address" required />
                        </div>)
                    }
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="postal" value="Proof of Address *" />
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
                    <Button className="mt-2 w-fit" theme={customsubmitTheme} type="submit" color="appsuccess">Save</Button>
                </Online>
            </form>
        </div>
    );
}

export default Address;