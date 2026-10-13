"use client";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { site } from "@/lib/data";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollToProducts = () => {
    const products = document.getElementById("products");
    if (products) {
      products.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animation = 0;
    let t = 0;
    let mx = .5;
    let visible = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const resize = () => {
      const d = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.offsetWidth * d;
      canvas.height = canvas.offsetHeight * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
    };
    const move = (event: MouseEvent) => {
      mx = event.clientX / window.innerWidth;
    };
    const draw = () => {
      if (visible) {
        const w = canvas.offsetWidth;
        const h = canvas.offsetHeight;
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "rgba(227,242,253,0.2)"; /* COLOR CHANGE: --b50 with alpha for dot grid */
        for (let line = 0; line < 16; line++) {
          const offset = line * h * .028;
          for (let i = 0; i < w; i += w / (window.innerWidth < 700 ? 70 : 150)) {
            const y = h * .55 + offset + Math.sin(i / w * 5 + t + line * .18 + mx * 2) * h * .14 + Math.sin(i / w * 11 - t * 1.3) * h * .03;
            ctx.globalAlpha = .15 + .5 * (line / 16);
            ctx.fillRect(i, y, 2, 2);
          }
        }
      }
      t += reduce ? 0 : .008;
      animation = requestAnimationFrame(draw);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(canvas);
    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      cancelAnimationFrame(animation);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <section id="top" className="hero relative isolate grid min-h-screen place-items-center overflow-hidden text-center" style={{ 
      background: 'radial-gradient(circle at 50% 40%, var(--b700) 0%, var(--b900) 45%, var(--b900) 100%)' 
    }}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-70" aria-hidden="true" />
      <div className="relative px-6 py-32">
        <h1 className="display text-[clamp(2.8rem,8vw,6rem)]" style={{ color: 'var(--b50)' }}>
          <span className="block animate-[sharp_1.6s_.4s_both]">Innovative software.</span>
          <span className="block animate-[sharp_1.6s_.8s_both]" style={{ color: 'var(--b200)' }}>Made for your business.</span>
        </h1>
        <p className="mx-auto mb-9 mt-7 max-w-[460px] text-base" style={{ color: 'var(--b100)' }}>{site.description}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            className="fill-btn focus-ring inline-flex min-h-12 items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium"
            onClick={scrollToProducts}
            aria-label="Explore our products"
          >
            Explore more <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
      <div className="absolute bottom-6 left-7 right-7 hidden justify-between text-[11px] uppercase tracking-[.14em] sm:flex" style={{ color: 'var(--b100)', opacity: 0.65 }}>
        <span>Built in Jaffna. Built to scale.</span>
        <span className="inline-flex items-center gap-2">Scroll to discover <ArrowDown size={14} /></span>
      </div>
    </section>
  );
}