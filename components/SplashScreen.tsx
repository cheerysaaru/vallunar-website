"use client";

import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setShowSplash(false);
      document.body.classList.add("ready");
      document.documentElement.style.overflow = "";
      return;
    }

    const sessionSeen = sessionStorage.getItem("splashSeen");
    if (sessionSeen) {
      setShowSplash(false);
      document.body.classList.add("ready");
      document.documentElement.style.overflow = "";
      return;
    }

    document.documentElement.style.overflow = "hidden";

    const MIN_DISPLAY = 2300;
    const MAX_DISPLAY = 3500;
    let exitTimer: ReturnType<typeof setTimeout>;
    let loadResolved = false;

    const startExit = () => {
      setIsExiting(true);
      setTimeout(() => {
        setShowSplash(false);
        document.body.classList.add("ready");
        document.documentElement.style.overflow = "";
        sessionStorage.setItem("splashSeen", "1");
      }, 1300);
    };

    const onLoad = () => {
      loadResolved = true;
      const elapsed = Date.now() - startTime;
      if (elapsed >= MIN_DISPLAY) {
        startExit();
      }
    };

    const startTime = Date.now();
    window.addEventListener("load", onLoad);

    exitTimer = setTimeout(() => {
      if (!loadResolved) {
        window.removeEventListener("load", onLoad);
        startExit();
      }
    }, MAX_DISPLAY);

    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(exitTimer);
    };
  }, [prefersReducedMotion]);

  if (!showSplash) return null;

  return (
    <div
      className={`splash ${isExiting ? "is-exiting" : ""}`}
      role="status"
      aria-label="Loading Vallunar"
      aria-hidden={isExiting}
    >
      <div className="splash-word-wrap" aria-hidden="true">
        <span className="splash-word">Vallunar</span>
      </div>
      <div className="splash-panels" aria-hidden="true">
        <div className="splash-panel" style={{ ["--i"]: 0 } as React.CSSProperties} />
        <div className="splash-panel" style={{ ["--i"]: 1 } as React.CSSProperties} />
        <div className="splash-panel" style={{ ["--i"]: 2 } as React.CSSProperties} />
        <div className="splash-panel" style={{ ["--i"]: 3 } as React.CSSProperties} />
        <div className="splash-panel" style={{ ["--i"]: 4 } as React.CSSProperties} />
      </div>
    </div>
  );
}