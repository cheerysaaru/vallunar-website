import type { Metadata } from "next";
import { Inter, DM_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/data";
import PersistentLayout from "@/components/PersistentLayout";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-plus-jakarta", display: "swap", weight: ["400", "500", "600", "700"] });
const dmMono = DM_Mono({ subsets: ["latin"], variable: "--font-dm-mono", display: "swap", weight: "400" });

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: { default: "Vallunar Groups | Technology that works", template: "%s | Vallunar Groups" },
  description: site.description,
  openGraph: { title: "Vallunar Groups", description: site.description, url: site.domain, siteName: site.name, type: "website", images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Vallunar Groups — technology that works" }] },
  twitter: { card: "summary_large_image", title: "Vallunar Groups", description: site.description, images: ["/og-image.svg"] },
  icons: { icon: "/favicon.svg" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = { "@context": "https://schema.org", "@type": "LocalBusiness", name: site.legalName, url: site.domain, telephone: site.phone, email: site.email, address: { "@type": "PostalAddress", addressLocality: "Jaffna", addressCountry: "LK" }, areaServed: "Sri Lanka", description: site.description };
  return (
    <html lang="en">
      <body className={`${inter.variable} ${plusJakarta.variable} ${dmMono.variable}`}>
        <PersistentLayout>{children}</PersistentLayout>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
