"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import PageTransition from "@/components/PageTransition";

export default function PersistentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      <Navbar overlay={isHome} />
      <main id="main-content" style={{ overflow: "visible" }}>
        {children}
      </main>
      <Footer />
      <CookieConsentBanner />
      <PageTransition />
    </>
  );
}