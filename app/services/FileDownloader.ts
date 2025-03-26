import axios from "axios";
import { failureMessage } from "../notifications/successError";

export const handleDownload = async (id:string,username:string,ServerFileName:string) => {
    const resp = await axios.get(`/api/download?id=${id}&m=${username}`, { responseType: 'blob' });
    if (resp.status !== 200 || !resp.data.size) {
        failureMessage(resp.statusText);
        return;
    }
    const blob = new Blob([resp.data]);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${ServerFileName}`);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
    window.URL?.revokeObjectURL(url);
}