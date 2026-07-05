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
    title,
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
