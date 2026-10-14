"use client";

import { useEffect, useRef, useState } from "react";
import { principles } from "@/lib/data";

export default function HowWeWork() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const stepsRef = useRef<(HTMLLIElement | null)[]>([null, null, null]);
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    setIsMobile(mq.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handleChange);

    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionMq.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionMq.addEventListener("change", handleMotionChange);

    return () => {
      mq.removeEventListener("change", handleChange);
      motionMq.removeEventListener("change", handleMotionChange);
    };
  }, []);

  const computeActiveIndex = () => {
    if (!sectionRef.current) return 0;
    const viewportThreshold = window.innerHeight * 0.55;
    let lastIndex = 0;
    stepsRef.current.forEach((el, i) => {
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= viewportThreshold) {
          lastIndex = i;
        }
      }
    });
    return lastIndex;
  };

  const updateActiveStep = () => {
    const newIndex = computeActiveIndex();
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const scheduleUpdate = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(updateActiveStep);
  };

  useEffect(() => {
    const onScroll = () => scheduleUpdate();
    const onResize = () => scheduleUpdate();

    document.fonts.ready.then(scheduleUpdate);
    scheduleUpdate();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [activeIndex]);

  const stepTitles = principles.map((p) => p.title);

  const counterStyle = {
    transform: `translateY(calc(var(--num-size) * ${activeIndex} * -1))`,
    transition: prefersReducedMotion ? "none" : "transform .6s cubic-bezier(.22,1,.36,1)",
  } as React.CSSProperties;

  const titleStyle = {
    opacity: prefersReducedMotion ? 1 : undefined,
    transition: prefersReducedMotion ? "none" : "opacity .4s ease",
  } as React.CSSProperties;

  const lineProgress = `${((activeIndex + 1) / 3) * 100}%`;

  const stepMinHeight = "clamp(230px, 36vh, 340px)";
  const numSize = "clamp(72px, 10vw, 132px)";

  return (
    <section
      id="how-we-work"
      ref={sectionRef}
      className="relative bg-[var(--navy)] text-white"
      style={{ overflow: "visible", ["--num-size"]: numSize } as React.CSSProperties}
      aria-labelledby="how-we-work-heading"
    >
      <div
        className="mx-auto max-w-[1240px] px-6 py-24 lg:px-8 lg:py-28"
        style={{ overflow: "visible", display: "flex", flexDirection: isMobile ? "column" : "row", gap: "60px", alignItems: "flex-start" }}
      >
        {/* LEFT COLUMN — PINNED */}
        <div
          className="w-full lg:w-[40%] flex-shrink-0"
          style={{
            position: "sticky",
            top: isMobile ? "var(--notch-height)" : "110px",
            alignSelf: "start",
            background: "var(--navy)",
            zIndex: 10,
            paddingBottom: isMobile ? "24px" : 0,
            borderBottom: isMobile ? "1px solid rgba(255,255,255,0.08)" : "none",
          }}
        >
          <div className="mb-14 max-w-2xl">
            <div className="eyebrow mb-4" style={{ color: "var(--accent-cyan)" }}>
              How we work
            </div>
            <h2 id="how-we-work-heading" className="display text-[clamp(2rem,4.5vw,3.25rem)] text-white">
              Three steps. No mystery.
            </h2>
            <p className="mt-5 text-base leading-7 text-white/80">
              The same process whether it is a small shop or a larger company.
            </p>
          </div>

          {/* Rolling counter + current step title */}
          <div className="mt-10 lg:mt-16" style={{ minHeight: "var(--num-size)" }}>
            <div className="relative" style={{ height: "var(--num-size)", overflow: "hidden", lineHeight: 1, fontSize: "var(--num-size)" }}>
              <div
                className="font-mono font-bold select-none"
                style={{
                  ...counterStyle,
                  color: "var(--accent-cyan)",
                  height: "auto",
                }}
                aria-hidden="true"
              >
                <span style={{ display: "block", height: "var(--num-size)", lineHeight: "var(--num-size)" }}>01</span>
                <span style={{ display: "block", height: "var(--num-size)", lineHeight: "var(--num-size)" }}>02</span>
                <span style={{ display: "block", height: "var(--num-size)", lineHeight: "var(--num-size)" }}>03</span>
              </div>
            </div>
            <h3
              id="current-step-title"
              className="mt-6 text-xl font-medium text-white transition-opacity duration-400"
              style={titleStyle}
              aria-live="polite"
            >
              {stepTitles[activeIndex]}
            </h3>
          </div>
        </div>

        {/* RIGHT COLUMN — SCROLLING STEPS */}
        <div
          className="w-full lg:w-[60%] relative"
          style={{ overflow: "visible", paddingBottom: "18vh" }}
        >
          {/* Vertical progress line */}
          <div
            className="absolute left-[14px] top-0 bottom-0 w-[2px] pointer-events-none"
            style={{ background: "rgba(97,165,194,0.15)" }}
            aria-hidden="true"
          >
            <div
              className="absolute left-0 top-0 w-full h-full"
              style={{
                background: "var(--accent-cyan)",
                transformOrigin: "top center",
                transform: `scaleY(${lineProgress})`,
                transition: prefersReducedMotion ? "none" : "transform .6s cubic-bezier(.22,1,.36,1)",
              }}
            />
            {principles.map((_, i) => (
              <div
                key={`marker-${i}`}
                className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 transition-all duration-600"
                style={{
                  top: `${(i + 0.5) / 3 * 100}%`,
                  borderColor: i <= activeIndex ? "var(--accent-cyan)" : "rgba(97,165,194,0.3)",
                  backgroundColor: i <= activeIndex ? "var(--accent-cyan)" : "transparent",
                  transform: `translateX(-50%) scale(${i <= activeIndex ? 1 : 0.7})`,
                }}
                aria-hidden="true"
              />
            ))}
          </div>

          <ol className="grid gap-0 relative" style={{ overflow: "visible" }}>
            {principles.map((step, index) => {
              const isActive = index === activeIndex;
              const stepStyle = {
                opacity: prefersReducedMotion ? 1 : (isActive ? 1 : 0.28),
                transform: prefersReducedMotion ? "none" : (isActive ? "translateX(0)" : "translateX(14px)"),
                transition: prefersReducedMotion ? "none" : "opacity .6s cubic-bezier(.22,1,.36,1), transform .6s cubic-bezier(.22,1,.36,1)",
                minHeight: stepMinHeight,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              } as React.CSSProperties;

              // Moon phases: crescent (01), half (02), full (03)
              const moonPhase = index === 0 ? "crescent" : index === 1 ? "half" : "full";

              return (
                <li
                  key={step.title}
                  ref={(el) => { stepsRef.current[index] = el; }}
                  className="flex flex-col gap-5 pl-12"
                  style={stepStyle}
                >
                  <div className="flex items-center gap-4">
                    <span className={`moon moon-sm ${moonPhase}`} aria-hidden="true" style={{ flexShrink: 0 }} />
                    <span className="eyebrow" style={{ color: isActive ? "white" : "rgba(255,255,255,0.5)" }}>
                      Step {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-2xl font-medium text-white">{step.title}</h3>
                  <p className="text-base leading-7 text-white/80 max-w-[40ch]">{step.body}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}