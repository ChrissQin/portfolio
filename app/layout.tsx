import type { Metadata, Viewport } from "next";
import { Archivo_Black, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getSiteUrl, siteConfig } from "@/lib/constants";

import "./globals.css";

const display = Archivo_Black({
  variable: "--font-display-family",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const body = IBM_Plex_Sans({
  variable: "--font-body-family",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono-family",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteUrl = getSiteUrl();

const pageTitle = `${siteConfig.name} — ${siteConfig.role}`;
const pageDescription =
  "Portfolio of Chris Qin, an Atlanta-based video editor and videographer working across YouTube, social content, documentary, and branded video.";

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: pageTitle,
    template: `%s — ${siteConfig.name}`,
  },
  description: pageDescription,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: pageTitle,
    description: pageDescription,
    siteName: siteConfig.name,
    locale: "en_US",
    images: [
      {
        url: "/social/og-image.png",
        width: 1200,
        height: 630,
        alt: "Chris Qin — Video Editor and Videographer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/social/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${display.variable} ${body.variable} ${mono.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <div className="site-shell">
          <SiteHeader />
          <main className="site-main">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
