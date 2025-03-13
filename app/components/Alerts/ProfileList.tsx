import { customselectTheme } from "@/app/SiteTheme/Theme";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Alert, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import { CompanyAction } from "@/lib/features/Companies/CompanySlice";
import { useDispatch } from "react-redux";
import { SelectedCompanyAction } from "@/lib/features/Companies/SelectedCompanySlice";

const ProfileList = ({user_email}:{user_email:string}) => {
    const queryClient = useQueryClient();
    const setSelectedCompany=(selected:string)=>{
        dispatch(SelectedCompanyAction.SetGlobalselectedcompReg({regNo:selected}));
    }
    const dispatch = useDispatch();
    const { data , error, isLoading } = useQuery({
        queryFn: () => axios.get(`/api/companies/retrive/?user_email=${user_email}`),
        queryKey: ['Registeredcompanies'],
    });
    const [companies,setcompanies]=useState([]);
    useEffect(()=>{
        setcompanies(data?.data.companies);
        dispatch(CompanyAction.SetGlobalCompanies({companies:data?.data.companies}) || []);
        
    },[data]);

    const { mutateAsync: RefetchCompanyDocs } = useMutation({
        mutationFn: async (tg: string) =>setSelectedCompany(tg),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["BDocs"] });
        }
    });

    if (isLoading) return <LoadingSpinner color="warning" size="sm" />

    return (
        <Alert color="warning" icon={HiInformationCircle} rounded>
            <div className="flex gap-2 justify-center items-center">
             <p>My Companies </p>
            <Select sizing="sm"
                onChange={(e: any) => RefetchCompanyDocs(e?.target.value)}
                className="max-w-2xl ml-2"
                id="Service"
                theme={customselectTheme}
                color="success"
                required
            >
                <option>---</option>
                {
                    !error && !isLoading && companies?.map((company: any) => (
                        <option key={company.id} value={company.regNo}>{company.compName}</option>
                    ))
                }
            
                
            </Select>
            </div>
           
        </Alert>
    );
}

export default ProfileList;