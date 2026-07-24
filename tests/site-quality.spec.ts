import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/blog",
  "/blog/makine-tasarim-hizmeti-fiyati",
  "/hizmetler/tasarim-gelistirme",
  "/ihtiyac-analizi",
  "/iletisim",
];

for (const route of routes) {
  test(`${route} has no serious accessibility or runtime errors`, async ({
    page,
  }) => {
    const runtimeErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") runtimeErrors.push(message.text());
    });
    page.on("pageerror", (error) => runtimeErrors.push(error.message));

    const response = await page.goto(route, { waitUntil: "networkidle" });
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const blockers = results.violations.filter((violation) =>
      ["critical", "serious"].includes(violation.impact ?? ""),
    );

    expect(blockers, JSON.stringify(blockers, null, 2)).toEqual([]);
    expect(runtimeErrors).toEqual([]);
  });
}

test("public navigation does not expose broken internal links", async ({
  page,
  request,
}) => {
  const discovered = new Set<string>(routes);
  for (const route of ["/", "/blog", "/hizmetler", "/kapasitemiz"]) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    const hrefs = await page.locator('a[href^="/"]').evaluateAll((anchors) =>
      anchors
        .map((anchor) => anchor.getAttribute("href"))
        .filter((href): href is string => Boolean(href))
        .map((href) => href.split("#")[0])
        .filter(Boolean),
    );
    hrefs.forEach((href) => discovered.add(href));
  }

  for (const href of discovered) {
    const response = await request.get(href);
    expect(response.status(), href).toBeLessThan(400);
  }
});

test("mobile controls meet the 44px touch target", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile"));
  await page.goto("/", { waitUntil: "networkidle" });
  const undersized = await page
    .locator("a:visible, button:visible, input:visible, textarea:visible")
    .evaluateAll((elements) =>
      elements
        .map((element) => {
          const rect = element.getBoundingClientRect();
          return {
            label:
              element.getAttribute("aria-label") ??
              element.textContent?.trim().slice(0, 60) ??
              element.tagName,
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          };
        })
        .filter(({ width, height }) => width < 44 || height < 44),
    );
  expect(undersized, JSON.stringify(undersized, null, 2)).toEqual([]);
});
