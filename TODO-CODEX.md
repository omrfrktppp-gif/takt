# Takt — Codex'in Bağımsız Yürüteceği İşler

Bu dosya, kullanıcıdan yeni müşteri/vaka bilgisi, gerçek fotoğraf, hesap erişimi
veya hukuki/ticari onay istemeden yapılabilecek işleri içerir.

Temel çalışma kuralı:

> Var olan doğrulanmış içerik ve kod üzerinden ilerle; yeni müşteri, başarı
> oranı, deneyim yılı, sertifika, proje sonucu veya kapasite iddiası uydurma.

Kullanıcı metin yazmak zorunda değildir. Mevcut bilgilerden bütün site
metinlerini Codex üretir ve düzenler. Yalnızca gerçeği kullanıcıdan gelmesi
gereken unsurlar `TODO-SAHIP.md` dosyasındadır.

## Çalışma sırası

- `P0`: Dönüşüm, yayın güvenliği ve kritik teknik hata
- `P1`: Ana sayfa, tasarım sistemi, UX ve animasyon
- `P2`: İçerik, SEO/AEO/GEO ve formlar
- `P3`: Performans, erişilebilirlik, test ve iterasyon

---

## P0 — Güvenli başlangıç ve ölçülebilir temel

### 1. Kod ve görsel baseline

- [ ] Mevcut masaüstü, tablet ve mobil sayfaların referans ekran görüntülerini al.
- [ ] Ana dönüşüm yollarını belgeleyip test senaryolarını çıkar:
      ana CTA, randevu, WhatsApp, iletişim formu, ihtiyaç analizi.
- [x] Mevcut lint hatalarını düzelt.
- [ ] Build, type-check, lint ve site audit komutlarını tek doğrulama akışında
      çalıştır.
- [ ] Tasarım değişikliklerinden önce Lighthouse/CWV baseline almaya çalış;
      servis rate limitliyse yerel Lighthouse ölçümü kur.
- [ ] Kritik sayfalar için görsel regresyon kontrolü oluştur.

**Bitti tanımı**

- Build ve lint temiz.
- Ana sayfa, hizmet, blog, form ve mobil menü için baseline kayıtlı.
- Sonraki değişikliklerin etkisi karşılaştırılabilir.

### 2. Blog yayın güvenliği ve gerçek tarih düzeni

- [x] `status: review` içeriklerin canlıya, sitemap'e, blog listesine ve statik
      route üretimine girmesini engelle.
- [x] Yalnızca `status: published` içeriklerin indekslenmesini sağla.
- [ ] Gelecek yayınlar için `scheduled` veya yayın tarihi tabanlı güvenli akış
      tasarla.
- [ ] Tarihi gelmemiş içeriği otomatik yayımlama; deploy tabanlı yayın düzeni
      kullan.
- [ ] `datePublished` ile görünür yayın tarihini aynı kaynaktan üret.
- [ ] `dateModified` değerini yalnızca anlamlı içerik değişiminde güncelle.
- [ ] Blog frontmatter doğrulaması ekle:
      başlık, slug, açıklama, durum, tarih, yazar ve etiket.
- [ ] Aynı tarihli 35 yazıyı rastgele değiştirme; bir yayın kuyruğu oluştur.
- [x] Mevcut tek `published` yazıyı koru, diğerlerini editoryal backlog'a taşı.
- [ ] Taslak/review içeriklerin yanlışlıkla yeniden indekslenmesini test et.

**Bitti tanımı**

- İncelenmemiş yazılar canlıda görünmüyor ve sitemap'e girmiyor.
- Tarihler gerçeği yansıtıyor.
- Yeni bir yazının yanlış durumla yayına çıkması build sırasında yakalanıyor.

### 3. Schema ve metadata hataları

- [x] Global `HowTo` şemasını layout'tan kaldır.
- [x] `HowTo` şemasını yalnızca adımların gerçekten görünür olduğu uygun sayfada
      kullan.
