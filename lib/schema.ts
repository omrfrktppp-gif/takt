/**
 * JSON-LD schema üreticileri — yeni tür: fonksiyon ekle, ilgili page.tsx'te JsonLd ile render et.
 * Detay: docs/09-seo-geo-aeo-altyapi.md
 */
import type { BlogPost } from "@/lib/blog";
import { faqItems, processSteps, siteConfig } from "@/lib/site";

const orgId = `${siteConfig.url}/#org`;
const websiteId = `${siteConfig.url}/#website`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": orgId,
    name: siteConfig.name,
    alternateName: "Takt Danışmanlık",
    description:
      "Makina imalatı ve sanayide firmalara mühendislik danışmanlığı; tasarım, analiz, proje yönetimi ve üretim koordinasyonu.",
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.webp`,
    image: `${siteConfig.url}/logo.webp`,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    areaServed: {
      "@type": "Place",
      name: "Ankara, Türkiye",
    },
    knowsAbout: [
      "Mühendislik danışmanlığı",
      "Proje danışmanlığı",
      "Süreç optimizasyonu",
      "Tesis yönetimi",
      "Teknik ekip yönetimi",
      "Makina tasarımı",
      "Sistem tasarımı",
      "Tersine mühendislik",
      "Mühendislik analizi",
      "Simülasyon",
      "Üretim danışmanlığı",
      "Fason üretim",
      "CNC işleme",
      "Lazer kesim",
      "3D tarama",
      "3D baskı",
      "Prototipleme",
      "Seri üretim",
      "Ar-Ge",
      "Ür-Ge",
      "TÜBİTAK proje",
      "KOSGEB",
      "Patent ve marka tescili",
    ],
    sameAs: [siteConfig.linkedin, siteConfig.instagram],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "tr-TR",
    publisher: { "@id": orgId },
  };
}

export function howToSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Takt ile bir proje nasıl yürür",
    step: processSteps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.description,
    })),
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function faqPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function serviceSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    url: `${siteConfig.url}${path}`,
    provider: { "@id": orgId },
    areaServed: {
      "@type": "Place",
      name: "Ankara, Türkiye",
    },
  };
}

export function articleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Organization",
      name: post.author ?? siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
    inLanguage: "tr-TR",
  };
}
