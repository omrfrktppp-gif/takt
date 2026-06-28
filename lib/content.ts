export type ContentPanel = {
  id: string;
  title?: string;
  body: string;
};

export type Chapter = {
  id: string;
  label: string;
  eyebrow: string;
  panels: ContentPanel[];
  hidden?: boolean;
  kind?: "content" | "contact" | "booking" | "hero";
};

export const chapters: Chapter[] = [
  {
    id: "giris",
    label: "Giriş",
    eyebrow: "TAKT",
    kind: "hero",
    panels: [{ id: "hero", body: "" }],
  },
  {
    id: "hakkimizda",
    label: "Hakkımızda",
    eyebrow: "HAKKIMIZDA",
    panels: [
      {
        id: "intro",
        body: "Takt Danışmanlık, Ar-Ge projelerindeki teknik sorunları çözmek ve sistemleri optimize etmek için çalışan bir mühendislik ekibidir. Özel makina projelerinde sistem tasarımından tesis yönetimine kadar geniş bir alanda hizmet veriyor; geçmiş proje deneyimimizi ve tersine mühendislik birikimimizi her işe taşıyoruz. Yaklaşımımız sade: dağınık ya da tıkanmış süreçlere ölçülebilir bir ritim getirmek, firmaların teknik ekiplerindeki eksik halkayı tamamlamak ve fikri üretime, sorunu çözüme dönüştürürken doğru tempoyu korumak.",
      },
    ],
  },
  {
    id: "hizmetler",
    label: "Hizmetlerimiz",
    eyebrow: "HİZMETLERİMİZ",
    panels: [
      {
        id: "proje-danismanligi",
        title: "Proje Danışmanlığı",
        body: "Projelerinizi baştan sona teknik bir gözle yönetiyor; üretim, tesis ve süreç (proses) optimizasyonunda yol gösteriyoruz. Dağınık ya da tıkanmış işleri ölçülebilir bir plana ve doğru tempoya bağlıyoruz.",
      },
      {
        id: "teknik-ekip",
        title: "Teknik Ekip & Süreç Yönetimi",
        body: "Ekibinizin yükünü hafifletiyoruz. Teknik kadronun ve iş akışının verimli, takip edilebilir biçimde çalışmasını sağlıyor; süreçleri kuruyor ve teknik ekibinizdeki eksik halkayı dışarıdan tamamlıyoruz. İşe alım ve aday mühendis süreçlerinizde danışmanlık veriyoruz.",
      },
      {
        id: "tasarim-gelistirme",
        title: "Tasarım & Geliştirme",
        body: "Özel makina, sistem ve ürünleri fikirden imalata hazır teknik çözüme dönüştürüyoruz. Mevcut tasarımları da performans ve maliyet açısından geliştiriyoruz. Tersine mühendislik çözümlerimizle üretim süreçlerinizi kısaltıyoruz.",
      },
      {
        id: "analiz-hesaplama",
        title: "Analiz, Hesaplama & Raporlama",
        body: "Kararlarınızı sayıyla destekliyoruz: mühendislik hesapları, simülasyon ve analizlerle riski azaltıyor; sonuçları net, uygulanabilir raporlara döküyoruz.",
      },
      {
        id: "uretim-danismanligi",
        title: "Üretim Danışmanlığı",
        body: "İhtiyacınızı doğru üretim çözümüne yönlendiriyoruz. Güvenilir çözüm ortaklarımızla işinizi eşleştiriyor, imalat sürecini sizin adınıza koordine ediyoruz.",
      },
      {
        id: "arge-urge",
        title: "Ar-Ge & Ür-Ge Danışmanlığı",
        body: "Fikirden ürüne giden yolda yanınızdayız. Araştırma-geliştirme ve ürün geliştirme süreçlerini kurguluyor; prototipten seri üretime kadar teknik olgunluğu yönetiyoruz.",
      },
      {
        id: "tubitak-kosgeb",
        title: "TÜBİTAK & KOSGEB & Türk Patent Proje Desteği",
        body: "Destek programlarına uygun projeleri hazırlıyor, gerekli teknik doküman ve raporları oluşturuyoruz. Başvurudan yürütmeye ve raporlamaya kadar süreci sizin için yönetiyoruz.",
      },
    ],
  },
  {
    id: "kapasitemiz",
    label: "Kapasitemiz",
    eyebrow: "KAPASİTEMİZ",
    panels: [
      {
        id: "intro",
        title: "Genel bakış",
        body: "Makina ve endüstriyel projeleriniz için ihtiyaç duyduğunuz tüm üretim çözümlerini, geniş çözüm ortağı ağımız sayesinde tek noktadan sunuyoruz. Tasarımdan imalata, prototipten seri üretime kadar süreci biz koordine ediyoruz; siz tek bir muhatapla çalışıyor, doğru iş için doğru üreticiyi aramakla uğraşmıyorsunuz.",
      },
      {
        id: "3d-tarama",
        title: "3D Tarama & 3D Baskı",
        body: "3D tarama ile mevcut parçaları dijitale ve tersine mühendisliğe taşıyor, 3D baskı ile hızlı prototip ve fonksiyonel parçalar üretiyoruz.",
      },
      {
        id: "lazer",
        title: "Lazer Kesim & Markalama",
        body: "Hassas lazer kesim ve kalıcı lazer markalama ile parçalarınızı istenen toleransta ve izlenebilirlikte hazırlıyoruz.",
      },
      {
        id: "cnc",
        title: "CNC İşleme & Torna",
        body: "CNC torna ve işleme ile tekil parçadan adetli üretime kadar hassas talaşlı imalatı karşılıyoruz.",
      },
      {
        id: "fason",
        title: "Fason Üretim & Kaynak",
        body: "Çeşitli metallerde fason üretim ve kaynak işçiliğiyle projelerinizin imalat ihtiyacını uçtan uca çözüyoruz.",
      },
      {
        id: "yuzey",
        title: "Yüzey İşlemleri — Kaplama & Boyama",
        body: "Kaplama, boyama ve yüzey işlemleriyle parçalarınızı hem dayanıklılık hem görünüm açısından kullanıma hazır hale getiriyoruz.",
      },
      {
        id: "prototip-seri",
        title: "Prototip & Seri Üretim Danışmanlığı",
        body: "İster tek bir prototip ister seri üretim — doğru yöntemi, malzemeyi ve üreticiyi belirleyip süreci sizin adınıza yönetiyoruz.",
      },
      {
        id: "ozet",
        title: "Tek noktadan üretim",
        body: "Makina ve endüstriyel projelerinizde ihtiyaç ne olursa olsun, doğru üretim çözümünü geniş ağımızla bir araya getiriyor, işi tek elden hayata geçiriyoruz.",
      },
    ],
  },
  {
    id: "yaklasim",
    label: "Yaklaşım",
    eyebrow: "YAKLAŞIMIMIZ",
    panels: [
      {
        id: "adimiz",
        title: "Adımız, ilkemiz",
        body: "\"Takt\" üretimde işin akması gereken ritmi tanımlayan bir mühendislik terimidir. Anlayışımız buna dayanıyor: projelerinize doğru tempoyu kazandırıyor, süreçleri ölçülebilir ve takip edilebilir kılıyoruz.",
      },
      {
        id: "net-kapsam",
        title: "Net kapsam",
        body: "Kapsamı, takvimi ve çıktıları işin başında yazılı tanımlıyor, belirsizlik bırakmadan ilerliyoruz.",
      },
      {
        id: "gercekci",
        title: "Gerçekçi mühendislik",
        body: "Gerçekçi, uygulanabilir ve güncel mühendislik çözümleri sunuyoruz.",
      },
      {
        id: "odak",
        title: "Odağımız",
        body: "Özel ürün ve makina imalatı yapan firmalar, teknik ekipler ve fikrini üretime taşımak isteyenlerle çalışıyoruz.",
      },
    ],
  },
  {
    id: "referanslar",
    label: "Referanslar",
    eyebrow: "REFERANSLAR",
    hidden: true,
    panels: [
      {
        id: "placeholder",
        body: "Sık çalıştığımız proje tipleri — makina imalatı, Ar-Ge, tersine mühendislik ve proje danışmanlığı — /referanslar sayfasında özetlenmektedir; isimlendirilmiş vaka çalışmaları yakında.",
      },
    ],
  },
  {
    id: "iletisim",
    label: "İletişim",
    eyebrow: "İLETİŞİM",
    kind: "contact",
    panels: [{ id: "contact", body: "" }],
  },
  {
    id: "gorusme-planla",
    label: "Görüşme planla",
    eyebrow: "RANDEVU",
    kind: "booking",
    panels: [{ id: "booking", body: "" }],
  },
];

export const visibleChapters = chapters.filter((c) => !c.hidden);
