import { useUploadBusiness } from "@/app/hooks/useUploadBusiness";
import { customsubmitTheme } from "@/app/SiteTheme/Theme";
import { Button, FileInput } from "flowbite-react";
import { useState } from "react";
import { HiCloudDownload } from "react-icons/hi";

const Business = () => {
    const [isProcessingDocuments, setDocuments] = useState<boolean>(false);
    const {handleFileChange,HandleMultiplePdfUpload,pdfFile,Filenames }=useUploadBusiness();
    
    return (
        <form onSubmit={(e)=>HandleMultiplePdfUpload(pdfFile,Filenames,"2020/213456/07",e,"1")}>

            <div className="flex justify-between items-center">
                <p className="text-wrap text-sm">Cession Agreement *</p>
                <div className="flex gap-1 items-center">
                    <FileInput
                    onChange={(e)=>handleFileChange(e, "Cession Agreement")}
                        className="max-w-md"
                        sizing="sm" id="file-upload-helper-text" accept="application/pdf" />

                </div>
            </div>
            <hr></hr>
            
            <div className="flex justify-between items-center">
                <p className="text-wrap text-sm">Resolution for delegationof authority to act on behalf of the company if there is more than one memeber/director</p>
                <div className="flex gap-1 items-center">
                    <HiCloudDownload className="hover:cursor-pointer" width={35} height={35} />
                    <FileInput
                    onChange={(e)=>handleFileChange(e, "Resolution for delegationof authority")}
                        className="max-w-md"
                        sizing="sm" id="file-upload-helper-text" accept="application/pdf" />

                </div>
            </div>
            <hr></hr>
            <div className="flex justify-between items-center">
                <p className="text-wrap text-sm">Lease Agreement/Letter of Intent to Lease/Proof of Business Address *</p>
                <div className="flex gap-1 items-center">
                    <FileInput
                    onChange={(e)=>handleFileChange(e, "Lease Agreement/Letter of Intent to Lease")}
                        className="max-w-md"
                        sizing="sm" id="file-upload-helper-text" accept="application/pdf" />

                </div>
            </div>
            <hr></hr>
            <div className="flex justify-between items-center">
                <p className="text-wrap text-sm">Affidavit declaring the company address of registered Office *</p>
                <div className="flex gap-1 items-center">
                    <FileInput
                    onChange={(e)=>handleFileChange(e, "Affidavit declaring the company address")}
                        className="max-w-md"
                        sizing="sm" id="file-upload-helper-text" accept="application/pdf" />

                </div>
            </div>
            <hr></hr>
            <div className="flex justify-between items-center">
                <p className="text-wrap text-sm">Three/Six months bank statement of an active business *</p>
                <div className="flex gap-1 items-center">
                    <FileInput
                    onChange={(e)=>handleFileChange(e, "Three/Six months bank statement")}
                        className="max-w-md"
                        sizing="sm" id="file-upload-helper-text" accept="application/pdf" />

                </div>
            </div>
            <hr></hr>
            <div className="flex justify-between items-center">
                <p className="text-wrap text-sm">Quotation with bankng details for the respective supplier and delivery cost <br></br>(Delivery cost can be free, included OR charged for Delivery/Transport) *</p>
                <div className="flex gap-1 items-center">
                    <FileInput
                    onChange={(e)=>handleFileChange(e, "Quotation with bankng details")}
                        className="max-w-md"
                        sizing="sm" id="file-upload-helper-text" accept="application/pdf" />

                </div>
            </div>
            <hr></hr>
            
            <div className="flex justify-between items-center">
                <p className="text-wrap text-sm">Declaration in case of unmarried applicant (Affidavit)/Copy of Death certificate in case of <br></br> widow/widower/copy of degree of devorce in case of divorcee/copy of Marriage certificate in case od married couple *</p>
                <div className="flex gap-1 items-center">
                    <HiCloudDownload className="hover:cursor-pointer" width={35} height={35} />
                    <FileInput
                    onChange={(e)=>handleFileChange(e, "Declaration in case of unmarried")}
                        className="max-w-md"
                        sizing="sm" id="file-upload-helper-text" accept="application/pdf" />

                </div>
            </div>
            <hr></hr>
            <div className="flex justify-between items-center">
                <p className="text-wrap text-sm"><a className="underline text-appGreen" target="_blank" href="#">Statement of personal Assets and Liabilities</a> of memebers/directors of the company. (click on the link to download the form)*</p>
                <div className="flex gap-1 items-center">
                    <FileInput
                    onChange={(e)=>handleFileChange(e, "Statement of personal Assets and Liabilities")}
                        className="max-w-md"
                        sizing="sm" id="file-upload-helper-text" accept="application/pdf" />
                </div>
            </div>

            <Button isProcessing={isProcessingDocuments} disabled={isProcessingDocuments} type="submit" theme={customsubmitTheme} color="appsuccess">Save</Button>
        </form>
    );
}

export default Business;