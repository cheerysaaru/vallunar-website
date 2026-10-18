"use client";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { services, site } from "@/lib/data";
import { motion } from "framer-motion";

const PAGE_TITLE = "Services";
const PAGE_DESCRIPTION =
  "Explore our services: website development, custom software, Android apps, hardware & IT infrastructure, and POS systems.";

function ServicesGrid() {
  return (
    <div className="grid auto-rows-[210px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((service, index) => {
        const Icon = service.icon;
        return (
          <motion.article
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.06 }}
            className={`group flex flex-col justify-between rounded-[24px] border border-[var(--border-light)] bg-[var(--light-tint)] p-7 shadow-[0_0_40px_rgba(47,127,176,.07)] transition hover:-translate-y-1 hover:border-[var(--mid-blue)] ${service.span === "wide" ? "lg:col-span-2" : ""} ${service.span === "tall" ? "lg:row-span-2" : ""}`}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--mid-blue)] text-[var(--mid-blue)] transition group-hover:bg-[var(--mid-blue)] group-hover:text-white">
              <Icon size={17} />
            </span>
            <div>
              <h3 className="mb-1.5 text-[21px] font-medium text-[var(--text-dark)]">{service.title}</h3>
              <p className="max-w-md text-sm leading-6" style={{ color: "var(--text-muted)" }}>{service.description}</p>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <div>
      {/* Hero Section — same heading style as Products / Case Studies */}
      <section id="top" className="bg-[var(--navy)] px-6 pb-16 pt-36 text-white lg:px-8">
        <div className="mx-auto max-w-[1240px]">
          <h1 className="display text-[clamp(2.25rem,5.5vw,3.75rem)] text-white">Services</h1>
          <p className="mt-5 max-w-[52ch] text-lg leading-8 text-white/80">
            Affordable, reliable technology solutions tailored to your business needs.
          </p>
        </div>
      </section>

      {/* Services Grid — same card section wrapper as Products / Case Studies */}
      <Reveal>
      <section id="services" className="bg-[var(--bg-warm)]">
        <div className="mx-auto max-w-[1240px] px-6 py-20 lg:px-8 lg:py-24">
          <ServicesGrid />
        </div>
      </section>
      </Reveal>

      {/* CTA */}
      <Reveal>
      <section className="mx-auto max-w-[1240px] px-6 pb-24 lg:px-8 text-center">
        <h2 className="display text-4xl text-[var(--text-dark)] sm:text-5xl mb-6">Ready to start a project?</h2>
        <p className="mb-8 max-w-xl mx-auto text-lg" style={{ color: "var(--text-muted)" }}>
          Tell us what you're building and we'll reply with scope, timeline and a quotation.
        </p>
        <a href="/contact" className="fill-btn focus-ring inline-flex min-h-12 items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium">
          Talk to us
        </a>
      </section>
      </Reveal>

      </div>
  );
}