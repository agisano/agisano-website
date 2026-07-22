# Booking form → ERPNext Lead (Route A)

A submission on agisano.com creates a Lead in ERPNext (`erp.agisano.com`).

**The site's form does not change.** `BookingForm.tsx` keeps its design, its
Readiness Check and its copy. The ERPNext Web Form created below is never shown
to a visitor — it exists only as a permission grant ("guests may create Leads")
and a field whitelist. The only code change is the JSON envelope in
`lib/lead.ts`.

---

## Why this shape

ERPNext refuses anonymous writes. Verified against production:

```
POST /api/resource/Lead   (no auth)
→ PermissionError: "User Guest does not have doctype access ... for Lead"
```

An API key would lift that, but this site is a static export — every
`NEXT_PUBLIC_*` value is baked into public JavaScript, so a key there is
readable by anyone and bypasses the CrowdSec/WAF/forced-SSO stack in front of
ERPNext. ERPNext Webhooks don't help: they are **outbound only**, firing when a
document changes. Nothing in Frappe accepts an inbound webhook that creates a
record.

A published Web Form with login not required is the one native path that admits
an anonymous POST without a credential.

---

## Step 1 — Add the custom field to Lead

The form already composes the whole lead as readable text via
`composeLeadBody()` — message, priority, consent, the full Readiness Check
readout, the raw answers. One Long Text field carries all of it, so the readout
needs no schema of its own.

1. Awesome bar (top search) → type `Customize Form` → Enter
2. **Enter Form Type:** `Lead`
3. Scroll to the fields table → **Add Row** at the bottom
4. **Label:** `Enquiry Detail`
5. **Type:** `Long Text`
6. **Update** (top right)

ERPNext names the field `custom_enquiry_detail` automatically. Confirm that by
clicking the row — the fieldname is shown there. If it differs, use what you
see in step 2 and tell me, since the code patch depends on it.

## Step 2 — Create the Web Form

1. Awesome bar → `new web form` → Enter
2. Set:

| Setting | Value |
|---|---|
| Title | `Website Lead` |
| Route | `website-lead` |
| Doc Type | `Lead` |
| Module | any (e.g. `CRM`) — required by Frappe, irrelevant here |
| **Login Required** | **unchecked** ← the whole mechanism |
| Is Published | checked |
| Apply Document Permissions | unchecked |

3. In the Web Form's own field table, add one row per field below. Fieldnames
   must match the Lead doctype exactly:

| Fieldname | Label | Type | Required |
|---|---|---|---|
| `lead_name` | Name | Data | yes |
| `company_name` | Institution | Data | |
| `email_id` | Email | Data | |
| `mobile_no` | Mobile | Data | |
| `custom_enquiry_detail` | Enquiry Detail | Long Text | |

4. Save.

**Any field not declared here is rejected on submission.** That is the most
common cause of a silent failure.

## Step 3 — Verify guest submission

The decision point. Run from anywhere:

```bash
curl -s -X POST https://erp.agisano.com/api/method/frappe.website.doctype.web_form.web_form.accept \
  -H 'Content-Type: application/json' \
  -d '{"web_form":"website-lead","data":"{\"lead_name\":\"Probe\",\"company_name\":\"Test School\",\"email_id\":\"probe@example.com\",\"custom_enquiry_detail\":\"verification probe\"}"}'
```

- **A success response, and a Lead appears** → Route A works. Continue.
- **`PermissionError`** → guest submission is blocked on this build. Stop; use
  Route B (server-side receiver holding an API key).
- **A validation error naming a field** → ERPNext wants that field too. Add it
  to the Web Form in step 2 and retry.

Delete the probe Lead afterwards.

## Step 4 — Allow cross-origin requests

The browser posts from `agisano.com` to `erp.agisano.com` — a cross-origin
request. On the VPS, in the compose directory:

```bash
docker compose exec erpnext-backend \
  bench --site erp.agisano.com set-config allow_cors '["https://agisano.com","https://www.agisano.com"]'
```

Step 3 passes without this — curl is not a browser and does not enforce CORS.
The real form will still fail until it is set. Do not skip it on the strength of
a green step 3.

## Step 5 — Patch the site (CTO)

`lib/lead.ts` currently POSTs flat JSON. Frappe wants `{web_form, data}` with
the lead fields inside `data`, contact routed to `email_id` or `mobile_no`
depending on the chosen method, and `composeLeadBody()` into
`custom_enquiry_detail`.

Written against the verified response from step 3 — Frappe versions differ on
whether `data` is a JSON string or an object.

## Step 6 — Point the site at it

Settings → Secrets and variables → Actions → **Variables**:

```
NEXT_PUBLIC_LEAD_ENDPOINT = https://erp.agisano.com/api/method/frappe.website.doctype.web_form.web_form.accept
```

`NEXT_PUBLIC_*` values bake in at build time, so **setting the variable is not
enough — the site must be rebuilt.** Push any commit, or re-run the deploy
workflow manually.

## Step 7 — Test the real form

1. Open `https://agisano.com/assessment`
2. Submit a genuine-looking enquiry
3. Confirm the Lead lands in ERPNext with the readout inside Enquiry Detail
4. Run the homepage 90-second check and submit from there too — that path
   attaches the Readiness Check readout, so it exercises the larger payload

If the browser console shows a CORS error, step 4 didn't take.

---

## Spam

The endpoint is public, so it will eventually be found.

1. The `website` honeypot in `lib/lead.ts` — bots fill it, humans never see it.
   Refused client-side today; drop it server-side too if abuse appears.
2. Frappe Web Forms can require a captcha.
3. Traefik rate-limiting already fronts `erp.agisano.com`.

## Known side effect

Because the Web Form must be published, Frappe serves its own rendering at
`erp.agisano.com/website-lead`. Nothing links to it and no visitor has reason to
find it, but it is publicly reachable. Route B has no such artifact.

## Fallback behaviour

With no endpoint configured the form does not fake success: it reports that
online submission isn't connected and offers `mailto:hello@agisano.com` (live,
Migadu MX confirmed) plus WhatsApp when `NEXT_PUBLIC_WHATSAPP` is set. Nothing
is silently swallowed.
