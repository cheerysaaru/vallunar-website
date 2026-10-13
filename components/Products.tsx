"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { products } from "@/lib/data";
import { useRef, useState } from "react";

export default function Products() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const step = () => (track.current?.querySelector("article")?.clientWidth || 640) + 22;
  const move = (direction: number) => {
    track.current?.scrollBy({ left: direction * step(), behavior: "smooth" });
    setActive((value) => Math.min(products.length - 1, Math.max(0, value + direction)));
  };
  return <section id="products" className="mx-6 overflow-hidden rounded-[32px] lg:mx-auto lg:max-w-[1240px]" style={{ background: 'var(--b900)', color: 'var(--b100)' }}>
    <div className="px-7 py-16 sm:px-12 lg:px-14">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div>
          <div className="eyebrow mb-5" style={{ color: 'var(--b50)', opacity: 0.6 }}>Our products</div>
          <h2 className="display text-5xl sm:text-6xl" style={{ color: 'var(--b50)' }}>Less hypothetical.<br />More "it works."</h2>
        </div>
        <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--b100)' }}>
          <span>{String(active + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}</span>
          <button className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border transition hover:bg-[var(--b800)] hover:text-[var(--b50)]" onClick={() => move(-1)} aria-label="Previous product" style={{ borderColor: 'var(--b800)', color: 'var(--b100)' }}><ArrowLeft size={17} /></button>
          <button className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border transition hover:bg-[var(--b800)] hover:text-[var(--b50)]" onClick={() => move(1)} aria-label="Next product" style={{ borderColor: 'var(--b800)', color: 'var(--b100)' }}><ArrowRight size={17} /></button>
        </div>
      </div>
      <div ref={track} className="mt-12 flex snap-x snap-mandatory gap-[22px] overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" tabIndex={0} aria-label="Products">
        {products.map((product) => <article key={product.name} className="flex h-[360px] w-[min(640px,82vw)] shrink-0 snap-start flex-col justify-between rounded-[22px] p-8 bg-[var(--b800)] border border-[var(--b800)]" style={{ color: 'var(--b100)' }}>
          <div className="flex justify-between gap-4 text-xl font-medium" style={{ color: 'var(--b50)' }}>
            <span>{product.name}</span>
            <span className="eyebrow" style={{ color: 'var(--b50)', opacity: 0.7 }}>{product.category}</span>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="display text-4xl sm:text-5xl" style={{ color: 'var(--b50)' }}>{product.headline}</h3>
            <p className="text-base leading-7" style={{ color: 'var(--b100)', opacity: 0.7 }}>{product.description}</p>
          </div>
        </article>)}
      </div>
    </div>
  </section>;
}