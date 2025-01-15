
"use client";

import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import ledalogo from '../assets/images/logoleda.png';
import Image from "next/image";
import Link from "next/link";
import prof from "../assets/images/profile_user.png";
import { usePathname, useRouter } from "next/navigation";
import { useSignout } from "../hooks/useSignout";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useEffect } from "react";


export function Nav_bar() {
  const pathname = usePathname();
  const router = useRouter();
  const { handleSigOut, errorLogout } = useSignout();
  const Authprop = useSelector((state: RootState) => state.AuthReducer);
   useEffect(()=>{
    if(!Authprop?.token)
    {
      router.replace('/');
    }
   },[Authprop?.token]);

  return (
    <header className="w-full bg-gray-700">

      <Navbar suppressHydrationWarning fluid rounded className="bg-gray-700">
        <Navbar.Brand as={Link} href="/">
          <Image priority src={ledalogo} width={110} height={110} className="mr-3 bg-white p-2" alt="Leda Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">{""}</span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User settings"
                img={'/user.png'} />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{Authprop?.user?.name ?? ""}</span>
              <span className="block truncate text-sm font-medium">{Authprop?.user?.email ?? ""}</span>
            </Dropdown.Header>

            <Dropdown.Item onClick={() => handleSigOut()} >Sign out</Dropdown.Item>
          </Dropdown>
        </div>
        <p>{errorLogout && errorLogout}</p>
      </Navbar>
    </header>

  );

}
