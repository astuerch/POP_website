import type {MetadataRoute} from "next";

import {siteUrl} from "@/lib/site";

/**
 * Global robots.txt. Allow all crawlers on production; disallow the API
 * route so the newsletter submit endpoint is not spidered.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
