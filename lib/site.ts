export const siteAddress = {
  streetAddress: "İvedik OSB, 1476. Sk. İvedik İş Merkezi D:8/11",
  postalCode: "06378",
  addressLocality: "Yenimahalle",
  addressRegion: "Ankara",
  addressCountry: "TR",
} as const;

export function formatSiteAddressOneLine(): string {
  return `${siteAddress.streetAddress}, ${siteAddress.postalCode} ${siteAddress.addressLocality}/${siteAddress.addressRegion}`;
}

export function formatSiteAddressLines(): readonly [string, string] {
  return [
    siteAddress.streetAddress,
    `${siteAddress.postalCode} ${siteAddress.addressLocality} / ${siteAddress.addressRegion}`,
  ];
}

const siteAddressOneLine = formatSiteAddressOneLine();

/** Google Haritalar — doğrulanmış işletme/konum pini */
const siteMapsPlaceUrl = "https://maps.app.goo.gl/MQd2WNjEsfLMg1Xo7";
const siteMapsCoordinates = {
  lat: 39.991268,
  lng: 32.7429904,
} as const;

export const siteConfig = {
  name: "Takt",
  url: "https://takt.tr",
  email: "info@takt.tr",
  phone: "+90 551 981 4728",
  phoneHref: "tel:+905519814728",
  tagline: "Teknik ekibinizin eksik halkası.",
  description:
    "Makina imalatı ve savunma sanayisindeki firmaların teknik ekibine dışarıdan güç katan mühendislik danışmanlığı.",
  linkedin: "https://www.linkedin.com/company/takt-danismanlik/",
  instagram: "https://instagram.com/takt.eng",
  address: siteAddress,
  addressLabel: siteAddressOneLine,
  mapsUrl: siteMapsPlaceUrl,
  mapsEmbedUrl: `https://www.google.com/maps?q=${siteMapsCoordinates.lat},${siteMapsCoordinates.lng}&hl=tr&z=17&output=embed`,
  mapsCoordinates: siteMapsCoordinates,
  logo: {
    src: "/logo.webp",
    width: 700,
    height: 700,
    alt: "Takt logosu",
  },
  /** Web3Forms — sunucu tarafında `WEB3FORMS_ACCESS_KEY` env ile kullanılır */
  web3formsAccessKey: "",
} as const;

export const appointmentTimezone = "Europe/Istanbul";

function calendarUrl(base: string) {
  const separator = base.includes("?") ? "&" : "?";
  return `${base}${separator}ctz=${encodeURIComponent(appointmentTimezone)}&hl=tr`;
}

/** Tam randevu URL'leri — kısa calendar.app.google linkleri yönlendirmede ?ctz= parametresini düşürür */
export const appointmentTypes = [
  {
    id: "danismanlik",
    title: "Danışmanlık hizmetleri",
    description: "",
    url: calendarUrl(
      "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1n2azEHI4a465C161L-PdGwZZhofU7e6778UNeRUhDAyTOd36l2Gf2x2H5s0UwbGlLWw-rRBbs",
    ),
  },
  {
    id: "on-gorusme",
    title: "Ön görüşme (online)",
    description: "",
    url: calendarUrl(
      "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0kWu7f05RIiS6rGhPMIkYdnXtQsBWzWkyC4lD8ky34XEwhsJYK0oBL0k9LU7rfBlt03xJSdZGZ",
    ),
  },
] as const;

export const navLinks = [
  { href: "/?b=hakkimizda", id: "hakkimizda", label: "Hakkımızda" },
  { href: "/?b=hizmetler", id: "hizmetler", label: "Hizmetlerimiz" },
  { href: "/?b=kapasitemiz", id: "kapasitemiz", label: "Kapasitemiz" },
  { href: "/?b=yaklasim", id: "yaklasim", label: "Yaklaşım" },
  { href: "/?b=iletisim", id: "iletisim", label: "İletişim" },
  { href: "/blog", id: "blog", label: "Blog" },
  { href: "/sss", id: "sss", label: "SSS" },
] as const;

export const appointmentCta = {
  href: "/?b=gorusme-planla",
  label: "Görüşme planla",
} as const;

