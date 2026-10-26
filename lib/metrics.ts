/**
 * Proof anchors and per-service facts — the honest, concrete numbers.
 *
 * (The homepage metrics grid that used to live here was removed in the density
 * pass: every value in it — 2021, 4+ years, six lines, one business day — was
 * restated downstream with more context, so it only manufactured repetition.)
 *
 * ==========================================================================
 * BINDING (build-spec §4.9 / platform §4.6):
 *  - NEVER surface a COUNT that exposes limited scale. No client count, no
 *    "1 school", no institutions-served number. Ever.
 *  - NO INVENTED NUMBERS. Every value here is either a fact from the ratified
 *    platform or a commitment Agisano actually makes and keeps.
 *  - If we do not have a real number for something, it does not go here.
 * ==========================================================================
 */

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
  security: [
    { k: "Scope", v: "Managed firewall, filtering, cameras, access" },
    { k: "Posture", v: "POPIA-aware, with the records to show it" },
  ],
  equipment: [
    { k: "Scope", v: "Supplied, set up, ready to use" },
    { k: "Fit", v: "Chosen for the room, not the brochure" },
  ],
  power: [
    { k: "Scope", v: "Backup power on what matters" },
    { k: "Outcome", v: "The day carries on through an outage" },
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
