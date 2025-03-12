
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useQuery } from '@tanstack/react-query';

const fetchDocs=async(loanCat_id:string,regNo:string)=>{
   const resp= await axios.get(`/api/companies/documents/retrive?regNo=${regNo}&loanCat_id=${loanCat_id}`)
    return resp.data?.documents;
}
const useBusinessDocs = () => {
    const selectedprop = useSelector((state: RootState) => state.SelectedCompanyReducer);
    const regNo= selectedprop.regNo;
        const loanCat_id= selectedprop.loanCat_id;
        const {data,isLoading,error} =useQuery({
            queryFn : ()=>fetchDocs(loanCat_id,regNo),
            queryKey: ['BDocs',{loanCat_id,regNo}]
        });
    const getBusinessDocument=()=>{
        return {data,isLoading,error};
    }

    return {getBusinessDocument};
};

export default useBusinessDocs;