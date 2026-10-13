"use client";
import { motion } from "framer-motion";
import { services } from "@/lib/data";

export default function Services() {
  return <div id="services" className="mt-12 grid auto-rows-[210px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">{services.map((service, index) => { const Icon = service.icon; return <motion.article key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ delay: index * .06 }} className={`group flex flex-col justify-between rounded-[24px] border border-line bg-deep p-7 shadow-[0_0_40px_rgba(97,165,194,.07)] transition hover:-translate-y-1 hover:border-cyan ${service.span === "wide" ? "lg:col-span-2" : ""} ${service.span === "tall" ? "lg:row-span-2" : ""}`}><span className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan text-cyan transition group-hover:bg-cyan group-hover:text-ink"><Icon size={17} /></span><div><h3 className="mb-1.5 text-[21px] font-medium text-mist">{service.title}</h3><p className="max-w-md text-sm leading-6 text-mist/65">{service.description}</p></div></motion.article>; })}</div>;
}
