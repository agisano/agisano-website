import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Agisano",
  description: "Agisano was built on a single conviction: the digital divide in South Africa's public schools is a solvable problem.",
};

export default function About() {
  return (
    <>
      {/* HERO */}
      <section
        style={{
          minHeight: "100vh",
          background: "var(--ink)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          position: "relative",
          overflow: "hidden",
        }}
        className="about-hero-grid"
      >
        <div
          style={{
            padding: "160px 48px 80px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            position: "relative",
            zIndex: 2,
          }}
          className="about-hero-left"
        >
          <span
            style={{
              fontFamily: "var(--font-sora)",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--orange)",
              marginBottom: 20,
              display: "inline-block",
            }}
          >
            Who we are
          </span>
          <h1
            style={{
              fontFamily: "var(--font-sora)",
              fontSize: "clamp(48px, 6.5vw, 92px)",
              fontWeight: 900,
              color: "var(--cream)",
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              marginBottom: 32,
            }}
          >
            Built for the schools<br />
            <em style={{ fontStyle: "normal", color: "var(--orange)" }}>that built us.</em>
          </h1>
          <p style={{ fontSize: 15, color: "rgba(242,237,230,0.5)", lineHeight: 1.8, maxWidth: 400, marginBottom: 40 }}>
            Agisano was founded in Gauteng by people who grew up in and care deeply about South Africa&apos;s public school system.
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-sora)",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.04em",
              color: "var(--orange)",
              textDecoration: "none",
            }}
          >
            Work with us
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
        <div style={{ position: "relative" }} className="about-hero-right">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=900&q=80"
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, var(--ink) 0%, transparent 30%)",
            }}
          />
        </div>
      </section>

      {/* PULL QUOTE */}
      <section
        style={{
          background: "var(--cream)",
          padding: "80px 48px",
          display: "flex",
          alignItems: "center",
          gap: 80,
        }}
        className="about-pull"
      >
        <div
          style={{
            fontFamily: "var(--font-sora)",
            fontSize: "clamp(28px, 4vw, 54px)",
            fontWeight: 800,
            color: "var(--ink)",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            flex: 1,
          }}
        >
          &ldquo;The name says it all.<br />
          <em style={{ fontStyle: "normal", color: "var(--orange)" }}>Agisano</em> — building together.&rdquo;
        </div>
        <div style={{ minWidth: 300 }} className="about-pull-right">
          <p style={{ fontSize: 14, color: "rgba(7,9,12,0.55)", lineHeight: 1.8, marginBottom: 16 }}>
            We work exclusively with public schools. Quintile 1–3 priority. Communities that have been waiting for a partner who treats them like the priority they are — not a secondary market.
          </p>
          <Link
            href="/services"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-sora)",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.04em",
              color: "var(--ink)",
            }}
          >
            See our services
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </section>

      {/* STORY */}
      <section
        style={{
          background: "var(--ink)",
          padding: "100px 48px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
        }}
        className="about-story-grid"
      >
        <div>
          <span
            style={{
              fontFamily: "var(--font-sora)",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--orange)",
              marginBottom: 16,
              display: "inline-block",
            }}
          >
            Our story
          </span>
          <h2
            style={{
              fontFamily: "var(--font-sora)",
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 800,
              color: "var(--cream)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              marginBottom: 32,
            }}
          >
            A solvable<br /><em style={{ fontStyle: "normal", color: "var(--orange)" }}>problem.</em>
          </h2>
          <p style={{ fontSize: 14, color: "rgba(242,237,230,0.5)", lineHeight: 1.85, marginBottom: 16 }}>
            Agisano was built on a single conviction: the digital divide in South African education is not inevitable. It&apos;s a solvable problem — and one that too many ICT providers have ignored because public schools aren&apos;t seen as a profitable market.
          </p>
          <p style={{ fontSize: 14, color: "rgba(242,237,230,0.5)", lineHeight: 1.85, marginBottom: 16 }}>
            We saw Quintile 1–3 schools being prepared for a digital economy using analogue tools. Teachers trying to teach 21st-century skills with no internet, no devices, and no support.
          </p>
          <p style={{ fontSize: 14, color: "rgba(242,237,230,0.5)", lineHeight: 1.85, marginBottom: 32 }}>
            So we built Agisano — structured to work within their realities: <strong style={{ color: "var(--cream)", fontWeight: 500 }}>SGB budgets, NSNP constraints, and the need for a partner who actually shows up.</strong>
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
            Book assessment
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
        <div>
          <div style={{ borderRadius: 8, overflow: "hidden", aspectRatio: "4/3", marginBottom: 3 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=700&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
            <div style={{ borderRadius: 4, overflow: "hidden", aspectRatio: "1" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div
              style={{
                borderRadius: 4,
                overflow: "hidden",
                aspectRatio: "1",
                background: "var(--orange)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <span style={{ fontFamily: "var(--font-sora)", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>Agisano</span>
              <span style={{ fontFamily: "var(--font-sora)", fontSize: 28, fontWeight: 900, color: "white", letterSpacing: "-0.03em", textAlign: "center", lineHeight: 1.1 }}>Building<br />Together</span>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ background: "var(--ink)", padding: "0 48px 100px" }}>
        <div
          style={{
            padding: "60px 0 40px",
            borderBottom: "1px solid rgba(242,237,230,0.08)",
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: 0,
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-sora)",
              fontSize: "clamp(24px, 3vw, 38px)",
              fontWeight: 700,
              color: "var(--cream)",
              letterSpacing: "-0.02em",
            }}
          >
            What we stand for
          </h2>
          <p style={{ fontSize: 13, color: "rgba(242,237,230,0.35)" }}>Four principles. Non-negotiable.</p>
        </div>
        <ul style={{ listStyle: "none" }}>
          {[
            { n: "01", title: "Community first", body: "We work exclusively with public schools. Not as a side market — as our entire reason for existing. Every decision gets made through that lens." },
            { n: "02", title: "Honest and direct", body: "Clear pricing. Plain language. We tell you what you need, not what maximises our invoice. A principal shouldn't need an IT degree to understand our proposal." },
            { n: "03", title: "Long-term partnership", body: "Our MSP model means we stay invested in your school's success long after installation day. We're still here in year two when something breaks." },
            { n: "04", title: "Practical excellence", body: "We know what works in the real conditions of South African public schools. Not just what looks good on a spec sheet — what actually holds up." },
          ].map(({ n, title, body }) => (
            <li
              key={n}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr 1fr",
                gap: 40,
                alignItems: "start",
                padding: "32px 0",
                borderBottom: "1px solid rgba(242,237,230,0.07)",
              }}
              className="val-row-grid"
            >
              <span style={{ fontFamily: "var(--font-sora)", fontSize: 11, fontWeight: 700, color: "rgba(232,93,27,0.7)", letterSpacing: "0.1em" }}>{n}</span>
              <div style={{ fontFamily: "var(--font-sora)", fontSize: 17, fontWeight: 700, color: "var(--cream)" }}>{title}</div>
              <div style={{ fontSize: 13, color: "rgba(242,237,230,0.45)", lineHeight: 1.7 }}>{body}</div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
