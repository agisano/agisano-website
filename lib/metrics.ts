/**
 * The metrics grid (Tresmares' "About + stat grid" beat, honestly filled).
 *
 * ==========================================================================
 * BINDING (build-spec §4.9 / platform §4.6):
 *  - NEVER surface a COUNT that exposes limited scale. No client count, no
 *    "1 school", no institutions-served number. Ever.
 *  - NO INVENTED NUMBERS. Armory's reference stats (0ms, 99.99% uptime) are
 *    fabricated; ours are not. Every value below is either a fact from the
 *    ratified platform or a commitment Agisano actually makes and keeps.
 *  - If we do not have a real number for something, it does not go here.
 * ==========================================================================
 *
 * What each value traces to:
 *  4+ / Since 2021  → platform §4.6 track record (OGS, still current)
 *  End to end / 4   → platform §4.6 scope-of-services (all four lines live)
 *  1 / 60 / 3       → the assessment commitments in the approved S7 copy
 */

export type Metric = {
  value: string;
  unit?: string;
  label: string;
  /** Where the claim comes from — kept in code so it can't drift. */
  source: string;
};

export const METRICS: Metric[] = [
  {
    value: "2021",
    label: "Partnering our reference institution — and still today.",
    source: "platform §4.6 — track record",
  },
  {
    value: "4",
    unit: "+ years",
    label: "A relationship that stayed, not a one-off job.",
    source: "platform §4.6 — duration, still current",
  },
  {
    value: "4",
    unit: "services",
    label: "Internet, equipment, support, presence — all live, all ours.",
    source: "platform §4.6 — scope confirmed live",
  },
  {
    value: "1",
    unit: "business day",
    label: "To reply to you. From a person, not an auto-responder.",
    source: "approved S7 copy — commitment",
  },
];

/** The scrubbed proof anchors on the OGS section — duration/continuity/completeness. */
export const PROOF_ANCHORS = [
  { value: "4+", label: "Years as their technology partner — and still today." },
  { value: "End to end", label: "Every part of their technology, one accountable partner." },
  { value: "Since '21", label: "A relationship that stayed, not a one-off job." },
];

/** Per-service concrete boxes (Tresmares' card-metric pattern) — plain facts, no specs. */
export const SERVICE_FACTS: Record<string, { k: string; v: string }[]> = {
  connectivity: [
    { k: "Scope", v: "Network & WiFi, built and run" },
    { k: "Coverage", v: "Where people work, not just the office" },
  ],
  equipment: [
    { k: "Scope", v: "Supplied, set up, ready to use" },
    { k: "Fit", v: "Chosen for the room, not the brochure" },
  ],
  support: [
    { k: "Response", v: "1 business day" },
    { k: "Accountability", v: "One team, no finger-pointing" },
  ],
  presence: [
    { k: "Scope", v: "Website & digital front door" },
    { k: "Built", v: "To be found, and to be trusted" },
  ],
};
