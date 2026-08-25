import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const englishManifest = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "public", "locales", "en", "manifest.json"), "utf8"),
) as { routes: Record<string, string> };

test("English home mirrors the site and keeps localized navigation", async ({ page }) => {
  const response = await page.goto("/en");
  expect(response?.headers()["x-robots-tag"]).toContain("noindex");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("html")).toHaveAttribute("data-locale-ready", "en");
  await expect(page.getByRole("link", { name: "EN", exact: true }).first()).toHaveAttribute("aria-current", "page");
  expect(await page.locator('a[href="/en/hizmetler"]').count()).toBeGreaterThan(0);
  await expect(page.locator("body")).not.toContainText(/KOSGEB|TÜBİTAK|patent support/i);
});

test("language choice survives navigation and switches the matching page", async ({ page, context }, testInfo) => {
  test.skip(testInfo.project.name === "mobile-chromium", "desktop navigation flow");
  await context.clearCookies();
  await page.goto("/");

  await page.getByRole("link", { name: "EN", exact: true }).first().click();
  await page.waitForURL("**/en");
  await expect(page.locator("html")).toHaveAttribute("data-locale-ready", "en");
  await expect(page.getByRole("navigation", { name: "Main navigation" })).toContainText("Services");

  const services = page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Services", exact: true });
  await expect(services).toHaveAttribute("href", "/en/hizmetler");
  await services.click();
  await page.waitForURL("**/en/hizmetler");
  await expect(page.locator("html")).toHaveAttribute("data-locale-ready", "en");

  const capabilities = page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Capabilities", exact: true });
  await expect(capabilities).toHaveAttribute("href", "/en/kapasitemiz");
  await capabilities.click();
  await page.waitForURL("**/en/kapasitemiz");
  await expect(page.locator("html")).toHaveAttribute("data-locale-ready", "en");

  await page.goto("/hizmetler");
  await page.waitForURL("**/en/hizmetler");

  await page.getByRole("link", { name: "TR", exact: true }).first().click();
  await page.waitForURL("**/hizmetler");
  await expect(page.locator("html")).toHaveAttribute("lang", "tr");
  await expect(page.getByRole("navigation", { name: "Ana navigasyon" })).toContainText("Hizmetlerimiz");
  await expect(
    page.getByRole("navigation", { name: "Ana navigasyon" }).getByRole("link", { name: "Kapasitemiz", exact: true }),
  ).toHaveAttribute("href", "/kapasitemiz");
});

test("English blog index and article are server-rendered", async ({ page }) => {
  const response = await page.goto("/en/blog");
  expect(response?.headers()["x-robots-tag"] ?? "").not.toContain("noindex");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /index, follow/,
  );
  await expect(page.getByRole("heading", { level: 1, name: "Technical Articles" })).toBeVisible();
  await expect(page.locator('a[href^="/en/blog/"]').first()).toBeVisible();

  await page.goto("/en/blog/uretime-yonelik-tasarim-dfm");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Design for Manufacturing");
  await expect(page.getByRole("navigation", { name: "Contents" })).toBeVisible();
  await expect(page.locator("article, main")).toContainText("AISI 304");
  await expect(page.locator("body")).not.toContainText(/Üretime Yönelik Tasarım|İçindekiler/);
});

test("English needs analysis loads without removed support services", async ({ page }) => {
  await page.goto("/en/ihtiyac-analizi");
  await expect(page.locator("html")).toHaveAttribute("data-locale-ready", "en");
  await expect(page.locator("body")).toContainText("Needs Analysis");
  await expect(page.locator("body")).not.toContainText(/KOSGEB|TÜBİTAK|Patent|grant application/i);
});

test("every English page keeps internal links inside the English site", async ({ page }, testInfo) => {
  test.slow();
  const localizationLeaks: string[] = [];
  for (const route of Object.keys(englishManifest.routes)) {
    const englishRoute = route === "/" ? "/en" : `/en${route}`;
    const response = await page.goto(englishRoute);
    expect(response?.status(), englishRoute).toBe(200);
    await expect(page.locator("html"), englishRoute).toHaveAttribute("data-locale-ready", "en");
    if (testInfo.project.name === "mobile-chromium") {
      await expect(page.getByRole("button", { name: "Open menu" }), englishRoute).toBeVisible();
      await expect(page.getByRole("link", { name: "EN", exact: true }).first(), englishRoute).toHaveAttribute("aria-current", "page");
    } else {
      await expect(page.getByRole("navigation", { name: "Main navigation" }), englishRoute).toContainText("Services");
    }

    const invalidLinks = await page.locator('a[href^="/"]').evaluateAll((anchors) =>
      anchors
        .filter((anchor) => !anchor.closest("[data-locale-switcher]"))
        .map((anchor) => anchor.getAttribute("href") ?? "")
        .filter((href) =>
          href !== "" &&
          !href.startsWith("/en") &&
          !href.startsWith("/api") &&
          !href.startsWith("/_next") &&
          !href.startsWith("/locales"),
        ),
    );
    expect(invalidLinks, `${englishRoute}: ${invalidLinks.join(", ")}`).toEqual([]);
    await expect(page.locator("body"), englishRoute).not.toContainText(/KOSGEB|TÜBİTAK|patent support/i);
    const visibleText = await page.locator("body").innerText();
    const turkishUi = [
      ...visibleText.matchAll(
        /\b(Ana Sayfa|Hakkımızda|Hizmetlerimiz|Kapasitemiz|Yaklaşım|Sektörler|Referanslar|İletişim|İhtiyaç|Görüşme|Tasarım|Üretim|Mühendislik|İlgili hizmet|Detay|Başlat|Gönder|Geri|İleri|veya|için|olarak|hakkında)\b/giu,
      ),
    ].map((match) => match[0]);
    const uniqueTurkishUi = [...new Set(turkishUi)];
    if (uniqueTurkishUi.length > 0) {
      localizationLeaks.push(`${englishRoute}: ${uniqueTurkishUi.join(", ")}`);
    }
  }
  expect(localizationLeaks).toEqual([]);
});

test("mobile English menu stays English when opening a new section", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chromium", "mobile navigation check");
  await page.goto("/en");
  await page.getByRole("button", { name: "Open menu" }).click();
  const mobileNav = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(mobileNav).toContainText("Services");
  const blogLink = mobileNav.getByRole("link", { name: "Blog", exact: true });
  await expect(blogLink).toHaveAttribute("href", "/en/blog");
  await blogLink.click();
  await page.waitForURL("**/en/blog");
  await expect(page.getByRole("heading", { level: 1, name: "Technical Articles" })).toBeVisible();
});

test("removed service routes redirect", async ({ request }) => {
  const service = await request.get("/hizmetler/tubitak-kosgeb", { maxRedirects: 0 });
  expect([307, 308]).toContain(service.status());
  const guide = await request.get("/rehber/tubitak-kosgeb-rehberi", { maxRedirects: 0 });
  expect([307, 308]).toContain(guide.status());
});
