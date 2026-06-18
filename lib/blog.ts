/**
 * Blog altyapısı — yazıları ve etiketleri buraya ekleyin.
 *
 * Yeni yazı:
 * 1. `blogTags` içine etiket ekleyin (yoksa)
 * 2. `blogPosts` dizisine yazıyı ekleyin
 * 3. `draft: true` ise yayına almak için kaldırın
 */

export type BlogTag = {
  /** URL slug — küçük harf, tire ile: `makina-tasarimi` */
  id: string;
  /** Görünen ad */
  label: string;
  description?: string;
};

export type BlogPostSection = {
  heading?: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  /** ISO tarih: YYYY-MM-DD */
  publishedAt: string;
  updatedAt?: string;
  /** `blogTags` içindeki id'ler */
  tags: string[];
  author?: string;
  /** Yayınlanmadan önce true bırakın */
  draft?: boolean;
  sections: BlogPostSection[];
};

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
];

export const blogPosts: BlogPost[] = [
  // {
  //   slug: "ornek-yazi",
  //   title: "Örnek yazı başlığı",
  //   description: "Kısa özet — arama ve AI snippet için 1-2 cümle.",
  //   publishedAt: "2026-06-18",
  //   tags: ["muhendislik-danismanligi"],
  //   draft: true,
  //   sections: [
  //     {
  //       heading: "Bu bölüm ne anlatıyor?",
  //       paragraphs: [
  //         "İlk paragrafta doğrudan cevap verin — AEO için kritik.",
  //         "İkinci paragrafta detay ve bağlam.",
  //       ],
  //     },
  //   ],
  // },
];

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
