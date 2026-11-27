import fs from "node:fs";
import path from "node:path";
import type { ImageSlot, Project } from "./types";
import { ENGEN } from "./engen";

export type { Project, ImageSlot, GalleryBlock, Detail, Delivery } from "./types";

/** Every project, in the order they should be listed. Add new ones here. */
export const PROJECTS: Project[] = [ENGEN];

export function getProject(slug: string): Project | undefined {
  const p = PROJECTS.find((x) => x.slug === slug);
  if (p) {
    assertNoRepeats(p);
    if (p.status === "published") assertFinished(p);
  }
  return p;
}

/** A published project may not carry a [placeholder] or a photo slot still waiting for its photograph. */
function assertFinished(p: Project) {
  const open = JSON.stringify(p).match(/\[[^\]"]+\]/g);
  if (open) throw new Error(`Project "${p.slug}" is published but still has placeholders: ${open.join(", ")}`);
  const slots = [...caseStudySlots(p), ...p.onePager.picks];
  const missing = slots.filter((s) => resolveImage(p.slug, s).placeholder).map((s) => s.label);
  if (missing.length) throw new Error(`Project "${p.slug}" is published but has no photo for: ${missing.join("; ")}`);
}

/** Every photo appears once in the case study. A repeat to fill a layout fails the build. */
function assertNoRepeats(p: Project) {
  const files = caseStudySlots(p)
    .map((s) => s.file)
    .filter(Boolean);
  const seen = new Set<string>();
  for (const f of files) {
    if (seen.has(f!)) throw new Error(`Project "${p.slug}": "${f}" is used twice in the case study.`);
    seen.add(f!);
  }
}

function caseStudySlots(p: Project): ImageSlot[] {
  const out: ImageSlot[] = [p.hero];
  for (const b of p.gallery) {
    if (b.kind === "full" || b.kind === "inset") out.push(b.image);
    else if (b.kind === "pair") out.push(...b.images);
    else if (b.kind === "feature") out.push(b.lead, b.support);
    else out.push(b.poster);
  }
  if (p.closing) out.push(p.closing);
  return out;
}

export const SECTION_LABELS: Record<Project["discipline"], string> = {
  photography: "The photographs",
  video: "The film",
  "photography-and-video": "The work",
};

/**
 * A slot resolved against the processed images.
 * `tools/project-images.mjs` writes `public/projects/<slug>/manifest.json`, keyed by the
 * original file name, with each photo's true pixel size and its web renditions. A slot
 * whose file is not in the manifest (or has no file yet) resolves as a placeholder.
 */
export type Resolved = {
  placeholder: boolean;
  label: string;
  alt: string;
  /** width / height — the photo's own, or the slot's placeholder shape. */
  ratio: number;
  caption?: string;
  focus?: string;
  src?: string;
  srcSet?: string;
  /** Largest rendition: used by the PDF so print stays sharp. */
  srcLarge?: string;
};

type ManifestEntry = { w: number; h: number; sizes: Record<string, string> };
type Manifest = Record<string, ManifestEntry>;

const manifests = new Map<string, Manifest>();

function manifestFor(slug: string): Manifest {
  const hit = manifests.get(slug);
  if (hit) return hit;
  const file = path.join(process.cwd(), "public", "projects", slug, "manifest.json");
  let m: Manifest = {};
  if (fs.existsSync(file)) m = JSON.parse(fs.readFileSync(file, "utf8")) as Manifest;
  manifests.set(slug, m);
  return m;
}

export function resolveImage(slug: string, slot: ImageSlot): Resolved {
  const entry = slot.file ? manifestFor(slug)[slot.file] : undefined;
  const base = {
    label: slot.label,
    caption: slot.caption,
    focus: slot.focus,
  };
  if (!entry) {
    return { ...base, placeholder: true, alt: "", ratio: slot.ratio ?? 3 / 2 };
  }
  if (!slot.alt) {
    throw new Error(`Project "${slug}": photo "${slot.file}" needs alt text.`);
  }
  const widths = Object.keys(entry.sizes)
    .map(Number)
    .sort((a, b) => a - b);
  const largest = entry.sizes[String(widths[widths.length - 1])];
  return {
    ...base,
    placeholder: false,
    alt: slot.alt,
    ratio: entry.w / entry.h,
    src: entry.sizes[String(widths[0])],
    srcSet: widths.map((w) => `${entry.sizes[String(w)]} ${w}w`).join(", "),
    srcLarge: largest,
  };
}

/** Section numbers follow the sections actually shown, so hiding one never leaves a gap. */
export function sectionNumbers(p: Project) {
  const order: string[] = [];
  if (p.overview?.length) order.push("overview");
  order.push("gallery");
  if (p.approach?.length) order.push("approach");
  if (p.details.length) order.push("details");
  const n = (key: string) => String(order.indexOf(key) + 1).padStart(2, "0");
  return n;
}
