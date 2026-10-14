"use client";
import { Check, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { principles } from "@/lib/data";
import { useState } from "react";

export default function WhyUs() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="mx-auto flex max-w-[1180px] flex-wrap gap-14 px-6 py-24 lg:px-8 lg:py-28 bg-white reveal">
      <div className="flex-1 basis-[390px] reveal-left">
        <div className="eyebrow mb-5" style={{ color: "var(--mid-blue)" }}>
          Good solutions. Local support.
        </div>
        <h2 className="display text-5xl text-[var(--text-dark)] sm:text-6xl">
          Big thinking.<br />Short feedback loops.
        </h2>
        <p className="mt-7 max-w-[310px] text-[15px] leading-7 text-[var(--text-muted)]">
          We work alongside your team, from the first idea to a system your business relies on every day.
        </p>
      </div>
      <div className="flex flex-1 basis-[440px] flex-col gap-3 reveal-stagger">
        {principles.map((item, index) => {
          const isOpen = open === index;
          return (
            <div
              key={item.title}
              className="rounded-2xl p-5 interactive card-lift bg-[var(--light-tint)]"
              style={{ transition: "background-color var(--duration-base) var(--ease)" }}
            >
              <button
                className="focus-ring flex w-full items-center gap-3 text-left interactive btn-press"
                onClick={() => setOpen(isOpen ? null : index)}
                aria-expanded={isOpen}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--text-dark)] text-[var(--text-dark)] interactive">
                  {isOpen ? <Check size={15} /> : <Plus size={15} />}
                </span>
                <span className="flex-1 text-base text-[var(--text-dark)]">{item.title}</span>
                {isOpen ? <X size={16} /> : <Plus size={16} />}
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="ml-11 mt-3 text-[13px] leading-6 text-[var(--text-muted)]">
                      {item.body}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}