import type { Metadata } from "next";
import Link from "next/link";
import { UNDER_ONE_ROOF, HOW_WE_SELL } from "@/lib/content";
import { SERVICE_FACTS } from "@/lib/metrics";

export const metadata: Metadata = {
  title: "Under one roof — Agisano",
  description:
    "Internet and WiFi, security, ICT equipment and AV, power resilience, managed IT support, and digital presence — six lines, one accountable partner.",
};

export default function UnderOneRoofPage() {
  return (
    <div className="page">
      <section className="section field-paper">
        <div className="shell">
          <div className="page-head">
            <p className="t-label eyebrow">{UNDER_ONE_ROOF.eyebrow}</p>
            <h1 className="t-h1 balance">{UNDER_ONE_ROOF.headline}</h1>
            <p className="t-lead pretty">{UNDER_ONE_ROOF.lead}</p>
          </div>

          <div className="roof-page-list">
            {UNDER_ONE_ROOF.services.map((s, i) => (
              <article key={s.key} className="roof-page-item">
                <hr className="hairline" />
                <p className="t-label roof-card-n roof-card-n-light">{`0${i + 1}`}</p>
                <div className="roof-page-item-body">
                  <h2 className="t-h2">{s.title}</h2>
                  <p className="t-body pretty measure">{s.plain}</p>
                  <dl className="roof-facts roof-facts-light">
                    {(SERVICE_FACTS[s.key] ?? []).map((f) => (
                      <div key={f.k} className="roof-fact">
                        <dt className="t-label">{f.k}</dt>
                        <dd>{f.v}</dd>
                      </div>
                    ))}
                  </dl>
                  <ul className="roof-includes">
                    {s.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div className="prose">
            <h2 className="t-h2">{HOW_WE_SELL.headline}</h2>
          </div>
          <div className="sell-options">
            {HOW_WE_SELL.options.map((o) => (
              <article key={o.key} className="sell-option">
                <hr className="hairline" />
                <h3 className="t-h3">{o.title}</h3>
                <p className="t-body pretty">{o.body}</p>
              </article>
            ))}
          </div>

          <div className="prose">
            <h2 className="t-h2">Why one partner, and not four</h2>
            <p className="t-body pretty">
              Four vendors means four relationships, four invoices, and — the moment
              something breaks — four people who can each say it is someone else&rsquo;s
              fault. The coordination becomes your job, in time you do not have. One
              partner who owns all four means there is one number to call, and nobody to
              hide behind. That is the whole point of Agisano.
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
