"use client";

import { CHECK_INVITE } from "@/lib/content";
import { Fade } from "@/components/motion/Reveal";
import SectionIndex from "@/components/SectionIndex";
import ReadinessCheck from "@/components/ReadinessCheck";

/** 02 — The Readiness Check (light field, pulled high). The showpiece + on-ramp. */
export default function CheckSection() {
  return (
    <section id="readiness-check" className="section field-stone check-section">
      <div className="shell">
        <SectionIndex n="02" label="The 90-second check" />

        <Fade className="check-head">
          <h2 className="t-display balance">{CHECK_INVITE.headline}</h2>
          <p className="t-lead pretty measure">{CHECK_INVITE.body}</p>
        </Fade>

        <Fade className="check-panel" delay={0.1} amount={0.1}>
          <ReadinessCheck />
        </Fade>
      </div>
    </section>
  );
}
