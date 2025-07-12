import TopHeader from "@/components/header/TopHeader";
import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import SearchInput from "./home/_components/search-input";

export const metadata: Metadata = {
  title: "Multi Vendor App",
  description: "A modern ecommerce platform for multiple vendors.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "Multi Vendor App",
    description: "A modern ecommerce platform for multiple vendors.",
    url: "/",
    siteName: "Multi Vendor App",
    type: "website",
  },
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <TopHeader />
        <div className="container mx-auto max-w-7xl px-4 py-6">
          <SearchInput />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
