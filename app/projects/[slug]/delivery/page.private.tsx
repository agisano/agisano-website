import type { Metadata } from "next";
import { notFound } from "next/navigation";
import QRCode from "qrcode";
import { getProject, resolveImage } from "@/lib/projects";
import { deliverySlugs, loadDelivery } from "@/lib/projects/delivery";
import ProjectImage from "@/components/project/ProjectImage";
import Txt from "@/components/project/Txt";
import Mark from "@/components/Mark";
import "../../projects.css";
import "../../sheet.css";

/**
 * PRIVATE. The client delivery summary names the client's people and how their files
 * were sent — it must never ship with the public site. The `.private.tsx` extension is
 * only a page extension when the build runs with CLIENT_DOCS=1 (see next.config.ts), so
 * a normal `npm run build` — and the Pages deploy — never sees this route.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return deliverySlugs().map((slug) => ({ slug }));
}

export const metadata: Metadata = {
  title: "Delivery summary",
  robots: { index: false, follow: false },
};

/**
 * One A4 page for the client: what was asked, what was delivered, when and how it was
 * sent. Same system as the project sheet, so the two read as a pair.
 */
export default async function DeliveryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  const d = loadDelivery(slug);
  if (!p || !d) notFound();
  // Drawn from the link itself, as vector: sharp in print, and it can never point elsewhere.
  const qr = d.link
    ? await QRCode.toString(d.link, { type: "svg", margin: 0, errorCorrectionLevel: "M" })
    : undefined;

  const still = d.still ? resolveImage(p.slug, d.still) : undefined;
  const projectName = p.details.find((x) => x.label === "Project")?.value;
  const handover = [
    { label: "Delivered", value: d.date },
    { label: "Sent to", value: d.recipient },
    { label: "Sent via", value: d.method },
    ...(d.formats ? [{ label: "Formats", value: d.formats }] : []),
  ];

  return (
    <div className="sheet-doc">
      <section className={`sh-page ops dlv ${still ? "" : "dlv-no-still"}`}>
        <header className="ops-top">
          <span className="ops-brand">
            <Mark size={15} dot="#0E4F55" />
            <span className="wordmark">agisano</span>
          </span>
          <span className="ops-label">Delivery summary</span>
        </header>

        <div className="ops-head">
          {projectName ? (
            <p className="ops-label ops-kicker">
              <Txt>{projectName}</Txt>
            </p>
          ) : null}
          <h1 className="ops-title">{p.title}</h1>
          <div className="ops-head-row">
            <p className="ops-category">{p.category}</p>
            <p className="ops-label ops-place">
              {p.location} / {p.year}
            </p>
          </div>
        </div>

        {still ? (
          <div className="ops-hero ops-round">
            <ProjectImage r={still} fit="cover" print showCaption={false} />
          </div>
        ) : (
          <div />
        )}

        <div className="dlv-items">
          <p className="ops-label ops-section">What we delivered</p>
          <div className="dlv-items-grid">
            {d.items.map((it) => (
              <div key={it.label} className="dlv-item">
                <p className="dlv-count">{it.count}</p>
                <p className="dlv-item-label">{it.label}</p>
                {it.note ? (
                  <p className="dlv-item-note">
                    <Txt>{it.note}</Txt>
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="ops-project dlv-cols">
          <div>
            <p className="ops-label ops-section">What you asked for</p>
            <ol className="dlv-brief">
              {d.brief.map((b, i) => (
                <li key={i}>
                  <span className="dlv-brief-n">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <Txt>{b}</Txt>
                  </span>
                </li>
              ))}
            </ol>
            {d.link ? (
              <div className="dlv-download">
                {qr ? <div className="dlv-qr-code" dangerouslySetInnerHTML={{ __html: qr }} /> : null}
                <div>
                  <p className="ops-label ops-section">Your download</p>
                  <p className="dlv-link">
                    <a href={d.link}>{d.link.replace(/^https?:\/\//, "")}</a>
                  </p>
                  {d.pin ? (
                    <p className="dlv-pin">
                      <span className="ops-label">Download PIN</span> <strong>{d.pin}</strong>
                    </p>
                  ) : null}
                  <p className="dlv-qr-note">
                    Scan the code or open the link{d.pin ? ", then enter the PIN to download" : ""}.
                  </p>
                </div>
              </div>
            ) : null}
          </div>
          <div>
            <p className="ops-label ops-section">Handover</p>
            <dl className="ops-details">
              {handover.map((h) => (
                <div key={h.label}>
                  <dt className="ops-label">{h.label}</dt>
                  <dd>
                    <Txt>{h.value}</Txt>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <footer className="ops-foot">
          {d.contactLine ? <p className="dlv-contact">{d.contactLine}</p> : null}
          <div className="ops-foot-row">
            <span className="ops-brand">
              <Mark size={13} dot="#0E4F55" />
              <span className="wordmark">agisano</span>
            </span>
            <span className="ops-url">agisano.com</span>
          </div>
          <p className="ops-rights">
            © {new Date().getFullYear()} Agisano.{p.rightsNote ? ` ${p.rightsNote}` : ""}
          </p>
        </footer>
      </section>
    </div>
  );
}