- [x] Kurucu `Person` şemasını Organization şemasındaki kimlikle doğru bağla.
- [ ] Blog yazılarında `BlogPosting`, yazar, yayın tarihi, güncelleme tarihi ve
      görsel alanlarını tutarlı hale getir.
- [ ] FAQ schema ile görünür FAQ içeriğinin birebir eşleşmesini doğrula.
- [ ] Service, Breadcrumb, Organization ve WebSite şemalarını örnek sayfalarda
      doğrula.
- [ ] Ana sayfa title ve 223 karakterlik meta açıklamayı iyileştir.
- [ ] Uzun/kısa title ve meta açıklamalar için otomatik denetim ekle.
- [ ] Canonical, robots, sitemap, llms.txt ve Open Graph regresyon testi oluştur.

**Bitti tanımı**

- Yapısal veri görünür içerikle uyumlu.
- Sayfa tipleri gereksiz global schema taşımıyor.
- Metadata uzunluğu ve benzersizliği otomatik kontrol ediliyor.

### 4. Ölçüm olaylarının kod tarafı

- [x] Ana sayfa hero CTA ve WhatsApp tıklamalarını ölç.
- [ ] CTA olay adlarını ve parametrelerini tek sözlükte standartlaştır.
- [ ] `form_view`, `form_start`, `form_error`, `form_submit`,
      `form_success` olaylarını ekle.
- [ ] Telefon, e-posta, WhatsApp, randevu ve ihtiyaç analizi olaylarını ayır.
- [ ] Her olaya uygun olduğunda `page_path`, `service`, `cta_location`,
      `source` ve UTM bilgisi ekle.
- [x] Çerez reddinde analitik kodun yüklenmediğini doğrula.
- [ ] Vercel Analytics ile GTM olaylarının birbirini bozmamasını sağla.
- [ ] Geliştirme ortamında event debug görünümü oluştur.

**Bitti tanımı**

- Her ana lead yolu tarayıcıda doğrulanabilir bir event üretiyor.
- Event isimleri ve parametreleri dokümante.
- Çerez tercihleri doğru uygulanıyor.

---

## P1 — Ana sayfa, görsel sistem ve Apple/Bambu esintili scroll deneyimi

Buradaki hedef Apple veya Bambu Lab sitesini kopyalamak değildir. Onların güçlü
yanlarını Takt'ın kimliğine uyarlamaktır:

- ürün/hizmet odağı,
- sahne sahne anlatım,
- güçlü tipografik hiyerarşi,
- kontrollü sticky scroll,
- teknik detayların katmanlı açılması,
- yüksek performanslı mikro animasyonlar.

### 5. Bilgi mimarisi ve navigasyon

- [ ] Masaüstü üst menüyü yaklaşık 10 bağlantıdan 5 ana başlığa indir.
- [ ] Önerilen yapı:
      `Hizmetler · Sektörler · Projeler · Kaynaklar · Hakkımızda`.
- [ ] Blog, rehber ve SSS'yi "Kaynaklar" altında grupla.
- [ ] İletişimi menü maddesi yerine güçlü ana CTA üzerinden sun.
- [ ] "Hizmetler" ve "Kapasitemiz" arasındaki kavramsal çakışmayı gider.
- [ ] Mobil menüyü tek elle kullanım, odak yönetimi ve klavye erişimi açısından
      yeniden düzenle.
- [ ] Footer'ı sadeleştir; tekrar eden çok uzun link kolonlarını azalt.
- [ ] Breadcrumb ve geri dönüş yollarını iyileştir.

### 6. Tasarım token'ları ve renk sistemi

- [ ] Mevcut `Ink / Steel / Line / Paper / Signal` paletini WCAG kontrastına göre
      denetle.
- [ ] Marka dokümanında olmayan turuncu `accent` kullanımını kaldır veya yalnızca
      açıkça tanımlanmış semantik role indir.
- [ ] Tek ana aksan rengi ilkesini koru.
- [ ] Paper ve white yüzeyleriyle teknik katman derinliği oluştur.
- [ ] Hover, active, focus, disabled, success, warning ve error token'larını
      tanımla.
