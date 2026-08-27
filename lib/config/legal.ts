/**
 * LEGAL PAGES
 * ------------------------------------------------------------------
 * Working drafts. They describe how SARVEON intends to operate and
 * give the structure a launch needs, but they are not a substitute
 * for review by a qualified professional in the relevant markets.
 * Each page carries that notice openly rather than presenting
 * unreviewed text as binding terms.
 *
 * Replace the body copy with reviewed wording before taking money,
 * and set `status` to "published" with a real `updated` date.
 */

import { site } from "@/lib/config/site";
import { product } from "@/lib/config/product";

export type LegalSection = { heading: string; body: string[] };

export type LegalPage = {
  slug: string;
  title: string;
  intro: string;
  status: "draft" | "published";
  updated: string | null;
  sections: LegalSection[];
};

const draftNotice = null;

export const legalPages: Record<string, LegalPage> = {
  privacy: {
    slug: "privacy",
    title: "Privacy Policy",
    status: "draft",
    updated: draftNotice,
    intro:
      "SARVEON collects as little as possible and keeps it for as long as it is useful to you. This page describes what happens to the information you send us.",
    sections: [
      {
        heading: "What we collect",
        body: [
          "If you use the enquiry form, we receive your first and last name, your email address, an optional phone number, the subject you selected and the message you wrote. Nothing else is requested and nothing else is required.",
          "Standard server logs may record the IP address a request came from, in order to apply rate limiting and to keep the site available. These are operational records, not a profile.",
        ],
      },
      {
        heading: "Why we hold it",
        body: [
          "To answer you. Enquiries are read and replied to personally.",
          "If Passage 01 becomes available to buy, we may contact you about it — but only if you have asked us to. We do not add enquiries to a marketing list automatically and we do not run automated email sequences.",
        ],
      },
      {
        heading: "Who else sees it",
        body: [
          "The mail or form provider configured to deliver the message, and the hosting provider that serves this site. No enquiry data is sold, rented or shared for advertising.",
          "Named processors will be listed here once the launch stack is fixed.",
        ],
      },
      {
        heading: "How long we keep it",
        body: [
          "Enquiries are kept while the conversation is live and for a reasonable period afterwards, so we can pick up a thread you started. You can ask us to delete yours at any time.",
        ],
      },
      {
        heading: "Analytics and cookies",
        body: [
          "This site sets no advertising cookies and runs no third-party tracking. If analytics are added, this page will name the tool and describe what it measures before it is switched on.",
        ],
      },
      {
        heading: "Your choices",
        body: [
          `Write to ${site.contact.email} to ask what we hold, to correct it, or to have it deleted. Depending on where you live you may have additional statutory rights, and we will honour them.`,
        ],
      },
    ],
  },

  terms: {
    slug: "terms",
    title: "Terms",
    status: "draft",
    updated: draftNotice,
    intro:
      "These terms cover use of this website. Terms of sale will be published separately, and agreed at the point of purchase, before any order can be placed.",
    sections: [
      {
        heading: "About this site",
        body: [
          `This site presents ${product.fullName}, a watch in development by ${site.brand}. It is informational. Nothing on it constitutes an offer to sell, and submitting an enquiry does not create an order or reserve a piece.`,
        ],
      },
      {
        heading: "Accuracy of what is shown",
        body: [
          "Dimensions, water resistance, movement caliber, warranty terms and pricing are working targets and are marked as such throughout. They may change as quotations, engineering and testing progress.",
          "Product visuals are design renderings, not photographs of a finished watch. Final proportions, finishing and colour will be confirmed against a physical prototype.",
        ],
      },
      {
        heading: "Trade marks",
        body: [
          `${site.brand} and Passage are used as brand and model names by ${site.brand}. Other names and marks referred to on this site belong to their respective owners.`,
          `Any edition designation involving a third-party organisation is subject to that organisation's written permission or licensing, and is described on this site as pending until such permission exists.`,
        ],
      },
      {
        heading: "Origin claims",
        body: [
          "“Swiss Made” is a protected designation with defined legal criteria. It is not used as a final claim anywhere on this site, on the product, or in packaging until the manufacturer documents compliance in writing.",
        ],
      },
      {
        heading: "Liability",
        body: [
          "This site is provided as it is. We keep it accurate and available as best we can, but we do not warrant that it is free of error or uninterrupted.",
        ],
      },
      {
        heading: "Governing law",
        body: [
          "To be confirmed with counsel before any sale, together with the terms of sale, and stated here.",
        ],
      },
    ],
  },

  shipping: {
    slug: "shipping",
    title: "Shipping",
    status: "draft",
    updated: draftNotice,
    intro:
      "Passage 01 is not yet on sale, so no shipping is taking place. This page sets out the intended approach, and will state exact carriers, costs and timings before the first piece ships.",
    sections: [
      {
        heading: "Where we intend to ship",
        body: [
          "The first edition is a local project, so initial fulfilment is expected to be within the United States, with hand delivery available where practical. Wider shipping will be confirmed alongside the sale terms.",
        ],
      },
      {
        heading: "How it will be sent",
        body: [
          "Insured and tracked, with a signature on delivery. A watch should not be left on a doorstep.",
          "Each piece ships in its presentation packaging with the certificate of provenance matched to the serial engraved on that specific watch.",
        ],
      },
      {
        heading: "Timing",
        body: [
          "Production lead time for a small Swiss run is measured in months, not days, and depends on component lead times. Anyone who orders will be given the schedule in writing, and told promptly if it moves.",
        ],
      },
      {
        heading: "Duties and taxes",
        body: [
          "Where applicable, sales tax, duties and import charges will be shown clearly before payment rather than added afterwards.",
        ],
      },
    ],
  },

  returns: {
    slug: "returns",
    title: "Returns",
    status: "draft",
    updated: draftNotice,
    intro:
      "No sales have been made, so no returns policy is yet in force. The policy below is the intended standard and will be finalised, in writing, before any money changes hands.",
    sections: [
      {
        heading: "The intention",
        body: [
          "A watch needs to be tried on. Anyone buying Passage 01 should have a fair, clearly stated window in which to return an unworn watch in its original packaging for a refund.",
          "The exact window, condition requirements and refund method will be published here and included in the terms of sale before ordering opens.",
        ],
      },
      {
        heading: "What will not be refundable",
        body: [
          "Any personalisation, if it is ever offered, and shipping charges already incurred — both stated plainly in advance rather than discovered afterwards.",
        ],
      },
      {
        heading: "Faults",
        body: [
          "A manufacturing fault is not a return; it is a warranty matter, and it is handled under the warranty rather than under this policy.",
        ],
      },
    ],
  },

  warranty: {
    slug: "warranty",
    title: "Warranty",
    status: "draft",
    updated: draftNotice,
    intro:
      "The warranty length and service route are being contracted with the manufacturer. They will be stated exactly here, on the certificate of provenance and in the owner booklet — and not estimated before then.",
    sections: [
      {
        heading: "What is being contracted",
        body: [
          "Cover against manufacturing defects for a defined period, a documented repair and replacement path, and a service route accessible to owners in the United States.",
          "A reserve of movements, crowns, crystals and straps is held from the start of the edition so that a repair does not depend on a supplier's current catalogue years later.",
        ],
      },
      {
        heading: "What a warranty will not cover",
        body: [
          "Normal wear, accidental damage, unauthorised repair, and the leather strap as a consumable part. These exclusions are standard and will be stated in full rather than buried.",
        ],
      },
      {
        heading: "Battery and routine service",
        body: [
          "A quartz caliber needs a battery service at the interval its manufacturer specifies. That interval, the expected battery life and how to arrange the service will be published with the confirmed caliber.",
        ],
      },
      {
        heading: "Water resistance",
        body: [
          "The target is 5 ATM, subject to case engineering and pressure testing. Water resistance is not permanent: gaskets age, and a rating is only valid while the case is intact and correctly closed. The certificate will state the rating each watch was actually tested to.",
        ],
      },
      {
        heading: "How to reach us",
        body: [
          `Service enquiries: ${site.contact.serviceEmail}. Every enquiry is answered by a person.`,
        ],
      },
    ],
  },
};

export const legalSlugs = Object.keys(legalPages);
