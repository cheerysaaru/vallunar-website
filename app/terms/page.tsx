import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/data";

const PAGE_TITLE = "Terms of Service";
const PAGE_DESCRIPTION =
  "Terms and conditions for using Vallunar Groups website and services.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: `${PAGE_TITLE} — Vallunar Groups`,
    description: PAGE_DESCRIPTION,
    url: `${site.domain}/terms`,
    siteName: site.name,
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Vallunar Groups Terms of Service" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PAGE_TITLE} — Vallunar Groups`,
    description: PAGE_DESCRIPTION,
    images: ["/og-image.svg"],
  },
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: [
      `By accessing and using this website (${site.domain}) and our services, you agree to be bound by these Terms of Service ("Terms"). If you do not agree with any part of these Terms, you may not use our website or services.`,
    ],
  },
  {
    title: "2. Services",
    body: [
      "Vallunar Groups provides software development, website development, mobile application development, IT consultancy, hardware solutions, POS systems, and SMS gateway services (collectively, the \"Services\").",
      "The specific scope, timeline, and deliverables for each project are defined in a separate Service Agreement or Statement of Work.",
      "We reserve the right to modify, suspend, or discontinue any Service at our discretion, with reasonable notice to affected clients.",
    ],
  },
  {
    title: "3. Client Responsibilities",
    body: [
      "You agree to provide accurate, complete, and up-to-date information required for us to deliver the Services.",
      "You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.",
      "You will not use our Services for any unlawful purpose or in any way that could damage, disable, or impair our systems.",
    ],
  },
  {
    title: "4. Intellectual Property",
    body: [
      "All content, code, designs, and materials created by Vallunar Groups in the course of providing Services remain our property until full payment is received, unless otherwise agreed in writing.",
      "Upon full payment, ownership of custom-developed deliverables transfers to the client, subject to any third-party licenses.",
      "Vallunar Groups retains the right to use anonymized project summaries for marketing and portfolio purposes.",
      "Our brand names, logos, and trademarks (including \"Vallunar\", \"txtmsg.lk\", \"ASIT POS\") are our exclusive property.",
    ],
  },
  {
    title: "5. Confidentiality",
    body: [
      "Both parties agree to keep confidential all non-public information shared during the engagement, including business plans, technical specifications, and customer data.",
      "This obligation survives termination of any agreement for a period of 3 years.",
    ],
  },
  {
    title: "6. Limitation of Liability",
    body: [
      "To the maximum extent permitted by law, Vallunar Groups shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities.",
      "Our total liability for any claim arising out of or related to these Terms shall not exceed the total fees paid by you in the 12 months preceding the claim.",
    ],
  },
  {
    title: "7. Warranties and Disclaimers",
    body: [
      "We warrant that our Services will be performed in a professional and workmanlike manner consistent with industry standards.",
      "Except as expressly stated, we make no warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, or non-infringement.",
      "We do not warrant that our Services will be uninterrupted, error-free, or free from security vulnerabilities.",
    ],
  },
  {
    title: "8. Payment Terms",
    body: [
      "Payment terms are specified in each Service Agreement or Statement of Work.",
      "Late payments may incur interest at 1.5% per month (or the maximum permitted by law).",
      "We reserve the right to suspend Services for overdue accounts.",
    ],
  },
  {
    title: "9. Termination",
    body: [
      "Either party may terminate a Service Agreement with 30 days written notice.",
      "We may terminate immediately for material breach, non-payment, or unlawful use.",
      "Upon termination, you must pay for all Services rendered up to the termination date.",
    ],
  },
  {
    title: "10. Governing Law",
    body: [
      `These Terms shall be governed by and construed in accordance with the laws of Sri Lanka. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in Jaffna, Sri Lanka.`,
    ],
  },
  {
    title: "11. Changes to Terms",
    body: [
      "We may update these Terms from time to time. The latest version will be published on this page with an updated date.",
      "Continued use of our website or Services after changes constitutes acceptance of the new Terms.",
    ],
  },
  {
    title: "12. Contact",
    body: [
      `For questions about these Terms, contact us at ${site.email} or ${site.phone}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <main>
      <section id="top" className="mx-auto max-w-[1240px] px-6 pb-16 pt-32 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-9">
          <ol className="flex flex-wrap items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
            <li>
              <Link href="/" className="focus-ring rounded transition" style={{ color: "var(--text-muted)" }}>Home</Link>
            </li>
            <li aria-hidden="true" style={{ color: "var(--text-light)" }}> / </li>
            <li aria-current="page" style={{ color: "var(--text-dark)" }}>Terms of Service</li>
          </ol>
        </nav>

        <header className="max-w-3xl">
          <h1 className="display text-5xl text-[var(--text-dark)] sm:text-6xl">{PAGE_TITLE}</h1>
          <p className="mt-4 text-sm" style={{ color: "var(--text-muted)" }}>Last updated: October 2026</p>
        </header>

        <div className="mt-14 max-w-3xl space-y-10">
          {sections.map((section) => (
            <section key={section.title} aria-labelledby={`terms-${section.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`}>
              <h2
                id={`terms-${section.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`}
                className="mb-3 text-xl font-medium text-[var(--text-dark)]"
              >
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-7" style={{ color: "var(--text-muted)" }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      </main>
  );
}