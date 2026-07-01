import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";

import type {AppLocale} from "@/i18n/routing";

export async function getPageMetadata(
  locale: AppLocale,
  key: "home" | "events" | "about" | "gallery" | "contact",
): Promise<Metadata> {
  const t = await getTranslations({locale, namespace: `meta.${key}`});

  return {
    title: t("title"),
    description: t("description"),
  };
}
