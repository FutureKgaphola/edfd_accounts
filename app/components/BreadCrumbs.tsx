
"use client";

import { Breadcrumb } from "flowbite-react";
import { usePathname } from "next/navigation";
import { HiHome, HiDocument } from "react-icons/hi";

export function Breadcrumbs() {
    const pathname = usePathname();
    return (
        <>
            <Breadcrumb aria-label="Default breadcrumb example" className="bg-gray-50 px-5 py-3 dark:bg-gray-800 gap-3">

                <Breadcrumb.Item href="/dashboard" icon={HiHome}>
                    Home
                </Breadcrumb.Item>
                <Breadcrumb.Item href={pathname} icon={HiDocument}>
                    {pathname == "/applyloan/Business" ? "Business loan" :
                    pathname == "/applyloan/Procurement" ? "Procurement loan" :
                    pathname == "/applyloan/Building" ? "Building loan" : 
                    pathname == "/applyloan/Franchisee" ? "Franchisee loan" :
                    pathname=="/profile" ? "Profile" :null }
                </Breadcrumb.Item>
            </Breadcrumb>
            <hr className="mb-4"></hr>
        </>
    );
}
