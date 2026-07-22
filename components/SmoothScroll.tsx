"use client";

import { useEffect } from "react";
import { useCapability } from "@/lib/useCapability";

/**
 * Lenis smooth scroll — the single biggest "expensive" tell in the modern
 * references, and pure dead weight on a mid-range Android on weak signal.
 *
 * So it is CAPABILITY-GATED *and* LAZY-LOADED: the library is behind a dynamic
 * import that only executes when `cinematic` is true (desktop-class pointer +
 * width, no data-saver, no slow network, not reduced-motion). A phone never
 * downloads, parses, or runs it — it keeps the browser's own native scroll,
 * which is faster and correct.
 */
export default function SmoothScroll() {
  const { cinematic } = useCapability();

  useEffect(() => {
    if (!cinematic) return;

    let lenis: { raf: (t: number) => void; destroy: () => void; scrollTo: (t: HTMLElement, o?: object) => void } | null =
      null;
    let raf = 0;
    let cancelled = false;
    let onClick: ((e: MouseEvent) => void) | null = null;

    (async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;

      const instance = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false, // never hijack touch — phones keep native momentum
      });
      lenis = instance;

      const loop = (time: number) => {
        instance.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      onClick = (e: MouseEvent) => {
        const target = (e.target as HTMLElement)?.closest?.('a[href^="#"]');
        if (!target) return;
        const id = target.getAttribute("href");
        if (!id || id === "#") return;
        const el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        instance.scrollTo(el as HTMLElement, { offset: -72 });
      };
      document.addEventListener("click", onClick);
    })();

    return () => {
      cancelled = true;
      if (onClick) document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, [cinematic]);

  return null;
}
