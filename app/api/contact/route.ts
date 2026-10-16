/**
 * POST /api/contact — receives enquiries from the /contact page.
 *
 * Security / reliability:
 *  - validated on the server (shared rules with the client)
 *  - honeypot field + minimum time-to-submit check (spam bots)
 *  - rate limiting per IP (5 requests / 10 minutes -> 429)
 *  - all credentials + recipient email come from environment variables
 *  - input sanitised and HTML-escaped before it touches an email
 *  - error responses never leak server details
 */
import { NextResponse } from "next/server";
import { z } from "zod";
import { getContactEnv, saveLead, sendAutoReply, sendEmail, type ContactPayload } from "@/lib/contact/handlers";
import { AREAS_OF_INTEREST, ENQUIRY_TYPES, LIMITS, sanitize } from "@/lib/contact/validation";

export const runtime = "nodejs";

const RATE_WINDOW_MS = 10 * 60_000; // 10 minutes
const RATE_MAX = 5; // 5 requests per window per IP
const MIN_FILL_MS = 3_000; // form must take at least 3 seconds to submit
const CLOCK_SKEW_MS = 60_000; // tolerate 1 minute of client clock skew
const MAX_BODY_BYTES = 10 * 1024; // reject request bodies over 10KB

const SUCCESS_MESSAGE = "Thank you! We'll get back to you soon.";
const GENERIC_ERROR = "We're having trouble receiving messages right now. Please try again later.";
const FORBIDDEN_MESSAGE = "Request not allowed.";

/** Server-authoritative schema (zod). Tighter than the shared client rules:
 *  name ≤ 100, email ≤ 200, message 10–3000. */
const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter a valid name.").max(LIMITS.name, `Name must be ${LIMITS.name} characters or fewer.`),
  email: z
    .string()
    .trim()
    .max(LIMITS.email, `Email must be ${LIMITS.email} characters or fewer.`)
    .refine((v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v), "Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .max(LIMITS.phone)
    .regex(/^[+()\-\s.\d]*$/, "Please enter a valid phone number.")
    .refine((v) => v === "" || (v.replace(/\D/g, "").length >= 7 && v.replace(/\D/g, "").length <= 15), "Please enter a valid phone number (7–15 digits).")
    .optional()
    .or(z.literal("")),
  company: z.string().trim().max(LIMITS.company).optional().or(z.literal("")),
  area: z.enum(AREAS_OF_INTEREST, { message: "Please select an area of interest." }),
  message: z
    .string()
    .trim()
    .min(LIMITS.messageMin, `Please add a little more detail (at least ${LIMITS.messageMin} characters).`)
    .max(LIMITS.message, `Message must be ${LIMITS.message} characters or fewer.`),
  enquiryType: z.enum(ENQUIRY_TYPES, { message: "Invalid enquiry type." }),
  consent: z.literal(true, { message: "Please agree to be contacted about your enquiry." }),
  marketing: z.boolean().optional(),
});

/**
 * Same-origin enforcement: browsers always send Origin on POST.
 * SITE_ORIGIN must be set in production (e.g. https://vallunar.com).
 * Localhost is accepted only outside production.
 */
function isAllowedOrigin(req: Request): boolean {
  const origin = req.headers.get("origin")?.trim().replace(/\/$/, "");
  if (!origin) return false;
  const allowed = (process.env.SITE_ORIGIN || "").trim().replace(/\/$/, "");
  if (allowed && origin === allowed) return true;
  if (process.env.NODE_ENV !== "production") {
    try {
      const host = new URL(origin).hostname;
      return host === "localhost" || host === "127.0.0.1";
    } catch {
      return false;
    }
  }
  return false;
}

/**
 * In-memory rate limiter. Fine for a single instance; swap for Redis/Upstash
 * if you move to serverless with many parallel instances.
 */
const rateLog = new Map<string, number[]>();

function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (rateLog.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) {
    rateLog.set(ip, recent);
    return true;
  }
  recent.push(now);
  rateLog.set(ip, recent);

  // Prevent unbounded growth of the map.
  if (rateLog.size > 5000) {
    rateLog.forEach((times, key) => {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) rateLog.delete(key);
    });
  }
  return false;
}

function json(body: Record<string, unknown>, status = 200): NextResponse {
  return NextResponse.json(body, { status });
}

export async function POST(req: Request) {
  // Same-origin gate first — never parse bodies from foreign origins.
  if (!isAllowedOrigin(req)) {
    return json({ ok: false, message: FORBIDDEN_MESSAGE }, 403);
  }

  if (isRateLimited(clientIp(req))) {
    return json(
      {
        ok: false,
        message: "You've sent a few enquiries in a row. Please wait about 10 minutes and try again — or contact us directly.",
      },
      429
    );
  }

  // Reject oversized bodies (header or actual payload).
  const declaredLength = Number(req.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return json({ ok: false, message: "Request too large." }, 413);
  }
  const rawBody = await req.text();
  if (Buffer.byteLength(rawBody, "utf8") > MAX_BODY_BYTES) {
    return json({ ok: false, message: "Request too large." }, 413);
  }

  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(rawBody);
  } catch {
    return json({ ok: false, message: "Invalid request." }, 400);
  }
  if (typeof parsedJson !== "object" || parsedJson === null || Array.isArray(parsedJson)) {
    return json({ ok: false, message: "Invalid request." }, 400);
  }
  const body = parsedJson as Record<string, unknown>;

  // Honeypot: pretend success so bots learn nothing.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return json({ ok: true, message: SUCCESS_MESSAGE });
  }

  // Minimum time-to-submit: reject instant submissions.
  const startedAt = Number(body.startedAt);
  const now = Date.now();
  if (!Number.isFinite(startedAt) || now - startedAt < MIN_FILL_MS || startedAt > now + CLOCK_SKEW_MS) {
    return json({ ok: false, message: "That was quick! Please review your details and submit again." }, 400);
  }

  const zodResult = contactSchema.safeParse(body);
  if (!zodResult.success) {
    const errors: Record<string, string> = {};
    for (const issue of zodResult.error.issues) {
      const field = String(issue.path[0] ?? "form");
      if (!errors[field]) errors[field] = issue.message;
    }
    return json({ ok: false, errors, message: "Please correct the highlighted fields." }, 400);
  }
  const input = zodResult.data;

  const env = getContactEnv();
  if (!env) {
    // Server log (config presence only — no request data); generic message to the visitor.
    return json({ ok: false, message: GENERIC_ERROR }, 500);
  }

  const payload: ContactPayload = {
    name: sanitize(input.name, LIMITS.name),
    email: sanitize(input.email, LIMITS.email),
    phone: sanitize(input.phone ?? "", LIMITS.phone),
    company: sanitize(input.company ?? "", LIMITS.company),
    area: sanitize(input.area, LIMITS.message),
    message: sanitize(input.message, LIMITS.message),
    enquiryType: input.enquiryType,
    consent: true,
    marketing: input.marketing === true,
    ip: clientIp(req),
  };

  try {
    await sendEmail(payload, env);
    await saveLead(payload);
  } catch (error) {
    // Log status code only — never personal data or provider bodies.
    const status = error instanceof Error ? Number((error as { status?: number }).status) || 0 : 0;
    console.error("[contact] delivery failed with status", status);
    return json({ ok: false, message: GENERIC_ERROR }, 500);
  }

  // Fire-and-forget auto-reply — visitor already has a success response.
  void sendAutoReply(payload, env).catch(() => undefined);

  return json({ ok: true, message: SUCCESS_MESSAGE });
}

export async function GET() {
  return json({ ok: false, message: "Method not allowed." }, 405);
}
