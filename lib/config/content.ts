/**
 * SITE COPY
 * ------------------------------------------------------------------
 * All customer-facing text lives here so it can be edited — or later
 * moved into a CMS — without touching components.
 *
 * VOICE: calm, precise, human. Claims are limited to what the project
 * can actually evidence; anything unsettled is labelled as a target,
 * as to be confirmed, or as subject to approval.
 */

import { product } from "@/lib/config/product";
import type { AccordionItem } from "@/components/ui/Accordion";

export const content = {
  hero: {
    eyebrow: "Independent watch maison",
    brand: "SARVEON",
    model: "Passage 01",
    line: "Time. In good company.",
    lede: "A 39 mm Swiss quartz dress-sport watch in 316L steel, with a sapphire crystal over a deep midnight navy dial. Made in a first edition of one hundred numbered pieces.",
    primaryCta: "Discover Passage 01",
    secondaryCta: "Request details",
    scrollHint: "Scroll",
  },

  philosophy: {
    eyebrow: "Philosophy",
    index: "01",
    statement: "A watch is a small object. The time it measures is not.",
    paragraphs: [
      "Time is happening whether we acknowledge it or not. A watch is an unusually literal object because its hands keep moving even when no one is looking. It does not flatter anyone. It does not care what kind of day it has been. It simply moves.",
      "That is the whole idea behind SARVEON. Not a speech about how short life is — a quieter observation about attention. Decades can feel surprisingly brief in hindsight. Relationships are accumulated one hour at a time. What a life becomes is mostly a question of how those hours were spent.",
      "So we make fewer things, make them carefully, and give the object a reason to exist. A watch cannot stop time. It can remind you that the next hour is yours to use.",
    ],
    pullQuote: "We cannot control how quickly time passes. We can choose what we do with it.",
  },

  story: {
    eyebrow: "Story",
    index: "02",
    title: "Time",
    lede: "SARVEON began with a question: what if a watch could remind us not only what time it is, but what we choose to do with it?",
    columns: [
      {
        title: "A young maison, honestly",
        body: "SARVEON is new. There is no old Swiss dynasty behind the name and we will not invent one. The advantage of starting now is that every decision can be made carefully and in the open, rather than inherited and defended.",
      },
      {
        title: "Where the first watch came from",
        body: "The first SARVEON project grew out of a community where time already carries meaning: Rotary. Members give their hours to service, to friendships, to leadership, and to the places they call home. That made the first watch less about branding and more about recognition.",
      },
    ],
    closing: "Time passes. Good company gives it meaning.",
  },

  watch: {
    eyebrow: "The watch",
    index: "03",
    title: "Passage 01",
    lede: "Passage can mean movement, a journey, a stretch of time, or the way one part of life becomes another. The watch is intentionally restrained: it should still look good with the story removed.",
    views: [
      {
        key: "front",
        label: "Front",
        title: "The dial",
        body: "A deep midnight navy surface with a very fine sunray texture. Applied polished batons, a fine railway minute track in soft silver, and no date — nothing on the dial that does not need to be there.",
      },
      {
        key: "threeQuarter",
        label: "Three quarter",
        title: "The bevel",
        body: "The case body is brushed so that it never reads as jewellery. One controlled polished bevel runs along each lug — enough to catch the light, not enough to shout.",
      },
      {
        key: "side",
        label: "Profile",
        title: "The proportion",
        body: "Thirty-nine millimetres across and around 9.2 mm deep, with a short lug span. The intent is refinement rather than size: it should wear closer to a 38 mm dress-sport watch than to a modern sports watch.",
      },
      {
        key: "wrist",
        label: "On the wrist",
        title: "On the wrist",
        body: "The test that matters most: how it actually sits. A short lug-to-lug and a case held close to the wrist, worn under a cuff or on its own.",
      },
      {
        key: "caseback",
        label: "Caseback",
        title: "The reverse",
        body: "A solid screw-down back with a fine radial finish. This is where provenance lives — model, edition, serial and a single line — rather than a second billboard for the brand.",
      },
    ],
  },

  specifications: {
    eyebrow: "Specifications",
    index: "04",
    title: "Stated plainly",
    lede: "Short specifications, not marketing adjectives. Where a figure is still a target or awaiting confirmation, it says so.",
  },

  presence: {
    eyebrow: "Presence",
    index: "05",
    title: "In the light",
    lede: "Move your cursor across the watch. The case is designed around how it behaves when the light moves — a brushed plane that stays quiet, and one polished line that does not.",
    hintDesktop: "Move to look around",
    hintTouch: "Tilt is shown on larger screens",
  },

  craft: {
    eyebrow: "Craft",
    index: "06",
    title: "Built with intention",
    lede: "The watch earns its price through proportion, materials, finishing and execution. Here is what that means, part by part.",
    steps: [
      {
        key: "case",
        step: "Case",
        title: "316L stainless steel",
        body: "A round case with a stepped underlug profile: brushed body, one polished bevel, no crown guards, no dive-watch geometry. The flank is kept clean and almost architectural.",
        mediaKey: "detailCase",
      },
      {
        key: "dial",
        step: "Dial",
        title: "Deep midnight navy",
        body: "A fine sunray or radial-brushed surface rather than an aggressive gradient. Controlled, design-literate, and legible at a glance in ordinary light.",
        mediaKey: "detailDial",
      },
      {
        key: "indices",
        step: "Indices",
        title: "Applied batons",
        body: "Polished and brushed facets, applied rather than printed, with no visible adhesive and no misalignment. A doubled baton marks twelve.",
        mediaKey: "detailIndices",
      },
      {
        key: "hands",
        step: "Hands",
        title: "Faceted, and one accent",
        body: "A sword and dauphine hybrid in warm silver for the hours and minutes. The seconds hand is slender and muted gold — the only accent colour on the watch.",
        mediaKey: "detailHands",
      },
      {
        key: "crystal",
        step: "Crystal",
        title: "Sapphire",
        body: "Flat or very shallow double-domed sapphire with an inner anti-reflective coating. A durability upgrade that is immediately understandable, and immediately visible.",
        mediaKey: "detailCrystal",
      },
      {
        key: "crown",
        step: "Crown",
        title: "Signed, not oversized",
        body: "Around 6.5 mm, low profile, signed SARVEON. It should look like a watchmaking detail rather than a place to put a logo.",
        mediaKey: "detailCrown",
      },
      {
        key: "strap",
        step: "Strap",
        title: "Navy full-grain leather",
        body: "Matte top surface, tonal stitching, a 20 to 18 mm taper and a signed 316L tang buckle. Quick-release spring bars are specified for the owner's convenience.",
        mediaKey: "detailStrap",
      },
    ],
  },

  movement: {
    eyebrow: "Movement",
    index: "07",
    title: "The movement",
    lede: "Passage 01 uses a slim Swiss quartz movement. That is a decision, not a compromise made quietly.",
    paragraphs: [
      "The first edition optimises reliability, thinness, serviceability and honest economics. Adding “automatic” to a dial because the word sells watches would have made this watch thicker, more expensive and harder to service, without making it better for the person wearing it.",
      "The working specification is a slim Swiss quartz caliber from the Ronda 1003 family, subject to quotation and availability. The exact caliber will be named — in the owner booklet, on the certificate and here — once it is contracted. Until then it stays unnamed rather than approximated.",
    ],
    disciplineTitle: "What we will not say",
    disciplineBody:
      "Not “Swiss mechanical”. Not “in-house”. Not “manufacture”. The booklet will read “Swiss quartz movement” and give the real caliber. A future SARVEON can be mechanical when the brand can support it properly.",
  },

  rotary: {
    eyebrow: "The edition",
    index: "08",
    title: "A local chapter",
    lede: "The first SARVEON edition was designed for a community in Atascadero, California — a place where time is already given away deliberately, in service, in fellowship and in showing up.",
    paragraphs: [
      "The connection is intentionally quiet. The dial stays SARVEON. Any official mark belongs on the reverse, at the size and in the form its owner approves, and nowhere else.",
      "That restraint is the point. This should be a watch first, and a piece of provenance second — something that still works if the local story is removed entirely.",
    ],
    approvalTitle: "Approval status",
  },

  caseback: {
    eyebrow: "Provenance",
    index: "09",
    title: "The reverse",
    lede: "The caseback carries the record: the maison, the model, the edition, the number of the piece, and one line.",
    layers: [
      { label: "Top arc", value: "SARVEON" },
      { label: "Centre", value: "Approved mark placement — reserved" },
      { label: "Model", value: "PASSAGE 01" },
      { label: "Lower arc", value: `${product.editionName.toUpperCase()} · ${product.editionYear}` },
      { label: "Serial", value: product.edition.serialRange },
      { label: "Line", value: "TIME. IN GOOD COMPANY." },
    ],
    note: "Layout concept. The centre zone is reserved for official artwork supplied through the appropriate channel; nothing is drawn there until permission exists. The origin designation is engraved only once compliance is documented.",
  },

  edition: {
    eyebrow: "Edition",
    index: "10",
    title: "One hundred pieces",
    lede: "Large enough for the development to make sense. Small enough to remain what it is.",
    numberingTitle: "Individually numbered",
    numberingBody:
      "Each piece carries its own number on the caseback and on a matching certificate of provenance. S01 identifies the first SARVEON series, leaving room for what follows.",
    closing:
      "There is no second run of Passage 01. The cap is fixed at one hundred, and it will not be quietly extended if the edition sells.",
  },

  price: {
    eyebrow: "Price",
    index: "11",
    title: "What it costs, and why",
    lede: "The price is built around sapphire, steel, Swiss assembly and quality control, a premium strap, packaging, a warranty reserve and small-run economics. It is designed to be fair, not to imitate a luxury markup.",
    reasons: [
      { label: "Materials", body: "316L steel, sapphire crystal, full-grain leather." },
      { label: "Production", body: "Swiss assembly and quality control at a hundred pieces, where every component costs more." },
      { label: "After the sale", body: "A warranty reserve and a service route held from the start, not added later." },
    ],
    honesty:
      "No crossed-out price. No invented original. A serious watch at a fair price is the whole proposition — this is not a $10,000 watch and it does not pretend to be.",
  },

  service: {
    eyebrow: "Service",
    index: "12",
    title: "After the sale",
    lede: "A watch that cannot be serviced is a disposable object. These are the commitments being contracted before the first piece ships.",
    items: [
      {
        title: "Warranty",
        body: "A defined warranty against manufacturing defects, with its exact length, cover and exclusions printed on the certificate and in the owner booklet.",
        status: "To be confirmed",
      },
      {
        title: "Battery",
        body: "A quartz caliber needs a battery service at the interval its manufacturer sets. The interval and expected battery life will be published with the caliber.",
        status: "To be confirmed",
      },
      {
        title: "Repair route",
        body: "A U.S.-accessible service path is a launch requirement, alongside a held reserve of movements, crowns, crystals and straps.",
        status: "Planned",
      },
      {
        title: "Care",
        body: "Guidance on magnetism, water exposure, crown position, leather care and cleaning ships with the watch and will be published here.",
        status: "Planned",
      },
    ],
    contactPrompt: "Questions about service or an existing enquiry?",
  },

  faq: {
    eyebrow: "Questions",
    index: "13",
    title: "Asked and answered",
    lede: "Plain answers, including where the honest answer is “not yet decided”.",
  },

  contact: {
    eyebrow: "Contact",
    index: "14",
    title: "Request details",
    lede: "Tell us what you would like to know. Specifications, the edition, service, or the project itself — we will reply personally. There is no list you are joining by accident and no sequence of reminder emails.",
    consentLabel: "I agree that SARVEON may store this message and reply to it.",
    consentLinkLabel: "See the privacy policy",
    submitLabel: "Request details",
    successTitle: "Thank you",
    successBody: "Your message has arrived. We reply personally, usually within a couple of days.",
    errorTitle: "That did not send",
  },

  footerLine: "Time. In good company.",
} as const;

