"use client";

import { useEffect, useRef } from "react";

/**
 * Triggered reveal: adds `.is-in` when the element enters the viewport.
 * This is the UNIVERSAL path — it runs on every device (it is the fade-up
 * fallback the cinematic layer degrades to). Eased, one-shot, GPU-cheap.
 * Reduced-motion is handled in CSS (elements resolve to final state).
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options?: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            if (options?.once !== false) io.unobserve(entry.target);
          } else if (options?.once === false) {
            entry.target.classList.remove("is-in");
          }
        }
      },
      {
        threshold: options?.threshold ?? 0.2,
        rootMargin: options?.rootMargin ?? "0px 0px -8% 0px",
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [options?.threshold, options?.rootMargin, options?.once]);

  return ref;
}
