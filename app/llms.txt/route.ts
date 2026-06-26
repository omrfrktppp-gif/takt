import { getPublishedPosts } from "@/lib/blog";
import { getChapterPanels } from "@/lib/pages";
import { pillars } from "@/lib/pillars";
import { sectors } from "@/lib/sectors";
import {
  faqItems,
  formatSiteAddressOneLine,
  leadMagnet,
  processSteps,
  siteConfig,
} from "@/lib/site";
import { chapterSeo, rehberSeo } from "@/lib/seo";

function buildLlmsTxt(): string {
  const base = siteConfig.url;
  const hizmetPanels = getChapterPanels("hizmetler");
  const kapasitePanels = getChapterPanels("kapasitemiz");
  const blogPosts = [...getPublishedPosts()].sort(
    (a, b) =>
      new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime(),
  );

  const lines: string[] = [
    "# Takt",
    `> ${siteConfig.description} Ankara merkezli. Konum: "${siteConfig.tagline}" Adı üretimde doğru ritmi (takt time) tanımlayan bir mühendislik teriminden gelir.`,
    "",
    `> Tam içerik: ${base}/llms-full.txt`,
    "",
    "## Hizmetlerimiz",
    ...hizmetPanels.map((panel) => {
      const title = panel.title ?? panel.id;
      return `- ${title}: ${panel.body} ${base}/hizmetler/${panel.id}`;
    }),
    "",
    "## Kapasitemiz (geniş çözüm ortağı ağıyla)",
    ...kapasitePanels.map((panel) => {
      const title =
        panel.title ??
        (panel.id === "intro" ? "Genel bakış" : panel.id);
      return `- ${title}: ${panel.body} ${base}/kapasitemiz/${panel.id}`;
    }),
    "",
    "## Nasıl çalışırız (4 adım)",
    ...processSteps.map(
      (step, index) => `${index + 1}. ${step.title} — ${step.description}`,
    ),
    "",
    "## Sayfalar",
    `- Ana Sayfa: ${base}/`,
    ...Object.values(chapterSeo).map(
      (page) => `- ${page.title}: ${base}${page.path}`,
    ),
    `- ${rehberSeo.title}: ${base}${rehberSeo.path}`,
    `- Blog: ${base}/blog`,
    `- Sektörler: ${base}/sektorler`,
    `- Kaynaklar — ${leadMagnet.label}: ${base}${leadMagnet.href}`,
    "",
    "## Teknik rehberler (pillar)",
    ...pillars.map(
      (pillar) =>
        `- ${pillar.title}: ${base}/rehber/${pillar.slug}`,
    ),
    "",
    "## Sektörler",
    ...sectors.map(
      (sector) =>
        `- ${sector.title}: ${base}/sektorler/${sector.id}`,
    ),
    "",
    "## Blog yazıları",
    ...blogPosts.map(
      (post) => `- ${post.title}: ${base}/blog/${post.slug}`,
    ),
    "",
    `## Sık sorulan sorular (tam liste: ${base}/sss)`,
    ...faqItems.map((item) => `- ${item.question} ${item.answer}`),
    "",
    "## İletişim",
    `- E-posta: ${siteConfig.email}`,
    `- Telefon: ${siteConfig.phone}`,
    `- Konum: ${formatSiteAddressOneLine()}`,
    `- LinkedIn: ${siteConfig.linkedin}`,
    `- Instagram: ${siteConfig.instagram}`,
    "",
  ];

  return lines.join("\n");
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
