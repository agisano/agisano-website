"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AREA_META,
  QUESTIONS,
  STATUS_META,
  computeReadout,
  priorityLabel,
  type Readout,
} from "@/lib/readiness";
import BookingForm from "./BookingForm";
import Mark from "./Mark";

type Stage = "idle" | "asking" | "settling" | "readout" | "booking";

export default function ReadinessCheck() {
  const [stage, setStage] = useState<Stage>("idle");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [readout, setReadout] = useState<Readout | null>(null);
  const [orgName, setOrgName] = useState("");
  const [dir, setDir] = useState<"fwd" | "back">("fwd");

  const questionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const settleTimer = useRef<number | null>(null);

  const total = QUESTIONS.length;
  const q = QUESTIONS[index];
  const answered = Object.keys(answers).length;
  const progress = stage === "readout" || stage === "booking" ? 1 : answered / total;

  useEffect(
    () => () => {
      if (settleTimer.current) window.clearTimeout(settleTimer.current);
    },
    []
  );

  const start = useCallback(() => {
    setStage("asking");
    setIndex(0);
    setAnswers({});
    setReadout(null);
    setDir("fwd");
    requestAnimationFrame(() => {
      panelRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
      questionRef.current?.focus();
    });
  }, []);

  const finish = useCallback((final: Record<string, number>) => {
    setStage("settling");
    // An honest, brief "putting this together" beat — not fake-AI theatre.
    settleTimer.current = window.setTimeout(() => {
      setReadout(computeReadout(final));
      setStage("readout");
    }, 900);
  }, []);

  const answer = useCallback(
    (optionIndex: number) => {
      const next = { ...answers, [q.id]: optionIndex };
      setAnswers(next);
      setDir("fwd");

      if (index < total - 1) {
        setIndex((i) => i + 1);
        requestAnimationFrame(() => questionRef.current?.focus());
      } else {
        finish(next);
      }
    },
    [answers, q, index, total, finish]
  );

  const back = useCallback(() => {
    if (index === 0) {
      setStage("idle");
      return;
    }
    setDir("back");
    setIndex((i) => i - 1);
    requestAnimationFrame(() => questionRef.current?.focus());
  }, [index]);

  const restart = useCallback(() => {
    setAnswers({});
    setIndex(0);
    setReadout(null);
    setStage("asking");
    setDir("fwd");
    requestAnimationFrame(() => questionRef.current?.focus());
  }, []);

  const topPriority = readout?.priorities[0];
  const prefillPriority = useMemo(
    () => (topPriority ? priorityLabel(topPriority) : ""),
    [topPriority]
  );

  return (
    <div className="rc" ref={panelRef} data-stage={stage}>
      {/* Progress — the converging line filling toward its apex */}
      <div className="rc-progress" aria-hidden={stage === "idle"}>
        <div className="rc-progress-track">
          <div
            className="rc-progress-fill"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
        {stage === "asking" && (
          <p className="t-label rc-progress-label">
            <span className="sr-only">Question </span>
            {index + 1} <span aria-hidden="true">/</span>
            <span className="sr-only"> of </span> {total}
          </p>
        )}
      </div>

      {/* Live region so screen readers follow stage changes */}
      <p className="sr-only" role="status" aria-live="polite">
        {stage === "asking"
          ? `Question ${index + 1} of ${total}`
          : stage === "settling"
            ? "Putting your answers together"
            : stage === "readout"
              ? "Your readout is ready"
              : ""}
      </p>

      {stage === "idle" && (
        <div className="rc-idle">
          <button type="button" className="btn btn-primary" onClick={start}>
            Start the check
            <span aria-hidden="true">→</span>
          </button>
          <p className="t-small rc-note">
            About 90 seconds. Seven questions, all taps. Nothing is sent anywhere until
            you choose to send it.
          </p>
        </div>
      )}

      {stage === "asking" && (
        <div
          className="rc-stage"
          key={q.id}
          data-dir={dir}
          ref={questionRef}
          tabIndex={-1}
        >
          <fieldset className="rc-fieldset">
            <legend className="rc-question t-h1 balance">{q.text}</legend>
            <div className="rc-options">
              {q.options.map((opt, i) => {
                const id = `${q.id}-${i}`;
                const checked = answers[q.id] === i;
                return (
                  <div key={id} className="rc-option">
                    <input
                      type="radio"
                      id={id}
                      name={q.id}
                      value={i}
                      checked={checked}
                      onChange={() => answer(i)}
                      className="rc-radio"
                    />
                    <label htmlFor={id} className="rc-label">
                      <span className="rc-label-text">{opt.label}</span>
                      <span className="rc-label-mark" aria-hidden="true" />
                    </label>
                  </div>
                );
              })}
            </div>
          </fieldset>

          <div className="rc-controls">
            <button type="button" className="rc-back link-draw" onClick={back}>
              <span aria-hidden="true">←</span>{" "}
              {index === 0 ? "Leave the check" : "Back"}
            </button>
          </div>
        </div>
      )}

      {stage === "settling" && (
        <div className="rc-settling">
          <p className="t-h2 balance">Putting this together&hellip;</p>
          <p className="t-small rc-note">
            No algorithm, no score. Just our honest read of what you told us.
          </p>
        </div>
      )}

      {(stage === "readout" || stage === "booking") && readout && (
        <div className="rc-readout" data-booking={stage === "booking"}>
          <div className="rc-readout-head">
            <p className="t-label rc-eyebrow">Our honest read</p>
            {/* h2-scale, not h1: the readout headline is a long, conversational
                sentence — at statement scale it became an eight-line wall. This
                is the "person sitting across from you" register, not a billboard. */}
            <h3 className="t-h2 balance rc-headline">{readout.headline}</h3>
            <p className="t-small rc-note pretty">
              This is our read of what you told us — not a score and not a benchmark. The
              real assessment is the on-site visit, where we see it for ourselves.
            </p>
          </div>

          {/* The four areas. "Solid — leave it" is visually EQUAL to a problem. */}
          <ul className="rc-areas">
            {readout.areas.map((a) => {
              const meta = STATUS_META[a.status];
              return (
                <li key={a.area} className="rc-area" data-status={a.status}>
                  <div className="rc-area-head">
                    <h4 className="t-h3">{AREA_META[a.area].name}</h4>
                    <p className="rc-status">
                      <span className="rc-status-icon" aria-hidden="true" />
                      <span className="rc-status-word">{meta.word}</span>
                    </p>
                  </div>
                  <p className="t-body pretty rc-area-body">{a.sentence}</p>
                </li>
              );
            })}
          </ul>

          {readout.priorities.length > 0 ? (
            <div className="rc-priorities">
              <h4 className="t-label rc-eyebrow">
                {readout.priorities.length === 1
                  ? "What we'd do first"
                  : "What we'd do first — in this order"}
              </h4>
              <ol className="rc-priority-list">
                {readout.priorities.map((p, i) => (
                  <li key={p}>
                    <span className="rc-priority-n t-label">{`0${i + 1}`}</span>
                    <span className="t-h3">{priorityLabel(p)}</span>
                  </li>
                ))}
              </ol>
              <p className="t-small rc-note pretty">
                We&rsquo;ve deliberately named{" "}
                {readout.priorities.length === 1 ? "one thing" : "two things"}, not four.
                Doing everything at once is how budgets get wasted.
              </p>
            </div>
          ) : (
            <div className="rc-priorities">
              <h4 className="t-label rc-eyebrow">What we&rsquo;d do first</h4>
              <p className="t-h3 pretty">
                Nothing urgent. Keep what you have working — that&rsquo;s the job.
              </p>
            </div>
          )}

          {/* The keepable one-page summary + the hand-off */}
          <div className="rc-handoff">
            {stage === "readout" ? (
              <>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setStage("booking")}
                >
                  Book a free assessment
                  <span aria-hidden="true">→</span>
                </button>
                <div className="rc-handoff-quiet">
                  <button type="button" className="rc-back link-draw" onClick={printSummary}>
                    Save or print this summary
                  </button>
                  <button type="button" className="rc-back link-draw" onClick={restart}>
                    Start again
                  </button>
                </div>
              </>
            ) : (
              <p className="t-small rc-note">
                Based on your check, we&rsquo;ve noted{" "}
                <strong>{prefillPriority || "no urgent priority"}</strong> — you can change
                this.
              </p>
            )}
          </div>

          {stage === "booking" && (
            <div className="rc-booking">
              <BookingForm
                readout={readout}
                answers={answers}
                initialPriority={prefillPriority}
                initialOrg={orgName}
                onOrgChange={setOrgName}
                compact
              />
            </div>
          )}

          {/* Print-only keepable one-page summary (§4.4) — a real, designed artifact */}
          <PrintSummary readout={readout} org={orgName} />
        </div>
      )}
    </div>
  );
}

