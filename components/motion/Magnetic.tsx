"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useCapability } from "@/lib/useCapability";

/**
 * Magnetic pull on the primary action (art-direction §8b — the desktop reward
 * we allow, instead of the custom cursor Steve ruled out).
 *
 * Desktop-capable only. On touch/phone/reduced-motion it renders a plain
 * wrapper with zero listeners — the button is just a button.
 */
export default function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const { cinematic } = useCapability();
  const ref = useRef<HTMLSpanElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.35 });

  if (!cinematic) {
    return <span className={className}>{children}</span>;
  }

  const onMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      className={`magnetic ${className ?? ""}`}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy, display: "inline-flex" }}
    >
      {children}
    </motion.span>
  );
}
