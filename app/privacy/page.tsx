import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/data";

/**
 * Sample Privacy Policy — plain-language template for Vallunar Groups.
 * Review with a legal professional before publishing as final.
 */

const PAGE_TITLE = "Privacy Policy";
const PAGE_DESCRIPTION =
  "How Vallunar Groups collects, uses and protects your information when you use our website and contact services.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: `${PAGE_TITLE} — Vallunar Groups`,
    description: PAGE_DESCRIPTION,
    url: `${site.domain}/privacy`,
    siteName: site.name,
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Vallunar Groups Privacy Policy" }],
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
    title: "1. Who we are",
    body: [
      `This website is operated by ${site.legalName} ("Vallunar", "we", "us"), a software and digital solutions company based in ${site.location}. Questions about this policy can be sent to ${site.email}.`,
    ],
  },
  {
    title: "2. Information we collect",
    body: [
      "When you submit the contact form, we collect the details you provide: your name, business email, phone number (optional), company or organization, area of interest, and your message.",
      "We also automatically receive limited technical information such as your IP address, browser type and the pages you visit, through standard server logs.",
    ],
  },
  {
    title: "3. How we use your information",
    body: [
      "We use the information you send us only to:",
      "• Respond to your enquiry and prepare quotations or proposals",
      "• Communicate with you about a project or partnership",
      "• Send occasional updates if you explicitly opted in via the marketing checkbox",
      "• Keep the website secure and prevent spam",
    ],
  },
  {
    title: "4. Cookies and analytics",
    body: [
      "Our website uses only essential technical cookies required for the site to function. We may use privacy-friendly, aggregated analytics to understand how visitors use the site. We do not use advertising or cross-site tracking cookies.",
    ],
  },
  {
    title: "5. Who we share data with",
    body: [
      "We do not sell your personal information. We share it only with the service providers needed to run this website and respond to you — for example our email delivery provider (Resend) and hosting infrastructure. These providers process data only on our instructions.",
    ],
  },
  {
    title: "6. How long we keep it",
    body: [
      "Enquiry emails and any records we keep from them are retained only as long as needed to handle your request and meet legal or accounting requirements, then deleted.",
    ],
  },
  {
    title: "7. Data security",
    body: [
      "We protect submissions with HTTPS encryption, server-side validation, spam protection and rate limiting. No method of transmission is 100% secure, but we apply reasonable technical measures appropriate for a small business website.",
    ],
  },
  {
    title: "8. Your rights",
    body: [
      "You can ask us at any time what personal data we hold about you, request a correction, or ask us to delete it. Write to us at the email below and we will respond within a reasonable time.",
    ],
  },
  {
    title: "9. Children's privacy",
    body: [
      "This website is intended for businesses and professionals. We do not knowingly collect information from children.",
    ],
  },
  {
    title: "10. Changes to this policy",
    body: [
      "We may update this policy from time to time. The latest version will always be published on this page with an updated date.",
    ],
  },
  {
    title: "11. Contact",
    body: [
      `For any privacy-related questions, contact us at ${site.email} or ${site.phone}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div>
      <section id="top" className="mx-auto max-w-[1240px] px-6 pb-16 pt-32 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-9">
          <ol className="flex flex-wrap items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
            <li>
              <Link href="/" className="focus-ring rounded transition" style={{ color: "var(--text-muted)" }}>Home</Link>
            </li>
            <li aria-hidden="true" style={{ color: "var(--text-light)" }}> / </li>
            <li aria-current="page" style={{ color: "var(--text-dark)" }}>Privacy Policy</li>
          </ol>
        </nav>

        <header className="max-w-3xl">
          <h1 className="display text-5xl text-[var(--text-dark)] sm:text-6xl">{PAGE_TITLE}</h1>
          <p className="mt-4 text-sm" style={{ color: "var(--text-muted)" }}>Last updated: October 2026</p>
          <p className="mt-6 text-base leading-7" style={{ color: "var(--text-muted)" }}>
            This policy explains what happens to your information when you contact us or use this website. It is
            written in plain language on purpose.
          </p>
        </header>

        <div className="mt-14 max-w-3xl space-y-10">
          {sections.map((section) => (
            <section key={section.title} aria-labelledby={`privacy-${section.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`}>
              <h2
                id={`privacy-${section.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`}
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

        <div className="mt-16 max-w-3xl rounded-2xl border border-[var(--border-light)] bg-[var(--navy)] p-6 text-sm leading-6" style={{ color: "rgba(255,255,255,0.65)" }}>
          This is a sample policy provided as a starting point. Have it reviewed by a legal professional before
          relying on it as your final Privacy Policy.
        </div>
        <div className="mt-8 p-6 rounded-2xl border border-[var(--mid-blue)] bg-[var(--light-tint)] text-sm leading-6" style={{ color: "var(--mid-blue)" }}>
          <p className="mb-2">We use essential technical cookies to make this website functional.</p>
          <p className="mb-2">You can manage your cookie preferences via the banner at the bottom of any page.</p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>Essential cookies cannot be disabled as they enable core functionality like security and navigation.</p>
        </div>
      </section>

      </div>
  );
}
