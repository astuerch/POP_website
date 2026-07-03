import type {Metadata} from "next";
import {NextIntlClientProvider} from "next-intl";
import {setRequestLocale} from "next-intl/server";
import {Anton, Fraunces, Nunito} from "next/font/google";
import {notFound} from "next/navigation";

import {SiteFooter} from "@/components/site-footer";
import {SiteNavbar} from "@/components/site-navbar";
import {locales, routing, type AppLocale} from "@/i18n/routing";
import {siteConfig, siteUrl} from "@/lib/site";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const nunito = Nunito({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const fraunces = Fraunces({
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "POP Impact Lab",
    template: "%s | POP Impact Lab",
  },
  description: siteConfig.description,
  openGraph: {
    title: "POP Impact Lab",
    description: siteConfig.description,
    url: siteUrl,
    siteName: "POP Impact Lab",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "POP Impact Lab",
    description: siteConfig.description,
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;

  // Defensive guard using a type-safe predicate rather than a bare type assertion.
  function isValidLocale(l: string): l is AppLocale {
    return locales.includes(l as AppLocale);
  }

  if (!isValidLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${anton.variable} ${nunito.variable} ${fraunces.variable}`}
    >
      <body className="bg-brand-night text-brand-fog flex min-h-screen flex-col antialiased">
        <NextIntlClientProvider>
          <SiteNavbar />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
