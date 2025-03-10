
import { useState } from "react";
import { failureMessage, successMessage } from "../notifications/successError";

export const useAddCompanies = () => {
    const [loading, setLoading] = useState(false);
    interface companyData {
        user_email: string;
        compName: string;
        phone: string;
        regNo: string;
        districtName: string;
        compEmail: string;
    }

    const handleAddCompanies = async ({ user_email, compName, phone, regNo, districtName, compEmail }: companyData) => {
        setLoading(true);
        try {
            const response = await fetch("/api/companies/register", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_email,
                    compName,
                    phone,
                    regNo,
                    districtName,
                    compEmail

                }),
            });
            const result = await response?.json();
            if (!response.ok) {
                failureMessage(result?.message || "An unexpected error occurred");
                return;
            }
            successMessage(result?.message);
            return result; //return an object
        } finally {
            setLoading(false);
        }
    }

    return { handleAddCompanies, loading }

}

