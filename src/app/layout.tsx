import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "../components/SessionWrapper";
// import Component from "../components/Component";

const inter = Inter({ subsets: ["latin"] });

export const metadata:Metadata = {
  title: "WorkFlow",
  description: "A one stop solution to companies for there Employee Management",
  icons: {
    icon: '/favicon.svg', // public path
  },
};

export default function RootLayout({ children }:any) {
  return (
    <html lang="en">
      <SessionWrapper>
      <body className={`${inter.className} width:w-full`} >{children}</body>
        {/* <Component/> */}
      </SessionWrapper>
    </html>
  );
}
