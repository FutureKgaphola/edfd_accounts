import { Spinner } from "flowbite-react";

const LoadingSpinner = ({color,size}:{color:string,size:string}) => {
    return ( 
        <div className="flex gap-1">
            <Spinner color={color} size={size} aria-label="spinner icon" />
            <p className="font-thin">Loading...</p>
        </div>
     );
}
 
export default LoadingSpinner;