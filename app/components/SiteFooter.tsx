
"use client";

import { Footer } from "flowbite-react";
import Link from "next/link";
import { BsFacebook, BsLinkedin, BsTwitter } from "react-icons/bs";

export function SiteFooter() {
  return (
    <Footer className="bg-appGreen -mt-4">
      <div className="fdiv w-full">
        <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
          <div>
            <Footer.Title title="Company" />
            <Footer.LinkGroup col>
              <Footer.Link as={Link} href="/about">About</Footer.Link>
              <Footer.Link target="_blank" href="https://www.lieda.co.za/index.php/jobs/">Careers</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="help center" />
            <Footer.LinkGroup col>
              <Footer.Link href="https://twitter.com/Limpopoecon" target="_blank">Twitter</Footer.Link>
              <Footer.Link href="https://www.facebook.com/LimpopoEcon" target="_blank">LinkedIn</Footer.Link>
              <Footer.Link href="https://www.linkedin.com/company/limpopo-economic-development-agency/" target="_blank">Facebook</Footer.Link>
              <Footer.Link as={Link} href="/contact">Contact Us</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="legal" />
            <Footer.LinkGroup col>
              <Footer.Link href="#">Privacy Policy</Footer.Link>
              <Footer.Link href="#">Licensing</Footer.Link>
              <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
            </Footer.LinkGroup>
          </div>
          
        </div>
        <div className="w-full bg-gray-700 px-4 py-6 sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright color="white" className="text-white" href="#" by="Limpopo Connexion™" year={2024} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="https://www.facebook.com/LimpopoEcon" target="_blank" icon={BsFacebook} />
            <Footer.Icon href="https://twitter.com/Limpopoecon" target="_blank" icon={BsTwitter} />
            <Footer.Icon href="https://www.linkedin.com/company/limpopo-economic-development-agency/" target="_blank" icon={BsLinkedin} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
