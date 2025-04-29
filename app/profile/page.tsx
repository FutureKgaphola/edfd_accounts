
"use client";

import { Tabs, TabsRef } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { HiClipboardList, HiUserCircle, HiClock } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { Nav_bar } from "../components/Navbar";
import Personal from "../components/Forms/Personal";
import Company from "../components/Forms/Company";
import { customTabs } from "../SiteTheme/Theme";
import { Breadcrumbs } from "../components/BreadCrumbs";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import ApplyLoan from "../components/Forms/ApplyLoan";
import TrackApplication from "../components/Timeline/TrackApplication";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Profile = () => {
  const Authprop = useSelector((state: RootState) => state.AuthReducer);
  const authEmail = Authprop.user?.user_email;
  const tabsRef = useRef<TabsRef>(null);
  const [activeTab, setActiveTab] = useState(0);
  const prop = useSelector((state: RootState) => state.TabSliceReducer);

  type Company = {
    id: string;
    regNo: string;
    TradeName: string;
  };
  const [companies, setCompanies] = useState<Company[]>([]);

  const { data, error, isLoading } = useQuery({
    queryFn: () => axios.get(`/api/companies/retrive/?user_email=${authEmail}`),
    queryKey: ['Registeredcompanies'],
    enabled: !!authEmail,
  });
  useEffect(() => {
    if (data?.data?.companies) {
      setCompanies(data.data.companies);
    }
  }, [data]);
  return (
    <>
      <Nav_bar />
      <Breadcrumbs />
      <div className="flex flex-col gap-3 p-2">
        <Tabs theme={customTabs} aria-label="Default tabs" variant="default" ref={tabsRef} onActiveTabChange={(tab) => setActiveTab(tab)}>
          <Tabs.Item active={prop?.tab == "profile" ? true : false} title="Personal" icon={HiUserCircle}>
            <Personal />
          </Tabs.Item>
          <Tabs.Item active={prop?.tab == "company" ? true : false} title="Companies(s)" icon={MdDashboard}>
            <Company />
          </Tabs.Item>

          <Tabs.Item active={prop?.tab == "apply" ? true : false} title="Apply" icon={HiClipboardList}>
            <ApplyLoan />
          </Tabs.Item>
          <Tabs.Item active={prop?.tab == "track" ? true : false} title="Track Application" icon={HiClock}>
            <TrackApplication />
          </Tabs.Item>

        </Tabs>

      </div>
    </>

  );
}

export default Profile;