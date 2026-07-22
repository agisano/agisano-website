"use client";

import { useEffect, useState } from "react";

export type Capability = {
  ready: boolean;
  cinematic: boolean;
  reducedMotion: boolean;
};

/**
 * Reads the capability decision that lib/capabilityScript.ts already made
 * BEFORE FIRST PAINT and wrote onto <html> as a class.
 *
 * The script is the single source of truth — this hook does not re-derive the
 * answer, it reports it to React (and re-syncs if the user changes their
 * reduced-motion preference live). That guarantees CSS and JS can never disagree
 * about whether this device is cinematic — the disagreement that would otherwise
 * leave a pinned section with zero scroll travel, or change a wrapper's height
 * after paint (CLS).
 *
 * cinematic === false → no Lenis, no pins, no scrub, no parallax, no magnetics.
 * Just fast, eased fade-ups. That is the phone / poor-bandwidth path.
 */
export function useCapability(): Capability {
  // Server and first client render agree: NOT cinematic. The resolved static
  // composition is the baseline; cinematic is an enhancement layered on top.
  const [cap, setCap] = useState<Capability>({
    ready: false,
    cinematic: false,
    reducedMotion: false,
  });

  useEffect(() => {
    const root = document.documentElement;
    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      const reducedMotion = reduceQuery.matches;
      if (reducedMotion) {
        root.classList.add("motion-off");
        root.classList.remove("cinematic");
      }
      setCap({
        ready: true,
        cinematic: root.classList.contains("cinematic"),
        reducedMotion,
      });
    };

    sync();
    reduceQuery.addEventListener("change", sync);
    return () => reduceQuery.removeEventListener("change", sync);
  }, []);

  return cap;
}
