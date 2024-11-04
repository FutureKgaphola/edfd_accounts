"use client"
import { Label, Select } from "flowbite-react";
import { customselectTheme } from "../SiteTheme/Theme";
import Business from "../components/Business";
import { useState } from "react";
import NoApplication from "../components/NoApplication";
import Procurement from "../components/Procurement";
import Building from "../components/Building";
import Franchisee from "../components/Franchisee";

const dashboard = () => {
    const [loanType, setLoanType] = useState<string>('---');
    const [tab, setTab] = useState<string>('in progress');
    return (
        <div className="w-full mt-2 pt-2 mb-1 items-center justify-center content-center"
        >
            <div className="h-72 w-full" style={{
                backgroundImage:
                    "url('https://cdn.pixabay.com/photo/2017/11/27/21/31/computer-2982270_1280.jpg')",

            }}>
                <div className="mb-2 flex p-3 items-center justify-center">
                    <div>
                        <Label htmlFor="relation" value="Choose a loan you want to manage or apply *" />
                        <Select onChange={((e: any) => setLoanType(e?.target.value))} className="max-w-lg" id="Service" theme={customselectTheme} color={"success"} required>
                            <option >---</option>
                            <option >Business</option>
                            <option >Procurement</option>
                            <option >Building</option>
                            <option >Franchisee</option>
                        </Select>
                    </div>
                </div>
            </div>

            {loanType == "Business" ? <Business /> :
                loanType == "Procurement" ? <Procurement /> :
                    loanType == "Building" ? <Building /> :
                        loanType == "Franchisee" ? <Franchisee /> : null}

        </div>

    );
}

export default dashboard;