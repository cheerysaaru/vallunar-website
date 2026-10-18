"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { site } from "@/lib/data";

const navLinks = [
  { key: "services", label: "Services", href: "/services" },
  { key: "products", label: "Products", href: "/products" },
  { key: "how-we-work", label: "How we work", href: "/how-we-work" },
  { key: "case-studies", label: "Case Studies", href: "/case-studies" },
];

/* Key → href (used to find the desktop element for each key) */
const KEY_HREF: Record<string, string> = {
  services: "/services",
  products: "/products",
  "how-we-work": "/how-we-work",
  "case-studies": "/case-studies",
  contact: "/contact",
};

/* Scroll-sections on the home page, in visual order. No section → "contact". */
const SECTION_ORDER = ["services", "products", "how-we-work", "case-studies"];

export default function Navbar({ overlay = true }: { overlay?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeKey, setActiveKey] = useState("contact");
  const [hoverKey, setHoverKey] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLButtonElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const blobRef = useRef<HTMLSpanElement>(null);
  const lastY = useRef(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const band = window.innerHeight * 0.4;
      let current = "contact";
      for (const key of SECTION_ORDER) {
        const el = document.getElementById(key);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= band && rect.bottom > band) {
          current = key;
          break;
        }
      }
      setActiveKey((prev) => (prev === current ? prev : current));
    };
    const onScroll = () => {
      frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* Measure & move the pill (getBoundingClientRect vs the links container) */
  useLayoutEffect(() => {
    const apply = () => {
      const blob = blobRef.current;
      const links = linksRef.current;
      if (!blob || !links) return;
      if (window.innerWidth <= 820) {
        blob.classList.remove("ready");
        return;
      }
      const key = hoverKey ?? activeKey;
      const el =
        key === "contact"
          ? ctaRef.current
          : links.querySelector<HTMLElement>(`.notch-link[href="${KEY_HREF[key]}"]`);
      if (!el) {
        blob.classList.remove("ready");
        return;
      }
      const parentRect = links.getBoundingClientRect();
      const rect = el.getBoundingClientRect();
      blob.style.transform = `translate(${rect.left - parentRect.left}px, ${rect.top - parentRect.top}px)`;
      blob.style.width = `${rect.width}px`;
      blob.style.height = `${rect.height}px`;
      blob.classList.add("ready");
    };
    apply();
    window.addEventListener("resize", apply);
    if (document.fonts?.ready) document.fonts.ready.then(apply);
    return () => window.removeEventListener("resize", apply);
  }, [activeKey, hoverKey, scrolled]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        mobileOpen &&
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        navRef.current &&
        !navRef.current.contains(e.target as Node)
      ) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileOpen]);

  const pathname = usePathname();
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const panel = panelRef.current;
    if (!panel) return;

    const focusable = panel.querySelectorAll<HTMLElement>(
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const active = document.activeElement;
      if (e.shiftKey) {
        if (active === first || !panel.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last || !panel.contains(active)) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    panel.addEventListener("keydown", onKeyDown);
    return () => {
      panel.removeEventListener("keydown", onKeyDown);
      dotsRef.current?.focus();
    };
  }, [mobileOpen]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 10);
      setHidden(y > 140 && y > lastY.current);
      lastY.current = y;
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const closeMobileMenu = () => setMobileOpen(false);
  const solid = !overlay;

  const handleDotsClick = () => {
    setMobileOpen((v) => !v);
  };

  const targetKey = hoverKey ?? activeKey;

  return (
    <>
      <nav
        ref={navRef}
        className={`notch-nav${solid ? " solid" : ""}${scrolled ? " scrolled" : ""}${hidden && !mobileOpen ? " nav-hidden" : ""}`}
        role="navigation"
        aria-label="Main navigation"
        onMouseLeave={() => setHoverKey(null)}
      >
        <Link
          href="/"
          className="notch-logo"
          aria-label={`${site.name} home`}
        >
          <span className="logo-text">Vallunar</span>
        </Link>

        {/* Sliding highlight — sits at z-index 0 inside the links container */}
        <div ref={linksRef} className="notch-links">
          <span ref={blobRef} className="blob" aria-hidden="true" />
          {navLinks.map((item) => (
            <a
              key={item.key}
              className={`notch-link${targetKey === item.key ? " is-active" : ""}`}
              href={item.href}
              onMouseEnter={() => setHoverKey(item.key)}
              onFocus={() => setHoverKey(item.key)}
            >
              {item.label}
            </a>
          ))}
        </div>

        <Link
          ref={ctaRef}
          href="/contact"
          className={`notch-cta${targetKey === "contact" ? " is-active" : ""}`}
          aria-label="Contact us"
          onMouseEnter={() => setHoverKey("contact")}
          onFocus={() => setHoverKey("contact")}
        >
          <span>Contact</span>
        </Link>

        <button
          ref={dotsRef}
          className={`dots${mobileOpen ? " open" : ""}`}
          onClick={handleDotsClick}
          aria-label="Menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu-panel"
        >
          <i aria-hidden="true" />
          <i aria-hidden="true" />
          <i aria-hidden="true" />
          <b aria-hidden="true" />
          <b aria-hidden="true" />
        </button>
      </nav>

      <div
        ref={panelRef}
        id="mobile-menu-panel"
        className={`notch-mobile-panel ${mobileOpen ? "open" : ""}`}
        aria-label="Mobile navigation"
      >
        {navLinks.map((item) => (
          <a
            key={item.key}
            className="notch-mobile-link"
            href={item.href}
            onClick={closeMobileMenu}
          >
            {item.label}
          </a>
        ))}
        <Link
          href="/contact"
          className="notch-mobile-cta"
          onClick={closeMobileMenu}
        >
          <Mail size={14} aria-hidden="true" />
          <span>Contact Us</span>
        </Link>
      </div>
    </>
  );
}
