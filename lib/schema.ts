/**
 * JSON-LD schema üreticileri — yeni tür: fonksiyon ekle, ilgili page.tsx'te JsonLd ile render et.
 * Detay: docs/09-seo-geo-aeo-altyapi.md
 */
import type { BlogPost } from "@/lib/blog-types";
import type { CaseStudy } from "@/lib/case-studies";
import type { SeoFaqItem } from "@/lib/seo-content";
import { getTeamMemberByName, personIdForMember, teamMembers } from "@/lib/team";
import { faqItems, processSteps, siteConfig } from "@/lib/site";

const orgId = `${siteConfig.url}/#org`;
const websiteId = `${siteConfig.url}/#website`;
const founderId = `${siteConfig.url}/#founder`;

export function personSchema(member: {
  id: string;
  name: string;
  role: string;
  bio: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personIdForMember(member),
    name: member.name,
    jobTitle: member.role,
    description: member.bio,
    worksFor: { "@id": orgId },
    url: siteConfig.url,
  };
}

export function founderPersonSchema() {
  const founder = teamMembers.find((member) => member.id === "omer-faruk-top");
  if (founder) {
    return {
      ...personSchema(founder),
      "@id": founderId,
    };
  }
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": founderId,
    name: "Ömer Faruk Top",
    worksFor: { "@id": orgId },
    url: siteConfig.url,
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": orgId,
    name: siteConfig.name,
    alternateName: "Takt Danışmanlık",
    founder: { "@id": founderId },
    employee: teamMembers.map((member) => ({ "@id": personIdForMember(member) })),
    description:
      "Makina imalatı ve sanayide firmalara mühendislik danışmanlığı; tasarım, analiz, proje yönetimi ve üretim koordinasyonu.",
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}${siteConfig.logo.src}`,
      width: siteConfig.logo.width,
      height: siteConfig.logo.height,
      caption: siteConfig.logo.alt,
    },
    image: `${siteConfig.url}${siteConfig.logo.src}`,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.mapsCoordinates.lat,
      longitude: siteConfig.mapsCoordinates.lng,
    },
    hasMap: siteConfig.mapsUrl,
    areaServed: {
      "@type": "Place",
      name: `${siteConfig.address.addressLocality}, ${siteConfig.address.addressRegion}, Türkiye`,
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
    sameAs: [siteConfig.linkedin, siteConfig.instagram, siteConfig.mapsUrl],
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

export function faqPageSchema(items?: SeoFaqItem[]) {
  const faq = items ?? faqItems;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/** @deprecated Use faqPageSchema(items) */
export function panelFaqSchema(faq: SeoFaqItem[]) {
  return faqPageSchema(faq);
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

export function creativeWorkSchema(study: CaseStudy) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: study.title,
    description: study.summary,
    about: study.sector,
    url: study.href
      ? `${siteConfig.url}${study.href}`
      : `${siteConfig.url}/referanslar#${study.id}`,
    creator: { "@id": orgId },
  };
}

function articleAuthor(post: BlogPost) {
  if (!post.author) {
    return { "@id": orgId };
  }
  const member = getTeamMemberByName(post.author);
  if (member) {
    return {
      "@type": "Person" as const,
      "@id": personIdForMember(member),
      name: member.name,
      url: siteConfig.url,
      worksFor: { "@id": orgId },
    };
  }
  return {
    "@type": "Person" as const,
    name: post.author,
    worksFor: { "@id": orgId },
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
    author: articleAuthor(post),
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      "@id": orgId,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
    inLanguage: "tr-TR",
  };
}
