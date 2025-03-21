import axios from "axios";
import { useState } from "react";
import { failureMessage, successMessage } from "../notifications/successError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

export const useDirector = () => {
    const queryClient = useQueryClient();
    const prop = useSelector((state: RootState) => state.SelectedCompanyReducer);
//http://localhost:3000/api/Directors/retrive?regno=2008/324567/06
 const { data , error, isLoading } = useQuery({
        queryFn: () => axios.get(`/api/Directors/retrive?regno=${prop?.regNo}`),
        queryKey: ['dir'+prop?.regNo],
        enabled: !!prop?.regNo,
    });
    const [state, setState] = useState<{
        files: (File | null)[];
        fileIndexes: (number | null)[];
        fileError: string;
        isUploading: boolean;
    }>({
        files: [null, null],
        fileIndexes: [],
        fileError: '',
        isUploading: false,
    });

    const handleFileChange = (index: number, file: File | null) => {
        if (file) {
            if (file.type !== 'application/pdf') {
                failureMessage('Please upload a valid PDF file.');
                return;
            }
            if (file.size > 40 * 1024 * 1024) {
                failureMessage('File size must be less than 40 MB.');
                return;
            }
        }

        const updatedFiles = [...state.files];
        updatedFiles[index] = file;
        
        setState(prev => ({
            ...prev,
            files: updatedFiles,
            fileIndexes: [...prev.fileIndexes, index],
        }));
    };

    const { mutateAsync: addDirectorWithDocs } = useMutation({
        mutationFn: async ({ regNo, fullnames, email, phone }: 
            { regNo: string; fullnames: string; email: string; phone: string }) => 
            handleMultiplePdfUpload(regNo, fullnames, email, phone),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["dir"+prop?.regNo] });
        },
    });

    const handleMultiplePdfUpload = async (regNo: string, fullnames: string, email: string, phone: string) => {
        const { files, fileIndexes } = state;

        if (!files.some(file => file !== null)) {
            failureMessage("Please upload both required files.");
            return;
        }

        const totalSize = files.reduce((acc, curr) => acc + (curr?.size || 0), 0);
        if (totalSize > 900 * 1024 * 1024) {
            setState(prev => ({ ...prev, fileError: 'Total file size should not exceed 900MB' }));
            failureMessage("Total file size should not exceed 900MB");
            return;
        }

        const formData = new FormData();
        formData.append("fullnames", fullnames);
        formData.append("phone", phone);
        formData.append("regNo", regNo);
        formData.append("email", email);

        fileIndexes.forEach((index, idx) => formData.append(`FileIndexes${idx}`, index !== null ? index.toString() : ''));
        files.filter(f => f !== null).forEach((f, idx) => formData.append(`file${idx}`, f as File));
        formData.append("docsCount", files.length.toString());

        try {
            setState(prev => ({ ...prev, isUploading: true }));
            const response = await axios.post('/api/Directors/create', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status === 200) {
                successMessage(response.data?.message);
                setState({ files: [null, null], fileIndexes: [], fileError: '', isUploading: false });        
                return response;
            } else {
                failureMessage(response.data?.message);
                setState(prev => ({ ...prev, isUploading: false }));
                return response;
            }
        } catch (err:any) {
            const errorMessage = err?.response?.data?.message || err.message;
            failureMessage(errorMessage);
            setState(prev => ({ ...prev, fileError: errorMessage, isUploading: false }));
        }
    };

    return { handleFileChange, addDirectorWithDocs, ...state, data , error, isLoading };
};
