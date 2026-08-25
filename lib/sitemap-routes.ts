/**
 * Sitemap URL kaynağı — build sırasında tüm statik rotalar.
 * Yeni statik sayfa veya bölüm: ilgili döngüye ekle veya `chapterSeo`/`blogPosts` güncelle.
 * Detay: docs/09-seo-geo-aeo-altyapi.md
 */
import { getPublishedPosts, getAllTagIds } from "@/lib/blog";
import {
  getEnglishPostsByTag,
  getEnglishPublishedPosts,
} from "@/lib/blog-en";
import {
  detailChapters,
  getChapterPanels,
} from "@/lib/pages";
import { getAllPillarSlugs } from "@/lib/pillars";
import { getAllSectorIds } from "@/lib/sectors";
import { chapterSeo } from "@/lib/seo";

/** Statik sayfa içeriği son revizyon — deploy tarihiyle güncelleyin. */
export const STATIC_CONTENT_REVISED = "2026-08-26";

export type SitemapEntry = {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
  lastModified: string;
  alternatePaths?: {
    tr: string;
    en: string;
    "x-default": string;
  };
};

export function getStaticSitemapEntries(): SitemapEntry[] {
  const publicPosts = getPublishedPosts();
  const englishPosts = getEnglishPublishedPosts();
  const englishPostSlugs = new Set(englishPosts.map((post) => post.slug));
  const latestBlogDate =
    publicPosts
      .map((post) => post.updatedAt ?? post.publishedAt)
      .sort()
      .at(-1) ?? STATIC_CONTENT_REVISED;

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
      lastModified: latestBlogDate,
      alternatePaths: {
        tr: "/blog",
        en: "/en/blog",
        "x-default": "/blog",
      },
    },
    {
      path: "/kvkk-aydinlatma-metni",
      priority: 0.3,
      changeFrequency: "yearly",
      lastModified: STATIC_CONTENT_REVISED,
    },
    {
      path: "/ihtiyac-analizi",
      priority: 0.6,
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

  for (const post of publicPosts) {
    const path = `/blog/${post.slug}`;
    const englishPath = `/en/blog/${post.slug}`;
    const alternatePaths = englishPostSlugs.has(post.slug)
      ? { tr: path, en: englishPath, "x-default": path }
      : undefined;

    entries.push({
      path,
      priority: 0.65,
      changeFrequency: "monthly",
      lastModified: post.updatedAt ?? post.publishedAt,
      alternatePaths,
    });
  }

  for (const tagId of getAllTagIds()) {
    const taggedPosts = publicPosts.filter((post) =>
      post.tags.includes(tagId),
    );
    if (taggedPosts.length >= 2) {
      const englishTaggedPosts = getEnglishPostsByTag(tagId);
      const path = `/blog/etiket/${tagId}`;
      const englishPath = `/en/blog/etiket/${tagId}`;
      entries.push({
        path,
        priority: 0.5,
        changeFrequency: "weekly",
        lastModified: taggedPosts
          .map((post) => post.updatedAt ?? post.publishedAt)
          .sort()
          .at(-1) as string,
        ...(englishTaggedPosts.length >= 2
          ? {
              alternatePaths: {
                tr: path,
                en: englishPath,
                "x-default": path,
              },
            }
          : {}),
      });
    }
  }

  entries.push({
    path: "/en/blog",
    priority: 0.65,
    changeFrequency: "weekly",
    lastModified: latestBlogDate,
    alternatePaths: {
      tr: "/blog",
      en: "/en/blog",
      "x-default": "/blog",
    },
  });

  for (const post of englishPosts) {
    const englishPath = `/en/blog/${post.slug}`;
    const turkishPath = `/blog/${post.slug}`;
    entries.push({
      path: englishPath,
      priority: 0.6,
      changeFrequency: "monthly",
      lastModified: post.updatedAt ?? post.publishedAt,
      ...(publicPosts.some((candidate) => candidate.slug === post.slug)
        ? {
            alternatePaths: {
              tr: turkishPath,
              en: englishPath,
              "x-default": turkishPath,
            },
          }
        : {}),
    });
  }

  for (const tagId of getAllTagIds()) {
    const englishTaggedPosts = getEnglishPostsByTag(tagId);
    if (englishTaggedPosts.length < 2) continue;
    const englishPath = `/en/blog/etiket/${tagId}`;
    const turkishPath = `/blog/etiket/${tagId}`;
    const turkishTaggedPosts = publicPosts.filter((post) =>
      post.tags.includes(tagId),
    );
    entries.push({
      path: englishPath,
      priority: 0.45,
      changeFrequency: "weekly",
      lastModified: englishTaggedPosts
        .map((post) => post.updatedAt ?? post.publishedAt)
        .sort()
        .at(-1) as string,
      ...(turkishTaggedPosts.length >= 2
        ? {
            alternatePaths: {
              tr: turkishPath,
              en: englishPath,
              "x-default": turkishPath,
            },
          }
        : {}),
    });
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
