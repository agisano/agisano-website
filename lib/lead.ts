/**
 * Lead delivery (build-spec §6).
 *
 * The form posts to NEXT_PUBLIC_LEAD_ENDPOINT (see .env.example), which is
 * ERPNext's Web Form endpoint (docs/erpnext-lead-integration.md). Each
 * submission becomes a Lead, Source "Website", with the whole readout in
 * Enquiry Detail. With no
 * endpoint configured — or on any network or HTTP failure — it never fakes a
 * success: it hands the user the WhatsApp and mailto paths, pre-composed with
 * the full lead and Readiness Check readout, so a lead is never silently lost.
 */

import { CONTACT } from "./content";
import { AREA_META, answerTranscript, priorityLabel, type Readout } from "./readiness";

export const LEAD_ENDPOINT = process.env.NEXT_PUBLIC_LEAD_ENDPOINT ?? "";
export const HAS_ENDPOINT = LEAD_ENDPOINT.length > 0;

/** Which form the lead came from — becomes the Lead's Enquiry Type in ERPNext. */
export type LeadKind = "assessment" | "media-quote";

const ENQUIRY_TYPE: Record<LeadKind, string> = {
  assessment: "Assessment",
  "media-quote": "Media Quote",
};

/** Must match the published ERPNext Web Form's route. */
const WEB_FORM = "website-lead";

export type Lead = {
  /** defaults to "assessment" — the booking form predates this field */
  kind?: LeadKind;
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
  /** media quote only */
  service?: string;
  eventDate?: string;
  location?: string;
};

export type SubmitResult =
  | { ok: true; via: "endpoint" }
  | { ok: false; reason: "no-endpoint" | "network" | "rejected"; detail?: string };

/** The human-readable body — used for the POST, the mailto and the WhatsApp text. */
export function composeLeadBody(lead: Lead): string {
  const isQuote = lead.kind === "media-quote";
  const lines: string[] = [
    isQuote ? "New media quote request — agisano.com" : "New assessment request — agisano.com",
    "",
    `Name: ${lead.name}`,
    `${isQuote ? "Organisation" : "Institution"}: ${lead.org}`,
    `Contact (${lead.contactMethod}): ${lead.contactValue}`,
  ];

  if (lead.service) lines.push(`Service: ${lead.service}`);
  if (lead.eventDate) lines.push(`Date: ${lead.eventDate}`);
  if (lead.location?.trim()) lines.push(`Location: ${lead.location.trim()}`);

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

  // Frappe's Web Form accept: {web_form, data} with `data` a JSON string whose
  // keys are Lead fieldnames. Only fields declared on the Web Form are kept;
  // anything else is silently dropped server-side.
  const data = {
    first_name: lead.name.trim(),
    company_name: lead.org.trim(),
    email_id: lead.contactMethod === "email" ? lead.contactValue.trim() : "",
    mobile_no: lead.contactMethod === "whatsapp" ? lead.contactValue.trim() : "",
    source: "Website",
    custom_enquiry_type: ENQUIRY_TYPE[lead.kind ?? "assessment"],
    custom_enquiry_detail: composeLeadBody(lead),
  };

  try {
    const res = await fetch(LEAD_ENDPOINT, {
      method: "POST",
      // A guest submission: never send cookies to the ERP.
      credentials: "omit",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ web_form: WEB_FORM, data: JSON.stringify(data) }),
    });

    if (!res.ok) {
      return { ok: false, reason: "rejected", detail: `HTTP ${res.status}` };
    }
    // Success means a Lead was actually created — Frappe echoes it back.
    const body = (await res.json().catch(() => null)) as { message?: { name?: string } } | null;
    if (!body?.message?.name) {
      return { ok: false, reason: "rejected", detail: "no record created" };
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
  const what = lead.kind === "media-quote" ? "Media quote request" : "Assessment request";
  const subject = `${what} — ${lead.org || lead.name || "new enquiry"}`;
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(composeLeadBody(lead))}`;
}
