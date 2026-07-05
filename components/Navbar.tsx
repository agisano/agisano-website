"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const links = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 400,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 72,
        padding: "0 48px",
        transition: "background 0.4s",
        background: scrolled ? "rgba(7,9,12,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
      }}
    >
      <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
        <Image
          src="/logo.png"
          alt="Agisano"
          width={140}
          height={45}
          priority
          style={{ height: 34, width: "auto" }}
        />
      </Link>

      {/* Desktop */}
      <div className="hidden md:flex" style={{ alignItems: "center", gap: 40 }}>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            style={{
              fontSize: 13,
              color: "rgba(242,237,230,0.55)",
              transition: "color 0.2s",
              letterSpacing: "0.02em",
              fontFamily: "var(--font-inter)",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--cream)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(242,237,230,0.55)")}
          >
            {l.label}
          </Link>
        ))}
        <Link
          href="/contact"
          style={{
            background: "transparent",
            border: "1px solid rgba(242,237,230,0.2)",
            color: "var(--cream)",
            fontFamily: "var(--font-sora)",
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: "0.06em",
            padding: "10px 22px",
            borderRadius: 100,
            transition: "all 0.25s",
            textTransform: "uppercase",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "var(--orange)";
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--orange)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(242,237,230,0.2)";
          }}
        >
          Book Assessment
        </Link>
      </div>

      {/* Mobile toggle */}
      <button
        className="md:hidden"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        style={{
          background: "none",
          border: "none",
          color: "var(--cream)",
          cursor: "pointer",
          padding: 4,
        }}
      >
        {open ? (
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
        ) : (
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
        )}
      </button>

      {/* Mobile menu */}
      <div
        className="md:hidden"
        style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          background: "rgba(7,9,12,0.97)",
          backdropFilter: "blur(16px)",
          borderTop: "1px solid rgba(242,237,230,0.08)",
          maxHeight: open ? 300 : 0,
          overflow: "hidden",
          transition: "max-height 0.3s ease",
        }}
      >
        <div style={{ padding: "16px 24px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ fontSize: 15, color: "rgba(242,237,230,0.7)", fontFamily: "var(--font-sora)", fontWeight: 500 }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            style={{
              background: "var(--orange)",
              color: "white",
              fontFamily: "var(--font-sora)",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              padding: "14px 24px",
              borderRadius: 3,
              textAlign: "center",
              marginTop: 4,
            }}
          >
            Book Assessment
          </Link>
        </div>
      </div>
    </header>
  );
}
