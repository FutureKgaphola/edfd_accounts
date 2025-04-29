"use client";

import { Button } from "flowbite-react";
import { customsubmitTheme } from "../SiteTheme/Theme";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ActiveBusiness_loan from "./ActiveBusiness_loan";
import { HistoryTable } from "./HistoryTable";

const Business = ({loanType}:{loanType:string}) => {
    const router = useRouter();
    const [tab,setTab]=useState<string>('progress');
    useEffect(()=>{
        setTab('progress')
    },[]);
    return (
        <div className="gap-2">
            <div className="bg-slate-50 border gap-2 p-3 flex items-end justify-end">
                <Button onClick={()=>setTab('progress')} color="light" theme={customsubmitTheme} pill>
                    Current Application
                </Button>
                <Button onClick={()=>setTab('History')} color="appsuccess" theme={customsubmitTheme} pill>
                    History
                </Button>
                <Button onClick={() => router.push(`/applyloan/${loanType}`)} color="appsuccess" theme={customsubmitTheme} pill>
                    Apply for a loan
                </Button>
            </div>
            <div>
                {tab =='progress' ? <ActiveBusiness_loan/> : 
                tab =='History' ? <HistoryTable/>: null
            }
                
            </div>
        </div>
    );
}

export default Business;