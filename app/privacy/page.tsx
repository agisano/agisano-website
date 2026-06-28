import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Agisano",
  description: "How Agisano collects, uses, and protects your personal information in compliance with the POPIA.",
};

export default function Privacy() {
  return (
    <>
      <section style={{ background: "#07090C" }} className="pt-40 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-4"
            style={{ color: "#E85D1B", fontFamily: "var(--font-sora)" }}
          >
            Legal
          </p>
          <h1
            className="font-black leading-none mb-4"
            style={{
              fontFamily: "var(--font-sora)",
              fontSize: "clamp(48px,7vw,88px)",
              letterSpacing: "-0.04em",
              color: "#F2EDE6",
            }}
          >
            Privacy Policy
          </h1>
          <p style={{ color: "rgba(242,237,230,0.4)", fontSize: 13 }}>
            Last updated: May 2026 · Agisano (Pty) Ltd · agisano.com
          </p>
        </div>
      </section>

      <section style={{ background: "#F2EDE6" }} className="py-20 px-6">
        <div className="max-w-3xl mx-auto">

          <div
            className="mb-12 p-4 rounded-r-lg"
            style={{ background: "rgba(232,93,27,0.08)", borderLeft: "3px solid #E85D1B" }}
          >
            <p style={{ fontSize: 13, color: "rgba(7,9,12,0.7)", lineHeight: 1.7, fontFamily: "var(--font-inter)" }}>
              This Privacy Policy explains how Agisano (Pty) Ltd collects, uses, and protects your personal
              information in compliance with the <strong>Protection of Personal Information Act, 4 of 2013 (POPIA)</strong> of South Africa.
            </p>
          </div>

          {[
            {
              heading: "1. Who we are",
              content: (
                <>
                  <p>Agisano (Pty) Ltd ("Agisano", "we", "us") is a South African company registered in Gauteng, providing ICT services to public schools. We are the <strong>Responsible Party</strong> under POPIA for personal information collected through agisano.com.</p>
                  <p>Contact: <a href="mailto:hello@agisano.com" style={{ color: "#E85D1B" }}>hello@agisano.com</a> · Gauteng, South Africa</p>
                </>
              ),
            },
            {
              heading: "2. What personal information we collect",
              content: (
                <>
                  <p>We only collect information necessary for the purposes described below:</p>
                  <ul>
                    {["Your name and job title (Principal, HOD, IT Coordinator)", "School name and location", "Email address and phone number", "Details about your school's ICT needs that you voluntarily provide", "Website usage data via analytics cookies (with consent)"].map(i => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                  <p>We do not collect sensitive personal information as defined under POPIA Section 26, and do not collect information from learners or minors.</p>
                </>
              ),
            },
            {
              heading: "3. Why we collect it",
              content: (
                <ul>
                  {["To respond to your assessment booking request", "To schedule and conduct on-site assessments", "To send you a proposal following your assessment", "To improve our website — only with your consent to analytics cookies"].map(i => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              ),
            },
            {
              heading: "4. How we use and store your information",
              content: (
                <>
                  <p>Your information is used only for the purpose for which it was collected. We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
                  <p>We may share information with email/CRM service providers subject to data processing agreements, and with law enforcement where required by law. Information is retained for a maximum of 3 years after last engagement.</p>
                </>
              ),
            },
            {
              heading: "5. Your rights under POPIA",
              content: (
                <>
                  <ul>
                    {["Request access to personal information we hold about you", "Request correction of inaccurate information", "Request deletion of your information", "Object to processing of your information", "Lodge a complaint with the Information Regulator of South Africa"].map(i => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                  <p>To exercise any of these rights, email <a href="mailto:hello@agisano.com" style={{ color: "#E85D1B" }}>hello@agisano.com</a>. We respond within 30 days. Complaints: <a href="https://inforegulator.org.za" target="_blank" rel="noopener" style={{ color: "#E85D1B" }}>inforegulator.org.za</a></p>
                </>
              ),
            },
            {
              heading: "6. Cookies",
              content: (
                <>
                  <ul>
                    <li><strong>Essential cookies</strong> — required for the website to function. Cannot be declined.</li>
                    <li><strong>Analytics cookies</strong> — help us understand how visitors use the site. Only set with your consent.</li>
                  </ul>
                  <p>You can withdraw consent at any time by clearing browser cookies and declining on your next visit.</p>
                </>
              ),
            },
            {
              heading: "7. Security",
              content: <p>We take reasonable technical and organisational measures to protect your personal information. Our website uses HTTPS encryption for all data transmission.</p>,
            },
            {
              heading: "8. Changes to this policy",
              content: <p>We may update this policy from time to time. The updated version will be posted on this page with a revised date.</p>,
            },
          ].map(({ heading, content }) => (
            <div key={heading} className="mb-10">
              <h2
                className="font-bold mb-3"
                style={{ fontFamily: "var(--font-sora)", fontSize: 19, color: "#07090C" }}
              >
                {heading}
              </h2>
              <div
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 14,
                  color: "rgba(7,9,12,0.65)",
                  lineHeight: 1.85,
                }}
                className="[&_p]:mb-3 [&_ul]:list-none [&_ul]:my-3 [&_li]:flex [&_li]:gap-2 [&_li]:py-1 [&_li]:before:content-['—'] [&_li]:before:text-[#E85D1B] [&_li]:before:shrink-0 [&_strong]:text-[#07090C] [&_strong]:font-semibold"
              >
                {content}
              </div>
            </div>
          ))}

          <div className="mt-12 pt-8" style={{ borderTop: "1px solid rgba(7,9,12,0.1)" }}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-semibold text-sm"
              style={{ fontFamily: "var(--font-sora)", color: "#E85D1B" }}
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
