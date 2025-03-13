import { Spinner } from "flowbite-react";

const LoadingSpinnerOnly = ({color,size}:{color:string,size:string}) => {
    return ( 
        <div className="flex m-1">
            <Spinner color={color} size={size} aria-label="spinner icon" />
        </div>
     );
}
 
export default LoadingSpinnerOnly;