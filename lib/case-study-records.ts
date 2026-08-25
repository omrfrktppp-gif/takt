import { siteConfig } from "@/lib/site";

export type CaseStudyEvidence = {
  label: string;
  detail: string;
};

export type CaseStudyRecord = {
  id: string;
  title: string;
  sector: string;
  problem: string;
  scope: string;
  constraints: readonly string[];
  deliverables: readonly string[];
  evidence: readonly CaseStudyEvidence[];
  relatedBlogSlug: string;
};

/**
 * Bu kayıtlar yalnızca repoda yayımlanmış teknik vaka yazılarındaki bilgileri
 * özetler. Müşteri adı, logo veya bloglarda bulunmayan sonuç eklenmez.
 */
export const caseStudyRecords = [
  {
    id: "aisi-304-dfm",
    title: "AISI 304 sıkma parçasında üretim akışının yeniden tasarımı",
    sector: "Üretim tasarımı · DFM",
    problem:
      "Sıkma işlevi taşıyan bir parça torna, freze ve tesviye operasyonlarıyla üretiliyor; tezgâh süresi ve operatör bağımlılığı üretim darboğazı oluşturuyordu.",
    scope:
      "İşlevsel ölçüleri koruyarak geometriyi ve başlangıç malzemesini üretim yöntemiyle birlikte yeniden değerlendirdik.",
    constraints: [
      "AISI 304 malzeme gereksinimi",
      "Mevcut sıkma işlevi ve işlevsel ölçüler",
      "Seri üretime uygun, tekrarlanabilir akış",
    ],
    deliverables: [
      "Hazır boru profile uyarlanmış üretim geometrisi",
      "Lazer profil kesim ve kısa tesviye üretim rotası",
      "Mevcut ve önerilen operasyonların DFM karşılaştırması",
    ],
    evidence: [
      {
        label: "Mevcut durum kaydı",
        detail:
          "Yayımlanmış vakada torna + freze + tesviye zinciri ve parça başına yaklaşık 30 dakikalık işçilik belirtiliyor.",
      },
      {
        label: "Tasarım kararı",
        detail:
          "Aynı vakada işlevsel ölçülerin korunarak hazır boru profil ve lazer kesim akışına geçildiği açıklanıyor.",
      },
    ],
    relatedBlogSlug: "uretime-yonelik-tasarim-dfm",
  },
  {
    id: "self-locating-dfa",
    title: "Self-locating arayüzlerle çelik konstrüksiyon montajı",
    sector: "Montaj tasarımı · DFA",
    problem:
      "Çelik konstrüksiyon montajında konumlama; ölçüm, teknik resim okuma ve operatör deneyimine bağlıydı. Bu akış tolerans yığılması ve düzeltme işçiliği riski taşıyordu.",
    scope:
      "Parçaların doğru konumu geometri üzerinden bulmasını sağlayan montaj arayüzlerini ve üretim işaretlerini tasarımın içine aldık.",
    constraints: [
      "Lazer kesim ve kaynaklı imalat akışı",
      "Tek yönlü ve doğru konumda montaj gereksinimi",
      "Ek mastar ve ölçüm ihtiyacını azaltma hedefi",
    ],
    deliverables: [
      "Çok amaçlı tespit delikleri",
      "Lazer kesim markalama ve parça kodlama düzeni",
      "Doğru yönü tanımlayan geometrik referanslar",
    ],
    evidence: [
      {
        label: "Uygulama kaydı",
        detail:
          "Yayımlanmış vaka; tespit delikleri, lazer markalama ve küçük geometrik asimetrilerin birlikte kullanıldığını belgeliyor.",
      },
      {
        label: "Saha geri bildirimi",
        detail:
          "Vaka metninde ölçü alma ve teknik resme dönme ihtiyacının azaldığı, montajın daha az operatör bağımlı hale geldiği aktarılıyor.",
      },
    ],
    relatedBlogSlug: "montaja-yonelik-tasarim-dfa",
  },
  {
    id: "tunel-firin-termal-genlesme",
    title: "Tünel fırın konveyöründe termal genleşme yönetimi",
    sector: "Yüksek sıcaklık sistemleri · Analiz",
    problem:
      "Dar bir ray sistemi içinde çalışan konveyör parçalarının sıcaklıkla uzaması; sıkışma, hizalama kaybı ve lokal zorlanma riski oluşturuyordu.",
    scope:
      "Genleşmeyi hesap, kontrollü ısıtma deneyi ve eksenel serbestlik sağlayan bağlantı tasarımıyla sistem seviyesinde ele aldık.",
    constraints: [
      "Yaklaşık 25 °C–450 °C çalışma aralığı",
      "Raylar içinde korunması gereken enine stabilite",
      "Malzeme ve sıcaklık dağılımındaki gerçek saha belirsizlikleri",
    ],
    deliverables: [
      "Lineer termal genleşme hesabı",
      "Kontrollü ısıtma ve boy ölçümü doğrulama düzeni",
      "Genleşme yönüne paralel slotlu montaj yaklaşımı",
    ],
    evidence: [
      {
        label: "Hesap kaydı",
        detail:
          "Yayımlanmış vakada 1374 mm temsilî pik döküm eleman için yaklaşık 425 °C sıcaklık farkında 6,1 mm uzama hesaplanıyor.",
      },
      {
        label: "Deneysel doğrulama",
        detail:
          "Vaka metni, prototip üzerindeki kontrollü ısıtma ve boy ölçümlerinin hesaplanan aralıkla tutarlı bulunduğunu belirtiyor.",
      },
    ],
    relatedBlogSlug: "termal-genlesme-yonetimi",
  },
] as const satisfies readonly CaseStudyRecord[];

export function caseStudyRecordSchema(
  study: CaseStudyRecord,
  relatedBlogExists: boolean,
) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: study.title,
    about: study.sector,
    description: `${study.problem} Kapsam: ${study.scope}`,
    creator: { "@id": `${siteConfig.url}/#org` },
    inLanguage: "tr-TR",
    url: relatedBlogExists
      ? `${siteConfig.url}/blog/${study.relatedBlogSlug}`
      : `${siteConfig.url}/referanslar#${study.id}`,
  };
}
