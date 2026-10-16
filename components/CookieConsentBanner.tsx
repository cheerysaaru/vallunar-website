"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const COOKIE_CONSENT_STORAGE_KEY = "vallunar-cookie-consent";
const COOKIE_DECIDED_STORAGE_KEY = "vallunar-cookie-decided";

type CookieCategory = "essential" | "analytics" | "marketing" | "preferences";

interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

const DEFAULT_CONSENT: CookieConsent = {
  essential: true,
  analytics: false,
  marketing: false,
  preferences: false,
};

function getConsentFromStorage(): CookieConsent {
  if (typeof window === "undefined") return DEFAULT_CONSENT;
  try {
    const stored = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...parsed, essential: true };
    }
  } catch {
    // ignore
  }
  return DEFAULT_CONSENT;
}

function saveConsentToStorage(consent: CookieConsent) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // ignore
  }
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent>(() => {
    const stored = getConsentFromStorage();
    // essential is always true, override from storage (spread first, then override)
    return {
      ...stored,
      essential: true,
    };
  });

  useEffect(() => {
    saveConsentToStorage(consent);
  }, [consent]);

  const grantConsent = (categories?: Partial<CookieConsent>) => {
    setConsent((prev) => ({
      ...prev,
      ...categories,
      essential: true,
    }));
  };

  const revokeConsent = (categories?: Partial<CookieConsent>) => {
    setConsent((prev) => ({
      ...prev,
      ...categories,
      essential: true,
    }));
  };

  return { consent, grantConsent, revokeConsent };
}

function getDecidedFromStorage(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(COOKIE_DECIDED_STORAGE_KEY) === "1";
  } catch {
    // ignore
  }
  return false;
}

