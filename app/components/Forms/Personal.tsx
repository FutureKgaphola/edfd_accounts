
import {Card } from "flowbite-react";
import TruthfullAlert from "../Alerts/TruthfullAlert";
import Contacts from "./LeadPerson/Contacts";
import Address from "./LeadPerson/Address";
import Banking from "./LeadPerson/Banking";

const Personal = () => {
    return (

        <Card className="h-fit m-4">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Provide Personal information of the person responsible for this account</h3>
            <TruthfullAlert />
            <div className="lg:flex xl:flex gap-2 pt-4 lg:overflow-x-auto xl:overflow-x-auto sm:overflow-y-auto md:overflow-y-auto max-w-full">
                <Contacts />
                <Address />
                <Banking /> 
            </div>
        </Card>
    );
}

export default Personal;