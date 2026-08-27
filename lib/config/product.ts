/**
 * PRODUCT CONFIGURATION — SARVEON PASSAGE 01
 * ------------------------------------------------------------------
 * Every commercially meaningful value lives here so that price,
 * availability, approval status and specifications can be changed
 * without touching a single component.
 *
 * CLAIM DISCIPLINE
 * Each specification carries a `status`. Nothing is presented as
 * settled unless the project has actually settled it.
 *
 *   confirmed        — a decided design specification
 *   target           — a working target, not yet validated in production
 *   tbc              — to be confirmed with a supplier or test
 *   pendingApproval  — depends on a third-party approval or licence
 */

export type ClaimStatus = "confirmed" | "target" | "tbc" | "pendingApproval";

export const claimLabel: Record<ClaimStatus, string> = {
  confirmed: "",
  target: "Target",
  tbc: "To be confirmed",
  pendingApproval: "Subject to approval",
};

export type Spec = {
  label: string;
  value: string;
  /** Optional qualifier rendered in fine print beneath the value. */
  note?: string;
  status: ClaimStatus;
};

export const product = {
  name: "Passage 01",
  fullName: "SARVEON Passage 01",
  collection: "Passage",
  editionName: "Atascadero Edition",
  /** Production year printed on the caseback concept. */
  editionYear: "2026",

  /** ---- Commercial ------------------------------------------------ */
  price: 349,
  currency: "USD",
  priceLabel: "Target MSRP",
  /**
   * Fallback price under discussion if landed cost lands above the
   * planning model. Set to `null` to hide the alternative entirely.
   */
  alternatePrice: 379 as number | null,

  /**
   * "inquiry"  — no checkout; the CTA opens the enquiry form (current state)
   * "waitlist" — reserved for a future interest list
   * "sale"     — a real checkout is connected (see lib/commerce/checkout.ts)
   */
  availability: "inquiry" as "inquiry" | "waitlist" | "sale",

  /** ---- Edition --------------------------------------------------- */
  edition: {
    size: 100,
    sizeWords: "One hundred pieces",
    serialFormat: "S01-000 / 100",
    serialExample: "S01-001 / 100",
    serialRange: "S01-001 / 100 — S01-100 / 100",
    note: "Individually numbered. The edition cap is fixed; there is no second run of Passage 01.",
  },

  /** ---- Movement -------------------------------------------------- */
  movement: {
    type: "Swiss quartz",
    /**
     * The exact caliber is contracted at the supply-agreement stage.
     * Set `caliber` once it is signed; the site will print it verbatim.
     */
    caliber: null as string | null,
    caliberFamilyNote:
      "The working specification is a slim Swiss quartz caliber from the Ronda 1003 family, subject to quotation and availability.",
    status: "tbc" as ClaimStatus,
  },

  /**
   * "Swiss Made" is a protected designation with legal criteria.
   * This stays false until a manufacturer documents compliance.
   * Nothing in the UI prints the claim while this is false.
   */
  swissMadeClaim: {
    approved: false,
    statement:
      "The project is structured around Swiss movement and Swiss assembly architecture. The “Swiss Made” designation will only be used once the manufacturer documents compliance with the applicable ordinance.",
  },

  /** ---- Rotary integration ---------------------------------------- */
  rotary: {
    /** "pending" | "approved" — drives the <ApprovalStatus /> component. */
    status: "pending" as "pending" | "approved",
    clubName: "Rotary Club of Atascadero",
    placement: "Caseback only",
    pendingMessage:
      "The official mark, the edition name and the relationship wording are subject to written permission or licensing from the appropriate Rotary entity. No Rotary artwork is reproduced on this site until that approval is in hand.",
    approvedMessage:
      "Use of the official mark and the edition designation has been approved in writing. Artwork is reproduced exactly as supplied.",
    /** Set once approval exists; until then no mark is rendered anywhere. */
    approvedArtwork: null as string | null,
    approvalReference: null as string | null,
  },

  /** ---- Warranty & service ---------------------------------------- */
  service: {
    /** Set to a number of years once the service contract is agreed. */
    warrantyYears: null as number | null,
    warrantyNote:
      "Warranty length and the service route are being contracted before launch. They will be stated exactly on the certificate and in the owner booklet — not estimated here.",
    batteryNote:
      "A quartz caliber needs a battery service at intervals set by the manufacturer. The exact interval and battery life will be published once the caliber is contracted.",
    serviceRouteNote:
      "A U.S.-accessible service route is a launch requirement, together with a held reserve of movements, crowns, crystals and straps.",
  },

  /** ---- Headline specifications ----------------------------------- */
  keySpecs: [
    { label: "Diameter", value: "39.0 mm", status: "confirmed" },
    { label: "Thickness", value: "9.2 mm", note: "Including crystal", status: "target" },
    { label: "Case", value: "316L stainless steel", status: "confirmed" },
    { label: "Crystal", value: "Sapphire", note: "Inner anti-reflective coating", status: "confirmed" },
    { label: "Strap", value: "Navy full-grain leather", status: "confirmed" },
    { label: "Movement", value: "Swiss quartz", note: "Caliber confirmed at contract", status: "tbc" },
    { label: "Water resistance", value: "5 ATM", note: "50 m target, subject to pressure testing", status: "target" },
  ] as const satisfies readonly Spec[],

  /** ---- Full specification table ---------------------------------- */
  fullSpecs: [
    { group: "Case", items: [
      { label: "Material", value: "316L stainless steel", status: "confirmed" },
      { label: "Diameter", value: "39.0 mm", status: "confirmed" },
      { label: "Thickness", value: "≈ 9.2 mm", note: "Including crystal; final figure depends on movement and case architecture", status: "target" },
      { label: "Lug to lug", value: "≈ 46.6 mm", status: "target" },
      { label: "Lug width", value: "20 mm", status: "confirmed" },
      { label: "Finish", value: "Brushed case body, one polished bevel", status: "confirmed" },
      { label: "Bezel", value: "Thin fixed bezel, softly rounded", status: "confirmed" },
      { label: "Crown", value: "≈ 6.5 mm, signed, low profile", status: "confirmed" },
      { label: "Caseback", value: "Solid screw-down", status: "confirmed" },
      { label: "Water resistance", value: "5 ATM / 50 m", note: "Target rating, subject to case engineering and pressure testing", status: "target" },
    ] },
    { group: "Dial", items: [
      { label: "Colour", value: "Deep midnight navy", status: "confirmed" },
      { label: "Surface", value: "Fine sunray / radial brushed", status: "confirmed" },
      { label: "Indices", value: "Applied polished and brushed batons", status: "confirmed" },
      { label: "Minute track", value: "Fine railway ring, soft silver", status: "confirmed" },
      { label: "Hands", value: "Faceted sword / dauphine hybrid", status: "confirmed" },
      { label: "Seconds", value: "Slender hand, muted gold", status: "confirmed" },
      { label: "Date", value: "None", status: "confirmed" },
      { label: "Luminous material", value: "Optional", note: "Included only if a premium application can be delivered consistently", status: "tbc" },
    ] },
    { group: "Movement", items: [
      { label: "Type", value: "Swiss quartz, three hands", status: "confirmed" },
      { label: "Caliber", value: "To be confirmed", note: "Working specification: Ronda 1003 family, subject to quotation and availability", status: "tbc" },
      { label: "Accuracy", value: "To be confirmed", note: "Stated to the manufacturer's nominal specification once contracted", status: "tbc" },
      { label: "Battery life", value: "To be confirmed", status: "tbc" },
    ] },
    { group: "Strap", items: [
      { label: "Material", value: "Navy full-grain leather", note: "Matte top surface, tonal stitching", status: "confirmed" },
      { label: "Taper", value: "20 / 18 mm", status: "confirmed" },
      { label: "Fitting", value: "Quick-release spring bars", status: "target" },
      { label: "Buckle", value: "316L tang buckle, signed", status: "confirmed" },
    ] },
    { group: "Edition", items: [
      { label: "Edition size", value: "100 pieces", status: "confirmed" },
      { label: "Numbering", value: "S01-001 / 100 — S01-100 / 100", status: "confirmed" },
      { label: "Edition name", value: "Atascadero Edition", note: "Exact designation subject to written approval", status: "pendingApproval" },
      { label: "Origin claim", value: "Stated only once documented", note: "No origin designation is printed before compliance is established", status: "tbc" },
    ] },
  ] as const satisfies readonly { group: string; items: readonly Spec[] }[],
} as const;

/** Formats the headline price for display. */
export function formatPrice(
  value: number = product.price,
  currency: string = product.currency,
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}
