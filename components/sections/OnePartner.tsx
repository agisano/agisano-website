"use client";

import { ONE_PARTNER } from "@/lib/content";
import { Fade } from "@/components/motion/Reveal";
import SectionIndex from "@/components/SectionIndex";

/**
 * 03 — The one-partner thesis: the deliberate quiet beat.
 *
 * A short, single-column statement between the interactive check above and the
 * big Under-One-Roof pin below — the breath in the arc. The metrics grid that
 * used to sit here was cut: every number in it (2021, 4+ years, six lines, one
 * business day) is restated downstream with more context — in the Proof anchors,
 * the Under-One-Roof headline and the Final-CTA steps — so it manufactured
 * repetition and ~900px of mobile height. No count-as-hero-number, ever (§4.9).
 */
export default function OnePartner() {
  return (
    <section className="section field-paper one-partner" id="one-partner">
      <div className="shell">
        <SectionIndex label="One accountable partner" />

        <Fade className="one-partner-copy">
          <h2 className="t-h1 balance one-partner-headline">{ONE_PARTNER.headline}</h2>
          <p className="t-lead pretty measure one-partner-body">{ONE_PARTNER.body}</p>
        </Fade>
      </div>
    </section>
  );
}