- [ ] Açık/koyu sahne geçişlerini ana sayfa anlatım ritmi için standardize et.
- [ ] Gradient kullanılırsa dekoratif ve sınırlı tut; okunurluğu bozma.
- [ ] Renk kullanımını bütün bileşenlerde merkezî token'lara taşı.

### 7. Tipografi sistemi

- [ ] Space Grotesk, Inter ve JetBrains Mono kombinasyonunu performans,
      okunurluk ve marka karakteri açısından denetle.
- [ ] Mevcut kombinasyon yeterliyse koru; sırf değişiklik olsun diye font ekleme.
- [ ] H1–H4, body, lead, caption, mono label ve metric ölçeklerini yeniden kur.
- [ ] Akışkan `clamp()` tabanlı responsive tipografi uygula.
- [ ] Türkçe karakter, satır uzunluğu ve başlık kırılımlarını test et.
- [ ] Blog okuma alanını 65–75 karakter satır genişliğinde tut.
- [ ] Büyük hero başlığında mobilde anlamlı satır kırılımı sağla.
- [ ] Font yükleme stratejisini CLS ve LCP açısından doğrula.

### 8. Grid, boşluk ve bileşen sistemi

- [ ] 4/8 px tabanlı spacing ölçeğini standardize et.
- [ ] Ana içerik, metin ve geniş görsel için ayrı max-width token'ları oluştur.
- [ ] Button, card, section heading, eyebrow, metric, quote, form field ve
      callout bileşenlerini tek sistemde birleştir.
- [ ] Border ve radius kullanımını marka kimliğine uygun sadeleştir.
- [ ] Büyük boşlukları amaçlı hale getir; içeriksiz beyaz alanı azalt.
- [ ] Hizmet kartlarını "isim + problem + çıktı + detay" hiyerarşisine taşı.
- [ ] Gerçek veri gelene kadar sahte logo veya sahte sayaç kullanma.

### 9. Ana sayfa yeniden tasarımı

- [ ] Ana sayfa akışını şu sıraya taşı:
      `hero → somut çıktı → hizmetler → süreç → örnek çalışma alanı →
      ihtiyaç analizi → CTA`.
- [x] Mevcut doğrulanmış metinlerden daha somut hero kopyası üret.
- [x] Hero'da birincil CTA ve düşük bağlılık ikincil CTA hiyerarşisi kur.
- [ ] Görüşmenin süresi doğrulanana kadar sayı uydurmadan
      "ön değerlendirme" teklifini açıkla.
- [ ] Hizmet listesini en güçlü 3 ana kategori + ikincil kategoriler şeklinde
      düzenle.
- [ ] "Ne teslim ederiz?" bölümünü görsel belge/çıktı kartlarına dönüştür.
- [ ] Gerçek vaka verisi gelmeden "Çalışma biçimi örneği" veya anonim,
      iddiasız demo akışı kullan.
- [ ] Sayfa boyunca tekrarlanan CTA'ları tek bir mesaj sisteminde birleştir.
- [ ] Mobil ilk ekranda başlık, açıklama ve ana CTA'nın çerez kutusundan bağımsız
      görünmesini sağla.

### 10. Scroll anlatısı ve animasyon sistemi

- [ ] Ana hero için CSS/SVG tabanlı teknik çizim/kadans sahnesi tasarla.
- [ ] Scroll ilerledikçe blueprint çizgilerinin, ölçü işaretlerinin ve hizmet
      katmanlarının açıldığı bir anlatı oluştur.
- [x] Uygun bir masaüstü bölümünde sticky sahne + değişen metin panelleri kullan.
- [x] Normal sayfa scroll'unu ele geçirme; scroll hijacking yapma.
- [ ] Exploded-view hissini gerçek müşteri verisi kullanmadan soyut teknik
      parçalardan oluştur.
- [x] Süreç bölümünde kadans çizgisini ilerleme göstergesi olarak canlandır.
- [ ] Kart ve CTA'larda küçük hover/focus mikro etkileşimleri ekle.
- [ ] Scroll reveal hareketlerini `opacity + transform` ile sınırla.
- [ ] Animasyonları reusable motion primitive'lerine ayır.
- [x] `prefers-reduced-motion` durumunda bütün sahneleri anlamlı statik düzene
      düşür.
