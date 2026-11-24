"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CONTACT, MEDIA, WHATSAPP_ENABLED } from "@/lib/content";
import { mailtoHref, submitLead, whatsappHref, composeLeadBody, type Lead } from "@/lib/lead";

/**
 * The media quote form. Same delivery path and the same honesty rules as
 * BookingForm: it lands in ERPNext as a Lead (Enquiry Type "Media Quote"),
 * and on any failure it hands over working email / WhatsApp paths carrying
 * the whole request — never a fake success.
 */

type State =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "manual"; lead: Lead }
  | { kind: "error"; lead: Lead; detail: string };

const SERVICE_OPTIONS = [
  ...MEDIA.groups.flatMap((g) => g.items.map((i) => `${g.title}: ${i.name}`)),
  "Not sure yet: help me choose",
];

export default function MediaQuoteForm() {
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [service, setService] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [method, setMethod] = useState<"whatsapp" | "email">(
    WHATSAPP_ENABLED ? "whatsapp" : "email"
  );
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [state, setState] = useState<State>({ kind: "idle" });

  const lead: Lead = useMemo(
    () => ({
      kind: "media-quote",
      name,
      org,
      contactMethod: method,
      contactValue: value,
      message,
      consent,
      website,
      service,
      eventDate,
      location,
    }),
    [name, org, method, value, message, consent, website, service, eventDate, location]
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    setState({ kind: "sending" });
    const res = await submitLead(lead);
    if (res.ok) setState({ kind: "sent" });
    else if (res.reason === "no-endpoint") setState({ kind: "manual", lead });
    else if (res.reason === "rejected" && res.detail === "spam") setState({ kind: "sent" });
    else setState({ kind: "error", lead, detail: res.detail ?? "Unknown error" });
  };

  if (state.kind === "sent") {
    return (
      <div className="form-done" role="status">
        <h3 className="t-h2 balance">Thank you. We have your request.</h3>
        <p className="t-body pretty">
          You&rsquo;ll get a fixed quote within one business day, from a real person. If
          the date is close, email us at{" "}
          <a className="link-draw" href={`mailto:${CONTACT.email}`}>
            {CONTACT.emailDisplay}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="form-head">
        <h2 className="t-h1 balance">{MEDIA.formHeadline}</h2>
        <p className="t-lead pretty">{MEDIA.formLead}</p>
      </div>

      <div className="form-grid">
        <div className="field">
          <label htmlFor="mq-name" className="t-label">Your name</label>
          <input id="mq-name" name="name" type="text" autoComplete="name" required
            value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="mq-org" className="t-label">
            Organisation <span className="field-opt">Optional</span>
          </label>
          <input id="mq-org" name="org" type="text" autoComplete="organization"
            value={org} onChange={(e) => setOrg(e.target.value)} />
        </div>

        <div className="field field-full">
          <label htmlFor="mq-service" className="t-label">What do you need?</label>
          <select id="mq-service" name="service" required value={service}
            onChange={(e) => setService(e.target.value)}>
            <option value="" disabled>Choose a package</option>
            {SERVICE_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="mq-date" className="t-label">
            Date <span className="field-opt">If you know it</span>
          </label>
          <input id="mq-date" name="date" type="date"
            value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="mq-location" className="t-label">Where is it?</label>
          <input id="mq-location" name="location" type="text" placeholder="Suburb or venue"
            value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>

        <fieldset className="field field-full" hidden={!WHATSAPP_ENABLED}>
          <legend className="t-label">How should we reach you?</legend>
          <div className="method-toggle">
            {(["whatsapp", "email"] as const).map((m) => (
              <div key={m} className="method-option">
                <input type="radio" id={`mq-m-${m}`} name="method" value={m}
                  checked={method === m} onChange={() => setMethod(m)} />
                <label htmlFor={`mq-m-${m}`}>{m === "whatsapp" ? "WhatsApp" : "Email"}</label>
              </div>
            ))}
          </div>
        </fieldset>

        <div className="field field-full">
          <label htmlFor="mq-value" className="t-label">
            {method === "whatsapp" ? "WhatsApp number" : "Email address"}
          </label>
          <input
            id="mq-value"
            name="contact"
            type={method === "whatsapp" ? "tel" : "email"}
            inputMode={method === "whatsapp" ? "tel" : "email"}
            autoComplete={method === "whatsapp" ? "tel" : "email"}
            placeholder={method === "whatsapp" ? "071 234 5678" : "you@organisation.co.za"}
            required
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <div className="field field-full">
          <label htmlFor="mq-message" className="t-label">
            Tell us about the day <span className="field-opt">Optional</span>
          </label>
          <textarea id="mq-message" name="message" rows={4}
            placeholder="What's happening, roughly how many people, anything we must capture"
            value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>

        <div className="hp" aria-hidden="true">
          <label htmlFor="mq-website">Leave this empty</label>
          <input id="mq-website" name="website" type="text" tabIndex={-1} autoComplete="off"
            value={website} onChange={(e) => setWebsite(e.target.value)} />
        </div>

        <div className="field field-full consent">
          <input id="mq-consent" name="consent" type="checkbox" checked={consent}
            onChange={(e) => setConsent(e.target.checked)} required />
          <label htmlFor="mq-consent" className="t-small pretty">
            I agree that Agisano may contact me about this request. We keep only what
            you&rsquo;ve given us, we use it only to reply, and we never sell or share it.{" "}
            <Link href="/privacy" className="link-draw">How we handle your information</Link>.
          </label>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary"
          disabled={state.kind === "sending" || !consent}>
          {state.kind === "sending" ? "Sending…" : "Request a quote"}
          <span aria-hidden="true">→</span>
        </button>
        {WHATSAPP_ENABLED ? (
          <a className="btn btn-quiet" target="_blank" rel="noopener noreferrer"
            href={whatsappHref(name || service ? composeLeadBody(lead) : undefined)}>
            Or message us on WhatsApp
          </a>
        ) : (
          <a className="btn btn-quiet" href={`mailto:${CONTACT.email}`}>Or email us directly</a>
        )}
      </div>

      {(state.kind === "manual" || state.kind === "error") && (
        <div className="form-fallback" role="alert">
          <h3 className="t-h3">
            {state.kind === "manual" ? "One more step." : "That didn't send."}
          </h3>
          <p className="t-body pretty">
            {state.kind === "manual"
              ? `Send it ${WHATSAPP_ENABLED ? "through either of these" : "by email"} and it reaches us directly, with everything you've entered.`
              : `Something went wrong on our side (${state.detail}). Your details are safe. Send them ${
                  WHATSAPP_ENABLED ? "through either of these" : "by email"
                } instead.`}
          </p>
          <div className="form-actions">
            {WHATSAPP_ENABLED && (
              <a className="btn btn-primary" href={whatsappHref(composeLeadBody(state.lead))}
                target="_blank" rel="noopener noreferrer">
                Send on WhatsApp
              </a>
            )}
            <a className={WHATSAPP_ENABLED ? "btn btn-quiet" : "btn btn-primary"}
              href={mailtoHref(state.lead)}>
              Send by email
            </a>
          </div>
        </div>
      )}
    </form>
  );
}
