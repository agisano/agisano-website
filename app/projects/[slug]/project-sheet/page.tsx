import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS, getProject, resolveImage } from "@/lib/projects";
import ProjectImage from "@/components/project/ProjectImage";
import Txt from "@/components/project/Txt";
import Mark from "@/components/Mark";
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
    title: p ? `${p.title} — project sheet (A4)` : "Project sheet",
    robots: { index: false, follow: false },
  };
}

/**
 * The A4 editorial project sheet — one page, for email, Behance and the portfolio.
 * Layout from Kagiso's reference (2026-11-27), held to the brand rules:
 *  - the real mark and lowercase wordmark, no descriptor beside them (no lockup);
 *  - no project number and no "selected projects": nothing that counts the work.
 *
 * The page is a stack of rows on a grid. The hero takes whatever height is left, so a
 * longer summary shrinks the hero — text can never run under the photographs.
 */
export default async function ProjectSheetPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const hero = resolveImage(p.slug, p.hero);
  const picks = p.onePager.picks.map((s) => resolveImage(p.slug, s));
  const summary = p.onePager.summary ?? p.overview?.[0] ?? "";
  const wanted = p.onePager.details ?? p.details.slice(0, 4).map((d) => d.label);
  const details = wanted
    .map((label) => p.details.find((d) => d.label === label))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));
  const projectName = p.details.find((d) => d.label === "Project")?.value;

  return (
    <div className="sheet-doc">
      <section className="sh-page ops">
        <header className="ops-top">
          <span className="ops-brand">
            <Mark size={15} dot="#0E4F55" />
            <span className="wordmark">agisano</span>
          </span>
          <span className="ops-label">Media / Case study</span>
        </header>

        <div className="ops-head">
          {projectName ? (
            <p className="ops-label ops-kicker">
              <Txt>{projectName}</Txt>
            </p>
          ) : null}
          <h1 className="ops-title">{p.title}</h1>
          <div className="ops-head-row">
            <p className="ops-category">{p.category}</p>
            <p className="ops-label ops-place">
              {p.location} / {p.year}
            </p>
          </div>
        </div>

        <div className="ops-hero ops-round">
          <ProjectImage r={hero} fit="cover" print showCaption={false} />
        </div>

        <div className="ops-project">
          <div>
            <p className="ops-label ops-section">The project</p>
            {p.onePager.heading ? (
              <h2 className="ops-heading">
                <Txt>{p.onePager.heading}</Txt>
              </h2>
            ) : null}
            {summary ? (
              <p className="ops-summary">
                <Txt>{summary}</Txt>
              </p>
            ) : null}
          </div>
          <dl className="ops-details">
            {details.map((d) => (
              <div key={d.label}>
                <dt className="ops-label">{d.label}</dt>
                <dd>
                  <Txt>{d.value}</Txt>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="ops-tiles">
          {picks.map((r, i) => (
            <div key={i} className="ops-tile ops-round">
              <ProjectImage r={r} fit="cover" print showCaption={false} />
            </div>
          ))}
        </div>

        <footer className="ops-foot">
          <div className="ops-foot-row">
            <span className="ops-brand">
              <Mark size={13} dot="#0E4F55" />
              <span className="wordmark">agisano</span>
            </span>
            <span className="ops-url">agisano.com</span>
          </div>
          <p className="ops-rights">
            © {new Date().getFullYear()} Agisano.{p.rightsNote ? ` ${p.rightsNote}` : ""}
          </p>
        </footer>
      </section>
    </div>
  );
}
