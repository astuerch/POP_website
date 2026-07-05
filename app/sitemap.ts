import type {MetadataRoute} from "next";

import {events} from "@/content/events";
import {locales} from "@/i18n/routing";
import {siteUrl} from "@/lib/site";

/**
 * Sitemap generator with proper multilingual `alternates.languages` so
 * search engines understand the EN and DE URLs are translations of the same
 * page (not duplicate content). Google recommends including a self-referencing
 * hreflang for every language variant, so every entry lists both `en` and `de`
 * in its `alternates.languages` map.
 */
type PageDef = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const staticPages: PageDef[] = [
  {path: "", priority: 1.0, changeFrequency: "weekly"},
  {path: "/events", priority: 0.9, changeFrequency: "weekly"},
  {path: "/about", priority: 0.7, changeFrequency: "monthly"},
  {path: "/gallery", priority: 0.7, changeFrequency: "monthly"},
  {path: "/contact", priority: 0.6, changeFrequency: "yearly"},
];

const legalPages: PageDef[] = [
  {path: "/legal/privacy-cookie-policy", priority: 0.3, changeFrequency: "yearly"},
  {path: "/legal/terms-conditions", priority: 0.3, changeFrequency: "yearly"},
  {path: "/legal/refund-policy", priority: 0.3, changeFrequency: "yearly"},
  {path: "/legal/imprint", priority: 0.3, changeFrequency: "yearly"},
];

function languagesFor(path: string) {
  return Object.fromEntries(
    locales.map((locale) => [locale, `${siteUrl}/${locale}${path}`]),
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of [...staticPages, ...legalPages]) {
      entries.push({
        url: `${siteUrl}/${locale}${page.path}`,
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: languagesFor(page.path),
        },
      });
    }

    for (const event of events) {
      const path = `/events/${event.slug}`;
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        lastModified: now,
        changeFrequency: event.status === "upcoming" ? "weekly" : "yearly",
        priority: event.status === "upcoming" ? 0.9 : 0.5,
        alternates: {
          languages: languagesFor(path),
        },
      });
    }
  }

  return entries;
}
