"use client"

import Business from "@/app/components/ApplicationForms/Business";
import Procurement from "@/app/components/ApplicationForms/Procurement";
import Franchisee from "@/app/components/ApplicationForms/Franchisee";
import { Nav_bar } from "@/app/components/Navbar";
import Building from "@/app/components/ApplicationForms/Building";

const Apply = ({ params }: { params: { slug: string } }) => {
    
    return (
        <>
        <Nav_bar/>
        {params.slug==="Business" ? <Business/> : 
        params.slug==="Procurement" ? <Procurement/> : 
        params.slug==="Building" ? <Building/> :
        params.slug==="Franchisee" ? <Franchisee/> : null}
        </>
    );
}

export default Apply;