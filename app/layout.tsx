import type { Metadata, Viewport } from "next";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { sohne, sohneBreit } from "@/lib/fonts";
import { site } from "@/lib/site";

import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#F7F5F1",
  colorScheme: "light",
};

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
    <html
      lang="en"
      className={`${sohne.variable} ${sohneBreit.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <div className="nen-shell">
          <SiteHeader />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
