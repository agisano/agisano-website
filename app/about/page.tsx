import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { ABOUT, FOUNDERS, HERO } from "@/lib/content";
import Credentials from "@/components/sections/Credentials";
import Keystone from "@/components/Keystone";
import SectionIndex from "@/components/SectionIndex";
import { Fade, Rise, Stagger, StatementBuild } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About — Agisano",
  description:
    "Why an institution's technology shouldn't be the principal's problem — and who owns the whole.",
};

/**
 * About — six chapters over four grounds (ink → paper → ink → stone → ink → paper).
 *
 * The signature is the KEYSTONE DIPTYCH at chapter 03: the only symmetrical
 * composition on the site. Everything else here is deliberately asymmetric —
 * left axis, active right field — so breaking that grammar exactly once states
 * the founders' parity before a word is read. That parity is Doug's strategic
 * constraint expressed as form; it is not a style choice. Never give one column
 * more weight, a larger name, an earlier reveal, or a photograph the other
 * lacks.
 *
 * Stays a server component: the Reveal primitives carry their own "use client".
 */
export default function AboutPage() {
  return (
    <div className="page">
      {/* 01 — Entry statement */}
      <section className="page-hero field-ink ink-graded">
        <div className="shell">
          <SectionIndex n="01" label={ABOUT.eyebrow} onInk />
          <h1 className="t-display balance page-hero-statement">
            <StatementBuild lines={ABOUT.entryClauses} delay={0.12} />
          </h1>
          <Fade delay={0.55}>
            <p className="t-lead pretty page-hero-lead">{ABOUT.lead}</p>
          </Fade>
          <Fade delay={0.8}>
            <p className="page-hero-foot">
              <span className="t-label">{ABOUT.footLabel}</span>
            </p>
          </Fade>
        </div>
      </section>

      {/* 02 — Nobody owns the whole. Right field carries the unowned fragments. */}
      <section className="section field-paper">
        <div className="shell split split-about">
          <div className="split-main">
            <p className="t-lead pretty">
              Somewhere right now a principal is doing exactly that — none of it their
              job, all of it their problem. The reason is not incompetence. It is that
              nobody owns the whole. A school or a public institution ends up as its own
              systems integrator by default, assembling technology out of separate
              vendors who each answer for their own slice and nobody for the outcome.
            </p>
            <p className="t-body pretty">
              Agisano exists to take that whole weight off the desk. One partner owns all
              of it — the connection, the equipment, the power behind it, the security
              around it, the support, and how you show up online — so when something
              needs doing there is one number to call and one team that answers for it.
            </p>
          </div>

          {/* The six concerns, deliberately unaligned — the picture of "unowned". */}
          <Stagger className="split-field fragments-field" gap={0.06}>
            {HERO.fragments.map((f, i) => (
              <Rise key={f} className="fragment" style={{ "--fragment-inset": FRAGMENT_INSETS[i] } as CSSProperties}>
                <hr className="hairline" />
                <span className="t-label fragment-label">{f}</span>
              </Rise>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 03 — THE KEYSTONE DIPTYCH. The signature. */}
      <section className="section field-ink ink-graded diptych-section">
        <div className="shell">
          <Fade>
            <p className="t-h2 balance diptych-intro">{FOUNDERS.intro}</p>
          </Fade>
          <hr className="hairline hairline-ink diptych-divide" />

          {/* gap 0 is binding: any stagger would arrive one founder before the
              other and rank them. They land together or the argument breaks. */}
          <div className="diptych-wrap">
            <Stagger className="diptych" gap={0} amount={0.2}>
              {FOUNDERS.people.map((p) => (
                <Rise key={p.id} className="diptych-col" as="div">
                  <h2 className="t-h1 diptych-name">{p.name}</h2>
                  <p className="t-label diptych-role">{p.title}</p>
                  <p className="t-body pretty diptych-bio">{p.bio}</p>
                </Rise>
              ))}
            </Stagger>
            <span className="diptych-rule" aria-hidden="true" />
          </div>

          <Keystone />
        </div>
      </section>

      {/* 04 — How we work. Stone band, one display-scale statement. */}
      <section className="section field-stone">
        <div className="shell split split-work">
          <div className="split-main">
            <h2 className="t-display balance pull-statement">
              {/* Clause-split for the build only — the sentence is unchanged. */}
              <StatementBuild
                lines={[
                  "We are not the cheapest hands.",
                  "We are the ones who stay,",
                  "who pick up, and who keep it working.",
                ]}
              />
            </h2>
          </div>
          <Fade className="split-field" delay={0.2}>
            <p className="t-label pull-label">How we work</p>
            <p className="t-body pretty pull-support">
              On a deliberately limited intake. We would rather be genuinely present for a
              few institutions than thinly spread across many — which is why our proof is
              depth, not breadth: four years of keeping one school&rsquo;s technology
              working, end to end, and still their partner today.
            </p>
          </Fade>
        </div>
      </section>

      {/* 05 — Credentials, as the composed typographic band the art direction
          specifies. Previously a <ul> of bullets rendering the same data. */}
      <Credentials />

      {/* 06 — Close */}
      <section className="section field-paper page-close">
        <div className="shell">
          <hr className="hairline" />
          <div className="page-close-inner">
            <h2 className="t-h2 balance">Start with a free assessment.</h2>
            <div className="page-actions">
              <Link href="/assessment" className="btn btn-primary">
                Book a free assessment
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/observatory-girls" className="link-draw page-close-quiet">
                Or see the proof
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/** Deliberate irregularity — the fragments do not line up, because they don't. */
const FRAGMENT_INSETS = ["0px", "12px", "28px", "8px", "34px", "18px"];
