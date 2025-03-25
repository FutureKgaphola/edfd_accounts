

import { Alert, Button, Card, FileInput, Label, TextInput } from "flowbite-react";
import { Offline, Online } from "react-detect-offline";
import { HiMail, HiInformationCircle, HiUserAdd, HiCloudDownload } from "react-icons/hi";
import { useEffect, useState } from "react";
import { NetworkMessage, NetworkTitle } from "../../TempData/StaticData";
import { customInputBoxTheme, customsubmitTheme } from "@/app/SiteTheme/Theme";
import TruthfullAlert from "../Alerts/TruthfullAlert";
import useProfile from "@/app/hooks/useProfile";
import LoadingAlert from "../Alerts/LoadingAlert";
import ErrorAlert from "../Alerts/ErrorAlert";
import useSubmitPersonal from "@/app/hooks/useSubmitPersonal";
import axios from "axios";
import { failureMessage } from "@/app/notifications/successError";

const Personal = () => {

    const [tncs, setTnCs] = useState<boolean>(false);
    const { data, isLoading, error } = useProfile();
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
        if (data) {
            const { first_name, last_name, phone, saId, user_email, filename: fln, id } = data;
            SetUserName(user_email ?? "");
            setIdNo(saId ?? "");
            setuserphone(phone ?? "");
            SetName(first_name ?? "");
            SetLName(last_name ?? "");
            setServerFileName(fln ?? "");
            setId(id ?? "");
        }

    }, [data, success]);

    const handleDownload = async () => {
        const resp = await axios.get(`/api/download?id=${id}&m=${username}`, { responseType: 'blob' });
        if (resp.status !== 200 || !resp.data.size) {
            failureMessage(resp.statusText);
            return;
        }
        const blob = new Blob([resp.data]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${ServerFileName}`);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
        window.URL?.revokeObjectURL(url);
    }
    return (

        <Card className="h-fit m-4">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Provide Personal informaition of the person responsible for this account</h3>

            <TruthfullAlert />
            {isLoading && <LoadingAlert />}
            {error && <ErrorAlert errorMsg={error.message} />}
            <div className="flex gap-2 pt-4 overflow-x-auto max-w-full">

                <div className="relative">
                    <p className="text-sm absolute left-2 -top-3 bg-appGreen text-white font-poppinsRegular rounded p-1">Profile</p>
                    <form onSubmit={(e) => submitForm(Name, username, LName, userphone, IdNo, filename, pdfFile, data.id, e)} className="grid grid-cols-2 max-w-md gap-4 w-screen border shadow rounded p-4 pt-3">

                        <div >
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="name" value="Name" />
                                </div>
                                <TextInput sizing="sm" onChange={(e: any) => SetName(e.target.value)} value={Name} theme={customInputBoxTheme} color={"focuscolor"} icon={HiUserAdd} id="name" type="text" placeholder="someone's name" required />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="Lname" value="Surname" />
                                </div>
                                <TextInput sizing="sm" onChange={(e: any) => SetLName(e.target.value)} value={LName} theme={customInputBoxTheme} color={"focuscolor"} icon={HiUserAdd} id="Lname" type="text" placeholder="someone's name" required />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="email1" value="Email" />
                                </div>
                                <TextInput className="hover:cursor-not-allowed" sizing="sm" readOnly
                                    onChange={(e: any) => SetUserName(e.target.value)} value={username} theme={customInputBoxTheme} color={"focuscolor"} icon={HiMail} id="email1" type="email" placeholder="name@mailprovider.com" required />
                            </div>
                            <p>{errorp}</p>

                        </div>

                        <div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="phone" value="Phone *" />
                                </div>
                                <TextInput sizing="sm"
                                    min={10}
                                    maxLength={10}
                                    onChange={(e: any) => setuserphone(e.target.value)} value={userphone} theme={customInputBoxTheme} color={"focuscolor"} id="phone" type="text" required />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="idno" value="SA-ID *" />
                                </div>
                                <TextInput sizing="sm"
                                    min={13}
                                    required maxLength={13}
                                    onChange={(e: any) => setIdNo(e.target.value)} value={IdNo} theme={customInputBoxTheme} color={"focuscolor"} id="idno" type="text" />
                            </div>
                            <div>
                                <div>
                                    <Label htmlFor="file-upload-helper-text" value="Certified SA-ID copy*" />
                                </div>
                                <div className="flex gap-1">
                                    {ServerFileName ? (<HiCloudDownload onClick={() => handleDownload()} className="hover:cursor-pointer" width={35} height={35} />) : null}
                                    <p className="text-xs">{ServerFileName}</p>
                                </div>

                                <FileInput className="max-w-md"
                                    onChange={handleFileChange}
                                    sizing="sm" id="file-upload-helper-text" accept="application/pdf" helperText=".pdf(MAX. 40MB)." />
                            </div>

                        </div>
                        <Online>
                            <Button className="mt-2 w-fit" theme={customsubmitTheme} type="submit" color="appsuccess">Save</Button>
                            <p className="text-sm">You may be required to login again after this action.</p>
                        </Online>
                        <Offline>
                            <Alert color="warning" icon={HiInformationCircle}>
                                <span className="font-medium">Info alert!</span> {NetworkTitle}
                                <p className="text-xs text-gray-500">{NetworkMessage}</p>
                            </Alert></Offline>
                    </form>
                </div>

                <div className="relative">
                    <p className="text-sm absolute left-2 -top-3 bg-appGreen text-white font-poppinsRegular rounded p-1">Address</p>
                    <form onSubmit={(e) => submitForm(Name, username, LName, userphone, IdNo, filename, pdfFile, data.id, e)} className="grid grid-cols-2 max-w-md gap-4 w-screen border shadow rounded p-4 pt-3">

                        <div >
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="name" value="Name" />
                                </div>
                                <TextInput sizing="sm" onChange={(e: any) => SetName(e.target.value)} value={Name} theme={customInputBoxTheme} color={"focuscolor"} icon={HiUserAdd} id="name" type="text" placeholder="someone's name" required />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="Lname" value="Surname" />
                                </div>
                                <TextInput sizing="sm" onChange={(e: any) => SetLName(e.target.value)} value={LName} theme={customInputBoxTheme} color={"focuscolor"} icon={HiUserAdd} id="Lname" type="text" placeholder="someone's name" required />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="email1" value="Email" />
                                </div>
                                <TextInput className="hover:cursor-not-allowed" sizing="sm" readOnly
                                    onChange={(e: any) => SetUserName(e.target.value)} value={username} theme={customInputBoxTheme} color={"focuscolor"} icon={HiMail} id="email1" type="email" placeholder="name@mailprovider.com" required />
                            </div>
                            <p>{errorp}</p>

                        </div>

                        <div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="phone" value="Phone *" />
                                </div>
                                <TextInput sizing="sm"
                                    min={10}
                                    maxLength={10}
                                    onChange={(e: any) => setuserphone(e.target.value)} value={userphone} theme={customInputBoxTheme} color={"focuscolor"} id="phone" type="text" required />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="idno" value="SA-ID *" />
                                </div>
                                <TextInput sizing="sm"
                                    min={13}
                                    required maxLength={13}
                                    onChange={(e: any) => setIdNo(e.target.value)} value={IdNo} theme={customInputBoxTheme} color={"focuscolor"} id="idno" type="text" />
                            </div>
                            <div>
                                <div>
                                    <Label htmlFor="file-upload-helper-text" value="Certified SA-ID copy*" />
                                </div>
                                <div className="flex gap-1">
                                    {ServerFileName ? (<HiCloudDownload onClick={() => handleDownload()} className="hover:cursor-pointer" width={35} height={35} />) : null}
                                    <p className="text-xs">{ServerFileName}</p>
                                </div>

                                <FileInput className="max-w-md"
                                    onChange={handleFileChange}
                                    sizing="sm" id="file-upload-helper-text" accept="application/pdf" helperText=".pdf(MAX. 40MB)." />
                            </div>

                        </div>
                        <Online>
                            <Button className="mt-2 w-fit" theme={customsubmitTheme} type="submit" color="appsuccess">Save</Button>
                            <p className="text-sm">You may be required to login again after this action.</p>
                        </Online>
                        <Offline>
                            <Alert color="warning" icon={HiInformationCircle}>
                                <span className="font-medium">Info alert!</span> {NetworkTitle}
                                <p className="text-xs text-gray-500">{NetworkMessage}</p>
                            </Alert></Offline>
                    </form>
                </div>

                <div className="relative">
                    <p className="text-sm absolute left-2 -top-3 bg-appGreen text-white font-poppinsRegular rounded p-1">Banking</p>
                    <form onSubmit={(e) => submitForm(Name, username, LName, userphone, IdNo, filename, pdfFile, data.id, e)} className="grid grid-cols-2 max-w-md gap-4 w-screen border shadow rounded p-4 pt-3">

                        <div >
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="name" value="Name" />
                                </div>
                                <TextInput sizing="sm" onChange={(e: any) => SetName(e.target.value)} value={Name} theme={customInputBoxTheme} color={"focuscolor"} icon={HiUserAdd} id="name" type="text" placeholder="someone's name" required />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="Lname" value="Surname" />
                                </div>
                                <TextInput sizing="sm" onChange={(e: any) => SetLName(e.target.value)} value={LName} theme={customInputBoxTheme} color={"focuscolor"} icon={HiUserAdd} id="Lname" type="text" placeholder="someone's name" required />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="email1" value="Email" />
                                </div>
                                <TextInput className="hover:cursor-not-allowed" sizing="sm" readOnly
                                    onChange={(e: any) => SetUserName(e.target.value)} value={username} theme={customInputBoxTheme} color={"focuscolor"} icon={HiMail} id="email1" type="email" placeholder="name@mailprovider.com" required />
                            </div>
                            <p>{errorp}</p>

                        </div>

                        <div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="phone" value="Phone *" />
                                </div>
                                <TextInput sizing="sm"
                                    min={10}
                                    maxLength={10}
                                    onChange={(e: any) => setuserphone(e.target.value)} value={userphone} theme={customInputBoxTheme} color={"focuscolor"} id="phone" type="text" required />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="idno" value="SA-ID *" />
                                </div>
                                <TextInput sizing="sm"
                                    min={13}
                                    required maxLength={13}
                                    onChange={(e: any) => setIdNo(e.target.value)} value={IdNo} theme={customInputBoxTheme} color={"focuscolor"} id="idno" type="text" />
                            </div>
                            <div>
                                <div>
                                    <Label htmlFor="file-upload-helper-text" value="Certified SA-ID copy*" />
                                </div>
                                <div className="flex gap-1">
                                    {ServerFileName ? (<HiCloudDownload onClick={() => handleDownload()} className="hover:cursor-pointer" width={35} height={35} />) : null}
                                    <p className="text-xs">{ServerFileName}</p>
                                </div>

                                <FileInput className="max-w-md"
                                    onChange={handleFileChange}
                                    sizing="sm" id="file-upload-helper-text" accept="application/pdf" helperText=".pdf(MAX. 40MB)." />
                            </div>

                        </div>
                        <Online>
                            <Button className="mt-2 w-fit" theme={customsubmitTheme} type="submit" color="appsuccess">Save</Button>
                            <p className="text-sm">You may be required to login again after this action.</p>
                        </Online>
                        <Offline>
                            <Alert color="warning" icon={HiInformationCircle}>
                                <span className="font-medium">Info alert!</span> {NetworkTitle}
                                <p className="text-xs text-gray-500">{NetworkMessage}</p>
                            </Alert></Offline>
                    </form>
                </div>
            </div>
        </Card>
    );
}

export default Personal;