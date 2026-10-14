"use client";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/data";
import { useStaggeredReveal } from "@/lib/scroll-reveal";

export default function Services() {
  const { getItemProps } = useStaggeredReveal(services.length);

  return (
    <section id="services" className="mx-auto max-w-[1240px] px-6 py-24 lg:px-8 lg:py-28 reveal stagger-in">
      <div className="mb-12 max-w-2xl reveal">
        <div className="eyebrow mb-4">Services</div>
        <h2 className="display text-[clamp(2rem,4.5vw,3.25rem)] text-[var(--text-dark)]">
          What we build
        </h2>
        <p className="mt-5 text-base leading-7 text-[var(--text-muted)]">
          Five things we do properly, for businesses in Jaffna and across Sri Lanka.
        </p>
      </div>
      <div role="list" className="reveal-stagger">
        {services.map((service, index) => (
          <a
            key={service.title}
            href="/services"
            className="svc-row focus-ring interactive card-lift"
            role="listitem"
            {...getItemProps(index)}
          >
            <span className="svc-num">{String(index + 1).padStart(2, "0")}</span>
            <span>
              <span className="svc-title block">{service.title}</span>
              <span className="svc-desc mt-1 block">{service.description}</span>
            </span>
            <ArrowUpRight className="svc-arrow" size={20} aria-hidden="true" />
          </a>
        ))}
      </div>
    </section>
  );
}
