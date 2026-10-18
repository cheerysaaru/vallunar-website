"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { parseUtmFromSearch, saveUtm } from "@/lib/utm";

/**
 * Captures UTM campaign parameters from the current URL and stores them in
 * sessionStorage so they can be attached to the contact form. Re-runs whenever
 * the pathname changes (client-side navigation) so UTMs on any landing page
 * are picked up.
 */
export default function UtmCapture() {
  const pathname = usePathname();

  useEffect(() => {
    const utm = parseUtmFromSearch(window.location.search);
    if (Object.keys(utm).length > 0) {
      saveUtm(utm);
    }
  }, [pathname]);

  return null;
}
