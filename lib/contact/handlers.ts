/**
 * Contact "handlers" layer — everything with side effects lives here so the
 * API route stays thin and other integrations (CRM, database, Slack, ...)
 * can be plugged in later without touching the route.
 *
 *  - sendEmail()      : delivers the enquiry to the business inbox via Resend
 *  - sendAutoReply()  : best-effort confirmation to the visitor
 *  - saveLead()       : no-op stub — swap in HubSpot / Supabase / Airtable later
 */

import { sanitize, LIMITS } from "./validation";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  company: string;
  area: string;
  message: string;
  enquiryType: string;
  consent: boolean;
  marketing: boolean;
  ip?: string;
};

export type ContactEnv = { apiKey: string; to: string; from: string };

/** Escape a value for safe interpolation into HTML (prevents HTML/email injection). */
export function escapeHtml(value: unknown): string {
  return String(value ?? "").replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&": return "&amp;";
      case "<": return "&lt;";
      case ">": return "&gt;";
      case '"': return "&quot;";
      default: return "&#39;";
    }
  });
}

/**
 * Read and verify the contact environment variables.
 * Returns null (after a clear server log) when anything is missing.
 */
export function getContactEnv(): ContactEnv | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();

  if (!apiKey || !to || !from) {
    console.error(
      "[contact] Missing server configuration — set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL in .env.local. " +
        `Got: RESEND_API_KEY=${apiKey ? "ok" : "MISSING"}, CONTACT_TO_EMAIL=${to ? "ok" : "MISSING"}, CONTACT_FROM_EMAIL=${from ? "ok" : "MISSING"}`
    );
    return null;
  }
  return { apiKey, to, from };
}

const SUBJECT_LABELS: Record<string, string> = {
  quotation: "Project & Quotation",
  software_development: "Software Development",
  partnership: "Partnership & Collaboration",
  marketing: "Marketing",
  general: "General & Marketing",
};

function enquirySubject(payload: ContactPayload): string {
  const label = SUBJECT_LABELS[payload.enquiryType] ?? "Website";
  return `[Website] ${label} enquiry from ${sanitize(payload.name, LIMITS.name)}`;
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:10px 16px 10px 0;color:#5b6b7c;font:600 11px/1.4 sans-serif;text-transform:uppercase;letter-spacing:.08em;vertical-align:top">${escapeHtml(label)}</td>
    <td style="padding:10px 0;color:#012a4a;font:14px/1.6 sans-serif;vertical-align:top">${value}</td>
  </tr>`;
}

/** Build the internal notification email (all dynamic values escaped). */
function buildEmailHtml(payload: ContactPayload): string {
  const messageHtml = escapeHtml(payload.message).replace(/\n/g, "<br />");
  const area = sanitize(payload.area, 120);
  const company = sanitize(payload.company, LIMITS.company);
  const phone = sanitize(payload.phone, LIMITS.phone);

  return `<!doctype html><html><body style="margin:0;background:#f4f7f9;padding:24px">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;border:1px solid #e4ecf2;overflow:hidden">
      <div style="background:#012a4a;padding:20px 24px">
        <span style="color:#a9d6e5;font:600 14px/1 sans-serif;letter-spacing:.2em">VALLUNAR</span>
      </div>
      <div style="padding:24px">
        <h1 style="margin:0 0 4px;color:#012a4a;font:600 20px/1.3 sans-serif">${escapeHtml(enquirySubject(payload))}</h1>
        <p style="margin:0 0 16px;color:#5b6b7c;font:13px/1.5 sans-serif">Submitted from vallunar.com/contact</p>
        <table style="width:100%;border-collapse:collapse">
          ${row("Enquiry type", escapeHtml(payload.enquiryType))}
          ${row("Name", escapeHtml(payload.name))}
          ${row("Email", escapeHtml(payload.email))}
          ${row("Phone", phone ? escapeHtml(phone) : "—")}
          ${row("Company", company ? escapeHtml(company) : "—")}
          ${row("Area of interest", escapeHtml(area))}
          ${row("Marketing consent", payload.marketing ? "Yes" : "No")}
          ${row("Submitted from IP", payload.ip ? escapeHtml(payload.ip) : "—")}
          ${row("Message", messageHtml)}
        </table>
      </div>
    </div>
  </body></html>`;
}

function buildAutoReplyHtml(payload: ContactPayload): string {
  const name = escapeHtml(payload.name);
  return `<!doctype html><html><body style="margin:0;background:#f4f7f9;padding:24px">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;border:1px solid #e4ecf2;overflow:hidden">
      <div style="background:#012a4a;padding:20px 24px">
        <span style="color:#a9d6e5;font:600 14px/1 sans-serif;letter-spacing:.2em">VALLUNAR</span>
      </div>
      <div style="padding:24px;color:#012a4a;font:14px/1.7 sans-serif">
        <h1 style="font:600 18px/1.3 sans-serif;margin:0 0 12px">Thank you, ${name}.</h1>
        <p style="margin:0 0 12px">We've received your enquiry and will connect you with the right team shortly.</p>
        <p style="margin:0;color:#5b6b7c">— Vallunar Groups</p>
      </div>
    </div>
  </body></html>`;
}

async function postEmail(env: ContactEnv, body: Record<string, unknown>): Promise<void> {
  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    // Log status + detail server-side only — never returned to the client.
    throw new Error(`Resend responded with ${response.status}: ${detail.slice(0, 300)}`);
  }
}

/** Send the enquiry to the company inbox. Throws on failure (route handles it). */
export async function sendEmail(payload: ContactPayload, env: ContactEnv): Promise<void> {
  await postEmail(env, {
    from: env.from,
    to: [env.to],
    reply_to: payload.email,
    subject: enquirySubject(payload),
    html: buildEmailHtml(payload),
    text:
      `${enquirySubject(payload)}\n\n` +
      `Name: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone || "—"}\n` +
      `Company: ${payload.company || "—"}\nArea: ${payload.area}\n` +
      `Marketing consent: ${payload.marketing ? "Yes" : "No"}\n\nMessage:\n${payload.message}`,
  });
}

/** Best-effort confirmation to the visitor — never throws, never blocks the response. */
export async function sendAutoReply(payload: ContactPayload, env: ContactEnv): Promise<void> {
  try {
    await postEmail(env, {
      from: env.from,
      to: [payload.email],
      subject: "We've received your enquiry — Vallunar Groups",
      html: buildAutoReplyHtml(payload),
      text: `Thank you, ${payload.name}. We've received your enquiry and will get back to you soon. — Vallunar Groups`,
    });
  } catch (error) {
    console.warn("[contact] Auto-reply could not be sent:", error);
  }
}

/**
 * Persistence hook — currently a no-op stub.
 * Plug in your CRM / database here later (HubSpot, Supabase, Airtable, ...)
 * without changing app/api/contact/route.ts.
 */
export async function saveLead(payload: ContactPayload): Promise<void> {
  void payload;
}
