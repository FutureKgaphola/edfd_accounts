import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import LoadingSpinnerOnly from "../Spinner/LoadingSpinneronly";

const ProccesingAlert = ({action_message}:{action_message:string}) => {
    return ( 
        <Alert className="flex gap-1" color="warning" icon={HiInformationCircle} rounded>
            <span className="font-medium">Please wait!. </span> {action_message}
         <LoadingSpinnerOnly color="success" size="sm" />
        </Alert>
     );
}
 
export default ProccesingAlert;