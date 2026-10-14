"use client";
import Image from "next/image";
import { navigation, site } from "@/lib/data";

export default function Footer() {
  const clearCookieChoice = () => {
    try {
      localStorage.removeItem("vallunar-cookie-decided");
      localStorage.removeItem("vallunar-cookie-consent");
      window.location.reload();
    } catch {
      /* storage unavailable */
    }
  };

  return (
    <footer className="bg-[var(--navy-darker)] text-white">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-6 py-14 lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <a href="#top" className="focus-ring flex items-center gap-3" aria-label="Back to top">
            <Image src="/brand-mark.svg" alt="" width={8} height={22} />
            <span className="text-lg font-medium tracking-[.2em] text-white">VALLUNAR</span>
          </a>
          <p className="mt-4 max-w-[30ch] text-base text-white/75">{site.tagline}</p>
          <p className="mt-2 max-w-[34ch] text-sm text-white/65">{site.legalName} · {site.location}</p>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="eyebrow mb-4" style={{ color: "rgba(255,255,255,0.65)" }}>Site</h2>
          <ul className="space-y-2 text-base">
            {navigation.map((item) => (
              <li key={item.href}>
                <a className="focus-ring text-white/80 underline-offset-4 hover:text-white hover:underline" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow mb-4" style={{ color: "rgba(255,255,255,0.65)" }}>Contact</h2>
          <ul className="space-y-2 text-base text-white/80">
            <li><a className="focus-ring hover:text-white" href={`mailto:${site.email}`}>{site.email}</a></li>
            <li><a className="focus-ring hover:text-white" href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></li>
            <li><a className="focus-ring hover:text-white" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
            <li className="text-white/70">{site.address}</li>
          </ul>
        </div>

        <div>
          <h2 className="eyebrow mb-4" style={{ color: "rgba(255,255,255,0.65)" }}>Social</h2>
          <ul className="space-y-2 text-base">
            <li><a className="focus-ring text-white/80 hover:text-white" href={site.linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a className="focus-ring text-white/80 hover:text-white" href={site.instagram} target="_blank" rel="noopener noreferrer">[REPLACE: Instagram]</a></li>
            <li><a className="focus-ring text-white/80 hover:text-white" href={site.facebook} target="_blank" rel="noopener noreferrer">[REPLACE: Facebook]</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 px-6 py-6 text-sm text-white/70 lg:px-8">
          <span>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</span>
          <button type="button" onClick={clearCookieChoice} className="focus-ring text-sm text-white/75 underline underline-offset-4 hover:text-white">
            Cookie Settings
          </button>
        </div>
      </div>
    </footer>
  );
}
