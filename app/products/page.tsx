import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { products, site } from "@/lib/data";
import Reveal from "@/components/Reveal";

const PAGE_TITLE = "Products";
const PAGE_DESCRIPTION =
  "txtmsg.lk SMS gateway and ASIT POS — products built and run by Vallunar in Sri Lanka.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: `${PAGE_TITLE} — Vallunar Groups`,
    description: PAGE_DESCRIPTION,
    url: `${site.domain}/products`,
    siteName: site.name,
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Vallunar Groups Products" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PAGE_TITLE} — Vallunar Groups`,
    description: PAGE_DESCRIPTION,
    images: ["/og-image.svg"],
  },
};

function ProductBlock({ product, index }: { product: (typeof products)[number]; index: number }) {
  const dark = product.tone === "dark";
  return (
    <article
      id={index === 0 ? "products" : undefined}
      className={`grid items-center gap-10 rounded-[28px] p-8 lg:grid-cols-2 lg:gap-14 lg:p-12 ${
        dark ? "bg-[var(--navy)] text-white" : "border border-[var(--border-light)] bg-white text-[var(--text-dark)]"
      }`}
    >
      <div
        className="grid min-h-[260px] place-items-center rounded-[20px] border border-dashed p-8 text-center"
        style={{
          borderColor: dark ? "rgba(255,255,255,0.3)" : "var(--border-light)",
          background: dark ? "var(--navy-darker)" : "var(--light-tint)",
        }}
        role="img"
        aria-label={`Placeholder for a ${product.name} screenshot`}
      >
        <p className="eyebrow" style={{ color: dark ? "rgba(255,255,255,0.75)" : undefined }}>
          [REPLACE: {product.name} screenshot]
        </p>
      </div>

      <div>
        <span className="eyebrow" style={{ color: dark ? "rgba(255,255,255,0.7)" : undefined }}>
          {product.category}
        </span>
        <h2 className="display mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)]">{product.name}</h2>
        <p
          className="mt-4 max-w-[52ch] text-base leading-7"
          style={{ color: dark ? "rgba(255,255,255,0.82)" : "var(--text-muted)" }}
        >
          {product.description}
        </p>

        <h3 className="eyebrow mt-8" style={{ color: dark ? "rgba(255,255,255,0.7)" : undefined }}>
          Who it is for
        </h3>
        <p
          className="mt-2 max-w-[52ch] text-base leading-7"
          style={{ color: dark ? "rgba(255,255,255,0.82)" : "var(--text-muted)" }}
        >
          {product.whoFor}
        </p>

        <h3 className="eyebrow mt-8" style={{ color: dark ? "rgba(255,255,255,0.7)" : undefined }}>
          Features
        </h3>
        <ul className="mt-3 grid gap-2">
          {product.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 text-base leading-7"
              style={{ color: dark ? "rgba(255,255,255,0.85)" : "var(--text-dark)" }}
            >
              <span aria-hidden="true" style={{ color: dark ? "var(--accent-cyan)" : "var(--mid-blue)" }}>—</span>
              {feature}
            </li>
          ))}
        </ul>

        <Link href="/contact" className={`focus-ring mt-9 inline-flex min-h-12 items-center px-7 ${dark ? "fill-btn fill-btn-dark" : "fill-btn"}`}>
          <span className={dark ? "font-semibold" : ""}>Talk to us <ArrowUpRight size={16} aria-hidden="true" /></span>
        </Link>
      </div>
    </article>
  );
}

export default function ProductsPage() {
  return (
    <div>
      <section id="top" className="bg-[var(--navy)] px-6 pb-16 pt-36 text-white lg:px-8">
        <div className="mx-auto max-w-[1240px]">
          <h1 className="display text-[clamp(2.25rem,5.5vw,3.75rem)] text-white">Products</h1>
          <p className="mt-5 max-w-[52ch] text-lg leading-8 text-white/80">
            Two systems we build and run ourselves: an SMS gateway and a point-of-sale.
          </p>
        </div>
      </section>

      <Reveal>
      <section className="bg-[var(--bg-warm)]">
        <div className="mx-auto grid max-w-[1240px] gap-8 px-6 py-20 lg:px-8 lg:py-24">
          {products.map((product, index) => (
            <ProductBlock key={product.name} product={product} index={index} />
          ))}

          <div className="rounded-[28px] border border-[var(--border-light)] bg-white p-8 lg:p-12">
            <span className="eyebrow">Custom</span>
            <h2 className="display mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)] text-[var(--text-dark)]">
              Have an idea for a product?
            </h2>
            <p className="mt-4 max-w-[52ch] text-base leading-7 text-[var(--text-muted)]">
              Tell us what your business needs and we will build it. Start a conversation.
            </p>
            <Link href="/contact" className="fill-btn focus-ring mt-8 inline-flex min-h-12 items-center px-7">
              <span>Talk to us <ArrowUpRight size={16} aria-hidden="true" /></span>
            </Link>
          </div>
        </div>
      </section>
      </Reveal>

      </div>
  );
}