export const servicePillars = [
  {
    id: "muhendislik-danismanligi",
    number: "01",
    title: "Mühendislik Danışmanlığı",
    short:
      "Teknik karar, proje ve ekip yönetiminde yanınızdayız.",
    description:
      "Teknik kararlarınızda ve proje yönetiminde dışarıdan, deneyimli bir gözle yanınızdayız. Ekibinizin yükünü hafifletir, süreçleri düzene sokarız.",
    items: [
      "Teknik danışmanlık ve karar desteği",
      "Proje yönetimi",
      "Teknik ekip yönetimi ve Ar-Ge yönetimi",
      "Çalışma sistemi ve iş akışı kurulumu",
    ],
  },
  {
    id: "tasarim-gelistirme",
    number: "02",
    title: "Tasarım & Geliştirme",
    short: "Özel makina, sistem ve ürün tasarımı.",
    description:
      "Fikirden teknik resme: özel makina, sistem ve ürünleri imalata hazır biçimde tasarlarız.",
    items: [
      "Özel makina tasarımı",
      "Sistem ve ürün tasarımı",
      "İmalat projeleri ve teknik resim",
      "Tasarım optimizasyonu",
    ],
  },
  {
    id: "analiz-hesaplama",
    number: "03",
    title: "Analiz & Hesaplama",
    short: "Mühendislik hesapları, simülasyon ve teknik raporlama.",
    description:
      "Kararlarınızı sayıyla destekleriz: mühendislik hesapları, simülasyon ve net teknik raporlar.",
    items: [
      "Mühendislik hesapları",
      "Simülasyon ve analiz",
      "Teknik raporlama ve dokümantasyon",
    ],
  },
  {
    id: "uretim-optimizasyon",
    number: "04",
    title: "Üretim & Optimizasyon",
    short: "Prototipten seri üretime, maliyet ve imalat optimizasyonu.",
    description:
      "Fikrinizi ya da ürününüzü üretime taşıyoruz; mevcut imalatı daha verimli hale getiriyoruz.",
    items: [
      "İmalata hazırlık ve prototipleme",
      "Seri üretime geçiş desteği",
      "Tesis ve imalat yönetimi optimizasyonu",
      "Maliyet ve geliştirme optimizasyonu",
    ],
  },
  {
    id: "arge-proje",
    number: "05",
    title: "Ar-Ge & Proje Destekleri",
    short: "TÜBİTAK/KOSGEB projeleri ve üniversite-sanayi iş birliği.",
    description:
      "Doğru projeyi doğru çağrıya hazırlarız; araştırma ile sanayiyi buluştururuz.",
    items: [
      "TÜBİTAK proje hazırlama ve yürütme",
      "KOSGEB başvuru ve raporlama",
      "Üniversite-sanayi iş birliği ve ürün projeleri",
    ],
  },
] as const;

export const processSteps = [
  {
    title: "Tespit",
    description: "İhtiyacı ve eksik halkayı birlikte netleştiririz.",
  },
  {
    title: "Plan",
    description: "Kapsam, takvim ve çıktıları yazılı koyarız.",
  },
  {
    title: "Uygulama",
    description:
      "Tasarım/analiz/yönetim işini belirlenen tempoda yürütürüz.",
  },
  {
    title: "Teslim",
    description: "Raporlanabilir, devredilebilir çıktıyla kapatırız.",
  },
] as const;

export const whyTakt = [
  {
    title: "Esnek güç",
    description:
      "Tam zamanlı kadro maliyeti olmadan, projeye özel mühendislik kapasitesi.",
  },
  {
    title: "Operasyonel ritim",
    description:
      "İşin doğru tempoda ve takip edilebilir biçimde ilerlemesi — gecikme ve kör nokta azalır.",
  },
  {
    title: "Tek muhatap",
    description:
      "Tasarımdan imalata kadar süreci tek elden yönetir, ekibinizle uyumlu çalışırız.",
  },
] as const;

export const approachPrinciples = [
  {
    title: "Net kapsam",
    description:
      "Ne yapacağımızı, ne zaman ve hangi çıktıyla yapacağımızı baştan yazarız.",
  },
  {
    title: "Ekibinizle uyum",
    description: "Yerinizi almayız; eksik halkayı tamamlarız.",
  },
  {
    title: "Takip edilebilirlik",
    description: "İlerleme görünür ve raporlanabilir olur.",
  },
  {
    title: "Dürüst mühendislik",
    description: "Yapabileceğimizi söyler, yapamayacağımızı da. Abartı yok.",
  },
] as const;

