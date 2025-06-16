"use client"

import { Button, FooterDivider, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import { HiMail } from "react-icons/hi";
import { FormEvent, useState } from "react";
import { customInputBoxTheme, customsubmitTheme } from "../SiteTheme/Theme";
import { useRouter } from "next/navigation";
import { useLogin } from "../hooks/useLogin";
import { failureMessage } from "../notifications/successError";
import Image from "next/image";
import ledalogo from '../assets/images/logoleda.png';

const Login = () => {
    const [username, SetUserName] = useState("");
    const [password, setPassword] = useState("");
    const {handleLogin, loading}=useLogin();
    const router=useRouter();
    const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e?.preventDefault();
        if (!username.includes("@")) {
            failureMessage("Enter a valid email address.");
            return;
          }
        handleLogin(username,password).then(()=>{
            if (!sessionStorage.getItem('utoken') || sessionStorage.getItem('utoken') == null || !sessionStorage.getItem('utoken')) return;
            SetUserName("");
            setPassword("");
            router.push('/dashboard');
        }).catch((error:any)=>{
             sessionStorage.clear();
            failureMessage(String(error.message));
        })
       
    }
    return ( 
        <div className="w-full h-full mt-2 pt-2 mb-1 flex items-center justify-center">
            <div>
                <form onSubmit={(e)=>handleSubmit(e)} className=" bg-slate-50 flex max-w-md flex-col gap-4 w-screen flex-grow border p-7 rounded-md shadow-md">
                <Image
                        width={65}
                        height={65}
                        src={ledalogo}
                        alt="leda logo"
                        />
                    <h2 className="text-lg">Log Into Your Account</h2>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email1" value="Your Email" />
                        </div>
                        <TextInput onChange={(e:any) => SetUserName(e.target.value)} value={username} theme={customInputBoxTheme} color={"focuscolor"} icon={HiMail} id="email1" type="email" placeholder="name@mailprovider.com" required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password1" value="Your password" />
                        </div>
                        <TextInput onChange={(e:any) => setPassword(e.target.value)} value={password} theme={customInputBoxTheme} color={"focuscolor"} id="password1" type="password" max={15} maxLength={15} required />
                    </div>
                    
                        <Button isProcessing={loading} disabled={loading} theme={customsubmitTheme} type="submit" color="appsuccess">Log In</Button>
                    
                    <FooterDivider></FooterDivider>
                    <div className="flex justify-between">
                        <Link href={"/register"}>Not yet register?</Link>
                        <Link href={"/forgotpassword"}>Forgot password?</Link>
                    </div>

                </form>
            </div>
        </div>
     );
}
 
export default Login;