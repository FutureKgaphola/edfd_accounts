
import { customselectTheme } from "@/app/SiteTheme/Theme";
import { Label, Select } from "flowbite-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const SelectDistrict = ({ setSelectedDistrict,SelectedDistrict }: { setSelectedDistrict: Dispatch<SetStateAction<string>>,SelectedDistrict:string }) => {
    const [Districts,setDistricts]=useState([]);
    const { data , error, isLoading } = useQuery({
        queryFn: () => axios.get(`/api/District/retrive`),
        queryKey: ['Districts'],
    });
    
    useEffect(()=>{
        setDistricts(data?.data.Districts);
    },[data]);

    if (isLoading) return <LoadingSpinner color="warning" size="sm" />
    return (
        <div>
            <div className="mb-2 block">
                <Label htmlFor="empstatus" value="District *" />
            </div>
            <Select sizing="sm" value={SelectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} className="min-w-[250px] max-w-md" id="empstatus" theme={customselectTheme} color={"success"} required>
                <option>---</option>
                {
                    !error && !isLoading && Districts?.map((dist: any) => (
                        <option key={dist.id} value={dist.districtName}>{dist.districtName}</option>
                    ))
                }

            </Select>
        </div>
    );
}

export default SelectDistrict;