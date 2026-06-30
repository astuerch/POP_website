import type { Metadata } from "next";

import { SiteFooter } from "@/components/site-footer";
import { SiteNavbar } from "@/components/site-navbar";
import { siteConfig, siteUrl } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "POP Impact Lab | Science for everybody",
    template: "%s | POP Impact Lab",
  },
  description: siteConfig.description,
  openGraph: {
    title: "POP Impact Lab",
    description: siteConfig.description,
    url: siteUrl,
    siteName: "POP Impact Lab",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "POP Impact Lab",
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-brand-paper text-brand-ink flex min-h-screen flex-col antialiased">
        <SiteNavbar />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
