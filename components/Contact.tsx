"use client";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { site } from "@/lib/data";

type FormValues = { name: string; email: string; phone: string; message: string; botcheck: string };

export default function Contact() {
  const [status, setStatus] = useState("");
  const firstInput = useRef<HTMLInputElement | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();
  const nameField = register("name", { required: true });

  useEffect(() => {
    const open = () => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      window.setTimeout(() => firstInput.current?.focus(), 600);
    };
    window.addEventListener("vallunar:open-contact", open);
    return () => window.removeEventListener("vallunar:open-contact", open);
  }, []);

  const submit = async (values: FormValues) => {
    if (values.botcheck) return;
    if (!process.env.NEXT_PUBLIC_WEB3FORMS_KEY) {
      setStatus("Demo mode: add your Web3Forms key in .env.local to receive messages.");
      return;
    }
    setStatus("Sending...");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY, subject: "New enquiry from vallunar.com", name: values.name, email: values.email, phone: values.phone, message: values.message })
      });
      const result = await response.json();
      if (!result.success) throw new Error("Unable to send");
      setStatus("Thank you. We will reply soon.");
      reset();
    } catch {
      setStatus("Could not send. Please try WhatsApp instead.");
    }
  };

  const inputClass = "focus-ring w-full rounded-xl border border-[var(--border-light)] bg-white px-4 py-3 text-base text-[var(--text-dark)] placeholder:text-[var(--text-muted)] transition focus:border-[var(--mid-blue)]";

  return (
    <section id="contact" className="bg-[var(--navy)] text-white">
      <div className="mx-auto grid max-w-[1240px] gap-14 px-6 py-24 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-28">
        <div>
          <div className="mb-5 flex items-center gap-4">
            <span className="moon moon-sm" aria-hidden="true" />
            <span className="eyebrow" style={{ color: "var(--accent-cyan)" }}>Contact</span>
          </div>
          <h2 className="display text-[clamp(2rem,4.5vw,3.25rem)] text-white">
            Tell us what you need.
          </h2>
          <p className="mt-5 max-w-[42ch] text-base leading-7 text-white/80">
            A shop, a school, a growing company — send a message and a human
            replies. Reply within 24h. No bots, just humans.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="fill-btn focus-ring"
            >
              <span>WhatsApp</span>
            </a>
            <a href={`mailto:${site.email}`} className="fill-btn focus-ring">
              <span>Email</span>
            </a>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="fill-btn focus-ring">
              <span>Call us</span>
            </a>
          </div>

          <div className="mt-10 space-y-2 text-base text-white/80">
            <p>{site.legalName}</p>
            <p>{site.address}</p>
            <p>
              <a href={`mailto:${site.email}`} className="focus-ring underline underline-offset-4 hover:text-white">
                {site.email}
              </a>
            </p>
            <p>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="focus-ring underline underline-offset-4 hover:text-white">
                {site.phone}
              </a>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(submit)} className="rounded-[24px] bg-white p-7 text-[var(--text-dark)] sm:p-9">
          <h3 className="display mb-6 text-2xl">Send a message</h3>
          <div className="grid gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--text-dark)]" htmlFor="contact-name">Name</label>
              <input id="contact-name" {...nameField} ref={(el) => { nameField.ref(el); firstInput.current = el; }} className={inputClass} placeholder="Your name" />
              {errors.name && <p className="mt-1 text-sm text-[var(--error)]">Name is required.</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--text-dark)]" htmlFor="contact-email">Email</label>
              <input id="contact-email" type="email" {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} className={inputClass} placeholder="you@company.com" />
              {errors.email && <p className="mt-1 text-sm text-[var(--error)]">A valid email is required.</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--text-dark)]" htmlFor="contact-phone">Phone</label>
              <input id="contact-phone" type="tel" {...register("phone")} className={inputClass} placeholder="+94 XX XXXXXXX" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--text-dark)]" htmlFor="contact-message">Message</label>
              <textarea id="contact-message" rows={4} {...register("message", { required: true })} className={`${inputClass} resize-none`} placeholder="What are you building?" />
              {errors.message && <p className="mt-1 text-sm text-[var(--error)]">Message is required.</p>}
            </div>
          </div>
          <input {...register("botcheck")} type="hidden" />
          <button type="submit" className="fill-btn focus-ring mt-6 w-full justify-center">
            Send message <ArrowUpRight size={16} aria-hidden="true" />
          </button>
          {status && <p className="mt-4 text-sm text-[var(--text-muted)]" role="status">{status}</p>}
        </form>
      </div>
    </section>
  );
}
