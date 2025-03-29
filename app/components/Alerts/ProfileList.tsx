import { customselectTheme, customsubmitTheme } from "@/app/SiteTheme/Theme";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Alert, Button, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import { CompanyAction } from "@/lib/features/Companies/CompanySlice";
import { useDispatch } from "react-redux";
import { SelectedCompanyAction } from "@/lib/features/Companies/SelectedCompanySlice";
import { AddCompSliceAction } from "@/lib/features/AddCompany/AddCompanySlice";

const ProfileList = ({user_email}:{user_email:string}) => {
    const queryClient = useQueryClient();
    const[selectedinput,Setselectedinput]=useState("---");
    const setSelectedCompany=(selected:string)=>{
        Setselectedinput(selected);
        dispatch(SelectedCompanyAction.SetGlobalselectedcompReg({regNo:selected}));   
    }
    const HandleUIChangesCompany=(reqClick:string)=>{
        if(reqClick=="Create"){
            //dispatch(SelectedCompanyAction.SetGlobalselectedcompReg({regNo:''}));
            dispatch(AddCompSliceAction.AddCompany({isShowForms:true,actionClicked:'Create'}));
        }
        if(reqClick=="Update"){
            if(selectedinput && selectedinput!=="---" && selectedinput!==""){
                dispatch(AddCompSliceAction.AddCompany({isShowForms:false,actionClicked:'Update'}));
            }   
        }
        if(reqClick=="Documents"){
            dispatch(AddCompSliceAction.AddCompany({isShowForms:false,actionClicked:'Documents'}));
        }
        if(reqClick=="Director"){
            dispatch(AddCompSliceAction.AddCompany({isShowForms:false,actionClicked:'Director'}));
        }
        if(reqClick=="Delete"){
            dispatch(AddCompSliceAction.AddCompany({isShowForms:false,actionClicked:'Delete'}));
        }
        
    }
    const dispatch = useDispatch();
    const { data , error, isLoading } = useQuery({
        queryFn: () => axios.get(`/api/companies/retrive/?user_email=${user_email}`),
        queryKey: ['Registeredcompanies'],
    });
    const [companies,setcompanies]=useState([]);
    useEffect(() => {
        if (data?.data?.companies) {
            setcompanies(data.data.companies);
            dispatch(CompanyAction.SetGlobalCompanies({ companies: data.data.companies }));
            dispatch(AddCompSliceAction.AddCompany({isShowForms:false,actionClicked:'ShowDocs'}));
        }
    }, [data, dispatch]);

    const { mutateAsync: RefetchCompanyDocs } = useMutation({
        mutationFn: async (tg: string) =>HandleUIChangesCompany(tg),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["BDocs"] });
        }
    });

    if (isLoading) return <LoadingSpinner color="warning" size="sm" />

    return (
        <Alert color="warning" rounded>
            <div className="flex flex-wrap gap-2 justify-center items-center">
             <p>My Companies </p>
            <Select sizing="sm"
                onChange={(e: any) => setSelectedCompany(e?.target.value)}
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
            <div className="flex gap-2 flex-wrap">
            <Button onClick={()=>RefetchCompanyDocs("Create")} size="xs" className="w-fit" theme={customsubmitTheme} type="submit" color="appsuccess">Create</Button>
            <Button onClick={()=>RefetchCompanyDocs("Documents")} size="xs" className="w-fit" theme={customsubmitTheme} type="submit" color="appsuccess">Documents</Button>
            <Button onClick={()=>RefetchCompanyDocs("Update")} size="xs" className="w-fit" theme={customsubmitTheme} type="submit" color="appsuccess">Update(Indentification,Address,Banking)</Button>
            <Button onClick={()=>RefetchCompanyDocs("Director")} size="xs" className="w-fit" theme={customsubmitTheme} type="submit" color="appsuccess">Director</Button>
            <Button onClick={()=>RefetchCompanyDocs("Delete")} size="xs" className="w-fit" theme={customsubmitTheme} type="submit" color="failure">Delete</Button>
            </div>
            </div>
           
        </Alert>
    );
}

export default ProfileList;