import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Products from "@/components/Products";
import WhyUs from "@/components/WhyUs";
import Stats from "@/components/Stats";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PlusSocialButton from "@/components/PlusSocialButton";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <section className="mx-auto max-w-[1240px] px-6 pb-12 lg:px-8 bg-white">
        <Services />
      </section>
      <Products />
      <WhyUs />
      <Stats />
      <Contact />
      <div className="overflow-hidden border-t border-line bg-white py-12">
        <div className="marquee whitespace-nowrap text-[clamp(3rem,9vw,7rem)] font-light tracking-[-.04em] text-transparent [-webkit-text-stroke:1.5px_#61A5C2]">
          Websites • Software • POS • SMS • Hardware • Websites • Software • POS • SMS • Hardware •
        </div>
      </div>
      <Footer />
      <PlusSocialButton />
    </main>
  );
}