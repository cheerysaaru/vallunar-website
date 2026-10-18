/**
 * Per-page last-updated dates (ISO 8601 strings).
 *
 * Update these values whenever a page's content is substantively changed.
 * Pages not listed use the DEFAULT_ISO fallback.
 */

export const DEFAULT_ISO = "2026-10-01";

export const LAST_UPDATED: Record<string, string> = {
  "/privacy": "2026-10-01",
  "/terms": "2026-10-01",
};

export function getLastUpdated(path: string): string {
  return LAST_UPDATED[path] ?? DEFAULT_ISO;
}

/** Format an ISO string for display: "1 October 2026". */
export function formatLastUpdated(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(new Date(iso));
}
