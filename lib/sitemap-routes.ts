/**
 * Sitemap URL kaynağı — build sırasında tüm statik rotalar.
 * Yeni statik sayfa veya bölüm: ilgili döngüye ekle veya `chapterSeo`/`blogPosts` güncelle.
 * Detay: docs/09-seo-geo-aeo-altyapi.md
 */
import { getPublishedPosts, getAllTagIds } from "@/lib/blog";
import {
  detailChapters,
  getChapterPanels,
} from "@/lib/pages";
import { chapterSeo } from "@/lib/seo";

export type SitemapEntry = {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
};

export function getStaticSitemapEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
    { path: "/kvkk-aydinlatma-metni", priority: 0.3, changeFrequency: "yearly" },
  ];

  for (const chapter of Object.values(chapterSeo)) {
    entries.push({
      path: chapter.path,
      priority: chapter.path === "/hakkimizda" ? 0.9 : 0.8,
      changeFrequency: "monthly",
    });
  }

  for (const chapterId of detailChapters) {
    for (const panel of getChapterPanels(chapterId)) {
      entries.push({
        path: `/${chapterId}/${panel.id}`,
        priority: 0.75,
        changeFrequency: "monthly",
      });
    }
  }

  for (const post of getPublishedPosts()) {
    entries.push({
      path: `/blog/${post.slug}`,
      priority: 0.65,
      changeFrequency: "monthly",
    });
  }

  for (const tagId of getAllTagIds()) {
    const hasPosts = getPublishedPosts().some((post) =>
      post.tags.includes(tagId),
    );
    if (hasPosts) {
      entries.push({
        path: `/blog/etiket/${tagId}`,
        priority: 0.5,
        changeFrequency: "weekly",
      });
    }
  }

  return entries;
}
