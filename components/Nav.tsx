"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/content";
import Mark from "./Mark";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`nav ${scrolled ? "nav-lift" : ""} ${open ? "nav-open" : ""}`}>
      <div className="nav-inner shell">
        <Link href="/" className="nav-brand" aria-label="Agisano — home">
          <Mark size={20} />
          {/* Wordmark is always lowercase (logo-pack/README.txt). */}
          <span className="wordmark">agisano</span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="link-draw nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="nav-drawer"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="nav-toggle-bars" data-open={open} />
        </button>
      </div>

      <div id="nav-drawer" className="nav-drawer" hidden={!open}>
        <nav aria-label="Primary — mobile">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
