"use client";

import Link from "next/link";
import { FINAL_CTA, WHATSAPP_ENABLED } from "@/lib/content";
import { whatsappHref } from "@/lib/lead";
import { Stagger, Rise, StatementBuild, Fade } from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import SectionIndex from "@/components/SectionIndex";

/**
 * 08 — Final CTA + what-happens-next (ink statement field, gold CTA).
 * The transparency block de-risks the action: every step is a real commitment.
 * No photography — the numbered steps and the rule-work carry it.
 */
export default function FinalCta() {
  return (
    <section className="section field-ink ink-graded final-cta" id="book">
      <div className="shell final-cta-inner">
        <div className="final-cta-copy">
          <SectionIndex n="08" label={FINAL_CTA.eyebrow} onInk />

          <h2 className="t-display balance">
            <StatementBuild lines={[FINAL_CTA.headline]} />
          </h2>

          <Fade delay={0.15}>
            <p className="t-lead pretty measure final-cta-lead">{FINAL_CTA.lead}</p>

            <div className="final-cta-actions">
              <Magnetic>
                <Link href="/assessment" className="btn btn-primary">
                  {FINAL_CTA.cta}
                  <span aria-hidden="true">→</span>
                </Link>
              </Magnetic>
              {WHATSAPP_ENABLED && (
                <a
                  className="btn btn-quiet on-ink"
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Or WhatsApp us
                </a>
              )}
            </div>

            <p className="t-small final-cta-terms">
              <Link href={FINAL_CTA.termsHref} className="link-draw">
                {FINAL_CTA.termsNote}
              </Link>
            </p>
          </Fade>
        </div>

        <Stagger className="final-steps" gap={0.09} amount={0.2} as="ol">
          {FINAL_CTA.steps.map((s) => (
            <Rise key={s.n} className="final-step" as="li">
              <hr className="hairline hairline-ink" />
              <p className="t-label final-step-n">{s.n}</p>
              <h3 className="t-h3">{s.title}</h3>
              <p className="t-body pretty">{s.body}</p>
            </Rise>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
