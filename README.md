# POP_website

Built website for POP Impact Lab initiative

## Project overview

This repository now contains **Phase 1** of the POP Impact Lab website rebuild: a clean, responsive Next.js codebase that replaces the current Wix Studio foundation with a maintainable App Router project.

Phase 1 includes:

- full page and route structure for the public site
- a responsive layout with reusable components
- typed content modules for events, team members, and gallery items
- Framer Motion-powered entrance animations that respect reduced-motion preferences
- stubbed MailerLite and Ticket Tailor integration points for later phases

## Tech stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- ESLint
- Prettier + `prettier-plugin-tailwindcss`
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

## Folder structure

```text
app/                    App Router pages, layouts, route handlers, and legal routes
components/             Reusable UI, forms, cards, layout, and animation helpers
content/                Typed content modules for events, team, and gallery data
lib/                    Shared utilities and site-level configuration
public/                 Placeholder local SVG assets for team and gallery visuals
```

## Editing content

All editable placeholder content is centralized in the `content/` directory:

- `content/events.ts`
- `content/team.ts`
- `content/gallery.ts`

These files export typed arrays/objects so non-developers or future contributors can update copy, dates, registration settings, and placeholder media references in one place.

## Environment variables and integrations

Copy `.env.example` to `.env.local` for local development:

```bash
cp .env.example .env.local
```

### Dependency note

- `package.json` includes a `postcss` override to `8.5.16` to avoid the vulnerable transitive `postcss@8.4.31` pulled by the current Next.js release during `npm audit`.

### MailerLite newsletter stub

Environment variables:

- `MAILERLITE_API_KEY`
- `MAILERLITE_GROUP_ID`
- `NEXT_PUBLIC_SITE_URL`

Current wiring:

- `NewsletterForm` submits to `/api/subscribe`
- `app/api/subscribe/route.ts` validates the email and returns a stub success response
- TODO comments mark where the MailerLite API request should be added

### Ticket Tailor registration stub

Current wiring:

- the event detail page renders `RegistrationWidget`
- registration mode is driven by fields in `content/events.ts`
- use `ticketTailorEventId`, `registrationType`, and `registrationUrl` in the event entries
- optional future env support is documented in `.env.example` as `TICKET_TAILOR_ACCOUNT_SLUG`

## Scripts

- `npm run dev` — start the development server
- `npm run build` — compile the production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint with zero warnings allowed
- `npm run format` — format the project with Prettier

## Phase plan

- **Phase 1** — foundation: scaffold the app, responsive structure, reusable components, animations, placeholder content, and integration stubs
- **Later phases** — replace placeholders with approved copy and imagery, connect live MailerLite/Ticket Tailor integrations, add deployment/runtime details, and polish launch content
