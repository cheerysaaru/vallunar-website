"use client";
/**
 * Two-column enquiry section for /contact:
 *  LEFT  — three selectable enquiry cards (active card highlighted, arrow → form)
 *  RIGHT — the form card; switching cards swaps the form with a smooth transition
 *          while preserving anything already typed (draft is kept in the parent).
 */
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { contactConfig } from "@/lib/contact-config";
import { getStoredUtm, type UtmParams } from "@/lib/utm";
import {
  AREAS_OF_INTEREST,
  validateArea,
  validateCompany,
  validateConsent,
  validateEmail,
  validateMessage,
  validateName,
  validatePhone,
} from "@/lib/contact/validation";

type EnquiryType = "quotation" | "partnership" | "general";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  company: string;
  area: string;
  message: string;
  consent: boolean;
  marketing: boolean;
  website: string; // honeypot
};

type Status = { kind: "idle" | "success" | "error"; message?: string };

const CARDS: { id: EnquiryType; title: string; blurb: string }[] = [
  {
    id: "quotation",
    title: "Project & Quotation Enquiries",
    blurb: "Software development, websites, mobile apps, AI and automation — get a scope and a quotation.",
  },
  {
    id: "partnership",
    title: "Partnerships & Collaboration",
    blurb: "Technology partnerships, resellers and long-term collaboration.",
  },
  {
    id: "general",
    title: "General & Marketing Enquiries",
    blurb: "General questions, support, branding, digital marketing and creative production — we'll route it to the right team.",
  },
];

const FORM_COPY: Record<EnquiryType, { title: string; subtitle: string }> = {
  quotation: {
    title: "Project & Quotation Enquiry",
    subtitle: "Tell us what you need built and we'll reply with scope, timeline and a quotation.",
  },
  partnership: {
    title: "Partnership & Collaboration",
    subtitle: "Let's explore how we can work together on products, technology or long-term collaboration.",
  },
  general: {
    title: "General & Marketing Enquiry",
    subtitle: "Questions, support, branding, digital marketing or creative production — we'll route it to the right team.",
  },
};

const EMPTY_VALUES: FormValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  area: "",
  message: "",
  consent: false,
  marketing: false,
  website: "",
};

const inputClass = (hasError: boolean) =>
  `focus-ring w-full rounded-xl border bg-[var(--light-tint)] px-4 py-3 text-sm text-[var(--text-dark)] placeholder:text-[var(--text-muted)] transition focus:border-[var(--mid-blue)] ${
    hasError ? "border-[var(--error)]" : "border-[var(--border-light)]"
  }`;

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p id={`${id}-error`} className="mt-1.5 text-xs text-[var(--error)]">
      {message}
    </p>
  );
}

function FieldLabel({ htmlFor, children, required }: { htmlFor: string; children: ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-[var(--mid-blue)]">
      {children}
      {required && (
        <>
          <span aria-hidden="true" className="text-[var(--accent-cyan)]"> *</span>
          <span className="sr-only"> (required)</span>
        </>
      )}
    </label>
  );
}