- [ ] Mobilde sticky/scroll sahnelerini daha hafif bir sıraya dönüştür.
- [ ] Animasyon sırasında metin seçimi, klavye odağı ve screen reader sırasını
      koru.
- [ ] LCP görselini animasyona bağımlı yapma.
- [ ] JS bundle ve long task etkisini ölç; performans kötüleşirse CSS/SVG
      sürümüne dön.

**Bitti tanımı**

- Site daha akıcı ve premium hissediyor.
- Normal scroll davranışı bozulmuyor.
- Animasyon kapalıyken içerik eksilmiyor.
- Mobil performans ve erişilebilirlik korunuyor.

### 11. Mobil UX ve çerez arayüzü

- [ ] Çerez panelini mobilde kompakt hale getir.
- [x] Çerez paneli açıkken sabit CTA ve WhatsApp düğmesini geçici gizle.
- [ ] Kabul ve reddet seçeneklerini eşit görünürlükte sun.
- [ ] Sabit mobil CTA'nın içerik ve safe-area ile çakışmasını çöz.
- [ ] 320, 375, 390, 430, 768 ve 1024 px genişliklerde test et.
- [ ] Mobil dokunma hedeflerini en az 44×44 px olacak şekilde denetle.
- [ ] Mobil menü açıldığında body scroll ve focus trap davranışını düzelt.
- [ ] Uzun başlık ve Türkçe kelime kırılımlarını kontrol et.

---

## P2 — Formlar, içerik, SEO ve dönüşüm

### 12. İletişim formu yeniden geliştirme

- [x] Doğrudan üçüncü taraf POST yerine first-party `/api/contact` akışı kur.
- [x] Sunucu tarafı doğrulama ekle.
- [ ] Rate limit, honeypot ve spam kontrolü ekle.
- [ ] Form erişim anahtarlarını sunucu ortam değişkenlerine taşı.
- [ ] Formu gerekirse iki kısa adıma böl:
      `ihtiyaç → iletişim`.
- [ ] Hizmet seçimi, proje aşaması ve tercih edilen iletişim kanalını ekle.
- [ ] Kullanıcı sayfadan hangi hizmet için geldiğini otomatik taşı.
- [ ] UTM, referrer ve ilk landing page bilgisini lead'e ekle.
- [x] Loading, başarı, hata, tekrar deneme ve çevrimdışı durumlarını tasarla.
- [ ] Alan içi hata mesajlarını erişilebilir hale getir.
- [ ] KVKK bağlantısı ve onay akışını sadeleştir.
- [ ] Form başarı sayfasında beklenen sonraki adımı açıkla.
- [ ] Benzersiz `lead_id` üret.
- [ ] E-posta gönderimi başarısızsa güvenli fallback ve log oluştur.

### 13. İhtiyaç analizi UX'i

- [x] Mevcut wizard state/effect lint sorunlarını düzelt.
- [ ] Başlangıç, ilerleme, geri dönüş ve kaydetme davranışlarını sadeleştir.
- [ ] Her ekranda ne kadar kaldığını açıkça göster.
- [ ] Mobil seçim kartlarını ve klavye kullanımını iyileştir.
- [ ] Terk event'ini doğru ekrana ve sebebe bağla.
- [ ] Sonuç ekranını seçilen hizmet ve sonraki adımla kişiselleştir.
- [ ] Özetin WhatsApp veya e-posta ile paylaşılabilir metnini üret.
- [ ] Yenileme ve geri tuşu senaryolarını test et.

### 14. Hizmet ve landing page metinleri

- [ ] Var olan doğrulanmış içerikten ana hizmet sayfalarını yeniden yaz.
- [ ] Her sayfada şu yapıyı kullan:
      `kim için → problem → yaklaşım → girdiler → çıktılar → süreç →
      fiyatı/süreyi etkileyenler → FAQ → CTA`.
