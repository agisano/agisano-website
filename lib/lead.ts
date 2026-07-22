/**
 * Lead delivery (build-spec §6). CTO owns this.
 *
 * ==========================================================================
 * INTEGRATION POINT — READ BEFORE LAUNCH
 * ==========================================================================
 * The form posts to NEXT_PUBLIC_LEAD_ENDPOINT (set in .env.local; see
 * .env.example). Any endpoint that accepts a JSON or form POST works —
 * Formspree, Basin, a Cloudflare/Vercel function, an n8n webhook.
 *
 * If NO endpoint is configured, the form does NOT pretend to succeed. It
 * reports honestly that online submission is not yet connected and hands the
 * user two REAL, working paths that need no backend: WhatsApp click-to-chat
 * and a mailto:, both pre-composed with the full lead + Readiness Check
 * readout. Nothing is ever silently swallowed. (The old site's
 * `setTimeout(1200) => setSubmitted(true)` is exactly the failure this avoids.)
 * ==========================================================================
 */

import { CONTACT } from "./content";
import { AREA_META, answerTranscript, priorityLabel, type Readout } from "./readiness";

export const LEAD_ENDPOINT = process.env.NEXT_PUBLIC_LEAD_ENDPOINT ?? "";
export const HAS_ENDPOINT = LEAD_ENDPOINT.length > 0;

export type Lead = {
  name: string;
  org: string;
  contactMethod: "email" | "whatsapp";
  contactValue: string;
  message?: string;
  priority?: string;
  consent: boolean;
  /** honeypot — must be empty; bots fill it (§6: no intrusive captcha) */
  website?: string;
  readout?: Readout | null;
  answers?: Record<string, number> | null;
};

export type SubmitResult =
  | { ok: true; via: "endpoint" }
  | { ok: false; reason: "no-endpoint" | "network" | "rejected"; detail?: string };

/** The human-readable body — used for the POST, the mailto and the WhatsApp text. */
export function composeLeadBody(lead: Lead): string {
  const lines: string[] = [
    "New assessment request — agisano.com",
    "",
    `Name: ${lead.name}`,
    `Institution: ${lead.org}`,
    `Contact (${lead.contactMethod}): ${lead.contactValue}`,
  ];

  if (lead.priority) lines.push(`Noted priority: ${lead.priority}`);
  if (lead.message?.trim()) lines.push("", `Message: ${lead.message.trim()}`);

  if (lead.readout) {
    lines.push("", "— Readiness Check —", lead.readout.headline, "");
    for (const a of lead.readout.areas) {
      lines.push(`${AREA_META[a.area].name}: ${statusWord(a.status)}`);
    }
    if (lead.readout.priorities.length) {
      lines.push(
        "",
        `Priorities: ${lead.readout.priorities.map(priorityLabel).join(", ")}`
      );
    }
    if (lead.readout.summarySize) lines.push(`Size: ${lead.readout.summarySize}`);
  }

  if (lead.answers && Object.keys(lead.answers).length) {
    lines.push("", "— Answers —", answerTranscript(lead.answers));
  }

  lines.push("", `Consent to be contacted: ${lead.consent ? "yes" : "no"}`);
  return lines.join("\n");
}

function statusWord(s: "solid" | "some" | "attention"): string {
  return s === "solid" ? "Solid — leave it" : s === "some" ? "Some gaps" : "Needs attention";
}

export async function submitLead(lead: Lead): Promise<SubmitResult> {
  // honeypot: silently accept-looking is wrong; just refuse to send.
  if (lead.website && lead.website.length > 0) {
    return { ok: false, reason: "rejected", detail: "spam" };
  }

  if (!HAS_ENDPOINT) {
    return { ok: false, reason: "no-endpoint" };
  }

  try {
    const res = await fetch(LEAD_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: lead.name,
        org: lead.org,
        contactMethod: lead.contactMethod,
        contactValue: lead.contactValue,
        message: lead.message ?? "",
        priority: lead.priority ?? "",
        consent: lead.consent,
        readout: lead.readout ?? null,
        answers: lead.answers ?? null,
        summary: composeLeadBody(lead),
        source: "agisano-site",
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      return { ok: false, reason: "rejected", detail: `HTTP ${res.status}` };
    }
    return { ok: true, via: "endpoint" };
  } catch (e) {
    return { ok: false, reason: "network", detail: e instanceof Error ? e.message : "unknown" };
  }
}

/** Real, working, backend-free path #1 — WhatsApp click-to-chat (first-class, §6). */
export function whatsappHref(text?: string): string {
  const base = `https://wa.me/${CONTACT.whatsappNumber}`;
  const body = text ?? "Hello Agisano — I'd like to book a free assessment.";
  return `${base}?text=${encodeURIComponent(body)}`;
}

/** Real, working, backend-free path #2 — mailto with the whole lead pre-composed. */
export function mailtoHref(lead: Lead): string {
  const subject = `Assessment request — ${lead.org || "new enquiry"}`;
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(composeLeadBody(lead))}`;
}