/** FAQ — every answer traceable to the project document. */
export const faq: AccordionItem[] = [
  {
    question: "Why quartz?",
    answer:
      "Because reliability, thinness and cost discipline matter more here than putting the word “automatic” on a dial. A slim Swiss quartz caliber keeps the case around 9.2 mm, keeps the watch accurate without attention, and keeps the price honest. A mechanical SARVEON can follow when the brand can support one properly.",
  },
  {
    question: "What movement is inside?",
    answer:
      "A slim Swiss quartz caliber. The working specification is the Ronda 1003 family, subject to quotation and availability, and the exact caliber is fixed in the supply agreement.",
    note: "We will print the real caliber rather than a vague “Swiss movement” statement — which is why it is not named here yet.",
  },
  {
    question: "Is it Swiss Made?",
    answer:
      "“Swiss Made” is a protected designation with legal criteria: the movement must be Swiss, the watch must be cased up in Switzerland, final inspection must take place there, and a defined share of the manufacturing cost must be generated in Switzerland. The project is structured around Swiss movement and Swiss assembly architecture with that objective.",
    note: "The designation will not appear on the dial, the packaging or this site until the manufacturer documents compliance in writing.",
  },
  {
    question: "Why sapphire?",
    answer:
      "Because it is a durability upgrade you can understand immediately and notice for years. The specification is a flat or very shallow double-domed sapphire with an inner anti-reflective coating, so the dial stays legible rather than mirrored.",
  },
  {
    question: "What is the edition size?",
    answer:
      "One hundred pieces, individually numbered from S01-001 / 100 to S01-100 / 100. One hundred is large enough to amortise the development and small enough for the edition to mean something. The cap is fixed.",
  },
  {
    question: "Is Rotary officially involved?",
    answer:
      "Only to the extent that is documented. Rotary marks are protected, and merchandise carrying them normally comes through licensed vendors or a specific written permission. The edition name and any official mark will not be presented as approved until that permission is in hand.",
    note: "Until then, no Rotary artwork is reproduced anywhere on this site, on the watch, or in the packaging.",
  },
  {
    question: "What is the water resistance?",
    answer:
      "The target is 5 ATM — 50 metres — subject to case engineering and pressure testing. This is a dress-sport watch: rain, hand-washing and an unexpected shower, not diving.",
    note: "The certificate will state only the rating the finished watch is actually tested to.",
  },
  {
    question: "How does service work?",
    answer:
      "A defined warranty, a U.S.-accessible service route where possible, and a documented repair and replacement policy are launch requirements, together with a held reserve of movements, crowns, crystals and straps.",
    note: "Exact warranty length and service terms are being contracted and will be published before the first piece ships, not estimated in advance.",
  },
  {
    question: "Can I purchase one?",
    answer:
      "Not yet. Passage 01 is at the stage of confirmed design, supplier quotation and approval, so today you can register interest and ask questions. If you would rather not buy it, please do not — that has always been part of how this project is presented.",
  },
  {
    question: "What happens after Passage 01?",
    answer:
      "SARVEON continues with models that stand entirely on their own. Passage is the core line; other chapters are sketched but deliberately not launched at once. The first edition is a chapter, not the whole brand.",
  },
  {
    question: "Is SARVEON an established Swiss brand?",
    answer:
      "No. SARVEON is a new maison, and inventing a heritage would contradict the point of the watch. The advantage of being new is that every decision — proportions, materials, suppliers, claims — can be made carefully and shown openly.",
  },
  {
    question: "Why 39 mm, and why leather rather than a bracelet?",
    answer:
      "Thirty-nine millimetres with a short lug span reads as refinement rather than size, and suits a wide range of wrists. Navy full-grain leather keeps the watch lighter and more elegant, and leaves a bracelet possible later without burdening the first edition with options.",
  },
];
