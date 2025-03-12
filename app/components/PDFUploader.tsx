import { Button, FileInput } from 'flowbite-react';
import { useState } from 'react';
import { customsubmitTheme } from '../SiteTheme/Theme';

export default function PDFUploader() {
    const [files, setFiles] = useState<(File | null)[]>([null, null, null]);

    const handleFileChange = (index: number, file: File | null) => {
        if (file && file.type !== 'application/pdf') {
            alert('Please upload a valid PDF file.');
            return;
        }

        const updatedFiles = [...files];
        updatedFiles[index] = file;
        setFiles(updatedFiles);
    };

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

    return (
        <form>
            <div>
                {BusinesDocs?.map((item, index) => (
                    <div>
                        <div key={index} className="flex justify-between items-center">
                            <p className="text-wrap break-words text-sm">{item.desc}</p>
                            <div className="flex gap-1 items-center">
                                <FileInput
                                    onChange={(e) => handleFileChange(index, e.target.files?.[0] || null)}
                                    className="max-w-md min-w-max"
                                    sizing="sm" id="file-upload-helper-text" accept="application/pdf" />

                            </div>
                        </div>
                        <hr></hr>
                    </div>

                ))}
                
            </div>
            
        </form>

    );
}
