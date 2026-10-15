import type { Metadata } from "next";
import HowWeWork from "@/components/HowWeWork";
import { site } from "@/lib/data";

const PAGE_TITLE = "How We Work";
const PAGE_DESCRIPTION =
  "Three steps, no mystery — the same process whether it is a small shop or a larger company.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: `${PAGE_TITLE} — Vallunar Groups`,
    description: PAGE_DESCRIPTION,
    url: `${site.domain}/how-we-work`,
    siteName: site.name,
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Vallunar Groups How We Work" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PAGE_TITLE} — Vallunar Groups`,
    description: PAGE_DESCRIPTION,
    images: ["/og-image.svg"],
  },
};

export default function HowWeWorkPage() {
  return (
    <main>
      {/* Hero Section */}
      <section id="top" className="bg-[var(--navy)] px-6 pb-16 pt-36 text-white lg:px-8">
        <div className="mx-auto max-w-[1240px]">
          <h1 className="display text-[clamp(2.25rem,5.5vw,3.75rem)] text-white">How we work</h1>
          <p className="mt-5 max-w-[52ch] text-lg leading-8 text-white/80">
            The same process whether it is a small shop or a larger company.
          </p>
        </div>
      </section>

      <HowWeWork />
    </main>
  );
}
