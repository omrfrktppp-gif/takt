/**
 * Topic cluster pillar (rehber) sayfaları — Faz 6.
 * Her pillar ilgili blog yazılarına ve hizmet sayfasına bağlanır.
 */

export type PillarSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

export type Pillar = {
  id: string;
  slug: string;
  title: string;
  description: string;
  /** Hub kartı ve meta için kısa özet */
  summary: string;
  servicePath: string;
  relatedBlogSlugs: string[];
  sections: PillarSection[];
  /** ISO tarih — içerik güncellemesi */
  updatedAt: string;
};

export const pillars: Pillar[] = [
  {
    id: "tersine-muhendislik",
    slug: "tersine-muhendislik",
    title: "Tersine mühendislik rehberi",
    description:
      "Mevcut parçadan dijital modele ve üretilebilir teknik çıktıya geçiş: ne zaman gerekir, süreç adımları, GD&T ve sac metal DFM bağlantıları.",
    summary:
      "3D tarama, teknik resim ve imalata hazır model sürecini; sac metal ve toleranslama kararlarıyla birlikte ele alırız.",
    servicePath: "/hizmetler/tasarim-gelistirme",
    relatedBlogSlugs: [
      "hibrit-imalat-eklemeli-talasli",
      "sac-metal-tasarimi-dfm",
      "geometrik-toleranslama-gdt",
    ],
    updatedAt: "2026-06-26",
    sections: [
      {
        heading: "Tersine mühendislik nedir, ne zaman gerekir?",
        paragraphs: [
          "Tersine mühendislik, elinizde teknik dokümantasyonu eksik veya güncel olmayan bir parçanın fiziksel örneğinden yola çıkarak ölçülebilir dijital model ve üretilebilir teknik çıktı üretmektir. Orijinal tasarım verisi kaybolmuş parçalar, tedarikçi değişimi, revizyon ihtiyacı veya mevcut ürünü iyileştirme senaryolarında sık karşılaşılan bir ihtiyaçtır.",
          "Karar verirken şu soruları netleştirmek gerekir: Parça seri üretimde mi, tek adet mi? Malzeme ve yüzey toleransları ne kadar kritik? Mevcut parça aşınmış veya modifiye edilmiş mi? Bu cevaplar tarama yöntemi, ölçüm sıklığı ve modelleme detay seviyesini belirler.",
        ],
      },
      {
        heading: "Süreç nasıl işler?",
        paragraphs: [
          "Tipik akış dört aşamadan oluşur: hazırlık ve kapsam, fiziksel ölçüm (3D tarama veya geleneksel ölçüm), CAD modelleme ve doğrulama, ardından teknik resim veya imalat çıktısı. Kapsam baştan yazılı tanımlanır; hangi yüzeylerin kritik olduğu, hangi bölgelerin referans alınacağı ve teslim formatı (STEP, teknik resim, sac metal açılım vb.) netleştirilir.",
          "Karmaşık geometrilerde tarama noktası bulutu ile yüzey modeli arasında sapma kontrolü yapılır. Sac metal parçalarda kalınlık, büküm yarıçapı ve tolerans sınıfları ayrıca değerlendirilir. Proje süresi parça boyutu, detay yoğunluğu ve revizyon sayısına bağlıdır; net takvim ilk görüşmede kapsam netleştikten sonra paylaşılır.",
        ],
        list: [
          "Kapsam ve referans yüzeylerin tanımı",
          "3D tarama veya alternatif ölçüm",
          "CAD modelleme ve sapma kontrolü",
          "Teknik resim, sac açılım veya imalat dosyası teslimi",
        ],
      },
      {
        heading: "GD&T ve sac metal tasarımı neden önemli?",
        paragraphs: [
          "Tersine mühendislik çıktısı yalnızca geometrik bir model değildir; montajda ve kalite kontrolde kullanılacak tolerans dili de gereklidir. Geometrik toleranslama (GD&T), fonksiyonel yüzeyleri ve ölçüm stratejisini netleştirir. Sac metal parçalarda ise üretime yönelik tasarım (DFM) kararları — büküm sırası, delik konumları, birleşim tipi — modelin sahada uygulanabilirliğini doğrudan etkiler.",
          "Hibrit imalat senaryolarında (eklemeli + talaşlı) tersine mühendislik verisi hem konvansiyonel CNC hem de eklemeli üretim planlamasına girdi sağlar. Doğru kapsam tanımı, gereksiz detay modellemesinden kaçınarak hem süreyi hem maliyeti kontrol altında tutar.",
        ],
      },
      {
        heading: "Maliyet ve süre nasıl belirlenir?",
        paragraphs: [
          "Tersine mühendislik maliyeti parça karmaşıklığı, ölçüm yöntemi, istenen doğruluk sınıfı ve teslim kapsamına göre değişir. Tek parça, düşük detaylı bir sac eleman ile çok yüzeyli, sıkı toleranslı bir makine parçası aynı fiyat bandında değerlendirilmez. Biz her projede önce kapsamı netleştirir, ardından yazılı teklif sunarız; ilk görüşme bağlayıcı değildir.",
          "Erken aşamada paylaşmanız gereken bilgiler: parça fotoğrafı veya numune erişimi, kullanım amacı, hedef malzeme, mevcut teknik resim varsa kopyası ve teslim formatı beklentisi. Bu bilgiler olmadan verilen genel aralıklar yanıltıcı olabilir; proje bazlı teklif tercih edilir.",
        ],
      },
      {
        heading: "Takt ile nasıl çalışırız?",
        paragraphs: [
          "Tasarım ve geliştirme hizmetimiz kapsamında tersine mühendislik projelerini 3D tarama çözüm ortağı ağımız ve iç modelleme kapasitemizle yürütürüz. Ankara merkezli ekibimiz, makina imalatı ve savunma sanayi tedarik zincirindeki parça tiplerinde deneyime sahiptir.",
          "İhtiyacınız yalnızca tarama değil, analiz veya imalat koordinasyonu da içeriyorsa ilgili hizmet sayfalarımıza yönlendiririz; tek elden proje yönetimi mümkündür.",
        ],
      },
    ],
  },
  {
    id: "muhendislik-analizi",
    slug: "muhendislik-analizi",
    title: "FEA / mühendislik analizi rehberi",
    description:
      "Sonlu elemanlar analizi, modal titreşim, termal genleşme ve topoloji optimizasyonu: ne zaman analiz gerekir, hangi çıktılar beklenir, süreç nasıl işler.",
    summary:
      "Tasarım kararlarını doğrulamak için FEA, titreşim, termal ve hafifletme analizlerinin rolünü ve tipik proje akışını açıklarız.",
    servicePath: "/hizmetler/analiz-hesaplama",
    relatedBlogSlugs: [
      "sonlu-elemanlar-analizi-fea",
      "modal-titresim-analizi",
      "termal-genlesme-yonetimi",
      "kafes-lattice-hafifletme",
      "generative-design-topoloji-optimizasyonu",
    ],
    updatedAt: "2026-06-26",
    sections: [
      {
        heading: "Mühendislik analizi ne işe yarar?",
        paragraphs: [
          "Mühendislik analizi, tasarım kararlarını fizik kuralları ve sayısal yöntemlerle doğrulamak için kullanılır. Prototip maliyeti yüksek veya test imkânı sınırlı parçalarda, analiz erken aşamada riski görünür kılar. Gerilme, deformasyon, titreşim modları, termal davranış veya kütle optimizasyonu gibi farklı fizik alanları farklı analiz türleriyle ele alınır.",
          "Analiz çıktısı her zaman “evet/hayır” cevabı değildir; tasarım alternatiflerini karşılaştırmak, kritik bölgeleri belirlemek ve ölçüm veya test planını yönlendirmek için kullanılır. Doğru kapsam tanımı, gereksiz detaylı modellemeden kaçınarak hem süreyi hem de yorumlanabilirliği artırır.",
        ],
      },
      {
        heading: "Sonlu elemanlar analizi (FEA) ne zaman gerekir?",
        paragraphs: [
          "FEA, parça veya montajın yük altındaki gerilme, yer değiştirme ve güvenlik marjını sayısal olarak değerlendirmek için uygulanır. Statik yük, darbe, yorulma veya birleşim davranışı senaryolarına göre model ve sınır koşulları kurulur. Malzeme verisi, yükleme koşulları ve mesnet tanımları sonuç kalitesini doğrudan etkiler.",
          "Analiz öncesi netleştirilmesi gerekenler: hangi yük senaryoları, hangi kabul kriterleri (malzeme limitleri, müşteri spesifikasyonu), hangi teslim formatı (rapor, ekran görüntüsü, onaylı PDF). Kapsam netleştikten sonra süre ve kaynak planı oluşturulur.",
        ],
      },
      {
        heading: "Modal titreşim ve termal analiz",
        paragraphs: [
          "Modal analiz, yapının doğal frekans ve titreşim modlarını belirler; dış uyarı frekanslarıyla çakışma riskini değerlendirmek için kullanılır. Rotating makine elemanları, taşıyıcı konstrüksiyonlar ve hassas montajlar bu analizden sık yararlanır.",
          "Termal genleşme analizi, farklı sıcaklık profillerinde parça ve birleşimlerdeki gerilme ve yer değiştirmeyi inceler. Malzeme eşleşmesi, bağlantı tipi ve çalışma sıcaklık aralığı model girdileridir. Her iki analiz türünde de doğrulama ölçümü veya test ile karşılaştırma mümkün olduğunda önerilir.",
        ],
      },
      {
        heading: "Hafifletme ve topoloji optimizasyonu",
        paragraphs: [
          "Kafes (lattice) yapılar ve generative design / topoloji optimizasyonu, ağırlık ve malzeme kullanımını azaltırken fonksiyonel kısıtları korumayı hedefler. Eklemeli imalat ile birleştirildiğinde tasarım serbestliği artar; geleneksel talaşlı imalat kısıtları varsa optimizasyon buna göre sınırlandırılır.",
          "Optimizasyon projelerinde üretim yöntemi, tolerans ve maliyet kısıtları baştan modele dahil edilmelidir. Aksi halde teorik olarak verimli bir geometri sahada üretilemez veya montajda sorun çıkarır.",
        ],
      },
      {
        heading: "Analiz projesi nasıl yürür?",
        paragraphs: [
          "Tipik akış: gereksinim toplantısı, CAD ve malzeme verisi alımı, model hazırlığı, çözüm ve sonuç yorumu, rapor teslimi. Revizyon ihtiyacı tasarım değişikliğiyle birlikte değerlendirilir. Ankara merkezli ekibimiz analiz ve hesaplama hizmeti kapsamında teknik raporlama standardını proje başında paylaşır.",
          "Analiz sonrası imalat veya prototip aşamasına geçilecekse üretim danışmanlığı ve kapasite ağımızla süreç tek elden koordine edilebilir.",
        ],
        list: [
          "Yük senaryoları ve kabul kriterlerinin tanımı",
          "CAD hazırlığı ve malzeme modeli",
          "Çözüm, doğrulama ve yorum",
          "Rapor ve tasarım önerisi teslimi",
        ],
      },
    ],
  },
  {
    id: "yalin-uretim-dfm",
    slug: "yalin-uretim-dfm",
    title: "Yalın üretim & DFM rehberi",
    description:
          "Üretime ve montaja yönelik tasarım, Poka-Yoke, Muda, Kaizen, Six Sigma ve FMEA: tasarım kararlarını sahadaki verimlilikle hizalamak.",
    summary:
      "DFM/DFA ilkeleri ile yalın üretim araçlarını bir arada ele alır; tasarım ve süreç iyileştirme kararlarına rehberlik eder.",
    servicePath: "/hizmetler/uretim-danismanligi",
    relatedBlogSlugs: [
      "uretime-yonelik-tasarim-dfm",
      "montaja-yonelik-tasarim-dfa",
      "poka-yoke-hata-onleyici-tasarim",
      "muda-yedi-israf",
      "kaizen-surekli-iyilestirme",
      "six-sigma-surec-yetenegi",
      "fmea-hata-turu-etki-analizi",
    ],
    updatedAt: "2026-06-26",
    sections: [
      {
        heading: "Yalın üretim ve DFM birlikte neden düşünülmeli?",
        paragraphs: [
          "Üretime yönelik tasarım (DFM) ve montaja yönelik tasarım (DFA), parçanın imalat ve montaj maliyetini, hata riskini ve takt süresini tasarım aşamasında şekillendirir. Yalın üretim ilkeleri ise sahadaki israfı görünür kılar ve sürekli iyileştirme kültürünü destekler. İkisini ayırmak, tasarım kararlarının sahada tekrar revizyona dönmesine yol açabilir.",
          "Makina imalatı ve özel ekipman projelerinde tipik hedefler: parça sayısını azaltmak, standart bağlantı ve toleransları tercih etmek, montaj yönünü ve sırasını basitleştirmek, kalite kontrol noktalarını erken aşamaya taşımaktır.",
        ],
      },
      {
        heading: "DFM ve DFA pratikte ne değiştirir?",
        paragraphs: [
          "DFM, seçilen üretim yöntemine (CNC, sac metal, kaynak, döküm vb.) uygun geometri, tolerans ve malzeme kararlarını kapsar. DFA ise montaj süresini, alet ihtiyacını ve operatör hata olasılığını azaltacak arayüz ve sabitleme çözümlerine odaklanır. Her iki disiplin de erken tasarım aşamasında en yüksek etkiyi sağlar; seri üretime geçildikten sonra yapılan değişiklikler daha maliyetlidir.",
          "Poka-Yoke (hata önleyici tasarım), fiziksel veya algısal ipuçlarıyla yanlış montajı imkânsız veya hemen görünür kılar. Özellikle tekrarlayan montaj hatlarında ve yeni operatör devrinde değerlidir.",
        ],
      },
      {
        heading: "Muda, Kaizen ve süreç yeteneği",
        paragraphs: [
          "Muda (yedi israf) çerçevesi, fazla stok, bekleme, gereksiz hareket ve hatalı üretim gibi kayıpları sınıflandırır. Kaizen ise küçük, sürekli iyileştirme adımlarını teşvik eder; büyük yatırım gerektirmeden takt ve kalite kazanımları sağlanabilir.",
          "Six Sigma ve süreç yeteneği (Cp/Cpk) analizi, varyasyonu ölçülebilir kılar. FMEA (hata türü ve etki analizi) ise tasarım veya süreçteki potansiyel hataları önceliklendirir. Bu araçlar birbirini tamamlar: FMEA riski belirler, Poka-Yoke ve DFM tasarım seviyesinde müdahale eder, Kaizen sahadaki ince ayarı sürdürür.",
        ],
        list: [
          "DFM: imalat yöntemi ve tolerans uyumu",
          "DFA: montaj süresi ve hata riski",
          "Poka-Yoke: yanlış montajı önleme",
          "FMEA: risk önceliklendirme",
          "Kaizen: sürekli küçük iyileştirmeler",
        ],
      },
      {
        heading: "Ne zaman danışmanlık gerekir?",
        paragraphs: [
          "İç ekip kapasitesi yeterli olduğunda bu ilkeler dahili olarak uygulanabilir. Dış danışmanlık genelde şu durumlarda değer katar: yeni ürün hattı tasarımı, tedarikçi değişimi sonrası uyum sorunları, yüksek hata oranı veya montaj süresinde sapma, seri üretime geçiş öncesi tasarım gözden geçirme.",
          "Danışmanlık kapsamı; mevcut durum analizi, tasarım önerileri, workshop veya eğitim ve uygulama takibi olarak tanımlanabilir. Süre ve kapsam proje bazında netleştirilir; genel yüzde vaatleri yerine ölçülebilir hedefler (montaj adım sayısı, kritik hata türleri vb.) tercih edilir.",
        ],
      },
      {
        heading: "Takt ile üretim danışmanlığı",
        paragraphs: [
          "Üretim danışmanlığı hizmetimizde tasarım revizyonu, fason üretici eşleştirme ve imalat koordinasyonunu birlikte ele alabiliriz. DFM/DFA önerileri doğrudan teknik resim ve BOM güncellemelerine dönüştürülür; gerektiğinde analiz veya tersine mühendislik ekiplerimizle entegre çalışılır.",
        ],
      },
    ],
  },
  {
    id: "tubitak-kosgeb-rehberi",
    slug: "tubitak-kosgeb-rehberi",
    title: "TÜBİTAK / KOSGEB proje rehberi",
    description:
      "Ar-Ge ve Ür-Ge destek programlarına hazırlık: proje kapsamı, teknik dokümantasyon ve başvuru sürecinde danışmanlık rolü.",
    summary:
      "TÜBİTAK, KOSGEB ve patent süreçlerinde teknik doküman hazırlığı ve proje yönetimi desteğimizi özetler; ticari blog kümesi henüz genişletilmektedir.",
    servicePath: "/hizmetler/tubitak-kosgeb",
    relatedBlogSlugs: [],
    updatedAt: "2026-06-26",
    sections: [
      {
        heading: "Destek programları kimler için uygundur?",
        paragraphs: [
          "TÜBİTAK ve KOSGEB destekleri, Ar-Ge veya Ür-Ge niteliği taşıyan, ölçülebilir teknik hedefleri olan projeler için tasarlanmıştır. Makina imalatı, otomasyon, malzeme veya süreç geliştirme gibi alanlarda faaliyet gösteren KOBİ ve sanayi firmaları bu programları değerlendirebilir. Her çağrının koşulları, destek oranı ve uygunluk kriterleri dönemsel olarak güncellenir; güncel şartlar resmi duyurulardan takip edilmelidir.",
          "Destek başvurusu, yalnızca form doldurmaktan ibaret değildir; teknik içerik, bütçe gerekçesi, proje takvimi ve çıktı tanımları birbirini desteklemelidir. Eksik veya tutarsız teknik bölüm, başvurunun değerlendirme aşamasında zayıf kalmasına neden olabilir.",
        ],
      },
      {
        heading: "Teknik dokümantasyonda nelere dikkat edilir?",
        paragraphs: [
          "Proje önerisinde problem tanımı, mevcut durum, hedeflenen yenilik veya iyileştirme, yöntem, iş paketleri ve beklenen çıktılar net biçimde yazılmalıdır. Mühendislik projelerinde CAD, analiz, prototip ve test adımları somut teslimatlarla eşleştirilir. Patent ve fikri mülkiyet boyutu varsa erken aşamada değerlendirilir.",
          "Biz destek sürecinde teknik rapor, proje dosyası, ilerleme dokümantasyonu ve gerektiğinde sunum içeriği hazırlığında yanınızda oluruz. Hukuki veya mali danışmanlık yerine geçmeyiz; resmi başvuru ve sözleşme adımları firma ve yetkili kurumlar arasında yürütülür.",
        ],
        list: [
          "Proje kapsamı ve yenilikçilik tanımı",
          "İş paketleri ve takvim",
          "Teknik yöntem ve çıktılar",
          "Bütçe kalemlerinin teknik gerekçesi",
        ],
      },
      {
        heading: "Süreç ne kadar sürer?",
        paragraphs: [
          "Hazırlık süresi projenin karmaşıklığına ve mevcut veri olgunluğuna bağlıdır. Teknik altyapısı hazır, hedefleri net bir projede dokümantasyon aşaması daha kısadır; sıfırdan kavram geliştirme gerektiren projelerde ön çalışma uzar. Resmi değerlendirme ve onay süreleri programa göre değişir; bu takvim TÜBİTAK ve KOSGEB tarafından ilan edilir.",
          "İlk görüşmede mevcut fikir, ekip kapasitesi ve hedeflenen programı dinler; uygunluk ve eksikler hakkında dürüst geri bildirim veririz. Uygun olmayan projede destek başvurusu yerine alternatif finansman veya Ar-Ge yol haritası önerebiliriz.",
        ],
      },
      {
        heading: "Patent ve marka tescili",
        paragraphs: [
          "Patent ve marka başvuruları, proje çıktılarının korunması açısından ayrı bir hattır. Teknik tarifname hazırlığı mühendislik geçmişi gerektirir; süreç Türk Patent ve Marka Kurumu prosedürlerine tabidir. Destek programı kapsamında veya bağımsız olarak yürütülebilir.",
        ],
      },
      {
        heading: "İlgili hizmet ve sonraki adım",
        paragraphs: [
          "TÜBİTAK, KOSGEB ve patent desteği hizmet sayfamızda kapsam, tipik teslimatlar ve iletişim kanalları yer alır. Blog tarafında bu konuya özel ticari-niyetli yazı kümemizi genişletmeyi planlıyoruz; güncel teknik makaleler için blog sayfamızı takip edebilirsiniz.",
          "Projenizi konuşmak için görüşme planlayabilir veya başlangıç kontrol listemizi talep edebilirsiniz.",
        ],
      },
    ],
  },
];

export function getAllPillarSlugs(): string[] {
  return pillars.map((pillar) => pillar.slug);
}

export function getPillarBySlug(slug: string): Pillar | undefined {
  return pillars.find((pillar) => pillar.slug === slug);
}

export function getPillarForBlogSlug(blogSlug: string): Pillar | undefined {
  return pillars.find((pillar) => pillar.relatedBlogSlugs.includes(blogSlug));
}
