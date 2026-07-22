import type { Metadata } from "next";
import Link from "next/link";
import { OGS } from "@/lib/content";
import { PROOF_ANCHORS } from "@/lib/metrics";
import Photo from "@/components/Photo";

export const metadata: Metadata = {
  title: "Observatory Girls' Primary School — Agisano",
  description:
    "Our reference institution: the technology partner since 2021, end to end, still today.",
};

/**
 * The OGS proof page. Real content, honestly bounded:
 *  - anchors are duration/continuity/completeness, never a count (§4.9)
 *  - the internet line is the LOCKED wording, verbatim (§7)
 *  - the testimonial slot ships EMPTY until real words arrive
 */
export default function ObservatoryGirlsPage() {
  return (
    <div className="page">
      <section className="section field-paper">
        <div className="shell">
          <div className="page-head">
            <p className="t-label eyebrow">The proof</p>
            <h1 className="t-h1 balance">
              A school we&rsquo;ve been the technology partner for since 2021.
            </h1>
            <p className="t-lead pretty">
              Depth, not scale. One institution, every part of its technology, for four
              years and counting.
            </p>
          </div>

          <div className="ogs-anchors">
            {PROOF_ANCHORS.map((a) => (
              <div key={a.value} className="ogs-anchor">
                <hr className="hairline" />
                <p className="ogs-anchor-value">{a.value}</p>
                <p className="t-small pretty">{a.label}</p>
              </div>
            ))}
          </div>

          <div className="ogs-body prose">
            <p className="t-body pretty">{OGS.body}</p>

            <h2 className="t-h2">What we actually do there</h2>
            <ul>
              <li>Built and run the campus network and WiFi — the coverage across the school.</li>
              <li>Supplied and set up the ICT equipment in use day to day.</li>
              <li>Managed IT support — when something breaks, we are who they call.</li>
              <li>Their digital presence.</li>
            </ul>

            <h2 className="t-h2">Being precise about what&rsquo;s ours</h2>
            {/* LOCKED wording — verbatim, never paraphrased, never names the provider */}
            <blockquote className="proof-internet proof-internet-light">
              <p className="t-body pretty">{OGS.internetLine}</p>
            </blockquote>
            <p className="t-body pretty">
              We are careful about this because a partner who overstates what they did is
              a partner who will overstate other things too.
            </p>
          </div>

          <div className="ogs-photo">
            <Photo label={OGS.photo} ratio="16 / 9" parallax tone="teal" />
          </div>

          {/* Testimonial slot — designed, and EMPTY until the principal's real words arrive. */}
          {OGS.testimonial && (
            <figure className="proof-quote">
              <blockquote className="t-h2 balance">
                &ldquo;{OGS.testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="t-small">{OGS.testimonial.attribution}</figcaption>
            </figure>
          )}

          <p className="stub-note t-small">
            <strong>Build note:</strong> the principal has given permission to be quoted;
            the words themselves have not been supplied yet. Until they are, this page
            carries no quote — we do not write one for them.
          </p>

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
