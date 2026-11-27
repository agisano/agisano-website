import type { Project } from "./types";

/**
 * Engen — official event photography, Lydenburg, 2026.
 *
 * CONFIRMED FACTS (Kagiso, 2026-11-27): client Engen; Lydenburg; 2026; a campaign and
 * event (a campaign activation); Agisano was booked as the official photographer of the
 * event and handled all photography. Delivered: 94 edited photographs and one
 * drone establishing shot (video), sent 30 November 2026. Event: the Engen Lydenburg soft
 * launch. Delivery details (recipient, link, PIN) are private: private/projects/engen.delivery.json.
 * Everything else is a [placeholder] until Kagiso supplies it. Do not fill a
 * placeholder from guesswork — not the event name, the date, the deliverables or
 * what the photographs were used for.
 *
 * PHOTOGRAPHS: none selected yet. Each slot's `label` describes the kind of frame
 * the sequence wants; Kagiso picks the real ones. See docs/projects.md.
 */
export const ENGEN: Project = {
  slug: "engen",
  status: "draft",
  discipline: "photography",

  title: "Engen",
  category: "Campaign & event photography",
  subtitle: "The Engen Lydenburg soft launch, photographed in full by Agisano as the official event photographer.",
  client: "Engen",
  location: "Lydenburg, South Africa",
  year: "2026",

  // Photos: Pixieset web renditions (1600px) for now. Replace each file in
  // assets/projects/engen/ with the full-size Lightroom export of the same name, then
  // re-run `npm run project:images -- engen` — print sharpness improves, nothing else changes.
  hero: {
    file: "engen-68.jpg",
    alt: "Five people under a red, white and blue balloon arch at the Quickshop entrance, a red ribbon with a bow across the doorway",
    label: "Hero — the Quickshop ribbon cutting",
    ratio: 3 / 2,
    focus: "50% 58%",
  },

  overview: [
    "Agisano was booked as the official photographer for the Engen Lydenburg soft launch, held on 26 November 2026. We handled all of the photography on the day.",
    "[What the event was and who it was for, in one sentence.] [What Engen needed the photographs to do — the visual objective, in their words.] [What the finished set was used for.]",
  ],

  gallery: [
    {
      kind: "full",
      image: { label: "Establishing — the venue and the scale of the day, wide", ratio: 3 / 2 },
    },
    {
      kind: "pair",
      images: [
        { label: "People — arrival or welcome", ratio: 2 / 3 },
        { label: "Detail — branding, setting or a hand at work", ratio: 2 / 3 },
      ],
    },
    {
      kind: "feature",
      lead: { label: "The defining moment of the programme", ratio: 4 / 5 },
      support: { label: "A reaction to that moment", ratio: 3 / 2 },
      side: "left",
    },
    {
      kind: "inset",
      image: { label: "Atmosphere — the room, the crowd, the light", ratio: 3 / 2 },
      align: "right",
    },
    {
      kind: "pair",
      images: [
        { label: "Candid — an unposed interaction", ratio: 3 / 2 },
        { label: "Portrait — a key person, environmental", ratio: 4 / 5 },
      ],
    },
    {
      kind: "full",
      image: { label: "Late in the day — the event at its fullest", ratio: 16 / 9 },
    },
  ],

  approach: [
    "[How the day was covered: what was planned with Engen beforehand, which moments and people mattered most.]",
    "[What was specific to this event — the venue, the light, the pace of the programme — and how that shaped the photographs.]",
  ],

  details: [
    { label: "Client", value: "Engen" },
    { label: "Project", value: "Engen Lydenburg soft launch" },
    { label: "Category", value: "Campaign & event photography" },
    { label: "Role", value: "Official event photographer" },
    { label: "Location", value: "Lydenburg, South Africa" },
    { label: "Year", value: "2026" },
    { label: "Services", value: "All photography on the day, and a drone establishing shot (video)" },
    { label: "Deliverables", value: "94 edited photographs and one drone establishing shot" },
    { label: "Photography", value: "Agisano" },
  ],

  closing: {
    label: "Closing — the last frame of the story: a departure, the empty venue, a quiet moment",
    ratio: 3 / 2,
  },

  onePager: {
    heading: "Opening day on the forecourt, from the first ribbon to the last spin of the wheel.",
    summary:
      "Agisano was booked as the official photographer for the Engen Lydenburg soft launch on 26 November 2026. We covered the whole day: the ribbon cuttings at the Quickshop and the Woolworths Foodstop, the prize wheel on the forecourt, and the customers who came through on opening day.",
    picks: [
      {
        file: "engen-95.jpg",
        alt: "Elevated wide view of the Engen forecourt in Lydenburg, flags along the lawn and hills behind",
        label: "Support 1 — the site",
        ratio: 3 / 2,
        focus: "50% 55%",
      },
      {
        file: "engen-55.jpg",
        alt: "A woman in a pink head wrap laughs and high-fives a host beside the Engen prize wheel",
        label: "Support 2 — the prize wheel",
        ratio: 3 / 2,
      },
      {
        file: "engen-22.jpg",
        alt: "Shoppers and staff inside the Woolworths Foodstop under a black and white balloon arch",
        label: "Support 3 — inside the Woolworths Foodstop",
        ratio: 3 / 2,
      },
    ],
    details: ["Client", "Role", "Services", "Deliverables"],
  },

  next: {
    line: "Photographing an event? Tell us the date.",
    label: "Request a quote",
    href: "/media#book",
  },
  rightsNote: "Image use is subject to the agreement with the client.",
};
