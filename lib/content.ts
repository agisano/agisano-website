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

export const CONTACT = {
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP || "",
  whatsappDisplay: "WhatsApp us",
  email: process.env.NEXT_PUBLIC_EMAIL || "hello@agisano.com",
  emailDisplay: process.env.NEXT_PUBLIC_EMAIL || "hello@agisano.com",
};

/**
 * Every WhatsApp path on the site keys off this flag, so a dead click-to-chat
 * button can never ship. Set NEXT_PUBLIC_WHATSAPP (digits only, e.g.
 * 27821234567) to turn them all on — no code change.
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
    "One accountable partner takes the whole weight off your desk — the connection, the equipment, the power behind it, the security around it, the support, and how you show up online — so the people running your institution can get back to the work only they can do.",
  ctaPrimary: "Book a free assessment",
  ctaSecondary: "Take the 90-second check",
  fragments: ["Internet", "Security", "Equipment", "Power", "Support", "Online presence"],
};

export const ONE_PARTNER = {
  eyebrow: "One accountable partner",
  headline: "One number to call. One team that answers for it.",
  body:
    "Most institutions end up assembling their own technology by hand — a WiFi installer here, an equipment supplier there, someone to phone when it breaks — and quietly become the person holding it all together. Agisano is the single line through that. We carry the whole of it, so there is one relationship, and no gaps between vendors for a fault to fall into.",
};

export const CHECK_INVITE = {
  eyebrow: "The 90-second check",
  headline: "Not sure where you stand?",
  body:
    "Answer a few plain questions about your institution and we'll give you our honest read — where you're solid, where there are gaps, and the one or two things worth doing first. No score, no sales pitch.",
  cta: "Start the check",
};

/**
 * The six service lines. This list is the site's spine — the hero fragments,
 * the converging line's threads and the metrics grid all count off it, so
 * adding or removing a line means updating HERO.fragments, ConvergingLine's
 * FRAGMENTS and METRICS together.
 *
 * `includes` is the full catalogue and must stay in step with the company
 * profile PDF (brand/collateral/company-profile). A service we sell in the
 * profile and not here is a service the buyer cannot find.
 */
export const UNDER_ONE_ROOF = {
  eyebrow: "Under one roof",
  headline: "Six lines, one partner.",
  lead:
    "Everything an institution's technology needs, owned end to end by one team — so nothing falls between the cracks.",
  services: [
    {
      key: "connectivity",
      title: "Internet & WiFi",
      plain:
        "Coverage that reaches where people actually work — not just the office. We build the network and keep it working.",
      photo: "Network cabinet, neatly installed and labelled",
      includes: [
        "WiFi & network installation",
        "Structured cabling",
        "Internet connectivity setup",
        "Telephony & VoIP",
        "Multi-site & remote-site networking",
      ],
    },
    {
      key: "security",
      title: "Security & safe internet",
      plain:
        "A managed line between your institution and the outside world — and, for a school, browsing that is safe for the children on it.",
      photo: "A managed firewall appliance in a labelled cabinet",
      includes: [
        "Firewall & network security",
        "Content filtering & child-safe internet",
        "CCTV & surveillance",
        "Access control",
        "Cybersecurity awareness training",
      ],
    },
    {
      key: "equipment",
      title: "ICT equipment & classroom AV",
      plain:
        "The right computers, screens and devices for the job — supplied, set up, and ready for the room they are going into.",
      photo: "A room of working, in-use equipment",
      includes: [
        "Device & hardware supply",
        "Computer lab setup & management",
        "Interactive whiteboards & smartboards",
        "Projectors & classroom AV",
        "Hall & assembly AV",
        "Intercom, PA & bell systems",
        "Printers, copiers & scanners",
        "IT asset management",
      ],
    },
    {
      key: "power",
      title: "Power & resilience",
      plain:
        "Keeping the internet, the network and the systems that matter alive through an outage — so the day carries on.",
      photo: "UPS and battery backup, installed and labelled",
      includes: [
        "UPS & power backup",
        "Load-shedding resilience",
        "Server, NAS & on-prem storage",
      ],
    },
    {
      key: "support",
      title: "Managed IT support",
      plain:
        "When something breaks, one team fixes it — quickly, without you chasing anyone or refereeing between vendors.",
      photo: "Hands on a keyboard in a real working room",
      includes: [
        "Monitoring, patching & backup",
        "Microsoft 365 & Active Directory",
        "Google Workspace for Education",
        "Email & domain hosting",
        "Email & data migration",
        "One number to call, under a written SLA",
      ],
    },
    {
      key: "presence",
      title: "Digital presence",
      plain:
        "A proper website and the digital front door your institution deserves — so people find you and take you seriously.",
      photo: "A real administrative space / front desk",
      includes: [
        "Websites you own, built and maintained",
        "Online admissions & digital forms",
        "Parent and community communications",
      ],
    },
  ],
};

/**
 * The commercial model. This is stated in the company profile and was missing
 * from the site entirely — a buyer could not tell whether we sell a monthly
 * service, a project, or both.
 */
export const HOW_WE_SELL = {
  headline: "Two ways to work with us, and you can use either or both.",
  options: [
    {
      key: "managed",
      title: "We run it for you, month to month.",
      body:
        "Our managed service keeps the internet up, email flowing, data backed up, and systems patched and monitored — for one predictable monthly fee, under a written SLA.",
    },
    {
      key: "project",
      title: "We build it once, and build it right.",
      body:
        "Networks and WiFi, security and surveillance, Microsoft 365, hardware, connectivity, power resilience — delivered as fixed-scope projects, with a clear scope and a clear price.",
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

/**
 * The founding pair. Equal treatment is the argument, not decoration: the two
 * bios are held to within a few words of each other and rendered identically.
 * A long CEO paragraph followed by a short second one manufactures exactly the
 * reading this section exists to defeat. Keep them level.
 *
 * Every claim traces to a verified fact. Neo's copy carries no technology
 * specification language — her authority is delivery, and one blurred clause
 * costs the credibility of the page.
 */
export const FOUNDERS = {
  eyebrow: "Who owns the whole",
  intro:
    "Owning the whole only counts if someone's name is on it. Agisano was founded and is run by two people with separate remits: one decides what an institution should build and what it should cost, the other makes sure it lands.",
  people: [
    {
      id: "kagiso",
      name: "Kagiso Tjeane",
      title: "CEO",
      bio:
        "Kagiso decides what an institution should build, what it should cost, and what Agisano puts in writing. He has spent more than fifteen years in technology. He began as an engineer and technology manager at MTN and moved through operations. Today he works at executive level at Melon Mobile, a South African mobile network, on strategy and commercial decisions. It is an industry where the handling of personal information is regulated rather than optional, and where an outage is measured, not explained away. He founded Agisano to bring that standard of judgment to institutions that could not otherwise buy it, at a scale and a price they can actually use.",
    },
    {
      id: "neo",
      name: "Neo Tjeane",
      title: "Project Director",
      bio:
        "Neo owns delivery — the schedule, the suppliers, the site, the budget, the handover. She has spent over a decade in campaign production at agencies including Leo Burnett and Publicis: more than fifty campaigns across more than twenty brands, nearly all of it delivered by suppliers who did not report to her, to dates that could not move. She ran Citroën's nationwide rollout for eleven months and Mercedes-Benz production end to end. She has also spent three years on the finance side of an agency, budgeting, paying suppliers and reconciling their invoices against a fixed number. She qualified in project management at the University of Cape Town in 2024.",
    },
  ],
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
