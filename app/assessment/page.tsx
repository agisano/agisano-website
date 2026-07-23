import type { Metadata } from "next";
import Link from "next/link";
import BookingForm from "@/components/BookingForm";
import { FINAL_CTA } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/assessment" },
  title: "Book a free assessment — Agisano",
  description:
    "A free 60-minute on-site visit and a written proposal within 3 business days. No cost, no obligation, no hard sell.",
};

export default function AssessmentPage() {
  return (
    <div className="page section field-paper">
      <div className="shell">
        <div className="page-head">
          <p className="t-label eyebrow">The next step</p>
          <h1 className="t-h1 balance">Book a free assessment.</h1>
          <p className="t-lead pretty">
            Tell us who you are and we&rsquo;ll come and see the real picture for
            ourselves. No cost, no obligation, no hard sell.
          </p>
        </div>

        <div className="assessment-grid">
          <BookingForm />

          <aside className="assessment-aside">
            <h2 className="t-label eyebrow">What happens next</h2>
            <ol className="final-steps final-steps-light">
              {FINAL_CTA.steps.map((s) => (
                <li key={s.n} className="final-step">
                  <hr className="hairline" />
                  <p className="t-label final-step-n">{s.n}</p>
                  <h3 className="t-h3">{s.title}</h3>
                  <p className="t-body pretty">{s.body}</p>
                </li>
              ))}
            </ol>
            <p className="t-small aside-note">
              <Link href="/assessment-terms" className="link-draw">
                How the free assessment works
              </Link>{" "}
              — what to expect from us, and what we ask of you.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
