"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      // Touch: tap-to-reveal service images
      document.querySelectorAll<HTMLElement>(".svc-row").forEach((row) => {
        row.addEventListener("click", () => {
          const isOpen = row.classList.contains("touch-open");
          document.querySelectorAll(".svc-row").forEach((r) => r.classList.remove("touch-open"));
          if (!isOpen) row.classList.add("touch-open");
        });
      });
      return;
    }

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

    document.querySelectorAll<HTMLElement>("a,button,.svc-row,.photo-cell").forEach((el) => {
      el.addEventListener("mouseenter", () => cur!.classList.add("expand"));
      el.addEventListener("mouseleave", () => cur!.classList.remove("expand"));
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div id="cursor" ref={cursorRef} style={{ opacity: 0 }} />
      <div className="grain" />
      <CookieBanner />

      {/* HERO */}
      <section
        className="relative flex flex-col justify-end overflow-hidden"
        style={{ minHeight: "100vh", background: "var(--ink)", paddingTop: 120 }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1800&q=85')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.28,
          }}
        />

        {/* Top scrolling strip */}
        <div className="top-strip">
          <div className="strip-track">
            {["Observatory Girls School","Enterprise WiFi","School Website","Brand Identity","Social Media","Managed IT","Building Together","Agisano",
              "Observatory Girls School","Enterprise WiFi","School Website","Brand Identity","Social Media","Managed IT","Building Together","Agisano",
            ].map((item, i) => (
              <span key={i} className="strip-item">{item}</span>
            ))}
          </div>
        </div>

        {/* Vertical index */}
        <div
          className="hero-index absolute flex flex-col items-center gap-3"
          style={{ right: 48, top: "50%", transform: "translateY(-50%)", zIndex: 3 }}
        >
          <span
            style={{
              fontFamily: "var(--font-sora)",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.14em",
              color: "rgba(242,237,230,0.25)",
              textTransform: "uppercase",
              writingMode: "vertical-rl",
            }}
          >
            Agisano
          </span>
          <div style={{ width: 1, height: 60, background: "linear-gradient(to bottom, rgba(232,93,27,0.6), transparent)" }} />
          <span
            style={{
              fontFamily: "var(--font-sora)",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.14em",
              color: "rgba(242,237,230,0.25)",
              textTransform: "uppercase",
              writingMode: "vertical-rl",
            }}
          >
            2025
          </span>
        </div>

        <div
          className="hero-body relative"
          style={{ zIndex: 3, padding: "0 48px 64px" }}
        >
          {/* Statement */}
          <div
            style={{
              fontFamily: "var(--font-sora)",
              fontWeight: 900,
              fontSize: "clamp(64px, 10.5vw, 168px)",
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
              color: "var(--cream)",
              marginBottom: 0,
            }}
          >
            <span style={{ display: "block" }}>Your school</span>
            <span
              style={{
                display: "block",
                backgroundImage: "url('https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1800&q=85')",
                backgroundSize: "cover",
                backgroundPosition: "center 40%",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                filter: "brightness(1.4) contrast(1.1) saturate(1.2)",
              }}
            >
              deserves
            </span>
            <span style={{ display: "block", color: "var(--cream)" }}>better.</span>
            <span
              style={{
                display: "block",
                color: "var(--cream)",
                opacity: 0.12,
                fontSize: "0.55em",
                letterSpacing: "0.01em",
                fontWeight: 300,
                fontStyle: "italic",
                fontFamily: "var(--font-inter)",
                marginTop: 16,
              }}
            >
              Most public schools are being prepared for a digital economy using analogue tools. We fix that.
            </span>
          </div>

          <div
            className="hero-meta"
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginTop: 40,
              paddingTop: 32,
              borderTop: "1px solid rgba(242,237,230,0.1)",
            }}
          >
            <p
              className="hero-desc"
              style={{
                maxWidth: 340,
                fontSize: 14,
                lineHeight: 1.75,
                color: "rgba(242,237,230,0.55)",
                fontFamily: "var(--font-inter)",
              }}
            >
              <strong style={{ color: "var(--cream)", fontWeight: 400 }}>Agisano</strong> partners exclusively with public schools — bringing enterprise-grade connectivity, technology, and digital presence to the schools that have been overlooked. Not as a side business. As our entire reason for existing.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <Link
                href="/contact"
                style={{
                  background: "var(--orange)",
                  color: "white",
                  fontFamily: "var(--font-sora)",
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  padding: "16px 32px",
                  borderRadius: 3,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  transition: "all 0.25s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "var(--orange2)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "var(--orange)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                }}
              >
                Is your school next?
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <a
                href="#ogs-section"
                style={{
                  color: "rgba(242,237,230,0.5)",
                  fontSize: 13,
                  fontFamily: "var(--font-sora)",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--cream)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(242,237,230,0.5)")}
              >
                See our work
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM STATEMENT */}
      <section
        style={{
          background: "var(--ink)",
          borderBottom: "1px solid rgba(242,237,230,0.07)",
          padding: "120px 48px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-sora)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(242,237,230,0.35)",
            marginBottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          The reality
          <span style={{ flex: 1, height: 1, background: "rgba(242,237,230,0.1)" }} />
        </p>
        <h2
          style={{
            fontFamily: "var(--font-sora)",
            fontWeight: 800,
            fontSize: "clamp(42px, 7.5vw, 118px)",
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            color: "var(--cream)",
            maxWidth: 1100,
          }}
        >
          Your learners are<br />
          preparing for<br />
          <em style={{ fontStyle: "normal", color: "var(--orange)" }}>tomorrow&apos;s economy</em><br />
          <span style={{ opacity: 0.25 }}>with yesterday&apos;s tools.</span>
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-inter)",
              fontSize: "clamp(15px, 1.8vw, 20px)",
              fontWeight: 300,
              lineHeight: 1.7,
              letterSpacing: "0.01em",
              color: "rgba(242,237,230,0.5)",
              maxWidth: 480,
              marginTop: 40,
              fontStyle: "italic",
            }}
          >
            No reliable internet. No school website. No brand. No IT support when things break. This isn&apos;t a resource problem — it&apos;s an access problem. And it&apos;s one we know how to solve.
          </span>
        </h2>
        <div
          style={{
            marginTop: 64,
            paddingTop: 40,
            borderTop: "1px solid rgba(242,237,230,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sora)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(242,237,230,0.25)",
            }}
          >
            Agisano · Gauteng · South Africa
          </span>
          <a
            href="#ogs-section"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-sora)",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.04em",
              color: "var(--orange)",
              transition: "gap 0.2s",
            }}
          >
            See what we did for one school
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-band">
        <div className="marquee-track">
          {["Before: No internet ·","After: Enterprise WiFi ·","Before: No website ·","After: Live online ·","Before: No identity ·","After: Full brand CI ·","Before: No IT support ·","After: Managed 24/7 ·",
            "Before: No internet ·","After: Enterprise WiFi ·","Before: No website ·","After: Live online ·","Before: No identity ·","After: Full brand CI ·","Before: No IT support ·","After: Managed 24/7 ·",
          ].map((item, i) => (
            <span key={i} className="marquee-item">{item}</span>
          ))}
        </div>
      </div>

      {/* OGS CASE STUDY */}
      <section id="ogs-section" style={{ background: "var(--cream)", padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: 64,
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "var(--font-sora)",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--orange)",
                  marginBottom: 12,
                }}
              >
                Case study · Gauteng, 2024
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-sora)",
                  fontSize: "clamp(32px, 4.5vw, 58px)",
                  fontWeight: 900,
                  color: "var(--ink)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.0,
                  marginTop: 8,
                }}
              >
                Observatory Girls School.<br />
                <span style={{ color: "var(--orange)" }}>Four gaps. One partner.</span>
              </h2>
            </div>
            <p style={{ fontSize: 13, color: "rgba(7,9,12,0.45)", maxWidth: 260, lineHeight: 1.7, textAlign: "right" }}>
              Everything you see below was absent before Agisano arrived. Every single thing was new.
            </p>
          </div>

          {/* Before / After */}
          <div className="ogs-ba-grid">
            <div style={{ background: "rgba(7,9,12,0.06)", padding: "28px 32px" }}>
              <p style={{ fontFamily: "var(--font-sora)", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(7,9,12,0.35)", marginBottom: 12 }}>Before Agisano</p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {["No internet connection — or unreliable at best","No school website — zero digital presence","No brand identity — inconsistent, dated look","No social media — community had no channel"].map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "rgba(7,9,12,0.6)" }}>
                    <span style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(7,9,12,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "rgba(7,9,12,0.4)", flexShrink: 0 }}>✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: "var(--orange)", padding: "28px 32px" }}>
              <p style={{ fontFamily: "var(--font-sora)", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 12 }}>After Agisano</p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {["Enterprise-grade WiFi — full campus coverage","Professional school website — live and maintained","Complete CI — logo, colours, typography, brand system","Active social media — managed by Agisano monthly"].map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "white" }}>
                    <span style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "white", flexShrink: 0 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Four deliverables */}
          <div className="ogs-deliverables">
            {[
              {
                icon: <svg width="16" height="16" fill="none" stroke="#E85D1B" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20" strokeLinecap="round" strokeWidth="3"/></svg>,
                tag: "Connectivity",
                title: "Enterprise WiFi from scratch.",
                body: "Designed and deployed a full enterprise-grade wireless network across the entire campus. No more dropped connections, no more sharing a single router. Staff and learners on separate SSIDs. Monitored and managed remotely, ongoing.",
                bg: "var(--ink)",
                borderStyle: {} as React.CSSProperties,
              },
              {
                icon: <svg width="16" height="16" fill="none" stroke="#E85D1B" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
                tag: "Digital Presence",
                title: "A website that earns trust.",
                body: "Designed and built a professional school website from zero — their first. Parents can find term dates, contact staff, and follow school news. The school now has a credible digital front door that matches the quality of its education.",
                bg: "rgba(242,237,230,0.05)",
                borderStyle: { border: "1px solid rgba(242,237,230,0.08)" } as React.CSSProperties,
              },
              {
                icon: <svg width="16" height="16" fill="none" stroke="#E85D1B" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg>,
                tag: "Brand Identity",
                title: "A brand built from nothing.",
                body: "Full corporate identity created from scratch — logo, colour palette, typography, and brand guidelines. The school now has a consistent visual identity across all printed and digital communications. Something to be proud of.",
                bg: "rgba(242,237,230,0.05)",
                borderStyle: { border: "1px solid rgba(242,237,230,0.08)" } as React.CSSProperties,
              },
              {
                icon: <svg width="16" height="16" fill="none" stroke="#E85D1B" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
                tag: "Social Media",
                title: "A community, connected.",
                body: "Set up and now manage the school's social media channels. Parents, learners, and alumni can follow school life, achievements, and updates. The school's voice is consistent, professional, and active — without adding to staff workload.",
                bg: "var(--ink)",
                borderStyle: {} as React.CSSProperties,
              },
            ].map(({ icon, tag, title, body, bg, borderStyle }) => (
              <div key={tag} style={{ background: bg, padding: 40, ...borderStyle }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 36, height: 36, background: "rgba(232,93,27,0.15)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {icon}
                  </div>
                  <span style={{ fontFamily: "var(--font-sora)", fontSize: 11, fontWeight: 700, color: "var(--orange)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{tag}</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-sora)", fontSize: 20, fontWeight: 800, color: "var(--cream)", letterSpacing: "-0.02em", marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: 13, color: "rgba(242,237,230,0.5)", lineHeight: 1.75 }}>{body}</p>
              </div>
            ))}
          </div>

          {/* Pull quote */}
          <div style={{ borderTop: "1px solid rgba(7,9,12,0.1)", paddingTop: 40, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
            <p
              style={{
                fontFamily: "var(--font-sora)",
                fontSize: "clamp(18px, 2.5vw, 26px)",
                fontWeight: 700,
                color: "var(--ink)",
                letterSpacing: "-0.02em",
                lineHeight: 1.3,
                maxWidth: 640,
              }}
            >
              &ldquo;Everything was new. The internet. The website. The brand. The social media. <em style={{ fontStyle: "normal", color: "var(--orange)" }}>Agisano delivered all of it.</em>&rdquo;
            </p>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <p style={{ fontFamily: "var(--font-sora)", fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>Observatory Girls School</p>
              <p style={{ fontSize: 12, color: "rgba(7,9,12,0.45)", marginTop: 2 }}>Gauteng · Active client</p>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginTop: 16,
                  background: "var(--orange)",
                  color: "white",
                  fontFamily: "var(--font-sora)",
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  padding: "12px 24px",
                  borderRadius: 3,
                }}
              >
                Is your school next? →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES LIST */}
      <section style={{ background: "var(--ink)", padding: 0 }}>
        <div
          style={{
            padding: "80px 48px 48px",
            borderBottom: "1px solid rgba(242,237,230,0.08)",
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-sora)",
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 700,
              color: "var(--cream)",
              letterSpacing: "-0.02em",
            }}
          >
            How we do it
          </h2>
          <p style={{ fontSize: 13, color: "rgba(242,237,230,0.4)", maxWidth: 260, lineHeight: 1.7, textAlign: "right" }}>
            Four capabilities. Delivered as one integrated partner — not four separate vendors.
          </p>
        </div>
        <ul style={{ listStyle: "none" }}>
          {[
            { num: "01", name: "Your school, connected.", desc: "Enterprise-grade internet and WiFi designed for schools. The same infrastructure large companies use — built for your campus, your budget, your learners.", tag: "Connectivity & WiFi", img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=80" },
            { num: "02", name: "The tools your learners need.", desc: "Laptops, smart boards, projectors, ICT labs. Sourced, configured, asset-tagged, and delivered classroom-ready. No procurement headaches — we manage it.", tag: "ICT Equipment", img: "https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=400&q=80" },
            { num: "03", name: "IT that stays on.", desc: "Remote monitoring, a real helpdesk, and on-site support. We manage your infrastructure so your staff never have to. When something breaks at 7am before school starts, we're already on it.", tag: "Managed Services", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" },
            { num: "04", name: "A school parents are proud to show.", desc: "Website, brand identity, and social media — built and managed. Your school's reputation online should reflect the quality of education inside. We make that happen.", tag: "Digital Presence", img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&q=80" },
          ].map(({ num, name, desc, tag, img }) => (
            <li key={num} className="svc-row">
              <span
                style={{
                  fontFamily: "var(--font-sora)",
                  fontSize: "clamp(48px, 5vw, 72px)",
                  fontWeight: 800,
                  color: "rgba(242,237,230,0.06)",
                  letterSpacing: "-0.04em",
                  minWidth: 100,
                  lineHeight: 1,
                  flexShrink: 0,
                }}
              >
                {num}
              </span>
              <div style={{ flex: 1, padding: "0 32px" }}>
                <div
                  style={{
                    fontFamily: "var(--font-sora)",
                    fontSize: "clamp(18px, 2.5vw, 30px)",
                    fontWeight: 700,
                    color: "var(--cream)",
                    letterSpacing: "-0.01em",
                    marginBottom: 6,
                  }}
                >
                  {name}
                </div>
                <div style={{ fontSize: 13, color: "rgba(242,237,230,0.4)", lineHeight: 1.65, maxWidth: 380 }}>{desc}</div>
                <span
                  style={{
                    display: "inline-block",
                    marginTop: 10,
                    fontFamily: "var(--font-sora)",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--orange)",
                    border: "1px solid rgba(232,93,27,0.3)",
                    padding: "4px 10px",
                    borderRadius: 100,
                  }}
                >
                  {tag}
                </span>
                <div className="svc-touch-panel">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="" style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 6, marginTop: 16 }} />
                </div>
              </div>
              <span
                style={{
                  marginLeft: "auto",
                  fontSize: 22,
                  color: "rgba(242,237,230,0.2)",
                  flexShrink: 0,
                  transition: "color 0.3s",
                  fontFamily: "var(--font-sora)",
                }}
              >
                →
              </span>
              <div className="svc-img-hover">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt="" />
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* NUMBERS */}
      <section style={{ background: "var(--cream2)", padding: "100px 48px" }}>
        <div className="numbers-grid">
          {[
            { val: <>100<span style={{ color: "var(--orange)" }}>%</span></>, strong: "Public schools only", body: "Not a side market. Our sole focus — by design." },
            { val: <><span style={{ color: "var(--orange)" }}>4</span></>, strong: "Services. One partner.", body: "Connectivity, equipment, support, digital — integrated, not fragmented." },
            { val: <>Q<span style={{ color: "var(--orange)" }}>1–3</span></>, strong: "Quintile priority", body: "The schools that have waited longest get served first." },
          ].map(({ val, strong, body }, i) => (
            <div key={i} className="num-block">
              <div
                style={{
                  fontFamily: "var(--font-sora)",
                  fontSize: "clamp(60px, 8vw, 110px)",
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                  lineHeight: 0.9,
                  color: "var(--ink)",
                  marginBottom: 16,
                }}
              >
                {val}
              </div>
              <div style={{ fontSize: 13, color: "rgba(7,9,12,0.5)", lineHeight: 1.65, maxWidth: 200 }}>
                <strong style={{ color: "var(--ink)", display: "block", fontSize: 15, marginBottom: 4, fontFamily: "var(--font-sora)", fontWeight: 600 }}>{strong}</strong>
                {body}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PHOTO GRID */}
      <div className="photo-grid">
        {[
          "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80",
          "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80",
          "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80",
          "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80",
          "https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=600&q=80",
        ].map((src, i) => (
          <div key={i} className={`photo-cell${i === 0 ? " tall" : ""}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(7,9,12,0.6), transparent 60%)",
                opacity: 0,
                transition: "opacity 0.3s",
              }}
            />
          </div>
        ))}
      </div>

      {/* WHY */}
      <section style={{ background: "var(--ink)", padding: "100px 48px" }}>
        <div className="why-inner">
          <div>
            <h2
              style={{
                fontFamily: "var(--font-sora)",
                fontSize: "clamp(36px, 4.5vw, 60px)",
                fontWeight: 800,
                color: "var(--cream)",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                marginBottom: 24,
              }}
            >
              Why principals<br />choose <em style={{ fontStyle: "normal", color: "var(--orange)" }}>Agisano.</em>
            </h2>
            <p style={{ fontSize: 15, color: "rgba(242,237,230,0.5)", lineHeight: 1.8, marginBottom: 32 }}>
              Other ICT companies see public schools as a difficult market with thin margins. We see them as the most important clients we could work with. That difference in belief changes everything about how we operate.
            </p>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "var(--orange)",
                color: "white",
                fontFamily: "var(--font-sora)",
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                padding: "16px 32px",
                borderRadius: 3,
              }}
            >
              Talk to us — it&apos;s free
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { n: "01", title: "We understand your constraints", body: "SGB budgets, NSNP funding cycles, Quintile classifications, circuit manager approvals. We've navigated all of it. We design solutions that fit the real world — not the ideal one." },
              { n: "02", title: "We don't disappear after install", body: "Our MSP model means we're still your team months and years later. When the wifi drops the morning of an exam, you call us. We pick up." },
              { n: "03", title: "One relationship. Everything included.", body: 'You deal with one company for internet, hardware, IT support, and digital presence. No vendor blame game. No "that\'s not our problem." One account. Full accountability.' },
              { n: "04", title: "We’re from here. This is personal.", body: "Gauteng-born. We grew up in these communities. The schools we serve aren’t a contract — they’re our neighbours’ children." },
            ].map(({ n, title, body }) => (
              <li
                key={n}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 20,
                  padding: "24px 0",
                  borderBottom: "1px solid rgba(242,237,230,0.07)",
                }}
              >
                <span style={{ fontFamily: "var(--font-sora)", fontSize: 11, fontWeight: 700, color: "var(--orange)", letterSpacing: "0.1em", minWidth: 28, marginTop: 2 }}>{n}</span>
                <div>
                  <strong style={{ display: "block", fontFamily: "var(--font-sora)", fontSize: 15, color: "var(--cream)", fontWeight: 600, marginBottom: 4 }}>{title}</strong>
                  <p style={{ fontSize: 13, color: "rgba(242,237,230,0.45)", lineHeight: 1.7 }}>{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cta-final">
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1800&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.12,
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ fontFamily: "var(--font-sora)", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 20 }}>Free · On-site · No obligation</p>
          <h2
            style={{
              fontFamily: "var(--font-sora)",
              fontSize: "clamp(44px, 5.5vw, 80px)",
              fontWeight: 900,
              color: "var(--cream)",
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              marginBottom: 32,
            }}
          >
            Is your school<br /><em style={{ fontStyle: "normal", color: "var(--orange)" }}>ready to be next?</em>
          </h2>
          <p style={{ fontSize: 15, color: "rgba(242,237,230,0.5)", lineHeight: 1.8, maxWidth: 400, marginBottom: 40 }}>
            Observatory Girls School started with nothing digital. Today they have enterprise WiFi, a live website, a full brand identity, and active social media channels. The assessment that started it all took 60 minutes.
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "var(--orange)",
              color: "white",
              fontFamily: "var(--font-sora)",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              padding: "16px 32px",
              borderRadius: 3,
            }}
          >
            Book your 60-minute assessment
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
        <div className="cta-right-box">
          <div
            style={{
              background: "rgba(242,237,230,0.04)",
              border: "1px solid rgba(242,237,230,0.1)",
              borderRadius: 12,
              padding: 40,
              backdropFilter: "blur(8px)",
            }}
          >
            <p style={{ fontFamily: "var(--font-sora)", fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 6 }}>What happens after you reach out</p>
            <h3 style={{ fontFamily: "var(--font-sora)", fontSize: 22, fontWeight: 700, color: "var(--cream)", marginBottom: 24, lineHeight: 1.2 }}>A 60-minute visit. A clear plan. No pressure.</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
              {["We reply within 1 business day","We schedule around your school calendar","60-minute on-site assessment — free, no obligation","Written proposal within 3 business days","You decide. We never hard sell."].map((row) => (
                <div key={row} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 13, color: "rgba(242,237,230,0.55)" }}>
                  <span style={{ width: 6, height: 6, background: "var(--orange)", borderRadius: "50%", flexShrink: 0 }} />
                  {row}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function CookieBanner() {
  useEffect(() => {
    if (localStorage.getItem("cookie_consent")) {
      document.getElementById("cookieBar")?.classList.add("hidden");
    }
  }, []);

  return (
    <div className="cookie-bar" id="cookieBar">
      <p className="cookie-bar-text">
        We use cookies to improve your experience and analyse site usage. By continuing you agree to our{" "}
        <a href="/privacy">Privacy Policy</a>. We comply with POPI Act requirements.
      </p>
      <div className="cookie-bar-btns">
        <button
          className="cookie-btn-decline"
          onClick={() => {
            localStorage.setItem("cookie_consent", "declined");
            document.getElementById("cookieBar")?.classList.add("hidden");
          }}
        >
          Decline
        </button>
        <button
          className="cookie-btn-accept"
          onClick={() => {
            localStorage.setItem("cookie_consent", "accepted");
            document.getElementById("cookieBar")?.classList.add("hidden");
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
