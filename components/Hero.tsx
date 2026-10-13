"use client";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { site } from "@/lib/data";

export default function Hero() {
  const scrollToProducts = () => {
    const products = document.getElementById("products");
    if (products) {
      products.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="top" className="hero relative isolate grid min-h-screen place-items-center overflow-hidden text-center" style={{ background: 'var(--b900)' }}>
      <div className="relative px-6 py-32">
        <h1 className="display text-[clamp(2.8rem,8vw,6rem)]" style={{ color: 'var(--b50)' }}>
          <span className="block animate-[sharp_1.6s_.4s_both]">Innovative software.</span>
          <span className="block animate-[sharp_1.6s_.8s_both]" style={{ color: 'var(--b50)' }}>Made for your business.</span>
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