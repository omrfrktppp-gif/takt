/**
 * İndeksleme denetimi — sitemap URL'leri ve bilinen legacy yönlendirmeler.
 * Kullanım: node scripts/audit-indexing.mjs [baseUrl]
 */
import { appendFileSync } from "node:fs";
import { resolve } from "node:path";

const base = process.argv[2] ?? "https://takt.tr";
const logPath = resolve(process.cwd(), "debug-022eed.log");

const legacyUrls = [
  `${base}/?b=hizmetler`,
  `${base}/?b=referanslar`,
  `${base}/?b=kapasitemiz&p=intro`,
  `${base}/?b=xyz`,
  `${base}/kaynaklar/baslangic-kontrol-listesi`,
  `http://takt.tr/`,
  `https://www.takt.tr/hizmetler`,
];

function log(entry) {
  appendFileSync(logPath, `${JSON.stringify(entry)}\n`);
}

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function probe(url) {
  const chain = [];
  let current = url;
  for (let i = 0; i < 8; i++) {
    const response = await fetch(current, { method: "HEAD", redirect: "manual" });
    chain.push({ url: current, status: response.status });
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (!location) break;
      current = new URL(location, current).href;
      continue;
    }
    const robots = response.headers.get("x-robots-tag");
    return { finalUrl: current, chain, robots };
  }
  return { finalUrl: current, chain, robots: null, error: "redirect-loop" };
}

const sitemapRes = await fetch(`${base}/sitemap.xml`);
const sitemapXml = await sitemapRes.text();
const sitemapUrls = extractLocs(sitemapXml);

log({
  sessionId: "022eed",
  runId: "indexing-audit",
  hypothesisId: "H0",
  location: "audit-indexing.mjs",
  message: "sitemap loaded",
  data: { count: sitemapUrls.length, base },
  timestamp: Date.now(),
});

for (const url of legacyUrls) {
  const result = await probe(url);
  log({
    sessionId: "022eed",
    runId: "indexing-audit",
    hypothesisId: "H-legacy",
    location: "audit-indexing.mjs",
    message: "legacy redirect probe",
    data: { input: url, ...result },
    timestamp: Date.now(),
  });
}

let bad = 0;
for (const url of sitemapUrls) {
  const result = await probe(url);
  const ok = result.chain.at(-1)?.status === 200 && !result.error;
  if (!ok) bad += 1;
  if (!ok || result.chain.length > 1) {
    log({
      sessionId: "022eed",
      runId: "indexing-audit",
      hypothesisId: ok ? "H-chain" : "H-sitemap",
      location: "audit-indexing.mjs",
      message: ok ? "sitemap url redirect chain" : "sitemap url failed",
      data: { input: url, ...result },
      timestamp: Date.now(),
    });
  }
}

log({
  sessionId: "022eed",
  runId: "indexing-audit",
  hypothesisId: "H-summary",
  location: "audit-indexing.mjs",
  message: "audit complete",
  data: { sitemapTotal: sitemapUrls.length, sitemapBad: bad },
  timestamp: Date.now(),
});

console.log(`Audit complete: ${sitemapUrls.length} sitemap URLs, ${bad} issues. Log: ${logPath}`);
