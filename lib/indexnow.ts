import { getStaticSitemapEntries } from "@/lib/sitemap-routes";
import { indexingConfig } from "@/lib/indexing";
import { siteConfig } from "@/lib/site";

type IndexNowPayload = {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
};

function siteHost(): string {
  return new URL(siteConfig.url).host;
}

export function buildIndexNowPayload(urls?: string[]): IndexNowPayload {
  const urlList =
    urls ??
    getStaticSitemapEntries().map((entry) => `${siteConfig.url}${entry.path}`);

  return {
    host: siteHost(),
    key: indexingConfig.indexNow.key,
    keyLocation: indexingConfig.indexNow.keyFileUrl,
    urlList,
  };
}

export async function submitToIndexNow(urls?: string[]): Promise<{
  ok: boolean;
  results: { endpoint: string; status: number }[];
}> {
  const payload = buildIndexNowPayload(urls);
  const results: { endpoint: string; status: number }[] = [];

  for (const endpoint of indexingConfig.indexNow.endpoints) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });
    results.push({ endpoint, status: response.status });
  }

  const ok = results.every(
    (result) => result.status >= 200 && result.status < 300,
  );

  return { ok, results };
}
