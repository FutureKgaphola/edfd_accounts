
"use client";

import { HiBookmark, HiInformationCircle } from "react-icons/hi";
import { Alert, Button } from "flowbite-react";
import { customsubmitTheme } from "@/app/SiteTheme/Theme";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { DispatchResetAll } from "@/lib/dispatchReset";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export function QualifiedClientAert({SetLoanchoice,amount}:{SetLoanchoice:Dispatch<SetStateAction<string>>,amount:number}) {
  
  const router=useRouter();
 
  return (
    <Alert color="warning" icon={HiInformationCircle}>
      <span className="font-medium">Repayment amount R</span> {amount.toFixed(2)}
    </Alert>
  );
}
