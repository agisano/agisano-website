import Mark from "@/components/Mark";

/**
 * The keystone — the converging line closed at human scale.
 *
 * Two strokes descend from where each diptych column's rule sits and meet at a
 * centred apex carrying the mark. The homepage scatters six service fragments
 * and gathers them into the mark; this does the same thing about the company
 * itself: two named owners, one accountable partner.
 *
 * Drawn with stroke-dashoffset so it resolves itself on reveal. Under
 * `html.motion-off` the animation is short-circuited and the resolved keystone
 * — which is the better image of the two — is simply present.
 */
export default function Keystone() {
  return (
    <div className="keystone" aria-hidden="true">
      <svg
        className="keystone-svg"
        viewBox="0 0 100 34"
        preserveAspectRatio="none"
        role="presentation"
      >
        <path className="keystone-stroke" pathLength={1} d="M 0 0 L 50 30" />
        <path className="keystone-stroke" pathLength={1} d="M 100 0 L 50 30" />
      </svg>
      <span className="keystone-mark">
        <Mark size={28} dot="#ffffff" />
      </span>
    </div>
  );
}
