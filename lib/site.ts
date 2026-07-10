// Canonical site origin used for metadata (og:image, sitemap, robots, …).
// OWNER: once the final domain is live, set NEXT_PUBLIC_SITE_URL in the
// Vercel project settings (e.g. https://popimpactlab.ch) — it always wins.
// Until then we fall back to the Vercel-provided production/deployment URL
// so social previews never point at localhost, and finally to localhost for
// local development.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

export const siteConfig = {
  name: "POP Impact Lab",
  shortName: "POP",
  description:
    "POP Impact Lab is a Zurich-based science outreach initiative creating approachable, conversation-led events where science feels accessible to everybody.",
  mission: "Science meets society, in the places you already go.",
  email: "popimpactlab@gmail.com",
  phone: "+41 78 923 18 14",
  instagram: "https://www.instagram.com/pop_impactlab/",
  location: "Zurich, Switzerland",
};

// navLinks uses `key` (not `label`) so the navbar/footer can look up the translated
// display name via `t(link.key)` from messages/en.json → nav.* / messages/de.json → nav.*.
// Legal and social links retain a plain `label` string because they are not currently
// translated and are rendered verbatim.
export const navLinks = [
  {href: "/", key: "home"},
  {href: "/events", key: "events"},
  {href: "/about", key: "about"},
  {href: "/gallery", key: "gallery"},
  {href: "/press", key: "press"},
  {href: "/contact", key: "contact"},
] as const;

export const legalLinks = [
  {href: "/legal/privacy-cookie-policy", label: "Privacy & Cookie Policy"},
  {href: "/legal/terms-conditions", label: "Terms & Conditions"},
  {href: "/legal/refund-policy", label: "Refund Policy"},
  {href: "/legal/imprint", label: "Imprint"},
] as const;

export const socialLinks = [
  {href: "mailto:popimpactlab@gmail.com", label: "Email"},
  {href: "/contact", label: "Instagram"},
  {href: "/contact", label: "LinkedIn"},
] as const;
