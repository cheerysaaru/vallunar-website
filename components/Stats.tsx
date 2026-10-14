"use client";
import { stats } from "@/lib/data";
import { useStaggeredReveal } from "@/lib/scroll-reveal";

export default function Stats() {
  const { getItemProps } = useStaggeredReveal(stats.length);

  return (
    <section className="border-y border-[var(--border-light)] bg-white reveal">
      <dl className="mx-auto grid max-w-[1240px] grid-cols-2 divide-[var(--border-light)] px-6 sm:grid-cols-4 sm:divide-x lg:px-8 reveal-stagger">
        {stats.map((stat, index) => (
          <div key={stat.label} className="px-2 py-10 text-center sm:px-6 interactive" {...getItemProps(index)}>
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              <div className="text-[2rem] font-semibold leading-none text-[var(--navy)] sm:text-[2.5rem]">
                {stat.value}
              </div>
              <div className="eyebrow mt-3">{stat.label}</div>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
