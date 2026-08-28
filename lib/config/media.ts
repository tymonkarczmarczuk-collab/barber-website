/**
 * MEDIA CONFIGURATION
 * ------------------------------------------------------------------
 * Every image on the site is declared here once. There is no video
 * anywhere in this build — SARVEON has no film today, so no video
 * plumbing is kept lying around waiting for one.
 *
 * HOW TO ADD REAL MEDIA
 *   1. Export the file with the exact filename listed in `src`.
 *   2. Drop it into /public/media/.
 *   3. Restart `npm run dev` (or rebuild).
 *
 * The site checks which of these files actually exist on disk at
 * render time (see lib/media/manifest.ts). Missing files fall back to
 * a designed placeholder — never a broken image, never a layout shift.
 *
 * See public/media/MEDIA-GUIDE.md for crops, resolutions and formats.
 */

/** Vector motif drawn faintly behind a placeholder so it still reads as design. */
export type Motif = "dial" | "caseback" | "case" | "strap" | "movement" | "horizon" | "none";

export type MediaAsset = {
  /** Public path. Leave as-is; just drop the matching file into /public/media. */
  src: string;
  /** Meaningful alternative text — required for accessibility. */
  alt: string;
  /** Placeholder line 1, e.g. "PASSAGE 01". */
  label: string;
  /** Placeholder line 2, e.g. "HERO IMAGE". */
  caption: string;
  /** CSS aspect-ratio for the frame; keeps layout stable with or without the file. */
  aspect: string;
  motif?: Motif;
};

