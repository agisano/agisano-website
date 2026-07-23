import type { Metadata } from "next";
import { CONTACT, WHATSAPP_ENABLED } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy" },
  title: "Privacy & POPIA — Agisano",
  description: "How Agisano handles your information, under South Africa's POPIA.",
};

/**
 * POPIA basics (spec §6). Plain-language and honest about what actually happens
 * on this site. NOTE: the enforceable legal wording is Kagiso/Doug's sign-off —
 * see the build note at the foot. Nothing here invents a binding undertaking.
 */
export default function PrivacyPage() {
  return (
    <div className="page">
      <section className="section field-paper">
        <div className="shell">
          <div className="page-head">
            <p className="t-label eyebrow">Privacy</p>
            <h1 className="t-h1 balance">How we handle your information.</h1>
            <p className="t-lead pretty">
              Plainly, and under South Africa&rsquo;s Protection of Personal Information
              Act (POPIA).
            </p>
          </div>

          <div className="prose">
            <h2 className="t-h2">What we collect</h2>
            <p className="t-body pretty">
              Only what you type into our form: your name, your school or organisation,
              one contact detail ({WHATSAPP_ENABLED ? "an email address or a WhatsApp number" : "an email address"}
              ), and anything you choose to tell us in the message field. If you complete the Readiness Check
              and then send it with your enquiry, your answers and the readout travel with
              it — so that we arrive at your assessment already understanding your
              situation.
            </p>

            <h2 className="t-h2">What we do with it</h2>
            <p className="t-body pretty">
              We use it to reply to you and to prepare for your assessment. That is all.
              We do not sell it, we do not share it with third parties for their own
              purposes, and we do not add you to a marketing list you did not ask for.
            </p>

            <h2 className="t-h2">The Readiness Check</h2>
            <p className="t-body pretty">
              The Check runs entirely in your browser. Your answers are not sent anywhere
              unless and until you choose to send them with an enquiry. If you close the
              page without submitting, nothing leaves your device.
            </p>

            <h2 className="t-h2">Cookies and analytics</h2>
            <p className="t-body pretty">
              This site sets no tracking cookies and runs no analytics or advertising
              scripts. There is nothing to consent to, because we are not doing it.
            </p>

            <h2 className="t-h2">Your rights under POPIA</h2>
            <ul>
              <li>To ask what personal information we hold about you.</li>
              <li>To ask us to correct it.</li>
              <li>To ask us to delete it, and to withdraw your consent to be contacted.</li>
              <li>To complain to the Information Regulator of South Africa.</li>
            </ul>
            <p className="t-body pretty">
              To exercise any of these, email us at{" "}
              <a href={`mailto:${CONTACT.email}`} className="link-draw">
                {CONTACT.emailDisplay}
              </a>{" "}
              and we will action it.
            </p>

            <h2 className="t-h2">How long we keep it</h2>
            <p className="t-body pretty">
              For as long as we are in conversation with you, and for a reasonable period
              afterwards in case you come back to us. If you ask us to delete it, we
              delete it.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
