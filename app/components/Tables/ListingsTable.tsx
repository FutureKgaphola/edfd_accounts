
"use client";

import { customsubmitTheme } from "@/app/SiteTheme/Theme";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Badge, Button, Table, Tooltip } from "flowbite-react";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import { HiDocumentRemove } from "react-icons/hi";
import { useEffect, useState } from "react";

export function ListingsTable({user_email}:{user_email:string}) {
    const { data , error, isLoading } = useQuery({
        queryFn: () => axios.get(`/api/companies/retrive/?user_email=${user_email}`),
        queryKey: ['Registeredcompanies'],
    });
    const [companies,setcompanies]=useState([]);
    useEffect(()=>{
        setcompanies(data?.data.companies);
    },[data]);

    if (isLoading) return <LoadingSpinner color="warning" size="sm" />
    return (
        <div className="p-2">
            <p className="font-poppinsLight text-sm text-wrap">Blocked for applications ?, want to know why and how to unblock?</p>
            <a target="_blank" href="https://edfd-sub-website.vercel.app/faq" className="font-poppinsLight text-sm underline text-appGreen">click here</a>
            <div className="relative overflow-x-auto max-h-[400px] h-72">

                <Table hoverable className="w-full">
                    <Table.Head className="sticky top-0 z-10">

                        <Table.HeadCell className='tblHeader'>Name</Table.HeadCell>
                        <Table.HeadCell className='tblHeader'>Loan Types Available</Table.HeadCell>
                        <Table.HeadCell className='tblHeader'>REG N0.</Table.HeadCell>
                        <Table.HeadCell className='tblHeader'>Email</Table.HeadCell>
                        <Table.HeadCell className='tblHeader'>
                            <span className="sr-only">delete</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {
                            !error && !isLoading ? companies?.map((company: any) => (
                                <Table.Row key={company?.regNo} className="bg-white dark:border-gray-700 dark:bg-gray-800">

                                    <Table.Cell className="text-black text-wrap">{company.compName}</Table.Cell>
                                    <Table.Cell>{["Business", "Procurement", "Building", "Franchaisee"]?.map((loan) => (
                                        <Tooltip key={loan} content={"Remove "+loan+" Documets ?"}>
                                            <Badge icon={HiDocumentRemove} size="xs" className="mt-1 hover:cursor-pointer" color="success">{loan}</Badge>
                                        </Tooltip>
                                    ))}</Table.Cell>
                                    <Table.Cell>{company.regNo}</Table.Cell>
                                    <Table.Cell>{company.compEmail}</Table.Cell>

                                    <Table.Cell>
                                        <div className="flex gap-1">
                                            <Button className="z-0" theme={customsubmitTheme} color='failure' size="xs">Delete</Button>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            )) : <p>{error?.message}</p>

                        }
                    </Table.Body>
                </Table>

            </div>

        </div>
    );
}
