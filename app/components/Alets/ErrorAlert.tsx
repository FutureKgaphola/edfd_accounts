import { Alert } from "flowbite-react";
import { HiExclamationCircle } from "react-icons/hi";

const ErrorAlert = ({errorMsg}:{errorMsg:string}) => {
    return ( 
        <Alert color="warning" icon={HiExclamationCircle} rounded>
                <span className="font-medium">Ohh Snap! </span>{errorMsg}
        </Alert>
     );
}
 
export default ErrorAlert;