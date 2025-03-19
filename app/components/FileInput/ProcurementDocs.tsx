import useBusinessDocs from '@/app/hooks/useBusinessDocs';
import { useUploadBusiness } from '@/app/hooks/useUploadBusiness';
import { customsubmitTheme } from '@/app/SiteTheme/Theme';
import { RootState } from '@/lib/store';
import { Button, FileInput, Tooltip } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LoadingSpinnerOnly from '../Spinner/LoadingSpinneronly';
import { HiCloudDownload } from "react-icons/hi";
import { DownloadCompanyDocs } from '@/app/services/handleDownloadCompanyDocs';
import ProccesingAlert from '../Alerts/ProcessingRequest';
import { ProcurementDocs } from '@/app/constants/sharedconstants';

export default function ProcurementPDFUploader() {
    const { handleFileChange, AddCompanyDocs, Isuploaading } = useUploadBusiness();
    const { data, isLoading, UpdateCompanyDocs, IsuploadingUpdates, RemoveCompanyDocs, handleFileChange_update } = useBusinessDocs();

    const [docs, setDocs] = useState<(null | any)[]>([null, null, null, null, null, null, null, null]);
    const [error, seterror] = useState<Error | null>();
    const selectedprop = useSelector((state: RootState) => state.SelectedCompanyReducer);
    const regNo = selectedprop.regNo;
    const loanCat_id = selectedprop.loanCat_id;
    useEffect(() => {
        if (data) {
            const updatedFiles = Array(8).fill(null);
            data.forEach((element: any) => {
                updatedFiles[element.fileIndexes] = element;
            });
            setDocs(updatedFiles);
        }
    }, [data,loanCat_id,regNo]);

    return (

        <form onSubmit={(e) => {
            e.preventDefault();
            AddCompanyDocs({ regNo: regNo, loanId: loanCat_id })
        }} >
            {ProcurementDocs?.map((item, index) => (
                <div key={item?.id}>
                    <div className="flex justify-between items-center">
                        <div>
                        <p className="text-wrap w-7/12 break-words text-sm mr-2">{item?.p}</p>
                        {item?.li?.map((li, index) => ( <ul key={index} className="text-sm list-disc ml-5"><li>{li.li}</li></ul>))} 
                            </div> 
                        <div className="flex gap-1 items-center">
                            {
                                isLoading ? <LoadingSpinnerOnly color='success' size='sm' /> :
                                    <div className='flex gap-1 items-center'><Tooltip content={docs[index]?.filenames}><p className='text-sm ml-2 text-end text-appGreen line-clamp-1'>{docs[index]?.filenames}</p></Tooltip>
                                        {docs[index]?.filenames ? <>
                                            <HiCloudDownload onClick={() => DownloadCompanyDocs(docs[index]?.regNo, loanCat_id, docs[index]?.filenames, docs[index]?.id)} className="hover:cursor-pointer" width={35} height={35} />
                                            <Button onClick={() => RemoveCompanyDocs({ id: docs[index]?.id, regNo: docs[index]?.regNo, loanCat_id: docs[index]?.loanCat_id,fileIndexes: docs[index]?.fileIndexes })} className="z-0" theme={customsubmitTheme} color='failure' size="xs">Delete</Button>
                                            <Button onClick={() => UpdateCompanyDocs({ regNo: docs[index]?.regNo, loanCat_id: loanCat_id, fileIndexes: docs[index]?.fileIndexes, id: docs[index]?.id })} className="z-0" theme={customsubmitTheme} color='success' size="xs">Update</Button></>
                                            : docs ? <Button onClick={() => AddCompanyDocs({ regNo: regNo, loanId: loanCat_id })} color='warning' size="xs">Upload</Button> : null}
                                    </div>
                            }

                            <FileInput
                                onChange={(e) => { docs[index]?.filenames ? handleFileChange_update(e || null) : handleFileChange(index, e.target.files?.[0] || null) }}
                                className="w-fit max-w-md min-w-max sm:max-w-sm"
                                sizing="sm" id="file-upload-helper-text" accept="application/pdf" />
                        </div>
                    </div>
                    <hr></hr>
                </div>

            ))}
            {IsuploadingUpdates && <ProccesingAlert action_message={"Processing your request ..."}/>}
            
            <a className='text-sm break-words text-appGreen underline' target='_blank' href='#'>Download Statement of personal Assets and Liabilities form</a>
            {data?.length == 0 && <Button isProcessing={Isuploaading} disabled={Isuploaading} className='mt-4' type="submit" theme={customsubmitTheme} color="appsuccess">Save All</Button>}

        </form>
    );
}
