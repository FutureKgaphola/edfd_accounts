import { Alert } from "flowbite-react";
import LoadingSpinner from "../Spinner/LoadingSpinner";

const LoadingAlert = () => {
    return (
        <Alert color="warning" rounded>
            <LoadingSpinner color="success" size="sm" />
        </Alert>
    );
}

export default LoadingAlert;