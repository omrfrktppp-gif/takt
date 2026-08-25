import "server-only";
import {
  markdownLink,
  markdownText,
  renderBlogLlmsLinks,
  renderFullBlogEntries,
} from "@/lib/blog-content-formats";
import { getPublishedPosts } from "@/lib/blog";
import { getEnglishPublishedPosts } from "@/lib/blog-en";
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

export function buildLlmsTxt(): string {
  const base = siteConfig.url;
  const hizmetPanels = getChapterPanels("hizmetler");
  const kapasitePanels = getChapterPanels("kapasitemiz");
  const blogPosts = getPublishedPosts();
  const englishBlogPosts = getEnglishPublishedPosts();

  const lines: string[] = [
    "# Takt",
    `> ${markdownText(siteConfig.description)}`,
    "",
    markdownLink(
      "Kapsamlı içerik",
      `${base}/llms-full.txt`,
      "Site özeti ve teknik blog yazılarının tam metinleri.",
    ),
    "",
    "## Kurumsal kimlik",
    "- Resmî marka adı: Takt",
    "- Faaliyet: Mühendislik danışmanlığı, makina ve endüstriyel ürün geliştirme, analiz, proje yönetimi ve üretim koordinasyonu.",
    `- Merkez: ${markdownText(formatSiteAddressOneLine())}`,
    "- Ana teknik muhatap: Ömer Faruk Top",
    `- Resmî web sitesi: ${base}`,
    "",
    "## Hizmetlerimiz",
    ...hizmetPanels.map((panel) =>
      markdownLink(
        panel.title ?? panel.id,
        `${base}/hizmetler/${panel.id}`,
        panel.body,
      ),
    ),
    "",
    "## Kapasitemiz",
    ...kapasitePanels.map((panel) =>
      markdownLink(
        panel.title ?? (panel.id === "intro" ? "Genel bakış" : panel.id),
        `${base}/kapasitemiz/${panel.id}`,
        panel.body,
      ),
    ),
    "",
    "## Nasıl çalışırız",
    ...processSteps.map(
      (step, index) =>
        `${index + 1}. **${markdownText(step.title)}:** ${markdownText(step.description)}`,
    ),
    "",
    "## Sayfalar",
    markdownLink("Ana Sayfa", `${base}/`),
    ...Object.values(chapterSeo).map((page) =>
      markdownLink(page.title, `${base}${page.path}`, page.description),
    ),
    markdownLink(
      rehberSeo.title,
      `${base}${rehberSeo.path}`,
      rehberSeo.description,
    ),
    markdownLink("Blog", `${base}/blog`),
    markdownLink("Sektörler", `${base}/sektorler`),
    markdownLink(leadMagnet.label, `${base}${leadMagnet.href}`),
    "",
    "## Teknik rehberler",
    ...pillars.map((pillar) =>
      markdownLink(
        pillar.title,
        `${base}/rehber/${pillar.slug}`,
        pillar.description,
      ),
    ),
    "",
    "## Sektörler",
    ...sectors.map((sector) =>
      markdownLink(
        sector.title,
        `${base}/sektorler/${sector.id}`,
        sector.description,
      ),
    ),
    "",
    "## Blog yazıları",
    ...renderBlogLlmsLinks(blogPosts),
    "",
    "## English technical articles",
    markdownLink(
      "Technical Articles",
      `${base}/en/blog`,
      "English engineering articles on design, analysis, manufacturing and product development.",
    ),
    ...renderBlogLlmsLinks(englishBlogPosts),
    "",
    "## Sık sorulan sorular",
    ...faqItems.map(
      (item) =>
        `- **${markdownText(item.question)}** ${markdownText(item.answer)}`,
    ),
    "",
    "## İletişim",
    `- E-posta: ${siteConfig.email}`,
    `- Telefon: ${siteConfig.phone}`,
    `- Konum: ${markdownText(formatSiteAddressOneLine())}`,
    markdownLink("LinkedIn", siteConfig.linkedin),
    markdownLink("Instagram", siteConfig.instagram),
    "",
  ];

  return lines.join("\n");
}

export function buildLlmsFullTxt(): string {
  const base = siteConfig.url;
  const posts = getPublishedPosts();
  const englishPosts = getEnglishPublishedPosts();
  const lines = [
    buildLlmsTxt(),
    "---",
    "",
    "## Teknik blog yazılarının tam metinleri",
    "",
    ...renderFullBlogEntries(posts),
    "## Full text of English technical articles",
    "",
    ...renderFullBlogEntries(englishPosts, "en"),
    markdownLink("Takt ana sayfası", base),
    "",
  ];

  return lines
    .filter((line, index, all) => {
      if (line !== "") return true;
      return index === 0 || all[index - 1] !== "";
    })
    .join("\n");
}