export const media = {
  /* --- Identity -------------------------------------------------- */
  logo: {
    src: "/media/sarveon-wordmark.svg",
    alt: "SARVEON",
    label: "SARVEON",
    caption: "Wordmark",
    aspect: "6 / 1",
    motif: "none",
  },
  monogram: {
    src: "/media/sarveon-monogram.svg",
    alt: "SARVEON monogram",
    label: "SARVEON",
    caption: "Monogram",
    aspect: "1 / 1",
    motif: "none",
  },

  /* --- Hero ------------------------------------------------------- */
  heroWatch: {
    src: "/media/passage-01-hero.webp",
    alt: "SARVEON Passage 01 — navy dial, steel case, three-quarter hero view",
    label: "Passage 01",
    caption: "Hero image",
    aspect: "4 / 5",
    motif: "dial",
  },
  /* --- Product gallery -------------------------------------------- */
  watchFront: {
    src: "/media/passage-01-front.webp",
    alt: "Passage 01 dial, seen straight on",
    label: "Passage 01",
    caption: "Front",
    aspect: "4 / 5",
    motif: "dial",
  },
  watchThreeQuarter: {
    src: "/media/passage-01-three-quarter.webp",
    alt: "Passage 01 at three quarters, showing the polished bevel",
    label: "Passage 01",
    caption: "Three quarter",
    aspect: "4 / 5",
    motif: "case",
  },
  watchSide: {
    src: "/media/passage-01-side.webp",
    alt: "Passage 01 side profile, showing case thickness and crown",
    label: "Passage 01",
    caption: "Side profile",
    aspect: "4 / 5",
    motif: "case",
  },
  watchCaseback: {
    src: "/media/passage-01-caseback.webp",
    alt: "Passage 01 caseback with edition engraving",
    label: "Passage 01",
    caption: "Caseback",
    aspect: "4 / 5",
    motif: "caseback",
  },
  watchWrist: {
    src: "/media/passage-01-wrist.webp",
    alt: "Passage 01 worn on the wrist",
    label: "Passage 01",
    caption: "On the wrist",
    aspect: "4 / 5",
    motif: "case",
  },

  /* --- Craft details ---------------------------------------------- */
  detailCase: {
    src: "/media/passage-01-detail-case.webp",
    alt: "Macro detail of the brushed case flank and polished bevel",
    label: "Detail",
    caption: "Case & bevel",
    aspect: "3 / 4",
    motif: "case",
  },
  detailDial: {
    src: "/media/passage-01-detail-dial.webp",
    alt: "Macro detail of the navy sunray dial and applied indices",
    label: "Detail",
    caption: "Dial & indices",
    aspect: "3 / 4",
    motif: "dial",
  },
  detailIndices: {
    src: "/media/passage-01-detail-indices.webp",
    alt: "Macro detail of the applied baton indices",
    label: "Detail",
    caption: "Applied indices",
    aspect: "3 / 4",
    motif: "dial",
  },
  detailHands: {
    src: "/media/passage-01-detail-hands.webp",
    alt: "Macro detail of the faceted hands and gold seconds hand",
    label: "Detail",
    caption: "Hands",
    aspect: "3 / 4",
    motif: "dial",
  },
  detailCrystal: {
    src: "/media/passage-01-detail-crystal.webp",
    alt: "Macro detail of the sapphire crystal edge",
    label: "Detail",
    caption: "Sapphire",
    aspect: "3 / 4",
    motif: "case",
  },
  detailCrown: {
    src: "/media/passage-01-detail-crown.webp",
    alt: "Macro detail of the signed crown",
    label: "Detail",
    caption: "Crown",
    aspect: "3 / 4",
    motif: "case",
  },
  detailStrap: {
    src: "/media/passage-01-detail-strap.webp",
    alt: "Macro detail of the navy full-grain leather strap and signed buckle",
    label: "Detail",
    caption: "Strap & buckle",
    aspect: "3 / 4",
    motif: "strap",
  },

  /* --- Movement ---------------------------------------------------- */
  movement: {
    src: "/media/passage-01-movement.webp",
    alt: "The slim Swiss quartz movement, shown as an engineering component",
    label: "Movement",
    caption: "Swiss quartz",
    aspect: "3 / 2",
    motif: "movement",
  },
  movementDrawing: {
    src: "/media/passage-01-movement-drawing.webp",
    alt: "Technical drawing of the movement",
    label: "Movement",
    caption: "Technical drawing",
    aspect: "1 / 1",
    motif: "movement",
  },

  /* --- Story & place ------------------------------------------------ */
  storyMomentDinner: {
    src: "/media/story-moment-dinner.webp",
    alt: "Passage 01 on the wrist at dinner",
    label: "Story",
    caption: "Dinner",
    aspect: "4 / 5",
    motif: "case",
  },
  storyMomentFriends: {
    src: "/media/story-moment-friends.webp",
    alt: "Passage 01 on a table among friends",
    label: "Story",
    caption: "Friends",
    aspect: "4 / 5",
    motif: "case",
  },
  storyMomentTravel: {
    src: "/media/story-moment-travel.webp",
    alt: "Passage 01 on the wrist while travelling",
    label: "Story",
    caption: "Travel",
    aspect: "4 / 5",
    motif: "case",
  },
  storyTable: {
    src: "/media/story-table.webp",
    alt: "A table after a long conversation",
    label: "Story",
    caption: "In good company",
    aspect: "4 / 3",
    motif: "horizon",
  },
  atascadero: {
    src: "/media/atascadero.webp",
    alt: "Atascadero, California",
    label: "Atascadero",
    caption: "California",
    aspect: "16 / 9",
    motif: "horizon",
  },
  atascaderoSecondary: {
    src: "/media/atascadero-secondary.webp",
    alt: "Oak country light near Atascadero",
    label: "Atascadero",
    caption: "Oak country",
    aspect: "3 / 4",
    motif: "horizon",
  },

  /* --- Packaging ---------------------------------------------------- */
  packaging: {
    src: "/media/passage-01-packaging.webp",
    alt: "Passage 01 in its navy presentation box with certificate and booklet",
    label: "Packaging",
    caption: "Presentation",
    aspect: "4 / 3",
    motif: "none",
  },
  certificate: {
    src: "/media/passage-01-certificate.webp",
    alt: "Certificate of provenance",
    label: "Certificate",
    caption: "Provenance",
    aspect: "4 / 3",
    motif: "none",
  },

  /* --- Social sharing ------------------------------------------------ */
  ogImage: {
    src: "/media/og-image.webp",
    alt: "SARVEON Passage 01",
    label: "SARVEON",
    caption: "Open Graph",
    aspect: "1200 / 630",
    motif: "dial",
  },
} as const satisfies Record<string, MediaAsset>;

export type MediaKey = keyof typeof media;

/** Every declared public path, used by the on-disk existence scan. */
export const mediaPaths: string[] = Array.from(new Set(Object.values(media).map((asset) => asset.src)));
