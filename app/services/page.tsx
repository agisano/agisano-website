import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — Agisano",
  description: "Four services. One partner. Connectivity, ICT equipment, managed services, and digital presence — built for public schools.",
};

const services = [
  {
    num: "01",
    title: "Internet & WiFi Installation",
    body: "We design, supply, and install reliable internet and WiFi networks built for school environments — high density, high usage, zero tolerance for downtime during school hours.",
    features: ["Fibre, LTE, and fixed wireless options", "Full campus WiFi design and installation", "Network infrastructure and cabling", "SSID segmentation (staff / learner / admin)", "Signal testing and coverage mapping", "Router, switch, and access point configuration"],
    img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80",
  },
  {
    num: "02",
    title: "ICT Equipment Supply",
    body: "We source, configure, and deliver ICT equipment ready for the classroom. No unboxing chaos — everything arrives set up, labelled, and with asset registers included.",
    features: ["Laptops and tablets for learners and staff", "Smart boards and interactive displays", "Projectors and AV equipment", "ICT lab setup and infrastructure", "Asset tagging and inventory management", "Warranty management and replacement support"],
    img: "https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=800&q=80",
  },
  {
    num: "03",
    title: "Managed IT Services",
    body: "The install is just the beginning. Our MSP offering means ongoing monitoring, support, and maintenance — so your infrastructure keeps working, and your staff have someone to call.",
    features: ["Remote monitoring and alerting", "Helpdesk and technical support", "Device management (MDM)", "Software updates and security patching", "On-site support visits", "Monthly reporting and health checks"],
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  },
  {
    num: "04",
    title: "Digital Presence",
    body: "A professional school website and digital communications build trust with parents, attract learners, and give your school the presence it deserves in the community.",
    features: ["Custom school website design and build", "Digital newsletters (WhatsApp & email)", "School branding and identity", "Social media setup and templates", "Event and notice management", "Parent communication tools"],
    img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
  },
];

const process = [
  { n: "01", title: "Free on-site assessment", body: "We come to your school. Walk the campus. Understand your needs, your budget, and your constraints. No cost. No obligation." },
  { n: "02", title: "Tailored proposal", body: "We design a solution that fits — not a generic package. A clear quote with exactly what's included, nothing padded." },
  { n: "03", title: "Installation", body: "Scheduled around the school calendar to minimise disruption. Professional installation by our own team." },
  { n: "04", title: "Handover & staff training", body: "Training, documentation, full walkthrough. We don't leave until you're confident." },
  { n: "05", title: "Ongoing managed support", body: "Proactive monitoring, real helpdesk, regular check-ins. We stay in your corner — indefinitely." },
];

export default function Services() {
  return (
    <>
      {/* HERO */}
      <section
        style={{
          minHeight: "60vh",
          background: "var(--cream)",
          padding: "140px 48px 80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
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
          What we offer
        </span>
        <h1
          style={{
            fontFamily: "var(--font-sora)",
            fontSize: "clamp(52px, 8vw, 120px)",
            fontWeight: 900,
            color: "var(--ink)",
            letterSpacing: "-0.05em",
            lineHeight: 0.9,
            marginBottom: 32,
          }}
        >
          Four services.<br />
          <em style={{ fontStyle: "normal", color: "var(--orange)" }}>One partner.</em>
        </h1>
        <p style={{ fontSize: 16, color: "rgba(7,9,12,0.5)", lineHeight: 1.8, maxWidth: 500 }}>
          Everything a public school needs to go from disconnected to fully equipped. Connectivity, hardware, support, and digital — under one roof.
        </p>
      </section>

      {/* SERVICE DETAILS */}
      {services.map(({ num, title, body, features, img }, i) => (
        <section
          key={num}
          style={{
            padding: "80px 48px",
            borderBottom: "1px solid rgba(7,9,12,0.08)",
            background: i % 2 === 0 ? "var(--warm-white)" : "var(--cream2)",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 80,
                alignItems: "center",
                direction: i % 2 === 1 ? "rtl" : "ltr",
              }}
              className="svc-detail-inner-grid"
            >
              <div style={{ direction: "ltr" }}>
                <div
                  style={{
                    fontFamily: "var(--font-sora)",
                    fontSize: "clamp(80px, 9vw, 130px)",
                    fontWeight: 900,
                    color: "rgba(7,9,12,0.05)",
                    letterSpacing: "-0.05em",
                    lineHeight: 1,
                    marginBottom: -20,
                  }}
                >
                  {num}
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-sora)",
                    fontSize: "clamp(24px, 3vw, 38px)",
                    fontWeight: 800,
                    color: "var(--ink)",
                    letterSpacing: "-0.02em",
                    marginBottom: 16,
                  }}
                >
                  {title}
                </h2>
                <p style={{ fontSize: 14, color: "rgba(7,9,12,0.55)", lineHeight: 1.8, marginBottom: 24 }}>{body}</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
                  {features.map((f) => (
                    <li key={f} style={{ fontSize: 13, color: "rgba(7,9,12,0.6)", display: "flex", gap: 10, alignItems: "baseline" }}>
                      <span style={{ color: "var(--orange)", flexShrink: 0 }}>—</span>
                      {f}
                    </li>
                  ))}
                </ul>
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
                    padding: "14px 28px",
                    borderRadius: 3,
                  }}
                >
                  Get a free assessment
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
              <div style={{ direction: "ltr", borderRadius: 8, overflow: "hidden", aspectRatio: "4/3" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* PROCESS */}
      <section style={{ background: "var(--ink)", padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 64 }}>
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
              How it works
            </span>
            <h2
              style={{
                fontFamily: "var(--font-sora)",
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 800,
                color: "var(--cream)",
                letterSpacing: "-0.03em",
              }}
            >
              Simple. Structured. Supportive.
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {process.map(({ n, title, body }) => (
              <div
                key={n}
                style={{
                  display: "grid",
                  gridTemplateColumns: "60px 1fr 2fr",
                  gap: 40,
                  alignItems: "start",
                  padding: "28px 0",
                  borderBottom: "1px solid rgba(242,237,230,0.07)",
                }}
                className="proc-row-grid"
              >
                <span style={{ fontFamily: "var(--font-sora)", fontSize: 11, fontWeight: 700, color: "var(--orange)", letterSpacing: "0.12em" }}>{n}</span>
                <div style={{ fontFamily: "var(--font-sora)", fontSize: 16, fontWeight: 700, color: "var(--cream)" }}>{title}</div>
                <div style={{ fontSize: 13, color: "rgba(242,237,230,0.45)", lineHeight: 1.7 }}>{body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
