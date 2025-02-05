
"use client";

import { customsubmitTheme } from "@/app/SiteTheme/Theme";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button, Table } from "flowbite-react";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import Link from "next/link";

export function ListingsTable() {
    const { data, error, isLoading } = useQuery({
        queryFn: () => axios.get('/api/users/companies'),
        queryKey: ['companies'],
    });


    if (isLoading) return <LoadingSpinner color="warning" size="sm" />
    return (
        <div className="p-2">
            <p className="font-poppinsLight text-sm text-wrap">Blocked for applications ?, want to know why and how to unblock?</p>
            <a target="_blank" href="https://edfd-sub-website.vercel.app/about/#faq" className="font-poppinsLight text-sm underline text-appGreen">click here</a>
            <div className="relative overflow-x-auto max-h-[400px] h-72">
            
                <Table hoverable className="w-full">
                    <Table.Head className="sticky top-0 z-10">

                        <Table.HeadCell className='tblHeader'>Status</Table.HeadCell>
                        <Table.HeadCell className='tblHeader'>Date added</Table.HeadCell>
                        <Table.HeadCell className='tblHeader'>added By</Table.HeadCell>
                        <Table.HeadCell className='tblHeader'>
                            <span className="sr-only">delete</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {
                           !error && !isLoading ? data?.data.map((company: any) => (
                                <Table.Row key={company.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">

                                    <Table.Cell className="text-black text-wrap">{company.title}</Table.Cell>
                                    <Table.Cell>{company.userId}</Table.Cell>
                                    <Table.Cell>{company.id}</Table.Cell>

                                    <Table.Cell>
                                        <div className="flex gap-1">
                                            <Button className="z-0" theme={customsubmitTheme} color='failure' size="xs">Delete</Button>
                                            <Button className="z-0" theme={customsubmitTheme} color='success' size="xs">View</Button>
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
