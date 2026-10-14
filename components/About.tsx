"use client";
import { FOUNDERS } from "@/lib/data";
import { useStaggeredReveal } from "@/lib/scroll-reveal";

export default function About() {
  const { getItemProps } = useStaggeredReveal(FOUNDERS.length);

  return (
    <section id="about" className="bg-[var(--bg-warm)] reveal">
      <div className="mx-auto max-w-[1240px] px-6 py-24 lg:px-8 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div className="reveal-left">
            <div className="eyebrow mb-4">About</div>
            <h2 className="display text-[clamp(2rem,4.5vw,3.25rem)] text-[var(--text-dark)]">
              Built in Jaffna, for businesses that need software to work.
            </h2>
            <p className="mt-6 max-w-[46ch] text-base leading-7 text-[var(--text-muted)]">
              Vallunar Groups (PVT) LTD started in 2023 in Jaffna, in the Northern
              Province of Sri Lanka. We are a small local team — you talk to the
              people who build your system, not a call centre.
            </p>
            <p className="mt-4 max-w-[46ch] text-base leading-7 text-[var(--text-muted)]">
              [REPLACE: one real sentence about why the company was started]
            </p>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2 reveal-stagger">
            {FOUNDERS.map((founder, index) => (
              <li
                key={founder.name}
                className="rounded-[20px] border border-[var(--border-light)] bg-white p-6 interactive card-lift"
                {...getItemProps(index)}
              >
                <div
                  className="mb-5 grid aspect-square w-full place-items-center rounded-[14px] border border-dashed border-[var(--border-light)] bg-[var(--light-tint)] text-center"
                  role="img"
                  aria-label="Placeholder for a founder photo"
                >
                  <span className="eyebrow">{founder.photo}</span>
                </div>
                <p className="text-base font-medium text-[var(--text-dark)]">{founder.name}</p>
                <p className="eyebrow mt-1">{founder.role}</p>
                <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">{founder.bio}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
