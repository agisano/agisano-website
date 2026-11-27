import type { CSSProperties } from "react";
import type { Placed, SheetBlock } from "@/lib/projects/sheet";
import ProjectImage from "./ProjectImage";
import Txt from "./Txt";

/** Shared pieces of the print documents (A4 case study and project sheet). Static: no motion. */

export const mm = (v: number) => `${v.toFixed(2)}mm`;

export function PlacedImage({ p, style }: { p: Placed; style?: CSSProperties }) {
  return (
    <div style={{ width: mm(p.w), ...style }}>
      <ProjectImage r={p.r} print style={{ height: mm(p.h) }} />
    </div>
  );
}

export function Folio({ left, page, total }: { left: string; page: number; total: number }) {
  return (
    <div className="sh-folio">
      <span>{left}</span>
      <span className="sh-folio-n">
        {String(page).padStart(2, "0")} <span className="sh-folio-of">/ {String(total).padStart(2, "0")}</span>
      </span>
    </div>
  );
}

export function Kicker({ items }: { items: string[] }) {
  return (
    <p className="sh-kicker">
      {items.map((t, i) => (
        <span key={i}>
          {i > 0 ? <span aria-hidden="true" className="sh-kicker-rule" /> : null}
          {t}
        </span>
      ))}
    </p>
  );
}

export function Index({ n, label }: { n: string; label: string }) {
  return (
    <p className="sh-index">
      <span className="sh-index-n">{n}</span>
      <span className="sh-index-rule" aria-hidden="true" />
      <span>{label}</span>
    </p>
  );
}

export function FlowBlock({ b, overviewN }: { b: SheetBlock; overviewN: string }) {
  if (b.kind === "overview") {
    return (
      <div className="sh-overview">
        <Index n={overviewN} label="Overview" />
        <div className="sh-overview-text">
          {b.paragraphs.map((t, i) => (
            <p key={i} className={i === 0 ? "sh-lead" : "sh-body"}>
              <Txt>{t}</Txt>
            </p>
          ))}
        </div>
      </div>
    );
  }
  if (b.kind === "video") {
    return (
      <div>
        <PlacedImage p={b.poster} />
        <p className="sh-video-meta">
          <span className="sh-label">Film</span> {b.title}
          {b.duration ? ` · ${b.duration}` : ""}
          {b.url ? <span className="sh-video-url"> — {b.url.replace(/^https?:\/\//, "")}</span> : null}
        </p>
      </div>
    );
  }
  const justify = b.align === "left" ? "flex-start" : b.align === "right" ? "flex-end" : "center";
  return (
    <div
      className="sh-row"
      style={{
        gap: mm(b.gap),
        justifyContent: justify,
        alignItems: b.valign === "end" ? "flex-end" : "flex-start",
      }}
    >
      {b.items.map((p, i) => (
        <PlacedImage key={i} p={p} />
      ))}
    </div>
  );
}
