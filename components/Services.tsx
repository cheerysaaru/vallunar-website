import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/data";

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-[1240px] px-6 py-24 lg:px-8 lg:py-28">
      <div className="mb-12 max-w-2xl">
        <div className="eyebrow mb-4">Services</div>
        <h2 className="display text-[clamp(2rem,4.5vw,3.25rem)] text-[var(--text-dark)]">
          What we build
        </h2>
        <p className="mt-5 text-base leading-7 text-[var(--text-muted)]">
          Five things we do properly, for businesses in Sri Lanka and across the region.
        </p>
      </div>
      <div role="list">
        {services.map((service, index) => (
          <a
            key={service.title}
            href="/services"
            className="svc-row focus-ring"
            role="listitem"
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
