"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { usePathname, useRouter } from "next/navigation";

/* Destination pathname → curtain label */
const PATH_LABELS: Record<string, string> = {
  "/": "Home",
  "/about": "About",
  "/case-studies": "Case Studies",
  "/contact": "Contact",
  "/how-we-work": "How we work",
  "/privacy": "Privacy",
  "/products": "Products",
  "/services": "Services",
  "/terms": "Terms",
};

const labelFor = (pathname: string) =>
  PATH_LABELS[pathname] ??
  pathname.split("/").filter(Boolean).pop()?.replace(/-/g, " ") ??
  "Home";

/* Lock scroll without the page shifting sideways (scrollbar compensation) */
const lockScroll = () => {
  const sbw = window.innerWidth - document.documentElement.clientWidth;
  if (sbw > 0) document.body.style.paddingRight = `${sbw}px`;
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
};
const unlockScroll = () => {
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
};

/* Curtain transition: 5 navy panels drop over the page, then slide away
   on the destination. Integrated with the Next.js App Router. */
export default function PageTransition() {
  const curtainRef = useRef<HTMLDivElement>(null);
  const busyRef = useRef(false); // true while a transition is running
  const hashRef = useRef(""); // destination hash (skip scrollTo(0,0) if set)
  const router = useRouter();
  const pathname = usePathname();

  /* --- On internal link click: cover the page, then navigate ---
     CAPTURE phase so we run BEFORE next/link: Link checks e.defaultPrevented
     and bails, which means every <Link> gets the curtain too. We do not stop
     propagation, so React onClick handlers (e.g. close mobile menu) still run. */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // Ignore extra clicks mid-transition, modified clicks, non-primary button
      if (busyRef.current || e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement | null)?.closest?.(
        "a[href]"
      ) as HTMLAnchorElement | null;
      if (!anchor || anchor.hasAttribute("download")) return;
      if (anchor.target && anchor.target !== "_self") return; // e.g. target="_blank"
      if (anchor.getAttribute("rel")?.includes("external")) return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return; // external link

      // Same page: block full reloads on plain links; let hash links jump normally
      if (url.pathname === window.location.pathname && !url.search) {
        if (!url.hash) e.preventDefault();
        return;
      }

      // Reduced motion: no curtain — browser/Link navigates normally
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Stop <Link> (and the plain anchor) from navigating instantly
      e.preventDefault();

      const next = url.pathname + url.search + url.hash;
      const curtain = curtainRef.current;
      if (!curtain) {
        router.push(next); // failsafe: navigate without animation
        return;
      }

      busyRef.current = true;
      hashRef.current = url.hash;
      // Destination label on the curtain
      const label = curtain.querySelector<HTMLElement>(".curtain-label");
      if (label) label.textContent = labelFor(url.pathname);
      // Lock scrolling while the curtain is up
      lockScroll();
      // Panels drop to cover the page (0.5s + 50ms stagger) + label fades in @0.45s
      curtain.classList.add("cover");

      // After 950ms the curtain has fully covered the page → load the new page
      window.setTimeout(() => router.push(next), 950);

      // Failsafe: if navigation never happened, unlock and reset
      window.setTimeout(() => {
        if (!busyRef.current || window.location.pathname === url.pathname) return;
        curtain.classList.remove("cover");
        curtain.classList.add("curtain-reset", "out");
        void curtain.offsetHeight;
        curtain.classList.remove("out", "curtain-reset");
        unlockScroll();
        busyRef.current = false;
      }, 4000);
    };

    // Capture phase: run before React/next/link handlers
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  /* --- On the new page: slide the curtain away + rise the hero content --- */
  useEffect(() => {
    const curtain = curtainRef.current;
    // Only run after a click-driven navigation (not back/forward or first load)
    if (!curtain || !busyRef.current) return;

    // Scroll to top for hash-less destinations (hash links keep the router's scroll)
    if (!hashRef.current) {
      unlockScroll();
      window.scrollTo(0, 0);
      lockScroll(); // re-lock until the reveal finishes (same tick → no flash)
    }
    hashRef.current = "";

    // Panels slide away downward (translateY 101%, 50ms stagger, 0.5s)
    curtain.classList.remove("cover");
    curtain.classList.add("out");

    // Compress the home hero's long entrance delays so they sync with the curtain
    document.documentElement.classList.add("curtain-nav");
    window.setTimeout(
      () => document.documentElement.classList.remove("curtain-nav"),
      3500
    );

    // Rise the new page's headline, paragraphs and buttons.
    // Skip elements that already have their own entrance animation (no conflicts).
    const scope =
      document.getElementById("main-content")?.querySelector("section") ??
      document.getElementById("main-content");
    const risen = scope
      ? Array.from(scope.querySelectorAll<HTMLElement>("h1, h2, p, button, a"))
          .filter((el) => getComputedStyle(el).animationName === "none")
          .slice(0, 10)
      : [];
    risen.forEach((el, i) => {
      el.classList.add("curtain-rise");
      el.style.transitionDelay = `${i * 0.08}s`; // 80ms stagger
    });
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        risen.forEach((el) => el.classList.add("curtain-rise-in"));
      })
    );

    // After the panels are gone: snap them to rest (no animation), unlock scroll
    window.setTimeout(() => {
      curtain.classList.add("curtain-reset");
      curtain.classList.remove("out");
      void curtain.offsetHeight; // force reflow → snap instantly
      curtain.classList.remove("curtain-reset");
      unlockScroll();
      busyRef.current = false;
    }, 850);

    // Clean up the temporary rise classes once the content animation has finished
    window.setTimeout(() => {
      risen.forEach((el) => {
        el.classList.remove("curtain-rise", "curtain-rise-in");
        el.style.transitionDelay = "";
      });
    }, 1900);
  }, [pathname]);

  /* Fixed overlay: five vertical panels + centered destination label.
     Resting state: panels sit above the screen. pointer-events:none. */
  return (
    <div className="curtain" ref={curtainRef} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="curtain-panel" style={{ "--i": i } as CSSProperties} />
      ))}
      <div className="curtain-label" />
    </div>
  );
}
