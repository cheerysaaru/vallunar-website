import { MessageCircle } from "lucide-react";
import { site } from "@/lib/data";
export default function WhatsAppButton() { return <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer" aria-label="Chat with Vallunar on WhatsApp" className="focus-ring fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"><MessageCircle size={25} /></a>; }
