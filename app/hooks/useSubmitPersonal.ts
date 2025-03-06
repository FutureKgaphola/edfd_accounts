import { FormEvent, useState } from 'react';
import axios from 'axios';
import { failureMessage, successMessage } from '../notifications/successError';
import { useSignout } from './useSignout';

const useSubmitPersonal = () => {
    const { handleSigOut } = useSignout();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const submitForm = async (first_name: string,user_email:string,last_name:string,phone:string,saId:string, filename: string, file: File| null,user_id:string,e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (file && file.size > 40 * 1024 * 1024) {
            setError('File size should not exceed 40MB');
            return;
        }
        

        const formData = new FormData();
        formData.append('first_name', first_name);
        formData.append('user_email', user_email);
        formData.append('last_name', last_name);
        formData.append('phone', phone);
        formData.append('saId', saId);
        formData.append('id', user_id);
        if (file) {
            formData.append('filename', filename);
            formData.append('file', file);
        }

        try {
            setLoading(true);
            setError(null);
            setSuccess(false);

            const response = await axios.patch('/api/upload/personal', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                //setSuccess(true);
                successMessage("Successful update");
                handleSigOut();
            } else {
                failureMessage("Failed to submit the form");
                setError('Failed to submit the form');
            }
        } catch (err:any) {
            failureMessage(err.message);
            setError('An error occurred while submitting the form');
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, success, submitForm };
};

export default useSubmitPersonal;