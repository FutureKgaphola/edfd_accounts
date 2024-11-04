
"use client";

import { Button, Footer, Navbar } from "flowbite-react";
import { customsubmitTheme } from "../SiteTheme/Theme";
import ledalogo from '../assets/images/logoleda.png';
import { BsFacebook, BsLinkedin, BsTwitter } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";


export function Nav_bar() {
  return (
    <header className="w-full bg-slate-50">
      
      <Navbar fluid rounded className="bg-slate-50">
        <Navbar.Brand as={Link} href="/">
          <Image priority src={ledalogo} width={110} height={110} className="mr-3" alt="Leda Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">{""}</span>
        </Navbar.Brand>
        
      </Navbar>
    </header>

  );
}
