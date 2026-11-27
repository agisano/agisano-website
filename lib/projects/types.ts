/**
 * Project case studies — the content model.
 *
 * A project is data, not markup. One file per project in `lib/projects/`, registered
 * in `lib/projects/index.ts`. The same data renders three ways:
 *   /projects/<slug>            the web case study (responsive, inside the site)
 *   /projects/<slug>/sheet      the A4 portrait case study (PDF source)
 *   /projects/<slug>/project-sheet  the one-page A4 editorial project sheet (email, Behance)
 *
 * BINDING (agisano-brand, plus lib/content.ts MEDIA rules):
 *  - Never invent a fact. Anything not confirmed stays a visible [placeholder] in
 *    square brackets; the renderer highlights it so it cannot ship unnoticed.
 *  - No scale claims, no client counts, no "years of experience" for media.
 *    A case study describes this one job, as it happened.
 *  - Photographs are shown in their original colour, never graded, never
 *    stretched, never duplicated to fill a layout. No stock, no generated images.
 *  - No studio tagline and no brand-footer lockup. Agisano is credited once, in the
 *    details ("Photography — Agisano").
 */

/** One photograph slot. Without a processed file it renders as a labelled placeholder. */
export type ImageSlot = {
  /** Original file name in `assets/projects/<slug>/` (e.g. "hero.jpg"). Leave unset until chosen. */
  file?: string;
  /** What this slot is for. Shown on the placeholder; a guide for picking the photo. */
  label: string;
  /** Alt text. Required once `file` is set — describe what is in the photograph. */
  alt?: string;
  /** Placeholder shape only (width / height). A real photo always uses its own ratio. */
  ratio?: number;
  /** Optional caption. Use only where it adds context — never caption every photo. */
  caption?: string;
  /** CSS object-position for slots that crop (hero, cover), e.g. "50% 30%". */
  focus?: string;
};

export type GalleryBlock =
  /** Full-width landscape: the breath between sequences. */
  | { kind: "full"; image: ImageSlot }
  /** One image at about two-thirds width, set left or right, with whitespace beside it. */
  | { kind: "inset"; image: ImageSlot; align?: "left" | "right" }
  /** Two images on one row at equal height — widths follow their ratios, nothing is cropped. */
  | { kind: "pair"; images: [ImageSlot, ImageSlot] }
  /** A large lead image with a smaller supporting one beside it. */
  | { kind: "feature"; lead: ImageSlot; support: ImageSlot; side?: "left" | "right" }
  /** A film: poster frame plus a link out. No third-party player is embedded. */
  | { kind: "video"; poster: ImageSlot; title: string; url?: string; duration?: string };

export type Detail = { label: string; value: string };

export type Project = {
  slug: string;
  /** "draft" pages are built but kept out of the sitemap and marked noindex. */
  status: "draft" | "published";
  discipline: "photography" | "video" | "photography-and-video";

  title: string;
  category: string;
  subtitle: string;
  client: string;
  location: string;
  year: string;

  hero: ImageSlot;
  /** Section 02. One or two short paragraphs, 60–100 words in total. Optional. */
  overview?: string[];
  gallery: GalleryBlock[];
  /** Section 04. Specific to this job, or left out. Optional. */
  approach?: string[];
  /** Section 05. Only the fields that apply. */
  details: Detail[];
  closing?: ImageSlot;

  /** The A4 editorial project sheet — one page (email, Behance, portfolio). */
  onePager: {
    /** One short line above the summary. Optional. */
    heading?: string;
    /** 40–70 words. Defaults to the first overview paragraph. */
    summary?: string;
    /**
     * Exactly three supporting photographs. They sit in equal 3:2 tiles, so each is
     * cropped from its `focus` — landscape frames lose least.
     */
    picks: [ImageSlot, ImageSlot, ImageSlot];
    /** Which details to show (by label), beside the summary. Defaults to the first four. */
    details?: string[];
  };

  /** Web only: the quiet next step after the closing image. Omit to hide it. */
  next?: { line: string; label: string; href: string };
  /** Web only: rights note under the details. */
  rightsNote?: string;
};

/**
 * The client delivery summary — a PRIVATE one-page A4 for the client: what was asked,
 * what was delivered, and when and how it was sent.
 *
 * This repo is PUBLIC. Delivery data names the client's people and carries the download
 * link and PIN, so it never lives in lib/projects/. It is read at build time from the
 * git-ignored `private/projects/<slug>.delivery.json` (see lib/projects/delivery.ts and
 * docs/projects.md), and only by the CLIENT_DOCS=1 build.
 */
export type Delivery = {
  /** What the client asked for, one point per line. */
  brief: string[];
  /** What was handed over. `count` is shown large; keep it a real number. */
  items: { count: string; label: string; note?: string }[];
  /** Delivery date as it should read, e.g. "30 November 2026". */
  date: string;
  /** Who received the files. */
  recipient: string;
  /** How the files were sent, e.g. "Pixieset download gallery". */
  method: string;
  /** The download link. Also rendered as a QR code. */
  link?: string;
  /** Download PIN, if the gallery has one. */
  pin?: string;
  /** File formats, if not already in the item notes. */
  formats?: string;
  /** A still that sets the scene: for a drone job, a frame from the establishing shot. */
  still?: ImageSlot;
  /** Closing line: who to contact about the files. */
  contactLine?: string;
};
