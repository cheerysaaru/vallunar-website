import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Products from "@/components/Products";
import HowWeWork from "@/components/HowWeWork";
import CaseStudies from "@/components/CaseStudies";
import Stats from "@/components/Stats";
import Faq from "@/components/Faq";
import Reveal from "@/components/Reveal";
export default function HomePage() {
  return (
    <div>
      <Hero />
      <Reveal><Services /></Reveal>
      <Reveal><Products /></Reveal>
      {/* HowWeWork drives its own scroll logic — no wrapper transform */}
      <HowWeWork />
      <Reveal><CaseStudies /></Reveal>
      <Reveal><About /></Reveal>
      <Reveal><Stats /></Reveal>
      <Reveal><Faq /></Reveal>
    </div>
  );
}
