import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PROJECTS, getProject, resolveImage, sectionNumbers, SECTION_LABELS } from "@/lib/projects";
import ProjectImage from "@/components/project/ProjectImage";
import Gallery from "@/components/project/Gallery";
import Txt from "@/components/project/Txt";
import SectionIndex from "@/components/SectionIndex";
import { Fade } from "@/components/motion/Reveal";
import "../projects.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.title} — ${p.category} — Agisano`,
    description: `${p.title}: ${p.category.toLowerCase()} in ${p.location}, ${p.year}. Photographed by Agisano.`,
    alternates: { canonical: `/projects/${p.slug}` },
    robots: p.status === "draft" ? { index: false, follow: false } : undefined,
  };
}

/**
 * The web case study. Paper throughout, so the photographs carry the colour.
 * Order: title → hero → overview → photographs → approach → details → closing.
 * Optional sections drop out and the numbering closes up behind them.
 */
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const n = sectionNumbers(p);
  const hero = resolveImage(p.slug, p.hero);
  const closing = p.closing ? resolveImage(p.slug, p.closing) : undefined;

  return (
    <article className="page project">
      {/* 01 — Title */}
      <header className="shell pj-head">
        <p className="t-label pj-kicker">
          <span>{p.category}</span>
          <span aria-hidden="true" className="pj-kicker-rule" />
          <span>{p.year}</span>
        </p>
        <h1 className="pj-title">{p.title}</h1>
        <div className="pj-head-foot">
          <p className="t-lead pretty pj-subtitle">
            <Txt>{p.subtitle}</Txt>
          </p>
          <dl className="pj-meta">
            <div>
              <dt className="t-label">Client</dt>
              <dd>{p.client}</dd>
            </div>
            <div>
              <dt className="t-label">Location</dt>
              <dd>{p.location}</dd>
            </div>
            <div>
              <dt className="t-label">Year</dt>
              <dd>{p.year}</dd>
            </div>
          </dl>
        </div>
      </header>

      <ProjectImage r={hero} eager className="pj-hero" sizes="100vw" />

      {/* Overview */}
      {p.overview?.length ? (
        <section className="section pj-text-section" aria-labelledby="pj-overview">
          <div className="shell pj-split">
            <div>
              <SectionIndex n={n("overview")} label="Overview" />
              <h2 id="pj-overview" className="sr-only">
                Overview
              </h2>
            </div>
            <Fade className="pj-prose pj-prose-lead">
              {p.overview.map((para, i) => (
                <p key={i} className={i === 0 ? "t-lead pretty" : "t-body pretty"}>
                  <Txt>{para}</Txt>
                </p>
              ))}
            </Fade>
          </div>
        </section>
      ) : null}

      {/* The photographs */}
      <section className="pj-gallery-section" aria-labelledby="pj-gallery">
        <div className="shell">
          <SectionIndex n={n("gallery")} label={SECTION_LABELS[p.discipline]} />
          <h2 id="pj-gallery" className="sr-only">
            {SECTION_LABELS[p.discipline]}
          </h2>
        </div>
        <Gallery slug={p.slug} blocks={p.gallery} />
      </section>

      {/* Approach */}
      {p.approach?.length ? (
        <section className="section pj-text-section" aria-labelledby="pj-approach">
          <div className="shell pj-split">
            <div>
              <SectionIndex n={n("approach")} label="Approach" />
              <h2 id="pj-approach" className="sr-only">
                Approach
              </h2>
            </div>
            <Fade className="pj-prose">
              {p.approach.map((para, i) => (
                <p key={i} className="t-body pretty">
                  <Txt>{para}</Txt>
                </p>
              ))}
            </Fade>
          </div>
        </section>
      ) : null}

      {/* Details */}
      {p.details.length ? (
        <section className="section pj-details-section" aria-labelledby="pj-details">
          <div className="shell pj-split">
            <div>
              <SectionIndex n={n("details")} label="Project details" />
              <h2 id="pj-details" className="sr-only">
                Project details
              </h2>
            </div>
            <div>
              <dl className="pj-details">
                {p.details.map((d) => (
                  <div key={d.label} className="pj-detail">
                    <dt className="t-label">{d.label}</dt>
                    <dd>
                      <Txt>{d.value}</Txt>
                    </dd>
                  </div>
                ))}
              </dl>
              {p.rightsNote ? <p className="t-small pj-rights">{p.rightsNote}</p> : null}
            </div>
          </div>
        </section>
      ) : null}

      {/* Closing image — nothing on it, room around it */}
      {closing ? (
        <div className="pj-closing shell">
          <ProjectImage r={closing} sizes="(min-width: 760px) 84vw, 100vw" />
        </div>
      ) : null}

      {p.next ? (
        <aside className="shell pj-next">
          <p className="t-h2 balance">{p.next.line}</p>
          <Link href={p.next.href} className="btn btn-primary">
            {p.next.label}
          </Link>
        </aside>
      ) : null}
    </article>
  );
}
