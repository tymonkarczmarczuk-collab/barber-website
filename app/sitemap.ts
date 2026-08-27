import type { MetadataRoute } from "next";
import { site } from "@/lib/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...site.legal.map((page) => ({
      url: `${site.url}${page.href}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
