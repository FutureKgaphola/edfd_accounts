"use client"

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import { HiMail, HiUserAdd } from "react-icons/hi";
import { FormEvent, useEffect, useState } from "react";
import { customCheckboxTheme, customInputBoxTheme, customsubmitTheme } from "../SiteTheme/Theme";
import { useRouter } from "next/navigation";
import { useSignup } from "../hooks/useSignup";
import { useDispatch } from "react-redux";
import { AuthActions } from "@/lib/features/Auth/AuthuserSlice";
import ledalogo from '../assets/images/logoleda.png';
import Image from "next/image";

const Register = () => {
    const { handleSignup, loading } = useSignup();

    const [username, SetUserName] = useState("");
    const [password, setPassword] = useState("");
    const [IdNo, setIdNo] = useState("");
    const [phone, setPhone] = useState("");
    const [Name, SetName] = useState("");
    const [LName, SetLName] = useState("");
    const [note, setNote] = useState("");
    const [tncs, setTnCs] = useState<boolean>(false);
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
        if (typeof window !== "undefined") {
            dispatch(AuthActions.setAuthToken({ token: sessionStorage?.getItem("utoken") ?? null }));
        }
        if(window){
            window?.scrollTo({ top: window.innerHeight /15, behavior: "smooth" });
        }
       
    }, []);
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const result = await handleSignup({ username, phone, Name, LName, IdNo, password });
            console.log("result", result);
            await fetch("/api/users/sendVerifylink", {
                headers: {
                    "Content-Type": "application/json"
                },
                method: 'POST',
                body: JSON.stringify({
                    email: result?.user.user_email,
                    name: result?.user.first_name,
                    token: result?.token
                })
            });
            if (result) {
                ResetForm();
            }
        } catch (error) {
            console.error("Error during signup:", error);
        }
    }

    const ResetForm = () => {
        SetUserName("");
        SetName("");
        SetLName("");
        setPassword("");
        setIdNo("");
        setPhone("");
        setTnCs(false);
        setNote("kindly check email for a verification link");
    }
    return (
        <div className="w-full h-full -mt-4 -pt-4 mb-1 flex items-center justify-center">
            <div>
                <form onSubmit={(e) => handleSubmit(e)} className="bg-slate-50 flex max-w-md flex-col gap-4 w-screen flex-grow border p-7 rounded-md shadow-md">
                    <Image
                        width={65}
                        height={65}
                        src={ledalogo}
                        alt="loda logo"
                    />
                    <h2 className="text-lg">Let's Sign up for an Account</h2>
                    <p className="text-sm font-thin">Be truthful with the information you are about to provide as they will be used to determine your loan's success.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Name *" />
                            </div>
                            <TextInput onChange={(e: any) => SetName(e.target.value)} value={Name} theme={customInputBoxTheme} color={"focuscolor"} icon={HiUserAdd} id="name" type="text" placeholder="someone's name" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="Lname" value="Surname *" />
                            </div>
                            <TextInput onChange={(e: any) => SetLName(e.target.value)} value={LName} theme={customInputBoxTheme} color={"focuscolor"} icon={HiUserAdd} id="Lname" type="text" placeholder="someone's name" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="Email *" />
                            </div>
                            <TextInput onChange={(e: any) => SetUserName(e.target.value)} value={username} theme={customInputBoxTheme} color={"focuscolor"} icon={HiMail} id="email1" type="email" placeholder="name@mailprovider.com" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password1" value="Password *" />
                                <p className="text-sm font-thin">{password}</p>
                            </div>
                            <TextInput onChange={(e: any) => setPassword(e.target.value)} value={password} theme={customInputBoxTheme} color={"focuscolor"} id="password1" type="password" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="phone" value="Phone *" />
                            </div>
                            <TextInput onChange={(e: any) => setPhone(e.target.value)} value={phone} theme={customInputBoxTheme} color={"focuscolor"} id="phone" type="text" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="idno" value="SA-ID *" />
                            </div>
                            <TextInput
                                required maxLength={13}
                                onChange={(e: any) => setIdNo(e.target.value)} value={IdNo} theme={customInputBoxTheme} color={"focuscolor"} id="idno" type="text" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="agree" checked={tncs} onChange={() => setTnCs(tncs ? false : true)} theme={customCheckboxTheme} color="success" />
                        <Label htmlFor="agree" className="flex">
                            I agree with the&nbsp;
                            <Link href="#" className="text-appGreen hover:underline dark:text-appGreen">
                                terms and conditions
                            </Link>
                        </Label>
                    </div>
                    <Button isProcessing={loading} disabled={loading} theme={customsubmitTheme} type="submit" color="appsuccess">Sign Up</Button>
                    {note && <p className="text-appGreen">{note}</p>}
                    <hr></hr>
                    <div className="flex justify-end gap-2">
                        <p>Done signing up?</p> <Link className="text-appGreen" href={"/"}> Login</Link>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Register;