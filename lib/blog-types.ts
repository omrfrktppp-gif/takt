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

export type BlogPostStatus = "published" | "review";

export type BlogPostKind = "article" | "case-study";

export type BlogSchemaType = "Article" | "TechArticle" | "BlogPosting";

export type BlogCover = {
  src: string;
  alt: string;
};

export type BlogHeading = {
  depth: 2 | 3;
  id: string;
  text: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  status: BlogPostStatus;
  kind: BlogPostKind;
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
  canonicalUrl: string;
  cover?: BlogCover;
  schemaType: BlogSchemaType;
  /** Ham HTML içermeyen, sunucuda render edilen Markdown gövdesi. */
  markdown: string;
  headings: BlogHeading[];
  /** İlgili hizmet sayfası — yazı sonunda kart gösterilir */
  relatedServicePath?: string;
};
