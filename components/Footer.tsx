import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div
          style={{
            fontFamily: "var(--font-sora)",
            fontSize: "clamp(28px, 3.5vw, 46px)",
            fontWeight: 800,
            color: "var(--cream)",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            maxWidth: 500,
          }}
        >
          Every learner deserves a<br />
          <em style={{ fontStyle: "normal", color: "var(--orange)" }}>connected classroom.</em>
        </div>
        <div className="footer-cols">
          <div>
            <h5
              style={{
                fontFamily: "var(--font-sora)",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(242,237,230,0.25)",
                marginBottom: 20,
              }}
            >
              Services
            </h5>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {["Internet & WiFi", "ICT Equipment", "Managed Services", "Digital Presence"].map((s) => (
                <li key={s}>
                  <Link href="/services" className="footer-link">{s}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5
              style={{
                fontFamily: "var(--font-sora)",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(242,237,230,0.25)",
                marginBottom: 20,
              }}
            >
              Company
            </h5>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {[{ label: "About", href: "/about" }, { label: "Contact", href: "/contact" }, { label: "Privacy Policy", href: "/privacy" }].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5
              style={{
                fontFamily: "var(--font-sora)",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(242,237,230,0.25)",
                marginBottom: 20,
              }}
            >
              Contact
            </h5>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              <li>
                <a href="mailto:hello@agisano.com" className="footer-link">hello@agisano.com</a>
              </li>
              <li>
                <span style={{ fontSize: 13, color: "rgba(242,237,230,0.5)" }}>Gauteng, South Africa</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image
            src="/logo.png"
            alt="Agisano"
            width={200}
            height={64}
            style={{ height: 69, width: "auto" }}
          />
        </div>
        <p style={{ fontSize: 12, color: "rgba(242,237,230,0.25)" }}>© {new Date().getFullYear()} Agisano. Building Together.</p>
        <p style={{ fontSize: 12, color: "rgba(242,237,230,0.25)" }}>Registered in South Africa · agisano.com</p>
      </div>
    </footer>
  );
}
