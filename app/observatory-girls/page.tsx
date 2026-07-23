import type { Metadata } from "next";
import Link from "next/link";
import { OGS, OGS_INTERNET_CLAUSES } from "@/lib/content";
import { PROOF_ANCHORS } from "@/lib/metrics";
import Photo from "@/components/Photo";
import SectionIndex from "@/components/SectionIndex";
import { Fade, Rise, Stagger, StatementBuild } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  alternates: { canonical: "/observatory-girls" },
  title: "Observatory Girls' Primary School — Agisano",
  description:
    "Our reference institution: the technology partner since 2021, end to end, still today.",
};

/**
 * Our proof — six chapters over three grounds (ink → paper → stone → ink → paper).
 *
 * THE SIGNATURE is chapter 04, the integrity field: the largest type on the page
 * is the sentence in which Agisano limits its own claim. The page's thesis is
 * that a partner who overstates what they did will overstate other things too —
 * so the composition has to perform that argument, not merely assert it while
 * setting the honest sentence smaller than the heading above it.
 *
 * The locked wording is rendered from OGS_INTERNET_CLAUSES, derived from
 * OGS.internetLine. Never re-type those clauses here: one source of truth.
 *
 * When the principal's testimonial arrives it sits one notch ABOVE this, at
 * t-display — her testimony outranking our own claims is the correct permanent
 * hierarchy, and the slot below is already composed for it.
 */
export default function ObservatoryGirlsPage() {
  return (
    <div className="page">
      {/* 01 — Entry statement and the three anchors, as one chapter. */}
      <section className="page-hero page-hero-tall field-ink ink-graded">
        <div className="shell">
          <SectionIndex n="01" label={OGS.eyebrow} onInk />
          <h1 className="t-display balance page-hero-statement">
            <StatementBuild lines={OGS.entryClauses} delay={0.12} />
          </h1>
          <Fade delay={0.5}>
            <p className="t-lead pretty page-hero-lead">
              Depth, not scale. One institution, every part of its technology, for four
              years and counting.
            </p>
          </Fade>

          <hr className="hairline hairline-ink page-hero-divide" />
          <Stagger className="page-hero-anchors" gap={0.09}>
            {PROOF_ANCHORS.map((a) => (
              <Rise key={a.value} className="proof-anchor" as="div">
                <span className="proof-anchor-value">
                  <StatementBuild lines={[a.value]} />
                </span>
                <span className="t-small pretty proof-anchor-label">{a.label}</span>
              </Rise>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 02 — The institution. The photo IS the right field, not an ornament. */}
      <section className="section field-paper">
        <div className="shell split split-proof">
          <div className="split-main">
            <Fade>
              <p className="t-lead pretty">{OGS.body}</p>
            </Fade>
          </div>
          <Fade className="split-field split-field-bleed" delay={0.15}>
            <Photo label={OGS.photo} ratio="4 / 5" parallax tone="teal" />
          </Fade>
        </div>
      </section>

      {/* 03 — What we actually do there, as a numbered ledger. */}
      <section className="section field-stone">
        <div className="shell">
          <h2 className="t-h2 balance ledger-head">What we actually do there</h2>
          <Stagger className="ledger" gap={0.07}>
            {WHAT_WE_DO.map((item, i) => (
              <Rise key={item} className="ledger-item" as="div" y={18}>
                <hr className="hairline" />
                <p className="t-label ledger-n">{`0${i + 1}`}</p>
                <p className="t-h3 pretty ledger-body">{item}</p>
              </Rise>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 04 — THE INTEGRITY FIELD. The signature. The page's peak is given to
          the sentence that limits our claim. Do not reduce its scale, do not
          dim either clause, and do not put anything else in this field. */}
      <section
        className="integrity field-ink ink-graded"
        aria-label="Being precise about what's ours"
      >
        <div className="shell integrity-inner">
          <div className="integrity-main">
            <Fade>
              <p className="t-label integrity-eyebrow">Being precise about what&rsquo;s ours</p>
            </Fade>
            <div className="integrity-block">
              <span className="integrity-rule" aria-hidden="true" />
              <blockquote className="integrity-line t-h1 balance">
                <StatementBuild lines={OGS_INTERNET_CLAUSES} delay={0.1} />
              </blockquote>
            </div>
          </div>
          <Fade className="integrity-support" delay={0.3}>
            <p className="t-body pretty">
              We are careful about this because a partner who overstates what they did is
              a partner who will overstate other things too.
            </p>
          </Fade>
        </div>
      </section>

      {/* 05 — Testimonial. Composed and waiting; renders only when real words
          arrive. No placeholder, no "coming soon", no empty box. */}
      {OGS.testimonial && (
        <section className="section field-paper testimonial-band">
          <div className="shell">
            <figure>
              <blockquote className="t-display balance testimonial-quote">
                <StatementBuild lines={[OGS.testimonial.quote]} />
              </blockquote>
              <figcaption className="testimonial-attrib">
                <span className="t-label">{OGS.testimonial.attribution}</span>
              </figcaption>
            </figure>
          </div>
        </section>
      )}

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
              <Link href="/under-one-roof" className="link-draw page-close-quiet">
                Or see everything we do
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const WHAT_WE_DO = [
  "Built and run the campus network and WiFi — the coverage across the school.",
  "Supplied and set up the ICT equipment in use day to day.",
  "Managed IT support — when something breaks, we are who they call.",
  "Their digital presence.",
];
