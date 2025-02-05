import axios from 'axios'
export const fetchCompanies= async()=>{
    const resp = await axios.get('https://jsonplaceholder.typicode.com/todos');
    if(resp.status!==200) return [];
    console.log(resp.data);
    return resp.data;
}