"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { HERO } from "@/lib/content";
import { useCapability } from "@/lib/useCapability";
import { usePinProgress } from "@/lib/usePinProgress";
import ConvergingLine from "@/components/ConvergingLine";
import { StatementBuild } from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * 01 — Hero (ink statement field).
 * Pinned; the converging line is scroll-scrubbed — the visitor CONTROLS the
 * convergence by descending. Degraded: no pin, no scrub, line renders RESOLVED.
 */
export default function Hero() {
  const { cinematic } = useCapability();
  const { ref, p } = usePinProgress(cinematic);
  const reduce = useReducedMotion();

  return (
    <section className="hero-wrap" ref={ref} data-cinematic={cinematic}>
      <div className="hero field-ink ink-graded">
        {/* The converging line is the FIELD the statement sits in — behind and
            around it (art-direction §8.1), not a column beside it. Putting it in
            a grid column starved the headline of width and forced the mega type
            to wrap and overflow. */}
        <div className="hero-line" aria-hidden="true">
          {/* Labels OFF. The line-work is a FIELD that bleeds across the statement
              by design, so any label riding it lands on the type — no breakpoint
              fixes that, because the headline's width is fluid. The convergence
              still reads without words: four threads gather and RESOLVE INTO THE
              MARK. The four are named immediately below at S4 ("Under one roof"),
              where they have room. */}
          <ConvergingLine p={cinematic ? p : 1} showLabels={false} />
        </div>

        <div className="shell hero-inner">
          <div className="hero-copy">
            <motion.p
              className="t-label hero-eyebrow"
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              {HERO.eyebrow}
            </motion.p>

            <h1 className="t-mega hero-headline">
              <StatementBuild lines={HERO.headlineClauses} delay={0.12} />
            </h1>

            <motion.p
              className="t-lead hero-lead pretty"
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.8 }}
            >
              {HERO.lead}
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.95 }}
            >
              <Magnetic>
                <Link href="/assessment" className="btn btn-primary">
                  {HERO.ctaPrimary}
                  <span aria-hidden="true">→</span>
                </Link>
              </Magnetic>
              <a href="#readiness-check" className="btn btn-quiet on-ink">
                {HERO.ctaSecondary}
              </a>
            </motion.div>
          </div>
        </div>

        <div className="hero-foot">
          <div className="shell hero-foot-inner">
            <span className="t-label hero-scroll">
              {cinematic ? "Scroll" : "One partner, under one roof"}
            </span>
            <span className="hero-scroll-rule" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