export const faqItems = [
  {
    question: "Takt ne iş yapar?",
    answer:
      "Takt, makina imalatı ve sanayide çalışan firmaların teknik ekibine dışarıdan mühendislik gücü katan bir danışmanlıktır. Proje danışmanlığı, tasarım, analiz, üretim koordinasyonu ve Ar-Ge/proje desteği sunar.",
  },
  {
    question: "Mühendislik danışmanlığı ne işe yarar?",
    answer:
      "Mühendislik danışmanlığı, bir firmanın teknik kararlarını, tasarımını ve süreçlerini dışarıdan uzman desteğiyle güçlendirmesini sağlar. Eksik kapasiteyi tam zamanlı kadro maliyeti olmadan tamamlar.",
  },
  {
    question: "Tersine mühendislik nedir?",
    answer:
      "Tersine mühendislik, mevcut bir parça veya ürünün ölçülerek ve analiz edilerek dijital/üretilebilir modeline ulaşılmasıdır. Eski veya teknik resmi olmayan parçaların yeniden üretimini mümkün kılar.",
  },
  {
    question: "Fason üretim nedir?",
    answer:
      "Fason üretim, bir ürünün başka bir üreticiye yaptırılmasıdır. Takt, işi doğru çözüm ortağıyla eşleştirir ve imalat sürecini sizin adınıza koordine eder.",
  },
  {
    question: "Takt time nedir?",
    answer:
      "Takt time, üretimde talebi karşılamak için bir ürünün tamamlanması gereken ritmi/temposu tanımlar. Markamızın adı buradan gelir: işi doğru tempoda akıtmak.",
  },
  {
    question: "Hangi hizmetleri sunuyorsunuz?",
    answer:
      "Proje danışmanlığı; teknik ekip & süreç yönetimi; tasarım & geliştirme; analiz, hesaplama & raporlama; üretim danışmanlığı; Ar-Ge & Ür-Ge; TÜBİTAK/KOSGEB/Türk Patent destekleri.",
  },
  {
    question: "Üretimi kendiniz mi yapıyorsunuz?",
    answer:
      "Üretimi geniş çözüm ortağı ağımızla yürütüyoruz; doğru üreticiyle eşleştirir ve süreci sizin adınıza koordine ediyoruz.",
  },
  {
    question: "CNC, lazer kesim, 3D baskı gibi işler yapıyor musunuz?",
    answer:
      "Evet. CNC işleme/torna, lazer kesim ve markalama, 3D tarama/baskı, kaynak, kaplama ve boyamayı çözüm ortağı ağımızla karşılıyoruz.",
  },
  {
    question: "Prototip ürettiriyor musunuz?",
    answer:
      "Evet. Prototipleme ve prototipten seri üretime geçiş danışmanlığı veriyoruz.",
  },
  {
    question: "TÜBİTAK/KOSGEB projesinde nasıl destek veriyorsunuz?",
    answer:
      "Uygun projeyi belirler, teknik dokümanları ve raporları hazırlar, başvurudan yürütmeye kadar süreci yönetiriz.",
  },
  {
    question: "Patent veya marka tescilinde yardımcı oluyor musunuz?",
    answer:
      "Evet; patent ve marka başvurularını hazırlayıp süreci yürütüyoruz.",
  },
  {
    question: "Tek bir hizmet alabilir miyim?",
    answer: "Evet; hizmetler tek tek de, uçtan uca da alınabilir.",
  },
  {
    question: "Fikrimi üretime nasıl taşıyorsunuz?",
    answer:
      "Tasarım, analiz, prototipleme ve seri üretime geçiş adımlarıyla fikirden ürüne kadar süreci yönetiyoruz.",
  },
  {
    question: "Nerede hizmet veriyorsunuz?",
    answer:
      "Merkezimiz İvedik OSB, Yenimahalle / Ankara’dadır. Ağırlıklı Ankara sanayi ekosistemine hizmet veriyoruz; proje bazlı olarak uzaktan da çalışıyoruz.",
  },
  {
    question: "Çalışmaya nasıl başlıyoruz?",
    answer:
      "İhtiyacınızı kısaca iletin; ilk görüşmede kapsamı netleştirir, takvim ve çıktıları yazılı koyarız. İlk görüşme bağlayıcı değildir.",
  },
  {
    question: "Fiyatlandırma nasıl?",
    answer:
      "Ücretlendirme projenin kapsamına ve süresine göre belirlenir; net teklifi kapsamı konuştuktan sonra paylaşırız.",
  },
] as const;
