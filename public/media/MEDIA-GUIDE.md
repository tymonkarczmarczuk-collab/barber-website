# SARVEON — Media Guide

Everything visual on the site is declared once in `lib/config/media.ts`.
Drop a file into this folder with the exact filename below and it
appears automatically — no code change, no import, no re-wiring.

## How it works

1. Export the file with the **exact filename** from the tables below.
2. Put it in `/public/media/`.
3. Restart `npm run dev` (or rebuild for production).

The site scans this folder at render time. A file that is present is
rendered through `next/image` (or `<video>`); a file that is absent
falls back to a designed placeholder in the same frame — same size,
same rhythm, no layout shift and no broken image requests. You can
therefore ship the site today and fill it in as photography arrives.

**Renaming a file is the only thing that breaks this.** If you need a
different name, change the `src` in `lib/config/media.ts` to match.

## Formats

| Purpose | Format | Notes |
| --- | --- | --- |
| Photography | `.webp` | AVIF is also served automatically by `next/image`. |
| Film | `.mp4` (H.264, AAC or silent) | Add a matching `-poster.webp` still. |
| Logo / monogram | `.svg` | Flat, single colour, no embedded raster. |

Export at roughly **2× the largest display size**, then let `next/image`
generate the responsive set. Keep individual stills under ~500 KB and
hero film under ~6 MB; the film is lazy-loaded and pauses off screen,
but it should never be the reason a page feels slow.

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
| `hero-film.mp4` | 16:9 | 1920 × 1080 | Optional background film behind the hero. Muted, looped, plays inline. |
| `hero-film-poster.webp` | 16:9 | 1920 × 1080 | Still shown before the film loads, and instead of it under reduced motion. |

## Product gallery — `#the-watch`

| File | Ratio | Suggested size | Appears |
| --- | --- | --- | --- |
| `passage-01-front.webp` | 4:5 | 1600 × 2000 | Gallery view 01 — dial straight on. |
| `passage-01-three-quarter.webp` | 4:5 | 1600 × 2000 | Gallery view 02 — shows the polished bevel. |
| `passage-01-side.webp` | 4:5 | 1600 × 2000 | Gallery view 03 — profile, case thickness, crown. |
| `passage-01-caseback.webp` | 4:5 | 1600 × 2000 | Gallery view 04, and the large caseback section. |
| `passage-01-wrist.webp` | 4:5 | 1600 × 2000 | Reserved for a wrist shot. |

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

## Story and place — `#story`, `#edition-context`

| File | Ratio | Suggested size | Appears |
| --- | --- | --- | --- |
| `story-film.mp4` | 16:9 | 1920 × 1080 | The main film in the story chapter. |
| `story-film-poster.webp` | 16:9 | 1920 × 1080 | Poster still for the above. |
| `story-clip-hands.mp4` | 1:1 | 1080 × 1080 | Short square clip — hands crossing the dial. |
| `story-clip-hands-poster.webp` | 1:1 | 1080 × 1080 | Poster still for the above. |
| `story-table.webp` | 4:3 | 1800 × 1350 | A table after a long conversation. People optional; no stock-photo poses. |
| `atascadero.webp` | 16:9 | 2000 × 1125 | Atascadero, California — landscape or town. |
| `atascadero-secondary.webp` | 3:4 | 1200 × 1600 | Second, quieter frame of the same place. |

## Edition and packaging — `#edition`

| File | Ratio | Suggested size | Appears |
| --- | --- | --- | --- |
| `passage-01-packaging.webp` | 4:3 | 1800 × 1350 | Navy box, cradle, cloth, sleeve. |
| `passage-01-certificate.webp` | 4:3 | 1800 × 1350 | Certificate of provenance, serial visible. |

## Campaign and social

| File | Ratio | Suggested size | Appears |
| --- | --- | --- | --- |
| `campaign-01.webp` | 4:5 | 1600 × 2000 | Used in the interactive "In the light" section when present. |
| `campaign-02.webp` | 4:5 | 1600 × 2000 | Held for campaign layouts. |
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
