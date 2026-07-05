"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const cur = cursorRef.current;
    if (!cur) return;
    let mx = 0, my = 0, cx = 0, cy = 0;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; cur.style.opacity = "1"; };
    document.addEventListener("mousemove", onMove);

    let rafId: number;
    function animCursor() {
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      cur!.style.left = cx + "px";
      cur!.style.top = cy + "px";
      rafId = requestAnimationFrame(animCursor);
    }
    animCursor();

    const expand = () => cur.classList.add("expand");
    const shrink = () => cur.classList.remove("expand");
    const bind = () => {
      document.querySelectorAll<HTMLElement>("a,button,input,select,textarea,.svc-row,.photo-cell").forEach((el) => {
        el.addEventListener("mouseenter", expand);
        el.addEventListener("mouseleave", shrink);
      });
    };
    bind();
    const observer = new MutationObserver(bind);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return <div id="cursor" ref={cursorRef} style={{ opacity: 0 }} />;
}
