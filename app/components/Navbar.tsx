
"use client";

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import ledalogo from '../assets/images/logoleda.png';
import Image from "next/image";
import Link from "next/link";
import prof from "../assets/images/profile_user.png";

export function Nav_bar() {
  return (
    <header className="w-full bg-gray-700">
      
      <Navbar fluid rounded className="bg-gray-700">
        <Navbar.Brand as={Link} href="/">
          <Image priority src={ledalogo} width={110} height={110} className="mr-3 bg-white p-2" alt="Leda Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">{""}</span>
        </Navbar.Brand>
        <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" src={prof}  />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@gmail.com</span>
          </Dropdown.Header>
          
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
      </div>
      </Navbar>
    </header>

  );
}
