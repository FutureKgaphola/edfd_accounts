
"use client";
import { Alert, Button, FooterDivider, Label, Radio, TextInput } from "flowbite-react";
import Link from "next/link";
import { customInputBoxTheme, customsubmitTheme } from "../SiteTheme/Theme";
import { HiMail } from "react-icons/hi";
import { TbNumber123 } from "react-icons/tb";
import { useState } from "react";
import { failureMessage, successMessage } from "../notifications/successError";
import validator from 'validator';
import { usePublic_pages } from "../hooks/usePublic_pages";
import Image from "next/image";
import ledalogo from '../assets/images/logoleda.png';

export default function ForgotPassword() {
    const { IsNotSignedin } = usePublic_pages();
    IsNotSignedin();

    const [email, setEmail] = useState("");
    const [TabChice, SetTabChice] = useState("Request OTP");
    const [otp, setOTP] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [loading, setloading] = useState(false);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        SetTabChice(event.target.value);
    };
    const SendResetLink = () => {
        if (email !== "") {
            if (!validator.isEmail(email?.trim())) return failureMessage(String("Invalid Email format."));
            try {
                setloading(true);
                ///call api here
                const resp = true; //if resp from api is true then successful
                if (resp) {
                    successMessage('Password reset link has been sent to :' + email);
                    setloading(false);
                    setEmail("");
                } else {
                    failureMessage('Email provided is not found/registered on the system.');
                    setloading(false);
                }
            } catch (error: any) {
                failureMessage(String(error));
                setloading(false);
            }
        } else {
            failureMessage("Email is required");
            setloading(false);
        }
    }
    return (
        <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]" style={{
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundImage:
                "url('tree.jpg')",
        }}>

            <div>
                <div>
                    <form className=" bg-white flex max-w-md flex-col gap-4 w-screen flex-grow border p-7 rounded-md shadow-md">

                        <Image
                            width={65}
                            height={65}
                            src={ledalogo}
                            alt="loda logo"
                        />
                        <h2 className="text-lg font-bold">Send Password Reset</h2>
                        <p className="text-gray-600 font-light">Enter your email address below. We`ll look for your account and send you an OTP(One Time Pin).</p>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="Email" />
                            </div>
                            <TextInput value={email} onChange={(e: any) => setEmail(e.target.value)} theme={customInputBoxTheme} color={"focuscolor"} icon={HiMail} id="email1" type="email" placeholder="name@mailprovider.com" required />
                        </div>
                        <fieldset className="flex max-w-md flex-wrap gap-4">
                            <legend className="mb-4 font-bold break-words text-wrap text-xs">Received The OTP?</legend>

                            <div className="flex items-center gap-2">
                                <Radio
                                    id="requestOTP"
                                    name="Request OTP"
                                    value="Request OTP"
                                    checked={TabChice === "Request OTP"}
                                    onChange={handleChange}
                                />
                                <Label htmlFor="requestOTP">Request OTP</Label>
                            </div>

                            <div className="flex items-center gap-2">
                                <Radio
                                    id="I-have-an-OTP"
                                    name="I have an OTP"
                                    value="I have an OTP"
                                    checked={TabChice === 'I have an OTP'}
                                    onChange={handleChange}
                                />
                                <Label htmlFor="I-have-an-OTP">I have an OTP</Label>
                            </div>
                        </fieldset>
                        {
                            TabChice === "I have an OTP" ?
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="otp" value="OTP" />
                                    </div>
                                    <TextInput value={otp} onChange={(e: any) => setOTP(e.target.value)} theme={customInputBoxTheme} color={"focuscolor"} icon={TbNumber123} id="otp" type="text" placeholder="Enter OTP" required />
                                </div> : null
                        }
                        {
                            TabChice === "I have an OTP" ?
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="newpassword" value="New Password" />
                                    </div>
                                    <TextInput value={newpassword} onChange={(e: any) => setNewPassword(e.target.value)} theme={customInputBoxTheme} color={"focuscolor"} icon={TbNumber123} id="newpassword" type="password" placeholder="Enter New Password" required />
                                </div> : null
                        }
                        {
                            TabChice === "Request OTP" ? <Button isProcessing={loading} disabled={loading} onClick={() => SendResetLink()} theme={customsubmitTheme} type="button" color="appsuccess">Request OTP</Button> : null
                        }
                        
                        {
                            TabChice === "I have an OTP" ? <Button isProcessing={loading} disabled={loading} theme={customsubmitTheme} type="button" color="appsuccess">Reset My Password</Button> : null
                        }
                        
                        <FooterDivider></FooterDivider>
                        <div className="flex justify-end gap-2">
                            <p>Done with reset?</p> <Link className="text-appGreen" href={"/"}> Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
