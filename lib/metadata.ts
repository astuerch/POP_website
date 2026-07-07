import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";

import type {AppLocale} from "@/i18n/routing";

// OG + Twitter images are auto-registered from `app/[locale]/opengraph-image.tsx`
// via Next's file-based metadata conventions — no `images` field is needed here.
export async function getPageMetadata(
  locale: AppLocale,
  key: "home" | "events" | "about" | "gallery" | "contact",
): Promise<Metadata> {
  const t = await getTranslations({locale, namespace: `meta.${key}`});

  const title = t("title");
  const description = t("description");

  return {
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
