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

## agisano-website stack
- Next.js 16 App Router, TypeScript, Tailwind CSS v4, Framer Motion
- Fonts: Sora (headings) + Inter (body)
- Pure marketing site — no API routes, no backend
- Pages: `/`, `/about`, `/services`, `/contact`, `/privacy`
- Custom cursor, scroll animations via `AnimateIn` component
- Touch: tap-to-reveal service images (`.svc-row.touch-open`)

## Conventions
- Client websites use **Astro** (fast, low maintenance, no JS overhead for static school sites)
- Agisano's own marketing site uses Next.js
- VPS services use **Docker Compose** — not k3s, not Ansible managed by the homelab
- Brand voice: professional but warm, SA-rooted — "Building Together"
