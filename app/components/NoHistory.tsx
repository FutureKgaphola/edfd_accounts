"use client";

import { Alert } from "flowbite-react";
const NoHistory = () => {
    return ( 
        <Alert className="m-4" color="warning" withBorderAccent>
        <span>
          <span className="font-medium">Info alert!</span> No Application history found.
        </span>
      </Alert>
     );
}
 
export default NoHistory;