

import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useQuery } from '@tanstack/react-query';

const fetchuser=async(userid:string)=>{
   const resp= await axios.get(`/api/users/profile?id=${userid}`)
    return resp.data?.user;
}
const useProfile = () => {
    const Authprop = useSelector((state: RootState) => state.AuthReducer);
    const userid= Authprop.user?.id;
    const {data,isLoading,error} =useQuery({
        queryFn : ()=>fetchuser(userid),
        queryKey: ['userProfile',{userid}]
        
    });

    return {data,isLoading,error};
};

export default useProfile;