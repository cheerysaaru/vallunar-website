/**
 * Shared validation + sanitisation for the /contact form.
 * Used by BOTH the client form and the /api/contact route so error
 * messages and rules stay identical. Zero dependencies.
 */

export const ENQUIRY_TYPES = [
  "quotation",
  "software_development",
  "partnership",
  "marketing",
  "general",
] as const;
export type EnquiryType = (typeof ENQUIRY_TYPES)[number];

export const AREAS_OF_INTEREST = [
  "Custom Software Development",
  "Website Development",
  "Mobile Application Development",
  "UI/UX Design",
  "IT Consultancy",
  "E-commerce Solutions",
  "Business Automation & Integrations",
  "AI Solutions & Automation",
  "Other Enquiries",
] as const;

export const LIMITS = {
  name: 100,
  email: 200,
  phone: 30,
  company: 120,
  message: 3000,
  messageMin: 10,
} as const;

export type ContactInput = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  area?: unknown;
  message?: unknown;
  consent?: unknown;
  marketing?: unknown;
  enquiryType?: unknown;
  website?: unknown;
};

export type FieldErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_ALLOWED_RE = /^[+()\-\s.\d]+$/;

/** Trim, strip control characters and cap length. */
export function sanitize(value: unknown, max: number): string {
  return String(value ?? "")
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);
}

export function isEnquiryType(value: unknown): value is EnquiryType {
  return typeof value === "string" && (ENQUIRY_TYPES as readonly string[]).includes(value);
}

export function isAreaOfInterest(value: unknown): boolean {
  return typeof value === "string" && (AREAS_OF_INTEREST as readonly string[]).includes(value);
}

/* ---------- individual field validators (return true or an error message) ---------- */

export function validateName(value: unknown): true | string {
  const s = sanitize(value, LIMITS.name);
  if (!s) return "Please enter your name.";
  if (s.length < 2) return "Please enter a valid name.";
  return true;
}

export function validateEmail(value: unknown): true | string {
  const s = sanitize(value, LIMITS.email);
  if (!s) return "Please enter your business email.";
  if (!EMAIL_RE.test(s)) return "Please enter a valid email address.";
  return true;
}

export function validatePhone(value: unknown): true | string {
  const s = sanitize(value, LIMITS.phone);
  if (!s) return true; // optional
  if (!PHONE_ALLOWED_RE.test(s)) return "Please enter a valid phone number.";
  const digits = s.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) return "Please enter a valid phone number (7–15 digits).";
  return true;
}

export function validateCompany(value: unknown): true | string {
  const s = sanitize(value, LIMITS.company);
  if (s.length > LIMITS.company) return `Company must be ${LIMITS.company} characters or fewer.`;
  return true;
}

export function validateArea(value: unknown): true | string {
  if (!isAreaOfInterest(value)) return "Please select an area of interest.";
  return true;
}

export function validateMessage(value: unknown): true | string {
  const s = sanitize(value, LIMITS.message);
  if (!s) return "Please describe your project or requirement.";
  if (s.length < LIMITS.messageMin) return `Please add a little more detail (at least ${LIMITS.messageMin} characters).`;
  return true;
}

export function validateConsent(value: unknown): true | string {
  if (value !== true) return "Please agree to be contacted about your enquiry.";
  return true;
}

/** Full server-side validation. Returns a map of field -> message. */
export function validateContact(input: ContactInput): FieldErrors {
  const errors: FieldErrors = {};
  const check = (field: keyof FieldErrors, result: true | string) => {
    if (result !== true) errors[field] = result;
  };

  check("name", validateName(input.name));
  check("email", validateEmail(input.email));
  check("phone", validatePhone(input.phone));
  check("company", validateCompany(input.company));
  check("area", validateArea(input.area));
  check("message", validateMessage(input.message));
  check("consent", validateConsent(input.consent));
  if (!isEnquiryType(input.enquiryType)) errors.enquiryType = "Invalid enquiry type.";

  return errors;
}
