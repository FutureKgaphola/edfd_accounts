"use client";

import { Alert } from "flowbite-react";
const NoApplication = () => {
    return ( 
        <Alert className="m-4" color="warning" withBorderAccent>
        <span>
          <span className="font-medium">Info alert!</span> No Application in progress found.
        </span>
      </Alert>
     );
}
 
export default NoApplication;