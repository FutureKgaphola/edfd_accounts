import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

const TruthfullAlert = () => {
    return ( 
        <Alert color="warning" icon={HiInformationCircle} rounded>
                <span className="font-medium">Please note!</span> Be truthfull with the information you are about to provide as they will be used to determine you loan's success.
        </Alert>
     );
}
 
export default TruthfullAlert;