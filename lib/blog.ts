/**
 * Blog altyapısı — yazıları ve etiketleri buraya ekleyin.
 *
 * Yeni yazı:
 * 1. `blogTags` içine etiket ekleyin (yoksa)
 * 2. `blogPosts` dizisine yazıyı ekleyin
 * 3. `draft: true` ise yayına almak için kaldırın
 */

export type BlogTag = {
  /** URL slug — küçük harf, tire ile: `makina-tasarimi` */
  id: string;
  /** Görünen ad */
  label: string;
  description?: string;
};

export type BlogPostSection = {
  heading?: string;
  paragraphs: string[];
  /** Madde işaretli liste (opsiyonel) */
  list?: string[];
  /** Bölüm sonu CTA (opsiyonel) */
  callToAction?: {
    lead: string;
    label: string;
    href: string;
  };
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  /** ISO tarih: YYYY-MM-DD */
  publishedAt: string;
  updatedAt?: string;
  /** `blogTags` içindeki id'ler */
  tags: string[];
  author?: string;
  category?: string;
  readingTimeMinutes?: number;
  /** Yayınlanmadan önce true bırakın */
  draft?: boolean;
  sections: BlogPostSection[];
};

/** Etiket listesi — Dok. 07 konu haritasından */
export const blogTags: BlogTag[] = [
  {
    id: "muhendislik-danismanligi",
    label: "Mühendislik Danışmanlığı",
    description: "Teknik danışmanlık, sanayi mühendislik desteği",
  },
  {
    id: "proje-danismanligi",
    label: "Proje Danışmanlığı",
    description: "Üretim optimizasyonu, tesis yönetimi, süreç iyileştirme",
  },
  {
    id: "teknik-ekip-yonetimi",
    label: "Teknik Ekip Yönetimi",
    description: "Mühendislik süreç yönetimi, iş akışı kurulumu",
  },
  {
    id: "tasarim-gelistirme",
    label: "Tasarım & Geliştirme",
    description: "Özel makina tasarımı, tersine mühendislik, teknik resim",
  },
  {
    id: "analiz-hesaplama",
    label: "Analiz & Hesaplama",
    description: "FEA, simülasyon, mühendislik hesabı, teknik raporlama",
  },
  {
    id: "uretim-danismanligi",
    label: "Üretim Danışmanlığı",
    description: "Fason üretim, imalat koordinasyonu, çözüm ortağı ağı",
  },
  {
    id: "kapasite-imalat",
    label: "Kapasite & İmalat",
    description: "CNC, lazer, 3D baskı, prototipleme, seri üretime geçiş",
  },
  {
    id: "arge-urge",
    label: "Ar-Ge & Ür-Ge",
    description: "Fikirden ürüne, ürün geliştirme, Ar-Ge proje yönetimi",
  },
  {
    id: "tubitak-kosgeb-patent",
    label: "TÜBİTAK, KOSGEB & Patent",
    description: "Destek programları, patent ve marka tescili",
  },
  {
    id: "ankara-sanayi",
    label: "Ankara & Sanayi",
    description: "Yerel mühendislik danışmanlığı, savunma sanayi tedarik",
  },
  {
    id: "dfm-dfa",
    label: "DFM / DFA",
    description: "Üretime ve montaja yönelik tasarım, maliyet optimizasyonu",
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "uretime-yonelik-tasarim-dfm",
    title:
      "Üretime Yönelik Tasarım (DFM): Maliyeti Tezgâhta Değil, Tasarımda Düşürmek",
    description:
      "Üretime yönelik tasarım (DFM) ile 30 dakikalık talaşlı imalat işçiliğinin tek operasyonlu lazer kesime nasıl indiğini gerçek bir parça örneğiyle anlatıyoruz.",
    publishedAt: "2026-06-26",
    updatedAt: "2026-06-26",
    author: "Ömer Faruk",
    category: "DFM/DFA",
    readingTimeMinutes: 4,
    tags: ["dfm-dfa", "tasarim-gelistirme", "uretim-danismanligi", "kapasite-imalat"],
    sections: [
      {
        paragraphs: [
          "Bir parça çalışıyordu. Silindirik bir sıkma görevi yapıyor, sahada sorun çıkarmıyordu. Ama her bir adedi AISI 304 malzemeden torna, freze ve tesviye operasyonlarıyla üretiliyor; parça başına yaklaşık 30 dakika işçilik istiyordu. Sorun parçanın çalışması değildi. Sorun, çalışması için ödenen bedeldi.",
          "İşte üretime yönelik tasarım (Design for Manufacturing — DFM) tam da bu noktada devreye girer. DFM, bir parçayı sadece çalışır hale getirmekle ilgilenmez; onu en hızlı, en ucuz ve en tekrarlanabilir şekilde üretilebilir kılmakla ilgilenir. Bu yazıda DFM'in ne olduğunu, gerçek bir parça üzerinden 30 dakikalık işçiliğin nasıl saniyelere indiğini ve bu yaklaşımın bir ürünün maliyetini neden daha çizim aşamasında belirlediğini ele alıyoruz.",
        ],
      },
      {
        heading: "DFM nedir?",
        paragraphs: [
          "DFM, tasarımı üretime uydurmaz. Tasarımı, üretimin gerçeklerine hizalar.",
          "Bu ayrım önemlidir. Bir parça teknik olarak doğru çizilmiş, montaja oturmuş ve işlevini yerine getiriyor olabilir; yine de üretim açısından pahalı bir tasarım olabilir. Çünkü maliyetin büyük kısmı malzeme, operasyon sayısı, tezgâh saati ve operatör bağımlılığı gibi kalemlerde gizlidir ve bu kalemlerin neredeyse tamamı geometriyle birlikte, tasarım masasında kilitlenir. Üretim mühendisi sahada ancak sınırlı bir iyileştirme yapabilir; asıl kazanç, parçanın nasıl üretileceğine karar verildiği anda kazanılır ya da kaybedilir.",
          "DFM'in temel sorusu şudur: \"Bu geometri, bu işlevi yerine getirmek için gerçekten gerekli mi, yoksa sadece alışkanlıktan mı böyle çizildi?\"",
        ],
      },
      {
        heading: "Sahadaki parça: çalışıyor ama pahalı",
        paragraphs: [
          "Söz konusu parça, silindirik bir sıkma fonksiyonu taşıyordu ve klasik talaşlı imalat akışıyla üretiliyordu:",
        ],
        list: [
          "Malzeme: AISI 304 paslanmaz çelik",
          "Operasyonlar: torna + freze + tesviye",
          "İşçilik: parça başına ~30 dakika",
        ],
      },
      {
        paragraphs: [
          "İlk akla gelen iyileştirme, üretimi hızlandırmaktı. CNC torna ve canlı takım kullanmak çevrim süresini gerçekten düşürebilirdi. Ancak bu yaklaşım maliyeti bir yerden alıp başka yere taşıyordu: makine saati, bağlama (fikstür), yatırım maliyeti ve operatör bağımlılığı devreye giriyor, süreç farklı bir biçimde yine verimsiz kalıyordu. Daha hızlı bir talaşlı imalat, hâlâ talaşlı imalattı.",
        ],
      },
      {
        heading: "Bu parça neden işleniyor?",
        paragraphs: [
          "DFM ve DFA (montaja yönelik tasarım) birlikte ele alındığında kritik bir nokta görünür hale gelir: parçanın talaşlı imalatla üretilmesi işlevsel bir zorunluluk değildi. Silindirik form, sıkma fonksiyonu için şart olan bir özellik değil, sadece üretim yönteminin dayattığı bir biçimdi.",
          "Bu fark edildiğinde tasarım hedefi değişir. Amaç daha iyi işlemek değil, işlemeye ihtiyaç bırakmamaktı.",
          "Sıkma fonksiyonu ve işlevsel ölçüler korunarak, geometri ve üretim yöntemi yeniden tanımlandı. Tasarımın çıkış noktası \"bu parçayı nasıl daha hızlı işleriz\" değil, \"bu işlevi işleme operasyonu olmadan nasıl elde ederiz\" sorusu oldu.",
        ],
      },
      {
        heading: "Çözüm: tek operasyonda üretim",
        paragraphs: [
          "Yeniden tanımlanan tasarımda parça, hazır AISI 304 boru profilden üretildi:",
        ],
        list: [
          "Stoktan AISI 304 boru profil temin edildi.",
          "Parça, lazer profil kesim ile tek operasyonda ve adetli olarak kesildi.",
          "Kısa bir tesviye sonrası parça kullanıma hazır hale geldi.",
        ],
      },
      {
        paragraphs: [
          "İşlevi sağlayan ölçüler birebir korundu; değişen tek şey, o ölçülere ulaşma yöntemiydi. Talaşla şekil verilen bir geometri yerine, doğru başlangıç malzemesi ve tek bir kesim operasyonu kullanıldı.",
        ],
      },
      {
        heading: "Sonuç",
        list: [
          "Üretim süresi dakikalardan saniyelere indi.",
          "Torna ve freze operasyonları tamamen devreden çıktı.",
          "Talaşlı imalatta kaybedilen hammadde minimize edildi.",
          "Operatör ve bağlama kaynaklı hata payı ortadan kalktı.",
          "Süreç, seri üretime uygun hale geldi.",
        ],
        paragraphs: [
          "Kazanç tek bir operasyonun hızlanmasından değil, bir operasyon zincirinin tümden ortadan kalkmasından geldi. Maliyet, tezgâhta değil, tasarım kararında düştü.",
        ],
      },
      {
        heading: "Bu yaklaşım nerede geçerli?",
        paragraphs: [
          "Bu örnek tek bir parçayla ilgili görünse de, altında yatan ilke geneldir. Bir geometri çoğu zaman işlevin değil, ilk akla gelen üretim yönteminin izini taşır. \"Hep böyle üretildi\" cümlesi, çoğu zaman gizli bir maliyet kaleminin örtüsüdür. DFM, bu örtüyü kaldırıp şu soruyu sorar: işlevi koruyarak operasyon sayısını, malzeme kaybını ve insan bağımlılığını azaltabilir miyiz?",
          "DFM teorik bir kavram değildir. Tasarımcı, imalatçı gibi düşünmeye başladığında gerçek değer ortaya çıkar.",
        ],
        callToAction: {
          lead: "Üretimde tekrar eden, pahalı ya da operatöre bağımlı bir parçanız mı var?",
          label: "Tasarım gözden geçirme için iletişime geçin",
          href: "/?b=iletisim",
        },
      },
    ],
  },
];

export function getPublishedPosts(): BlogPost[] {
  return blogPosts
    .filter((post) => !post.draft)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug && !post.draft);
}

export function getAllPostSlugs(): string[] {
  return getPublishedPosts().map((post) => post.slug);
}

export function getTagById(id: string): BlogTag | undefined {
  return blogTags.find((tag) => tag.id === id);
}

export function getPostsByTag(tagId: string): BlogPost[] {
  return getPublishedPosts().filter((post) => post.tags.includes(tagId));
}

export function getAllTagIds(): string[] {
  return blogTags.map((tag) => tag.id);
}

export function resolvePostTags(post: BlogPost): BlogTag[] {
  return post.tags
    .map((id) => getTagById(id))
    .filter((tag): tag is BlogTag => Boolean(tag));
}
