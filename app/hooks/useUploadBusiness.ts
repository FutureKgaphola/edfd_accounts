import axios from "axios";
import { FormEvent, useState } from "react";

export const useUploadBusiness=()=>{
    const [Filenames,setFilenames]=useState<string[]>([]);
    const [Ui_field_desc,setfield_desc]=useState<string[]>([]);
    const [Filerror, setError] = useState('');
    const [pdfFile, setPdfFile] = useState<File[]>([]);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>,field_desc:string) => {
        if (event.target.files) {
            const file = event.target.files[0];
            if(event.target.files === undefined || event.target.files === null) { return;} 
            if(event.target.files[0] === undefined || event.target.files[0] === null) { return;} 
            let temp:File[]=[];
            // Validate the file size (should not exceed 40MB)
            if (file.size > 40 * 1024 * 1024) {  // 40MB in bytes
                setError('File size exceeds the 40MB limit.');
                //setPdfFile([]);  // Clear the file
            } else {
                setError('');

                if (!pdfFile.some(f => f.name === file.name)) {

                    const existingIndex = temp.findIndex(f => f.name === file.name);
                    if (existingIndex !== -1) {
                        temp[existingIndex] = file; // Update the existing file
                        console.log("updated at index");
                    } else {
                        temp.push(file); // Add the new file
                        console.log("pushed to the end",file.name);
                    }
                    setPdfFile(temp);
                }
                // if (!Filenames.includes(event.target.files[0].name)) {
                //     setFilenames([...Filenames, event.target.files[0].name]);
                // }
                // if (!Ui_field_desc.includes(field_desc)) {
                //     setfield_desc([...Ui_field_desc, field_desc]);
                // }
                // console.log([...Ui_field_desc,field_desc])
            }
        }
    };
    const HandleMultiplePdfUpload=async(file: File[],filename: string[],regNo:string,e: FormEvent<HTMLFormElement>,loanId:string)=>{
        e.preventDefault();
        // Combined size of files must be less than 900 MB
        const totalSize = file.reduce((acc, curr) => acc + curr.size, 0);
        if (totalSize > 900 * 1024 * 1024) {  // 900MB in bytes
            setError('Total file size should not exceed 900MB');
            return;
        }

        const formData = new FormData();
        if (file) {
            formData.append("loanId",loanId);
            formData.append("regNo",regNo);
            filename.forEach((f,index) => formData.append('filename'+index, f));
            Ui_field_desc.forEach((desc,index)=>formData.append('Ui_field_desc'+index, desc));
            file.forEach((f,index) => formData.append('file'+index, f));
            formData.append("docsCount", file.length.toString());
        }
        try {

            const response = await axios.post('/api/upload/business', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                //setSuccess(true);
                console.log("success");
            } else {
                console.log(response);
            }
        } catch (err:any) {
            //failureMessage(err.message);
            console.log(err.message);
            //setError('An error occurred while submitting the form');
        } finally {
            //setLoading(false);
        }

    }
    return { handleFileChange,HandleMultiplePdfUpload, Filerror,pdfFile,Filenames }
}
