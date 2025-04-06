
"use client";

import { customsubmitTheme } from "@/app/SiteTheme/Theme";
import { Button, Table } from "flowbite-react";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import { useDirector } from "@/app/hooks/useDirector";
import { useDispatch } from "react-redux";
import { DirectorAction } from "@/lib/features/Director/DirectorSlice";

export function DirectorTable() {
const { data , error, isLoading } = useDirector();
const dispatch = useDispatch();
    if (isLoading) return <LoadingSpinner color="warning" size="sm" />
    return (
        <div className="p-2">
            <p className="font-poppinsLight text-sm text-wrap">Directors will apear here as you add them</p>
            <div className="relative overflow-x-auto max-h-[400px] h-72">
            
                <Table hoverable className="w-full">
                    <Table.Head className="sticky top-0 z-10">
                        <Table.HeadCell className='tblHeader'>Names</Table.HeadCell>
                        <Table.HeadCell className='tblHeader'>Email</Table.HeadCell>
                        <Table.HeadCell className='tblHeader'>%</Table.HeadCell>
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
                                            <Table.Cell>{"25"}</Table.Cell>
                                            <Table.Cell>{director?.createdAt}</Table.Cell>
                                            <Table.Cell><p className="underline text-appGreen">{director?.proof_Resfilename}</p></Table.Cell>
                                            <Table.Cell><p className="underline text-appGreen">{director?.copy_safilename}</p></Table.Cell>
                                            <Table.Cell>
                                                <div className="flex gap-1">
                                                    <Button className="z-0" theme={customsubmitTheme} color='failure' size="xs">Delete</Button>
                                                    <Button onClick={()=>dispatch(DirectorAction.SetGlobalDirector({director,openModal:true}))} className="z-0" theme={customsubmitTheme} color='success' size="xs">Edit</Button>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    )) : null
                            }
                            {(!error && !isLoading && data?.data?.directors?.length === 0) && <Table.Row><Table.Cell>no directors found</Table.Cell></Table.Row>}
                        </>
                    </Table.Body>
                    
                </Table>
                <p>{error?.message}</p>
            </div>
            
        </div>
    );
}
