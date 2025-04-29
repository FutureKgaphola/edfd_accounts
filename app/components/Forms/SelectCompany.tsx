import Image from "next/image";
import { Alert, Button, Card, Label, Select, Spinner } from "flowbite-react";
import { customselectTheme, customsubmitTheme } from "@/app/SiteTheme/Theme";
import ledalogo from '../../assets/images/logoleda.png';
import { useCallback, useEffect, useMemo, useState } from "react";
import tree from "../../assets/images/tree.jpg";
import { useDomReady } from "@/app/hooks/useDomReady";
import { Breadcrumbs } from "../BreadCrumbs";
import { ConfirmApplicationModal } from "../Modal/ConfirmApplication";
import { HiInformationCircle } from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RootState } from "@/lib/store";
import { getCompanyDistrictID } from "@/app/services/Find_CompanyAddress_district";
import { getDistrict } from "@/app/services/Find_district_by_id";
import { useSelector } from "react-redux";

const SelectCompanyForm = () => {
    const [company, setCompany] = useState<string>('---');
    const [openModal, setOpenModal] = useState(false);
    const { domReady } = useDomReady();
    const Authprop = useSelector((state: RootState) => state.AuthReducer);
    const authEmail = Authprop?.user?.user_email ?? "";

    const [DistID, setDistID] = useState("");
    const [DistrName, setDistrName] = useState("");
    const [regNo, setRegNo] = useState("");
    const [companyName, setCompanyName] = useState("");
    type Company = {
        id: string;
        regNo: string;
        TradeName: string;
    };
    const [companies, setCompanies] = useState<Company[]>([]);

    const { data, error, isLoading } = useQuery({
        queryFn: () => axios.get(`/api/companies/retrive/?user_email=${authEmail}`),
        queryKey: ['Registeredcompanies'],
        enabled: !!authEmail,
    });

    useEffect(() => {
        if (data?.data?.companies) {
            setCompanies(data.data.companies);
        }
    }, [data]);

    const fetchDistrictData = useCallback(async () => {
        if (!company.includes("-")) return;

        const [reg, name] = company.split("-");
        setRegNo(reg);
        setCompanyName(name);

        const distId = await getCompanyDistrictID(authEmail, reg);
        setDistID(distId);
        const districtName = await getDistrict(distId || "");
        setDistrName(districtName);
    }, [company, authEmail]);

    useEffect(() => {
        if (company && company !== "---") {
            fetchDistrictData();
        }
    }, [company, fetchDistrictData]);

    const SubmitApplication = useCallback(() => {
        if (!company || company.trim() === "---") return;
        setOpenModal(true);
    }, [company]);

    const companyOptions = useMemo(() => {
        return companies.map((company) => (
            <option key={company.id} value={`${company.regNo}-${company.TradeName}`}>
                {company.TradeName}
            </option>
        ));
    }, [companies]);

    return (
        <div>
            <div className="w-full overflow-clip h-full mt-18 mb-8 items-center justify-center">
                <div className="relative">
                    <Image priority
                        placeholder="blur" className="w-full h-40 bg-no-repeat object-cover" src={tree} alt="leda logo" />
                </div>

                <div className="flex justify-center items-center">

                    <div className="z-10 -mt-36 scroll-m-8">
                        <Card className="max-w-screen-xl w-full h-fit m-4 p-2 self-center">
                            <div>
                                <Breadcrumbs />

                                <div className="space-y-2">
                                    <Alert color="warning" icon={HiInformationCircle} rounded>
                                        <span className="font-medium">Please note!</span> Personal data may be collected in order to process your loan. take note of our TnC and POPI ACT for your assurance.
                                    </Alert>
                                    <div className="flex p-3 items-center justify-center">
                                        {companies ?

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
                                                            disabled={isLoading}
                                                        >
                                                            <option>---</option>
                                                            {!error && !isLoading && companyOptions}
                                                        </Select>
                                                    ) : < div className="flex items-center justify-center">
                                                        <br></br>
                                                        <Spinner color="success" aria-label="Success spinner example" />
                                                    </div>
                                                }

                                                <div className=" flex gap-2 justify-center mt-2">
                                                    <Button
                                                        onClick={SubmitApplication}
                                                        as={"button"}
                                                        theme={customsubmitTheme}
                                                        size="xs"
                                                        color="success"
                                                        disabled={company === "---" || isLoading}
                                                    >
                                                        Apply
                                                    </Button>
                                                </div>

                                                <p className="font-poppinsLight text-sm text-center mt-2">Copyright © 2025 Limpopo Connexion. All rights reserved.</p>
                                            </div>
                                            :
                                            <Alert color="failure" icon={HiInformationCircle} rounded>
                                                <span className="font-medium">Sorry!</span> It appears you dont have a company yet. please add a company before attempting to apply for loans.
                                            </Alert>
                                        }
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
            <ConfirmApplicationModal
                DistID={DistID}
                DistrName={DistrName}
                user_email={authEmail}
                regNo={regNo}
                companyName={companyName}
                openModal={openModal}
                setOpenModal={setOpenModal}
            />
        </div>

    );
}

export default SelectCompanyForm;