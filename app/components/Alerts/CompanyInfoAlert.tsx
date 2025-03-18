
"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Alert, Avatar } from "flowbite-react";
import { useEffect, useState } from "react";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useDistricts } from "@/app/hooks/useDistricts";
interface CompanyInfoAlertProps {
  compName: string;
  compEmail: string;
  phone: string;
  regNo: string;
  create_date: string;
  districtId: string;
}
interface District {
  id: string;
  districtName: string;
}
export function CompanyInfoAlert({ regNo }: { regNo: string }) {
  const { data: distdata, error: disterror, isLoading: distLoading } = useDistricts();
  const selectedprop = useSelector((state: RootState) => state.SelectedCompanyReducer);
  const { data, error, isLoading } = useQuery({
    queryFn: () => axios.get(`/api/companies/retrive/getone/?reg=${regNo}`),
    queryKey: ['selected_one_companies', { regNo }],
    enabled: !!regNo || regNo=='' ||regNo=='---', // Prevent fetching if `regNo` is undefined
  });

  const [compDetails, setcompany] = useState<CompanyInfoAlertProps>();
  const [District, setDistrict] = useState<District[]>([]);

  useEffect(() => {
    console.log(distdata?.data.Districts);
    setcompany(data?.data.company);
    setDistrict(distdata?.data.Districts);
  }, [data, selectedprop.regNo]);

  if (isLoading) return <LoadingSpinner color="warning" size="sm" />

  return (
    <Alert className="m-4 w-fit" color="warning" withBorderAccent>
      <Avatar placeholderInitials={compDetails?.compName.split(" ").map(word => word[0]).join("").toUpperCase()} rounded />
      <span>
        <span className="font-medium">Info alert!.</span> Company info as recorded on the day of addition/registration.
      </span>
      <div className="flex flex-col bg-slate-50 p-2 rounded-md">
        <p className="text-sm">Name : {compDetails?.compName} </p>
        <p className="text-sm">Email : {compDetails?.compEmail}</p>
        <p className="text-sm">Registration N0 : {compDetails?.regNo}</p>
        <p className="text-sm">District : {District?.find((item: any) => item.id == compDetails?.districtId)?.districtName || "Retriving..."}</p>
        <p className="text-sm">Phone : {compDetails?.phone}</p>
        <p className="text-sm">Registration Date : {compDetails?.create_date}</p>
      </div>

    </Alert>
  );
}