/* ------------------------------------------------------------------ */
/* The form itself — remounted per enquiry type (keyed by parent).     */
/* ------------------------------------------------------------------ */
function FormBody({
  enquiryType,
  defaultValues,
  startedAt,
  onDraft,
  status,
  setStatus,
}: {
  enquiryType: EnquiryType;
  defaultValues: FormValues;
  startedAt: number;
  onDraft: (values: FormValues) => void;
  status: Status;
  setStatus: (status: Status) => void;
}) {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ defaultValues, shouldFocusError: true });

  const lastValuesRef = useRef<FormValues>(null);

  // UTM campaign values captured by UtmCapture on landing (stored in sessionStorage).
  const [utm, setUtm] = useState<UtmParams>({});
  useEffect(() => {
    setUtm(getStoredUtm());
  }, []);

  // Keep a draft in the parent so switching enquiry cards never loses input.
  useEffect(() => {
    const subscription = watch((values) => onDraft(values as FormValues));
    return () => subscription.unsubscribe();
  }, [watch, onDraft]);

  const runSubmit = async (values: FormValues) => {
    lastValuesRef.current = values;
    setStatus({ kind: "idle" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, enquiryType, startedAt, ...utm }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
        errors?: Record<string, string>;
      };

      if (response.status === 429) {
        setStatus({ kind: "error", message: data.message || "Too many requests. Please try again in a few minutes." });
        return;
      }

      if (!response.ok || !data.ok) {
        if (data.errors) {
          const fields = Object.entries(data.errors);
          fields.forEach(([field, message]) => setError(field as keyof FormValues, { type: "server", message }));
          if (fields[0]) document.getElementById(fields[0][0])?.focus();
        }
        setStatus({ kind: "error", message: data.message || "Something went wrong. Please try again." });
        return;
      }

      setStatus({ kind: "success", message: data.message });
    } catch {
      setStatus({ kind: "error", message: "Something went wrong. Please check your connection and try again." });
    }
  };

  const submit = handleSubmit(runSubmit);

  const retrySubmit = () => {
    if (lastValuesRef.current) runSubmit(lastValuesRef.current);
  };

  const copy = FORM_COPY[enquiryType];

  return (
    <div>
      <h2 className="display text-3xl text-[var(--text-dark)] sm:text-4xl">{copy.title}</h2>
      <p className="mt-3 text-sm leading-6" style={{ color: "var(--text-muted)" }}>{copy.subtitle}</p>

      <form noValidate onSubmit={submit} className="mt-7">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="name" required>Full Name</FieldLabel>
            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              aria-required="true"
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={inputClass(!!errors.name)}
              {...register("name", { validate: validateName })}
            />
            {errors.name && <FieldError id="name" message={errors.name.message as string} />}
          </div>

          <div>
            <FieldLabel htmlFor="email" required>Business Email</FieldLabel>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              aria-required="true"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={inputClass(!!errors.email)}
              {...register("email", { validate: validateEmail })}
            />
            {errors.email && <FieldError id="email" message={errors.email.message as string} />}
          </div>

          <div>
            <FieldLabel htmlFor="phone">Phone (optional)</FieldLabel>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+94 XX XXXXXXX"
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={inputClass(!!errors.phone)}
              {...register("phone", { validate: validatePhone })}
            />
            {errors.phone && <FieldError id="phone" message={errors.phone.message as string} />}
          </div>

          <div>
            <FieldLabel htmlFor="company">Company / Organization</FieldLabel>
            <input
              id="company"
              type="text"
              autoComplete="organization"
              placeholder="Company name"
              aria-invalid={errors.company ? true : undefined}
              aria-describedby={errors.company ? "company-error" : undefined}
              className={inputClass(!!errors.company)}
              {...register("company", { validate: validateCompany })}
            />
            {errors.company && <FieldError id="company" message={errors.company.message as string} />}
          </div>

          <div className="sm:col-span-2">
            <FieldLabel htmlFor="area" required>Primary Area of Interest</FieldLabel>
            <div className="relative">
              <select
                id="area"
                aria-required="true"
                aria-invalid={errors.area ? true : undefined}
                aria-describedby={errors.area ? "area-error" : undefined}
                className={`${inputClass(!!errors.area)} appearance-none pr-10`}
                {...register("area", { validate: validateArea })}
              >
                <option value="">Select an area</option>
                {AREAS_OF_INTEREST.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
            </div>
            {errors.area && <FieldError id="area" message={errors.area.message as string} />}
          </div>

          <div className="sm:col-span-2">
            <FieldLabel htmlFor="message" required>Project Description / Message</FieldLabel>
            <textarea
              id="message"
              rows={5}
              placeholder="Please describe your project or requirement"
              aria-required="true"
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={`${inputClass(!!errors.message)} resize-y`}
              {...register("message", { validate: validateMessage })}
            />
            {errors.message && <FieldError id="message" message={errors.message.message as string} />}
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div>
            <label className="flex cursor-pointer items-start gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
              <input
                id="consent"
                type="checkbox"
                aria-required="true"
                aria-invalid={errors.consent ? true : undefined}
                aria-describedby={errors.consent ? "consent-error" : undefined}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent-cyan)]"
                {...register("consent", { validate: validateConsent })}
              />
              <span>
                I agree to be contacted about my enquiry.{" "}
                {contactConfig.privacyPolicyUrl ? (
                  <a className="focus-ring text-[var(--accent-cyan)] underline underline-offset-2 hover:text-[var(--text-dark)]" href={contactConfig.privacyPolicyUrl}>
                    Privacy Policy
                  </a>
                ) : (
                  <span style={{ color: "var(--text-muted)" }}>Privacy Policy</span>
                )}
              </span>
            </label>
            {errors.consent && <FieldError id="consent" message={errors.consent.message as string} />}
          </div>

          <label className="flex cursor-pointer items-start gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
            <input type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent-cyan)]" {...register("marketing")} />
            <span>Send me updates and news. (optional)</span>
          </label>
        </div>

        {/* Honeypot — hidden from real users, tempting for bots */}
        <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="website">Leave this field empty</label>
          <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </div>

        {/* UTM tracking (first-party, sessionStorage — values already validated by UtmCapture) */}
        <input type="hidden" name="utm_source" value={utm.utm_source ?? ""} readOnly />
        <input type="hidden" name="utm_medium" value={utm.utm_medium ?? ""} readOnly />
        <input type="hidden" name="utm_campaign" value={utm.utm_campaign ?? ""} readOnly />
        <input type="hidden" name="utm_term" value={utm.utm_term ?? ""} readOnly />
        <input type="hidden" name="utm_content" value={utm.utm_content ?? ""} readOnly />

        {status.kind === "error" && status.message && (
          <div className="mt-5 rounded-xl border border-[var(--error)]/40 bg-[var(--error-bg)] px-4 py-3 text-sm" style={{ color: "var(--error)" }}>
            <p role="alert">{status.message}</p>
            <button
              type="button"
              onClick={retrySubmit}
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-[var(--error)]/40 bg-white px-4 py-1.5 text-sm text-[var(--error)] transition hover:bg-[var(--error-bg)] focus-ring"
              aria-label="Retry sending"
            >
              Try again
            </button>
          </div>
        )}

        <button type="submit" disabled={isSubmitting} className="fill-btn focus-ring mt-6 w-full justify-center disabled:pointer-events-none disabled:opacity-70">
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              Send enquiry <ArrowUpRight size={16} aria-hidden="true" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section wrapper: cards + form card + success state                  */
/* ------------------------------------------------------------------ */
export default function EnquirySection() {
  const [type, setType] = useState<EnquiryType>("quotation");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const draftRef = useRef<FormValues>(EMPTY_VALUES);
  const startedAtRef = useRef<number>(Date.now());
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  const onDraft = useCallback((values: FormValues) => {
    draftRef.current = values;
  }, []);

  useEffect(() => {
    if (status.kind === "success") {
      successHeadingRef.current?.focus();
    }
  }, [status.kind]);

  const selectCard = (next: EnquiryType) => {
    if (next === type) return;
    setType(next);
    setStatus({ kind: "idle" });
  };

  const sendAnother = () => {
    draftRef.current = EMPTY_VALUES;
    startedAtRef.current = Date.now();
    setStatus({ kind: "idle" });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      {/* LEFT: enquiry type cards */}
      <div>
        <div className="eyebrow mb-4">What can we help with?</div>
        <div className="flex flex-col gap-4" role="group" aria-label="Type of enquiry">
          {CARDS.map((card) => {
            const active = card.id === type;
            return (
              <button
                key={card.id}
                type="button"
                aria-pressed={active}
                onClick={() => selectCard(card.id)}
                className={`focus-ring rounded-2xl border p-5 text-left transition ${
                  active
                    ? "border-[var(--mid-blue)] bg-[var(--light-tint)]"
                    : "border-[var(--border-light)] bg-[var(--light-tint)] hover:border-[var(--mid-blue)]"
                }`}
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="text-base font-medium text-[var(--text-dark)]">{card.title}</span>
                  {active && (
                    <span aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--mid-blue)]">
                      <ArrowRight className="hidden lg:block" size={18} />
                      <ArrowDown className="lg:hidden" size={18} />
                    </span>
                  )}
                </span>
                <span className="mt-2 block text-sm leading-6" style={{ color: "var(--text-muted)" }}>{card.blurb}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* RIGHT: form card (content swaps with a smooth transition) */}
      <div className="relative rounded-[24px] border border-[var(--border-light)] bg-[var(--light-tint)] p-6 sm:p-8">
        <AnimatePresence mode="wait" initial={false}>
          {status.kind === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex min-h-[420px] flex-col items-start justify-center"
            >
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--mid-blue)] text-[var(--mid-blue)]">
                <Check size={22} aria-hidden="true" />
              </span>
              <h2
                ref={successHeadingRef}
                tabIndex={-1}
                role="status"
                aria-live="polite"
                className="display text-3xl text-[var(--text-dark)]"
              >
                {status.message || "Thank you! We'll get back to you soon."}
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-6" style={{ color: "var(--text-muted)" }}>
                Your enquiry has reached the right team. We usually reply within one business day.
              </p>
              <button type="button" onClick={sendAnother} className="fill-btn focus-ring mt-7">
                Send another enquiry <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={type}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <FormBody
                enquiryType={type}
                defaultValues={draftRef.current}
                startedAt={startedAtRef.current}
                onDraft={onDraft}
                status={status}
                setStatus={setStatus}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}