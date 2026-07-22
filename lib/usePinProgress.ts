"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Pinned/scrubbed section progress (Tresmares mechanic, spec §5).
 *
 * Attach `ref` to a TALL wrapper (e.g. 250vh). The wrapper's scroll travel is
 * mapped to progress `p` (0→1) while a sticky inner child holds in place. `p`
 * drives inner animation as a linear function of scroll position — user-
 * controlled, "heavy". Scrubbing up AND down re-runs it.
 *
 * When `enabled` is false (phone / poor-bandwidth / reduced-motion), this does
 * NOTHING and returns p=1 (fully resolved) so the section renders as its final
 * composition with no pin, no scrub — the mandatory graceful degradation.
 */
export function usePinProgress(enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(enabled ? 0 : 1);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) {
      setP(1);
      return;
    }

    const el = ref.current;
    if (!el) return;

    let latest = 0;
    const compute = () => {
      raf.current = null;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // total scrollable distance across the pinned wrapper
      const total = rect.height - vh;
      // how far we've scrolled into it
      const scrolled = -rect.top;
      const next = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;
      if (Math.abs(next - latest) > 0.0005) {
        latest = next;
        setP(next);
      }
    };

    const onScroll = () => {
      if (raf.current == null) raf.current = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf.current != null) cancelAnimationFrame(raf.current);
    };
  }, [enabled]);

  return { ref, p };
}

/** Map p in [a,b] to [0,1], clamped. Utility for phased scrub timelines. */
export function phase(p: number, a: number, b: number): number {
  if (b === a) return p >= b ? 1 : 0;
  return Math.min(1, Math.max(0, (p - a) / (b - a)));
}