- [ ] Uydurma süre veya fiyat vermeden karar kriterlerini açıkla.
- [ ] H2 başlıklarını gerçek müşteri sorularına dönüştür.
- [ ] İlk paragrafta 40–60 kelimelik doğrudan cevap sun.
- [ ] Ticari niyetli beş landing page üret:
  - [ ] Ankara mühendislik danışmanlığı
  - [ ] Özel makina tasarım danışmanlığı
  - [ ] FEA / sonlu elemanlar analizi hizmeti
  - [ ] Tersine mühendislik ve 3D tarama
  - [ ] Prototipten seri üretime geçiş danışmanlığı
- [ ] Sayfalar arası keyword cannibalization kontrolü yap.
- [x] Her sayfaya bağlamsal tek CTA yerleştir.

### 15. Blog editoryal iyileştirme

- [ ] 35 yazıyı kalite, ticari bağ ve benzerlik açısından puanla.
- [ ] Yazıları `yayınla / yeniden yaz / birleştir / kaldır` olarak sınıflandır.
- [ ] Kamuya açık güvenilir kaynaklarla teknik doğruluk kontrolü yap.
- [ ] Belirsiz saha/deneyim iddialarını yumuşat veya kaldır.
- [ ] Başlıkları SERP ve okunurluk için kısalt.
- [ ] Meta açıklamalarını yaklaşık 150–160 karaktere düzenle.
- [ ] Uzun yazılara içindekiler ve okuma ilerlemesi ekle.
- [ ] Soru biçimli H2'ler ve doğrudan cevap blokları ekle.
- [ ] Kaynakçayı görünür ve tıklanabilir hale getir.
- [ ] İlgili hizmet ve rehber iç linklerini güçlendir.
- [ ] Yazı sonu CTA'larını konuya göre özelleştir.
- [ ] İnce etiket sayfalarını birleştir veya geçici `noindex` yap.
- [ ] Soyut teknik kapak görsellerini özgün SVG/diagram olarak üret.
- [ ] Gerçek proje görseli gerektirmeyen açıklayıcı şema ve tablolar ekle.
- [ ] Haftada 1–2 yazılık gerçek yayın sırası dokümanı hazırla.

### 16. Yeni ticari içerikler

- [ ] "Mühendislik danışmanlığı ücretleri nasıl belirlenir?"
- [ ] "Bir makine tasarım firması seçerken sorulacak sorular"
- [ ] "FEA analiz raporunda neler bulunmalı?"
- [ ] "Özel makina tasarımı ne kadar sürer?"
- [ ] "Teknik ekip kurmak mı, proje bazlı danışmanlık mı?"
- [ ] "CAD dosyasından imalata geçmeden önce kontrol listesi"
- [ ] "Tersine mühendislikte 3D tarama mı manuel ölçüm mü?"
- [ ] Her içerik için arama niyeti, hedef sayfa, iç link ve CTA haritası oluştur.
- [ ] Teyit gerektiren özel Takt iddialarını metne eklemeyip kullanıcı girdisi
      bekleyen küçük notlar bırak.

### 17. AEO ve GEO altyapısı

- [ ] Hizmet sayfalarına extractable kısa cevap blokları ekle.
- [ ] Karşılaştırma ve süreçler için gerçek HTML tablo/listeleri kullan.
- [ ] FAQ ve Article şemalarını görünür içerikle eşleştir.
- [ ] llms.txt ve llms-full.txt içerik tutarlılığını otomatik kontrol et.
- [ ] Aylık AI visibility prompt setini dosya olarak oluştur.
- [ ] ChatGPT, Perplexity, Gemini, Claude ve Copilot sonuçlarının işlenebileceği
      skor kartı şablonu üret.
- [ ] Organization/Person entity tutarlılığı için site içi denetim ekle.

---

## P3 — Akıcılık, performans, erişilebilirlik ve kalite

### 18. Performans

- [ ] Kullanılmayan eski yatay scroll bileşenlerini ve ölü kodu belirle.
- [ ] Kullanılmayan kodu güvenli biçimde kaldır veya yeni motion sisteminden
      ayır.
