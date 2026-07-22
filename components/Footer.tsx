import Link from "next/link";
import { CONTACT, WHATSAPP_ENABLED } from "@/lib/content";
import { whatsappHref } from "@/lib/lead";
import Mark from "./Mark";

export default function Footer() {
  return (
    <footer className="footer field-ink">
      <div className="shell">
        <div className="footer-grid">
          <div>
            <Link href="/" className="footer-brand" aria-label="Agisano — home">
              <Mark size={26} />
              {/* Wordmark is always lowercase (logo-pack/README.txt). */}
              <span className="wordmark">agisano</span>
            </Link>
            <p className="t-small footer-line">
              One partner for your institution&rsquo;s technology — the connection, the
              equipment, the support, and how you show up online.
            </p>
          </div>

          <div>
            <h2 className="t-label footer-h">Site</h2>
            <ul className="footer-list">
              <li>
                <Link href="/under-one-roof" className="link-draw">
                  Under one roof
                </Link>
              </li>
              <li>
                <Link href="/observatory-girls" className="link-draw">
                  Observatory Girls&rsquo;
                </Link>
              </li>
              <li>
                <Link href="/about" className="link-draw">
                  About
                </Link>
              </li>
              <li>
                <Link href="/assessment" className="link-draw">
                  Book an assessment
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="t-label footer-h">Talk to us</h2>
            <ul className="footer-list">
              {WHATSAPP_ENABLED && (
                <li>
                  <a
                    href={whatsappHref()}
                    className="link-draw"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                </li>
              )}
              <li>
                <a href={`mailto:${CONTACT.email}`} className="link-draw">
                  {CONTACT.emailDisplay}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="t-label footer-h">Legal</h2>
            <ul className="footer-list">
              <li>
                <Link href="/privacy" className="link-draw">
                  Privacy &amp; POPIA
                </Link>
              </li>
              <li>
                <Link href="/assessment-terms" className="link-draw">
                  Assessment terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="hairline hairline-ink footer-rule" />

        <div className="footer-base t-small">
          <span>&copy; {new Date().getFullYear()} Agisano. Gauteng, South Africa.</span>
        </div>
      </div>
    </footer>
  );
}
