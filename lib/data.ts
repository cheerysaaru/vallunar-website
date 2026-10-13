import { AppWindow, Boxes, Cpu, Database, MessageSquare, ShoppingCart } from "lucide-react";

export const site = {
  name: "Vallunar",
  legalName: "Vallunar Groups (PVT) LTD",
  tagline: "Independent minds. Shared ambition.",
  description: "Affordable, reliable and scalable technology. Websites, software and systems that actually work.",
  location: "Jaffna, Sri Lanka",
  founded: "2023",
  phone: "[PHONE]",
  email: "[EMAIL]",
  whatsapp: "94XXXXXXXXX",
  domain: "https://vallunar.com",
  linkedIn: "https://www.linkedin.com/company/vallunar-groups-pvt-ltd",
  address: "Jaffna, Northern Province 44000, Sri Lanka"
};

export const navigation = [
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "Why us", href: "#why" },
  { label: "Contact", href: "#cta" }
];

export const services = [
  { title: "Website Development", description: "Fast, user-friendly sites and e-commerce stores.", icon: AppWindow, span: "wide" },
  { title: "Custom Software", description: "Scalable systems built around your operations, from small tools to enterprise platforms.", icon: Cpu, span: "tall" },
  { title: "Android Apps", description: "Mobile apps for your customers.", icon: Boxes, span: "normal" },
  { title: "Hardware & IT Infrastructure", description: "Quality computer hardware and complete IT setups for businesses and individuals.", icon: Database, span: "wide" },
  { title: "POS Systems", description: "Billing and inventory for shops.", icon: ShoppingCart, span: "normal" }
];

export const products = [
  { name: "txtmsg.lk", category: "Messaging", headline: "Reach everyone.", description: "SMS gateway for businesses, schools and service providers: bulk SMS, transactional and promotional messages, API integration, scheduling, delivery reports.", tone: "light" },
  { name: "ASIT POS", category: "Point of sale", headline: "Run the counter.", description: "Customizable billing system for retail and service businesses: inventory management, sales tracking, invoicing, reporting.", tone: "dark" },
  { name: "Your idea", category: "Custom", headline: "Built for you.", description: "Tell us what your business needs and we will build it. Start a conversation.", tone: "blue" }
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
