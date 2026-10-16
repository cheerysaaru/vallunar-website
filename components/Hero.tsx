"use client";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";
import { site } from "@/lib/data";

const HEAD_LINES = ["Software that works.", "Made for your business."];

function InteractiveHeading() {
  let order = 0;
  return (
    <>
      {HEAD_LINES.map((line) => (
        <span key={line} className="block" aria-hidden="true">
          {Array.from(line).map((ch, i) => {
            const delay = order++;
            return (
              <span key={`${ch}-${i}`} className="hero-char" style={{ "--i": delay } as CSSProperties}>
                {ch === " " ? "\u00A0" : ch}
              </span>
            );
          })}
        </span>
      ))}
    </>
  );
}

/* Tunables: PUSH=34px, RADIUS=170px (110 mobile), SMOOTH=.14, STRENGTH=.08 */
const PUSH = 34;
const SMOOTH = 0.14;
const STRENGTH = 0.08;
const ROWS = 22;
const TAU = Math.PI * 2;

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const scrollToProducts = () => {
    const products = document.getElementById("products");
    if (products) {
      products.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    if (!canvas || !hero) {
      console.warn("Hero dot-wave: hero or canvas element not found.");
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animation = 0;
    let running = false;
    let visible = true;
    let dpr = 1;
    let radius = 170;

    /* Smoothed pointer state */
    let mx = -9999;
    let my = -9999;
    let smx = -9999;
    let smy = -9999;
    let strength = 0;
    let hovering = false;

    /* Size the canvas from the hero's box (never 0px) */
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, hero.clientWidth);
      const h = Math.max(1, hero.clientHeight);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      radius = window.innerWidth < 640 ? 110 : 170;
    };

    const setPointer = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      mx = clientX - rect.left;
      my = clientY - rect.top;
    };
    const onMove = (e: PointerEvent) => {
      hovering = true;
      setPointer(e.clientX, e.clientY);
    };
    const onLeave = () => {
      hovering = false;
    };
    const onTouch = (e: TouchEvent) => {
      const touch = e.touches[0] || e.changedTouches[0];
      if (!touch) return;
      hovering = true;
      setPointer(touch.clientX, touch.clientY);
    };
    const onTouchEnd = () => {
      hovering = false;
    };

    const draw = (time: number) => {
      if (visible) {
        const w = hero.clientWidth;
        const h = hero.clientHeight;

        /* Smooth pointer + strength (no sudden jumps) */
        smx += (mx - smx) * SMOOTH;
        smy += (my - smy) * SMOOTH;
        const targetS = hovering && !reduce ? 1 : 0;
        strength += (targetS - strength) * STRENGTH;
        if (!reduce) {
          hero.style.setProperty("--mx", `${smx}px`);
          hero.style.setProperty("--my", `${smy}px`);
          hero.style.setProperty("--gs", strength.toFixed(3));
        }

        ctx.clearRect(0, 0, w, h);
        const spacing = w < 640 ? 15 : 20;
        const r2 = radius * radius;

        for (let row = 0; row < ROWS; row++) {
          const k = row / (ROWS - 1);
          const baseY = h * 0.55 + Math.pow(k, 1.55) * h * 0.45;
          const amp = 6 + k * 28;
          const baseR = 0.8 + k * 1.6;
          const baseOp = 0.35 + k * 0.55;
          const near = k > 0.6;

          for (let x = 0; x <= w; x += spacing) {
            const wave = Math.sin(x * 0.012 + time * 0.0012 + row * 0.35) * amp;
            let px = x;
            let py = baseY + wave;
            let alpha = baseOp * (0.75 + 0.25 * Math.sin(x * 0.01 + time * 0.001));
            let r = baseR;
            let light = near;

            /* Cursor interaction: push, brighten, enlarge within radius */
            if (strength > 0.01 && mx > -9000) {
              const dx = px - smx;
              const dy = py - smy;
              const d2 = dx * dx + dy * dy;
              if (d2 < r2) {
                const d = Math.sqrt(d2) || 1;
                const f = (1 - d / radius) * (1 - d / radius) * strength;
                const push = f * PUSH;
                px += (dx / d) * push;
                py += (dy / d) * push;
                alpha = Math.min(1, alpha + f * 0.8);
                r += f * 2;
                if (f > 0.15) light = true;
              }
            }

            ctx.globalAlpha = alpha;
            ctx.fillStyle = light ? "#E3F2FD" : "#BBDEFB";
            ctx.beginPath();
            ctx.arc(px, py, r, 0, TAU);
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1;
      }
      if (running) animation = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running) return;
      running = true;
      animation = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(animation);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(hero);

    /* Pause when the hero is off-screen; draw once under reduced motion */
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (reduce) return;
      if (visible) start();
      else stop();
    });
    observer.observe(hero);

    if (reduce) {
      ctx.clearRect(0, 0, hero.clientWidth, hero.clientHeight);
      draw(performance.now());
    } else {
      start();
      hero.addEventListener("pointermove", onMove, { passive: true });
      hero.addEventListener("pointerleave", onLeave, { passive: true });
      hero.addEventListener("touchmove", onTouch, { passive: true });
      hero.addEventListener("touchend", onTouchEnd, { passive: true });
    }

    return () => {
      stop();
      ro.disconnect();
      observer.disconnect();
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      hero.removeEventListener("touchmove", onTouch);
      hero.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="top"
      className="hero relative isolate grid min-h-screen place-items-center overflow-hidden text-center"
    >
      {/* L1 — base gradient */}
      <div className="hero-bg-base" aria-hidden="true" />
      {/* L3 — top spotlight */}
      <div className="hero-bg-spotlight" aria-hidden="true" />
      {/* L4 — three drifting glow blobs */}
      <div className="hero-bg-blobs" aria-hidden="true">
        <span className="hero-blob hero-blob-a" />
        <span className="hero-blob hero-blob-b" />
        <span className="hero-blob hero-blob-c" />
      </div>
      {/* L5 — faint grid, faded at the edges */}
      <div className="hero-bg-grid" aria-hidden="true" />
      {/* L7 — cursor glow (follows --mx/--my, fades with --gs) */}
      <div className="hero-bg-cursor" aria-hidden="true" />
      {/* L6 — dot-wave canvas: LAST background layer before grain/fade */}
      <canvas ref={canvasRef} className="hero-bg-canvas" aria-hidden="true" />
      {/* L8 — film grain */}
      <div className="hero-bg-grain" aria-hidden="true" />
      {/* L9 — bottom fade into the next section */}
      <div className="hero-bg-fade" aria-hidden="true" />

      <div className="relative px-6 py-32">
        <h1
          className="display hero-title text-[clamp(2.8rem,8vw,6rem)] text-mist"
          aria-label={HEAD_LINES.join(" ")}
        >
          <InteractiveHeading />
        </h1>
        <p className="hero-sub mx-auto mb-9 mt-7 max-w-[460px] text-base text-mist/80">{site.description}</p>
        <div className="hero-cta-wrap flex flex-wrap justify-center gap-3">
          <span className="hero-float">
            <button
              type="button"
              className="hero-cta fill-btn"
              onClick={scrollToProducts}
              aria-label="Explore more"
            >
              <span>
                Explore more <ArrowUpRight size={16} aria-hidden="true" />
              </span>
            </button>
          </span>
          <span className="hero-float">
            <Link href="/contact" className="hero-cta fill-btn" aria-label="Contact us">
              <span>Contact Us</span>
            </Link>
          </span>
        </div>
      </div>
      <div className="hero-bottom absolute bottom-6 left-7 right-7 hidden justify-between text-[11px] uppercase tracking-[.14em] text-mist/65 sm:flex">
        <span>Built in Sri Lanka. Built to scale.</span>
        <span className="inline-flex items-center gap-2">Scroll to discover <ArrowDown size={14} /></span>
      </div>
    </section>
  );
}
