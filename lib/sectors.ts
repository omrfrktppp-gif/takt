/**
 * Sektör (dikey) landing sayfaları — yüksek niyetli arama ve GEO entity.
 */
export type Sector = {
  id: string;
  title: string;
  description: string;
  summary: string;
  paragraphs: string[];
  relatedPaths: string[];
};

export const sectors: Sector[] = [
  {
    id: "savunma-sanayi",
    title: "Savunma sanayi",
    description:
      "Savunma sanayi tedarikçileri için tasarım, analiz, tersine mühendislik ve üretim koordinasyonu.",
    summary:
      "Savunma sanayi tedarik zincirinde hassas tolerans, dokümantasyon disiplini ve izlenebilir teslim kritiktir. Takt, özel makina ve alt sistem projelerinde teknik ekibinize dışarıdan mühendislik gücü ekler.",
    paragraphs: [
      "Teknik resmi eksik veya revizyon gerektiren parçalar için tersine mühendislik ve 3D tarama desteği sunuyoruz.",
      "Yapısal analiz, yorulma değerlendirmesi ve imalata hazır tasarım çıktıları ile kararları sayıyla destekleriz.",
      "Fason üretim ve montaj adımlarını çözüm ortağı ağımızla koordine eder; tek muhatap olarak süreci yönetiriz.",
    ],
    relatedPaths: [
      "/hizmetler/tasarim-gelistirme",
      "/hizmetler/analiz-hesaplama",
      "/kapasitemiz/3d-tarama",
    ],
  },
  {
    id: "gida-makineleri",
    title: "Gıda makineleri",
    description:
      "Gıda işleme ve paketleme makineleri için tasarım, hijyen gereksinimleri ve üretim koordinasyonu.",
    summary:
      "Gıda makinelerinde temizlenebilirlik, malzeme uyumu ve üretilebilirlik birlikte ele alınmalıdır. Mevcut hatların modernizasyonu ve yeni makina geliştirmede teknik destek veriyoruz.",
    paragraphs: [
      "Konseptten imalata hazır tasarıma; paslanmaz çelik ve gıda uyumlu malzeme seçiminde danışmanlık.",
      "Mevcut ekipmanın ölçülmesi, modelleme ve yedek parça üretilebilirliği için tersine mühendislik.",
      "Prototipten seri üretime geçişte tedarikçi seçimi ve imalat takibi.",
    ],
    relatedPaths: [
      "/hizmetler/tasarim-gelistirme",
      "/hizmetler/uretim-danismanligi",
      "/kapasitemiz/prototip-seri",
    ],
  },
  {
    id: "otomotiv-yan-sanayi",
    title: "Otomotiv yan sanayi",
    description:
      "Otomotiv yan sanayi için özel aparat, fikstür ve üretim destekleyici sistem tasarımı.",
    summary:
      "Yan sanayide hızlı devreye alma, tekrarlanabilir kalite ve maliyet baskısı ön plandadır. Tasarım optimizasyonu, DFM yaklaşımı ve üretim koordinasyonu ile destek oluyoruz.",
    paragraphs: [
      "Üretim aparatı, fikstür ve özel makina tasarımında imalat dostu çözümler.",
      "Mühendislik hesapları ve simülasyon ile prototip maliyetini düşürme.",
      "CNC, kaynak ve yüzey işlemi dahil fason üretim koordinasyonu.",
    ],
    relatedPaths: [
      "/hizmetler/tasarim-gelistirme",
      "/hizmetler/analiz-hesaplama",
      "/kapasitemiz/cnc",
    ],
  },
  {
    id: "tibbi-cihaz",
    title: "Tıbbi cihaz",
    description:
      "Tıbbi cihaz ve laboratuvar ekipmanı geliştirmede tasarım, prototipleme ve dokümantasyon desteği.",
    summary:
      "Tıbbi cihaz projelerinde güvenilirlik, malzeme seçimi ve dokümantasyon disiplini önemlidir. Ar-Ge aşamasından prototipe kadar teknik yol haritası ve uygulama desteği sunuyoruz.",
    paragraphs: [
      "Konsept ve detay tasarım; üretilebilirlik ve montaj düşüncesiyle modelleme.",
      "Prototip üretimi ve test döngülerinin planlanması.",
      "TÜBİTAK/KOSGEB uygun projelerde teknik başvuru içeriği hazırlığı.",
    ],
    relatedPaths: [
      "/hizmetler/arge-urge",
      "/hizmetler/tasarim-gelistirme",
      "/hizmetler/tubitak-kosgeb",
    ],
  },
];

export function getSectorById(id: string): Sector | undefined {
  return sectors.find((sector) => sector.id === id);
}

export function getAllSectorIds(): string[] {
  return sectors.map((sector) => sector.id);
}
