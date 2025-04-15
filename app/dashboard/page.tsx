"use client"
import { Alert, Button, Card } from "flowbite-react";
import { customsubmitTheme } from "../SiteTheme/Theme";
import Image from "next/image";
import accept from '../assets/images/accept.png';
import loading from '../assets/images/loadingbar.png';
import company from '../assets/images/asset.png';
import user from '../assets/images/user.png';
import { Nav_bar } from "../components/Navbar";
import { TabSliceAction } from "@/lib/features/Tabprofile/TabprofileSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RootState } from "@/lib/store";
import { useEffect, useState } from "react";

const dashboard = () => {

    const dispatch = useDispatch();
    const router = useRouter();
     const [companies, setcompanies] = useState([]);
     const Authprop = useSelector((state: RootState) => state.AuthReducer);
    const authEmail = Authprop?.user?.user_email ?? "";
    const { data, error, isLoading } = useQuery({
            queryFn: () => axios.get(`/api/companies/retrive/?user_email=${authEmail}`),
            queryKey: ['Registeredcompanies'],
            enabled: !!authEmail
        });
        useEffect(() => {
                if (data?.data?.companies) {
                    setcompanies(data.data.companies);
                }
            }, [data]);
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
                                <span className="font-medium">Hey. Nice to see you again.!</span> Complete your profile before attempting to apply for a loan
                            </Alert>
                            <div className="flex flex-wrap items-center justify-center gap-2">

                                <Card className="max-w-sm flex items-center justify-center">
                                    <Image src={user} className="h-12 w-12 self-center" alt="..." />
                                    <Button onClick={() => HandleProfileTab("owner")} size="xs" theme={customsubmitTheme} color="success">Lead Profile</Button>
                                    <p className="font-thin text-xs self-center"></p>
                                </Card>
                                <Card className="max-w-sm flex items-center justify-center">
                                    <Image src={company} className="h-12 w-12 self-center" alt="..." />
                                    <Button onClick={() => HandleProfileTab("company")} size="xs" theme={customsubmitTheme} color="success">Company Profile</Button>
                                    <p className="font-thin text-xs self-center"></p>
                                </Card>
                                <Card className="max-w-sm flex items-center justify-center">
                                    <Image src={accept} className="h-12 w-12 self-center" alt="..." />
                                    <Button disabled={companies?.length==0 ? true : false} onClick={() => HandleProfileTab("apply")} size="xs" theme={customsubmitTheme} color="success">Apply</Button>
                                    <p className="font-thin text-xs self-center">{companies?.length==0 ? "Profile not ready" : "Profile ready"}</p>
                                </Card>
                                <Card className="max-w-sm flex items-center justify-center">
                                    <Image src={loading} className="h-12 w-12 self-center" alt="..." />
                                    <Button onClick={() => router.push('/applicationstatus')}  size="xs" theme={customsubmitTheme} color="success">Applications Status</Button>
                                    <p className="font-thin text-xs self-center">Progress Bar</p>
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


                            <p className="font-poppinsLight text-sm text-center mt-2">Copyright © 2025 Limpopo Connexion. All rights reserved.</p>
                        </div>

                    </div>
                </div>

            </div>
        </div>

    );
}

export default dashboard;