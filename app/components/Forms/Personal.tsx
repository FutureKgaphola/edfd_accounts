

import { Alert, Button, Card, FileInput, Label, TextInput } from "flowbite-react";
import { Offline, Online } from "react-detect-offline";
import { HiMail, HiInformationCircle, HiUserAdd, HiCloudDownload } from "react-icons/hi";
import { useEffect, useState } from "react";
import { NetworkMessage, NetworkTitle } from "../../TempData/StaticData";
import { customInputBoxTheme, customsubmitTheme } from "@/app/SiteTheme/Theme";
import TruthfullAlert from "../Alerts/TruthfullAlert";
import useProfile from "@/app/hooks/useProfile";
import LoadingAlert from "../Alerts/LoadingAlert";
import ErrorAlert from "../Alerts/ErrorAlert";
import useSubmitPersonal from "@/app/hooks/useSubmitPersonal";
import axios from "axios";
import { failureMessage } from "@/app/notifications/successError";
import Contacts from "./LeadPerson/Contacts";
import Address from "./LeadPerson/Address";
import Banking from "./LeadPerson/Banking";

const Personal = () => {
    return (

        <Card className="h-fit m-4">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Provide Personal informaition of the person responsible for this account</h3>
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