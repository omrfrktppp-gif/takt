import { expect, test } from "@playwright/test";

const baseUrl = "https://takt.tr";
const pairedArticle = "uretime-yonelik-tasarim-dfm";

function sitemapLocations(xml: string): string[] {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

test("robots exposes search and answer-engine discovery rules", async ({ request }) => {
  const response = await request.get("/robots.txt");
  expect(response.status()).toBe(200);
  const robots = await response.text();

  expect(robots).toContain(`Sitemap: ${baseUrl}/sitemap.xml`);
  expect(robots).toContain("User-Agent: Googlebot");
  expect(robots).toContain("User-Agent: Bingbot");
  expect(robots).toContain("User-Agent: OAI-SearchBot");
  expect(robots).toContain("User-Agent: GPTBot");
  expect(robots).toContain("User-Agent: ClaudeBot");
  expect(robots).toContain("User-Agent: PerplexityBot");
  expect(robots).toContain("Disallow: /api/");
});

test("sitemap contains unique, indexable canonical URLs and localized blog pairs", async ({ request }) => {
  test.slow();
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/xml");
  const xml = await response.text();
  const urls = sitemapLocations(xml);

  expect(urls.length).toBeGreaterThan(100);
  expect(new Set(urls).size).toBe(urls.length);
  expect(urls).toContain(`${baseUrl}/blog/${pairedArticle}`);
  expect(urls).toContain(`${baseUrl}/en/blog/${pairedArticle}`);
  expect(urls).not.toContain(`${baseUrl}/en/hakkimizda`);
  expect(urls).not.toContain(`${baseUrl}/hizmetler/tubitak-kosgeb`);
  expect(xml).toContain('hreflang="tr"');
  expect(xml).toContain('hreflang="en"');
  expect(xml).toContain('hreflang="x-default"');

  for (const url of urls) {
    const pathname = new URL(url).pathname;
    const pageResponse = await request.head(pathname, {
      headers: {
        cookie: pathname === "/en" || pathname.startsWith("/en/")
          ? "takt_locale=en"
          : "takt_locale=tr",
      },
    });
    expect(pageResponse.status(), url).toBe(200);
    expect(pageResponse.headers()["x-robots-tag"] ?? "", url).not.toContain(
      "noindex",
    );
  }
});

test("Turkish and English articles expose reciprocal language metadata", async ({ page }) => {
  await page.goto(`/blog/${pairedArticle}`);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    `${baseUrl}/blog/${pairedArticle}`,
  );
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
    "href",
    `${baseUrl}/en/blog/${pairedArticle}`,
  );

  await page.goto(`/en/blog/${pairedArticle}`);
  await expect(page).toHaveTitle(/Design for Manufacturing.*— Takt$/);
  expect((await page.title()).match(/— Takt/g)?.length).toBe(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    `${baseUrl}/en/blog/${pairedArticle}`,
  );
  await expect(page.locator('link[rel="alternate"][hreflang="tr"]')).toHaveAttribute(
    "href",
    `${baseUrl}/blog/${pairedArticle}`,
  );

  const schemas = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((scripts) => scripts.map((script) => JSON.parse(script.textContent ?? "{}")));
  const article = schemas.find((schema) => {
    const types = Array.isArray(schema["@type"])
      ? schema["@type"]
      : [schema["@type"]];
    return types.includes("BlogPosting");
  });
  expect(article?.inLanguage).toBe("en-GB");
});

test("AI discovery documents include both language collections", async ({ request }) => {
  const [shortResponse, fullResponse] = await Promise.all([
    request.get("/llms.txt"),
    request.get("/llms-full.txt"),
  ]);
  expect(shortResponse.status()).toBe(200);
  expect(fullResponse.status()).toBe(200);
  expect(shortResponse.headers()["content-type"]).toContain("text/markdown");

  const shortDocument = await shortResponse.text();
  const fullDocument = await fullResponse.text();
  expect(shortDocument).toContain("## Kurumsal kimlik");
  expect(shortDocument).toContain("## English technical articles");
  expect(shortDocument).toContain(`${baseUrl}/en/blog/${pairedArticle}`);
  expect(fullDocument).toContain("## Full text of English technical articles");
  expect(fullDocument).not.toMatch(/KOSGEB|TÜBİTAK|patent support/i);
});

test("previously broken engineering consulting tag resolves without entering the sitemap", async ({ request }) => {
  const tagPath = "/blog/etiket/muhendislik-danismanligi";
  const response = await request.get(tagPath);
  expect(response.status()).toBe(200);

  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemapLocations(sitemap)).not.toContain(`${baseUrl}${tagPath}`);
});
