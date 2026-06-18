/**
 * Arama motoru indeksleme yapılandırması — Google, Bing, IndexNow.
 * Doğrulama kodları Vercel ortam değişkenlerinden okunur (docs/10-arama-motoru-indeksleme.md).
 */
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

/** IndexNow anahtarı — public/{key}.txt dosyasıyla eşleşmeli */
export const INDEXNOW_KEY =
  process.env.INDEXNOW_KEY ?? "a8f3c2e1b9d0475682acf1e03b4d1597";

export const indexingConfig = {
  siteUrl: siteConfig.url,
  sitemapUrl: `${siteConfig.url}/sitemap.xml`,
  robotsUrl: `${siteConfig.url}/robots.txt`,
  llmsUrl: `${siteConfig.url}/llms.txt`,
  indexNow: {
    key: INDEXNOW_KEY,
    keyFileUrl: `${siteConfig.url}/${INDEXNOW_KEY}.txt`,
    endpoints: [
      "https://api.indexnow.org/indexnow",
      "https://www.bing.com/indexnow",
    ] as const,
  },
  searchConsole: {
    google: "https://search.google.com/search-console",
    bing: "https://www.bing.com/webmasters",
  },
} as const;

export function buildSearchVerificationMetadata(): Pick<
  Metadata,
  "verification"
> {
  const google = process.env.GOOGLE_SITE_VERIFICATION?.trim();
  const bing = process.env.BING_MSVALIDATE?.trim();
  const yandex = process.env.YANDEX_VERIFICATION?.trim();

  if (!google && !bing && !yandex) {
    return {};
  }

  const other: Record<string, string> = {};
  if (bing) other["msvalidate.01"] = bing;
  if (yandex) other["yandex-verification"] = yandex;

  return {
    verification: {
      ...(google ? { google } : {}),
      ...(Object.keys(other).length > 0 ? { other } : {}),
    },
  };
}
