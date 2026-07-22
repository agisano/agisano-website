/**
 * Readiness Check — deterministic readout logic (build-spec §4.3).
 *
 * NOT a score, NOT a benchmark. A transparent, rules-based "honest read of what
 * you told us". Each of the four areas resolves to one of three word-statuses.
 * "Solid — leave it" is EQUAL in weight and prominence to a problem (§4.3 —
 * the honesty differentiator). Priorities are RANKED and RESTRAINED — never all four.
 */

export type Area = "connectivity" | "equipment" | "support" | "presence";
export type StatusKey = "solid" | "some" | "attention";

export type Option = { label: string; weight: number };

export type Question = {
  id: string;
  area: Area | "context";
  scored: boolean;
  text: string;
  options: Option[];
};

// weight per answer: 0 = solid, 1 = some gaps, 2 = needs attention
export const QUESTIONS: Question[] = [
  {
    id: "internet_state",
    area: "connectivity",
    scored: true,
    text: "How's the internet at your school or organisation right now?",
    options: [
      { label: "No internet", weight: 2 },
      { label: "We have it, but it's unreliable", weight: 2 },
      { label: "Fine in the office, not everywhere", weight: 1 },
      { label: "Solid everywhere", weight: 0 },
    ],
  },
  {
    id: "internet_reach",
    area: "connectivity",
    scored: true,
    text: "Can people actually use it where they need to?",
    options: [
      { label: "Yes, where it matters", weight: 0 },
      { label: "Some areas", weight: 1 },
      { label: "Rarely", weight: 2 },
      { label: "Never", weight: 2 },
    ],
  },
  {
    id: "equipment_available",
    area: "equipment",
    scored: true,
    text: "When someone needs a working computer or projector, is one available?",
    options: [
      { label: "Usually", weight: 0 },
      { label: "Sometimes", weight: 1 },
      { label: "Rarely", weight: 2 },
      { label: "We don't really have the equipment", weight: 2 },
    ],
  },
  {
    id: "support_who",
    area: "support",
    scored: true,
    text: "When something breaks, who fixes it?",
    options: [
      { label: "We have someone reliable", weight: 0 },
      { label: "Someone who's good with tech", weight: 1 },
      { label: "We call around", weight: 2 },
      { label: "It stays broken", weight: 2 },
    ],
  },
  {
    id: "support_speed",
    area: "support",
    scored: true,
    text: "How long does a fix usually take?",
    options: [
      { label: "Same day", weight: 0 },
      { label: "A few days", weight: 1 },
      { label: "Weeks", weight: 2 },
      { label: "Depends entirely", weight: 2 },
    ],
  },
  {
    id: "presence_online",
    area: "presence",
    scored: true,
    text: "If someone searches for you online, what do they find?",
    options: [
      { label: "A proper website", weight: 0 },
      { label: "An old or broken page", weight: 1 },
      { label: "Just a social page", weight: 1 },
      { label: "Nothing really", weight: 2 },
    ],
  },
  {
    id: "size",
    area: "context",
    scored: false,
    text: "Roughly how many learners or people is this for?",
    options: [
      { label: "Under 200", weight: 0 },
      { label: "200–600", weight: 0 },
      { label: "600–1,200", weight: 0 },
      { label: "More than 1,200", weight: 0 },
    ],
  },
];

export const AREA_META: Record<Area, { name: string; noun: string }> = {
  connectivity: { name: "Internet & WiFi", noun: "reliable internet where people actually work" },
  equipment: { name: "Equipment", noun: "working equipment when people need it" },
  support: { name: "IT support", noun: "someone accountable when things break" },
  presence: { name: "Online presence", noun: "a proper digital front door" },
};

export const STATUS_META: Record<StatusKey, { word: string; token: string }> = {
  solid: { word: "Solid — leave it", token: "var(--positive)" },
  some: { word: "Some gaps", token: "var(--muted)" },
  attention: { word: "Needs attention", token: "var(--attention)" },
};

export type AreaResult = { area: Area; status: StatusKey; sentence: string };

export type Readout = {
  headline: string;
  areas: AreaResult[];
  priorities: Area[];
  summarySize: string | null;
};

