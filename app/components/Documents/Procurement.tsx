import { customsubmitTheme } from "@/app/SiteTheme/Theme";
import { Button, FileInput } from "flowbite-react";
import { useState } from "react";
import { HiCloudDownload } from "react-icons/hi";

const Procurement = () => {
    const [isProcessingDocuments, setDocuments] = useState<boolean>(false);
    return ( 
         <form>
                    
                    <div className="flex justify-between items-center">
                        <p className="text-wrap text-sm">Appointment Letter/Order/JBCC contract/Service Level Agrement & Specification*</p>
                        <div className="flex gap-1 items-center">
                            <HiCloudDownload className="hover:cursor-pointer" width={35} height={35} />
                            <FileInput
                                className="max-w-md"
                                sizing="sm" id="file-upload-helper-text" accept="application/pdf" />
        
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-wrap text-sm">Resolution for delegationof authority to act on behalf of the company if there is more than one memeber/director</p>
                        <div className="flex gap-1 items-center">
                            <FileInput
                                className="max-w-md"
                                sizing="sm" id="file-upload-helper-text" accept="application/pdf" />
        
                        </div>
                    </div>
                    <hr></hr>
                    <div className="flex justify-between items-center">
                        <p className="text-wrap text-sm">Lease Agreement/Letter of Intent to Lease/Proof of Business Address *</p>
                        <div className="flex gap-1 items-center">
                            <FileInput
                                className="max-w-md"
                                sizing="sm" id="file-upload-helper-text" accept="application/pdf" />
        
                        </div>
                    </div>
                    <hr></hr>
                    <div className="flex justify-between items-center">
                        <p className="text-wrap text-sm">Affidavit declaring the company address of registration Office *</p>
                        <div className="flex gap-1 items-center">
                        <HiCloudDownload className="hover:cursor-pointer" width={35} height={35} />
                            <FileInput
                                className="max-w-md"
                                sizing="sm" id="file-upload-helper-text" accept="application/pdf" />
        
                        </div>
                    </div>
                    <hr></hr>
                    <div className="flex justify-between items-center">
                        <p className="text-wrap text-sm">Three months bank statement of an active business *</p>
                        <div className="flex gap-1 items-center">
                        <HiCloudDownload className="hover:cursor-pointer" width={35} height={35} />
                            <FileInput
                                className="max-w-md"
                                sizing="sm" id="file-upload-helper-text" accept="application/pdf" />
        
                        </div>
                    </div>
                    <hr></hr>
                    <div className="flex justify-between items-center">
                        <p className="text-wrap text-sm">Quotation with bankng details for the respective supplier and delivery cost <br></br>(Delivery cost can be free, included OR charged for Delivery/Transport) *</p>
                        <div className="flex gap-1 items-center">
                            <FileInput
                                className="max-w-md"
                                sizing="sm" id="file-upload-helper-text" accept="application/pdf" />
        
                        </div>
                    </div>
                    <hr></hr>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-wrap text-sm font-bold">If you are aware of that you are listed, then attach one of the following</p>
                            <ul className="list-disc ml-4">
                                <li className="text-wrap text-sm">Proof of payment if debt is settled in full</li>
                                <li className="text-wrap text-sm">A latter from the creditor indicating the nature of thepayment arrangements if the dept is still having an outstanding.</li>
                                <li className="text-wrap text-sm">Proof of payment</li>
                            </ul>
                        </div>
                        <div className="flex gap-1 items-center">
                            <FileInput
                                className="max-w-md"
                                sizing="sm" id="file-upload-helper-text" accept="application/pdf" />
        
                        </div>
                    </div>
                    <hr></hr>
                    <div className="flex justify-between items-center">
                        <p className="text-wrap text-sm">Declaration in case of unmarried applicant (Affidavit)/Copy of Death certificate in case of <br></br> widow/widower/copy of degree of devorce in case of divorcee/copy of Marriage certificate in case od married couple *</p>
                        <div className="flex gap-1 items-center">
                            <FileInput
                                className="max-w-md"
                                sizing="sm" id="file-upload-helper-text" accept="application/pdf" />
        
                        </div>
                    </div>
                    <hr></hr>
                    <div className="flex justify-between items-center">
                        <p className="text-wrap text-sm"><a className="underline text-appGreen" target="_blank" href="#">Statement of personal Assets and Liabilities</a> of memebers/directors of the company. (click on the link to download the form)*</p>
                        <div className="flex gap-1 items-center">
                            <FileInput
                                className="max-w-md"
                                sizing="sm" id="file-upload-helper-text" accept="application/pdf" />
        
                        </div>
                    </div>
        
                    <Button isProcessing={isProcessingDocuments} disabled={isProcessingDocuments} type="submit" theme={customsubmitTheme} color="appsuccess">Save</Button>
                </form>
     );
}
 
export default Procurement;