import type { GalleryBlock, Project, Resolved } from "./index";
import { resolveImage } from "./index";

/**
 * A4 composition for the PDF case study — everything in millimetres.
 *
 * The browser's own page breaking would split photographs and strand captions, so
 * the pages are composed here instead: each gallery block is measured from its
 * photos' real ratios, then blocks are packed into pages whole. A block is never
 * split, a photo is never cropped, and a block too tall for a page is scaled down
 * as a unit rather than cut.
 */

export const A4 = { w: 210, h: 297 };
export const M = { side: 16, top: 24, bottom: 16 };
export const CONTENT = { w: A4.w - M.side * 2, h: A4.h - M.top - M.bottom };

const BLOCK_GAP = 10;
const ROW_GAP = 4;
const CAPTION = 7;

export type Placed = { r: Resolved; w: number; h: number };

const GALLERY_LABEL = 12;

type Labelled = { labelled?: boolean };
export type SheetBlock = Labelled &
  (
    | { kind: "row"; items: Placed[]; gap: number; align: "left" | "center" | "right"; valign: "start" | "end"; h: number }
    | { kind: "video"; poster: Placed; title: string; url?: string; duration?: string; h: number }
    | { kind: "overview"; paragraphs: string[]; h: number }
  );

export type SheetPage =
  | { kind: "cover" }
  | { kind: "flow"; blocks: SheetBlock[]; justify: "start" | "center" | "space-between"; gap: number }
  /** Approach and details; the closing photograph sits at its foot when there's room. */
  | { kind: "text"; closing?: Placed }
  | { kind: "closing"; image: Placed };

/** The right-hand column of a split (index | content) layout: 178 − 52 − 8. */
export const SPLIT_COL = CONTENT.w - 52 - 8;
/** Minimum space between the sections of the text page. */
export const TEXT_GAP = 12;

function capH(items: Placed[], max: number) {
  const h = Math.max(...items.map((i) => i.h));
  if (h <= max) return items;
  const k = max / h;
  return items.map((i) => ({ ...i, w: i.w * k, h: i.h * k }));
}

function withCaption(items: Placed[]) {
  return items.some((i) => i.r.caption) ? CAPTION : 0;
}

export function measure(slug: string, b: GalleryBlock): SheetBlock {
  const W = CONTENT.w;
  const maxH = CONTENT.h - CAPTION;

  if (b.kind === "full" || b.kind === "inset") {
    const r = resolveImage(slug, b.image);
    const w = b.kind === "full" ? W : W * 0.66;
    const items = capH([{ r, w, h: w / r.ratio }], maxH);
    const align = b.kind === "full" ? "center" : (b.align ?? "right");
    return { kind: "row", items, gap: 0, align, valign: "start", h: items[0].h + withCaption(items) };
  }

  if (b.kind === "pair") {
    const rs = b.images.map((s) => resolveImage(slug, s));
    const h = (W - ROW_GAP) / (rs[0].ratio + rs[1].ratio);
    const items = capH(
      rs.map((r) => ({ r, w: h * r.ratio, h })),
      maxH,
    );
    return { kind: "row", items, gap: ROW_GAP, align: "center", valign: "start", h: items[0].h + withCaption(items) };
  }

  if (b.kind === "feature") {
    const lead = resolveImage(slug, b.lead);
    const support = resolveImage(slug, b.support);
    const lw = W * 0.6;
    const sw = W * 0.34;
    let items: Placed[] = [
      { r: lead, w: lw, h: lw / lead.ratio },
      { r: support, w: sw, h: sw / support.ratio },
    ];
    if ((b.side ?? "left") === "right") items = items.reverse();
    items = capH(items, maxH);
    const h = Math.max(...items.map((i) => i.h));
    return { kind: "row", items, gap: W * 0.06, align: "left", valign: "end", h: h + withCaption(items) };
  }

  const r = resolveImage(slug, b.poster);
  const [poster] = capH([{ r, w: W, h: W / r.ratio }], maxH - 14);
  return { kind: "video", poster, title: b.title, url: b.url, duration: b.duration, h: poster.h + 14 };
}

/** Smallest a block may be shrunk to pull it onto the page before it. */
const MIN_SHRINK = 0.8;
/** Gap between blocks on a page that has room to spare. */
const OPEN_GAP = 18;
/** Leftover height (mm) a page can absorb by spreading its blocks to the margins. */
const SPREAD_MAX = 40;

function imageHeight(b: SheetBlock) {
  if (b.kind === "row") return Math.max(...b.items.map((i) => i.h));
  if (b.kind === "video") return b.poster.h;
  return 0;
}

function fitScale(b: SheetBlock, space: number) {
  const img = imageHeight(b);
  if (!img) return 0;
  return Math.min(1, (space - (b.h - img)) / img);
}

