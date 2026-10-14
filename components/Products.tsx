"use client";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { products } from "@/lib/data";
import { useStaggeredReveal } from "@/lib/scroll-reveal";

export default function Products() {
  const { getItemProps } = useStaggeredReveal(products.length);

  return (
    <section id="products" className="bg-white reveal">
      <div className="mx-auto max-w-[1240px] px-6 py-24 lg:px-8 lg:py-28">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 reveal">
          <div className="max-w-2xl reveal-up">
            <div className="eyebrow mb-4">Products</div>
            <h2 className="display text-[clamp(2rem,4.5vw,3.25rem)] text-[var(--text-dark)]">
              Two products we run ourselves
            </h2>
            <p className="mt-5 text-base leading-7 text-[var(--text-muted)]">
              Not slideshows — working systems our clients use every day.
            </p>
          </div>
          <Link
            href="/products"
            className="focus-ring inline-flex items-center gap-2 text-base font-medium text-[var(--mid-blue)] link-slide hover:text-[var(--navy)]"
          >
            See product details <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 reveal-stagger">
          {products.map((product, index) => (
            <article
              key={product.name}
              className={`flex flex-col justify-between rounded-[24px] p-8 lg:p-10 interactive card-lift ${
                product.tone === "dark"
                  ? "bg-[var(--navy)] text-white"
                  : "border border-[var(--border-light)] bg-[var(--light-tint)] text-[var(--text-dark)]"
              }`}
              {...getItemProps(index)}
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-2xl font-medium">{product.name}</h3>
                  <span
                    className="eyebrow"
                    style={{ color: product.tone === "dark" ? "rgba(255,255,255,0.75)" : undefined }}
                  >
                    {product.category}
                  </span>
                </div>
                <p
                  className={`mt-4 text-base leading-7 ${
                    product.tone === "dark" ? "text-white/85" : "text-[var(--text-muted)]"
                  }`}
                >
                  {product.description}
                </p>
              </div>
              <Link
                href="/products"
                className={`focus-ring mt-8 inline-flex items-center gap-2 self-start text-base font-medium underline underline-offset-4 interactive ${
                  product.tone === "dark" ? "text-[var(--accent-cyan)]" : "text-[var(--mid-blue)]"
                }`}
              >
                Talk to us <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
