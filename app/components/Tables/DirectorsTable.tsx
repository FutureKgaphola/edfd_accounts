
"use client";

import { customsubmitTheme } from "@/app/SiteTheme/Theme";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button, Table } from "flowbite-react";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import { useDirector } from "@/app/hooks/useDirector";

export function DirectorTable() {
const { data , error, isLoading } = useDirector();
console.log(data);
    if (isLoading) return <LoadingSpinner color="warning" size="sm" />
    return (
        <div className="p-2">
            <p className="font-poppinsLight text-sm text-wrap">Directors will apear here as you add them</p>
            <div className="relative overflow-x-auto max-h-[400px] h-72">
            
                <Table hoverable className="w-full max-w-md">
                    <Table.Head className="sticky top-0 z-10">
                        <Table.HeadCell className='tblHeader'>Names</Table.HeadCell>
                        <Table.HeadCell className='tblHeader'>Email</Table.HeadCell>
                        <Table.HeadCell className='tblHeader'>Date added</Table.HeadCell>
                        <Table.HeadCell className='tblHeader'>Proof of Ress</Table.HeadCell>
                        <Table.HeadCell className='tblHeader'>SA-ID</Table.HeadCell>
                        <Table.HeadCell className='tblHeader'>
                            <span className="sr-only">delete</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        <>
                            {
                                !error && !isLoading ? data?.data?.directors
                                    .map((director: any) => (
                                        <Table.Row key={director.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell className="text-black">{director.fullnames}</Table.Cell>
                                            <Table.Cell>{director?.email}</Table.Cell>
                                            <Table.Cell>{director?.createdAt}</Table.Cell>
                                            <Table.Cell><p className="underline text-appGreen">{director?.proof_Resfilename}</p></Table.Cell>
                                            <Table.Cell><p className="underline text-appGreen">{director?.copy_safilename}</p></Table.Cell>
                                            <Table.Cell>
                                                <div className="flex gap-1">
                                                    <Button className="z-0" theme={customsubmitTheme} color='failure' size="xs">Delete</Button>
                                                    <Button className="z-0" theme={customsubmitTheme} color='success' size="xs">View</Button>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    )) : null
                            }
                            {(!error && !isLoading && data?.data?.directors?.length === 0) && <p>no directors found</p>}
                        </>
                    </Table.Body>
                    
                </Table>
                <p>{error?.message}</p>
            </div>
            
        </div>
    );
}
