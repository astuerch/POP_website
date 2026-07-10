import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";

import type {AppLocale} from "@/i18n/routing";

// OG + Twitter images are auto-registered from `app/[locale]/opengraph-image.tsx`
// via Next's file-based metadata conventions — no `images` field is needed here.
type PageKey = "home" | "events" | "about" | "gallery" | "press" | "contact";

// Route path for each page key (home is the locale root).
const pathForKey: Record<PageKey, string> = {
  home: "",
  events: "/events",
  about: "/about",
  gallery: "/gallery",
  press: "/press",
  contact: "/contact",
};

export async function getPageMetadata(
  locale: AppLocale,
  key: PageKey,
): Promise<Metadata> {
  const t = await getTranslations({locale, namespace: `meta.${key}`});

  const title = t("title");
  const description = t("description");
  const path = pathForKey[key];

  return {
    // Canonical points at this locale's URL; `languages` emits the hreflang
    // alternates (with x-default → English) so Google links the EN/DE variants
    // as translations rather than duplicates. Resolved against metadataBase.
    alternates: {
      canonical: `/${locale}${path}`,
      languages: {
        en: `/en${path}`,
        de: `/de${path}`,
        "x-default": `/en${path}`,
      },
    },
    // The home page carries the full brand line ("POP Impact Lab — …"), so it
    // must bypass the "%s | POP Impact Lab" template from the locale layout.
    // Every other page keeps the template.
    title: key === "home" ? {absolute: title} : title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
