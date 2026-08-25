import type { SiteLocale } from "@/lib/i18n";

const englishUi: Record<string, string> = {
  "Ana Sayfa": "Home",
  "Hakkımızda": "About",
  "Hizmetlerimiz": "Services",
  "Kapasitemiz": "Capabilities",
  "Yaklaşım": "Approach",
  "İletişim": "Contact",
  "Sektörler": "Sectors",
  "Referanslar": "References",
  "Teknik rehberler": "Technical guides",
  "SSS": "FAQ",
  "Blog": "Blog",
  "İhtiyaç Analizi": "Needs Analysis",
  "İhtiyaç Analizini Başlat": "Start Needs Analysis",
  "Keşfedin": "Explore",
  "Hızlı yollar": "Quick links",
  "Tasarım": "Design",
  "Analiz": "Analysis",
  "Üretim": "Manufacturing",
  "3B tarama": "3D scanning",
  "E-posta": "Email",
  "Telefon": "Phone",
  "Google Haritalar": "Google Maps",
  "İhtiyaç analizi": "Needs analysis",
  "Görüşme planlayın": "Schedule a meeting",
  "KVKK Aydınlatma Metni": "Privacy Notice",
  "Tüm hakları saklıdır.": "All rights reserved.",
};

export function uiText(value: string, locale: SiteLocale): string {
  return locale === "en" ? englishUi[value] ?? value : value;
}
