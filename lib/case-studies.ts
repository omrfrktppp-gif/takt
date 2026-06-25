export type CaseStudy = {
  id: string;
  title: string;
  summary: string;
  sector: string;
  href?: string;
};

/** İsimlendirilmiş vaka çalışmaları — müşteri onayı sonrası buraya eklenir. */
export const caseStudies: CaseStudy[] = [];
