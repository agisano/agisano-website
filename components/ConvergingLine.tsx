"use client";

/**
 * The converging line — the signature device (art-direction §3, §8.1).
 *
 * THE IDEA: the scattered concerns an institution juggles resolve into ONE
 * accountable partner. The payoff is that they resolve into the Agisano mark
 * itself — the logo IS the resolved converging line, which is what makes the
 * device authored rather than decorative.
 *
 * `p` (0→1) is scroll-scrubbed on capable devices; when motion is off it is
 * passed as 1 and renders the RESOLVED composition — the mark, standing alone,
 * which must be beautiful on its own (spec §5 degradation).
 *
 * Pure SVG: near-zero weight, sharp at any size, cheap on a phone.
 */

const FRAGMENTS = [
  { x: 3, y: 24, label: "Internet" },
  { x: 21, y: 11, label: "Security" },
  { x: 40, y: 4, label: "Equipment" },
  { x: 60, y: 4, label: "Power" },
  { x: 79, y: 11, label: "Support" },
  { x: 97, y: 24, label: "Online presence" },
];

/** Where the threads land — and where the mark resolves. */
const APEX = { x: 50, y: 64 };

/* Official mark geometry, verbatim from the logo pack (see Mark.tsx). */
const STROKE_RIGHT =
  "M 752.476562 570.148438 C 767.027344 563.414062 783.652344 562.738281 798.703125 568.269531 C 813.75 573.796875 825.988281 585.078125 832.71875 599.625 L 996.519531 953.671875 C 1003.25 968.21875 1003.925781 984.847656 998.398438 999.898438 C 992.867188 1014.945312 981.589844 1027.183594 967.039062 1033.914062 C 952.488281 1040.644531 935.859375 1041.320312 920.8125 1035.792969 C 905.761719 1030.265625 893.527344 1018.984375 886.792969 1004.433594 L 722.996094 650.390625 C 716.265625 635.839844 715.589844 619.210938 721.117188 604.164062 C 726.644531 589.113281 737.925781 576.878906 752.476562 570.148438 Z";
const STROKE_LEFT =
  "M 734.804688 752.234375 C 748.832031 758.015625 759.988281 769.128906 765.824219 783.132812 C 771.65625 797.136719 771.6875 812.886719 765.90625 826.914062 L 691.964844 1006.410156 C 686.1875 1020.4375 675.070312 1031.59375 661.066406 1037.425781 C 647.0625 1043.257812 631.316406 1043.289062 617.289062 1037.511719 C 603.261719 1031.730469 592.105469 1020.617188 586.269531 1006.613281 C 580.4375 992.609375 580.40625 976.859375 586.1875 962.832031 L 660.128906 783.335938 C 665.90625 769.308594 677.023438 758.152344 691.027344 752.320312 C 705.03125 746.488281 720.777344 746.457031 734.804688 752.234375 Z";

/** Mark bbox centre in its own 1500-space, and a scale to ~30 units wide. */
const MARK_CX = 842;
const MARK_CY = 802;
const MARK_SCALE = 30 / 557;

const clamp = (n: number) => Math.min(1, Math.max(0, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 2.4);

export default function ConvergingLine({
  p,
  showLabels = true,
  className = "",
}: {
  p: number;
  showLabels?: boolean;
  className?: string;
}) {
  const t = easeOut(clamp(p));

  /* The mark resolves in the last 45% of the scrub, after the threads have landed. */
  const markT = easeOut(clamp((t - 0.55) / 0.45));
  /* Threads recede as the mark takes over — they *become* it. */
  const threadFade = 1 - clamp((t - 0.62) / 0.3) * 0.85;

  return (
    <svg
      /* Padded only when labels render (they need room above their origin).
         Without them the composition can sit tight in its own field. */
      viewBox={showLabels ? "-16 -12 132 108" : "-4 -2 108 96"}
      preserveAspectRatio="xMidYMid meet"
      className={`converge ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      {FRAGMENTS.map((f, i) => {
        /* Stagger, so they arrive one after another rather than as a fan. */
        const local = clamp((t - i * 0.06) / 0.8);
        const e = easeOut(local);

        /* The far end travels to the apex; the origin drifts in behind it. */
        const endX = lerp(f.x, APEX.x, e);
        const endY = lerp(f.y, APEX.y, e);
        const startX = lerp(f.x, lerp(f.x, APEX.x, 0.55), e);
        const startY = lerp(f.y, lerp(f.y, APEX.y, 0.35), e);

        return (
          <g key={f.label} style={{ opacity: threadFade }}>
            <line
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
              stroke="var(--teal-lift)"
              strokeWidth={lerp(1, 1.8, e)}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ opacity: 0.28 + e * 0.72 }}
            />
            {showLabels && (
              <text
                x={f.x}
                y={f.y - 5}
                textAnchor="middle"
                className="converge-label"
                style={{ opacity: (1 - easeOut(clamp((t - i * 0.06) / 0.5))) * 0.9 }}
              >
                {f.label}
              </text>
            )}
          </g>
        );
      })}

      {/* THE RESOLUTION: the four become the mark. */}
      <g
        transform={`translate(${APEX.x} ${APEX.y}) scale(${
          MARK_SCALE * lerp(0.55, 1, markT)
        }) translate(${-MARK_CX} ${-MARK_CY})`}
        style={{ opacity: markT }}
      >
        <path d={STROKE_RIGHT} fill="var(--signal)" />
        <path d={STROKE_LEFT} fill="var(--signal)" />
        <circle cx="1065.01" cy="981.27" r="55.84" fill="#ffffff" />
      </g>

      {/* A single quiet ring — the settle. */}
      <circle
        cx={APEX.x}
        cy={APEX.y}
        r={lerp(14, 24, markT)}
        fill="none"
        stroke="var(--teal-lift)"
        strokeWidth={0.4}
        vectorEffect="non-scaling-stroke"
        style={{ opacity: clamp((markT - 0.4) / 0.6) * 0.28 }}
      />
    </svg>
  );
}
