import type { Metadata } from "next";
import { MEDIA } from "@/lib/content";
import MediaQuoteForm from "@/components/MediaQuoteForm";
import SectionIndex from "@/components/SectionIndex";
import { Fade, Rise, Stagger, StatementBuild } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  alternates: { canonical: "/media" },
  title: "Media — event photography and video — Agisano",
  description:
    "Event photography and video in Gauteng. Tell us about the day and get a fixed, written quote within one business day.",
};

/**
 * Media — four chapters over three grounds (ink → paper → stone → paper).
 *
 * Chapter 02 lists what can be booked, set on hairlines like a printed
 * catalogue. No prices: they reach the client in a written quote (see the
 * MEDIA header in lib/content.ts). Stays a server component; the form is
 * the only client island.
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
              <a href="#book" className="t-label media-jump">{MEDIA.footLabel}</a>
            </p>
          </Fade>
        </div>
      </section>

      {/* 02 — What you can book */}
      <section className="section field-paper" id="book">
        <div className="shell">
          <SectionIndex n="02" label="What you can book" />
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
                      <span className="rate-title">{i.name}</span>
                      <span className="rate-detail">{i.detail}</span>
                    </Rise>
                  ))}
                </Stagger>
              </section>
            ))}
          </div>
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
                <li>Your quote is written and itemised, travel included.</li>
                <li>Photographs arrive edited, within 5 working days.</li>
                <li>Filming and editing are separate, so you choose how much you need.</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
