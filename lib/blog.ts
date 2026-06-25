/**
 * Blog altyapısı — yazılar content/blog altındaki index.md dosyalarından yüklenir.
 *
 * Yeni yazı: NN-slug klasörüne index.md ekleyin, status published veya review yapın.
 */

import { loadBlogPostsFromContent } from "@/lib/blog-loader";
import type { BlogPost, BlogTag } from "@/lib/blog-types";

export type { BlogPost, BlogPostSection, BlogTag } from "@/lib/blog-types";

/** Etiket listesi — Dok. 07 konu haritasından */
export const blogTags: BlogTag[] = [
  {
    id: "muhendislik-danismanligi",
    label: "Mühendislik Danışmanlığı",
    description: "Teknik danışmanlık, sanayi mühendislik desteği",
  },
  {
    id: "proje-danismanligi",
    label: "Proje Danışmanlığı",
    description: "Üretim optimizasyonu, tesis yönetimi, süreç iyileştirme",
  },
  {
    id: "teknik-ekip-yonetimi",
    label: "Teknik Ekip Yönetimi",
    description: "Mühendislik süreç yönetimi, iş akışı kurulumu",
  },
  {
    id: "tasarim-gelistirme",
    label: "Tasarım & Geliştirme",
    description: "Özel makina tasarımı, tersine mühendislik, teknik resim",
  },
  {
    id: "analiz-hesaplama",
    label: "Analiz & Hesaplama",
    description: "FEA, simülasyon, mühendislik hesabı, teknik raporlama",
  },
  {
    id: "uretim-danismanligi",
    label: "Üretim Danışmanlığı",
    description: "Fason üretim, imalat koordinasyonu, çözüm ortağı ağı",
  },
  {
    id: "kapasite-imalat",
    label: "Kapasite & İmalat",
    description: "CNC, lazer, 3D baskı, prototipleme, seri üretime geçiş",
  },
  {
    id: "arge-urge",
    label: "Ar-Ge & Ür-Ge",
    description: "Fikirden ürüne, ürün geliştirme, Ar-Ge proje yönetimi",
  },
  {
    id: "tubitak-kosgeb-patent",
    label: "TÜBİTAK, KOSGEB & Patent",
    description: "Destek programları, patent ve marka tescili",
  },
  {
    id: "ankara-sanayi",
    label: "Ankara & Sanayi",
    description: "Yerel mühendislik danışmanlığı, savunma sanayi tedarik",
  },
  {
    id: "dfm-dfa",
    label: "DFM / DFA",
    description: "Üretime ve montaja yönelik tasarım, maliyet optimizasyonu",
  },
  {
    id: "japon-muhendislik",
    label: "Japon Mühendislik İlkeleri",
    description: "Kaizen, muda, gemba, yalın üretim ve sürekli iyileştirme",
  },
  {
    id: "kalite-ilkeleri",
    label: "Kalite İlkeleri",
    description: "FMEA, Six Sigma, Taguchi ve süreç yeteneği",
  },
  {
    id: "muhendislik-trendleri",
    label: "Mühendislik Trendleri",
    description: "Dijital ikiz, eklemeli imalat, generative design",
  },
];

export const blogPosts: BlogPost[] = loadBlogPostsFromContent();

export function getPublishedPosts(): BlogPost[] {
  return blogPosts
    .filter((post) => !post.draft)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug && !post.draft);
}

export function getAllPostSlugs(): string[] {
  return getPublishedPosts().map((post) => post.slug);
}

export function getTagById(id: string): BlogTag | undefined {
  return blogTags.find((tag) => tag.id === id);
}

export function getPostsByTag(tagId: string): BlogPost[] {
  return getPublishedPosts().filter((post) => post.tags.includes(tagId));
}

export function getAllTagIds(): string[] {
  return blogTags.map((tag) => tag.id);
}

export function resolvePostTags(post: BlogPost): BlogTag[] {
  return post.tags
    .map((id) => getTagById(id))
    .filter((tag): tag is BlogTag => Boolean(tag));
}

const TAG_SERVICE_MAP: Record<string, string> = {
  "muhendislik-danismanligi": "/hizmetler/proje-danismanligi",
  "proje-danismanligi": "/hizmetler/proje-danismanligi",
  "teknik-ekip-yonetimi": "/hizmetler/teknik-ekip",
  "tasarim-gelistirme": "/hizmetler/tasarim-gelistirme",
  "analiz-hesaplama": "/hizmetler/analiz-hesaplama",
  "uretim-danismanligi": "/hizmetler/uretim-danismanligi",
  "kapasite-imalat": "/kapasitemiz/cnc",
  "arge-urge": "/hizmetler/arge-urge",
  "tubitak-kosgeb-patent": "/hizmetler/tubitak-kosgeb",
  "ankara-sanayi": "/hizmetler/proje-danismanligi",
  "dfm-dfa": "/hizmetler/tasarim-gelistirme",
  "japon-muhendislik": "/hizmetler/proje-danismanligi",
  "kalite-ilkeleri": "/hizmetler/analiz-hesaplama",
  "muhendislik-trendleri": "/hizmetler/tasarim-gelistirme",
};

const SERVICE_LABELS: Record<string, string> = {
  "/hizmetler/proje-danismanligi": "Proje danışmanlığı",
  "/hizmetler/teknik-ekip": "Teknik ekip yönetimi",
  "/hizmetler/tasarim-gelistirme": "Tasarım & geliştirme",
  "/hizmetler/analiz-hesaplama": "Analiz & hesaplama",
  "/hizmetler/uretim-danismanligi": "Üretim danışmanlığı",
  "/hizmetler/arge-urge": "Ar-Ge & Ür-Ge",
  "/hizmetler/tubitak-kosgeb": "TÜBİTAK / KOSGEB",
  "/kapasitemiz/cnc": "CNC işleme",
  "/kapasitemiz/3d-tarama": "3D tarama",
  "/kapasitemiz/prototip-seri": "Prototip & seri üretim",
};

export function resolveRelatedServicePath(post: BlogPost): string | undefined {
  if (post.relatedServicePath) return post.relatedServicePath;
  for (const tagId of post.tags) {
    const path = TAG_SERVICE_MAP[tagId];
    if (path) return path;
  }
  return undefined;
}

export function relatedServiceLabel(path: string): string {
  return SERVICE_LABELS[path] ?? "İlgili hizmet";
}
