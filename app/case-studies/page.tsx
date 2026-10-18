import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { caseStudies, site } from "@/lib/data";

const PAGE_TITLE = "Case Studies";
const PAGE_DESCRIPTION =
  "Project stories from Vallunar — the problem, what we built, and the result.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: `${PAGE_TITLE} — Vallunar Groups`,
    description: PAGE_DESCRIPTION,
    url: `${site.domain}/case-studies`,
    siteName: site.name,
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Vallunar Groups Case Studies" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PAGE_TITLE} — Vallunar Groups`,
    description: PAGE_DESCRIPTION,
    images: ["/og-image.svg"],
  },
};

export default function CaseStudiesPage() {
  return (
    <div>
      <section id="top" className="bg-[var(--navy)] px-6 pb-16 pt-36 text-white lg:px-8">
        <div className="mx-auto max-w-[1240px]">
          <h1 className="display text-[clamp(2.25rem,5.5vw,3.75rem)] text-white">Case Studies</h1>
          <p className="mt-5 max-w-[52ch] text-lg leading-8 text-white/80">
            The problem, what we built, and the result — only real projects,
            published with the client&apos;s permission.
          </p>
        </div>
      </section>

      <Reveal>
      <section id="case-studies" className="bg-white">
        <div className="mx-auto max-w-[1240px] px-6 py-20 lg:px-8 lg:py-24">
          <p className="eyebrow mb-10 max-w-[60ch]">
            Note: stories below are placeholders until you supply approved content.
          </p>
          <div className="grid gap-6 lg:grid-cols-2">
            {caseStudies.map((study, index) => (
              <article
                key={index}
                className="rounded-[24px] border border-[var(--border-light)] bg-[var(--bg-warm)] p-8 lg:p-10"
              >
                <span className="eyebrow">{study.category}</span>
                <h2 className="mt-3 text-2xl font-medium text-[var(--text-dark)]">{study.tag}</h2>
                <dl className="mt-6 space-y-5">
                  <div>
                    <dt className="eyebrow mb-1">Problem</dt>
                    <dd className="text-base leading-7 text-[var(--text-muted)]">{study.problem}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow mb-1">What we built</dt>
                    <dd className="text-base leading-7 text-[var(--text-muted)]">{study.built}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow mb-1">Result</dt>
                    <dd className="text-base leading-7 text-[var(--text-muted)]">{study.result}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="mx-auto max-w-[1240px] px-6 py-20 text-center lg:px-8">
        <h2 className="display text-[clamp(1.75rem,3.5vw,2.5rem)] text-[var(--text-dark)]">
          Have a project in mind?
        </h2>
        <p className="mx-auto mt-4 max-w-[46ch] text-base leading-7 text-[var(--text-muted)]">
          Tell us what your business needs. We reply within 24 hours.
        </p>
        <a href="/contact" className="fill-btn focus-ring mt-8 inline-flex min-h-12 items-center px-7">
          <span>Talk to us</span>
        </a>
      </section>
      </Reveal>

      </div>
  );
}
