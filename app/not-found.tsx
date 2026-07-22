import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page section field-paper">
      <div className="shell">
        <div className="page-head">
          <p className="t-label eyebrow">404</p>
          <h1 className="t-h1 balance">That page isn&rsquo;t here.</h1>
          <p className="t-lead pretty">
            Which is annoying, and not your fault. Let&rsquo;s get you back to something
            useful.
          </p>
        </div>
        <div className="page-actions">
          <Link href="/" className="btn btn-primary">
            Back to the start
            <span aria-hidden="true">→</span>
          </Link>
          <Link href="/assessment" className="btn btn-quiet">
            Book a free assessment
          </Link>
        </div>
      </div>
    </div>
  );
}
