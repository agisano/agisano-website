import type { Metadata } from "next";
import { MEDIA } from "@/lib/content";
import MediaQuoteForm from "@/components/MediaQuoteForm";
import SectionIndex from "@/components/SectionIndex";
import { Fade, Rise, Stagger, StatementBuild } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  alternates: { canonical: "/media" },
  title: "Media — photography, video and headshots — Agisano",
  description:
    "Event photography, video and staff headshots in Gauteng, at fixed published prices. Request a quote and get a fixed price within one business day.",
};

// Comma grouping, not en-ZA's narrow space: the subset display font has no
// U+202F glyph, so the space collapses and "R11000" reads as one number.
const rand = (n: number) => `R${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

/**
 * Media — four chapters over three grounds (ink → paper → stone → paper).
 *
 * The signature here is the RATE CARD: prices set at display scale in the
 * serif, on hairlines, like a printed tariff. Publishing them is the argument
 * — the rest of the site says "honest, in writing", and this page proves it
 * with numbers. Stays a server component; the form is the only client island.
 */
export default function MediaPage() {
  return (
    <div className="page">
      {/* 01 — Entry statement */}
      <section className="page-hero field-ink ink-graded">
        <div className="shell">
          <SectionIndex n="01" label={MEDIA.eyebrow} onInk />
          <h1 className="t-display balance page-hero-statement media-statement">
            <StatementBuild lines={MEDIA.entryClauses} delay={0.12} />
          </h1>
          <Fade delay={0.55}>
            <p className="t-lead pretty page-hero-lead">{MEDIA.lead}</p>
          </Fade>
          <Fade delay={0.8}>
            <p className="page-hero-foot">
              <a href="#rates" className="t-label media-jump">{MEDIA.footLabel}</a>
            </p>
          </Fade>
        </div>
      </section>

      {/* 02 — The rate card */}
      <section className="section field-paper" id="rates">
        <div className="shell">
          <SectionIndex n="02" label="Rates" />
          <div className="page-head media-rates-head">
            <h2 className="t-h1 balance">{MEDIA.ratesHeadline}</h2>
            <p className="t-lead pretty">{MEDIA.ratesLead}</p>
          </div>

          <div className="rate-groups">
            {MEDIA.groups.map((g) => (
              <section key={g.key} className="rate-group" aria-labelledby={`rate-${g.key}`}>
                <div className="rate-group-head">
                  <h3 id={`rate-${g.key}`} className="t-h2">{g.title}</h3>
                  <p className="t-body pretty">{g.note}</p>
                </div>
                <Stagger as="ul" className="rate-list" gap={0.06} amount={0.15}>
                  {g.items.map((i) => (
                    <Rise key={i.code} as="li" className="rate-row">
                      <span className="rate-name">
                        <span className="rate-title">{i.name}</span>
                        <span className="rate-detail">{i.detail}</span>
                      </span>
                      <span className="rate-price">
                        {rand(i.price)}
                        {"unit" in i && i.unit && <span className="rate-unit">{i.unit}</span>}
                      </span>
                    </Rise>
                  ))}
                </Stagger>
              </section>
            ))}
          </div>

          <p className="t-small rate-foot">{MEDIA.travelNote}</p>
        </div>
      </section>

      {/* 03 — What happens next */}
      <section className="section field-stone">
        <div className="shell">
          <SectionIndex n="03" label="How it works" />
          <Stagger as="ol" className="ledger media-steps" gap={0.09} amount={0.2}>
            {MEDIA.steps.map((s) => (
              <Rise key={s.n} as="li" className="ledger-item">
                <hr className="hairline" />
                <p className="t-label ledger-n">{s.n}</p>
                <h3 className="t-h3">{s.title}</h3>
                <p className="t-body pretty ledger-body">{s.body}</p>
              </Rise>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 04 — Request a quote */}
      <section className="section field-paper" id="quote">
        <div className="shell">
          <SectionIndex n="04" label="Book" />
          <div className="assessment-grid">
            <MediaQuoteForm />
            <aside className="assessment-aside media-aside">
              <h2 className="t-label eyebrow">Good to know</h2>
              <ul className="roof-includes">
                <li>Every package is a fixed price for a fixed amount of time.</li>
                <li>Photographs arrive edited, within 5 working days.</li>
                <li>Filming and editing are separate, so you choose how much you need.</li>
                <li>{MEDIA.travelNote}</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
