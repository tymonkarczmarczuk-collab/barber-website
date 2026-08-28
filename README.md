# SARVEON

The brand site for SARVEON, an independent watch maison, and its first
timepiece — **Passage 01**, a 39 mm Swiss quartz dress-sport watch made
in a first edition of one hundred numbered pieces.

Built as a production site, not a mockup: real components, a working
enquiry endpoint, real accessibility and SEO, and a media system that
lets photography be dropped in later without touching code.

---

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

No configuration is required to run it. Every optional integration is
off by default and says so honestly rather than pretending to work.

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |

Copy `.env.example` to `.env.local` when you are ready to connect mail
or commerce.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Motion · lucide-react. No UI framework beyond that; the components here
are small enough that a dependency would cost more than it saves.

---

## Where things live

```
app/
  layout.tsx              Fonts, metadata, structured data, chrome
  page.tsx                The one-page composition
  globals.css             Design tokens — colour, type, spacing, motion
  opengraph-image.tsx     Generated social card
  icon.svg  apple-icon.tsx
  robots.ts  sitemap.ts  not-found.tsx
  legal/[slug]/page.tsx   Privacy · Terms · Shipping · Returns · Warranty
  api/contact/route.ts    Enquiry endpoint (validation, throttle, delivery)
  api/checkout/route.ts   Checkout seam — deliberately not implemented

components/
  layout/    Header · MobileMenu · Footer · Cursor
  sections/  Hero · Philosophy · Story · WatchReveal · Specifications ·
             Craft · Presence · Movement · RotaryConnection · Caseback ·
             Edition · Price · Service · Faq · Contact
  media/     MediaFrame · MediaProvider · WatchDial · WatchCaseback · Motifs
  motion/    Reveal · RevealGroup · RevealItem · TextReveal
  ui/        Section · Container · Cta · Wordmark · Typography ·
             Accordion · StatusTag · ApprovalStatus · PurchaseCTA

lib/
  config/    site.ts · product.ts · media.ts · content.ts · legal.ts
  media/     manifest.ts   (on-disk scan of /public/media)
  services/  contactService.ts
  commerce/  checkout.ts

public/media/               Drop real photography here
public/media/MEDIA-GUIDE.md Filenames, crops, resolutions, where each appears
legacy/                     The previous site that lived in this repo
```

---

## Changing the site without touching components

Everything a non-developer would want to change is in `lib/config/`.

| I want to change… | Edit |
| --- | --- |
| Price, currency, fallback price | `product.ts` → `price`, `currency`, `alternatePrice` |
| Whether it can be bought | `product.ts` → `availability`: `"inquiry"` \| `"waitlist"` \| `"sale"` |
| Edition size, serial format | `product.ts` → `edition` |
| Movement caliber, once contracted | `product.ts` → `movement.caliber` |
| Warranty length, once agreed | `product.ts` → `service.warrantyYears` |
| Rotary approval state | `product.ts` → `rotary.status` (`"pending"` \| `"approved"`) |
| Specifications and their status | `product.ts` → `keySpecs`, `fullSpecs` |
| Any wording on the page | `content.ts` |
| FAQ questions and answers | `content.ts` → `faq` |
| Navigation, contact details, socials, SEO | `site.ts` |
| Legal page copy | `legal.ts` |
| Which image goes where | `media.ts` |

### Claim discipline

Every specification carries a `status`: `confirmed`, `target`, `tbc`
(to be confirmed) or `pendingApproval`. Anything that is not
`confirmed` renders with a visible tag, and the footer restates it. The
site is built so it cannot quietly overstate what the project has
actually settled.

Two claims are switched off by construction and should stay that way
until documented:

- **`swissMadeClaim.approved`** — "Swiss Made" is a protected
  designation with legal criteria. It is not printed anywhere until the
  manufacturer documents compliance in writing.
- **`rotary.status`** — no Rotary mark is drawn, approximated or
  reproduced anywhere in this repository. The caseback rendering leaves
  a circular zone empty on purpose. See `MEDIA-GUIDE.md` before adding
  any official artwork.

---

## Media

Declared once in `lib/config/media.ts`; files go in `/public/media/`.
The site scans that folder at render time, so a file that exists is
rendered and a file that does not falls back to a designed placeholder
in an identically sized frame — no layout shift, no broken requests.

`public/media/MEDIA-GUIDE.md` lists every filename, aspect ratio,
suggested resolution and where it appears.

The dial and caseback drawn in `components/media/` are vector design
renderings, built to the published specification, that hold the layout
until photography exists. They are replaced automatically once
`passage-01-hero.webp`, `passage-01-front.webp` and
`passage-01-caseback.webp` are added.

---

## Ready to connect

Each of these is a seam with a real implementation path, not a stub
pretending to be finished.

| Integration | Where | To connect |
| --- | --- | --- |
| **Email — Resend** | `lib/services/contactService.ts` | `CONTACT_PROVIDER=resend` plus `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` |
| **Email — Formspree** | same | `CONTACT_PROVIDER=formspree`, `FORMSPREE_ENDPOINT` |
| **Webhook — Supabase / Zapier / your own** | same | `CONTACT_PROVIDER=webhook`, `CONTACT_WEBHOOK_URL`, optional `CONTACT_WEBHOOK_TOKEN` |
| **Checkout — Stripe / Shopify** | `lib/commerce/checkout.ts`, `app/api/checkout/route.ts` | Implement the route, set `NEXT_PUBLIC_CHECKOUT_PROVIDER`, set `product.availability` to `"sale"`. `PurchaseCTA` then becomes the checkout trigger everywhere at once. |
| **Inventory and serial allocation** | `lib/commerce/checkout.ts` → `getEditionInventory`, `allocateSerial` | Back onto whatever holds the edition record; reserve the piece number at payment. |
| **CMS** | `lib/config/*` | Every config object is plain data. Point them at a CMS query and the components do not change. |
| **Analytics** | not installed | Add it, then name it in `lib/config/legal.ts` → privacy, which currently states that nothing tracks visitors. |

Until a provider is configured, the enquiry form returns a real error
rather than a false success. In development it writes the message to
the server console (`CONTACT_PROVIDER=log`).

---

## Accessibility and performance

- Semantic landmarks, one `h1`, ordered headings, a skip link.
- Every control is a real `<button>` or `<a>`; nothing clickable is a `div`.
- Visible focus rings, adapted to whichever surface they sit on.
- The mobile menu is a labelled dialog: it traps focus, closes on
  Escape, locks background scroll and restores focus on close.
- The accordion uses `aria-expanded` / `aria-controls` with labelled regions.
- The form has associated labels, `aria-invalid`, `aria-describedby`,
  live status messages, and validation shared between client and server.
- `prefers-reduced-motion` is honoured throughout — scroll-linked
  effects, parallax, the pinned horizontal track, the count-up and the
  pointer ring all stand down, in JavaScript as well as in CSS.
- Images go through `next/image` with explicit `sizes`. There is no
  video anywhere in this build.
- No horizontal scroll at any width, from 375 px to ultrawide.

## Notes for whoever picks this up next

- `legacy/` holds the unrelated site that previously occupied this
  repository. It is kept only so nothing was thrown away; delete it
  when you are sure it is not needed.
- The legal pages are honest working drafts and say so on the page.
  They need review by a qualified professional before any sale.
