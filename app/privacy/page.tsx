import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Agisano",
  description: "How Agisano collects, uses, and protects your personal information in compliance with the POPIA.",
};

type Section = { heading: string; content: React.ReactNode };

const sections: Section[] = [
  {
    heading: "1. Who we are",
    content: (
      <>
        <p>Agisano (Pty) Ltd (&ldquo;Agisano&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a South African company registered with the CIPC (registration number <strong>2023/872204/07</strong>), operating from Gauteng and providing ICT services to schools — internet and WiFi installation, ICT equipment supply, managed IT services, and digital presence (websites and newsletters). We are the <strong>Responsible Party</strong> under POPIA for personal information we collect through agisano.com and in the course of our own business.</p>
        <p>Our designated <strong>Information Officer</strong>, contactable at <a href="mailto:hello@agisano.com">hello@agisano.com</a>, is registered with the Information Regulator of South Africa and is responsible for our POPIA compliance.</p>
        <p>Contact: <a href="mailto:hello@agisano.com">hello@agisano.com</a> · Gauteng, South Africa</p>
      </>
    ),
  },
  {
    heading: "2. What personal information we collect",
    content: (
      <>
        <p>We collect only the information we need for the purposes set out below.</p>
        <p>When you contact us or book an assessment — by form, email, or phone/WhatsApp — we collect:</p>
        <ul>
          <li>Your name and job title (Principal, HOD, IT Coordinator)</li>
          <li>Your school&apos;s name and location</li>
          <li>Your email address and phone number</li>
          <li>Any details about your school&apos;s ICT needs you choose to share</li>
        </ul>
        <p>When you visit agisano.com we may collect standard technical data (IP address, browser, pages visited) via server logs, and website usage data via analytics cookies — only if you consent.</p>
        <p>We do not collect the special personal information defined in Section 26 of POPIA through our website, and we do not knowingly collect information directly from learners or children through our website. Where we handle information about learners, parents, or staff, we do so only as an <strong>Operator</strong> on behalf of the school (see Section 9).</p>
      </>
    ),
  },
  {
    heading: "3. Why we collect it (lawful purpose)",
    content: (
      <>
        <ul>
          <li>To respond to your enquiry or assessment booking request</li>
          <li>To schedule and conduct on-site assessments</li>
          <li>To prepare and send you a proposal, quote, or invoice</li>
          <li>To deliver and support the services you engage us for</li>
          <li>To keep records required for tax, accounting, and legal purposes</li>
          <li>To improve our website — only with your consent to analytics cookies</li>
        </ul>
        <p>We rely on the lawful bases permitted by POPIA: your consent, performance of a contract with you, our legitimate business interests, and compliance with the law.</p>
      </>
    ),
  },
  {
    heading: "4. How we share your information",
    content: (
      <>
        <p>We do not sell, rent, or trade your personal information, and we do not share it with third parties for their own marketing. We share it only with:</p>
        <ul>
          <li>Service providers (Operators) who process it on our behalf — email/CRM, form-handling, hosting, invoicing, and helpdesk — bound by written agreements to protect it and use it only for the services they provide to us</li>
          <li>Professional advisors such as our accountant or legal advisor, where necessary</li>
          <li>Law enforcement or regulators where required by law or to protect our legal rights</li>
        </ul>
        <p><strong>Cross-border transfers.</strong> Some providers may store or process information outside South Africa. Where they do, we take reasonable steps to ensure the transfer complies with Section 72 of POPIA — the recipient being subject to protection substantially similar to POPIA.</p>
      </>
    ),
  },
  {
    heading: "5. How long we keep your information",
    content: (
      <>
        <p>We keep personal information only as long as necessary for the purpose it was collected and to meet our legal, tax, and accounting obligations.</p>
        <ul>
          <li>Enquiries that do not become engagements — retained up to 1 year, then deleted</li>
          <li>Client and prospect records — retained for our relationship and up to 5 years after our last engagement, then securely deleted or anonymised</li>
          <li>Information we hold as an Operator — retained and deleted according to the client school&apos;s instructions (see Section 9)</li>
        </ul>
      </>
    ),
  },
  {
    heading: "6. Your rights under POPIA",
    content: (
      <>
        <p>You have the right to:</p>
        <ul>
          <li>Request access to personal information we hold about you</li>
          <li>Request correction of inaccurate or outdated information</li>
          <li>Request deletion where we have no lawful reason to keep it</li>
          <li>Object, on reasonable grounds, to our processing</li>
          <li>Withdraw your consent at any time (where processing relies on consent)</li>
          <li>Lodge a complaint with the <strong>Information Regulator of South Africa</strong> at <a href="https://inforegulator.org.za" target="_blank" rel="noopener">inforegulator.org.za</a></li>
        </ul>
        <p>To exercise any of these rights, email <a href="mailto:hello@agisano.com">hello@agisano.com</a>. We respond within 30 days. If your request concerns learner, parent, or staff information we hold on behalf of a school, please direct it to your school (the Responsible Party) — we will support them in responding.</p>
      </>
    ),
  },
  {
    heading: "7. Cookies",
    content: (
      <>
        <p>Our website uses cookies in the following categories:</p>
        <ul>
          <li><strong>Essential cookies</strong> — required for the website to function. Cannot be declined.</li>
          <li><strong>Analytics cookies</strong> — help us understand how visitors use the site. Only set with your consent.</li>
        </ul>
        <p>You can withdraw consent at any time by clearing your browser cookies and declining on your next visit, or by blocking cookies in your browser settings.</p>
      </>
    ),
  },
  {
    heading: "8. How we protect your information",
    content: (
      <>
        <p>We take reasonable technical and organisational measures to safeguard personal information against loss, unauthorised access, and misuse, as required by Section 19 of POPIA — HTTPS/TLS encryption for all website traffic, access controls and strong authentication, and limiting access to those who need it. No system is perfectly secure, but we review our safeguards regularly.</p>
        <p><strong>Breach notification.</strong> If a security compromise affects your personal information, we will notify the Information Regulator and you as soon as reasonably possible after becoming aware of it, in line with Section 22 of POPIA.</p>
      </>
    ),
  },
  {
    heading: "9. When we act as an Operator for a school",
    content: (
      <>
        <p>When we process personal information <strong>on behalf of a client school</strong> — running its network, devices, and user accounts (managed IT); building or hosting its website or newsletter; or supplying and configuring equipment that stores personal information — the <strong>school is the Responsible Party</strong> and Agisano is the <strong>Operator</strong>. In that role:</p>
        <ul>
          <li>We process the information only on the school&apos;s documented instructions, strictly to deliver the agreed service — never for our own marketing</li>
          <li>We treat it as confidential, apply the safeguards in Section 8, and restrict access to authorised personnel</li>
          <li>We engage sub-operators (e.g. a hosting provider) only where our agreement with the school permits, holding them to equivalent obligations</li>
          <li>We notify the school without undue delay of any compromise, so it can meet its own Section 22 obligations</li>
          <li>On termination we return or securely delete the information as the school directs, subject to any legal retention requirement</li>
          <li>Data-subject requests from learners, parents, or staff are the school&apos;s responsibility; we assist the school in fulfilling them</li>
        </ul>
        <p>The terms for each engagement are set out in the written services agreement (and, where required, a data processing addendum) between Agisano and the school. Where that agreement and this policy differ on Operator processing, the agreement prevails.</p>
      </>
    ),
  },
  {
    heading: "10. Changes to this policy",
    content: (
      <p>We may update this Privacy Policy from time to time. The updated version will be posted on this page with a revised date, and significant changes will be communicated to active clients directly.</p>
    ),
  },
  {
    heading: "11. Contact & complaints",
    content: (
      <>
        <p>For any privacy-related queries: <a href="mailto:hello@agisano.com">hello@agisano.com</a></p>
        <p>Information Regulator (South Africa): <a href="https://inforegulator.org.za" target="_blank" rel="noopener">inforegulator.org.za</a> · complaints.IR@justice.gov.za · +27 (0)10 023 5207</p>
      </>
    ),
  },
];

export default function Privacy() {
  return (
    <>
      <section style={{ background: "#07090C", padding: "140px 48px 64px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <span
            style={{
              fontFamily: "var(--font-sora)",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#E85D1B",
              display: "inline-block",
              marginBottom: 16,
            }}
          >
            Legal
          </span>
          <h1
            style={{
              fontFamily: "var(--font-sora)",
              fontSize: "clamp(40px,6vw,72px)",
              fontWeight: 900,
              color: "#F2EDE6",
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              marginBottom: 24,
            }}
          >
            Privacy Policy
          </h1>
          <p style={{ fontSize: 13, color: "rgba(242,237,230,0.4)" }}>
            Last updated: 5 July 2026 · Agisano (Pty) Ltd · Reg. 2023/872204/07 · agisano.com
          </p>
        </div>
      </section>

      <section style={{ background: "#F2EDE6", padding: "80px 48px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", fontFamily: "var(--font-inter)" }}>
          <div
            style={{
              background: "rgba(232,93,27,0.08)",
              borderLeft: "3px solid #E85D1B",
              padding: "16px 20px",
              borderRadius: "0 6px 6px 0",
              marginBottom: 48,
            }}
          >
            <p style={{ fontSize: 13, color: "rgba(7,9,12,0.7)", lineHeight: 1.7 }}>
              This Privacy Policy explains how Agisano (Pty) Ltd collects, uses, and protects personal
              information in compliance with the <strong style={{ color: "#07090C", fontWeight: 600 }}>Protection of Personal Information Act, 4 of 2013 (POPIA)</strong> of South Africa.
              Because we serve schools, we act in two roles: as a <strong style={{ color: "#07090C", fontWeight: 600 }}>Responsible Party</strong> for information you give us through this
              website and our own dealings, and as an <strong style={{ color: "#07090C", fontWeight: 600 }}>Operator</strong> when we handle information on behalf of a client school (see Section 9).
            </p>
          </div>

          <div className="pp">
            {sections.map(({ heading, content }) => (
              <div key={heading}>
                <h2>{heading}</h2>
                {content}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid rgba(7,9,12,0.1)" }}>
            <Link
              href="/"
              style={{ fontFamily: "var(--font-sora)", color: "#E85D1B", fontWeight: 600, fontSize: 13 }}
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .pp h2 { font-family: var(--font-sora); font-size: 20px; font-weight: 700; color: #07090C; margin: 40px 0 12px; }
        .pp h2:first-of-type { margin-top: 0; }
        .pp p { font-size: 14px; color: rgba(7,9,12,0.65); line-height: 1.85; margin-bottom: 12px; }
        .pp ul { margin: 12px 0 16px 0; padding-left: 0; list-style: none; }
        .pp ul li { font-size: 14px; color: rgba(7,9,12,0.65); line-height: 1.7; padding: 4px 0; display: flex; gap: 10px; }
        .pp ul li::before { content: '—'; color: #E85D1B; flex-shrink: 0; }
        .pp a { color: #E85D1B; }
        .pp strong { color: #07090C; font-weight: 600; }
      `}</style>
    </>
  );
}
