"use client";

import { CONSTRAINTS } from "@/lib/content";
import { Stagger, Rise, Fade } from "@/components/motion/Reveal";
import SectionIndex from "@/components/SectionIndex";

/** 07 — Why Agisano / the constraints we understand (light reading field). */
export default function Constraints() {
  return (
    <section className="section field-paper constraints" id="why">
      <div className="shell">
        <div className="split constraints-split">
          <Fade className="constraints-head split-main">
            <SectionIndex label={CONSTRAINTS.eyebrow} />
            <h2 className="t-h2 balance">{CONSTRAINTS.headline}</h2>
            <p className="t-lead pretty measure">{CONSTRAINTS.lead}</p>
          </Fade>

          <Stagger className="constraints-list split-field" gap={0.08} amount={0.15}>
            {CONSTRAINTS.points.map((pt, i) => (
              <Rise key={pt.title} className="constraint" as="div">
                <hr className="hairline" />
                <p className="t-label constraint-n">{`0${i + 1}`}</p>
                <h3 className="t-h3">{pt.title}</h3>
                <p className="t-body pretty">{pt.body}</p>
              </Rise>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
