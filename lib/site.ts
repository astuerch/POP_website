export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteConfig = {
  name: "POP Impact Lab",
  shortName: "POP",
  description:
    "POP Impact Lab is a Zurich-based science outreach initiative creating approachable, conversation-led events where science feels accessible to everybody.",
  mission: "science that shapes our future should be accessible to everyone",
  email: "hello@popimpactlab.com",
  location: "Zurich, Switzerland",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

export const legalLinks = [
  { href: "/legal/privacy-cookie-policy", label: "Privacy & Cookie Policy" },
  { href: "/legal/terms-conditions", label: "Terms & Conditions" },
  { href: "/legal/refund-policy", label: "Refund Policy" },
  { href: "/legal/imprint", label: "Imprint" },
] as const;

export const socialLinks = [
  { href: "https://www.instagram.com/", label: "Instagram" },
  { href: "https://www.linkedin.com/", label: "LinkedIn" },
  { href: `mailto:${siteConfig.email}`, label: "Email" },
] as const;
