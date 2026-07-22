/**
 * Numbered chapter marker (the andrewcunliffe device, in Agisano's language).
 * Lives in the active right/left field with a hairline — the editorial
 * asymmetry the art direction asks for. Purely structural, never decorative.
 */
export default function SectionIndex({
  n,
  label,
  onInk = false,
}: {
  n: string;
  label: string;
  onInk?: boolean;
}) {
  return (
    <div className={`sindex ${onInk ? "sindex-ink" : ""}`}>
      <span className="t-label sindex-n">{n}</span>
      <span className="sindex-rule" aria-hidden="true" />
      <span className="t-label sindex-label">{label}</span>
    </div>
  );
}
