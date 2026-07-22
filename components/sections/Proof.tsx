"use client";

import Link from "next/link";
import { OGS } from "@/lib/content";
import { PROOF_ANCHORS } from "@/lib/metrics";
import { useCapability } from "@/lib/useCapability";
import { usePinProgress, phase } from "@/lib/usePinProgress";
import { Fade } from "@/components/motion/Reveal";
import SectionIndex from "@/components/SectionIndex";
import Photo from "@/components/Photo";

/**
 * 05 — OGS proof (ink field, stat-anchor treatment). PINNED; the anchors scrub
 * as a function of p and re-run scrubbing up AND down.
 *
 * This is the ONE place photography stays — a real, consented OGS photograph is
 * the emotional anchor of the proof and nothing typographic replaces it.
 * Everywhere else on the page, photography has been designed out.
 *
 * BINDING: anchors are duration/continuity/completeness — never a count (§4.9).
 * The internet line is the LOCKED wording, verbatim, and never names the provider.
 */
export default function Proof() {
  const { cinematic } = useCapability();
  const { ref, p } = usePinProgress(cinematic);

  return (
    <section className="proof-wrap field-ink ink-graded" ref={ref} id="proof">
      <div className="proof-pin">
        <div className="shell proof-inner">
          <div className="proof-copy">
            <SectionIndex n="05" label={OGS.eyebrow} onInk />
            <h2 className="t-h1 balance proof-headline">{OGS.headline}</h2>

            <div className="proof-anchors">
              {PROOF_ANCHORS.map((a, i) => {
                const start = 0.04 + i * 0.11;
                const t = cinematic ? phase(p, start, start + 0.22) : 1;
                return (
                  <div key={a.value} className="proof-anchor">
                    <span className="proof-anchor-clip">
                      <span
                        className="proof-anchor-value"
                        style={{
                          transform: `translateY(${(1 - t) * 106}%)`,
                          opacity: 0.2 + t * 0.8,
                        }}
                      >
                        {a.value}
                      </span>
                    </span>
                    <p className="t-small proof-anchor-label pretty" style={{ opacity: t }}>
                      {a.label}
                    </p>
                  </div>
                );
              })}
            </div>

            <div
              className="proof-body"
              style={{
                opacity: cinematic ? phase(p, 0.3, 0.52) : 1,
                transform: cinematic
                  ? `translateY(${(1 - phase(p, 0.3, 0.52)) * 16}px)`
                  : undefined,
              }}
            >
              <p className="t-body pretty measure">{OGS.body}</p>

              {/* LOCKED wording — exact, never paraphrased, never names the provider */}
              <blockquote className="proof-internet">
                <p className="t-body pretty">{OGS.internetLine}</p>
              </blockquote>

              <Link href={OGS.link.href} className="btn btn-quiet on-ink proof-link">
                {OGS.link.label}
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Testimonial slot — ships EMPTY until real words arrive (§7). */}
            {OGS.testimonial && (
              <figure className="proof-quote">
                <blockquote className="t-h2 balance">
                  &ldquo;{OGS.testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="t-small">{OGS.testimonial.attribution}</figcaption>
              </figure>
            )}
          </div>

          <Fade className="proof-photo" delay={0.15} amount={0.15}>
            <Photo label={OGS.photo} ratio="4 / 5" parallax tone="teal" />
          </Fade>
        </div>
      </div>
    </section>
  );
}
