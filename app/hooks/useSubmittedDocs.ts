
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import {useQuery } from '@tanstack/react-query';

const fetchDocs = async (loanCat_id: string, regNo: string) => {
    const resp = await axios.get(
        `/api/companies/documents/retrive?regNo=${regNo}&loanCat_id=${loanCat_id}`
    );
    if (!resp.data?.documents || resp.status === 400) return [];
    return resp.data.documents;
}
const useSubmittedDocs = (loanDocs:string) => {
    console.log("type :",loanDocs)
    const selectedprop = useSelector((state: RootState) => state.SelectedCompanyReducer);
    const regNo = selectedprop?.regNo;
    const loanCat_id= loanDocs=='Business' ? "0" : loanDocs=='Procurement' ? "1" :loanDocs=='Building' ? "2" : loanDocs=='Franchisee' ? "3" : "";

    const { data, isLoading, error } = useQuery({
        queryFn: () => fetchDocs(loanCat_id, regNo),
        queryKey: [loanDocs, { loanCat_id, regNo }],
       // staleTime: Infinity
       enabled: !!loanCat_id && !!regNo
    });

    return { data, isLoading, error};
};

export default useSubmittedDocs;