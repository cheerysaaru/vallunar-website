/**
 * First-party UTM campaign tracking (no cookies, no third-party scripts).
 *
 * On landing, utm_source / utm_medium / utm_campaign / utm_term / utm_content
 * are read from the URL, validated against a strict allow-list regex, and kept
 * in sessionStorage for the duration of the tab session. They are then sent as
 * hidden fields with the contact form and added to the email body.
 *
 * Values are never written to localStorage and never leave the site except via
 * the contact form submission.
 */

export const UTM_SESSION_KEY = "vallunar_utm";

/** Strict client-side allow-list for UTM values. */
export const UTM_VALUE_RE = /^[A-Za-z0-9_.\- +]{1,100}$/;

export type UtmParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};

const UTM_KEYS: (keyof UtmParams)[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
];

/** Parse and validate UTM params from a URL search string. Invalid values are dropped. */
export function parseUtmFromSearch(search: string): UtmParams {
  const params = new URLSearchParams(search);
  const result: UtmParams = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value && UTM_VALUE_RE.test(value)) {
      result[key] = value;
    }
  }
  return result;
}

/** Read previously stored UTMs from sessionStorage. */
export function getStoredUtm(): UtmParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(UTM_SESSION_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as UtmParams;
      // Re-validate on read in case storage was tampered with.
      const clean: UtmParams = {};
      for (const key of UTM_KEYS) {
        const value = parsed[key];
        if (typeof value === "string" && UTM_VALUE_RE.test(value)) {
          clean[key] = value;
        }
      }
      return clean;
    }
  } catch {
    // storage unavailable or malformed
  }
  return {};
}

/** Persist UTMs to sessionStorage. */
export function saveUtm(utm: UtmParams) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(UTM_SESSION_KEY, JSON.stringify(utm));
  } catch {
    // storage unavailable
  }
}
