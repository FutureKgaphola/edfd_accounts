import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useDistricts=()=>{
    const { data , error, isLoading } = useQuery({
        queryFn: () => axios.get(`/api/District/retrive`),
        queryKey: ['Districts'],
    });

    return {data,error,isLoading};
}