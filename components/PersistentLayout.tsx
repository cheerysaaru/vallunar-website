"use client";

import { usePathname } from "next/navigation";
import SkipLink from "@/components/SkipLink";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UtmCapture from "@/components/UtmCapture";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import BackToTop from "@/components/BackToTop";
import ScrollProgress from "@/components/ScrollProgress";

export default function PersistentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      <SkipLink />
      <ScrollProgress />
      <UtmCapture />
      <Navbar overlay={isHome} />
      <main id="main-content" tabIndex={-1} style={{ overflow: "visible" }}>
        {children}
      </main>
      <Footer />
      <BackToTop />
      <CookieConsentBanner />
    </>
  );
}