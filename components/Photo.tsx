"use client";

import { useEffect, useRef } from "react";
import { useCapability } from "@/lib/useCapability";

/**
 * Photo slot (build-spec §8, art-direction §9).
 *
 * With `src` it renders the real photograph under the duotone treatment. Without
 * one it renders the duotone panel alone, at the same box — aspect-ratio reserves
 * the space either way, so dropping the real image in causes no layout shift and
 * no CLS. `label` is the alt text once a src exists.
 *
 * Parallax (~0.78x) runs only on capable devices; on phone/poor-bandwidth/
 * reduced-motion it is simply off.
 */
export default function Photo({
  label,
  ratio = "4 / 3",
  className = "",
  src,
  alt,
  parallax = false,
  tone = "ink",
}: {
  label: string;
  ratio?: string;
  className?: string;
  src?: string;
  alt?: string;
  parallax?: boolean;
  tone?: "ink" | "teal";
}) {
  const { cinematic } = useCapability();
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!parallax || !cinematic) {
      if (innerRef.current) innerRef.current.style.transform = "";
      return;
    }
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    let raf: number | null = null;
    const update = () => {
      raf = null;
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < -200 || rect.top > vh + 200) return;
      // -1 (below fold) → 1 (above); image drifts slower than the text around it
      const centre = (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2);
      inner.style.transform = `translate3d(0, ${(centre * 8).toFixed(2)}%, 0) scale(1.16)`;
    };
    const onScroll = () => {
      if (raf == null) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, [parallax, cinematic]);

  return (
    <figure
      ref={wrapRef}
      className={`photo ${className}`}
      style={{ aspectRatio: ratio }}
      data-tone={tone}
    >
      <div ref={innerRef} className="photo-inner">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt ?? label} loading="lazy" decoding="async" className="photo-img" />
        ) : (
          <div className="photo-ph" aria-hidden="true" />
        )}
      </div>
    </figure>
  );
}
