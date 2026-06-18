/**
 * Derin SEO içerik — crawlable detay sayfaları için AEO blokları.
 * Panel id = slug. Yeni hizmet/kapasite: ilgili Record'a kayıt ekle.
 * Detay: docs/09-seo-geo-aeo-altyapi.md
 */

export type SeoContentSection = {
  heading: string;
  paragraphs: string[];
};

export type SeoFaqItem = {
  question: string;
  answer: string;
};

export type PanelSeoContent = {
  summary: string;
  sections: SeoContentSection[];
  faq: SeoFaqItem[];
};

export const hizmetSeoContent: Record<string, PanelSeoContent> = {
  "proje-danismanligi": {
    summary:
      "Proje danışmanlığı, üretim ve tesis projelerinizi baştan sona teknik bir gözle yönetmek; dağınık ya da tıkanmış işleri ölçülebilir plana ve doğru tempoya bağlamaktır.",
    sections: [
      {
        heading: "Bu hizmet ne çözer?",
        paragraphs: [
          "Teknik projeler büyüdükçe kapsam kayması, belirsiz sorumluluklar ve takip edilemeyen ilerleme ortaya çıkar. Proje danışmanlığında üretim, tesis ve süreç (proses) optimizasyonu için yol haritası çıkarır; kritik kararları yazılı ve ölçülebilir hale getiririz.",
          "Bu, Takt'ın en geniş hizmet başlığıdır: teknik yönetim, planlama ve operasyonel ritim bir arada ele alınır.",
        ],
      },
      {
        heading: "Kimler için?",
        paragraphs: [
          "Özel makina veya sistem üreten, tesis yatırımı yapan ya da mevcut üretim hattını yeniden düzenleyen firmalar.",
          "İç ekibi güçlü ama proje yönetimi kapasitesi sınırlı olan teknik kadrolar.",
          "Birden fazla paydaşın (tasarım, imalat, tedarik) koordine edilmesi gereken karmaşık işler.",
        ],
      },
      {
        heading: "Nasıl çalışıyoruz?",
        paragraphs: [
          "İhtiyaç ve eksik halkayı birlikte netleştiririz; kapsam, takvim ve çıktıları yazılı tanımlarız.",
          "Proje boyunca teknik kararları destekler, ilerlemeyi raporlanabilir biçimde takip ederiz.",
          "Gerekirse tasarım, analiz veya üretim koordinasyonu ile diğer hizmetlerimizi aynı çatı altında birleştiririz.",
        ],
      },
      {
        heading: "Örnek senaryolar",
        paragraphs: [
          "Yeni bir üretim hattı kurulumunda süreç akışının yeniden tasarlanması ve tedarikçi koordinasyonu.",
          "Tıkanmış bir Ar-Ge projesinde teknik yol haritasının yeniden çizilmesi ve teslim takviminin toparlanması.",
          "Mevcut tesisin kapasite artırımı için proses optimizasyonu ve uygulama takibi.",
        ],
      },
    ],
    faq: [
      {
        question: "Sadece proje danışmanlığı alabilir miyim?",
        answer:
          "Evet. Diğer hizmetlerden bağımsız olarak da çalışabiliriz.",
      },
      {
        question: "Uzaktan çalışıyor musunuz?",
        answer:
          "Evet; proje bazlı olarak uzaktan da yürütülebilir. Sahada gereken adımlar kapsamda netleştirilir.",
      },
    ],
  },
  "teknik-ekip": {
    summary:
      "Teknik ekip ve süreç yönetimi, kadronuzun yükünü hafifletmek; iş akışını verimli ve takip edilebilir kılmak ve eksik halkayı dışarıdan tamamlamaktır.",
    sections: [
      {
        heading: "Bu hizmet ne çözer?",
        paragraphs: [
          "Teknik ekipler çoğu zaman aynı anda tasarım, üretim takibi, tedarik ve dokümantasyon arasında bölünür. Süreçler kurulmamışsa bilgi kişilerde kalır, iş yavaşlar.",
          "Bu hizmette teknik kadronun ritmini düzene sokar, iş akışı kurar ve ihtiyaç duyduğunuz mühendislik kapasitesini dışarıdan ekleriz.",
        ],
      },
      {
        heading: "Kimler için?",
        paragraphs: [
          "Büyüyen ama henüz tam kadro kurmamış üretim ve imalat firmaları.",
          "Yoğun proje döneminde ek kapasiteye ihtiyaç duyan teknik ekipler.",
          "İşe alım sürecinde aday mühendis değerlendirmesi ve teknik mülakat desteği arayan firmalar.",
        ],
      },
      {
        heading: "Nasıl çalışıyoruz?",
        paragraphs: [
          "Mevcut ekip yapısını ve iş yükünü analiz ederiz; boşlukları ve darboğazları tespit ederiz.",
          "Görev dağılımı, raporlama ritmi ve iletişim kanallarını netleştiririz.",
          "Belirlenen süre boyunca teknik ekip yönetimi veya bireysel mühendislik desteği sağlarız.",
        ],
      },
      {
        heading: "Örnek senaryolar",
        paragraphs: [
          "Ar-Ge ekibine dışarıdan kıdemli mühendis desteği ile proje teslim süresinin kısaltılması.",
          "Dağınık iş takibinin haftalık raporlama ve net sorumluluk matrisine dönüştürülmesi.",
          "Yeni mühendis alımında teknik yetkinlik değerlendirmesi ve işe uyum sürecinin desteklenmesi.",
        ],
      },
    ],
    faq: [
      {
        question: "Tam zamanlı ekip gibi mi çalışıyorsunuz?",
        answer:
          "Hayır. Projeye özel, esnek kapasite sunarız; tam zamanlı kadro maliyeti olmadan güç eklersiniz.",
      },
      {
        question: "İşe alım sürecinde ne kadar destek veriyorsunuz?",
        answer:
          "Teknik mülakat, örnek iş değerlendirmesi ve pozisyona uygunluk konusunda danışmanlık sağlarız.",
      },
    ],
  },
  "tasarim-gelistirme": {
    summary:
      "Tasarım ve geliştirme, özel makina, sistem ve ürünleri fikirden imalata hazır teknik çözüme dönüştürmek; mevcut tasarımları performans ve maliyet açısından iyileştirmektir.",
    sections: [
      {
        heading: "Bu hizmet ne çözer?",
        paragraphs: [
          "Fikir ile imalat arasındaki boşlukta teknik detay eksikliği, revizyon döngüleri ve maliyet sürprizleri oluşur. Bu hizmette konseptten teknik resme, montaj ve imalat düşüncesiyle tasarım yaparız.",
          "Tersine mühendislik çözümlerimizle mevcut parçaları dijitale taşıyarak üretim süreçlerini kısaltırız.",
        ],
      },
      {
        heading: "Kimler için?",
        paragraphs: [
          "Özel makina veya endüstriyel sistem üreten firmalar.",
          "Mevcut ürününü geliştirmek veya maliyetini düşürmek isteyen üreticiler.",
          "Prototipten seri üretime geçiş öncesi tasarım olgunlaştırması gereken ekipler.",
        ],
      },
      {
        heading: "Nasıl çalışıyoruz?",
        paragraphs: [
          "İhtiyaç ve kısıtları (malzeme, tolerans, üretim yöntemi) baştan netleştiririz.",
          "3D model, teknik çizim ve imalat dokümantasyonunu üretime uygun biçimde hazırlarız.",
          "Gerekirse analiz ve üretim koordinasyonu ile süreci uçtan uca tamamlarız.",
        ],
      },
      {
        heading: "Örnek senaryolar",
        paragraphs: [
          "Yeni bir özel makina konseptinin detay tasarımına ve imalat çizimlerine dönüştürülmesi.",
          "Mevcut bir ürünün malzeme veya geometri optimizasyonu ile maliyet düşürülmesi.",
          "Tersine mühendislik ile eski parçanın yeniden üretilebilir hale getirilmesi.",
        ],
      },
    ],
    faq: [
      {
        question: "Hangi CAD/formatlarda teslim ediyorsunuz?",
        answer:
          "Proje ihtiyacına göre STEP, PDF teknik resim ve imalat dosyaları; format kapsamda baştan belirlenir.",
      },
      {
        question: "Tersine mühendislik yapıyor musunuz?",
        answer:
          "Evet. 3D tarama ve modelleme ile mevcut parçaları dijitale taşıyoruz.",
      },
    ],
  },
  "analiz-hesaplama": {
    summary:
      "Analiz ve hesaplama, mühendislik kararlarınızı sayıyla desteklemek; simülasyon ve hesaplarla riski azaltıp sonuçları net, uygulanabilir raporlara dökmektir.",
    sections: [
      {
        heading: "Bu hizmet ne çözer?",
        paragraphs: [
          "Tasarım kararları sezgiyle verildiğinde prototip maliyeti ve saha sürprizleri artar. Mühendislik hesapları, FEA/CFD benzeri analizler ve teknik raporlama ile kararları doğrularız.",
          "Sonuçlar yönetici ve üretim ekibinin anlayacağı dilde, aksiyon alınabilir biçimde sunulur.",
        ],
      },
      {
        heading: "Kimler için?",
        paragraphs: [
          "Kritik yük, ısı, akış veya titreşim analizi gerektiren makina ve sistem projeleri.",
          "İç analiz kapasitesi olmayan tasarım ekipleri.",
          "Müşteri veya denetim için teknik rapor ihtiyacı olan firmalar.",
        ],
      },
      {
        heading: "Nasıl çalışıyoruz?",
        paragraphs: [
          "Analiz kapsamını, varsayımları ve kabul kriterlerini baştan yazılı tanımlarız.",
          "Hesap ve simülasyonları yürütür, sonuçları yorumlarız.",
          "Öneriler ve risk notlarıyla birlikte teknik rapor teslim ederiz.",
        ],
      },
      {
        heading: "Örnek senaryolar",
        paragraphs: [
          "Taşıyıcı yapıda statik/dinamik yük analizi ve güvenlik marjı değerlendirmesi.",
          "Isı transferi veya akışkan davranışının simülasyonu ile tasarım iyileştirmesi.",
          "Müşteri sunumu için teknik hesap özeti ve rapor hazırlanması.",
        ],
      },
    ],
    faq: [
      {
        question: "Hangi analiz türlerini kapsıyorsunuz?",
        answer:
          "Yapısal hesap, FEA, termal ve akışkan analizi gibi ihtiyaca özel mühendislik hesapları; kapsam projede netleştirilir.",
      },
      {
        question: "Raporlar hangi dilde hazırlanır?",
        answer: "Türkçe; gerektiğinde İngilizce özet eklenebilir.",
      },
    ],
  },
  "uretim-danismanligi": {
    summary:
      "Üretim danışmanlığı, ihtiyacınızı doğru üretim çözümüne yönlendirmek; güvenilir çözüm ortaklarıyla eşleştirip imalat sürecini sizin adınıza koordine etmektir.",
    sections: [
      {
        heading: "Bu hizmet ne çözer?",
        paragraphs: [
          "Doğru üreticiyi bulmak, teklifleri karşılaştırmak ve imalatı takip etmek zaman alır. Üretimi kendimiz fabrikada yapmıyoruz; geniş çözüm ortağı ağımızla doğru işi doğru üreticiyle eşleştirir, süreci tek muhatap olarak yönetiriz.",
        ],
      },
      {
        heading: "Kimler için?",
        paragraphs: [
          "Tasarımı hazır ama imalat kapasitesi veya tedarik ağı sınırlı firmalar.",
          "Birden fazla parça ve üretim yöntemi içeren karmaşık projeler.",
          "Fason üretim, kaynak, CNC veya yüzey işlemi koordinasyonu gerektiren işler.",
        ],
      },
      {
        heading: "Nasıl çalışıyoruz?",
        paragraphs: [
          "Teknik gereksinimleri ve toleransları netleştiririz.",
          "Uygun üreticileri belirler, teklif ve kapasite değerlendirmesi yaparız.",
          "Üretim, kalite kontrol ve teslimat adımlarını koordine ederiz.",
        ],
      },
      {
        heading: "Örnek senaryolar",
        paragraphs: [
          "Prototip parçaların CNC ve kaynak işlemlerinin farklı atölyelerde koordine edilmesi.",
          "Seri üretim öncesi doğru malzeme ve üretim yöntemi seçimi.",
          "Tedarikçi performans takibi ve teknik revizyon iletişiminin yönetilmesi.",
        ],
      },
    ],
    faq: [
      {
        question: "Üretimi kendiniz mi yapıyorsunuz?",
        answer:
          "Üretimi geniş çözüm ortağı ağımızla yürütüyoruz; doğru üreticiyle eşleştirir ve süreci sizin adınıza koordine ediyoruz.",
      },
      {
        question: "Kapasitemiz sayfasıyla ilişkisi nedir?",
        answer:
          "Kapasitemiz bölümünde koordine ettiğimiz üretim yöntemlerinin tam listesini bulabilirsiniz.",
      },
    ],
  },
  "arge-urge": {
    summary:
      "Ar-Ge ve Ür-Ge danışmanlığı, fikirden ürüne giden yolda araştırma-geliştirme ve ürün geliştirme süreçlerini kurgulamak; prototipten seri üretime teknik olgunluğu yönetmektir.",
    sections: [
      {
        heading: "Bu hizmet ne çözer?",
        paragraphs: [
          "Ar-Ge projeleri belirsiz kapsam, tekrarlayan prototip ve dokümantasyon eksikliğiyle yavaşlar. Ür-Ge tarafında ise pazara çıkış öncesi üretilebilirlik ve maliyet kritik hale gelir.",
          "Her iki süreçte de teknik yol haritası, milestone'lar ve çıktı tanımlarıyla ilerlemeyi görünür kılarız.",
        ],
      },
      {
        heading: "Kimler için?",
        paragraphs: [
          "Yeni ürün geliştiren makina ve sistem üreticileri.",
          "Mevcut ürününü revize eden veya yeni varyant çıkaran firmalar.",
          "Üniversite veya sanayi iş birliği kapsamında Ar-Ge yürüten ekipler.",
        ],
      },
      {
        heading: "Nasıl çalışıyoruz?",
        paragraphs: [
          "Teknik hedefleri ve başarı kriterlerini tanımlarız.",
          "Tasarım, prototip ve test döngülerini planlarız.",
          "Seri üretime geçiş öncesi olgunluk değerlendirmesi yaparız.",
        ],
      },
      {
        heading: "Örnek senaryolar",
        paragraphs: [
          "Yeni bir endüstriyel cihazın konseptten fonksiyonel prototipe taşınması.",
          "Mevcut ürünün üretilebilirlik analizi ve maliyet optimizasyonu.",
          "Ar-Ge ekibine dışarıdan proje ve teknik dokümantasyon desteği.",
        ],
      },
    ],
    faq: [
      {
        question: "TÜBİTAK veya KOSGEB destekleriyle birlikte çalışıyor musunuz?",
        answer:
          "Evet. Ar-Ge içeriği ile destek programı başvurularını birlikte kurgulayabiliriz; detay için TÜBİTAK/KOSGEB hizmet sayfamıza bakın.",
      },
      {
        question: "Sadece danışmanlık mı, uygulama da var mı?",
        answer:
          "İkisi de. Süreç tasarımı ve teknik uygulama (tasarım, analiz, koordinasyon) kapsamda birlikte belirlenir.",
      },
    ],
  },
  "tubitak-kosgeb": {
    summary:
      "TÜBİTAK, KOSGEB ve Türk Patent proje desteği; destek programlarına uygun projeleri hazırlamak, teknik doküman ve raporları oluşturmak ve süreci başvurudan raporlamaya kadar yönetmektir.",
    sections: [
      {
        heading: "Bu hizmet ne çözer?",
        paragraphs: [
          "Destek programları teknik içerik, bütçe ve raporlama disiplini gerektirir. Proje fikrini programa uygun hale getirir, başvuru dokümanlarını hazırlar ve yürütme döneminde teknik raporlamayı destekleriz.",
          "Patent ve marka tescil başvurularınızın hazırlanması ve sürecin takibi de bu kapsamdadır.",
        ],
      },
      {
        heading: "Kimler için?",
        paragraphs: [
          "TÜBİTAK veya KOSGEB desteği düşünen üretici ve teknoloji firmaları.",
          "Üniversite-sanayi iş birliği projesi hazırlayan ekipler.",
          "Fikri mülkiyet koruması planlayan Ar-Ge yapan firmalar.",
        ],
      },
      {
        heading: "Nasıl çalışıyoruz?",
        paragraphs: [
          "Proje fikrini ve uygun çağrı/programı birlikte değerlendiririz.",
          "Teknik özet, iş planı ve bütçe bileşenlerini hazırlarız.",
          "Yürütme ve raporlama döneminde teknik içerik desteği sağlarız.",
        ],
      },
      {
        heading: "Örnek senaryolar",
        paragraphs: [
          "Yeni makina geliştirme projesi için TÜBİTAK başvuru dosyasının hazırlanması.",
          "KOSGEB Ar-Ge veya inovasyon desteği kapsamında teknik raporlama.",
          "Ürün için patent başvuru dokümantasyonunun hazırlanması ve süreç takibi.",
        ],
      },
    ],
    faq: [
      {
        question: "Başvuru garantisi veriyor musunuz?",
        answer:
          "Hayır. Teknik hazırlık ve dokümantasyon desteği sunarız; değerlendirme kurumun yetkisindedir.",
      },
      {
        question: "Üniversite iş birliği projelerinde destek veriyor musunuz?",
        answer:
          "Evet. Sanayi tarafı teknik içerik ve proje yönetimi desteği sağlayabiliriz.",
      },
    ],
  },
};

export function getHizmetSeoContent(panelId: string): PanelSeoContent | undefined {
  return hizmetSeoContent[panelId];
}

/** Kapasite detay AEO içeriği — panel id ile eşleşir; boş kayıt genişletmeye hazır */
export const kapasiteSeoContent: Record<string, PanelSeoContent> = {
  // "3d-tarama": { summary: "...", sections: [...], faq: [...] },
};

export function getKapasiteSeoContent(
  panelId: string,
): PanelSeoContent | undefined {
  return kapasiteSeoContent[panelId];
}
