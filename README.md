# POP_website

Built website for POP Impact Lab — bilingual (EN/DE) Next.js site.

## Project overview

This repository contains **Phase 2** of the POP Impact Lab website rebuild. It replaces the Wix Studio site with a fully bilingual, responsive Next.js application using the real content, branding, imagery, and legal text provided by the site owner.

Phase 2 delivers:

- **Bilingual i18n** — `/en/…` and `/de/…` locale-prefixed routes via `next-intl`, with a language switcher in navbar and footer that preserves the current page
- **Real branding** — `pop_logo.svg` in navbar/footer, lila (`#B6A1D2`) colour palette, Anton (headings) + Nunito (body) fonts
- **Real hero** — `crowd_pop.jpg` event photo as full-bleed hero background with 60 % dark scrim and the exact PDF headline copy
- **"How POP works" — 3 cards** (not 4) with the owner's three circular purple icons
- **Partners strip** — ETH Zürich, UZH, LSZY, REACH, Vergani logos (greyscale → colour on hover), plus Suncademy and Avantcha as text badges
- **Dark contrast band** — `background sections.jpg` behind the newsletter CTA section
- **Real content** — About page copy, team headshots + bios, upcoming event details (September 2026, Vergani Zürich), correct email address
- **Real legal text** — Privacy & Cookie Policy (nFADP-compliant), Terms & Conditions, Refund Policy, and Imprint from the site owner
- **Gallery** with real quote copy; placeholder grid ready for the ~50 first-event photos
- **MailerLite** and **Ticket Tailor** integration stubs kept, ready for live keys

Phase 1 is the foundation this phase builds on (App Router scaffold, typed content modules, Framer Motion animations, ESLint config).

## Tech stack

- Next.js 16 (App Router) + TypeScript
- next-intl 4 (bilingual EN/DE routing)
- Tailwind CSS v4
- Framer Motion
- ESLint + Prettier
- npm / Node.js

## Getting started locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` — middleware redirects `/` → `/en` automatically.
3. Build the production app:
   ```bash
   npm run build
   ```
4. Run linting:
   ```bash
   npm run lint
   ```
5. Optional formatting pass:
   ```bash
   npm run format
   ```

## Bilingual setup

### How translations work

All user-facing strings live in `messages/en.json` and `messages/de.json`. The JSON key structure is identical across both files. Locale routing is driven by:

| File | Purpose |
|---|---|
| `i18n/routing.ts` | Defines `en` / `de` locales and default (`en`) |
| `i18n/request.ts` | Wires `next-intl` server config → loads the right message file |
| `i18n/navigation.ts` | Exports locale-aware `Link`, `useRouter`, `usePathname`, `redirect` |
| `middleware.ts` | Intercepts all requests and applies locale prefix |
| `app/[locale]/layout.tsx` | Sets `<html lang>` per locale and wraps with `NextIntlClientProvider` |

### Adding or editing translations

Open `messages/en.json` and `messages/de.json` side by side. Keys are nested by section:

```
nav / hero / howPopWorks / socialProof / nextEvent / newsletter / partners /
events / about / gallery / contact / footer / legal / notFound / meta
```

Edit the value in both files to keep them in sync.

### Language switcher

- **Navbar**: shows "DE" (on English pages) or "EN" (on German pages). Clicking switches locale while staying on the same page.
- **Footer**: plain text link labelled "Deutsch" / "English".

### Adding a new locale

1. Add the locale string to `i18n/routing.ts` → `locales` array.
2. Create `messages/<locale>.json` (copy from `en.json` and translate).
3. The middleware and `[locale]` segment handle the rest automatically.

## Folder structure

```text
app/
  [locale]/               Locale-aware pages (home, events, about, gallery, contact, legal/*)
  api/subscribe/          MailerLite newsletter route handler stub
  layout.tsx              Minimal root layout (html/body rendered in [locale]/layout.tsx)
  globals.css             Google Fonts import + CSS custom properties
components/               Hero, navbar, footer, how-pop-works, partners-strip, cards, forms, etc.
content/
  events.ts               Typed event data (upcoming + archive)
  team.ts                 Founder bios + headshot references
  gallery.ts              Gallery item references (placeholders until photos are dropped in)
  legal.ts                Full legal text (Privacy, T&C, Refund, Imprint)
i18n/
  routing.ts              next-intl locale/routing config
  request.ts              Server-side next-intl request config
  navigation.ts           Locale-aware Link, useRouter, usePathname
messages/
  en.json                 English translations (source of truth)
  de.json                 German translations (machine-assisted; owner should review)
lib/
  metadata.ts             Locale-aware generateMetadata helper
  site.ts                 Site-wide config (email, name, nav/legal/social link definitions)
  utils.ts                Tailwind cn() helper
middleware.ts             next-intl locale routing middleware
public/
  images/
    brand/                pop_logo.svg + 5 partner logos
    hero/                 crowd_pop.jpg — homepage hero photo
    icons/                3 "How POP works" circular icons
    backgrounds/          background sections.jpg — dark contrast band
    team/                 pic ale.png, pic jess.png, pic maria.png
    events/               event1_pic.png (upcoming), event2_pic.png (past)
    gallery/event-01/     Drop the ~50 first-event photos here when ready
```

