import { AppWindow, Boxes, Cpu, Database, ShoppingCart } from "lucide-react";

export const site = {
  name: "Vallunar",
  legalName: "Vallunar Groups (PVT) LTD",
  tagline: "Independent minds. Shared ambition.",
  description: "Websites, software and systems that actually work — built in Jaffna for businesses that need reliable, affordable technology.",
  location: "Jaffna, Sri Lanka",
  founded: "2023",
  phone: "+94 71 709 7166",
  email: "mail@vallunar.com",
  whatsapp: "94717097166",
  domain: "https://vallunar.com",
  linkedIn: "https://www.linkedin.com/company/vallunar-groups-pvt-ltd",
  facebook: "https://www.facebook.com/share/1Dih5Nt6V3/?mibextid=wwXIfr",
  address: "Jaffna, Northern Province 44000, Sri Lanka"
};

export const navigation = [
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "How we work", href: "/how-we-work" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Contact", href: "/contact" }
];

export const services = [
  { title: "Website Development", description: "Fast, user-friendly sites and online shops.", icon: AppWindow, span: "wide" },
  { title: "Custom Software", description: "Software built around how your business actually runs — from small internal tools to larger systems.", icon: Cpu, span: "tall" },
  { title: "Android Apps", description: "Mobile apps for your customers.", icon: Boxes, span: "normal" },
  { title: "Hardware & IT Infrastructure", description: "Quality computer hardware and complete IT setups for businesses and individuals.", icon: Database, span: "wide" },
  { title: "POS Systems", description: "Billing and inventory for shops.", icon: ShoppingCart, span: "normal" }
];

export const products = [
  {
    name: "txtmsg.lk",
    category: "SMS gateway",
    headline: "Reach everyone.",
    description: "SMS gateway for businesses, schools and service providers: bulk SMS, transactional and promotional messages, API integration, scheduling, delivery reports.",
    whoFor: "Businesses, schools and service providers that need to reach customers by SMS — bulk campaigns, appointment reminders, alerts and one-time codes.",
    features: ["Bulk SMS", "Transactional and promotional messaging", "API integration", "Scheduling", "Delivery reports"],
    tone: "light"
  },
  {
    name: "ASIT POS",
    category: "Point of sale",
    headline: "Run the counter.",
    description: "Customizable billing system for retail and service businesses: inventory management, sales tracking, invoicing, reporting.",
    whoFor: "Retail and service businesses that need billing, stock control and sales reports in one system at the counter.",
    features: ["Billing and invoicing", "Inventory management", "Sales tracking", "Reporting", "Configured for how your counter works"],
    tone: "dark"
  }
];

export const stats = [
  { value: "2023", label: "Founded" },
  { value: "2", label: "Core products" },
  { value: "Jaffna", label: "Based in the North" },
  { value: "685+", label: "LinkedIn followers" }
];

export const principles = [
  { title: "Understand your business", body: "We start by learning how your business runs, so what we build is affordable, reliable and fits your needs." },
  { title: "Build it, show it early", body: "You see working progress early, so changes are quick and the final product fits how you actually work." },
  { title: "Support it after launch", body: "Local support from our team in Jaffna keeps your systems running as your business grows." }
];

export const faqs = [
  {
    question: "What do you build?",
    answer: "Websites and online shops, custom business software, Android apps, POS billing systems, SMS tooling through txtmsg.lk, and hardware / IT setups. If it runs a part of your business, we can probably build or set it up."
  },
  {
    question: "Do you work with small businesses?",
    answer: "Yes. Most of our work is for small and medium businesses in Jaffna and across Sri Lanka. We scope the project to the budget you actually have, and we tell you plainly when something is not worth building yet."
  },
  {
    question: "How does a project work?",
    answer: "Three steps. We learn how your business runs. We build it and show you working software early, not at the end. Then we launch it and stay available for support — we are a local team in Jaffna, not a faceless ticket queue."
  },
  {
    question: "How do we start?",
    answer: "Send a message through the contact form, WhatsApp, email or phone. We reply within 24 hours. No bots, just humans."
  }
];

/*
 * PLACEHOLDER CASE STUDIES — no client names, numbers or results are published
 * until you supply and approve them. Replace both entries with real stories
 * (problem / what we built / result), or delete them and the home section.
 */
export const caseStudies = [
  {
    tag: "[REPLACE: client name or logo]",
    category: "[REPLACE: service or product used]",
    problem: "[REPLACE: the client's real problem, one or two sentences]",
    built: "[REPLACE: what Vallunar actually built for them]",
    result: "[REPLACE: the real, client-approved outcome — only if they allow it]"
  },
  {
    tag: "[REPLACE: client name or logo]",
    category: "[REPLACE: service or product used]",
    problem: "[REPLACE: the client's real problem, one or two sentences]",
    built: "[REPLACE: what Vallunar actually built for them]",
    result: "[REPLACE: the real, client-approved outcome — only if they allow it]"
  }
];
