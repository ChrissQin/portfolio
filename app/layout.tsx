import type { Metadata, Viewport } from "next";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { getSiteUrl } from "@/lib/constants";
import { sohne, sohneBreit } from "@/lib/fonts";
import { site } from "@/lib/site";

import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#F7F5F1",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title: site.shareTitle,
    description: site.description,
    images: [
      {
        url: "/og-preview.jpg",
        width: 1200,
        height: 629,
        alt: "CQ Visuals — for companies and creators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.shareTitle,
    description: site.description,
    images: ["/og-preview.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sohne.variable} ${sohneBreit.variable} h-full`}
    >
      <body className={`${sohne.className} min-h-full antialiased`}>
        <div className="nen-shell">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
