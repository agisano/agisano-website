import { Fragment } from "react";

/**
 * Renders project copy, highlighting every [placeholder] so an unfinished fact is
 * impossible to miss — on screen and in the PDF.
 */
export default function Txt({ children }: { children: string }) {
  const parts = children.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((part, i) =>
        /^\[[^\]]+\]$/.test(part) ? (
          <mark key={i} className="tbc" title="To be confirmed">
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
