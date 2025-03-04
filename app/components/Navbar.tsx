
"use client";

import { Avatar, Button, Dropdown, Navbar, Spinner } from "flowbite-react";
import ledalogo from '../assets/images/logoleda.png';
import Image from "next/image";
import Link from "next/link";
import prof from "../assets/images/profile_user.png";
import { usePathname, useRouter } from "next/navigation";
import { useSignout } from "../hooks/useSignout";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useEffect } from "react";
import { useDomReady } from "../hooks/useDomReady";

export function Nav_bar() {
  const pathname = usePathname();
  const router = useRouter();
  const { handleSigOut, errorLogout } = useSignout();
  const { domReady } = useDomReady();
  const Authprop = useSelector((state: RootState) => state.AuthReducer);
  useEffect(() => {
    if (!Authprop?.token) {
      router.replace('/');
    }
  }, [Authprop?.token]);
  console.log(Authprop.user);
  return (
    <header className="w-full bg-gray-700">

      <Navbar suppressHydrationWarning fluid rounded className="bg-gray-700">
        <Navbar.Brand as={Link} href="/">
          <Image priority src={ledalogo} width={110} height={110} className="mr-3 bg-white p-2" alt="Leda Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">{""}</span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          {
            domReady ? (
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar alt="User settings"
                    img={'/user.png'} />
                }
              >
                <Dropdown.Header>
                  <Link href={'/profile'}><span className="block text-sm">{Authprop?.user?.name ?? ""}</span></Link>
                  <Link href={'/profile'}><span className="block truncate text-sm font-medium">{Authprop?.user?.email ?? ""}</span></Link>
                </Dropdown.Header>

                <Dropdown.Item onClick={() => handleSigOut()} >Sign out</Dropdown.Item>
              </Dropdown>
            ) : <div className="flex items-center justify-center">
              <Spinner color="success" aria-label="Success spinner example" />
            </div>
          }

        </div>
        <p>{errorLogout && errorLogout}</p>
      </Navbar>
    </header>

  );

}
