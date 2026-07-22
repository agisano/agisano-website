"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CONTACT, WHATSAPP_ENABLED } from "@/lib/content";
import {
  HAS_ENDPOINT,
  composeLeadBody,
  mailtoHref,
  submitLead,
  whatsappHref,
  type Lead,
} from "@/lib/lead";
import type { Readout } from "@/lib/readiness";

type State =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "manual"; lead: Lead } // no endpoint configured — real fallbacks offered
  | { kind: "error"; lead: Lead; detail: string };

export default function BookingForm({
  readout = null,
  answers = null,
  initialPriority = "",
  initialOrg = "",
  onOrgChange,
  compact = false,
}: {
  readout?: Readout | null;
  answers?: Record<string, number> | null;
  initialPriority?: string;
  initialOrg?: string;
  onOrgChange?: (v: string) => void;
  compact?: boolean;
}) {
  const [name, setName] = useState("");
  const [org, setOrg] = useState(initialOrg);
  const [method, setMethod] = useState<"whatsapp" | "email">(
    WHATSAPP_ENABLED ? "whatsapp" : "email"
  );
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState(initialPriority);
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [state, setState] = useState<State>({ kind: "idle" });

  const lead: Lead = useMemo(
    () => ({
      name,
      org,
      contactMethod: method,
      contactValue: value,
      message,
      priority,
      consent,
      website,
      readout,
      answers,
    }),
    [name, org, method, value, message, priority, consent, website, readout, answers]
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    setState({ kind: "sending" });
    const res = await submitLead(lead);
    if (res.ok) {
      setState({ kind: "sent" });
    } else if (res.reason === "no-endpoint") {
      setState({ kind: "manual", lead });
    } else if (res.reason === "rejected" && res.detail === "spam") {
      setState({ kind: "sent" }); // honeypot tripped: do nothing, say nothing
    } else {
      setState({ kind: "error", lead, detail: res.detail ?? "Unknown error" });
    }
  };

  if (state.kind === "sent") {
    return (
      <div className="form-done" role="status">
        <h3 className="t-h2 balance">Thank you — that&rsquo;s with us.</h3>
        <p className="t-body pretty">
          We reply within one business day, from a real person.{" "}
          {WHATSAPP_ENABLED ? (
            <>
              If it&rsquo;s urgent,{" "}
              <a
                className="link-draw"
                href={whatsappHref(composeLeadBody(lead))}
                target="_blank"
                rel="noopener noreferrer"
              >
                message us on WhatsApp
              </a>
              .
            </>
          ) : (
            <>
              If it&rsquo;s urgent, email us at{" "}
              <a className="link-draw" href={`mailto:${CONTACT.email}`}>
                {CONTACT.emailDisplay}
              </a>
              .
            </>
          )}
        </p>
      </div>
    );
  }

  return (
    <form className={`form ${compact ? "form-compact" : ""}`} onSubmit={onSubmit} noValidate>
      {!compact && (
        <div className="form-head">
          <h2 className="t-h1 balance">Book a free assessment</h2>
          <p className="t-lead pretty">
            One form, one reply within a business day. No cost, no obligation.
          </p>
        </div>
      )}

      {priority && (
        <p className="form-prefill t-small pretty">
          Based on your check, we&rsquo;ve noted <strong>{priority}</strong> — you can
          change this below.
        </p>
      )}

      <div className="form-grid">
        <div className="field">
          <label htmlFor="bf-name" className="t-label">
            Your name
          </label>
          <input
            id="bf-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="bf-org" className="t-label">
            School or organisation
          </label>
          <input
            id="bf-org"
            name="org"
            type="text"
            autoComplete="organization"
            required
            value={org}
            onChange={(e) => {
              setOrg(e.target.value);
              onOrgChange?.(e.target.value);
            }}
          />
        </div>

        {/* With WhatsApp off there is only one way to reach us, so offering a
            "choice" of one is noise. The fieldset returns automatically when a
            number is configured. */}
        <fieldset className="field field-full" hidden={!WHATSAPP_ENABLED}>
          <legend className="t-label">How should we reach you?</legend>
          <div className="method-toggle">
            {(["whatsapp", "email"] as const).map((m) => (
              <div key={m} className="method-option">
                <input
                  type="radio"
                  id={`bf-m-${m}`}
                  name="method"
                  value={m}
                  checked={method === m}
                  onChange={() => setMethod(m)}
                />
                <label htmlFor={`bf-m-${m}`}>
                  {m === "whatsapp" ? "WhatsApp" : "Email"}
                </label>
              </div>
            ))}
          </div>
        </fieldset>

        <div className="field field-full">
          <label htmlFor="bf-value" className="t-label">
            {method === "whatsapp" ? "WhatsApp number" : "Email address"}
          </label>
          <input
            id="bf-value"
            name="contact"
            type={method === "whatsapp" ? "tel" : "email"}
            inputMode={method === "whatsapp" ? "tel" : "email"}
            autoComplete={method === "whatsapp" ? "tel" : "email"}
            placeholder={method === "whatsapp" ? "071 234 5678" : "you@school.co.za"}
            required
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <div className="field field-full">
          <label htmlFor="bf-priority" className="t-label">
            What&rsquo;s the priority? <span className="field-opt">Optional</span>
          </label>
          <input
            id="bf-priority"
            name="priority"
            type="text"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          />
        </div>

        <div className="field field-full">
          <label htmlFor="bf-message" className="t-label">
            Anything else we should know? <span className="field-opt">Optional</span>
          </label>
          <textarea
            id="bf-message"
            name="message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {/* honeypot — hidden from people, tempting to bots (§6: no captcha) */}
        <div className="hp" aria-hidden="true">
          <label htmlFor="bf-website">Leave this empty</label>
          <input
            id="bf-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div className="field field-full consent">
          <input
            id="bf-consent"
            name="consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
          />
          <label htmlFor="bf-consent" className="t-small pretty">
            I agree that Agisano may contact me about this request. We keep only what
            you&rsquo;ve given us, we use it only to reply, and we never sell or share it.{" "}
            <Link href="/privacy" className="link-draw">
              How we handle your information
            </Link>
            .
          </label>
        </div>
      </div>

      <div className="form-actions">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={state.kind === "sending" || !consent}
        >
          {state.kind === "sending" ? "Sending…" : "Send it"}
          <span aria-hidden="true">→</span>
        </button>

        {WHATSAPP_ENABLED ? (
          <a
            className="btn btn-quiet"
            href={whatsappHref(name || org ? composeLeadBody(lead) : undefined)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Or message us on WhatsApp
          </a>
        ) : (
          <a className="btn btn-quiet" href={`mailto:${CONTACT.email}`}>
            Or email us directly
          </a>
        )}
      </div>

      {!HAS_ENDPOINT && state.kind === "idle" && (
        <p className="form-devnote t-small pretty" role="note">
          <strong>Build note (not for launch):</strong> no lead endpoint is configured yet,
          so &ldquo;Send it&rdquo; will not silently pretend to succeed — it will hand you
          the working WhatsApp and email paths instead. Set{" "}
          <code>NEXT_PUBLIC_LEAD_ENDPOINT</code> to go live.
        </p>
      )}

      {(state.kind === "manual" || state.kind === "error") && (
        <div className="form-fallback" role="alert">
          <h3 className="t-h3">
            {state.kind === "manual"
              ? "Online submission isn't connected yet."
              : "That didn't send."}
          </h3>
          <p className="t-body pretty">
            {state.kind === "manual"
              ? `We won't pretend it went through. Send it ${
                  WHATSAPP_ENABLED ? "through either of these" : "by email"
                } instead — it carries everything you've entered, including your Readiness Check.`
              : `Something went wrong on our side (${state.detail}). Your details are safe — send them ${
                  WHATSAPP_ENABLED ? "through either of these" : "by email"
                } instead.`}
          </p>
          <div className="form-actions">
            {WHATSAPP_ENABLED && (
              <a
                className="btn btn-primary"
                href={whatsappHref(composeLeadBody(state.lead))}
                target="_blank"
                rel="noopener noreferrer"
              >
                Send on WhatsApp
              </a>
            )}
            <a
              className={WHATSAPP_ENABLED ? "btn btn-quiet" : "btn btn-primary"}
              href={mailtoHref(state.lead)}
            >
              Send by email
            </a>
          </div>
          <p className="t-small form-note">
            Or reach us directly: {CONTACT.emailDisplay}
          </p>
        </div>
      )}
    </form>
  );
}
