"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps {
  /** Text to copy to the clipboard. */
  text: string;
  /** Accessible label announced to screen readers, e.g. "Copy email". */
  label: string;
  className?: string;
}

/**
 * Small icon button that copies `text` to the clipboard.
 * Uses navigator.clipboard.writeText with a hidden-textarea + execCommand
 * fallback. Shows "Copied" for 1.8s and announces via an aria-live region.
 */
export default function CopyButton({ text, label, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [announce, setAnnounce] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = () => {
    setCopied(false);
    setAnnounce("");
  };

  const copy = async () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    let success = false;
    try {
      await navigator.clipboard.writeText(text);
      success = true;
    } catch {
      // Fallback for browsers without the Clipboard API.
      try {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.readOnly = true;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        success = document.execCommand("copy");
        document.body.removeChild(textarea);
      } catch {
        success = false;
      }
    }

    if (success) {
      setCopied(true);
      setAnnounce("Copied");
      timerRef.current = setTimeout(clear, 1800);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label={label}
        title={copied ? "Copied" : label}
        disabled={copied}
        className={`
          focus-ring inline-flex shrink-0 items-center justify-center rounded-md p-1.5
          border border-transparent bg-transparent text-[var(--text-muted)]
          hover:bg-[var(--light-tint)] hover:text-[var(--text-dark)] transition
          ${className ?? ""}
        `}
      >
        {copied ? (
          <Check size={14} aria-hidden="true" />
        ) : (
          <Copy size={14} aria-hidden="true" />
        )}
      </button>
      <span className="sr-only" aria-live="polite">
        {announce}
      </span>
    </>
  );
}
