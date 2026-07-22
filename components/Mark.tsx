/**
 * The official Agisano mark — a crossbar-less "A" built from two rounded strokes,
 * closed by a dot at the lower-right foot: "A."
 *
 * Geometry is taken verbatim from the official logo pack
 * (brand/Logos/logo-pack/core/logo-primary-transparent.svg). Do not redraw it.
 *
 * Brand colours (logo-pack/README.txt):
 *   strokes  red-orange  #EE4A36
 *   dot      teal        #0E4F55
 * On dark grounds the dot goes white; the strokes stay red-orange.
 */

const STROKE_RIGHT =
  "M 752.476562 570.148438 C 767.027344 563.414062 783.652344 562.738281 798.703125 568.269531 C 813.75 573.796875 825.988281 585.078125 832.71875 599.625 L 996.519531 953.671875 C 1003.25 968.21875 1003.925781 984.847656 998.398438 999.898438 C 992.867188 1014.945312 981.589844 1027.183594 967.039062 1033.914062 C 952.488281 1040.644531 935.859375 1041.320312 920.8125 1035.792969 C 905.761719 1030.265625 893.527344 1018.984375 886.792969 1004.433594 L 722.996094 650.390625 C 716.265625 635.839844 715.589844 619.210938 721.117188 604.164062 C 726.644531 589.113281 737.925781 576.878906 752.476562 570.148438 Z";

const STROKE_LEFT =
  "M 734.804688 752.234375 C 748.832031 758.015625 759.988281 769.128906 765.824219 783.132812 C 771.65625 797.136719 771.6875 812.886719 765.90625 826.914062 L 691.964844 1006.410156 C 686.1875 1020.4375 675.070312 1031.59375 661.066406 1037.425781 C 647.0625 1043.257812 631.316406 1043.289062 617.289062 1037.511719 C 603.261719 1031.730469 592.105469 1020.617188 586.269531 1006.613281 C 580.4375 992.609375 580.40625 976.859375 586.1875 962.832031 L 660.128906 783.335938 C 665.90625 769.308594 677.023438 758.152344 691.027344 752.320312 C 705.03125 746.488281 720.777344 746.457031 734.804688 752.234375 Z";

export default function Mark({
  size = 26,
  /** Dot colour. Teal on light grounds, white on dark. */
  dot = "var(--mark-dot, #0E4F55)",
  className = "",
}: {
  size?: number;
  dot?: string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="560 540 570 530"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d={STROKE_RIGHT} fill="#EE4A36" />
      <path d={STROKE_LEFT} fill="#EE4A36" />
      <circle cx="1065.01" cy="981.27" r="55.84" fill={dot} />
    </svg>
  );
}
