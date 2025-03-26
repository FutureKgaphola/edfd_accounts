"use client";

import { customInputBoxTheme } from "@/app/SiteTheme/Theme";
import { Alert, Card, Label,TextInput } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import tree from "../../assets/images/tree.jpg";
import Image from "next/image";
import { MdOutlineManageSearch } from "react-icons/md";
import TimeLineChildComponent from "./TimeLineChildComponent";
import { useEffect, useState } from "react";
import { History, LoanHistory } from "@/app/constants/sharedconstants";

const TrackApplication = () => {
    const [history,setHistory] =useState<History[]>([]);
    useEffect(() => {  
        //fetch the history of the user
        setHistory(LoanHistory);
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
                                    <Label htmlFor="history" value="Search using a tracking code" />
                                </div>
                                <TextInput
                                    min={10000}
                                    max={50000000}
                                    maxLength={8}
                                    minLength={5}
                                    theme={customInputBoxTheme}
                                    color={"focuscolor"}
                                    icon={MdOutlineManageSearch}
                                    id="history" type="text" placeholder="Seach for a loan history using a tracking code." required />
                            </div>
                            <Alert color="warning" icon={HiInformationCircle} rounded>
                                <span className="font-medium">Please note!</span> Personal data may be collected in order to process your loan. take note of our TnC and POPI ACT for your assurance.
                            </Alert>
                             <div className="overflow-x-auto max-h-[400px] h-72 p-4">
                            {history?.map((item) => (

                                <TimeLineChildComponent key={item.id} id={item.id} date={item.date} status={item.status} category={item.category} title={item.title} body={item.body} stage={item?.stage} outcome={item?.outcome} />
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