import type { Metadata } from "next";
import Link from "next/link";
import { FOUNDERS } from "@/lib/content";
import { CREDENTIALS } from "@/lib/credentials";

export const metadata: Metadata = {
  title: "About — Agisano",
  description:
    "Why an institution's technology shouldn't be the principal's problem — and who we are.",
};

export default function AboutPage() {
  return (
    <div className="page">
      <section className="section field-paper">
        <div className="shell">
          <div className="page-head">
            <p className="t-label eyebrow">About</p>
            <h1 className="t-h1 balance">
              Your technology shouldn&rsquo;t be your problem.
            </h1>
            <p className="t-lead pretty">
              You did not take the job to chase a WiFi installer, wait on an equipment
              quote, or hope the thing that broke last term holds this one.
            </p>
          </div>

          <div className="prose">
            <p className="t-body pretty">
              Somewhere right now a principal is doing exactly that — none of it their
              job, all of it their problem. The reason is not incompetence. It is that
              nobody owns the whole. A school or a public institution ends up as its own
              systems integrator by default, assembling technology out of separate
              vendors who each answer for their own slice and nobody for the outcome.
            </p>
            <p className="t-body pretty">
              Agisano exists to take that whole weight off the desk. One partner owns all
              of it — the connection, the equipment, the support, the digital presence —
              so when something needs doing there is one number to call and one team that
              answers for it.
            </p>

            <h2 className="t-h2">{FOUNDERS.eyebrow}</h2>
            <p className="t-body pretty">{FOUNDERS.intro}</p>
          </div>

          <div className="founders">
            {FOUNDERS.people.map((p) => (
              <article key={p.id} className="founder">
                <hr className="hairline" />
                <h3 className="t-h3 founder-name">{p.name}</h3>
                <p className="t-label founder-role">{p.title}</p>
                <p className="t-body pretty founder-bio">{p.bio}</p>
              </article>
            ))}
          </div>

          <div className="prose">
            <h2 className="t-h2">How we work</h2>
            <p className="t-body pretty">
              On a deliberately limited intake. We would rather be genuinely present for a
              few institutions than thinly spread across many — which is why our proof is
              depth, not breadth: four years of keeping one school&rsquo;s technology
              working, end to end, and still their partner today.
            </p>
            <p className="t-body pretty">
              We are not the cheapest hands. We are the ones who stay, who pick up, and
              who keep it working.
            </p>

            <h2 className="t-h2">Held, current, independently audited</h2>
            <p className="t-body pretty">
              Before anyone hands over their systems, they need to know who they are
              handing them to. Whoever signs off on your technology partner will ask for
              these — so here they are:
            </p>
            <ul>
              {CREDENTIALS.map((c) => (
                <li key={c.id}>
                  <strong>
                    {c.name}
                    {c.value ? ` ${c.value}` : ""}
                  </strong>{" "}
                  — {c.plain}
                </li>
              ))}
            </ul>
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
