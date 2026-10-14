import type { MetadataRoute } from "next";
import { site } from "@/lib/data";
export default function sitemap(): MetadataRoute.Sitemap { return [{ url: site.domain, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }, { url: `${site.domain}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 }, { url: `${site.domain}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 }]; }
