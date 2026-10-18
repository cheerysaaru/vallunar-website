"use client";

import { usePathname } from "next/navigation";
import SkipLink from "@/components/SkipLink";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function PersistentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      <SkipLink />
      <Navbar overlay={isHome} />
      <main id="main-content" tabIndex={-1} style={{ overflow: "visible" }}>
        {children}
      </main>
      <Footer />
      <WhatsAppFloat />
      <CookieConsentBanner />
    </>
  );
}