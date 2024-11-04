"use client"

import { Alert, Button, Card, Checkbox, FileInput, Label, Select, TextInput } from "flowbite-react";
import { customCheckboxTheme, customInputBoxTheme, customselectTheme, customsubmitTheme } from "../../SiteTheme/Theme";
import { HiInformationCircle } from "react-icons/hi";
import { useState } from "react";
import { Slider } from "@nextui-org/slider";
import Business from "@/app/components/ApplicationForms/Business";
import Procurement from "@/app/components/ApplicationForms/Procurement";
import Franchisee from "@/app/components/ApplicationForms/Franchisee";


const Apply = ({ params }: { params: { slug: string } }) => {
    
    return (
        <>
        {params.slug==="Business" ? <Business/> : 
        params.slug==="Procurement" ? <Procurement/> : 
        params.slug==="Building" ? <Business/> :
        params.slug==="Franchisee" ? <Franchisee/> : null}
        </>
    );
}

export default Apply;