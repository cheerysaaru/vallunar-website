"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { navigation, site } from "@/lib/data";
import ContactTrigger from "./ContactTrigger";

export default function Navbar() {
  const [scrolledDown, setScrolledDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const goingDown = currentScrollY > lastScrollY && currentScrollY > 100;
      const goingUp = currentScrollY < lastScrollY;

      if (goingDown && !scrolledDown) setScrolledDown(true);
      if (goingUp && scrolledDown) setScrolledDown(false);

      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY, scrolledDown]);

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
      if (mobileOpen && panelRef.current && !panelRef.current.contains(e.target as Node) && navRef.current && !navRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileOpen]);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <>
      <nav
        ref={navRef}
        className={`nav-pill ${loaded ? "" : "hidden-down"} ${scrolledDown ? "hidden-down" : "visible-up"}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <a href="#top" className="nav-logo focus-ring" aria-label={`${site.name} home`}>
          <Image src="/brand-mark.svg" alt="" width={10} height={28} priority />
          <span>VALLUNAR</span>
        </a>

        <div className="nav-links" role="menubar">
          {navigation.map((item) => (
            <a
              key={item.href}
              className="nav-link focus-ring"
              href={item.href}
              role="menuitem"
              onClick={closeMobileMenu}
            >
              {item.label}
            </a>
          ))}
        </div>

        <ContactTrigger className="fill-btn nav-contact focus-ring" aria-label="Contact us">
          Contact Us
        </ContactTrigger>

        <button
          className="menu-toggle"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu-panel"
        >
          <div className="menu-dots" aria-hidden="true">
            <span className="menu-dot" />
            <span className="menu-dot" />
            <span className="menu-dot" />
          </div>
          <div className="menu-cross" aria-hidden="true">
            <span className="menu-cross-bar" />
            <span className="menu-cross-bar" />
          </div>
        </button>
      </nav>

      <div
        ref={panelRef}
        id="mobile-menu-panel"
        className={`mobile-menu-panel ${mobileOpen ? "open" : ""}`}
        role="menu"
        aria-label="Mobile navigation"
        hidden={!mobileOpen}
      >
        {navigation.map((item) => (
          <a
            key={item.href}
            className="mobile-menu-link focus-ring"
            href={item.href}
            role="menuitem"
            onClick={closeMobileMenu}
          >
            {item.label}
          </a>
        ))}
      </div>
    </>
  );
}