"use client";
import { useState } from "react";
import { faqs } from "@/lib/data";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-[var(--bg-warm)] reveal">
      <div className="mx-auto max-w-[1240px] px-6 py-24 lg:px-8 lg:py-28">
        <div className="mb-12 max-w-2xl reveal">
          <div className="eyebrow mb-4">FAQ</div>
          <h2 className="display text-[clamp(2rem,4.5vw,3.25rem)] text-[var(--text-dark)]">
            Questions we get asked
          </h2>
        </div>
        <div className="max-w-[760px] reveal-stagger">
          {faqs.map((faq, index) => {
            const isOpen = open === index;
            return (
              <div key={faq.question} className="faq-item interactive">
                <h3>
                  <button
                    className="faq-q focus-ring interactive btn-press"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => setOpen(isOpen ? null : index)}
                  >
                    {faq.question}
                    <span className="faq-icon" aria-hidden="true">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-answer-${index}`}
                  className={`faq-a accordion-content ${isOpen ? "is-open" : ""}`}
                  hidden={!isOpen}
                >
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
