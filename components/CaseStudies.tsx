import Link from "next/link";
import { caseStudies } from "@/lib/data";

export default function CaseStudies() {
  return (
    <section id="case-studies" className="bg-white">
      <div className="mx-auto max-w-[1240px] px-6 py-20 lg:px-8 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Case studies</p>
            <h2 className="display mt-4 text-[clamp(2rem,4vw,3rem)] text-[var(--text-dark)]">
              Real projects, real results
            </h2>
            <p className="mt-4 max-w-[52ch] text-base leading-7 text-[var(--text-muted)]">
              The problem, what we built, and the result — published with the
              client&apos;s permission.
            </p>
          </div>
          <Link
            href="/case-studies"
            className="fill-btn focus-ring inline-flex min-h-12 items-center px-7"
          >
            <span>View all case studies</span>
          </Link>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {caseStudies.map((study, index) => (
            <article
              key={index}
              className="rounded-[24px] border border-[var(--border-light)] bg-[var(--bg-warm)] p-8 lg:p-10"
            >
              <span className="eyebrow">{study.category}</span>
              <h3 className="mt-3 text-2xl font-medium text-[var(--text-dark)]">
                {study.tag}
              </h3>
              <dl className="mt-6 space-y-5">
                <div>
                  <dt className="eyebrow mb-1">Problem</dt>
                  <dd className="text-base leading-7 text-[var(--text-muted)]">
                    {study.problem}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-1">What we built</dt>
                  <dd className="text-base leading-7 text-[var(--text-muted)]">
                    {study.built}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-1">Result</dt>
                  <dd className="text-base leading-7 text-[var(--text-muted)]">
                    {study.result}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
