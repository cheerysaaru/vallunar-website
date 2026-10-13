"use client";
import { Check, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { principles } from "@/lib/data";
import { useState } from "react";

export default function WhyUs() {
  const [open, setOpen] = useState(1);
  return <section className="mx-auto flex max-w-[1180px] flex-wrap gap-14 px-6 py-24 lg:px-8 lg:py-28" style={{ background: 'var(--b50)' }}>
    <div className="flex-1 basis-[390px]">
      <div className="eyebrow mb-5" style={{ color: 'var(--b900)' }}>Good solutions. Local support.</div>
      <h2 className="display text-5xl sm:text-6xl" style={{ color: 'var(--b900)' }}>Big thinking.<br />Short feedback loops.</h2>
      <p className="mt-7 max-w-[310px] text-[15px] leading-7" style={{ color: 'var(--b900)', opacity: 0.65 }}>We work alongside your team, from the first idea to a system your business relies on every day.</p>
    </div>
    <div className="flex flex-1 basis-[440px] flex-col gap-3">
      {principles.map((item, index) => {
        const isOpen = open === index;
        return <div key={item.title} className="rounded-2xl p-5 transition bg-[var(--b800)] border border-[var(--b800)]" style={{ color: 'var(--b50)' }}>
          <button className="focus-ring flex w-full items-center gap-3 text-left" onClick={() => setOpen(isOpen ? -1 : index)} aria-expanded={isOpen}>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border" style={{ borderColor: 'var(--b200)', color: 'var(--b200)' }}>
              {isOpen ? <Check size={15} /> : <Plus size={15} />}
            </span>
            <span className="flex-1 text-base" style={{ color: 'var(--b50)' }}>{item.title}</span>
            {isOpen ? <X size={16} style={{ color: 'var(--b200)' }} /> : <Plus size={16} style={{ color: 'var(--b200)' }} />}
          </button>
          <AnimatePresence initial={false}>
            {isOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <p className="ml-11 mt-3 text-[13px] leading-6" style={{ color: 'var(--b100)' }}>{item.body}</p>
            </motion.div>}
          </AnimatePresence>
        </div>;
      })}
    </div>
  </section>;
}