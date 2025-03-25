import Image from "next/image";
import { Button, Card, Label, Select, Spinner } from "flowbite-react";
import { customselectTheme, customsubmitTheme } from "@/app/SiteTheme/Theme";
import ledalogo from '../../assets/images/logoleda.png';

import { useState } from "react";
import tree from "../../assets/images/tree.jpg";
import { useDomReady } from "@/app/hooks/useDomReady";
import { Breadcrumbs } from "../BreadCrumbs";
import { ConfirmApplicationModal } from "../Modal/ConfirmApplication";
import { useRouter } from "next/navigation";
import ActiveBusiness_loan from "../ActiveBusiness_loan";
import NoHistory from "../NoHistory";
const SelectCompanyForm = () => {
    const [company, setCompany] = useState<string>('---');
    const router = useRouter();
    const [tab,setTab]=useState<string>('---');
    const { domReady } = useDomReady();
    const [openModal, setOpenModal] = useState(false);
    
    const SubmitApplication = () => {
        if (company == "" || company == "---") return;
        setOpenModal(true);
    }
    return (
        <div>
            <div className="w-full overflow-clip h-full mt-18 mb-8 items-center justify-center">
                <div className="relative">
                    <Image className="w-full h-40 bg-no-repeat object-cover" src={tree} alt=".." />

                </div>

                <div className="flex justify-center items-center">

                    <div className="z-10 -mt-36 scroll-m-8">
                        <Card className="max-w-screen-xl w-full h-fit m-4 p-2 self-center">
                            <form>
                                <Breadcrumbs />

                                <div className="space-y-2">

                                    <div className="flex p-3 items-center justify-center">

                                        <div className="bg-slate-50 p-4 rounded-md place-self-center border mb-4">
                                            <Image src={ledalogo} className="h-20 w-24 mx-auto" alt="..." />
                                            <Label className="text-lg font-poppinsBold" htmlFor="Service" value="Choose a company you want to apply using*" />
                                            {
                                                domReady ? (
                                                    <Select
                                                        onChange={(e: any) => setCompany(e?.target.value)}
                                                        className="max-w-2xl"
                                                        id="Service"
                                                        theme={customselectTheme}
                                                        color="success"
                                                        required
                                                    >
                                                        <option>---</option>
                                                        <option>Marumo Holdings</option>
                                                        <option>Setlago Tents</option>
                                                        <option>Robert & Robberts</option>
                                                        <option>Mahlako Meals</option>

                                                    </Select>
                                                ) : < div className="flex items-center justify-center">
                                                    <br></br>
                                                    <Spinner color="success" aria-label="Success spinner example" />
                                                </div>
                                            }

                                            <div className=" flex gap-2 justify-center mt-2">
                                                <Button onClick={()=>SubmitApplication()} as={"button"} theme={customsubmitTheme} size="xs" color="success">
                                                    Apply
                                                </Button>
                                                <Button onClick={()=>setTab("progress")} as={"button"} theme={customsubmitTheme} size="xs" color="success">
                                                    Track Application
                                                </Button>
                                                <Button  onClick={()=>setTab("history")} as={"button"} theme={customsubmitTheme} size="xs" color="success">
                                                    History
                                                </Button>
                                            </div>

                                            <p className="font-poppinsLight text-sm text-center mt-2">Copyright © 2024 Limpopo Connexion. All rights reserved.</p>
                                        </div>

                                    </div>

                                    

                                </div>
                            </form>
                            {tab=="progress" ? <ActiveBusiness_loan/> : null}
                            {tab=="history" ? <NoHistory/> : null}

                        </Card>
                    </div>
                </div>
            </div>
            <ConfirmApplicationModal company={company} openModal={openModal} setOpenModal={setOpenModal} />
        </div>
        // <ComingSoon/>
    );
}

export default SelectCompanyForm;