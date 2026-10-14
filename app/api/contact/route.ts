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
import { getContactEnv, saveLead, sendAutoReply, sendEmail, type ContactPayload } from "@/lib/contact/handlers";
import { LIMITS, sanitize, validateContact } from "@/lib/contact/validation";

export const runtime = "nodejs";

const RATE_WINDOW_MS = 10 * 60_000; // 10 minutes
const RATE_MAX = 5; // 5 requests per window per IP
const MIN_FILL_MS = 3_000; // form must take at least 3 seconds to submit
const CLOCK_SKEW_MS = 60_000; // tolerate 1 minute of client clock skew

const SUCCESS_MESSAGE = "Thank you! We'll get back to you soon.";
const GENERIC_ERROR = "We're having trouble receiving messages right now. Please try again later.";

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
  if (isRateLimited(clientIp(req))) {
    return json(
      {
        ok: false,
        message: "You've sent a few enquiries in a row. Please wait about 10 minutes and try again — or contact us directly.",
      },
      429
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, message: "Invalid request." }, 400);
  }

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

  const errors = validateContact(body);
  if (Object.keys(errors).length > 0) {
    return json({ ok: false, errors, message: "Please correct the highlighted fields." }, 400);
  }

  const env = getContactEnv();
  if (!env) {
    // Clear server log above; friendly (generic) message for the visitor.
    return json({ ok: false, message: GENERIC_ERROR }, 500);
  }

  const payload: ContactPayload = {
    name: sanitize(body.name, LIMITS.name),
    email: sanitize(body.email, LIMITS.email),
    phone: sanitize(body.phone, LIMITS.phone),
    company: sanitize(body.company, LIMITS.company),
    area: sanitize(body.area, LIMITS.message),
    message: sanitize(body.message, LIMITS.message),
    enquiryType: String(body.enquiryType),
    consent: true,
    marketing: body.marketing === true || body.marketing === "true",
    ip: clientIp(req),
  };

  try {
    await sendEmail(payload, env);
    await saveLead(payload);
  } catch (error) {
    console.error("[contact] Failed to deliver enquiry:", error);
    return json({ ok: false, message: GENERIC_ERROR }, 500);
  }

  // Fire-and-forget auto-reply — visitor already has a success response.
  void sendAutoReply(payload, env).catch(() => undefined);

  return json({ ok: true, message: SUCCESS_MESSAGE });
}

export async function GET() {
  return json({ ok: false, message: "Method not allowed." }, 405);
}
