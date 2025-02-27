"use client";

import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

const Franchisee = () => {
    return (
        <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium">Info alert!</span> This part of the system is under maintenace and will be available soon.
        </Alert>
    );
}

export default Franchisee;