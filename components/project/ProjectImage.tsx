import type { CSSProperties } from "react";
import type { Resolved } from "@/lib/projects";

/**
 * A case-study photograph, in its ORIGINAL colour.
 *
 * Deliberately not `components/Photo.tsx`: that slot applies the site's duotone,
 * which is right for the marketing pages and wrong for portfolio work — a client's
 * photographs are shown as delivered. No filter, no blend, no overlay.
 *
 * fit="natural" (default): the box takes the photo's own ratio, so nothing is cropped.
 * fit="cover": the parent sets the box and the photo fills it from `focus` — used only
 *   where a crop is an intentional decision (the hero, and the project sheet's hero and tiles).
 *
 * Without a processed file it renders a labelled placeholder at the slot's ratio.
 */
export default function ProjectImage({
  r,
  fit = "natural",
  sizes = "100vw",
  print = false,
  eager = false,
  className = "",
  style,
  showCaption = true,
}: {
  r: Resolved;
  fit?: "natural" | "cover";
  sizes?: string;
  /** Print documents use the largest rendition and never lazy-load. */
  print?: boolean;
  eager?: boolean;
  className?: string;
  style?: CSSProperties;
  showCaption?: boolean;
}) {
  const box: CSSProperties = fit === "natural" ? { aspectRatio: String(r.ratio), ...style } : { ...style };

  return (
    <figure className={`pimg pimg-${fit} ${className}`}>
      <div className="pimg-box" style={box}>
        {r.placeholder ? (
          <div className="pimg-ph" role="img" aria-label={`Photograph to come: ${r.label}`}>
            <span className="pimg-ph-tag">Photograph to come</span>
            <span className="pimg-ph-label">{r.label}</span>
            <span className="pimg-ph-ratio">{ratioName(r.ratio)}</span>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={print ? r.srcLarge : r.src}
            srcSet={print ? undefined : r.srcSet}
            sizes={print ? undefined : sizes}
            alt={r.alt}
            loading={print || eager ? "eager" : "lazy"}
            decoding="async"
            className="pimg-img"
            style={r.focus ? { objectPosition: r.focus } : undefined}
          />
        )}
      </div>
      {showCaption && r.caption ? <figcaption className="pimg-cap">{r.caption}</figcaption> : null}
    </figure>
  );
}

function ratioName(ratio: number) {
  const known: [number, string][] = [
    [3 / 2, "3:2 landscape"],
    [2 / 3, "2:3 portrait"],
    [4 / 5, "4:5 portrait"],
    [5 / 4, "5:4 landscape"],
    [16 / 9, "16:9 landscape"],
    [1, "1:1 square"],
    [4 / 3, "4:3 landscape"],
    [3 / 4, "3:4 portrait"],
  ];
  const hit = known.find(([v]) => Math.abs(v - ratio) < 0.01);
  if (hit) return hit[1];
  return `${ratio.toFixed(2)}:1 ${ratio >= 1 ? "landscape" : "portrait"}`;
}
