import type { GalleryBlock } from "@/lib/projects";
import { resolveImage } from "@/lib/projects";
import ProjectImage from "./ProjectImage";
import { Fade } from "@/components/motion/Reveal";

/**
 * The web gallery. Each block is a composition, not a grid cell — sizes and
 * positions vary on purpose so the sequence reads as edited, not generated.
 * Nothing is cropped: pairs share a height by giving each photo a width in
 * proportion to its own ratio (flex-grow = width / height).
 */
export default function Gallery({ slug, blocks }: { slug: string; blocks: GalleryBlock[] }) {
  return (
    <div className="pg">
      {blocks.map((b, i) => (
        <Fade key={i} className={`pg-block pg-${b.kind}`} amount={0.12}>
          <Block slug={slug} b={b} />
        </Fade>
      ))}
    </div>
  );
}

function Block({ slug, b }: { slug: string; b: GalleryBlock }) {
  switch (b.kind) {
    case "full":
      return <ProjectImage r={resolveImage(slug, b.image)} sizes="100vw" />;

    case "inset":
      return (
        <div className={`pg-inset-wrap shell align-${b.align ?? "right"}`}>
          <ProjectImage r={resolveImage(slug, b.image)} sizes="(min-width: 760px) 66vw, 100vw" />
        </div>
      );

    case "pair": {
      const [a, c] = b.images.map((s) => resolveImage(slug, s));
      return (
        <div className="pg-row shell">
          {[a, c].map((r, i) => (
            <div key={i} className="pg-cell" style={{ flexGrow: r.ratio }}>
              <ProjectImage r={r} sizes="(min-width: 760px) 50vw, 100vw" />
            </div>
          ))}
        </div>
      );
    }

    case "feature": {
      const lead = resolveImage(slug, b.lead);
      const support = resolveImage(slug, b.support);
      return (
        <div className={`pg-feature-grid shell side-${b.side ?? "left"}`}>
          <div className="pg-feature-lead">
            <ProjectImage r={lead} sizes="(min-width: 760px) 58vw, 100vw" />
          </div>
          <div className="pg-feature-support">
            <ProjectImage r={support} sizes="(min-width: 760px) 34vw, 100vw" />
          </div>
        </div>
      );
    }

    case "video": {
      const poster = resolveImage(slug, b.poster);
      return (
        <div className="pg-video shell">
          {b.url ? (
            <a href={b.url} className="pg-video-link" target="_blank" rel="noopener noreferrer">
              <ProjectImage r={poster} sizes="100vw" />
            </a>
          ) : (
            <ProjectImage r={poster} sizes="100vw" />
          )}
          <p className="pg-video-meta">
            <span className="t-label">Film</span>
            <span className="pg-video-title">{b.title}</span>
            {b.duration ? <span className="pg-video-dur">{b.duration}</span> : null}
            {b.url ? (
              <a href={b.url} className="link-draw" target="_blank" rel="noopener noreferrer">
                Watch the film<span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : null}
          </p>
        </div>
      );
    }
  }
}
