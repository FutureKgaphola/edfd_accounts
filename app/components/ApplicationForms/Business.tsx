
import { useDomReady } from "@/app/hooks/useDomReady";
import SelectCompanyForm from "../Forms/SelectCompany";
const Business = () => {
    const { domReady } = useDomReady();
    return (
        <>
            {
                domReady ? (
                    <SelectCompanyForm />
                ) : null
            }
        </>
    );
}
 
export default Business;