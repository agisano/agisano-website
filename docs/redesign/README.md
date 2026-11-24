# Site redesign: two branches, one partner

Status: **design agreed 2026-11-25, not built yet.** Deploy waits for real photography.

This is the build brief for the redesign. It records what was decided, what is still open,
and what the build has to change. The approved mock-up is
[`homepage-mockup-a.dc.html`](homepage-mockup-a.dc.html). It is the source of a Claude
design canvas, kept here for reference. It doesn't run on its own: it needs the canvas
runtime (`support.js`), and its fonts point at the canvas's own uploads. Read it for
layout, copy and behaviour. Don't copy it into the app.

## What changed and why

The old site read as a technology and WiFi company with media added on. The redesign
presents **two branches under one roof, with equal weight but clearly separate**:

| Branch | Services | Way in |
|---|---|---|
| **Technology** ("what you run on") | Internet & WiFi · Security & safe internet · ICT equipment & classroom AV · Power & resilience · Managed IT support | Book a free assessment |
| **Digital & media** ("how you are seen") | Websites · Event photography · Video | Request a quote |

Removed from the offer on the site: parent and community communications, online
admissions and forms, and headshots. Prices are never shown on the site (PR #13).

This is a brand change. The ratified message order put digital presence last, as "an
add-on; never the opener". Kagiso overrode that on 2026-11-24, so the two branches now
have equal weight. The `agisano-brand` skill still has to be updated to match (see Open
items).

## Visual direction

**A · Editorial luxury.** It keeps the current colours (ink, paper, teal `#0e4f55` and
red-orange `#ee4a36` from the logo pack), Fraunces and Satoshi, and the numbered
editorial layout. Direction B (Cinematic technology) was considered and not chosen.

## Homepage, section by section

| # | Section | Ground | Notes |
|---|---|---|---|
| 01 | Opening | ink | Headline: "How your institution runs. How it is seen. *One partner for both.*" Then the hero graphic, the lead, and two equal buttons labelled by branch: **Technology → Book a free assessment** and **Digital & media → Request a quote**. Below them, a text link to the 90-second check. Under that, a stats strip: Since 2021 · Two branches · 1 business day · Level 1. |
| 02 | The 90-second check | paper | Stays interactive and on the page. Its questions alternate between the branches (below). The results offer both ways in. |
| 03 | Branch one · Technology | stone | Its own section: headline "Everything your institution runs on.", five expandable service lines, its own photographs, then **Book a free assessment** and "Explore Technology". |
| 04 | Branch two · Digital & media | ink | Its own section: headline "Everything your institution is *seen by*.", three services, its own photographs, then **Request a quote** and "Explore Digital & media". |
| 05 | Proof: Observatory Girls' | paper | "Depth, not scale." A case study across both branches: what we found → what we built → how it runs → what changed. The locked internet-grant line stays exactly as it is. |
| 06 | Why Agisano | stone | B-BBEE Level 1 leads, then ISO 27001, SOC 2, ISO 9001 and POPIA & PAIA, then the four constraints. One new constraint: "Your reputation is in the detail". |
| 07 | The next step | ink | Two offer cards side by side: a free on-site assessment, and a fixed written quote. |
| — | Footer | ink | Closing line, the services listed under each branch, contact, legal, and a discreet **Staff login** link. |

**Navigation:** Technology · Digital & media · Our proof · About · **Get in touch**.
That is the single nav button, and it jumps to section 07. Two buttons in the nav were
tried and were too crowded.

The current section-numbering bug (Credentials labelled 05 instead of 06) disappears
with the new structure.

### The hero graphic

Two separate circles, **Technology** on the left with five service nodes and
**Digital & media** on the right with three. Each circle carries its name and a short
line ("what you run on", "how you are seen"). They meet only at the Agisano mark, which
is labelled "One roof".

- **Cycling:** every 2.8 s the focus moves to the next service, alternating between the
  branches. The active service's node, line and circle light up, and a caption below
  shows the branch, the service and one line about it.
- **Clicking:** each node is a real button, so it works with a mouse and the keyboard.
  Choosing one holds it for about 9 s before the cycle resumes.
- **Reduced motion:** with reduced motion turned on, nothing animates and the cycle
  stops.

### The 90-second check

The new question set, alternating between the branches:

1. Technology: How's the internet at your school or organisation right now?
2. Digital & media: If someone searches for you online, what do they find?
3. Technology: When something breaks, who fixes it?
4. Digital & media: When there's a big event, who captures it? *(new)*
5. Technology: When someone needs a working computer or projector, is one available?
6. Digital & media: How current is your website? *(new)*
7. About you: Roughly how many learners or people is this for?

The build has to add weights for the two new questions, add a Digital & media area to
the results (`lib/readiness.ts`), and carry the readout into the lead.

## What the build changes in the code

- **The six-line spine goes.** `UNDER_ONE_ROOF.services`, `HERO.fragments`, the
  `FRAGMENTS` in `ConvergingLine` and `METRICS` all count off six lines (see CLAUDE.md).
  They become two branches. `ConvergingLine` is replaced by the two-circle graphic.
- **Content stays data.** The branch and service copy goes in `lib/content.ts`, which
  already holds the `MEDIA` block. Keep every binding rule there: no counts, the locked
  internet-grant line, no invented figures.
- **Pages:** the homepage first, then a page for each branch. `/under-one-roof` becomes
  Technology, and `/media` becomes Digital & media, with websites added.
- **Photography:** use `components/Photo.tsx` slots, in duotone. Every placeholder in the
  mock-up names its shot.
- **Before merging, check** the type check, the build, the contrast audit
  (`tools/a11y-contrast.mjs`), and screenshots at 1440 px and 390 px.

## Open items, all Kagiso's call

- [ ] **Certifications.** Confirm that ISO 27001, SOC 2 and ISO 9001 are held in
  Agisano's own name and current, and whether SOC 2 is Type I or Type II. Remove any
  that can't be shown before the redesign makes them more prominent.
- [ ] **The Observatory Girls' website.** Confirm that Agisano built it and that it is
  live. The proof section claims it.
- [ ] **The case-study facts.** What we found, what we built, how it runs, what changed.
  Real facts only, and numbers only if they can be checked.
- [ ] **Photography.** This blocks deployment. Shot list:
  - the network cabinet;
  - an access point on a ceiling;
  - battery backup;
  - a teacher using a classroom screen;
  - the team on site;
  - a school event, such as prize-giving;
  - a website on a phone;
  - filming on the day;
  - the Observatory Girls' school, with consent.
- [ ] **Branch name.** "Digital & media" is the working name.
- [ ] **The brand skill.** Update `agisano-brand` for the two-branch message order and
  the logo-pack colours the site actually uses (teal `#0e4f55`, red-orange `#ee4a36`).

## Staff login (separate work: agisano-vps)

The footer link points at ERPNext's own login page. The site is static and cannot
authenticate anyone. ERPNext on varys is currently on the LAN only, over HTTP, with no
backups. Plan, in order:

1. Nightly backups, stored off varys.
2. Cloudflare Tunnel with Cloudflare Access (email one-time code) in front of ERPNext.
   No port is opened on the home network. Only the web-form path the enquiry forms post
   to stays public.
3. Inside ERPNext: two-factor authentication for every user, lockout after repeated
   failed logins, one account per person, and access limited to each role.

Until that is live, the Staff login link stays out of the build.