- [ ] JS bundle boyutunu route bazında incele.
- [ ] Hero ve blog görsellerini responsive WebP/AVIF olarak sun.
- [ ] Görsellerde width/height ve doğru `sizes` kullan.
- [ ] Below-the-fold medya için lazy loading uygula.
- [ ] Font ve üçüncü taraf script yükleme sırasını optimize et.
- [ ] GTM, harita ve takvim iframe'lerini kullanıcı niyetine göre geciktir.
- [ ] LCP, INP ve CLS ölçümlerini masaüstü/mobil karşılaştır.
- [ ] Animasyonların main-thread etkisini ölç.
- [ ] Performans bütçesi tanımla ve CI kontrolüne ekle.

### 19. Erişilebilirlik

- [ ] Semantik heading sırasını bütün route'larda denetle.
- [ ] Klavye ile menü, form, modal, takvim ve wizard kullanımını test et.
- [ ] Focus görünürlüğü ve sırasını doğrula.
- [ ] Renk kontrastı ve yalnızca renkle aktarılan durumları düzelt.
- [ ] Screen reader için form hata/başarı anonsları ekle.
- [ ] `aria-live`, dialog adı, close davranışı ve Escape desteğini doğrula.
- [ ] Animasyon/reduced-motion eşdeğerliğini test et.
- [ ] Alt metinlerin dekoratif/bilgilendirici ayrımını düzelt.
- [ ] 200% zoom ve büyük yazı senaryolarını test et.

### 20. Teknik borç ve güvenlik

- [ ] Deprecated `middleware` yapısını Next.js 16 dokümanına göre `proxy`
      yaklaşımına taşı.
- [ ] Güvenlik header'larını tekrar doğrula.
- [ ] API rate limit ve hata loglarında kişisel veri sızıntısını engelle.
- [ ] Form secret'larını ve istemciye açılan değişkenleri denetle.
- [ ] Dependency audit ve güvenli güncelleme planı çıkar.
- [ ] 404, 500 ve form hata sayfalarını marka/CTA açısından iyileştir.
- [ ] Log ve telemetry retention notlarını dokümante et.

### 21. Uçtan uca doğrulama

- [ ] Ana sayfa masaüstü/mobil görsel doğrulaması.
- [ ] Mobil menü ve tüm CTA yolları.
- [ ] İletişim formu başarı/hata/spam.
- [ ] İhtiyaç analizi bütün dallar.
- [ ] Randevu harici yönlendirme.
- [ ] Çerez kabul/red ve analytics.
- [ ] Blog yayın durumu/tarih/schema.
- [ ] Sitemap, robots, llms.txt, canonical ve metadata.
- [ ] Rich Results ve erişilebilirlik kontrolleri.
- [ ] Build, lint, type-check ve site audit.

---

## Codex'in kullanıcıdan izin istemeden verebileceği tasarım kararları

- Renk kontrastı ve semantik renk rolleri
- Tipografi ölçeği ve satır uzunluğu
- Spacing, grid ve responsive breakpoint davranışı
- Navigasyon sadeleştirmesi
- Kart, buton, form ve section bileşenleri
- Scroll animasyonlarının tekniği ve yoğunluğu
- Mobil/desktop motion farklılıkları
- CTA hiyerarşisi ve mevcut gerçeklerden türetilen metinler
- Blog başlık/meta optimizasyonu
- İç link, schema, sitemap ve teknik SEO
- Form doğrulama, hata/başarı UX'i
- Performans, erişilebilirlik ve test altyapısı

## Codex'in uyması gereken sınırlar

- Gerçek olmayan müşteri, proje, rakam, logo, yorum veya sertifika ekleme.
- Yayın tarihini geçmişe dönük rastgele üretme.
- Kullanıcı onayı olmadan reklam bütçesi harcama.
- Kullanıcı onayı olmadan dış hesaplarda yayın/mesaj/reklam başlatma.
- Hukuki metni avukat onayı almış gibi sunma.
- Apple/Bambu arayüzünü birebir kopyalama; yalnızca etkileşim ilkelerinden
  esinlenme.
