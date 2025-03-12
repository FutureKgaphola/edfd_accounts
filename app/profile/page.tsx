
"use client";

import { Tabs, TabsRef } from "flowbite-react";
import { useRef, useState } from "react";
import { HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { Nav_bar } from "../components/Navbar";
import Personal from "../components/Forms/Personal";
import Company from "../components/Forms/Company";
import CompanyList from "../components/Forms/CompanyList";
import { customTabs } from "../SiteTheme/Theme";
import { Breadcrumbs } from "../components/BreadCrumbs";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

  const Profile=()=> {
    const Authprop = useSelector((state: RootState) => state.AuthReducer);
  const tabsRef = useRef<TabsRef>(null);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
    <Nav_bar />
    <Breadcrumbs />
    <div className="flex flex-col gap-3 p-2">
      <Tabs theme={customTabs} aria-label="Default tabs" variant="default" ref={tabsRef} onActiveTabChange={(tab) => setActiveTab(tab)}>
        <Tabs.Item active title="Personal" icon={HiUserCircle}>
          <Personal/>
        </Tabs.Item>
        <Tabs.Item title="Companies(s)" icon={MdDashboard}>
          <Company/>
        </Tabs.Item>
        
        <Tabs.Item title="Company Listing(s)" icon={HiClipboardList}>
          <CompanyList/>
        </Tabs.Item>
        
      </Tabs>
      
    </div>
    </>
    
  );
}


export default Profile;