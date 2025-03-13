import useBusinessDocs from '@/app/hooks/useBusinessDocs';
import { useUploadBusiness } from '@/app/hooks/useUploadBusiness';
import { customsubmitTheme } from '@/app/SiteTheme/Theme';
import { RootState } from '@/lib/store';
import { Button, FileInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LoadingSpinnerOnly from '../Spinner/LoadingSpinneronly';
import { HiCloudDownload } from "react-icons/hi";
import { DownloadCompanyDocs } from '@/app/services/handleDownloadCompanyDocs';

export default function BusinessPDFUploader() {
    const { handleFileChange, HandleMultiplePdfUpload, Isuploaading } = useUploadBusiness();
    const { data, isLoading } = useBusinessDocs();

    const BusinesDocs = [
        {
            id: 0, desc: 'Cession Agreement'
        },
        {
            id: 1, desc: 'Resolution for delegationof authority to act on behalf of the company if there is more than one memeber/director'
        },
        {
            id: 2, desc: 'Lease Agreement/Letter of Intent to Lease/Proof of Business Address'
        },
        {
            id: 3, desc: 'Affidavit declaring the company address of registered Office',
        },
        {
            id: 4, desc: 'Three/Six months bank statement of an active business'
        },
        {
            id: 5, desc: 'Quotation with bankng details for the respective supplier and delivery cost (Delivery cost can be free, included OR charged for Delivery/Transport)'
        },
        {
            id: 6, desc: 'Declaration in case of unmarried applicant (Affidavit)/Copy of Death certificate in case of widow/widower/copy of degree of devorce in case of divorcee/copy of Marriage certificate in case od married couple'
        },
        {
            id: 7, desc: 'Statement of personal Assets and Liabilities</a> of memebers/directors of the company. (click on the link to download the form)'
        }
    ];
    const [docs, setDocs] = useState<(null | any)[]>([null, null, null, null, null, null, null, null]);
    const [error, seterror] = useState<Error | null>();
    const selectedprop = useSelector((state: RootState) => state.SelectedCompanyReducer);
    // const regNo = selectedprop.regNo;
    const loanCat_id=selectedprop.loanCat_id;
    useEffect(() => {
        if (data) {
            const updatedFiles = Array(8).fill(null);
            data.forEach((element: any) => {
                updatedFiles[element.fileIndexes] = element;
            });
            setDocs(updatedFiles);
        }
    }, [data]);

    return (

        <form onSubmit={(e) => HandleMultiplePdfUpload(e, "2020/213456/07", "1")} >
            {BusinesDocs?.map((item, index) => (
                <div>
                    <div key={index} className="flex justify-between items-center">
                        <p className="text-wrap break-words text-sm mr-2">{item.desc}</p>
                        <div className="flex gap-1 items-center">
                            {
                                isLoading ? <LoadingSpinnerOnly color='success' size='sm'/> : 
                                <div className='flex gap-1 items-center'><p className='text-sm ml-2 text-appGreen'>{docs[index]?.filenames}</p>
                                {docs[index]?.filenames ?  <><HiCloudDownload onClick={()=>DownloadCompanyDocs(docs[index]?.regNo,loanCat_id,docs[index]?.filenames,docs[index]?.id)} className="hover:cursor-pointer" width={35} height={35}/> <Button className="z-0" theme={customsubmitTheme} color='failure' size="xs">Delete</Button> <Button className="z-0" theme={customsubmitTheme} color='success' size="xs">update</Button></> : null}
                                </div> 
                            }
                            
                            <FileInput
                                onChange={(e) => handleFileChange(index, e.target.files?.[0] || null)}
                                className="w-fit max-w-md min-w-max sm:max-w-sm"
                                sizing="sm" id="file-upload-helper-text" accept="application/pdf" />
                        </div>
                    </div>
                    <hr></hr>
                </div>

            ))}
            {data?.length==0 && <Button isProcessing={Isuploaading} disabled={Isuploaading} className='mt-4' type="submit" theme={customsubmitTheme} color="appsuccess">Save</Button>}
            
        </form>
    );
}
