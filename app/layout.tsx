import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { site } from "@/lib/site";

import "./globals.css";

const sans = DM_Sans({
  variable: "--font-sans-family",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: site.title,
    template: `%s | ${site.wordmark}`,
  },
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} h-full`}>
      <body className="min-h-full antialiased">
        <div className="nen-shell">
          <SiteHeader />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
