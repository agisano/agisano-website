/**
 * Single source of truth for approved copy and locked honesty facts.
 * BINDING (build-spec §7, platform §4.6):
 *  - The internet line uses EXACT locked wording; never paraphrase. Say "a grant";
 *    never name the provider — we don't advertise a third party on our own proof.
 *  - OGS facts are fixed: Observatory Girls' Primary School, partner since 2021
 *    (~4 years, still current), all four services delivered there.
 *  - Proof anchors NEVER surface a count (no "1", no client-count).
 *  - Testimonial ships EMPTY until real words arrive.
 */

/**
 * INTEGRATION POINT — both values are placeholders until Kagiso supplies the real
 * ones. Set NEXT_PUBLIC_WHATSAPP (digits only, e.g. 27821234567) and
 * NEXT_PUBLIC_EMAIL in .env.local. See .env.example.
 */
export const CONTACT = {
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP || "",
  whatsappDisplay: "WhatsApp us",
  email: process.env.NEXT_PUBLIC_EMAIL || "hello@agisano.com",
  emailDisplay: process.env.NEXT_PUBLIC_EMAIL || "hello@agisano.com",
};

/**
 * WhatsApp is shown ONLY when a real number is configured.
 *
 * It is currently OFF because there is no business number yet — and a dead
 * click-to-chat button is worse than no button. To switch it back on, set
 * NEXT_PUBLIC_WHATSAPP (digits only, e.g. 27821234567). No code change needed:
 * every WhatsApp path on the site keys off this flag.
 */
export const WHATSAPP_ENABLED = Boolean(process.env.NEXT_PUBLIC_WHATSAPP);

export const HERO = {
  eyebrow: "Your technology partner",
  headlineClauses: [
    "Running an organisation",
    "is hard enough —",
    "without also running",
    "its technology.",
  ],
  lead:
    "One accountable partner takes the whole weight off your desk — the connection, the equipment, the support, and how you show up online — so the people running your institution can get back to the work only they can do.",
  ctaPrimary: "Book a free assessment",
  ctaSecondary: "Take the 90-second check",
  fragments: ["Internet", "Equipment", "Support", "Online presence"],
};

export const ONE_PARTNER = {
  eyebrow: "One accountable partner",
  headline: "One number to call. One team that answers for it.",
  body:
    "Most institutions end up assembling their own technology by hand — a WiFi installer here, an equipment supplier there, someone to phone when it breaks — and quietly become the person holding it all together. Agisano is the single line through that. We own the whole of it, so there is one relationship, and no gaps between vendors for a fault to fall into.",
};

export const CHECK_INVITE = {
  eyebrow: "The 90-second check",
  headline: "Not sure where you stand?",
  body:
    "Answer a few plain questions about your institution and we'll give you our honest read — where you're solid, where there are gaps, and the one or two things worth doing first. No score, no sales pitch.",
  cta: "Start the check",
};

export const UNDER_ONE_ROOF = {
  eyebrow: "Under one roof",
  headline: "Four things, one partner.",
  lead:
    "Everything an institution's technology needs, owned end to end by one team — so nothing falls between the cracks.",
  services: [
    {
      key: "connectivity",
      title: "Internet & WiFi",
      plain:
        "Coverage that reaches where people actually work — not just the office. We build the network and keep it working.",
      photo: "Network cabinet, neatly installed and labelled",
    },
    {
      key: "equipment",
      title: "ICT equipment",
      plain:
        "The right computers, projectors and devices for the job — supplied, set up, and ready to use.",
      photo: "A room of working, in-use equipment",
    },
    {
      key: "support",
      title: "Managed IT support",
      plain:
        "When something breaks, one team fixes it — quickly, without you chasing anyone or refereeing between vendors.",
      photo: "Hands on a keyboard in a real working room",
    },
    {
      key: "presence",
      title: "Digital presence",
      plain:
        "A proper website and the digital front door your institution deserves — so people find you and take you seriously.",
      photo: "A real administrative space / front desk",
    },
  ],
};

export const OGS = {
  eyebrow: "The proof",
  headline: "Depth, not scale.",
  // Anchors are duration / continuity / completeness — NEVER a count (§9.4).
  anchors: [
    { value: "4+", label: "Years as their technology partner — and still today." },
    { value: "End to end", label: "Every part of their technology, one accountable partner." },
    { value: "Since '21", label: "A relationship that stayed, not a one-off job." },
  ],
  body:
    "Observatory Girls' Primary School has been our full-time technology partner since 2021 — every part of it, kept working, year after year. It is a real, mission-driven institution: Observatory Girls' is a three2six host school, running a bridging programme for refugee and migrant children.",
  // LOCKED — exact wording, build-spec §7 / platform §4.6. Do not edit.
  internetLine:
    "We're precise about what's ours: the school's internet connection came through a grant. Agisano built and runs the network and WiFi on top of it — the coverage across the school, and keeping it working every day.",
  link: { href: "/observatory-girls", label: "The full story" },
  photo: "Real, consented OGS photograph — the emotional anchor",
  // Testimonial ships EMPTY until real words arrive (§7). Do not fill.
  testimonial: null as null | { quote: string; attribution: string },
};

export const CONSTRAINTS = {
  eyebrow: "Why Agisano",
  headline: "We understand the constraints you actually work under.",
  lead:
    "Every institution answers to someone. We build for the real world you operate in — its budgets, its approvals, its calendar — not an idealised one.",
  points: [
    {
      title: "Budgets that must be justified",
      body:
        "Every rand is accounted for to someone. We scope honestly, tell you what you don't need to spend on, and put it in writing.",
    },
    {
      title: "Funding cycles and approvals",
      body:
        "Decisions move through governing bodies and processes on their own timeline. We plan around them instead of pretending they aren't there.",
    },
    {
      title: "The institutional calendar",
      body:
        "Terms, exams, intakes — the work happens around them, not through them. We schedule to the rhythm of how your institution actually runs.",
    },
    {
      title: "Trust before technology",
      body:
        "You are judged on reliability, not specifications. So are we. We'd rather be the partner that picks up than the one with the longest feature list.",
    },
  ],
};

export const FINAL_CTA = {
  eyebrow: "The next step",
  headline: "Start with a free assessment.",
  lead: "No cost, no obligation, no hard sell. Here is exactly what happens.",
  steps: [
    { n: "01", title: "We reply within 1 business day", body: "A real person, not an auto-responder." },
    { n: "02", title: "A free 60-minute on-site visit", body: "We come to you and see the real picture — the network, the equipment, the room." },
    { n: "03", title: "A written proposal within 3 business days", body: "Clear, itemised, honest about what you do and don't need. Yours to keep." },
    { n: "04", title: "No hard sell", body: "You decide in your own time. The assessment is useful whether or not you work with us." },
  ],
  cta: "Book a free assessment",
  termsNote: "See how the free assessment works",
  termsHref: "/assessment-terms",
};

export const NAV = [
  { href: "/under-one-roof", label: "Under one roof" },
  { href: "/observatory-girls", label: "Our proof" },
  { href: "/about", label: "About" },
  { href: "/assessment", label: "Book an assessment" },
];
