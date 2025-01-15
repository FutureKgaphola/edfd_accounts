
"use client";
import { Offline, Online } from "react-detect-offline";
import { Alert, Button, FooterDivider, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import { NetworkMessage, NetworkTitle, customInputBoxTheme, customsubmitTheme } from "../SiteTheme/Theme";
import { HiInformationCircle, HiMail } from "react-icons/hi";
import { useState } from "react";
import { failureMessage, successMessage } from "../notifications/successError";
import validator from 'validator';
import { sendPasswordResetEmail } from "../_logic/passReset";
import { usePublic_pages } from "../hooks/usePublic_pages";

export default function ForgotPassword() {
    const {IsNotSignedin}=usePublic_pages();
      IsNotSignedin();

    const [email, setEmail] = useState("");
    const [loading, setloading] = useState(false);
    const SendResetLink = () => {
        if (email !== "") {
            if (!validator.isEmail(email?.trim())) return failureMessage(String("Invalid Email format."));
            try {
                setloading(true);
                const resp = sendPasswordResetEmail(email.trim());
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
                "url('https://cdn.pixabay.com/photo/2016/11/19/15/43/tree-1839959_1280.jpg')",
        }}>

            <div>
                <div>
                    <form className=" bg-white flex max-w-md flex-col gap-4 w-screen flex-grow border p-7 rounded-md shadow-md">
                        <h2 className="text-lg font-bold">Send Password Reset</h2>
                        <p className="text-gray-600 font-light">Enter your email address below. We`ll look for your account and send you a password reset email.</p>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="Your Email" />
                            </div>
                            <TextInput value={email} onChange={(e: any) => setEmail(e.target.value)} theme={customInputBoxTheme} color={"focuscolor"} icon={HiMail} id="email1" type="email" placeholder="name@mailprovider.com" required />
                        </div>
                        <Online><Button isProcessing={loading} disabled={loading} onClick={() => SendResetLink()} theme={customsubmitTheme} type="button" color="appsuccess">Sent Password Reset</Button></Online>
                        <Offline>
                            <Alert color="warning" icon={HiInformationCircle}>
                                <span className="font-medium">Info alert!</span> {NetworkTitle}
                                <p className="text-xs text-gray-500">{NetworkMessage}</p>
                            </Alert></Offline>
                        <FooterDivider></FooterDivider>
                        <div className="flex justify-end gap-2">
                            <p>Already have an account?</p> <Link className="text-appGreen" href={"/"}> Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}
