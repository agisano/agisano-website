import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS, getProject, resolveImage, sectionNumbers, SECTION_LABELS } from "@/lib/projects";
import { composeSheet, CONTENT } from "@/lib/projects/sheet";
import ProjectImage from "@/components/project/ProjectImage";
import Txt from "@/components/project/Txt";
import { FlowBlock, Folio, Index, Kicker, PlacedImage, mm } from "@/components/project/SheetParts";
import "../../projects.css";
import "../../sheet.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  return {
    title: p ? `${p.title} — case study (A4)` : "Case study",
    robots: { index: false, follow: false },
  };
}

/** Short titles go monumental; long ones step down so they never take more than two lines. */
function coverTitleSize(title: string) {
  if (title.length <= 8) return "108pt";
  if (title.length <= 14) return "84pt";
  if (title.length <= 24) return "60pt";
  return "46pt";
}

/**
 * A4 portrait case study — the PDF source. Print it with tools/render-project.mjs.
 * Same content and order as the web page; the pages are composed in lib/projects/sheet.ts.
 */
export default async function SheetPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const pages = composeSheet(p);
  const n = sectionNumbers(p);
  const total = pages.length;
  const folio = `${p.title} — ${p.category}`;
  const hero = resolveImage(p.slug, p.hero);

  return (
    <div className="sheet-doc">
      {pages.map((page, i) => {
        const num = i + 1;

        if (page.kind === "cover") {
          return (
            <section key={i} className="sh-page sh-cover">
              <div className="sh-cover-hero">
                <ProjectImage r={hero} fit="cover" print showCaption={false} />
              </div>
              <div className="sh-cover-body">
                <Kicker items={[p.category, p.year]} />
                <h1 className="sh-title" style={{ fontSize: coverTitleSize(p.title) }}>
                  {p.title}
                </h1>
                <div className="sh-cover-foot">
                  <p className="sh-subtitle">
                    <Txt>{p.subtitle}</Txt>
                  </p>
                  <dl className="sh-meta">
                    <div>
                      <dt>Client</dt>
                      <dd>{p.client}</dd>
                    </div>
                    <div>
                      <dt>Location</dt>
                      <dd>{p.location}</dd>
                    </div>
                    <div>
                      <dt>Year</dt>
                      <dd>{p.year}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </section>
          );
        }

        if (page.kind === "flow") {
          return (
            <section key={i} className="sh-page sh-flow">
              <Folio left={folio} page={num} total={total} />
              <div
                className="sh-content"
                style={{
                  height: mm(CONTENT.h),
                  justifyContent: page.justify,
                  gap: mm(page.gap),
                }}
              >
                {page.blocks.map((b, j) => (
                  <div key={j} className="sh-block">
                    {b.labelled ? <Index n={n("gallery")} label={SECTION_LABELS[p.discipline]} /> : null}
                    <FlowBlock b={b} overviewN={n("overview")} />
                  </div>
                ))}
              </div>
            </section>
          );
        }

        if (page.kind === "text") {
          return (
            <section key={i} className="sh-page sh-text">
              <Folio left={folio} page={num} total={total} />
              <div className="sh-content" style={{ height: mm(CONTENT.h) }}>
                {p.approach?.length ? (
                  <div className="sh-split">
                    <Index n={n("approach")} label="Approach" />
                    <div>
                      {p.approach.map((t, k) => (
                        <p key={k} className="sh-body">
                          <Txt>{t}</Txt>
                        </p>
                      ))}
                    </div>
                  </div>
                ) : null}
                {p.details.length ? (
                  <div className="sh-split sh-details-wrap">
                    <Index n={n("details")} label="Project details" />
                    <div>
                      <dl className="sh-details">
                        {p.details.map((d) => (
                          <div key={d.label}>
                            <dt>{d.label}</dt>
                            <dd>
                              <Txt>{d.value}</Txt>
                            </dd>
                          </div>
                        ))}
                      </dl>
                      {p.rightsNote ? <p className="sh-rights">{p.rightsNote}</p> : null}
                    </div>
                  </div>
                ) : null}
                {page.closing ? (
                  <div className="sh-split">
                    <div />
                    <PlacedImage p={page.closing} />
                  </div>
                ) : null}
              </div>
            </section>
          );
        }

        return (
          <section key={i} className="sh-page sh-closing">
            <Folio left={folio} page={num} total={total} />
            <div className="sh-content" style={{ height: mm(CONTENT.h), justifyContent: "center", alignItems: "center" }}>
              <PlacedImage p={page.image} />
            </div>
          </section>
        );
      })}
    </div>
  );
}
