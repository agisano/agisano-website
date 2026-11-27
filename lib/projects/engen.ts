import type { Project } from "./types";

/**
 * Engen — official event photography, Lydenburg, 2026.
 *
 * CONFIRMED FACTS (Kagiso, 2026-11-27): client Engen; Lydenburg; 2026; a campaign and
 * event. Engen is opening a number of new sites, some with partner stores such as
 * Woolworths inside them; this launch was one of them. In Lydenburg the Woolworths
 * Foodstop is a standalone store within the Engen, the first in Mpumalanga, and there was
 * no Woolworths in Lydenburg before it. Agisano was booked purely for photography, as the
 * official photographer: to capture the event and its mood and put viewers in the day.
 * Delivered: 94 edited photographs and one drone establishing shot (video), sent
 * 30 November 2026. Event date 26 November 2026 (from the gallery cover).
 * Delivery details (recipient, link, PIN) are private: private/projects/engen.delivery.json.
 * Do not add anything beyond these facts and what is visible in the photographs.
 *
 * PHOTOGRAPHS: picked from the delivered Pixieset gallery with Kagiso (2026-11-27); file
 * numbers match the gallery order. engen-41 and engen-61 are Kagiso's full-resolution
 * exports; the rest are Pixieset's 1600px web copies. Replace each with the Lightroom
 * export of the same name and re-run `npm run project:images -- engen` for sharper print.
 */
export const ENGEN: Project = {
  slug: "engen",
  status: "published",
  discipline: "photography",

  title: "Engen",
  category: "Campaign & event photography",
  subtitle: "The Engen Lydenburg soft launch, photographed in full by Agisano as the official event photographer.",
  client: "Engen",
  location: "Lydenburg, South Africa",
  year: "2026",

  hero: {
    file: "engen-61.jpg",
    alt: "The store's owner between two members of Engen management at the opening, one with her arm raised in celebration, under a red, white and blue balloon arch",
    label: "Cover — the owner with Engen management at the opening",
    focus: "50% 32%",
  },

  overview: [
    "Engen is opening a number of new sites, some with partner stores inside them. In Lydenburg that partner is Woolworths: a standalone Woolworths Foodstop within the Engen, the first in Mpumalanga.",
    "Until this launch there was no Woolworths in Lydenburg at all, so for the town it was a big day. Agisano was booked as the official photographer for the soft launch on 26 November 2026, and covered all of it: the ribbon cuttings, the first shoppers through the doors, and Engen's prize wheel on the forecourt.",
  ],

  gallery: [
    {
      kind: "full",
      image: {
        file: "engen-95.jpg",
        alt: "Elevated wide view of the Engen forecourt in Lydenburg, V-Max flags along the lawn and hills behind",
        label: "Establishing — the site from above",
      },
    },
    {
      kind: "pair",
      images: [
        {
          file: "engen-24.jpg",
          alt: "A smiling customer in a striped T-shirt walks the red carpet out of the Quickshop, arms full of shopping",
          label: "First shoppers — out of the Quickshop",
        },
        {
          file: "engen-14.jpg",
          alt: "A smiling man walks out of the Quickshop onto the red carpet under the balloon arch, the Quickshop sign above",
          label: "First shoppers — out under the arch",
        },
      ],
    },
    {
      kind: "full",
      image: {
        file: "engen-73.jpg",
        alt: "Four people cut a black ribbon with a large bow at the entrance to the Woolworths Foodstop",
        label: "The Woolworths Foodstop ribbon cutting",
      },
    },
    {
      kind: "full",
      image: {
        file: "engen-22.jpg",
        alt: "Shoppers and staff inside the Woolworths Foodstop under a black and white balloon arch",
        label: "Inside the Woolworths Foodstop",
      },
    },
    {
      kind: "full",
      image: {
        file: "engen-30.jpg",
        alt: "A group of women with shopping bags laugh together under the balloon arch at the Quickshop door",
        label: "Shoppers under the arch",
      },
    },
    {
      kind: "inset",
      image: {
        file: "engen-49.jpg",
        alt: "A boy at the Engen prize wheel under the V-Max gazebo, a host with a microphone and a crowd in blue bucket hats around him",
        label: "The prize wheel on the forecourt",
      },
      align: "right",
    },
    {
      kind: "pair",
      images: [
        {
          file: "engen-41.jpg",
          alt: "A girl in a T-shirt reading You're doing great laughs beside the Engen prize wheel",
          label: "At the wheel — laughing",
        },
        {
          file: "engen-55.jpg",
          alt: "A woman in a pink head wrap laughs and high-fives a host beside the Engen prize wheel",
          label: "At the wheel — a high-five",
        },
      ],
    },
    {
      kind: "full",
      image: {
        file: "engen-44.jpg",
        alt: "A man in a bucket hat roars with laughter beside the Engen prize wheel as the people around him laugh too",
        label: "At the wheel — the biggest laugh",
      },
    },
  ],

  approach: [
    "We were booked for photography alone, with one job: capture the day and its mood, and put whoever looks at the photographs back on the forecourt.",
    "So we followed the excitement: the faces at the ribbon cuttings, people walking out with their shopping, and the laughter around the prize wheel.",
  ],

  details: [
    { label: "Client", value: "Engen" },
    { label: "Project", value: "Engen Lydenburg soft launch" },
    { label: "Category", value: "Campaign & event photography" },
    { label: "Role", value: "Official event photographer" },
    { label: "Location", value: "Lydenburg, South Africa" },
    { label: "Year", value: "2026" },
    { label: "Services", value: "Event photography" },
    { label: "Deliverables", value: "94 edited photographs and one drone establishing shot" },
    { label: "Photography", value: "Agisano" },
  ],

  closing: {
    file: "engen-31.jpg",
    alt: "Three women walk out of the Quickshop under the balloon arch, drinks in hand, one laughing",
    label: "Closing — walking out into the afternoon",
  },

  onePager: {
    heading: "Opening day on the forecourt, from the first ribbon to the last spin of the wheel.",
    summary:
      "Agisano was booked as the official photographer for the Engen Lydenburg soft launch on 26 November 2026. We covered the whole day: the ribbon cuttings at the Quickshop and the Woolworths Foodstop, the prize wheel on the forecourt, and the customers who came through on opening day.",
    // The project sheet keeps its own hero (approved 2026-11-27); the case study cover changed.
    hero: {
      file: "engen-68.jpg",
      alt: "Five people under a red, white and blue balloon arch at the Quickshop entrance, a red ribbon with a bow across the doorway",
      label: "Hero — the Quickshop ribbon cutting",
      focus: "50% 58%",
    },
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
  clientLogo: { src: "/clients/engen.png", alt: "Engen", ratio: 2000 / 1043 },
};
