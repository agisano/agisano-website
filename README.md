# Agisano — site v2

Real Next.js prototype of the marketing site, built to Steve's build spec
(`~/workspace/team/creative-studio/07-brands/agisano-website-build-spec.md`).

The old site at `../agisano-website` is untouched.

## Run

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # static export → ./out
npm run lint
```

Static export (`output: "export"`) — deployable to any static host. No server needed.

## Stack

- Next.js 16 (App Router), TypeScript, Tailwind v4 — matches the existing project's conventions
- **Motion:** `motion` (Framer Motion) for orchestrated reveals + `lenis` for smooth scroll
- **Fonts:** self-hosted, subset woff2 — Fraunces (variable display serif) + Satoshi 400/500/700

## The motion contract (read before changing anything)

Capability is decided **once, before first paint**, by an inline script
(`lib/capabilityScript.ts`) that puts `cinematic` or `motion-off` on `<html>`.
`lib/useCapability.ts` only *reads* that class — it never re-derives it. This is
deliberate: CSS and JS must never disagree about the device, or a pinned section
ends up with zero scroll travel and the convergence never resolves.

| | Desktop-capable | Phone / slow / data-saver | `prefers-reduced-motion` |
|---|---|---|---|
| Lenis smooth scroll | yes (lazy chunk) | **never downloaded** | no |
| Pinned sections | yes (hero, roof, proof) | no | no |
| Scroll-scrubbed line + anchors | yes | no — rendered resolved | no — rendered resolved |
| Parallax | yes | no | no |
| Magnetic CTA | yes | no | no |
| Fade-up reveals | yes | yes (fast) | **off — static** |

Cinematic is an *enhancement layered on top of* a resolved static composition —
which is what the server renders, what a crawler sees, and what a reduced-motion
user gets. Cinematic is timing and sequence, never payload.

## Integration points (what's needed to launch)

### 1. Lead endpoint — REQUIRED
Copy `.env.example` → `.env.local` and set `NEXT_PUBLIC_LEAD_ENDPOINT` to any
POST-accepting inbox (Formspree, Basin, an n8n webhook, a serverless function).

**The form never fakes a submit.** With no endpoint configured it says so plainly
and hands the user two real, working, backend-free paths — WhatsApp click-to-chat
and a `mailto:` — both pre-composed with the full lead *and* the Readiness Check
readout and answer transcript. See `lib/lead.ts`.

### 2. Contact details — REQUIRED
`NEXT_PUBLIC_WHATSAPP` (digits only, e.g. `27821234567`) and `NEXT_PUBLIC_EMAIL`.
Currently placeholders in `lib/content.ts`.

### 3. Photography — one slot only
Photography has been deliberately designed *out* of the page: the metrics grid,
the four service fact-cards and the credentials band carry the composition with
type, rule-work and concrete facts instead. **One** photo slot remains, where it
genuinely earns its place: the OGS proof anchor.

`components/Photo.tsx` renders an honest, labelled placeholder at the exact size
and crop the real duotoned photo will occupy. Pass `src` to drop the real image in
— identical layout, zero shift. Missing images can never break layout (the box is
reserved by `aspect-ratio`).

## Binding honesty rules (enforced in code, verified in the build)

These are not style preferences — they are in the spec and the ratified platform.

- `lib/content.ts` holds the **locked internet wording verbatim**. It says "a grant"
  and **never names the provider**. Do not paraphrase it. (Verified: the provider
  name appears nowhere in `out/`.)
- `lib/metrics.ts` / proof anchors: **never a count**. No "1 school", no client
  count, ever. Anchors are duration / continuity / completeness (`4+`,
  `End to end`, `Since '21`).
- **No invented numbers.** Every figure traces to the platform or a real
  commitment, and says so in a `source` field. (The reference sites' stats are
  fabricated; ours are not.)
- The **testimonial slot ships empty**. `OGS.testimonial` is `null` until the
  principal's real words arrive. Do not write one.
- `lib/credentials.ts`: every entry must be a **currently-held, verifiable**
  certification. If one lapses, delete the line — the layout absorbs it.

## Structure

```
app/            routes (all static)
components/     Nav, Footer, Photo, ConvergingLine, ReadinessCheck, BookingForm
components/sections/   the 8 homepage sections
components/motion/     Reveal (Stagger/Rise/Fade/StatementBuild), Magnetic, Counter
lib/            content, readiness logic, lead delivery, metrics, credentials, capability
```
