export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

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
