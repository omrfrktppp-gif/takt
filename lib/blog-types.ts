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
  /** Madde işaretli liste (opsiyonel) */
  list?: string[];
  /** Bölüm sonu CTA (opsiyonel) */
  callToAction?: {
    lead: string;
    label: string;
    href: string;
  };
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
  category?: string;
  readingTimeMinutes?: number;
  /** Yayınlanmadan önce true bırakın */
  draft?: boolean;
  sections: BlogPostSection[];
};
