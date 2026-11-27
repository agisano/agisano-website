# Project case studies

Each media project is one data file. The same data renders three things:

| Output | Where | Use it for |
|---|---|---|
| Web case study | `agisano.com/projects/<slug>` | Work completed, on the site |
| A4 case study (PDF) | `exports/projects/<slug>/<slug>-case-study.pdf` | Email, client presentations |
| A4 project sheet, one page (PDF and JPEG) | `exports/projects/<slug>/<slug>-project-sheet.pdf` and `.jpg` | Email, Behance, the portfolio |

Both print documents also render in the browser at `/projects/<slug>/sheet` and
`/projects/<slug>/project-sheet` for previews. Both are marked noindex.

## Rules the template enforces

- **No invented facts.** Anything not confirmed is written in `[square brackets]`. It shows
  highlighted on the web page and in the PDF, so it can't slip through.
- **Photos as delivered.** Original colour (the site's duotone is not applied), true aspect
  ratio, no stretching. Only the hero and the project sheet's three tiles (equal 3:2 boxes)
  are cropped, from each slot's `focus` point. Nothing else is ever cropped.
- **No repeats.** If the same photo appears twice in a case study, the build fails. The
  project sheet may reuse case-study photos, because it's a separate document.
- **Brand-correct identity.** The project sheet shows the real mark and lowercase
  "agisano" wordmark with nothing beside them (no tagline lockup). The case study credits
  Agisano once, in the details (`Photography — Agisano`).
- **Nothing counts the work.** No project numbers and no "selected projects": the
  depth-not-scale rule applies to media too.
- **Drafts stay out of search.** `status: "draft"` builds the pages with noindex and leaves
  them out of the sitemap. Setting `status: "published"` fails the build while any
  `[placeholder]` or empty photo slot remains.

## Prerequisites

- Dependencies installed: `npm ci`. Playwright's Chromium is needed for the export:
  `npx playwright install chromium`, or use the Playwright image below.
- On Kagiso's laptop (no Node on Windows), run every command below inside the Playwright
  container, from WSL `Ubuntu-22.04`, in the repo folder:

  ```sh
  cd /mnt/c/Users/ktjea/repos/agisano-website
  docker run --rm -it -p 3000:3000 -v "$PWD":/app -w /app mcr.microsoft.com/playwright:v1.61.1-noble bash
  ```

  The image tag must match the `playwright` version in `package-lock.json`.

## Add the photographs to a project (Engen as the example)

1. **Choose the photos.** In `lib/projects/engen.ts`, each slot's `label` describes the
   frame that slot wants. You need a hero, six gallery blocks (nine photos), a closing image,
   and three project-sheet supporting photos (they may repeat gallery photos). The project
   sheet sets those three in equal 3:2 landscape tiles, so landscape frames lose least.
2. **Copy the originals** into `assets/projects/engen/`, as the final edited, full-resolution
   files (JPEG, TIFF, PNG or WebP). This folder is git-ignored. Keep the originals backed up
   elsewhere too.
3. **Process them:**

   ```sh
   npm run project:images -- engen
   ```

   This writes `public/projects/engen/<name>-1200.jpg` and `<name>-2400.jpg` (sRGB, never
   upscaled), plus `manifest.json` with each photo's true size. Re-running it replaces
   everything in that folder.
4. **Point each slot at its photo.** In `lib/projects/engen.ts`, add `file` (the original's
   file name, exactly as it appears in `assets/projects/engen/`) and `alt` (what's in the
   photograph) to each slot:

   ```ts
   hero: {
     file: "DSC_0142.jpg",
     alt: "Guests gathered under the marquee as the programme opens",
     label: "Hero — the one frame that says what this event was",
     focus: "50% 40%", // where the crop centres; hero and project-sheet tiles only
   },
   ```

   Add `caption` only where it adds context. The build fails if a slot has a `file` but no
   `alt`.
5. **Replace every `[placeholder]`** with confirmed facts: the event name, the month, what the
   event was, the brief, what the photos were used for, the approach, the deliverables, and
   the project sheet's one-line `heading`.
   If a fact isn't known, delete the sentence rather than guess. If you have nothing specific
   to say about the approach, remove `approach` entirely and the section drops out.
6. **Build and export:**

   ```sh
   npm run build
   npm run project:export -- engen
   ```

   The export prints the page count and fails if any photo doesn't load.
7. **Check all three outputs.** Run `npm run dev -- -H 0.0.0.0` and open
   `http://localhost:3000/projects/engen` at desktop and phone widths (opening the built HTML
   file directly loses the fonts, which load from the site root). Stop the dev server, then
   open the two PDFs and the JPEG in `exports/projects/engen/`. Check
   for awkward pairings, crops that cut through faces (adjust `focus`), and highlighted text
   that's still there.
8. **Publish.** Set `status: "published"`, build again (it fails if anything is still
   open), and commit `lib/projects/engen.ts` with `public/projects/engen/`.

## Start a new project

1. Copy `lib/projects/engen.ts` to `lib/projects/<slug>.ts`. Rename the export and set
   `slug`. Use lowercase letters, digits and hyphens: the slug becomes the URL.
2. Register it in `PROJECTS` in `lib/projects/index.ts`.
3. Set `discipline`: `"photography"`, `"video"` or `"photography-and-video"`. This sets the
   gallery's heading.
4. Build the gallery from these blocks, in any order and number:

   | Block | What it does |
   |---|---|
   | `full` | One landscape at full width: the breath between sequences |
   | `inset` | One photo at about two-thirds width, `align: "left"` or `"right"`, with whitespace beside it |
   | `pair` | Two photos on one row at equal height. Widths follow their ratios, so nothing is cropped |
   | `feature` | A large `lead` and a smaller `support`, `side: "left"` or `"right"` |
   | `video` | A poster frame plus a `url` linking out to the film (no player is embedded), with an optional `duration` |

   Vary the blocks. A run of identical blocks reads as an automatic grid, not an edit.
5. Leave out what doesn't apply: `overview`, `approach`, `closing`, `next` (the web-only
   "Request a quote" line) and `rightsNote` are all optional, and section numbers close up
   behind them. Keep only the `details` rows that apply.
