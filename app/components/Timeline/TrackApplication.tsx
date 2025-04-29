"use client";

import { customInputBoxTheme } from "@/app/SiteTheme/Theme";
import { Alert, Card, Label,TextInput } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import tree from "../../assets/images/tree.jpg";
import Image from "next/image";
import { MdOutlineManageSearch } from "react-icons/md";
import TimeLineChildComponent from "./TimeLineChildComponent";
import { useEffect, useState } from "react";
import { History } from "@/app/constants/sharedconstants";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import useApplications from "@/app/hooks/useApplications";

const TrackApplication = () => {
    const [history,setHistory] =useState<History[]>([]);
    const [SerachResult,setSerachResult]=useState("");
    const [Applications,SetApplications]=useState([]);
    const {data,isLoading,error}=useApplications();
    useEffect(()=>{
        SetApplications(data || []);
    },[data])
    const Trackprop = useSelector((state: RootState) => state.TackApplicationReducer);
    useEffect(() => {  
        setSerachResult(Trackprop.applicationId ? Trackprop.applicationId : '');
    }, []);
    return (
        <div>
            <div className="w-full overflow-clip h-full mt-18 mb-8 items-center justify-center">
                <div className="relative">
                    <Image className="w-full h-40 bg-no-repeat object-cover" src={tree} alt=".." />
                </div>

                <div className="flex justify-center items-center">

                    <div className="z-10 -mt-36 scroll-m-8">
                        <Card className="max-w-screen-xl w-full h-fit m-4 p-2 self-center">
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="history" value="Search using a tracking code or Reference N0." />
                                </div>
                                <TextInput
                                    maxLength={20}
                                    minLength={5}
                                    onChange={(e: any) =>setSerachResult(e.target.value)}
                                    theme={customInputBoxTheme}
                                    color={"focuscolor"}
                                    icon={MdOutlineManageSearch}
                                    id="history" type="text" placeholder="Seach for a loan history using a tracking code or Reference N0." required />
                            </div>
                            <Alert color="warning" icon={HiInformationCircle} rounded>
                                <span className="font-medium">Please note!</span> Personal data may be collected in order to process your loan. take note of our TnC and POPI ACT for your assurance.
                            </Alert>
                            <div className="overflow-x-auto max-h-[400px] h-72 p-4">
                                {!isLoading && Applications.length==0 && <p>No appliation(s) found.</p>}
                            {Applications
                                ?.filter((item:any) =>
                                    item.regNo.toLowerCase().includes(SerachResult.toLowerCase()) ||
                                    item.applicationRef.toString().includes(SerachResult)
                                )
                                ?.map((item:any) => (
                                    <TimeLineChildComponent key={item.id} id={item.applicationRef} date={item.create_date} Company={item.companyName} status={item.status} category={item.loanDocs} RegNo={item.regNo} body={item.message} stage={item?.stageAt} outcome={item?.outcome} />
                                ))}
                            </div>
                        </Card>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default TrackApplication;