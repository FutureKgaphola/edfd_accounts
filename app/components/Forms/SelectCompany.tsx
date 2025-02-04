import Image from "next/image";
import { Alert, Button, Card, Checkbox, Label, Select, Spinner } from "flowbite-react";
import { customCheckboxTheme, customselectTheme, customsubmitTheme } from "@/app/SiteTheme/Theme";
import ledalogo from '../../assets/images/logoleda.png';
import { HiInformationCircle } from "react-icons/hi";
import { FormEvent, useState } from "react";
import tree from "../../assets/images/tree.jpg";
import { useDomReady } from "@/app/hooks/useDomReady";
import { Breadcrumbs } from "../BreadCrumbs";
import { ConfirmApplicationModal } from "../Modal/ConfirmApplication";
const SelectCompanyForm = () => {
    const [company, setCompany] = useState<string>('---');
    const { domReady } = useDomReady();
    const [openModal, setOpenModal] = useState(false);
    const [tncs, setTnCs] = useState<boolean>(false);
    const SubmitApplication=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(company=="" || company=="---" || !tncs) return;
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
                        <Card className="max-w-screen-xl h-fit m-4 p-2 self-center">
                            <form onSubmit={(e)=>SubmitApplication(e)}>
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


                                            <p className="font-poppinsLight text-sm text-center mt-2">Copyright © 2024 Limpopo Connexion. All rights reserved.</p>
                                        </div>



                                    </div>


                                    <div>
                                        <Alert color="warning" icon={HiInformationCircle} rounded>
                                            <span className="font-medium">Please note!</span> Personal data may be collected in order to process your loan. take note of our tnc&apos;s and POPI ACT for your assurance.
                                        </Alert>
                                        <h4>Please confirm and give your consent for the following:</h4>
                                        <ul className="list-disc ml-8">
                                            <li>
                                                I am not currently insolvent, receiving debt counselling or have a pending debt review or insolvency application.
                                            </li>
                                            <li>
                                                LEDA will use my personal data only to provide me with the service or product that I am applying for. I have read the <a className="text-appGreen underline" href="#" target="_blank">Privacy Statement</a>.
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="flex items-center gap-2">
                                            <Checkbox checked={tncs} onChange={() => setTnCs(tncs ? false : true)} id="agree" theme={customCheckboxTheme} color="success" />
                                            <Label htmlFor="agree">I have read and agree to the above</Label>
                                        </div>

                                    </div>
                                    <div className="w-full">
                                        <Button type="submit" theme={customsubmitTheme} color="appsuccess">Apply</Button>
                                    </div>

                                </div>
                            </form>

                        </Card>
                    </div>
                </div>
            </div>
            <ConfirmApplicationModal company={company} openModal={openModal} setOpenModal={setOpenModal}/>
        </div>
        // <ComingSoon/>
    );
}

export default SelectCompanyForm;