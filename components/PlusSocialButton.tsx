"use client";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/data";

export default function PlusSocialButton() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
        if (entry.isIntersecting) setOpen(false);
      },
      { rootMargin: "-10% 0px -90% 0px", threshold: 0 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (open && containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const socialLinks = [
    { href: site.linkedIn, label: "LinkedIn", icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    )},
    { href: "https://instagram.com/vallunar", label: "Instagram", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
    )},
    { href: "https://facebook.com/vallunar", label: "Facebook", icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    )},
    { href: `https://wa.me/${site.whatsapp}`, label: "WhatsApp", icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.984 11.984 0 0 0 12 0C5.373 0 0 5.373 0 12c0 1.916.52 3.718 1.44 5.278L0 24l5.77-1.52a12.05 12.05 0 0 0 5.222 1.38c6.627 0 12-5.373 12-12 0-1.9-.5-3.69-1.38-5.222L24 3.48 20.52 0zM12 21.6c-3.08 0-6.056-1.352-8.01-3.538l-.618-3.034 3.13-.613c1.906-1.906 3.256-4.474 3.498-7.808.12-1.586-.78-3.06-2.07-3.86-2.26-1.4-5.46-1.3-7.65 0-1.51.98-2.64 2.67-2.43 3.97.18 1.1.84 2.2 1.72 2.98.86.76 1.6 1.06 2.76 1.06 2.12 0 4.18-.93 5.6-2.72 1.1-1.43 1.54-3.38.95-5.2-.76-2.35-3.1-4.2-5.68-4.2-2.62 0-5.14 1.1-6.9 2.98A12.02 12.02 0 0 0 2.4 12c0 5.87 4.4 10.8 9.6 10.8 2.26 0 4.3-.62 6.04-1.72.2-.13.43-.2.62-.2.07 0 .33.14.33.35 0 3.12-2.36 5.98-5.97 5.98z"/></svg>
    )},
  ];

  return (
    <div
      ref={containerRef}
      className={`plus-social ${visible ? "visible" : ""}`}
      role="menu"
      aria-label="Social links"
    >
      <div className="social-icons" role="none">
        {socialLinks.map((social, index) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link focus-ring"
            role="menuitem"
            aria-label={social.label}
            style={{ transitionDelay: `${index * 0.05}s` }}
            tabIndex={open ? 0 : -1}
            aria-hidden={!open}
            inert={!open}
          >
            {social.icon}
          </a>
        ))}
      </div>
      <button
        className="plus-btn focus-ring"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close social links" : "Open social links"}
        aria-expanded={open}
        aria-controls="social-icons"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  );
}