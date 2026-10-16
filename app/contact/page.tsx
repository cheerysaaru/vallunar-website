import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import EnquirySection from "@/components/EnquirySection";
import ContactDetails from "@/components/ContactDetails";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/data";

const PAGE_TITLE = "Contact Us";
const PAGE_DESCRIPTION =
  "Tell us about your project or question and we'll connect you with the right team. Software development, web and mobile apps, IT consultancy, branding and digital marketing.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: `${PAGE_TITLE} — Vallunar Groups`,
    description: PAGE_DESCRIPTION,
    url: `${site.domain}/contact`,
    siteName: site.name,
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Contact Vallunar Groups" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PAGE_TITLE} — Vallunar Groups`,
    description: PAGE_DESCRIPTION,
    images: ["/og-image.svg"],
  },
};

/**
 * Quick links — only targets that exist in this site are listed.
 * Missing (intentionally omitted so no broken links are shipped):
 *  - "Industries We Serve" — no such page/section exists
 *  - "Our Work" maps to the existing #products section (closest match)
 */
const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/case-studies" },
  { label: "Contact Us", href: "/contact", current: true },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export default function ContactPage() {
  return (
    <main>
      {/* Header: breadcrumb + centered heading */}
      <section id="top" className="mx-auto max-w-[1240px] px-6 pb-10 pt-32 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-9">
          <ol className="flex flex-wrap items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
            <li>
              <Link href="/" className="focus-ring rounded transition" style={{ color: "var(--text-muted)" }}>Home</Link>
            </li>
            <li aria-hidden="true" style={{ color: "var(--text-light)" }}> / </li>
            <li aria-current="page" style={{ color: "var(--text-dark)" }}>Contact Us</li>
          </ol>
        </nav>

        <div className="text-center">
          <h1 className="display text-5xl text-[var(--text-dark)] sm:text-6xl">{PAGE_TITLE}</h1>
          <p className="mx-auto mt-5 max-w-[540px] text-base leading-7" style={{ color: "var(--text-muted)" }}>
            Tell us about your project or question and we&apos;ll connect you with the right team.
          </p>
        </div>
      </section>

      {/* Enquiry cards + form */}
      <Reveal>
      <section aria-label="Contact form" className="mx-auto max-w-[1240px] px-6 pb-16 lg:px-8">
        <EnquirySection />
      </section>
      </Reveal>

      {/* Contact info + quick links */}
      <Reveal>
      <section className="mx-auto grid max-w-[1240px] gap-6 px-6 pb-24 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:px-8">
        <ContactDetails />

        <nav aria-labelledby="quick-links-heading" className="h-fit rounded-[24px] border border-[var(--border-light)] bg-[var(--navy)] p-7 sm:p-9">
          <div id="quick-links-heading" className="eyebrow mb-5" style={{ color: "rgba(255,255,255,0.7)" }}>Quick links</div>
          <ul className="flex flex-col gap-1">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={link.current ? "page" : undefined}
                  className="focus-ring flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition" style={{ color: "rgba(255,255,255,0.75)" }}
                >
                  {link.label}
                  <ArrowUpRight size={14} aria-hidden="true" style={{ color: "rgba(255,255,255,0.4)" }} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
      </Reveal>

      </main>
  );
}