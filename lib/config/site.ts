/**
 * SITE CONFIGURATION
 * ------------------------------------------------------------------
 * Brand-level settings: identity, navigation, contact routes, SEO.
 * Edit here rather than inside components.
 */

export const site = {
  brand: "SARVEON",
  /** Recommended public pronunciation, per the brand document. */
  pronunciation: "sar-VEE-on",
  collection: "PASSAGE",
  model: "PASSAGE 01",
  tagline: "TIME. IN GOOD COMPANY.",
  shortDescription:
    "SARVEON is an independent watch maison. Passage 01 is its first timepiece — a 39 mm Swiss quartz dress-sport watch made in a first edition of one hundred numbered pieces.",

  /** Set NEXT_PUBLIC_SITE_URL in production; used for canonical + OG + sitemap. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sarveon.com",

  contact: {
    /** Displayed on the site and used as the mailto fallback for the form. */
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@sarveon.com",
    pressEmail: process.env.NEXT_PUBLIC_PRESS_EMAIL ?? "press@sarveon.com",
    serviceEmail: process.env.NEXT_PUBLIC_SERVICE_EMAIL ?? "service@sarveon.com",
    locality: "Atascadero, California",
  },

  /**
   * Social handles. Leave `href` empty to render the channel as
   * "in preparation" rather than as a broken link.
   */
  social: [
    { label: "Instagram", href: "" },
    { label: "YouTube", href: "" },
    { label: "LinkedIn", href: "" },
  ] as const satisfies readonly { label: string; href: string }[],

  /** Primary navigation. Anchors resolve to section ids on the home page. */
  nav: [
    { label: "The Watch", href: "/#the-watch" },
    { label: "Story", href: "/#story" },
    { label: "Craft", href: "/#craft" },
    { label: "Edition", href: "/#edition" },
    { label: "Service", href: "/#service" },
    { label: "Contact", href: "/#contact" },
  ] as const satisfies readonly { label: string; href: string }[],

  legal: [
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Terms", href: "/legal/terms" },
    { label: "Shipping", href: "/legal/shipping" },
    { label: "Returns", href: "/legal/returns" },
    { label: "Warranty", href: "/legal/warranty" },
  ] as const satisfies readonly { label: string; href: string }[],

  seo: {
    title: "SARVEON — Passage 01",
    titleTemplate: "%s — SARVEON",
    description:
      "SARVEON Passage 01: a 39 mm Swiss quartz dress-sport watch in 316L steel with a sapphire crystal and a deep midnight navy dial. First edition of one hundred numbered pieces. Time. In good company.",
    keywords: [
      "SARVEON",
      "Passage 01",
      "independent watch maison",
      "Swiss quartz watch",
      "39mm dress watch",
      "sapphire crystal",
      "limited edition watch",
    ],
    locale: "en_US",
  },
} as const;

export type NavItem = (typeof site.nav)[number];