6. **Client logo (optional).** Put the client's logo, unaltered and on a transparent
   background, in `public/clients/<slug>.png` (not `public/projects/<slug>/`, which
   `project:images` replaces), and set
   `clientLogo: { src: "/clients/<slug>.png", alt: "<Client>", ratio: <width / height> }`.
   On the project sheet and the delivery summary the logo replaces the typed title, so the
   name isn't set twice.
7. Follow "Add the photographs" from step 2.

## Client delivery summary (private)

This is a one-page A4 handover for the client: what they asked for, what was delivered (with
counts), and when, to whom and how the files were sent. It names the client's people and how
the files were sent, so **it is never part of the public site**:

- The page is `app/projects/[slug]/delivery/page.private.tsx`. Next treats `.private.tsx`
  as a page only when the build runs with `CLIENT_DOCS=1` (see `next.config.ts`). A normal
  `npm run build`, and the GitHub Pages deploy, never builds it.
- **This repo is public.** The delivery data (recipient, download link, PIN) never goes in
  `lib/projects/`. It lives in `private/projects/<slug>.delivery.json`, which is
  git-ignored, and is read only by the private page. Back that folder up yourself: git
  won't.
- The PDF is written to `exports/`, which is also git-ignored.

To make one:

1. Create `private/projects/<slug>.delivery.json`. The fields are typed as `Delivery` in
   `lib/projects/types.ts`:

   ```json
   {
     "brief": ["What the client asked for, one point per line."],
     "items": [{ "count": "94", "label": "Edited photographs", "note": "Full-resolution JPEG" }],
     "date": "30 November 2026",
     "recipient": "Name, Company",
     "method": "Pixieset download gallery",
     "link": "https://…",
     "pin": "1234",
     "still": { "file": "photo.jpg", "alt": "…", "label": "…", "ratio": 1.7778 },
     "contactLine": "Questions about the files? Email hello@agisano.com."
   }
   ```

   `link`, `pin`, `formats`, `still` and `contactLine` are optional. The QR code is drawn
   from `link`, so it always matches. A `still` photo must also be in
   `assets/projects/<slug>/` and processed like the others. `[placeholders]` show
   highlighted until replaced, so clear them all before sending.
2. Build with the private page included, then export:

   ```sh
   npm run build:client
   npm run project:export -- engen
   ```

   This writes `exports/projects/engen/engen-delivery-summary.pdf` alongside the other
   exports.
3. **Run `npm run build` again afterwards**, so `out/` holds only the public site.
4. Check the PDF, then send it to the client yourself.

Placeholders in the delivery file don't block publishing the public case study. Only the client
ever sees that document.

## How the A4 pages are composed

`lib/projects/sheet.ts` measures each gallery block in millimetres from its photos' real
ratios and packs whole blocks onto pages. It never splits a block. A block that nearly fits
is shrunk (to no less than 80%) rather than left alone on a page. A page with a little spare
height spreads its blocks to the margins; a page with a lot centres them. The page geometry
is set in both `sheet.ts` and `app/projects/sheet.css`, so change the two together.