## Editing content

All editable content is in `content/`:

- **`content/events.ts`** — event slugs, titles, dates, venues, speakers, registration type, images
- **`content/team.ts`** — founder names, roles, bios, focus lines, headshot paths
- **`content/gallery.ts`** — gallery item array; add entries once photos land in `public/images/gallery/event-01/`
- **`content/legal.ts`** — structured legal text rendered by `LegalPage` component

All user-facing UI copy lives in `messages/en.json` (English) and `messages/de.json` (German).

## Images → sections map

| Image file | Used in |
|---|---|
| `public/images/brand/pop_logo.svg` | Navbar, footer |
| `public/images/hero/crowd_pop.jpg` | Homepage hero background |
| `public/images/icons/icon1 the question.png` | "A bold question" card |
| `public/images/icons/icon2 scientist.png` | "Researchers in the room" card |
| `public/images/icons/icon3 discussion.png` | "Open conversation" card |
| `public/images/backgrounds/background sections.jpg` | Newsletter CTA dark band |
| `public/images/team/pic ale.png` | Ale Stürchler team card |
| `public/images/team/pic jess.png` | Jess Simon team card |
| `public/images/team/pic maria.png` | Maria Dimitriu team card |
| `public/images/events/event1_pic.png` | Upcoming event card + detail page |
| `public/images/events/event2_pic.png` | Past event card + social proof section |
| `public/images/brand/ETH logo.png` | Partners strip |
| `public/images/brand/UZH logo.jpg` | Partners strip |
| `public/images/brand/LSZY logo.png` | Partners strip |
| `public/images/brand/reach logo.png` | Partners strip |
| `public/images/brand/vergani logo.png` | Partners strip |

## Partners section

The "In collaboration with" strip displays the five uploaded logos (ETH Zürich, UZH, LSZY, Reach, Vergani) plus Suncademy and Avantcha as text badges (logos not yet uploaded). To add a logo: drop the file in `public/images/brand/`, then add an entry to the `partners` array in `components/partners-strip.tsx`.

## Environment variables and integrations

Copy `.env.example` to `.env.local` for local development:

```bash
cp .env.example .env.local
```

### MailerLite newsletter stub

Environment variables: `MAILERLITE_API_KEY`, `MAILERLITE_GROUP_ID`, `NEXT_PUBLIC_SITE_URL`

`NewsletterForm` → `POST /api/subscribe` → stub success response. TODO comments in `app/api/subscribe/route.ts` mark where the live MailerLite API call goes.

### Ticket Tailor registration stub

Registration mode is driven by `registrationType` + `ticketTailorEventId` in `content/events.ts`. `TICKET_TAILOR_ACCOUNT_SLUG` is documented in `.env.example`.

## Gallery — first event photos

Drop the ~50 first-event photos into `public/images/gallery/event-01/`. Then add entries to `content/gallery.ts`. The `GalleryGrid` component will render them.

## Fonts

- **Headings (Anton)** — Google Fonts via CSS `@import`. Used via Tailwind `font-heading` utility.
- **Body / small titles (Nunito)** — Google Fonts, `--font-sans`. Avenir (owner's preferred font) is not on Google Fonts; Nunito is the web substitute. Avenir renders on macOS as a system fallback.

> **Owner action needed**: if a licensed Avenir web font is available, replace the Nunito import with `next/font/local` and update `--font-sans` in `globals.css`.

## Scripts

- `npm run dev` — start the development server
- `npm run build` — compile the production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint with zero warnings allowed
- `npm run format` — format the project with Prettier

## Phase plan

- ✅ **Phase 1** — foundation: App Router scaffold, responsive structure, components, Framer Motion, placeholder content, integration stubs
- ✅ **Phase 2** — content + branding + i18n: real copy, images, lila palette, bilingual EN/DE routing, legal text, partners strip
- ⏳ **Phase 3** — live integrations: MailerLite API key, Ticket Tailor event IDs, Vercel deployment, first-event gallery photos (~50 images)
