/**
 * Chapter eyebrow — a hairline rule and the section label.
 *
 * The running section NUMBER was dropped deliberately: a numbered "NN — LABEL"
 * marker on every section was the single most repetitive element on the page
 * (and had drifted out of sequence). The quiet rule + teal label still give the
 * editorial asymmetry; real counts that count something stay on the items that
 * carry them (service cards, constraints, steps). `n` is accepted and ignored
 * so callers need not change.
 */
export default function SectionIndex({
  label,
  onInk = false,
}: {
  n?: string;
  label: string;
  onInk?: boolean;
}) {
  return (
    <div className={`sindex ${onInk ? "sindex-ink" : ""}`}>
      <span className="sindex-rule" aria-hidden="true" />
      <span className="t-label sindex-label">{label}</span>
    </div>
  );
}
