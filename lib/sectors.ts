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
    id: "arge-urun-gelistirme",
    title: "Ar-Ge ve ürün geliştirme",
    description:
      "Fikirden prototipe, prototipten ürüne giden Ar-Ge süreçlerinde teknik yol haritası, dokümantasyon ve olgunluk yönetimi.",
    summary:
      "Ar-Ge ve ürün geliştirme projelerinde kavram doğrulamadan seri üretime hazır tasarıma kadar teknik disiplin gereklidir. Takt, ekibinize dışarıdan mühendislik gücü ekleyerek kararları dokümante eder ve süreci tek muhatap olarak yönetir.",
    paragraphs: [
      "Konsept tasarım, teknik gereksinim analizi ve fizibilite değerlendirmesiyle projenin ilk aşamasını yapılandırırız.",
      "Prototip döngüleri, test planları ve revizyon takibiyle ürün olgunluğunu adım adım ilerletiriz.",
      "TÜBİTAK ve KOSGEB uygun projelerde teknik başvuru içeriği ve mühendislik dokümantasyonu hazırlığında destek veririz.",
    ],
    relatedPaths: [
      "/hizmetler/arge-urge",
      "/hizmetler/tasarim-gelistirme",
      "/hizmetler/tubitak-kosgeb",
    ],
  },
  {
    id: "prototipten-seri-uretime",
    title: "Prototipten seri üretime",
    description:
      "Sanatsal veya fonksiyonel prototipten seri üretime geçişte tasarım olgunlaştırma, DFM ve imalat koordinasyonu.",
    summary:
      "Prototip aşamasındaki bir ürünün seri üretime taşınması; tolerans, malzeme, montaj ve tedarik zinciri kararlarını birlikte gerektirir. Bu geçişte tasarımı üretilebilir hale getirir ve imalat adımlarını koordine ederiz.",
    paragraphs: [
      "Prototip geometrisini imalat dostu tasarıma dönüştürür; malzeme ve proses seçimini üretim gerçekleriyle hizalarız.",
      "Pilot üretim, kalite kontrol noktaları ve tedarikçi değerlendirmesiyle seri üretime hazırlık yaparız.",
      "Fason üretim, CNC işleme ve yüzey işlemi dahil çözüm ortağı ağımızla imalat takibini tek elden yürütürüz.",
    ],
    relatedPaths: [
      "/kapasitemiz/prototip-seri",
      "/hizmetler/uretim-danismanligi",
      "/hizmetler/tasarim-gelistirme",
    ],
  },
  {
    id: "ozel-makina-imalati",
    title: "Özel makina imalatı",
    description:
      "Özel makina ve endüstriyel sistemlerde tasarım, analiz, imalat koordinasyonu ve devreye alma desteği.",
    summary:
      "Özel makina projelerinde tasarım, yapısal analiz ve üretim koordinasyonu bir arada yürütülmelidir. Konseptten montaja kadar teknik ekibinize dışarıdan mühendislik desteği sağlıyoruz.",
    paragraphs: [
      "Mekanik tasarım, 3D modelleme ve imalata hazır teknik resim çıktıları üretiriz.",
      "Yapısal analiz ve hareket simülasyonu ile kritik bileşenlerde kararları sayıyla destekleriz.",
      "CNC, kaynak, lazer kesim ve montaj adımlarını çözüm ortağı ağımızla koordine ederiz.",
    ],
    relatedPaths: [
      "/hizmetler/tasarim-gelistirme",
      "/hizmetler/analiz-hesaplama",
      "/kapasitemiz/cnc",
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
