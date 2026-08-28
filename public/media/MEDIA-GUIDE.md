# SARVEON — Media Guide

Everything visual on the site is declared once in `lib/config/media.ts`.
Drop a file into this folder with the filename below (any of the
accepted formats — see below) and it appears automatically — no code
change, no import, no re-wiring.

## How it works

1. Name the file to match the **basename** in the tables below — e.g.
   for `passage-01-hero.webp` you can just as well save
   `passage-01-hero.jpg` or `passage-01-hero.png`. No conversion needed.
2. Put it in `/public/media/`.
3. Refresh the page (`npm run dev` picks it up immediately; a
   production build needs a rebuild).

The site scans this folder at render time and checks, for every
declared image, whether that file exists as `.webp`, `.avif`, `.jpg`,
`.jpeg` or `.png` — in that order of preference — and renders whichever
one it finds through `next/image`. A file that is present is rendered;
one that is absent falls back to a designed placeholder in the same
frame — same size, same rhythm, no layout shift and no broken image
requests. You can therefore ship the site today and fill it in as
photography arrives, straight from a phone or camera, with no export
step.

**Renaming the base filename is the only thing that breaks this.** If
you need a different name, change the `src` in `lib/config/media.ts`
to match (the extension there is cosmetic — just change the basename).

There is no video anywhere in this build. SARVEON has no film today,
so nothing on the site depends on one existing — every slot below is a
still photograph.

## Formats

| Purpose | Accepted formats | Notes |
| --- | --- | --- |
| Photography | `.webp`, `.avif`, `.jpg`, `.jpeg`, `.png` — any is fine | `.webp` is preferred for file size, but a straight-from-camera `.jpg` works exactly the same. |
| Logo / monogram | `.svg` preferred, raster accepted | A flat, single-colour vector scales best; a PNG export works too. |

Export at roughly **2× the largest display size**, then let `next/image`
generate the responsive set. Keep individual stills under ~500 KB so the
page stays fast.

Colour: sRGB. Product shots should sit on a deep navy or a warm neutral
ivory ground so they land inside the site's palette rather than fighting it.

---

## Identity

| File | Ratio | Suggested size | Appears |
| --- | --- | --- | --- |
| `sarveon-wordmark.svg` | ~6:1 | vector | Header, footer, mobile menu. Until it exists, the wordmark is set in type. |
| `sarveon-monogram.svg` | 1:1 | vector | Reserved for future use (favicon, caseback artwork, packaging). |

## Hero

| File | Ratio | Suggested size | Appears |
| --- | --- | --- | --- |
| `passage-01-hero.webp` | 4:5 | 1600 × 2000 | Hero, right-hand side. Needs generous negative space; the watch should sit slightly right of centre. Replaces the vector rendering. |

## Product gallery — `#the-watch`

| File | Ratio | Suggested size | Appears |
| --- | --- | --- | --- |
| `passage-01-front.webp` | 4:5 | 1600 × 2000 | Gallery view 01 — dial straight on. Also used for the interactive tilt in "In the light" (`#presence`). |
| `passage-01-three-quarter.webp` | 4:5 | 1600 × 2000 | Gallery view 02 — shows the polished bevel. |
| `passage-01-side.webp` | 4:5 | 1600 × 2000 | Gallery view 03 — profile, case thickness, crown. |
| `passage-01-wrist.webp` | 4:5 | 1600 × 2000 | Gallery view 04 — on the wrist. |
| `passage-01-caseback.webp` | 4:5 | 1600 × 2000 | Gallery view 05, and the large caseback section. |

## Craft details — `#craft`

All 3:4, around 1200 × 1600. Shot as macro details on a consistent ground.

| File | Detail |
| --- | --- |
| `passage-01-detail-case.webp` | Brushed case flank and the polished bevel. |
| `passage-01-detail-dial.webp` | Navy sunray surface, raking light. |
| `passage-01-detail-indices.webp` | Applied batons, including the doubled index at twelve. |
| `passage-01-detail-hands.webp` | Faceted hands and the gold seconds hand. |
| `passage-01-detail-crystal.webp` | Sapphire edge and anti-reflective coating. |
| `passage-01-detail-crown.webp` | Signed crown. |
| `passage-01-detail-strap.webp` | Leather grain, stitching, signed buckle. |

## Movement — `#movement`

| File | Ratio | Suggested size | Appears |
| --- | --- | --- | --- |
| `passage-01-movement.webp` | 3:2 | 1800 × 1200 | Movement shown as an engineering component, on a neutral bench. |
| `passage-01-movement-drawing.webp` | 1:1 | 1400 × 1400 | Technical drawing or dimensioned diagram. |

## Story — `#story`

A small filmstrip stands in for the cinematic sequence the brand
document imagined — three quiet moments rather than a film.

| File | Ratio | Suggested size | Appears |
| --- | --- | --- | --- |
| `story-moment-dinner.webp` | 4:5 | 1200 × 1500 | Filmstrip, 1st frame — the watch at dinner. |
| `story-moment-friends.webp` | 4:5 | 1200 × 1500 | Filmstrip, 2nd frame — the watch among friends. |
| `story-moment-travel.webp` | 4:5 | 1200 × 1500 | Filmstrip, 3rd frame — the watch while travelling. |
| `story-table.webp` | 4:3 | 1800 × 1350 | Closing image, paired with the chapter's final line. A table after a long conversation. |

## Place — `#edition-context`

| File | Ratio | Suggested size | Appears |
| --- | --- | --- | --- |
| `atascadero.webp` | 16:9 | 2000 × 1125 | Atascadero, California — landscape or town. |
| `atascadero-secondary.webp` | 3:4 | 1200 × 1600 | Second, quieter frame — the local community. |

## Edition and packaging — `#edition`

| File | Ratio | Suggested size | Appears |
| --- | --- | --- | --- |
| `passage-01-packaging.webp` | 4:3 | 1800 × 1350 | Navy box, cradle, cloth, sleeve. |
| `passage-01-certificate.webp` | 4:3 | 1800 × 1350 | Certificate of provenance, serial visible. |

## Social

| File | Ratio | Suggested size | Appears |
| --- | --- | --- | --- |
| `og-image.webp` | 1200 × 630 | exact | Social sharing card. Until it exists, a card is generated from `app/opengraph-image.tsx`. |

---

## Rotary artwork — read before adding anything

No Rotary mark is drawn, approximated or reproduced anywhere in this
project. The caseback rendering leaves a circular zone deliberately
empty for that reason.

Only add official artwork here once written permission or a licence is
in hand, and only the file supplied through the proper channel — do not
redraw, restyle, simplify, or combine it with the SARVEON wordmark.
Then set, in `lib/config/product.ts`:

```ts
rotary: {
  status: "approved",
  approvedArtwork: "/media/rotary-approved-mark.svg",
  approvalReference: "<reference from the written approval>",
}
```

## A note on the vector renderings

The dial and caseback drawn in `components/media/WatchDial.tsx` and
`components/media/WatchCaseback.tsx` are design renderings built to the
published specification — not photographs of a finished watch. They
hold the layout so the site is complete today. As soon as
`passage-01-hero.webp`, `passage-01-front.webp` and
`passage-01-caseback.webp` exist, photography takes over automatically
in those places.
