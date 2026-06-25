import type { MetadataRoute } from "next";
import { getStaticSitemapEntries } from "@/lib/sitemap-routes";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  return getStaticSitemapEntries().map((entry) => ({
    url: `${base}${entry.path}`,
    lastModified: entry.lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
