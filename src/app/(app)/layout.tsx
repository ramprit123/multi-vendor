import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

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
        <main>{children}</main>
      </body>
    </html>
  );
}
