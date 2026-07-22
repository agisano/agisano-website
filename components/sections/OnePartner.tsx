"use client";

import { ONE_PARTNER } from "@/lib/content";
import { METRICS } from "@/lib/metrics";
import { Stagger, Rise, Fade } from "@/components/motion/Reveal";
import Counter from "@/components/motion/Counter";
import SectionIndex from "@/components/SectionIndex";

/**
 * 03 — The one-partner beat + the metrics grid.
 *
 * Tresmares' "firm statement, then a hard stat grid" beat, in Agisano's voice.
 * NO PHOTOGRAPHY: the material is type, rule-work and concrete numbers — which
 * is precisely how the modern references reach premium without photos.
 *
 * Every number traces to the ratified platform or a real commitment
 * (see lib/metrics.ts). No count-as-hero-number, ever (§4.9).
 */
export default function OnePartner() {
  return (
    <section className="section field-paper one-partner" id="one-partner">
      <div className="shell">
        <SectionIndex n="03" label="One accountable partner" />

        <div className="one-partner-grid">
          <Fade className="one-partner-copy">
            <h2 className="t-h1 balance">{ONE_PARTNER.headline}</h2>
          </Fade>

          <Fade className="one-partner-body" delay={0.08}>
            <p className="t-body pretty">{ONE_PARTNER.body}</p>
          </Fade>
        </div>

        <Stagger className="metrics" amount={0.2}>
          {METRICS.map((m) => (
            <Rise key={m.label} className="metric">
              <hr className="hairline metric-rule" />
              <p className="metric-value">
                <Counter value={m.value} />
                {m.unit && <span className="metric-unit">{m.unit}</span>}
              </p>
              <p className="t-small metric-label pretty">{m.label}</p>
            </Rise>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
