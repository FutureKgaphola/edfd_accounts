import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import { SiteFooter } from "./components/SiteFooter";
import { PoppinsBold, PoppinsLight, PoppinsRegular } from "./customFonts/fonts";
import { Nav_bar } from "./components/Navbar";
import StoreProvider from "./StoreProvider";



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "LEDA Loans",
  description: "Apply for a loan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="en">
      <body
        className={`${PoppinsLight.variable} ${PoppinsBold.variable} ${PoppinsRegular.variable} antialiased`}
      >
        <StoreProvider>
          <Providers>
            {children}
            <SiteFooter />
          </Providers>
        </StoreProvider>

      </body>
    </html>
  );
}
