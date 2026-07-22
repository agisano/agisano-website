"use client";

import { CONSTRAINTS } from "@/lib/content";
import { Stagger, Rise, Fade } from "@/components/motion/Reveal";
import SectionIndex from "@/components/SectionIndex";

/** 07 — Why Agisano / the constraints we understand (light reading field). */
export default function Constraints() {
  return (
    <section className="section field-paper constraints" id="why">
      <div className="shell">
        <SectionIndex n="07" label={CONSTRAINTS.eyebrow} />

        <Fade className="constraints-head">
          <h2 className="t-h1 balance">{CONSTRAINTS.headline}</h2>
          <p className="t-lead pretty measure">{CONSTRAINTS.lead}</p>
        </Fade>

        <Stagger className="constraints-list" gap={0.08} amount={0.15}>
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
    </section>
  );
}
