import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./components/Providers/providers";
import { SiteFooter } from "./components/SiteFooter";
import { PoppinsBold, PoppinsLight, PoppinsRegular } from "./customFonts/fonts";
import StoreProvider from "./components/Providers/StoreProvider";
import { ReactQueryClientProvider } from "./components/Providers/ReactQueryProvider";

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
    <html className="scroll-smooth" lang="en" suppressHydrationWarning>
      <body
        className={`${PoppinsLight.variable} ${PoppinsBold.variable} ${PoppinsRegular.variable} antialiased`}
      >
        <ReactQueryClientProvider>
        <StoreProvider>
          <Providers>
            {children}
            <SiteFooter />
          </Providers>
        </StoreProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
