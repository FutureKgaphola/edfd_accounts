
import { useState } from "react";
import BusinessPDFUploader from "../FileInput/BusinessPDFUploader";

const Business = () => {
    const [isProcessingDocuments, setDocuments] = useState<boolean>(false);
    return (
        <BusinessPDFUploader/>
    );
}

export default Business;