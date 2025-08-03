
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useQuery } from '@tanstack/react-query';

const fetchapplications=async(user_email:string)=>{
   const resp= await axios.get(`/api/companies/retrive/applications?user_email=${user_email}`)
    return resp.data?.applications || [];
}
const useApplications= () => {
    const Authprop = useSelector((state: RootState) => state.AuthReducer);
    const userid= Authprop.user?.user_email;
    const {data,isLoading,error} =useQuery({
        queryFn : ()=>fetchapplications(userid),
        queryKey: ['applications',{userid}],
        enabled: !!userid
    });

    return {data,isLoading,error};
};

export default useApplications;