"use client";

import { CREDENTIALS, CREDENTIALS_COPY } from "@/lib/credentials";
import { Stagger, Rise, StatementBuild, Fade } from "@/components/motion/Reveal";
import SectionIndex from "@/components/SectionIndex";

/**
 * 06 — Credentials: "Cleared to work with government."
 *
 * Deliberately NOT a badge/logo wall — that is the mediocre-vendor move and it
 * would cheapen the restraint the whole site is built on. Instead: Armory's
 * stat-block treatment applied to credentials — monumental, typographic, high
 * contrast, scroll-revealed.
 *
 * B-BBEE Level 1 is the HERO of the group: for a public-sector buyer it is the
 * one credential that moves their procurement scorecard, not just our claim to
 * competence. Everything else supports the other question they are really
 * asking — "can I trust these people with our data?"
 *
 * Data lives in lib/credentials.ts. If a certification lapses it is a one-line
 * deletion there and this section absorbs it with no layout change.
 */
export default function Credentials() {
  const hero = CREDENTIALS.find((c) => c.hero);
  const rest = CREDENTIALS.filter((c) => !c.hero);

  return (
    <section className="section field-ink ink-graded creds" id="credentials">
      <div className="shell">
        <SectionIndex n={CREDENTIALS_COPY.index} label={CREDENTIALS_COPY.eyebrow} onInk />

        <div className="creds-head">
          <h2 className="t-display balance">
            <StatementBuild lines={[CREDENTIALS_COPY.headline]} />
          </h2>
          <Fade delay={0.18}>
            <p className="t-lead pretty measure creds-lead">{CREDENTIALS_COPY.lead}</p>
          </Fade>
        </div>

        {/* The two questions the buyer is actually asking */}
        <Stagger className="creds-questions" gap={0.1}>
          {CREDENTIALS_COPY.questions.map((q) => (
            <Rise key={q.key} className="creds-question">
              <p className="t-h3 creds-q-label">{q.label}</p>
              <p className="t-body pretty creds-q-body">{q.body}</p>
            </Rise>
          ))}
        </Stagger>

        {/* The hero credential — B-BBEE Level 1, given monumental weight */}
        {hero && (
          <Fade className="cred-hero" amount={0.3}>
            <div className="cred-hero-value">
              <span className="t-label cred-hero-name">{hero.name}</span>
              <span className="cred-hero-level">{hero.value}</span>
            </div>
            <p className="t-lead pretty cred-hero-plain">{hero.plain}</p>
          </Fade>
        )}

        {/* The supporting audited set — typographic rows, no badges */}
        <Stagger className="cred-rows" gap={0.07} amount={0.15}>
          {rest.map((c) => (
            <Rise key={c.id} className="cred-row" as="div">
              <hr className="hairline hairline-ink" />
              <div className="cred-row-inner">
                <div className="cred-row-id">
                  <h3 className="t-h2 cred-row-name">{c.name}</h3>
                  {c.value && <span className="t-label cred-row-status">{c.value}</span>}
                </div>
                <p className="t-body pretty cred-row-plain">{c.plain}</p>
              </div>
            </Rise>
          ))}
        </Stagger>

        <Fade delay={0.1}>
          <p className="t-small creds-note pretty">{CREDENTIALS_COPY.note}</p>
        </Fade>
      </div>
    </section>
  );
}
