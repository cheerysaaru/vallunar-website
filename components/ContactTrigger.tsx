"use client";
import { ArrowUpRight } from "lucide-react";

type Props = { children?: React.ReactNode; className?: string };
export default function ContactTrigger({ children = <>Contact Us <ArrowUpRight size={16} /></>, className = "" }: Props) {
  return <button type="button" className={className} onClick={() => window.dispatchEvent(new Event("vallunar:open-contact"))}>{children}</button>;
}
