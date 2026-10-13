"use client";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { site } from "@/lib/data";

type FormValues = { name: string; email: string; phone: string; message: string; botcheck: string };
export default function Contact() { 
  const dialog = useRef<HTMLDialogElement>(null); 
  const [status, setStatus] = useState(""); 
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>(); 
  useEffect(() => { 
    const open = () => dialog.current?.showModal(); 
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
        body: JSON.stringify({ 
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY, 
          subject: "New enquiry from vallunar.com", 
          name: values.name, 
          email: values.email, 
          phone: values.phone, 
          message: values.message 
        }) 
      }); 
      const result = await response.json(); 
      if (!result.success) throw new Error("Unable to send"); 
      setStatus("Thank you. We will reply soon."); 
      reset(); 
    } catch { 
      setStatus("Could not send. Please try WhatsApp instead."); 
    } 
  }; 
  return <><section id="cta" className="mx-6 max-w-[1240px] rounded-t-[32px] px-7 py-16 text-ink sm:px-12 lg:mx-auto lg:px-14" style={{ background: 'var(--b900)' }}/* COLOR CHANGE */>
    <div className="eyebrow" style={{ color: 'var(--b200)' }}>Your next project starts with a conversation</div>
    <h2 className="display my-16 text-[clamp(3rem,10vw,8rem)]" style={{ color: 'var(--b50)' }}>Something<br />on your mind?</h2>
    <button className="focus-ring flex h-40 w-40 flex-col items-center justify-center rounded-full border bg-transparent text-sm transition hover:scale-105 hover:bg-[var(--b700)] hover:text-[var(--b50)]" onClick={() => dialog.current?.showModal()} style={{ borderColor: 'var(--b900)', color: 'var(--b50)' }}>
      Let's make<br />it happen<br /><ArrowUpRight size={16} />
    </button>
    <div className="mt-10 flex flex-wrap justify-between gap-3 text-[13px]" style={{ color: 'var(--b100)' }}>
      <span>New ideas welcome.<br />Impossible ones, especially.</span>
      <span className="text-right">Reply within 24h.<br />No bots, just humans.</span>
    </div>
  </section>
  <dialog ref={dialog} className="fixed inset-0 z-50 max-w-lg mx-auto my-auto rounded-2xl border p-0" style={{ borderColor: 'var(--b800)', background: 'var(--b800)' }} onClick={(e) => { if (e.currentTarget === e.target) dialog.current?.close(); }}>
    <form onSubmit={handleSubmit(submit)} className="p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="display text-2xl" style={{ color: 'var(--b50)' }}>Get in touch</h3>
        <button type="button" onClick={() => dialog.current?.close()} className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border transition hover:bg-[var(--b700)]" style={{ borderColor: 'var(--b800)', color: 'var(--b100)' }}><X size={20} /></button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="block mb-1.5 text-sm font-medium" style={{ color: 'var(--b100)' }}>Name</label>
          <input {...register("name", { required: true })} className="focus-ring w-full rounded-xl border bg-[var(--b900)] px-4 py-3 transition focus:border-[var(--b500)]" placeholder="Your name" style={{ borderColor: 'var(--b800)', color: 'var(--b50)' }} />
        </div>
        <div>
          <label className="block mb-1.5 text-sm font-medium" style={{ color: 'var(--b100)' }}>Email</label>
          <input {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} className="focus-ring w-full rounded-xl border bg-[var(--b900)] px-4 py-3 transition focus:border-[var(--b500)]" placeholder="you@company.com" type="email" style={{ borderColor: 'var(--b800)', color: 'var(--b50)' }} />
        </div>
        <div>
          <label className="block mb-1.5 text-sm font-medium" style={{ color: 'var(--b100)' }}>Phone</label>
          <input {...register("phone")} className="focus-ring w-full rounded-xl border bg-[var(--b900)] px-4 py-3 transition focus:border-[var(--b500)]" placeholder="+94 XX XXXXXXX" type="tel" style={{ borderColor: 'var(--b800)', color: 'var(--b50)' }} />
        </div>
        <div className="sm:col-span-2">
          <label className="block mb-1.5 text-sm font-medium" style={{ color: 'var(--b100)' }}>Message</label>
          <textarea {...register("message", { required: true })} rows={4} className="focus-ring w-full rounded-xl border bg-[var(--b900)] px-4 py-3 transition focus:border-[var(--b500)] resize-none" placeholder="What are you building?" style={{ borderColor: 'var(--b800)', color: 'var(--b50)' }} />
        </div>
      </div>
      <input {...register("botcheck")} type="hidden" />
      <div className="mt-6 flex items-center gap-3">
        <button type="submit" className="fill-btn focus-ring flex-1 justify-center">Send message <ArrowUpRight size={16} /></button>
      </div>
      {status && <p className="mt-4 text-sm" style={{ color: 'var(--b300)' }} role="status">{status}</p>}
    </form>
  </dialog></>; 
}