export function CookieConsentBanner() {
  const { consent, grantConsent, revokeConsent } = useCookieConsent();
  const [visible, setVisible] = useState(false);
  const [decided, setDecided] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    if (getDecidedFromStorage()) {
      setDecided(true);
      return;
    }
    const timer = window.setTimeout(() => setVisible(true), 15000);
    return () => window.clearTimeout(timer);
  }, []);

  const decide = () => {
    setDecided(true);
    setVisible(false);
    setShowOptions(false);
    try {
      localStorage.setItem(COOKIE_DECIDED_STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  };

  if (decided || !visible) return null;

  const acceptAll = () => {
    grantConsent({ analytics: true, marketing: true, preferences: true });
    decide();
  };

  const rejectNonEssential = () => {
    revokeConsent({ analytics: false, marketing: false, preferences: false });
    decide();
  };

  return (
    <div
      className="consent-banner fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-1/2 z-50 w-[min(620px,calc(100vw-24px))] -translate-x-1/2 rounded-[28px] border border-[var(--border-light)] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(0,43,82,.25)] backdrop-blur-xl sm:bottom-5 sm:w-[min(620px,calc(100vw-32px))] sm:px-6 md:border-white/60 md:bg-white/80"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <svg
            className="h-5 w-5 shrink-0" style={{ color: "var(--text-muted)" }}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M13 2.3c1.6 0 3.1.7 4.2 1.8.8.8.8 2.1 0 2.9a7.0 7.0 0 0 1-1.5 3.8 5.5 5.5 0 0 0-4.6 2.7 5.5 5.5 0 0 0-2.7-4.6 7.0 7.0 0 0 1-1.8-3.8 8.3 8.3 0 0 0-5 3.7 5.2 5.2 0 0 1-1.5-4.6 5.5 5.5 0 0 0 2.6 4.1 7.2 7.2 0 0 1-3.5 1.8 5.5 5.5 0 0 0 4.6 2.7 5.5 5.5 0 0 0 2.6-4.1 5.2 5.2 0 0 1 1.5-4.5 8.3 8.3 0 0 0 3.6 1.3c.6 0 1.2.1 1.7.2.7.1 1.3.08 1.8-.1.5-.2 1.1-.3 1.5-.5a9.2 9.2 0 0 1 .9-3.5 4.2 4.2 0 0 0-2.2-2.8 4.2 4.2 0 0 0-3.4 1.1 8.5 8.5 0 0 1-3.5-.5 4.5 4.5 0 0 1-1.9-2.5 5.5 5.5 0 0 0 2.4-4.2 5.5 5.5 0 0 0-.9-3.6 4.5 4.5 0 0 1 2.5-3.3 8.3 8.3 0 0 0 4.7-1.6 3.3 3.3 0 0 1 .7-.8c.2-.1.3-.2.4-.2.4 0 .7.1 1.1.2.4.1.8.2.9.1.1 0 .2.1.3.1.1 0 .2-.1.3-.1.1-.2.08-.4.1-.6.1-.3.1-.5.1-.7.1-.2 0-.4-.08-.5-.1a11.4 11.4 0 0 1-.6-1.8 5.3 5.3 0 0 0-3.9-1.8 5.3 5.3 0 0 0-2.9 1.9 5.3 5.3 0 0 0-1.8 4.1 5.3 5.3 0 0 0 1.8 4.3 5.3 5.3 0 0 0 3.9 1.8zM12 15.5c-1.4 0-2.8-.2-4.2-.6-.8-.3-1.4-1-1.8-2h2.3c.1.6.1 1.2.1 1.8 0 1.5.7 2.9 1.8 4.2.8.7 1.6 1.3 3.2 1.8 4.8.8 1.3 1.9 2.1 3.3 2.6.8.3 1.5.5 2.2.6.6.1 1.3.1 1.9.1.6 0 1.1-.1 1.5-.2.4-.1.8-.2.9-.3.1-.1.2-.2.2-.3.05-.1.08-.2.08-.3 0-.2-.08-.3-.08-.3l0-3.5c0-.1.1-.2.2-.2.2 0 .3.08.4.1.1.1.2.2.2.3 0 .1-.1.2-.1.3l0 3.5c0 .1.08.2.2.2.1 0 .2-.1.2-.2l0-3.5z"
            />
          </svg>
          <span className="text-sm font-medium" style={{ color: "var(--text-dark)" }}>We use cookies to improve your experience</span>
        </div>
        <button
          onClick={acceptAll}
          className="-mr-1 -mt-1 p-1 transition hover:opacity-70"
          style={{ color: "var(--text-dark)" }}
          aria-label="Accept all and close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <button
        onClick={() => setShowOptions((v) => !v)}
        className="mt-2 text-xs underline underline-offset-2 transition hover:opacity-70"
        style={{ color: "var(--text-muted)" }}
        aria-label="Customize settings"
        aria-expanded={showOptions}
      >
        {showOptions ? "Hide options" : "Customize"}
      </button>

      {showOptions && (
        <div className="mt-2 text-xs" style={{ color: "var(--text-muted)" }}>
          {(["analytics", "marketing", "preferences"] as const).map((key) => {
            const isChecked = consent[key];
            return (
              <label key={key} className="mt-2 flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => grantConsent({ essential: true, [key]: !isChecked })}
                  className="h-3 w-3 accent-[var(--accent-cyan)] rounded"
                />
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {key}: {isChecked ? "Enabled" : "Disabled"}
                </span>
              </label>
            );
          })}
          <button
            onClick={decide}
            className="mt-3 rounded-full border border-[var(--border-light)] px-4 py-1.5 text-xs transition hover:bg-[var(--light-tint)]"
            style={{ color: "var(--text-muted)" }}
          >
            Save preferences
          </button>
        </div>
      )}

      <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:gap-3">
        <button
          onClick={rejectNonEssential}
          className="flex-1 rounded-full border border-[var(--border-light)] px-4 py-2.5 text-sm transition hover:bg-[var(--light-tint)] sm:py-2" style={{ color: "var(--text-dark)" }}
          aria-label="Reject non-essential cookies"
        >
          Reject non-essential
        </button>
        <button
          onClick={acceptAll}
          className="flex-1 rounded-full bg-[var(--mid-blue)] px-4 py-2.5 text-sm text-white transition hover:bg-[var(--mid-blue-hover)] sm:py-2"
          aria-label="Accept all cookies"
        >
          Accept all
        </button>
      </div>
    </div>
  );
}