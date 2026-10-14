import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Products from "@/components/Products";
import HowWeWork from "@/components/HowWeWork";
import CaseStudies from "@/components/CaseStudies";
import Stats from "@/components/Stats";
import Faq from "@/components/Faq";
import PlusSocialButton from "@/components/PlusSocialButton";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <Products />
      <HowWeWork />
      <CaseStudies />
      <About />
      <Stats />
      <Faq />
      <PlusSocialButton />
    </main>
  );
}
