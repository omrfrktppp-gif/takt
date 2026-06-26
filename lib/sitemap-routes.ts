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
import { getAllPillarSlugs } from "@/lib/pillars";
import { getAllSectorIds } from "@/lib/sectors";
import { chapterSeo } from "@/lib/seo";

/** Statik sayfa içeriği son revizyon — deploy tarihiyle güncelleyin. */
export const STATIC_CONTENT_REVISED = "2026-06-26";

export type SitemapEntry = {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
  lastModified: string;
};

export function getStaticSitemapEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [
    {
      path: "/",
      priority: 1,
      changeFrequency: "weekly",
      lastModified: STATIC_CONTENT_REVISED,
    },
    {
      path: "/blog",
      priority: 0.7,
      changeFrequency: "weekly",
      lastModified: STATIC_CONTENT_REVISED,
    },
    {
      path: "/kvkk-aydinlatma-metni",
      priority: 0.3,
      changeFrequency: "yearly",
      lastModified: STATIC_CONTENT_REVISED,
    },
    {
      path: "/kaynaklar/baslangic-kontrol-listesi",
      priority: 0.55,
      changeFrequency: "monthly",
      lastModified: STATIC_CONTENT_REVISED,
    },
    {
      path: "/sektorler",
      priority: 0.7,
      changeFrequency: "monthly",
      lastModified: STATIC_CONTENT_REVISED,
    },
    {
      path: "/rehber",
      priority: 0.75,
      changeFrequency: "monthly",
      lastModified: STATIC_CONTENT_REVISED,
    },
  ];

  for (const chapter of Object.values(chapterSeo)) {
    entries.push({
      path: chapter.path,
      priority: chapter.path === "/hakkimizda" ? 0.9 : 0.8,
      changeFrequency: "monthly",
      lastModified: STATIC_CONTENT_REVISED,
    });
  }

  for (const chapterId of detailChapters) {
    for (const panel of getChapterPanels(chapterId)) {
      entries.push({
        path: `/${chapterId}/${panel.id}`,
        priority: 0.75,
        changeFrequency: "monthly",
        lastModified: STATIC_CONTENT_REVISED,
      });
    }
  }

  for (const post of getPublishedPosts()) {
    entries.push({
      path: `/blog/${post.slug}`,
      priority: 0.65,
      changeFrequency: "monthly",
      lastModified: post.updatedAt ?? post.publishedAt,
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
        lastModified: STATIC_CONTENT_REVISED,
      });
    }
  }

  for (const sectorId of getAllSectorIds()) {
    entries.push({
      path: `/sektorler/${sectorId}`,
      priority: 0.72,
      changeFrequency: "monthly",
      lastModified: STATIC_CONTENT_REVISED,
    });
  }

  for (const pillarSlug of getAllPillarSlugs()) {
    entries.push({
      path: `/rehber/${pillarSlug}`,
      priority: 0.74,
      changeFrequency: "monthly",
      lastModified: STATIC_CONTENT_REVISED,
    });
  }

  return entries;
}
