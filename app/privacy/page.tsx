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
            Last updated: 5 July 2026 · Agisano (Pty) Ltd · Reg. 2023/872204/07 · agisano.com
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
              This Privacy Policy explains how Agisano (Pty) Ltd collects, uses, and protects personal
              information in compliance with the <strong>Protection of Personal Information Act, 4 of 2013 (POPIA)</strong> of South Africa.
              Because we serve schools, we act in two roles: as a <strong>Responsible Party</strong> for information you give us through this
              website and our own dealings, and as an <strong>Operator</strong> when we handle information on behalf of a client school (see Section 10).
            </p>
          </div>

          {[
            {
              heading: "1. Who we are",
              content: (
                <>
                  <p>Agisano (Pty) Ltd (&ldquo;Agisano&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a South African company registered with the CIPC (registration number <strong>2023/872204/07</strong>), operating from Gauteng and providing ICT services to schools — internet and WiFi installation, ICT equipment supply, managed IT services, and digital presence (websites and newsletters). We are the <strong>Responsible Party</strong> under POPIA for personal information we collect through agisano.com and in the course of our own business.</p>
                  <p>Our designated <strong>Information Officer</strong>, contactable at <a href="mailto:hello@agisano.com" style={{ color: "#E85D1B" }}>hello@agisano.com</a>, is registered with the Information Regulator of South Africa and is responsible for our POPIA compliance.</p>
                  <p>Contact: <a href="mailto:hello@agisano.com" style={{ color: "#E85D1B" }}>hello@agisano.com</a> · Gauteng, South Africa</p>
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
                    {["Your name and job title (Principal, HOD, IT Coordinator)", "Your school's name and location", "Your email address and phone number", "Any details about your school's ICT needs you choose to share"].map(i => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                  <p>When you visit agisano.com we may collect standard technical data (IP address, browser, pages visited) via server logs, and website usage data via analytics cookies — only if you consent.</p>
                  <p>We do not collect the special personal information defined in Section 26 of POPIA through our website, and we do not knowingly collect information directly from learners or children through our website. Where we handle information about learners, parents, or staff, we do so only as an <strong>Operator</strong> on behalf of the school (see Section 10).</p>
                </>
              ),
            },
            {
              heading: "3. Why we collect it",
              content: (
                <>
                  <ul>
                    {["To respond to your enquiry or assessment booking request", "To schedule and conduct on-site assessments", "To prepare and send you a proposal, quote, or invoice", "To deliver and support the services you engage us for", "To keep records required for tax, accounting, and legal purposes", "To improve our website — only with your consent to analytics cookies"].map(i => (
                      <li key={i}>{i}</li>
                    ))}
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
                    {["Service providers (Operators) who process it on our behalf — email/CRM, form-handling, hosting, invoicing, and helpdesk — bound by written agreements to protect it and use it only for the services they provide to us", "Professional advisors such as our accountant or legal advisor, where necessary", "Law enforcement or regulators where required by law or to protect our legal rights"].map(i => (
                      <li key={i}>{i}</li>
                    ))}
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
                    {["Enquiries that do not become engagements — retained up to 1 year, then deleted", "Client and prospect records — retained for our relationship and up to 5 years after our last engagement, then securely deleted or anonymised", "Information we hold as an Operator — retained and deleted according to the client school's instructions (see Section 10)"].map(i => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </>
              ),
            },
            {
              heading: "6. Your rights under POPIA",
              content: (
                <>
                  <ul>
                    {["Request access to personal information we hold about you", "Request correction of inaccurate or outdated information", "Request deletion where we have no lawful reason to keep it", "Object, on reasonable grounds, to our processing", "Withdraw your consent at any time (where processing relies on consent)", "Lodge a complaint with the Information Regulator of South Africa"].map(i => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                  <p>To exercise any of these rights, email <a href="mailto:hello@agisano.com" style={{ color: "#E85D1B" }}>hello@agisano.com</a>. We respond within 30 days. If your request concerns learner, parent, or staff information we hold on behalf of a school, please direct it to your school (the Responsible Party) — we will support them in responding.</p>
                  <p>Information Regulator: <a href="https://inforegulator.org.za" target="_blank" rel="noopener" style={{ color: "#E85D1B" }}>inforegulator.org.za</a> · complaints.IR@justice.gov.za</p>
                </>
              ),
            },
            {
              heading: "7. Cookies",
              content: (
                <>
                  <ul>
                    <li><strong>Essential cookies</strong> — required for the website to function. Cannot be declined.</li>
                    <li><strong>Analytics cookies</strong> — help us understand how visitors use the site. Only set with your consent.</li>
                  </ul>
                  <p>You can withdraw consent at any time by clearing browser cookies and declining on your next visit, or by blocking cookies in your browser settings.</p>
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
                    {["We process the information only on the school's documented instructions, strictly to deliver the agreed service — never for our own marketing", "We treat it as confidential, apply the safeguards in Section 8, and restrict access to authorised personnel", "We engage sub-operators (e.g. a hosting provider) only where our agreement with the school permits, holding them to equivalent obligations", "We notify the school without undue delay of any compromise, so it can meet its own Section 22 obligations", "On termination we return or securely delete the information as the school directs, subject to any legal retention requirement", "Data-subject requests from learners, parents, or staff are the school's responsibility; we assist the school in fulfilling them"].map(i => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                  <p>The terms for each engagement are set out in the written services agreement (and, where required, a data processing addendum) between Agisano and the school. Where that agreement and this policy differ on Operator processing, the agreement prevails.</p>
                </>
              ),
            },
            {
              heading: "10. Changes to this policy",
              content: <p>We may update this policy from time to time. The updated version will be posted on this page with a revised date, and significant changes will be communicated to active clients directly.</p>,
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
