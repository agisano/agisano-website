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
        <div className="split check-split">
          <Fade className="check-head split-main">
            <SectionIndex label="The 90-second check" />
            <h2 className="t-h2 balance">{CHECK_INVITE.headline}</h2>
            <p className="t-lead pretty measure">{CHECK_INVITE.body}</p>
          </Fade>

          <Fade className="check-panel split-field" delay={0.1} amount={0.1}>
            <ReadinessCheck />
          </Fade>
        </div>
      </div>
    </section>
  );
}
