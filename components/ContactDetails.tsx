/**
 * Professional contact info for /contact — email, socials and business hours.
 * Everything comes from lib/contact-config.ts; empty entries are not rendered.
 */
import { Clock, Mail, Phone } from "lucide-react";
import { contactConfig } from "@/lib/contact-config";

export default function ContactDetails() {
  const { contactEmail, contactPhone, socialLinks, businessHours } = contactConfig;
  const visibleSocials = socialLinks.filter((social) => social.url);
  const isEmailAddress = contactEmail.includes("@");
  const telHref = contactPhone ? `tel:${contactPhone.replace(/[^\d+]/g, "")}` : "";

  return (
    <section aria-labelledby="contact-details-heading" className="rounded-[24px] border border-[var(--border-light)] bg-white p-7 sm:p-9">
      <div className="eyebrow mb-4">Talk to us directly</div>
      <h2 id="contact-details-heading" className="display mb-7 text-3xl text-[var(--text-dark)] sm:text-4xl">
        Reach the team.
      </h2>

      <div className="grid gap-5 sm:grid-cols-2">
        {contactEmail && (
          <div className="rounded-2xl border border-[var(--border-light)] bg-[var(--light-tint)] p-5">
            <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--text-dark)] text-[var(--text-dark)]">
              <Mail size={16} aria-hidden="true" />
            </span>
            <div className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Business email</div>
            {isEmailAddress ? (
              <a href={`mailto:${contactEmail}`} className="focus-ring mt-1 block break-all text-sm transition" style={{ color: "var(--text-muted)" }}>
                {contactEmail}
              </a>
            ) : (
              <div className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>{contactEmail}</div>
            )}
          </div>
        )}

        {contactPhone && (
          <div className="rounded-2xl border border-[var(--border-light)] bg-[var(--light-tint)] p-5">
            <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--text-dark)] text-[var(--text-dark)]">
              <Phone size={16} aria-hidden="true" />
            </span>
            <div className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Business phone</div>
            <a href={telHref} className="focus-ring mt-1 block text-sm transition" style={{ color: "var(--text-muted)" }}>
              {contactPhone}
            </a>
          </div>
        )}

        {businessHours && (
          <div className="rounded-2xl border border-[var(--border-light)] bg-[var(--light-tint)] p-5">
            <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--text-dark)] text-[var(--text-dark)]">
              <Clock size={16} aria-hidden="true" />
            </span>
            <div className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Business hours</div>
            <div className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>{businessHours}</div>
          </div>
        )}

        {visibleSocials.length > 0 && (
          <div className="rounded-2xl border border-[var(--border-light)] bg-[var(--light-tint)] p-5 sm:col-span-2">
            <div className="mb-3 text-sm font-medium text-[var(--text-dark)]">Follow us</div>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {visibleSocials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring inline-flex items-center gap-1.5 text-sm transition" style={{ color: "var(--text-muted)" }}
                  >
                    {social.label}
                    <ArrowUpRightSmall />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

function ArrowUpRightSmall() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}