function scaleBlock(b: SheetBlock, k: number): SheetBlock {
  const img = imageHeight(b);
  const h = img * k + (b.h - img);
  const s = (p: Placed) => ({ ...p, w: p.w * k, h: p.h * k });
  if (b.kind === "row") return { ...b, items: b.items.map(s), h };
  if (b.kind === "video") return { ...b, poster: s(b.poster), h };
  return b;
}

/**
 * How a page uses its spare height. A lone block is centred and allowed to
 * breathe. A page opening with the overview reads from the top. Otherwise a
 * little spare height spreads the blocks to the margins; a lot groups them in
 * the middle, so no page has a hole torn through it.
 */
function arrange(blocks: SheetBlock[]): { justify: "start" | "center" | "space-between"; gap: number } {
  if (blocks.length === 1) return { justify: "center", gap: 0 };
  const spare = CONTENT.h - blocks.reduce((a, b) => a + b.h, 0) - BLOCK_GAP * (blocks.length - 1);
  // The overview reads from the top, and the photographs follow straight after it.
  if (blocks[0].kind === "overview") return { justify: "start", gap: spare > SPREAD_MAX ? OPEN_GAP : BLOCK_GAP };
  if (spare <= SPREAD_MAX) return { justify: "space-between", gap: BLOCK_GAP };
  return { justify: "center", gap: OPEN_GAP };
}

/** Rough height of the overview block — generous, so text never overruns the photo below it. */
function overviewHeight(paragraphs: string[]) {
  const label = 14;
  let h = label;
  paragraphs.forEach((p, i) => {
    const charsPerLine = i === 0 ? 50 : 66;
    const line = i === 0 ? 7 : 5.4;
    h += Math.ceil((p.length * 1.12) / charsPerLine) * line + 5;
  });
  return h;
}

export function composeSheet(p: Project): SheetPage[] {
  const pages: SheetPage[] = [{ kind: "cover" }];

  let current: SheetBlock[] = [];
  let used = 0;
  const flush = () => {
    if (current.length) pages.push({ kind: "flow", blocks: current, ...arrange(current) });
    current = [];
    used = 0;
  };
  const place = (b: SheetBlock) => {
    const gap = current.length ? BLOCK_GAP : 0;
    if (current.length && used + gap + b.h > CONTENT.h) {
      // Nearly fits: shrink it as a whole rather than strand it on a page of its own.
      const k = fitScale(b, CONTENT.h - used - gap);
      if (k >= MIN_SHRINK) b = scaleBlock(b, k);
      else flush();
    }
    used += (current.length ? BLOCK_GAP : 0) + b.h;
    current.push(b);
  };

  if (p.overview?.length) {
    place({ kind: "overview", paragraphs: p.overview, h: overviewHeight(p.overview) });
  }
  p.gallery.forEach((b, i) => {
    const m = measure(p.slug, b);
    // The first gallery block carries the section index above it.
    if (i === 0) place({ ...m, h: m.h + GALLERY_LABEL, labelled: true });
    else place(m);
  });
  flush();

  const hasText = Boolean(p.approach?.length || p.details.length);
  const closing = p.closing ? resolveImage(p.slug, p.closing) : undefined;

  // The closing photograph shares the text page, aligned to the text column, when it
  // can be shown at a decent size. Otherwise it gets a page of its own.
  if (hasText && closing) {
    const free = CONTENT.h - textHeight(p) - TEXT_GAP;
    const w = Math.min(SPLIT_COL, free * closing.ratio);
    if (w >= SPLIT_COL * 0.75) {
      pages.push({ kind: "text", closing: { r: closing, w, h: w / closing.ratio } });
      return pages;
    }
  }
  if (hasText) pages.push({ kind: "text" });
  if (closing) {
    const w = CONTENT.w * 0.86;
    const [image] = capH([{ r: closing, w, h: w / closing.ratio }], CONTENT.h * 0.8);
    pages.push({ kind: "closing", image });
  }
  return pages;
}

/** Generous estimate of the approach and details height, so the photo below never collides. */
function textHeight(p: Project) {
  const line = 5.5; // 10pt at 1.55
  let h = 0;
  if (p.approach?.length) {
    for (const t of p.approach) h += Math.ceil((t.length * 1.12) / 60) * line + 3;
    h += TEXT_GAP;
  }
  if (p.details.length) {
    const colChars = 28; // each of the two detail columns, at 10pt
    for (let i = 0; i < p.details.length; i += 2) {
      const lines = Math.max(
        ...p.details.slice(i, i + 2).map((d) => Math.ceil((d.value.length * 1.1) / colChars)),
      );
      h += 9.5 + lines * 5.3; // padding, label and its gap, value lines
    }
    if (p.rightsNote) h += 9;
  }
  return h;
}

