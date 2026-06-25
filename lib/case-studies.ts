import { siteConfig } from "@/lib/site";

export type CaseStudy = {
  /** URL/anahtar kimlik */
  id: string;
  /** Başlık: problem/çözüm odaklı */
  title: string;
  /** Sektör/alan (isim vermeden) */
  sector: string;
  /** Problem — 1-2 cümle */
  problem: string;
  /** Yaklaşım — ne yaptık */
  approach: string;
  /** Rakamlı sonuçlar — yalnızca doğrulanmış veri */
  results: string[];
  /** İlgili hizmet/kapasite sayfası */
  relatedPath?: string;
  /** ISO tarih (opsiyonel) */
  date?: string;
  /** @deprecated summary yerine problem+approach kullanın */
  summary?: string;
  /** @deprecated href yerine relatedPath kullanın */
  href?: string;
};

/** Müşteri onayı sonrası doldurulur. Boşken /referanslar çalışma alanları görünümünü korur. */
export const caseStudies: CaseStudy[] = [];

export const hasCaseStudies = caseStudies.length > 0;

export function caseStudySummary(study: CaseStudy): string {
  if (study.summary) return study.summary;
  return `${study.problem} ${study.approach}`;
}

/** Bir vaka çalışması için CreativeWork schema (E-E-A-T + GEO). */
export function caseStudySchema(study: CaseStudy) {
  const description = study.summary
    ? study.summary
    : `${study.problem} ${study.approach} Sonuç: ${study.results.join("; ")}.`;

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: study.title,
    about: study.sector,
    description,
    ...(study.date ? { dateCreated: study.date } : {}),
    creator: { "@id": `${siteConfig.url}/#org` },
    inLanguage: "tr-TR",
    url: study.relatedPath
      ? `${siteConfig.url}${study.relatedPath}`
      : study.href
        ? `${siteConfig.url}${study.href}`
        : `${siteConfig.url}/referanslar#${study.id}`,
  };
}
