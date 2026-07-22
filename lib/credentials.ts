/**
 * Credentials — "cleared to work with government".
 *
 * ==========================================================================
 * BINDING RULE FOR THIS FILE
 * Every entry must be a CURRENTLY-HELD, VERIFIABLE certification or status.
 * Nothing aspirational, nothing "in progress", nothing implied. If a
 * certification lapses, DELETE THE ENTRY — it is a one-line removal and the
 * layout absorbs it. Never name a third-party auditor/provider (platform §4.6).
 * Confirmed held and current by Kagiso, 2026-07-12.
 * ==========================================================================
 *
 * Treatment (build-spec, art-direction): NOT a badge/logo wall — that is what
 * every mediocre vendor does. This renders as a composed, monumental,
 * typographic band. B-BBEE Level 1 is the hero of the group: for a public-
 * sector buyer it is the one credential that moves their procurement scorecard.
 */

export type Credential = {
  id: string;
  /** The short form the buyer scans for. */
  name: string;
  /** The monumental value/level, if the credential has one. */
  value?: string;
  /** What it actually means for THIS buyer — plain, no jargon. */
  plain: string;
  /** Which buyer question it answers. */
  answers: "data" | "procurement" | "quality";
  /** Hero = the one that leads the group. Exactly one should be true. */
  hero?: boolean;
};

export const CREDENTIALS: Credential[] = [
  {
    id: "bbbee",
    name: "B-BBEE",
    value: "Level 1",
    plain:
      "The highest contributor level there is. What you spend with us counts for the most it possibly can on your own scorecard — it works for you, not just for us.",
    answers: "procurement",
    hero: true,
  },
  {
    id: "iso27001",
    name: "ISO 27001",
    value: "Certified",
    plain:
      "Independently audited information security management. Your learners', staff and institutional data is handled under a system that someone else checks.",
    answers: "data",
  },
  {
    id: "soc2",
    name: "SOC 2",
    value: "Audited",
    plain:
      "An external audit of how we actually control security and access day to day — not a policy document, a tested practice.",
    answers: "data",
  },
  {
    id: "iso9001",
    name: "ISO 9001",
    value: "Certified",
    plain:
      "Audited quality management. The way we deliver and keep things working is a defined system, not one person's memory.",
    answers: "quality",
  },
  {
    id: "popia",
    name: "POPIA & PAIA",
    value: "Compliant",
    plain:
      "We meet South Africa's data-protection and access-to-information law — the standard you are personally accountable to.",
    answers: "data",
  },
];

export const CREDENTIALS_COPY = {
  index: "05",
  eyebrow: "Credentials",
  headline: "Held, current, independently audited.",
  lead:
    "Before anyone hands over their systems, they need to know who they're handing them to. Whoever signs off on your technology partner will ask for these — so here they are. Not aspirations, not in progress. Held today, and verifiable.",
  // The two questions a public-sector buyer is actually asking.
  questions: [
    {
      key: "data",
      label: "Can we trust them with our data?",
      body: "ISO 27001, SOC 2, and full POPIA & PAIA compliance — audited, not asserted.",
    },
    {
      key: "procurement",
      label: "Do they help our scorecard?",
      body: "B-BBEE Level 1 — the highest contributor level there is.",
    },
  ],
  note:
    "Certificates and current audit letters are provided with every proposal, and on request for any tender submission.",
};
