"use client";

import { Spinner, Tabs, TabsRef } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { HiClipboardList, HiUserCircle, HiClock } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { Nav_bar } from "../components/Navbar";
import Personal from "../components/Forms/Personal";
import Company from "../components/Forms/Company";
import { customSpinner, customTabs } from "../SiteTheme/Theme";
import { Breadcrumbs } from "../components/BreadCrumbs";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import ApplyLoan from "../components/Forms/ApplyLoan";
import TrackApplication from "../components/Timeline/TrackApplication";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDomReady } from "../hooks/useDomReady";

const Profile = () => {
  const Authprop = useSelector((state: RootState) => state.AuthReducer);
  const authEmail = Authprop.user?.user_email;
  const prop = useSelector((state: RootState) => state.TabSliceReducer);
  const { domReady } = useDomReady();
  const tabsRef = useRef<TabsRef>(null);

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const tabIndex = getTabIndexFromRedux(prop?.tab);
    tabsRef.current?.setActiveTab(tabIndex); // set active tab imperatively
    setActiveTab(tabIndex);
  }, [prop?.tab]);

  type Company = {
    id: string;
    regNo: string;
    TradeName: string;
  };

  const [companies, setCompanies] = useState<Company[]>([]);

  const { data } = useQuery({
    queryFn: () => axios.get(`/api/companies/retrive/?user_email=${authEmail}`),
    queryKey: ['Registeredcompanies'],
    enabled: !!authEmail,
  });

  useEffect(() => {
    if (data?.data?.companies) {
      setCompanies(data.data.companies);
    }
  }, [data]);

  function getTabIndexFromRedux(tab: string | undefined): number {
    switch (tab) {
      case "profile": return 0;
      case "company": return 1;
      case "apply": return 2;
      case "track": return 3;
      default: return 0;
    }
  }

  return (
    <>
      <Nav_bar />
      <Breadcrumbs />
      <div className="flex flex-col gap-3 p-2">
        {
          domReady ? (
            <Tabs
              theme={customTabs}
              aria-label="Default tabs"
              variant="default"
              ref={tabsRef}
              onActiveTabChange={(tab) => setActiveTab(tab)}
            >
              <Tabs.Item title="Personal" icon={HiUserCircle}>
                <Personal />
              </Tabs.Item>
              <Tabs.Item title="Companies(s)" icon={MdDashboard}>
                <Company />
              </Tabs.Item>
              <Tabs.Item title="Apply" icon={HiClipboardList}>
                <ApplyLoan />
              </Tabs.Item>
              <Tabs.Item title="Track Application" icon={HiClock}>
                <TrackApplication />
              </Tabs.Item>
            </Tabs>
          ) : <div className="flex gap-2 items-center justify-center h-dvh">
            <Spinner className="ring-appGreen" color="success" size="xl" theme={customSpinner} aria-label="Center-aligned spinner example" />
            <p>Preparing Profile....</p>
          </div>
        }

      </div>
    </>
  );
};

export default Profile;
