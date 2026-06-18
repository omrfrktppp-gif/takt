/**
 * SEO konu haritası — içerik ve blog yazılarında doğal kullanım için referans.
 * Meta keywords alanına kopyalamayın; stuffing yapmayın.
 * Kaynak: docs/07-seo-etiket-paketi.md
 */

export const seoKeywordMap = {
  brand: [
    "mühendislik danışmanlığı",
    "makina mühendisliği danışmanlık",
    "ankara mühendislik danışmanlık",
    "teknik danışmanlık",
    "sanayi mühendislik desteği",
    "savunma sanayi tedarik mühendislik",
  ],
  "proje-danismanligi": [
    "proje danışmanlığı",
    "üretim optimizasyonu",
    "proses optimizasyonu",
    "süreç iyileştirme",
    "tesis yönetimi",
    "üretim verimliliği",
    "operasyon danışmanlığı",
  ],
  "teknik-ekip": [
    "teknik ekip yönetimi",
    "mühendislik süreç yönetimi",
    "iş akışı kurulumu",
    "ar-ge yönetimi",
    "mühendis işe alım danışmanlığı",
  ],
  "tasarim-gelistirme": [
    "özel makina tasarımı",
    "makine tasarımı",
    "sistem tasarımı",
    "ürün tasarımı",
    "tersine mühendislik",
    "tasarım optimizasyonu",
    "imalat projesi",
    "teknik resim",
  ],
  "analiz-hesaplama": [
    "mühendislik analizi",
    "mukavemet hesabı",
    "FEA analizi",
    "simülasyon",
    "mühendislik hesabı",
    "teknik raporlama",
  ],
  "uretim-danismanligi": [
    "üretim danışmanlığı",
    "fason üretim",
    "fason imalat",
    "imalat koordinasyonu",
    "üretici bulma",
    "çözüm ortağı ağı",
  ],
  kapasite: [
    "cnc torna",
    "cnc işleme",
    "talaşlı imalat",
    "lazer kesim",
    "lazer markalama",
    "3d baskı",
    "3d tarama",
    "hızlı prototip",
    "prototipleme",
    "kaynak işçiliği",
    "metal kaynak",
    "kaplama",
    "boyama",
    "yüzey işlem",
    "seri üretime geçiş",
  ],
  "arge-urge": [
    "ar-ge danışmanlığı",
    "ürün geliştirme",
    "ür-ge",
    "fikirden ürüne",
    "ar-ge proje yönetimi",
  ],
  "tubitak-kosgeb": [
    "tübitak proje hazırlama",
    "tübitak danışmanlık",
    "kosgeb destek",
    "kosgeb raporlama",
    "ar-ge proje desteği",
    "üniversite sanayi iş birliği",
    "patent başvurusu",
    "marka tescili",
    "türk patent",
  ],
  local: [
    "ankara makina imalatı danışmanlık",
    "ankara cnc fason",
    "savunma sanayi mühendislik danışmanlık",
    "özel makina imalatı danışmanlık",
  ],
} as const;

export type SeoKeywordTopic = keyof typeof seoKeywordMap;
