import { AuthActions } from "@/lib/features/Auth/AuthuserSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { failureMessage, successMessage } from "../notifications/successError";

export const useLogin = () => {
    const dispatch = useDispatch();
    const [loading, setloading] = useState(false);
    const handleLogin = async (username:string, password: string) => {
        setloading(true);
        const response = await fetch("http://localhost:3000/api/users/login", {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify({
                email: username?.trim(),
                password: password
            }),

        });
        const result = await response?.json();
        if (!response.ok) {
            failureMessage(result.message || "An unexpected error occurred");
            setloading(false);
            return;
        }
        if(result?.message=="Invalid email or password"){
            failureMessage(result?.message);
            setloading(false);
            return;
        }
        successMessage(result?.message);
        sessionStorage.setItem("utoken", result.token);
        sessionStorage.setItem("user", JSON.stringify(result.user));
        dispatch(AuthActions.setAuthToken({ token: result.token,user:result.user }));
        setloading(false);
    }

    return { handleLogin, loading }

}

