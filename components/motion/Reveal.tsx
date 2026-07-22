"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The orchestrated reveal layer (Framer Motion / `motion`).
 *
 * Reduced-motion: `useReducedMotion` collapses every variant to the resolved
 * state with zero duration — the composition is simply *there*, statically, and
 * must be beautiful on its own. This is the non-negotiable path.
 *
 * These reveals are cheap (transform + opacity only) and run on ALL devices —
 * they ARE the fast fade-up fallback. The expensive things (Lenis, pinning,
 * scrub, parallax) are separately capability-gated and are the only things a
 * phone loses.
 */

export function Stagger({
  children,
  className,
  delay = 0,
  gap = 0.09,
  amount = 0.25,
  once = true,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  gap?: number;
  amount?: number;
  once?: boolean;
  as?: "div" | "ul" | "ol" | "dl";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];

  const variants: Variants = {
    hidden: {},
    show: {
      transition: reduce
        ? { duration: 0 }
        : { staggerChildren: gap, delayChildren: delay },
    },
  };

  return (
    <Comp
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </Comp>
  );
}

/** A child of <Stagger>. Rises under its parent's orchestration. */
export function Rise({
  children,
  className,
  style,
  y = 26,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  y?: number;
  as?: "div" | "li" | "span" | "p";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];

  const variants: Variants = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: reduce ? { duration: 0 } : { duration: 0.85, ease: EASE },
    },
  };

  return (
    <Comp className={className} style={style} variants={variants}>
      {children}
    </Comp>
  );
}

/** Standalone reveal (not inside a Stagger). */
export function Fade({
  children,
  className,
  delay = 0,
  y = 24,
  amount = 0.3,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={reduce ? { duration: 0 } : { duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * The line-by-line statement build — the core cinematic move. Each clause wipes
 * up from under a mask, staggered. Reduced-motion: the clauses are just there.
 */
export function StatementBuild({
  lines,
  className,
  lineClassName,
  delay = 0,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={{
        hidden: {},
        show: {
          transition: reduce
            ? { duration: 0 }
            : { staggerChildren: 0.105, delayChildren: delay },
        },
      }}
    >
      {lines.map((line) => (
        <span key={line} className={`build-line ${lineClassName ?? ""}`}>
          <motion.span
            variants={{
              hidden: reduce ? { y: "0%" } : { y: "108%" },
              show: {
                y: "0%",
                transition: reduce ? { duration: 0 } : { duration: 0.9, ease: EASE },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
