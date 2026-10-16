"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/data";

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      setVisible(y > 300);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    "Hi Vallunar, I'd like to enquire about your services."
  )}`;

  if (!visible) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="wa-float focus-ring"
    >
      <svg
        viewBox="0 0 24 24"
        width="26"
        height="26"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M20.52 3.48A11.984 11.984 0 0 0 12 0C5.373 0 0 5.373 0 12c0 1.916.52 3.718 1.44 5.278L0 24l5.77-1.52a12.05 12.05 0 0 0 5.222 1.38c6.627 0 12-5.373 12-12 0-1.9-.5-3.69-1.38-5.222L24 3.48 20.52 0zM12 21.6c-3.08 0-6.056-1.352-8.01-3.538l-.618-3.034 3.13-.613c1.906-1.906 3.256-4.474 3.498-7.808.12-1.586-.78-3.06-2.07-3.86-2.26-1.4-5.46-1.3-7.65 0-1.51.98-2.64 2.67-2.43 3.97.18 1.1.84 2.2 1.72 2.98.86.76 1.6 1.06 2.76 1.06 2.12 0 4.18-.93 5.6-2.72 1.1-1.43 1.54-3.38.95-5.2-.76-2.35-3.1-4.2-5.68-4.2-2.62 0-5.14 1.1-6.9 2.98A12.02 12.02 0 0 0 2.4 12c0 5.87 4.4 10.8 9.6 10.8 2.26 0 4.3-.62 6.04-1.72.2-.13.43-.2.62-.2.07 0 .33.14.33.35 0 3.12-2.36 5.98-5.97 5.98z" />
      </svg>
    </a>
  );
}