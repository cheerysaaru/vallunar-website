import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/data";

const PAGE_TITLE = "About Us";
const PAGE_DESCRIPTION =
  "Learn about Vallunar Groups — our story, our team, and our mission to deliver affordable, reliable technology that works.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: `${PAGE_TITLE} — Vallunar Groups`,
    description: PAGE_DESCRIPTION,
    url: `${site.domain}/about`,
    siteName: site.name,
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "About Vallunar Groups" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PAGE_TITLE} — Vallunar Groups`,
    description: PAGE_DESCRIPTION,
    images: ["/og-image.svg"],
  },
};

const founders = [
  {
    name: "Sasitharan Akilavan",
    role: "Director",
    education: "B.Eng Software Engineering (Ongoing)",
    experience: "5+ years in IT & Business Solutions",
    tags: ["ERP Systems", "Business Solutions", "IT Consulting"],
    quote: "Empowering businesses through innovative digital solutions and reliable communication.",
    photo: "/founders/sasitharan.jpg",
    initials: "SA",
  },
  {
    name: "Thankautham Velkaja",
    role: "Director and Co-Founder",
    education: "B.Eng Software Engineering (Ongoing)",
    experience: "5+ years in Software Engineering",
    tags: ["ERP Implementation", "Business Strategy", "IT Solutions"],
    quote: "We bridge the gap between technology and business growth with efficient SMS integration.",
    photo: "/founders/thankautham.jpg",
    initials: "TV",
  },
];

function FounderCard({ founder }: { founder: typeof founders[0] }) {
  const hasPhoto = founder.photo && founder.photo !== "/founders/sasitharan.jpg" && founder.photo !== "/founders/thankautham.jpg";
  return (
    <article className="group flex flex-col sm:flex-row gap-6 items-start sm:items-center p-6 rounded-[24px] border border-[var(--border-light)] bg-white transition hover:-translate-y-1 hover:border-[var(--mid-blue)] hover:shadow-lg">
      <div className="relative flex-shrink-0 w-[112px] h-[112px] rounded-xl overflow-hidden bg-[var(--light-tint)]">
        {hasPhoto ? (
          <img src={founder.photo} alt={founder.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--mid-blue)] font-bold text-3xl">
            {founder.initials}
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-2xl font-semibold text-[var(--text-dark)]">{founder.name}</h3>
        <p className="mt-1 text-base font-medium" style={{ color: "var(--mid-blue)" }}>{founder.role}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {founder.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--light-tint)]" style={{ color: "var(--mid-blue)" }}>
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4">
          <p className="text-sm leading-6" style={{ color: "var(--text-muted)" }}>{founder.education}</p>
          <p className="text-sm leading-6" style={{ color: "var(--text-muted)" }}>{founder.experience}</p>
        </div>
        <blockquote className="mt-4 pl-4 border-l-2 border-[var(--mid-blue)] bg-[var(--light-tint)] p-4 rounded-r-xl relative">
          <span className="absolute -left-3 -top-2 text-5xl leading-none text-[var(--mid-blue)] opacity-30">"</span>
          <p className="text-base leading-7 relative z-10" style={{ color: "var(--text-dark)" }}>"{founder.quote}"</p>
        </blockquote>
      </div>
    </article>
  );
}

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <section id="top" className="relative isolate grid min-h-[60vh] place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_40%,var(--navy-dark)_0%,var(--navy)_45%,var(--navy-darker)_100%)] text-center px-6 py-20">
        <div className="relative z-10 max-w-3xl">
          <h1 className="display text-[clamp(2.5rem,8vw,5rem)] text-white">
            About <span className="text-[var(--accent-cyan)]">Vallunar</span>
          </h1>
          <p className="mt-6 text-lg leading-8" style={{ color: "rgba(255,255,255,0.8)" }}>
            {site.description}
          </p>
        </div>
      </section>

      {/* What We Do */}
      <Reveal>
      <section id="about" className="mx-auto max-w-[1240px] px-6 py-24 lg:px-8">
        <div className="eyebrow mb-5">What we do</div>
        <h2 className="display max-w-3xl text-5xl text-[var(--mid-blue)] sm:text-6xl">One team.<br />Every digital need.</h2>
        <p className="mt-8 max-w-2xl text-lg leading-8" style={{ color: "var(--text-muted)" }}>
          We're a software and digital solutions company based in Jaffna, Sri Lanka. Since 2023, we've been building
          websites, custom software, mobile apps, and IT infrastructure for businesses that need technology that just works.
          No fluff, no over-engineering — just reliable systems that help you grow.
        </p>
      </section>
      </Reveal>

      {/* Our Principles */}
      <Reveal>
      <section id="why-us" className="mx-auto max-w-[1180px] px-6 py-24 lg:px-8">
        <div className="eyebrow mb-5" style={{ color: "var(--mid-blue)" }}>Good solutions. Local support.</div>
        <h2 className="display text-5xl text-[var(--text-dark)] sm:text-6xl mb-16">Big thinking.<br />Short feedback loops.</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Understand your business", body: "We start by learning how your business runs, so what we build is affordable, reliable and fits your needs." },
            { title: "Build it, show it early", body: "You see working progress early, so changes are quick and the final product fits how you actually work." },
            { title: "Support it after launch", body: "Local support from our team in Jaffna keeps your systems running as your business grows." },
          ].map((principle, index) => (
            <article key={index} className="rounded-[24px] border border-[var(--border-light)] bg-[var(--light-tint)] p-7 hover:border-[var(--mid-blue)] transition">
              <h3 className="text-xl font-semibold text-[var(--text-dark)]">{principle.title}</h3>
              <p className="mt-3 leading-7" style={{ color: "var(--text-muted)" }}>{principle.body}</p>
            </article>
          ))}
        </div>
      </section>
      </Reveal>

      {/* Meet Our Founders */}
      <Reveal>
      <section id="founders" className="mx-auto max-w-[1180px] px-6 py-24 lg:px-8">
        <div className="eyebrow mb-5" style={{ color: "var(--mid-blue)" }}>Meet our founders</div>
        <h2 className="display text-5xl text-[var(--text-dark)] sm:text-6xl mb-6">Leadership that listens.</h2>
        <p className="mb-12 max-w-2xl text-lg leading-8" style={{ color: "var(--text-muted)" }}>
          Our founders bring together deep technical expertise and real-world business experience.
          They're hands-on leaders who still write code, talk to customers, and care about every project we ship.
        </p>
        <div className="grid gap-8 sm:grid-cols-2">
          {founders.map((founder) => (
            <FounderCard key={founder.name} founder={founder} />
          ))}
        </div>
        <p className="mt-10 text-center text-sm" style={{ color: "var(--text-light)" }}>
          Founder photos are placeholders. Replace <code>/public/founders/sasitharan.jpg</code> and <code>/public/founders/thankautham.jpg</code> with actual photos.
        </p>
      </section>
      </Reveal>

      {/* Stats */}
      <Reveal>
      <section className="mx-auto max-w-[1180px] px-6 pb-24 lg:px-8">
        <div className="grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
          <div>
            <div className="text-4xl font-light text-[var(--mid-blue)] sm:text-5xl">2023</div>
            <div className="eyebrow mt-2">Founded</div>
          </div>
          <div>
            <div className="text-4xl font-light text-[var(--mid-blue)] sm:text-5xl">2</div>
            <div className="eyebrow mt-2">Core products</div>
          </div>
          <div>
            <div className="text-4xl font-light text-[var(--mid-blue)] sm:text-5xl">Jaffna</div>
            <div className="eyebrow mt-2">Based in the North</div>
          </div>
          <div>
            <div className="text-4xl font-light text-[var(--mid-blue)] sm:text-5xl">685+</div>
            <div className="eyebrow mt-2">LinkedIn followers</div>
          </div>
        </div>
      </section>
      </Reveal>

      </main>
  );
}