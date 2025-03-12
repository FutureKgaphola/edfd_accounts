import { useUploadBusiness } from "@/app/hooks/useUploadBusiness";
import { customsubmitTheme } from "@/app/SiteTheme/Theme";
import { Button, FileInput } from "flowbite-react";
import { useState } from "react";
import { HiCloudDownload } from "react-icons/hi";
import BusinessPDFUploader from "../FileInput/BusinessPDFUploader";

const Business = () => {
    const [isProcessingDocuments, setDocuments] = useState<boolean>(false);
    const {HandleMultiplePdfUpload}=useUploadBusiness();
    return (
        <BusinessPDFUploader/>
    );
}

export default Business;