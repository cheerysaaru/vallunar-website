"use client";

export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link"
      onClick={(e: React.MouseEvent) => {
        e.preventDefault();
        const target = document.getElementById("main-content");
        if (!target) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target.focus();
        target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      }}
    >
      Skip to content
    </a>
  );
}