const STATUS_SENTENCE: Record<Area, Record<StatusKey, string>> = {
  connectivity: {
    solid: "Your connection reaches where people work. Leave it — don't spend here.",
    some: "It works in places, but the coverage has gaps worth closing.",
    attention:
      "People can't reliably get online where they actually need to. This is holding the rest back.",
  },
  equipment: {
    solid: "There's working equipment on hand when it's needed. This is in good shape.",
    some: "Equipment is there, but availability is patchy enough to slow people down.",
    attention:
      "The equipment isn't there when people need it, which quietly costs you every day.",
  },
  support: {
    solid: "You've got someone reliable, and fixes happen fast. Leave it.",
    some: "Things do get fixed, but not always quickly or by someone accountable.",
    attention:
      "When something breaks there's no clear owner, so it lingers. This is worth sorting first.",
  },
  presence: {
    solid: "People who look you up find a proper presence. This is doing its job.",
    some: "You're findable, but what people see is dated enough to undersell you.",
    attention:
      "Search for you and there's little there — you're invisible or misrepresented online.",
  },
};

function statusFor(scores: number[]): StatusKey {
  if (scores.length === 0) return "solid";
  const max = Math.max(...scores);
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  if (max >= 2 || avg >= 1.5) return "attention";
  if (avg <= 0.001) return "solid";
  return "some";
}

const STATUS_RANK: Record<StatusKey, number> = { attention: 2, some: 1, solid: 0 };
const AREA_ORDER: Area[] = ["connectivity", "support", "equipment", "presence"];

export function computeReadout(answers: Record<string, number>): Readout {
  const byArea: Record<Area, number[]> = {
    connectivity: [],
    equipment: [],
    support: [],
    presence: [],
  };

  for (const q of QUESTIONS) {
    if (!q.scored) continue;
    const idx = answers[q.id];
    if (idx == null) continue;
    const w = q.options[idx]?.weight ?? 0;
    byArea[q.area as Area].push(w);
  }

  const areas: AreaResult[] = AREA_ORDER.map((area) => {
    const status = statusFor(byArea[area]);
    return { area, status, sentence: STATUS_SENTENCE[area][status] };
  });

  // attention first, then some; ties broken by buyer-impact order. Max 2 — restraint is honesty.
  const ranked = [...areas].sort((a, b) => {
    const r = STATUS_RANK[b.status] - STATUS_RANK[a.status];
    if (r !== 0) return r;
    return AREA_ORDER.indexOf(a.area) - AREA_ORDER.indexOf(b.area);
  });
  const priorities = ranked
    .filter((a) => a.status !== "solid")
    .slice(0, 2)
    .map((a) => a.area);

  const sizeQ = QUESTIONS.find((q) => q.id === "size");
  const sizeIdx = answers["size"];
  const summarySize =
    sizeQ && sizeIdx != null ? sizeQ.options[sizeIdx]?.label ?? null : null;

  return { headline: buildHeadline(areas, priorities), areas, priorities, summarySize };
}

function buildHeadline(areas: AreaResult[], priorities: Area[]): string {
  const solidCount = areas.filter((a) => a.status === "solid").length;

  if (priorities.length === 0) {
    return "Honestly? You're in good shape across the board. The value now is a partner to keep it that way — not a big spend.";
  }

  const top = AREA_META[priorities[0]].noun;

  if (priorities.length === 1) {
    if (solidCount >= 2) {
      return `Your biggest gap right now is ${top} — the rest is in better shape than you might think.`;
    }
    return `Your clearest priority right now is ${top}.`;
  }

  const second = AREA_META[priorities[1]].noun;
  if (solidCount >= 2) {
    return `Your two priorities are ${top} and ${second} — but a couple of areas are already solid, so this is more focused than it feels.`;
  }
  return `Two things are worth doing first: ${top}, then ${second}.`;
}

export function priorityLabel(area: Area): string {
  return AREA_META[area].name;
}

/** Compact answer transcript that travels with the lead (spec §6). */
export function answerTranscript(answers: Record<string, number>): string {
  return QUESTIONS.filter((q) => answers[q.id] != null)
    .map((q) => `${q.text} — ${q.options[answers[q.id]]?.label ?? "?"}`)
    .join("\n");
}
