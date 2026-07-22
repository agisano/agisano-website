"use client";

import Link from "next/link";
import { UNDER_ONE_ROOF } from "@/lib/content";
import { SERVICE_FACTS } from "@/lib/metrics";
import { useCapability } from "@/lib/useCapability";
import { usePinProgress, phase } from "@/lib/usePinProgress";
import ConvergingLine from "@/components/ConvergingLine";
import { Stagger, Rise, StatementBuild, Fade } from "@/components/motion/Reveal";
import SectionIndex from "@/components/SectionIndex";

/**
 * 04 — Under one roof (ink statement field).
 *
 * PINNED: the converging line GATHERS the four service threads as p advances —
 * the signature idea doing structural work. Then the Tresmares four-card grid:
 * each card carries its own concrete fact box (no photography — the facts and
 * the type are the material). Degraded: line resolved, cards fade up fast.
 */
export default function UnderOneRoof() {
  const { cinematic } = useCapability();
  const { ref, p } = usePinProgress(cinematic);

  const lineP = cinematic ? phase(p, 0.08, 0.8) : 1;

  return (
    <>
      <section className="roof-wrap field-ink ink-graded" ref={ref} id="under-one-roof">
        <div className="roof-pin">
          <div className="shell roof-inner">
            <div className="roof-copy">
              <SectionIndex n="04" label={UNDER_ONE_ROOF.eyebrow} onInk />
              <h2 className="t-display balance roof-headline">
                <StatementBuild lines={[UNDER_ONE_ROOF.headline]} />
              </h2>
              <Fade delay={0.2}>
                <p className="t-lead pretty measure roof-lead">{UNDER_ONE_ROOF.lead}</p>
              </Fade>
            </div>

            <div className="roof-line" aria-hidden="true">
              <ConvergingLine p={lineP} />
            </div>
          </div>
        </div>
      </section>

      <section className="section field-ink roof-cards-section">
        <div className="shell">
          <Stagger className="roof-cards" gap={0.08} amount={0.15}>
            {UNDER_ONE_ROOF.services.map((s, i) => (
              <Rise key={s.key} className="roof-card" as="div">
                <article>
                  <hr className="hairline hairline-ink" />
                  <p className="t-label roof-card-n">{`0${i + 1}`}</p>
                  <h3 className="t-h2 roof-card-title">{s.title}</h3>
                  <p className="t-body pretty roof-card-copy">{s.plain}</p>

                  <dl className="roof-facts">
                    {(SERVICE_FACTS[s.key] ?? []).map((f) => (
                      <div key={f.k} className="roof-fact">
                        <dt className="t-label">{f.k}</dt>
                        <dd>{f.v}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              </Rise>
            ))}
          </Stagger>

          <Fade className="roof-more" delay={0.1}>
            <Link href="/under-one-roof" className="btn btn-quiet on-ink">
              How the four fit together
              <span aria-hidden="true">→</span>
            </Link>
          </Fade>
        </div>
      </section>
    </>
  );
}
