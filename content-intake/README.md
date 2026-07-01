# 📥 Content Intake — POP Impact Lab (Phase 2)

This folder is your **staging area**. Drop your real content from Wix here (text) and put images in `public/images/`. Once everything is in, I (Copilot) will move it into the live site, apply your brand, and wire up the bilingual (EN + DE) pages.

> You do **not** need git. Use GitHub's web UI: open a folder → **Add file → Upload files** → drag & drop → **Commit changes**. To edit a template, open the `.md` file → click the ✏️ pencil → type → **Commit changes**.

---

## How this works

- Every page has a template file below with **English (EN)** and **German (DE)** fields side by side.
- Fill in whatever you have. If you don't have the German yet, leave it blank — I can draft translations for you to review.
- Paste text **exactly** as it should appear (copy it straight from Wix). Don't worry about formatting/HTML — plain text is perfect.
- For anything you're unsure about, just add a note like `(?? not sure)` and I'll follow up.

---

## ✍️ Text — fill these in

| File | What goes in it |
|------|-----------------|
| `home.md` | Hero headline/subhead, "no panel, no podium" text, how-it-works blurbs, newsletter CTA |
| `about.md` | Team mission paragraph + each founder's bio (Ale, Jess, Maria) |
| `events.md` | The upcoming event + every past event (title, date, venue, description, hosts, price/RSVP) |
| `contact.md` | Real email, socials, where contact-form messages should go |
| `legal/privacy.md` | Privacy & Cookie Policy (copy verbatim from Wix) |
| `legal/terms.md` | Terms & Conditions (verbatim) |
| `legal/refund.md` | Refund Policy (verbatim) |
| `legal/imprint.md` | Imprint (verbatim) |
| `brand.md` | Color hex codes + font names from Wix Studio |

---

## 🖼️ Images — upload to `public/images/`

| Folder | What goes in it |
|--------|-----------------|
| `public/images/brand/` | Logo (SVG or high-res PNG), favicon, social share image |
| `public/images/hero/` | Homepage hero image(s) |
| `public/images/team/` | Founder headshots — name them `ale.jpg`, `jess.jpg`, `maria.jpg` |
| `public/images/events/` | Event cover images |
| `public/images/gallery/event-01/` | **The ~50 photos from the first event** — upload here (drag the whole batch) |

**Tips for uploading images**
- GitHub web upload handles ~100 files per batch, up to 25 MB per file — the 50 gallery photos are fine in one go.
- Keep original resolution; Next.js will optimize/resize automatically.
- Use simple lowercase names, no spaces (e.g. `gallery-01.jpg`, not `IMG 1 (final).JPG`).

---

## ✅ Minimum to unblock the build

If you want to see the site come to life fastest, prioritize:
1. `brand.md` (colors + fonts)
2. `home.md` + `about.md` text
3. Images in `public/images/brand/`, `hero/`, and `team/`

Everything else (events detail, legal, gallery photos, integrations) can follow right after.

---

## What happens next

Once you've dropped content in and tell me you're ready, I'll:
1. Set up full bilingual routing (`/en/...` and `/de/...`) with a language switcher.
2. Apply your brand colors + fonts.
3. Move your text into translation files and your images into the live components.
4. Wire up MailerLite (newsletter) + Ticket Tailor (registration) once you've created those accounts.
5. Prep Vercel deployment.
