import { Alert, Button, Card, Checkbox, FileInput, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import { Offline, Online } from "react-detect-offline";
import { HiMail, HiInformationCircle, HiUserAdd } from "react-icons/hi";
import { FormEvent, useEffect, useState } from "react";
import { NetworkMessage, NetworkTitle } from "../../TempData/StaticData";
import { customCheckboxTheme, customInputBoxTheme, customsubmitTheme } from "@/app/SiteTheme/Theme";
import TruthfullAlert from "../Alets/TruthfullAlert";

const Personal = () => {
    const [username, SetUserName] = useState("");
    const [IdNo, setIdNo] = useState("");
    const [phone, setPhone] = useState("");
    const [Name, SetName] = useState("");
    const [note, setNote] = useState("");
    const [tncs, setTnCs] = useState<boolean>(false);
    return (

        <Card className="h-fit m-4">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Provide Personal informaition of the person responsible for this account</h3>

            <TruthfullAlert />
            <form className="grid grid-cols-2 max-w-md gap-4 w-screen">

                <div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Your Name" />
                        </div>
                        <TextInput sizing="sm" onChange={(e: any) => SetName(e.target.value)} value={Name} theme={customInputBoxTheme} color={"focuscolor"} icon={HiUserAdd} id="name" type="text" placeholder="someone's name" required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email1" value="Your Email" />
                        </div>
                        <TextInput sizing="sm"
                            onChange={(e: any) => SetUserName(e.target.value)} value={username} theme={customInputBoxTheme} color={"focuscolor"} icon={HiMail} id="email1" type="email" placeholder="name@mailprovider.com" required />
                    </div>
                    <div>
                        <div>
                            <Label htmlFor="file-upload-helper-text" value="Certified SA-ID copy*" />
                        </div>
                        <FileInput className="max-w-md"
                            sizing="sm" id="file-upload-helper-text" accept="application/pdf" helperText=".pdf(MAX. 10MB)." />
                    </div>

                </div>

                <div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="phone" value="Your phone *" />
                        </div>
                        <TextInput sizing="sm" onChange={(e: any) => setPhone(e.target.value)} value={phone} theme={customInputBoxTheme} color={"focuscolor"} id="phone" type="text" required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="idno" value="Your SA-ID *" />
                        </div>
                        <TextInput sizing="sm"
                            required maxLength={13}
                            onChange={(e: any) => setIdNo(e.target.value)} value={IdNo} theme={customInputBoxTheme} color={"focuscolor"} id="idno" type="text" />
                    </div>

                </div>

            </form>

            <Online>
                <Button className="mt-2 w-fit" theme={customsubmitTheme} type="submit" color="appsuccess">Save</Button>
            </Online>
            <Offline>
                <Alert color="warning" icon={HiInformationCircle}>
                    <span className="font-medium">Info alert!</span> {NetworkTitle}
                    <p className="text-xs text-gray-500">{NetworkMessage}</p>
                </Alert></Offline>
            {note && <p className="text-appGreen">{note}</p>}

        </Card>
    );
}

export default Personal;