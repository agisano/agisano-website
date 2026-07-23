import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: { canonical: "/assessment-terms" },
  title: "How the free assessment works — Agisano",
  description: "What to expect from the free assessment, and what we ask of you.",
};

/**
 * Assessment terms (spec §9). Steve drafts the plain-language framing; the
 * ENFORCEABLE legal wording is Kagiso/Doug's sign-off. So this page states the
 * protective clauses calmly and plainly, and does NOT invent binding terms.
 */
export default function AssessmentTermsPage() {
  return (
    <div className="page">
      <section className="section field-paper">
        <div className="shell">
          <div className="page-head">
            <p className="t-label eyebrow">The free assessment</p>
            <h1 className="t-h1 balance">How it works, both ways.</h1>
            <p className="t-lead pretty">
              The assessment is genuinely free and genuinely useful. Here is what you get,
              and what we ask in return.
            </p>
          </div>

          <div className="prose">
            <h2 className="t-h2">What you get</h2>
            <ul>
              <li>A reply from a real person within one business day.</li>
              <li>
                A free 60-minute on-site visit, at a time that fits your calendar — we come
                to you.
              </li>
              <li>
                An honest look at what you actually have: the network, the equipment, the
                support arrangement, your digital presence.
              </li>
              <li>
                A written proposal within three business days — itemised, plain, and
                explicit about what you do <em>not</em> need to spend money on.
              </li>
              <li>The proposal is yours to keep, and to take to your governing body.</li>
            </ul>

            <h2 className="t-h2">What we ask</h2>
            <ul>
              <li>
                That someone who knows the place can walk it with us for the hour — usually
                a principal, bursar, or whoever lives with the problems.
              </li>
              <li>Reasonable access to the rooms and equipment we need to look at.</li>
              <li>
                That the enquiry is genuine. The assessment is one per institution, and it
                is not a free consulting hour for another vendor&rsquo;s project.
              </li>
            </ul>

            <h2 className="t-h2">No obligation — in both directions</h2>
            <p className="t-body pretty">
              You are under no obligation to buy anything, ever. There is no hard sell, and
              there will be no chasing. Equally, we may decline or reschedule an assessment
              — if we are not the right fit for what you need, or you are outside the area
              we can genuinely serve, we would rather say so than take the work and
              disappoint you.
            </p>

            <h2 className="t-h2">Where we work</h2>
            <p className="t-body pretty">
              Gauteng and the areas we can reach and genuinely support. If you are outside
              that, tell us anyway — we will be straight with you about whether we can
              serve you properly.
            </p>
          </div>

          <div className="page-actions">
            <Link href="/assessment" className="btn btn-primary">
              Book a free assessment
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
