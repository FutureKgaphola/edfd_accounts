"use client"
import { Label, Select } from "flowbite-react";
import { customselectTheme } from "../SiteTheme/Theme";
import Business from "../components/Business";
import { useState } from "react";
import Procurement from "../components/Procurement";
import Building from "../components/Building";
import Franchisee from "../components/Franchisee";
import Image from "next/image";
import ledalogo from '../assets/images/logoleda.png';
import { Nav_bar } from "../components/Navbar";

const dashboard = () => {
    const [loanType, setLoanType] = useState<string>('---');
    const [tab, setTab] = useState<string>('in progress');
    return (
        <>
        <Nav_bar />
        <div className="w-full mb-1 items-center justify-center content-center"
        >
            <div className="h-72 w-full" style={{
                backgroundImage:
                    "url('https://cdn.pixabay.com/photo/2016/11/19/15/43/tree-1839959_1280.jpg')",
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                height: '50dvh',
                backgroundPosition: 'center'

            }}>
                <div className="mb-2 flex p-3 items-center justify-center">
                    <div className="bg-slate-50 p-4 rounded-md place-self-center mt-4">
                        <Image src={ledalogo} className="h-20 w-24 mx-auto" alt="..." />
                        <Label className="text-lg font-poppinsBold" htmlFor="Service" value="Choose a loan you want to manage or apply for *" />
                        <Select
                            onChange={(e: any) => setLoanType(e?.target.value)}
                            className="max-w-2xl"
                            id="Service"
                            theme={customselectTheme}
                            color="success"
                            required
                        >
                            <option>---</option>
                            <option>Business</option>
                            <option>Procurement</option>
                            <option>Building</option>
                            <option>Franchisee</option>
                        </Select>
                        <p className="font-poppinsLight text-sm text-center mt-2">Copyright © 2024 Limpopo Connexion. All rights reserved.</p>
                    </div>

                </div>
            </div>

            {loanType == "Business" ? <Business loanType={loanType} /> :
                loanType == "Procurement" ? <Procurement loanType={loanType} /> :
                    loanType == "Building" ? <Building loanType={loanType} /> :
                        loanType == "Franchisee" ? <Franchisee loanType={loanType} /> : null}
        </div>
        </>
        
    );
}

export default dashboard;