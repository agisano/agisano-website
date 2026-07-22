"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/**
 * Scroll-revealed counter for the metrics grid.
 *
 * Only animates when the value is genuinely NUMERIC ("2021", "4"). Values like
 * "End to end" or "Level 1" render as-is — we never fake a count-up on a word.
 *
 * HYDRATION: the initial state MUST be the final `value`, because the server
 * cannot know the client's reduced-motion preference. Rendering "0" on the
 * server and "4" on a reduced-motion client is a hydration text mismatch
 * (React #418). So we always render the true value, and only drop to the start
 * of the count inside an effect, once we know we're allowed to animate and the
 * element is actually in view (which is below the fold — so there's no flash).
 */
export default function Counter({
  value,
  duration = 1.2,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);

  const numeric = /^\d+$/.test(value.trim());

  useEffect(() => {
    if (!numeric || reduce || !inView) return;

    const target = parseInt(value, 10);
    // A year counts up from just below itself — counting 2021 from zero reads
    // like a slot machine, not a firm.
    const from = target > 1000 ? target - 24 : 0;

    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(String(Math.round(from + (target - from) * eased)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, numeric, reduce, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
