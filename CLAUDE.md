# Agisano

**Agisano Technology Consultancy** — Kagiso's business. Connects South African public and private schools to credible web presence, digital administration, and tech infrastructure. Gauteng-based.

## Business context
- Target market: basic education schools in SA (public SGBs + independent)
- Services: school websites, digital administration, networking/infrastructure
- First client: **Observatory Girls' School** — website at `~/agisano/obsgirls-website` (Astro). Client of Agisano, not a personal project.
- Business is in relaunch/build-out phase — see `~/agisano/business/RELAUNCH.md` for the full checklist
- GitHub org: `agisano` — Agisano has its own GitHub profile/org, separate from Kagiso's personal `Kagiso-me`

## Infrastructure plan — VPS
Agisano's own services will run on a **VPS** (not the homelab k3s cluster). Docker Compose deployment. Planned services:
- **Dolibarr** — ERP / CRM / invoicing (replaces/augments Zoho Books)
- **Zammad** — helpdesk / ticketing for client support
- Additional services TBD

## Repositories under `/home/kagiso/agisano/`
| Dir | Stack | Purpose |
|---|---|---|
| `agisano-website/` | Next.js 16, Tailwind v4, Framer Motion | Marketing site — `agisano.com` |
| `obsgirls-website/` | Astro | First client school site (case study) |
| `business/` | Markdown | Business planning docs, relaunch checklist |

## agisano-website stack (v2 rebuild)
- Next.js 16 App Router, TypeScript, Tailwind CSS v4, `motion` v12, Lenis smooth scroll
- Static export (`output: "export"`) → GitHub Pages → agisano.com. No API routes, no backend.
- Fonts, self-hosted woff2: **Fraunces** (display) + **Satoshi** (body). Poppins 600 is the
  wordmark face ONLY — never running text.
- Pages: `/`, `/about`, `/under-one-roof`, `/observatory-girls`, `/assessment`,
  `/assessment-terms`, `/privacy`
- Motion lives in `components/motion/Reveal.tsx` (`Fade`, `Rise`, `Stagger`,
  `StatementBuild`); scroll-scrub via `lib/usePinProgress`, capability gating via
  `lib/useCapability`. `ConvergingLine` is the signature device — the service threads
  resolve into the Agisano mark.

### Content is data, not markup
Copy lives in `lib/content.ts`, numbers in `lib/metrics.ts`, credentials in
`lib/credentials.ts`. Each carries binding rules in its header comment — read them before
editing. The load-bearing ones:
- **Never surface a client count.** Proof is duration/continuity/completeness.
- **`CREDENTIALS` must be currently held and verifiable.** Nothing aspirational.
- **The OGS internet line is locked wording.** Never paraphrase; never name the provider.
- **`FOUNDERS` bios are held to equal length and equal treatment** — that parity is the
  argument. Neo's copy carries no technology-specification language.

### Service lines — six, and they must stay in step
`UNDER_ONE_ROOF.services` is the site's spine. `HERO.fragments`, `ConvergingLine`'s
`FRAGMENTS` and the `METRICS` count all key off it — change one, change all four. Each
line's `includes` catalogue must match the company profile PDF
(`../brand/collateral/company-profile`); a service sold there and missing here is a
service the buyer cannot find.

### Lead delivery
The booking form POSTs to `NEXT_PUBLIC_LEAD_ENDPOINT`. With no endpoint, or on any
failure, it never fakes success — it hands over pre-composed WhatsApp and mailto paths
carrying the full lead. `NEXT_PUBLIC_*` values are baked in at build time and must be set
as **repository variables** for the Pages workflow, not just in `.env.local`.

## Conventions
- Client websites use **Astro** (fast, low maintenance, no JS overhead for static school sites)
- Agisano's own marketing site uses Next.js
- VPS services use **Docker Compose** — not k3s, not Ansible managed by the homelab
- Brand voice: professional but warm, SA-rooted — "Building Together"
