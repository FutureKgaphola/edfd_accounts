
import { useState } from "react";
import { useDispatch } from "react-redux";
import { failureMessage, successMessage } from "../notifications/successError";

export const useSignup = () => {
    const dispatch = useDispatch();
    const [loading, setloading] = useState(false);
    const[result,setResults]=<any>useState();
    const handleSignup = async (username: string, phone: string, Name: string,LName:string, IdNo: string, password: string) => {
        setloading(true);
        const response = await fetch("/api/users/register", {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify({
                user_email: username?.trim(),
                phone: phone?.trim(),
                first_name: Name?.trim(),
                last_name: LName?.trim(),
                last_update: "never",
                saId: IdNo?.trim(),
                password: password
            }),

        });
        const result = await response?.json();
        if (!response.ok) {
            failureMessage(result?.message || "An unexpected error occurred");
            setloading(false);
            return;
        }
        successMessage(result?.message);
        setloading(false);
        setResults(result);
       return result;
    }

    return { handleSignup, loading }

}

