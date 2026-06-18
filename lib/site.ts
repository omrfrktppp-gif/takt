export const siteConfig = {
  name: "Takt",
  url: "https://takt.tr",
  email: "info@takt.tr",
  phone: "+90 551 981 4728",
  phoneHref: "tel:+905519814728",
  tagline: "Teknik ekibinizin eksik halkası.",
  description:
    "Makina imalatı ve savunma sanayisindeki firmaların teknik ekibine dışarıdan güç katan mühendislik danışmanlığı.",
  linkedin: "https://www.linkedin.com/company/takt",
  instagram: "https://instagram.com/takt.eng",
  /** Tam adres eklendiğinde güncellenecek */
  addressLabel: "Ankara, Türkiye",
  /** Google Haritalar — adres netleşince `q=` parametresi güncellenir */
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Ankara%2C+Turkey",
  /** Web3Forms — ücretsiz planda istemci tarafında kullanılır (public key) */
  web3formsAccessKey: "01980218-5dbb-42ef-8b56-3fbc2c93d874",
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
  { href: "/", id: "hakkimizda", label: "Hakkımızda" },
  { href: "/hizmetler", id: "hizmetler", label: "Hizmetlerimiz" },
  { href: "/kapasitemiz", id: "kapasitemiz", label: "Kapasitemiz" },
  { href: "/yaklasim", id: "yaklasim", label: "Yaklaşım" },
  { href: "/iletisim", id: "iletisim", label: "İletişim" },
] as const;

export const appointmentCta = {
  href: "/gorusme-planla",
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
      "Takt, makina imalatı ve savunma sanayisindeki firmaların teknik ekibine dışarıdan mühendislik gücü katan bir danışmanlıktır. Tasarım, analiz, proje ve operasyon yönetimi, üretim optimizasyonu ve Ar-Ge/proje desteği sunar.",
  },
  {
    question: "Tek bir hizmet alabilir miyim?",
    answer: "Evet. Hizmetler tek tek de, uçtan uca da alınabilir.",
  },
  {
    question: "Nerede hizmet veriyorsunuz?",
    answer:
      "Ağırlıklı olarak Ankara sanayi ekosistemine; proje bazlı olarak uzaktan da çalışırız.",
  },
  {
    question: "TÜBİTAK/KOSGEB projelerinde destek veriyor musunuz?",
    answer:
      "Evet; proje hazırlama, yürütme ve raporlama konusunda destek veriyoruz.",
  },
  {
    question: "Fikrimi üretime nasıl taşırsınız?",
    answer:
      "İmalata hazırlık, prototipleme ve seri üretime geçiş adımlarıyla, tasarımdan üretime kadar süreci yönetiriz.",
  },
] as const;