function printSummary() {
  window.print();
}

function PrintSummary({ readout, org }: { readout: Readout; org: string }) {
  const date = new Date().toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="rc-print" aria-hidden="true">
      <header className="rc-print-head">
        <div className="rc-print-mark">
          <Mark size={30} />
          <span>Agisano</span>
        </div>
        <p className="rc-print-meta">{date}</p>
      </header>

      <h1 className="rc-print-title">Readiness Check</h1>
      {org && <p className="rc-print-org">{org}</p>}

      <p className="rc-print-headline">{readout.headline}</p>

      <table className="rc-print-table">
        <tbody>
          {readout.areas.map((a) => (
            <tr key={a.area}>
              <th scope="row">{AREA_META[a.area].name}</th>
              <td className="rc-print-status" data-status={a.status}>
                {STATUS_META[a.status].word}
              </td>
              <td>{a.sentence}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {readout.priorities.length > 0 && (
        <>
          <h2 className="rc-print-h2">What we&rsquo;d do first</h2>
          <ol className="rc-print-priorities">
            {readout.priorities.map((p) => (
              <li key={p}>{priorityLabel(p)}</li>
            ))}
          </ol>
        </>
      )}

      <p className="rc-print-foot">
        Our honest read of what you told us — not a score, and not a substitute for the
        free on-site assessment. Agisano &middot; agisano.com
      </p>
    </section>
  );
}
