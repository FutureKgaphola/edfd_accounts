"use client"
import { Alert, Button, Card, Label, Select, Spinner } from "flowbite-react";
import { customselectTheme, customsubmitTheme } from "../SiteTheme/Theme";
import Business from "../components/Business";
import { useEffect, useState } from "react";
import Procurement from "../components/Procurement";
import Building from "../components/Building";
import Franchisee from "../components/Franchisee";
import Image from "next/image";
import ledalogo from '../assets/images/logoleda.png';
import accept from '../assets/images/accept.png';
import company from '../assets/images/asset.png';
import user from '../assets/images/user.png';
import { Nav_bar } from "../components/Navbar";
import { useDomReady } from "../hooks/useDomReady";
import { TabSliceAction } from "@/lib/features/Tabprofile/TabprofileSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const dashboard = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const HandleProfileTab = (value: string) => {
        dispatch(TabSliceAction.SelectedTab({ tab: value }));
        router.push("/profile");
    }

    return (
        <div>
            <Nav_bar />
            <div className="w-full mb-1 items-center justify-center content-center"
            >
                <div className="h-72 w-full" style={{
                    backgroundImage:
                        "url('tree.jpg')",
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    height: '60dvh',
                    backgroundPosition: 'center',

                }}>
                    <div className="mb-5 flex -top-11 items-center justify-center">
                        <div className="bg-slate-50 p-4 rounded-md place-self-center mt-4">
                            <Alert color="green" className="mb-2">
                                <span className="font-medium">Hey. Nice to see you again.!</span> Complete your all profile before attempting to apply for a loan
                            </Alert>
                            <div className="flex flex-wrap items-center justify-center gap-2">

                                <Card href="#" className="max-w-sm flex items-center justify-center">
                                    <Image src={user} className="h-12 w-12 self-center" alt="..." />
                                    <Button onClick={() => HandleProfileTab("owner")} size="xs" theme={customsubmitTheme} color="success">Lead Profile</Button>
                                    <p className="font-thin text-xs self-center">86% complete</p>
                                </Card>
                                <Card href="#" className="max-w-sm flex items-center justify-center">
                                    <Image src={company} className="h-12 w-12 self-center" alt="..." />
                                    <Button onClick={() => HandleProfileTab("company")} size="xs" theme={customsubmitTheme} color="success">Company Profile</Button>
                                    <p className="font-thin text-xs self-center">6% complete</p>
                                </Card>
                                <Card href="#" className="max-w-sm flex items-center justify-center">
                                    <Image src={accept} className="h-12 w-12 self-center" alt="..." />
                                    <Button onClick={() => HandleProfileTab("apply")} className="bg-slate-400 hover:bg-slate-400 hover:cursor-not-allowed" size="xs" theme={customsubmitTheme} color="">Apply</Button>
                                    <p className="font-thin text-xs self-center">Profile not ready</p>
                                </Card>
                            </div>
                            {/* <Label className="text-lg font-poppinsBold" htmlFor="Service" value="Choose a loan you want to manage or apply for *" /> */}
                            {/* {
                                domReady ? (
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
                                ) : < div className="flex items-center justify-center">
                                    <br></br>
                                    <Spinner color="success" aria-label="Success spinner example" />
                                </div>
                            } */}


                            <p className="font-poppinsLight text-sm text-center mt-2">Copyright © 2024 Limpopo Connexion. All rights reserved.</p>
                        </div>

                    </div>
                </div>

            </div>
        </div>

    );
}

export default dashboard;