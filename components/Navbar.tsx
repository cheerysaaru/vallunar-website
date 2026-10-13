"use client";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { navigation, site } from "@/lib/data";
import ContactTrigger from "./ContactTrigger";

export default function Navbar() {
  const [open, setOpen] = useState(false); const [solid, setSolid] = useState(false);
  useEffect(() => { const onScroll = () => setSolid(window.scrollY > 40); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  return <header className={`fixed inset-x-0 top-0 z-30 transition ${solid ? "bg-ink/90 shadow-lg backdrop-blur-md" : "bg-transparent"}`}><div className="mx-auto flex h-[76px] max-w-[1180px] items-center justify-between gap-6 px-6 lg:px-8"><a href="#top" className="focus-ring flex items-center gap-3" aria-label={`${site.name} home`}><Image src="/brand-mark.svg" alt="" width={10} height={28} priority /><span className="text-[19px] font-medium tracking-[.2em]">VALLUNAR</span></a><nav className={`${open ? "fixed inset-x-0 top-[76px] flex h-[calc(100vh-76px)] flex-col gap-6 bg-ink p-8 text-2xl" : "hidden md:flex md:items-center md:gap-8"} text-sm text-mist/75`} aria-label="Main navigation">{navigation.map((item) => <a key={item.href} className="focus-ring transition-colors hover:text-mist" href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}</nav><ContactTrigger className="focus-ring hidden items-center gap-2 rounded-full border border-mist/35 px-5 py-2.5 text-sm transition hover:border-mist hover:bg-mist/10 sm:flex">Contact Us <ArrowUpRight size={15} /></ContactTrigger><button className="focus-ring rounded-lg border border-mist/30 p-2 md:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>{open ? <X size={20} /> : <Menu size={20} />}</button></div></header>;
}
