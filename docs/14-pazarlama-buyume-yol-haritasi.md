# Takt — Pazarlama, Trafik ve Dönüşüm Yol Haritası

*Denetim tarihi: 24 Temmuz 2026*

## 1. Yönetici özeti

Takt'ın temel sorunu sitenin çalışmaması veya Google tarafından okunamaması
değil. Teknik temel birçok küçük işletme sitesinden daha iyi:

- 83 sitemap URL'sinin tamamı 200 dönüyor.
- Kırık iç link ve öksüz sayfa bulunmuyor.
- Canonical, mobil viewport, temel meta etiketleri ve JSON-LD mevcut.
- Hizmet, sektör, rehber, blog, FAQ, randevu ve ihtiyaç analizi sayfaları hazır.
- Üretim derlemesi başarıyla tamamlanıyor.

Asıl darboğaz güven ve ikna katmanında. Site ne yapılabildiğini söylüyor, fakat
"Neden Takt?", "Bunu daha önce kimin için yaptı?", "Sonuç ne oldu?", "Bu işi
kim yapacak?", "Ne kadar sürer?", "İlk adımda benden ne bekleniyor?" sorularını
yeterince güçlü cevaplamıyor.

Kısa teşhis:

> Site kurumsal ve düzenli görünüyor; ancak ziyaretçiye düşük riskli, kanıtlı ve
> somut bir satın alma nedeni vermiyor.

Bu nedenle öncelik sırası şöyledir:

1. Konumlandırmayı daralt ve netleştir.
2. Güven kanıtlarını görünür hale getir.
3. Ana sayfayı sonuç ve vaka odaklı yeniden kur.
4. Ölçüm ve satış takip altyapısını tamamla.
5. Blog içeriklerini gerçek bir yayın takvimine bağla.
6. Ticari niyetli arama sayfalarıyla organik talebi yakala.
7. Yerel ve sektörel otoriteyi site dışında büyüt.
8. Animasyonu mesajı ve kanıtı güçlendirmek için kullan.

---

## 2. Mevcut durumdan çıkan kritik bulgular

### 2.1 Güçlü taraflar

- Site hızlı ön üretimli Next.js sayfaları sunuyor.
- Hizmet mimarisi geniş ve URL yapısı anlaşılır.
- FAQ, Service, Article, ProfessionalService ve Breadcrumb şemaları için altyapı
  bulunuyor.
- WhatsApp, randevu, iletişim formu ve ihtiyaç analizi gibi birden fazla temas
  kanalı mevcut.
- Yerel adres, telefon, harita, LinkedIn ve Google Business bilgileri tanımlı.
- 35 teknik blog yazısı, 4 rehber ve sektör sayfalarıyla yüksek içerik hacmi var.

### 2.2 Müşteri çekmesini engelleyen ana nedenler

#### A. Değer önerisi fazla genel

Hero mesajı "Teknik sürecinizin eksik halkası" akılda kalıcı fakat tek başına
satın alma gerekçesi değil. Alt açıklama tasarım, analiz, proje yönetimi, üretim
koordinasyonu, Ar-Ge ve savunma sanayisini aynı anda kapsıyor. Ziyaretçi ilk beş
saniyede Takt'ın en güçlü olduğu işi seçemiyor.

**TODO**

- [ ] Birincil müşteri segmentini seç: örneğin özel makina üreticileri, Ar-Ge
      ekipleri veya savunma sanayi tedarikçileri.
- [ ] Birincil problemi seç: kapasite açığı, tasarımdan imalata geçiş,
      doğrulama/analiz ihtiyacı veya proje koordinasyonu.
- [ ] Ana vaat formülünü yaz:
      `[hedef müşteri] + [kritik problem] + [somut çıktı] + [risk azaltıcı fark]`.
- [ ] Ana sayfada en fazla üç ana hizmeti öne çıkar; diğerlerini ikincil
      hizmetler altında topla.
- [ ] "Ankara'da mühendislik danışmanlığı" yerel mesajını korurken Türkiye
      geneline hizmet veriliyorsa bunu açıkça belirt.

Örnek yön:

> Özel makina ve ürün geliştirme projelerini tasarımdan imalata taşıyan dış
> mühendislik ekibi.

Bu metin doğrulanmadan doğrudan kullanılmamalı; stratejik yön örneğidir.

#### B. Kanıt katmanı neredeyse boş

`lib/case-studies.ts` içindeki vaka listesi boş. Referanslar sayfası isimli veya
anonim vaka yerine yalnızca çalışma alanlarını anlatıyor. Kurucu biyografisi tek
cümle. Ana sayfada müşteri logosu, doğrulanmış sonuç, örnek teslimat, proje
fotoğrafı, CAD/analiz görüntüsü veya müşteri yorumu yok.

Bu, B2B mühendislik hizmetinde en büyük dönüşüm kaybıdır. Alıcı teknik riskini
azaltmak ister; güzel metinden önce benzer işi yapabildiğine dair kanıt arar.

**TODO**

- [ ] İzinli üç vaka çalışması hazırla. Müşteri adı kullanılamıyorsa sektör ve
      problem üzerinden anonim yayınla.
- [ ] Her vaka için `problem → kısıt → yaklaşım → teslimat → doğrulanmış sonuç`
      yapısını kullan.
- [ ] Her vakaya en az bir gerçek görsel ekle: CAD ekranı, analiz çıktısı,
      teknik resim detayı, prototip veya üretim fotoğrafı.
- [ ] Yalnızca doğrulanmış rakam kullan. Rakam yoksa uydurmak yerine nitel sonucu
      açıkça yaz.
- [ ] 3–5 gerçek müşteri yorumu topla; kişinin adı/unvanı/firma adı için izin al.
- [ ] İzinli müşteri/iş ortağı logoları için "Birlikte çalıştığımız ekipler"
      alanı ekle.
- [ ] Örnek teslimat galerisi oluştur: anonim teknik rapor sayfası, kontrol
      listesi, teknik resim ve proje planı.
- [ ] Kurucu sayfasına gerçek deneyim alanları, sektörler, proje türleri,
      eğitim/sertifika bilgileri ve kişisel LinkedIn bağlantısı ekle.
- [ ] Kurucu ve ekibin gerçek, profesyonel fotoğraflarını kullan.

#### C. Site steril ve görsel kanıttan yoksun

Canlı ana sayfada geniş boşluk, metin ve çizgiler baskın. Görsel dil temiz fakat
mühendislik yetkinliğini hissettirmiyor. Sayfa başına görülen iki görsel
çoğunlukla aynı logo varlıkları; blog yazılarında konu görseli veya saha kanıtı
yok.

**TODO**

- [ ] Hero alanına gerçek bir mühendislik varlığı ekle: özel makina CAD modeli,
      exploded view, FEA konturu veya üretim görüntüsü.
- [ ] Ana sayfada "çıktı örnekleri" ve "seçilmiş vaka" bölümlerini ilk iki ekran
      içine taşı.
- [ ] Her hizmet sayfasına o hizmete özgü en az 2–3 gerçek görsel ekle.
- [ ] Blog yazılarına özgün kapak, şema, tablo veya açıklayıcı teknik çizim ekle.
- [ ] Stok görsel yerine gerçek proje, ekip ve süreç görüntülerini önceliklendir.
- [ ] Görsellerde izin, gizlilik, alt metin, boyut ve WebP/AVIF optimizasyonunu
      standartlaştır.

#### D. Navigasyon karar yorgunluğu yaratıyor

Masaüstü üst menüde yaklaşık 10 bağlantı ve bir CTA var. İlk defa gelen müşteri
Hakkımızda, Hizmetler, Kapasite, Yaklaşım, İletişim, Sektörler, Referanslar,
Rehberler, Blog ve SSS arasında seçim yapmak zorunda kalıyor.

**TODO**

- [ ] Üst menüyü en fazla 5 ana başlığa indir:
      `Hizmetler · Sektörler · Projeler · Kaynaklar · Hakkımızda`.
- [ ] Blog, rehber ve SSS'yi "Kaynaklar" altında grupla.
- [ ] İletişimi ayrı menü maddesi yerine birincil CTA ile çöz.
- [ ] "Kapasitemiz" ile "Hizmetler" arasındaki algısal çakışmayı gider.
- [ ] "Referanslar" adını gerçek vakalar eklenene kadar "Projeler ve çalışma
      alanları" olarak değerlendir.

#### E. CTA var, fakat teklif yeterince somut değil

"Projenizi değerlendirelim" iyi niyetli ama görüşmenin süresi, sonucu ve
ziyaretçinin ne hazırlaması gerektiği belirsiz. Aynı anda randevu, WhatsApp,
iletişim formu ve ihtiyaç analizi sunulması da birincil yolu bulanıklaştırıyor.

**TODO**

- [ ] Tek bir ana dönüşüm seç: örneğin "15 dakikalık ücretsiz ön değerlendirme".
- [ ] CTA yanında üç güven azaltıcı bilgi ver:
      `15 dakika · bağlayıcı değil · görüşme sonunda sonraki adım net`.
- [ ] İkincil CTA'yı "2 dakikalık ihtiyaç analizi" yap.
- [ ] WhatsApp'ı hızlı soru kanalı olarak tut; ana teklif ile aynı seviyede
      rekabet ettirme.
- [ ] Randevu sayfasında görüşmede neler konuşulacağını ve ne çıktığını yaz.
- [ ] Form sonrasında yalnızca teşekkür değil, beklenen dönüş süresini göster.
- [ ] Form ve WhatsApp mesajına seçilen hizmet/sayfa bilgisini otomatik taşı.
- [ ] Teklif talebi ile genel iletişim talebini farklılaştır.

#### F. Mobil ilk ekran çerez kutusu tarafından kapatılıyor

390 × 844 denetiminde çerez kutusu ekranın alt bölümünün büyük kısmını kapatıyor;
hero'nun ikincil CTA'sı ve aşağı içerik görünmeden kalıyor. Sabit mobil CTA
çubuğu, WhatsApp düğmesi ve çerez kutusu aynı alt alan için yarışıyor.

**TODO**

- [ ] Mobil çerez arayüzünü daha kompakt hale getir.
- [ ] İlk görünümde tek satırlık kısa açıklama + iki küçük buton kullan.
- [ ] Çerez kutusu açıkken mobil CTA ve yüzen WhatsApp düğmesini geçici gizle.
- [ ] Kabul ve reddet seçeneklerini eşit derecede erişilebilir tut.
- [ ] iPhone SE, 390 px Android ve 768 px tablet görünümlerinde test et.

---

## 3. Animasyon stratejisi

Animasyon siteyi daha akılda kalıcı yapabilir; fakat güven eksikliğini tek başına
çözmez. Önce vaka, görsel, uzmanlık ve teklif netliği; sonra hareket gelmelidir.

### Önerilen animasyonlar

- [ ] Hero'da CAD çizgisinin parçaya dönüşmesi veya exploded view parçalarının
      kontrollü biçimde birleşmesi.
- [ ] Takt'ın "kadans" imzasını sayfa kaydırıldıkça süreç adımlarını gösteren
      ince bir ilerleme çizgisi olarak kullan.
- [ ] Vaka kartlarında problemden sonuca geçişi gösteren kısa before/after
      mikro animasyonu.
- [ ] Gerçek ve doğrulanmış sonuç metriklerinde yumuşak sayı geçişi.
- [ ] Hizmet kartlarında teknik çizim katmanlarının hover/focus ile açılması.
- [ ] Sayfa bölümlerinde yalnızca `opacity + transform` tabanlı hafif reveal.
- [ ] Mobilde hareket yoğunluğunu azalt.

### Kaçınılması gerekenler

- [ ] Yatay kaydırmayı zorlayan veya normal scroll davranışını ele geçiren deneyim
      kullanma.
- [ ] Uzun intro/loading animasyonu kullanma.
- [ ] Sürekli dönen 3D model ile CPU/GPU ve pil tüketimini artırma.
- [ ] Parallax yüzünden metin okunurluğunu bozma.
- [ ] Gerçek olmayan sayaçları animasyonla büyütme.
- [ ] Animasyonu CTA'nın önüne geçirme.

### Teknik kabul kriterleri

- [ ] `prefers-reduced-motion` tam desteklenecek.
- [ ] Animasyon kapalıyken bütün bilgi ve CTA'lar erişilebilir olacak.
- [ ] LCP görseli gecikmeyecek; video varsa poster görseli olacak.
- [ ] Hareketler mümkünse CSS/Web Animations ile; ağır kütüphane ancak ölçülmüş
      ihtiyaç varsa kullanılacak.
- [ ] Mobil Core Web Vitals animasyondan önce ve sonra karşılaştırılacak.

Not: Projede eski yatay scroll bileşenleri var, fakat güncel ana sayfa bunları
kullanmıyor. Bunları doğrudan geri açmak yerine seçilmiş mikro animasyonları
mevcut dikey sayfaya taşımak daha güvenli olur.

---

## 4. Blog ve içerik stratejisi

### 4.1 Tarih problemi

35 yazının tamamı `2026-06-26` tarihini taşıyor. Bunlardan yalnızca biri
`published`, kalan 34'ü `review` statüsünde; fakat yükleyici `review` yazıları da
canlı ve indekslenebilir hale getiriyor. Bu, hem editoryal güveni hem de içerik
kalite kontrolünü zayıflatıyor.

**Tarihleri rastgeleleştirmeyin.** Rastgele tarih, yayın geçmişini olduğundan
farklı gösterir. Doğru çözüm:

- [ ] Yükleyicide yalnızca `status: published` içeriğini canlıya al.
- [ ] İncelenmemiş 34 yazıyı geçici olarak canlı listeden, sitemap'ten ve statik
      route üretiminden çıkar.
- [ ] Her yazıyı editör ve konu uzmanı kontrolünden geçir.
- [ ] Yazıya gerçek yayınlandığı gün `date` ver.
- [ ] Anlamlı içerik güncellemesinde `updated` alanını gerçek güncelleme tarihiyle
      değiştir.
- [ ] Görünür tarih ile Article şemasındaki `datePublished/dateModified`
      değerlerini aynı tut.
- [ ] Haftada 1–2 kaliteli yazı yayınlayan 4–6 aylık editoryal takvim kur.
- [ ] Aynı gün yayınlanan eski yazılar gerçekten o gün yayına girdiyse tarihi
      koru; yalnızca yeniden yayın planı yapılacaksa içerikleri önce yayından al.

### 4.2 İçerik hacmi yerine ticari niyet

Mevcut blog; Kaizen, dijital ikiz, Endüstri 5.0, kafes yapılar gibi geniş üst
huni konularına sahip. Bunlar trafik getirebilir fakat doğrudan hizmet talebine
yakın sorgular daha az görünür.

#### Öncelikli ticari içerik kümeleri

| Küme | Arama niyeti | Önerilen sayfa |
|---|---|---|
| Ankara mühendislik danışmanlığı | Yerel/ticari | Ankara odaklı ana hizmet landing page |
| Özel makina tasarımı | Ticari | Süreç, teslimat, süre, örnek vaka ve CTA |
| Makine tasarım danışmanlığı | Ticari | Danışmanlık kapsamı ve seçim kriterleri |
| FEA / sonlu elemanlar analizi hizmeti | Ticari | Analiz türleri, girdiler, rapor çıktısı |
| Tersine mühendislik fiyatı | Ticari | Fiyatı belirleyen değişkenler + teklif akışı |
| TÜBİTAK/KOSGEB proje danışmanlığı | Ticari | Uygunluk, kapsam, süreç ve sınırlar |
| Prototipten seri üretime geçiş | Ticari | Kontrol listesi + vaka |
| DFM analizi / üretim maliyeti düşürme | Ticari | Hizmet + örnek çıktı |

#### Satın alma yolculuğu içeriği

- [ ] "Mühendislik danışmanlığı ücretleri nasıl belirlenir?"
- [ ] "Bir makine tasarım firması seçerken sorulacak 12 soru"
- [ ] "FEA analiz raporunda neler bulunmalı?"
- [ ] "Özel makina tasarımı ne kadar sürer?"
- [ ] "Teknik ekip kiralamak mı, proje bazlı danışmanlık mı?"
- [ ] "CAD dosyasından imalata geçmeden önce kontrol listesi"
- [ ] "TÜBİTAK/KOSGEB danışmanlığında kapsam ve başarı kriterleri"
- [ ] "Tersine mühendislikte 3D tarama mı manuel ölçüm mü?"

Her içerik:

- [ ] İlk paragrafta soruya doğrudan cevap vermeli.
- [ ] Gerçek kaynak, özgün şema/tablo ve uzman görüşü içermeli.
- [ ] İlgili hizmet ve vaka sayfasına bağlanmalı.
- [ ] Tek bir bağlamsal CTA taşımalı.
- [ ] Yazarın tam adı, uzmanlık alanı ve biyografi bağlantısını göstermeli.
- [ ] Mümkünse indirilebilir fakat e-posta zorunlu olmayan yardımcı materyal
      sunmalı.

### 4.3 Mevcut içerik kalite temizliği

- [ ] 35 yazıyı `yayınla / birleştir / yeniden yaz / kaldır` olarak sınıflandır.
- [ ] Birbirine benzeyen ve gerçek deneyim göstermeyen içerikleri birleştir.
- [ ] Her yazıya "Bu konuda Takt'ın gerçek deneyimi nedir?" kontrolü ekle.
- [ ] Saha tecrübesi olmayan konuda kesin deneyim iddiası kullanma.
- [ ] Kaynakçayı görünür ve tıklanabilir hale getir.
- [ ] Blog başlıklarını SERP için kısalt; 27 başlık 65 karakterin üzerinde.
- [ ] Meta açıklamalarını düzelt; 15 sayfa 165 karakterin üzerinde.
- [ ] Blog kategorilerinin her birinde yeterli içerik yoksa ince etiket
      sayfalarını geçici `noindex` yap veya birleştir.

---

## 5. SEO, AEO ve GEO yol haritası

### 5.1 Teknik SEO — mevcut iyi temeli düzelt

- [ ] Ana sayfa title'ını hedef sorgu + fark + marka yapısında 50–60 karaktere
      yaklaştır.
- [ ] Ana sayfa meta açıklamasını 223 karakterden yaklaşık 150–160 karaktere
      indir.
- [ ] 30 kısa title ve 27 uzun title için SERP snippet çalışması yap.
- [ ] 29 kısa ve 15 uzun meta açıklamasını sayfa niyetine göre yeniden yaz.
- [ ] `HowTo` şemasını global layout'tan kaldır; yalnızca süreç içeriğinin
      görünür olduğu uygun sayfada kullan.
- [ ] Kurucu `Person` şemasını gerçekten sayfaya ekle; mevcut Organization
      şemasındaki kurucu referansı görünür bir Person düğümüne bağlansın.
- [ ] Organization şemasını ana sayfa veya Hakkımızda ile sınırlandırmayı
      değerlendir; her sayfada gereksiz tekrar üretme.
- [ ] Blog şemasında mümkünse `Article` yerine daha özgül `BlogPosting` kullan.
- [ ] Article görseli ekle ve schema `image` alanını doldur.
- [ ] Rich Results Test ve Schema.org Validator ile örnek URL'leri doğrula.
- [ ] Search Console ve Bing doğrulama değerlerinin canlı ortamda gerçekten
      tanımlı olduğunu kontrol et.
- [ ] Sitemap'i GSC/Bing'e yeniden gönder ve IndexNow çalıştır.
- [ ] Mobil PageSpeed/CWV için gerçek saha verisi baseline'ı al.
- [ ] Deprecated Next.js `middleware` yapısını `proxy` yaklaşımına taşıma işini
      teknik borç olarak planla.

### 5.2 AEO — cevap motorlarında görünürlük

- [ ] Hizmet sayfalarında soruları kullanıcı diliyle H2 yap:
      "Ne kadar sürer?", "Hangi dosyalar gerekir?", "Ne teslim edilir?",
      "Fiyatı ne belirler?"
- [ ] Her sorunun altında 40–60 kelimelik, tek başına anlaşılır cevap ver.
- [ ] Karşılaştırma ve seçim sorgularında gerçek HTML tabloları kullan.
- [ ] SSS şemasını yalnızca sayfada görünür olan sorularla eşleştir.
- [ ] Hizmet sayfalarına "kısa cevap" veya "özet" kutusu ekle.

### 5.3 GEO — yapay zekâ cevaplarında kaynak olma

- [ ] Takt'ın şirket ve kurucu varlığını LinkedIn, Google Business, sektör
      dizinleri ve harita kayıtlarında aynı isim/açıklama ile tutarlı hale getir.
- [ ] Ostim/İvedik OSB, ticaret/sanayi odası, sektör rehberleri ve güvenilir
      tedarikçi dizinlerinde profil oluştur.
- [ ] Gerçek proje verilerinden yılda en az iki özgün mini rapor yayınla.
- [ ] İçeriklerde doğrulanabilir, alıntılanabilir bulgular üret.
- [ ] Üniversite-sanayi iş birlikleri, webinarlar ve sektörel yayınlarla üçüncü
      taraf marka mention'ı kazan.
- [ ] Aylık 20 satın alma sorusunu ChatGPT, Perplexity, Gemini, Claude ve
      Copilot'ta test et.
- [ ] Her testte marka mention, linkli citation, rakip ve yanlış bilgi alanlarını
      kaydet.

---

## 6. Dönüşüm ve satış altyapısı

### 6.1 Ölçüm boşlukları

Kodda GTM ve bazı `trackEvent` çağrıları var; fakat güncel ana sayfanın hero
CTA'ları `HomeHub` içinde ölçülmüyor. `lead_form_submit` kodda gerçek bir form
olayına bağlı değil. İletişim formu doğrudan Web3Forms'a POST ediyor; first-party
başarı/başarısızlık ölçümü ve UTM saklama sınırlı.

**TODO**

- [ ] Ana sayfa hero randevu ve WhatsApp CTA'larını ölç.
- [ ] `form_view`, `form_start`, `form_error`, `form_submit`,
      `form_success` olaylarını ayrı tanımla.
- [ ] Randevu tıklaması ile gerçek randevu tamamlamayı ayır.
- [ ] Telefon, e-posta, WhatsApp, ihtiyaç analizi ve dosya indirme olaylarını
      standartlaştır.
- [ ] Her event'e `page_path`, `service`, `cta_location`, `utm_*` ve uygun
      olduğunda `lead_id` ekle.
- [ ] GTM arayüzünde gerekli event'leri GA4 key event/conversion olarak işaretle.
- [ ] Tag Assistant ile çerez kabul/red senaryolarını doğrula.
- [ ] Vercel Analytics ve GA4 sayılarını karşılaştır.
- [ ] GSC, GA4 ve CRM için aylık tek skor kartı oluştur.

### 6.2 First-party lead akışı

- [ ] İletişim formunu first-party `/api/contact` üzerinden işle.
- [ ] Anahtarları istemci bundle'ında sabitlemek yerine sunucu ortam
      değişkenlerinde tut.
- [ ] Spam koruması, rate limit, honeypot ve server-side doğrulama ekle.
- [ ] Başarılı formdan sonra benzersiz `lead_id` üret.
- [ ] UTM, referrer, ilk landing page ve talep edilen hizmeti sakla.
- [ ] CRM veya en azından yapılandırılmış lead tablosu kur.
- [ ] Otomatik teşekkür e-postasında beklenen dönüş süresini ve hazırlık
      listesini gönder.
- [ ] İşletme tarafında maksimum ilk yanıt süresini tanımla; hedef mesai içinde
      15–60 dakika.
- [ ] Lead aşamalarını tanımla:
      `Yeni → İletişim kuruldu → Nitelikli → Görüşme → Teklif → Kazanıldı/Kaybedildi`.
- [ ] Kaybedilme nedenlerini kaydet.

### 6.3 Teklif ve nurture

- [ ] Üç ürünleştirilmiş giriş teklifi tasarla:
      `Teknik ön değerlendirme`, `Tasarım/DFM incelemesi`,
      `Proje yol haritası atölyesi`.
- [ ] Her teklifin kapsam, süre, çıktı ve uygun olmadığı durumlarını yaz.
- [ ] Görüşme sonrası 24 saat içinde standart özet/sonraki adım e-postası gönder.
- [ ] Teklif görüntüleme ve takip ritmi kur.
- [ ] Henüz hazır olmayan lead'ler için 4–6 e-postalık teknik nurture serisi kur.
- [ ] Teklif isteyen lead'e genel blog değil, ilgili vaka ve teslimat örneği
      gönder.

---

## 7. Trafik edinme planı

### 7.1 Organik arama

- [ ] Önce 5 yüksek ticari niyetli landing page'i tamamla.
- [ ] Her landing page için bir ana sorgu ve 5–10 destekleyici soru belirle.
- [ ] GSC'de 4–20. sırada görünen sorguları "quick win" listesine al.
- [ ] Hizmet → vaka → rehber → blog iç link üçgenleri kur.
- [ ] İçeriği yayınlandıktan sonra GSC ve IndexNow ile bildir.

### 7.2 Yerel arama

- [ ] Google Business ana kategorisi ve hizmetlerini site konumlandırmasıyla
      eşleştir.
- [ ] İlk 5 gerçek yorumu, sonra ayda 1–2 yeni yorumu hedefle.
- [ ] Google Business'a proje, ekip ve ofis/atölye fotoğrafları ekle.
- [ ] Haftalık kısa GBP gönderisi yayınla.
- [ ] İvedik OSB, Ostim, Ankara Sanayi Odası ve uygun sektörel dizinlerde tutarlı
      NAP bilgisi oluştur.
- [ ] Yerel sayfalarda kopya şehir metni üretme; Ankara'ya özgü gerçek bilgi ve
      vaka kullan.

### 7.3 LinkedIn ve uzman markası

- [ ] Kurucunun kişisel LinkedIn profilini şirket sayfasıyla bağla.
- [ ] Haftada iki içerik ritmi:
      bir teknik mini-vaka + bir açıklayıcı mühendislik içeriği.
- [ ] Blogu aynen kopyalamak yerine tek grafik/tek içgörü formatına dönüştür.
- [ ] Ayda bir proje retrospektifi veya canlı teknik oturum yayınla.
- [ ] Her içerikte tek CTA kullan; çoğunda satış yerine uzmanlık ve güven hedefle.
- [ ] UTM'li bağlantılarla hangi formatın nitelikli lead ürettiğini ölç.

### 7.4 Video ve görsel arama

- [ ] 60–120 saniyelik teknik açıklama videoları hazırla.
- [ ] CAD/FEA/saha ekran kayıtlarında gizli bilgileri temizle.
- [ ] YouTube başlıklarını gerçek sorulara göre yaz.
- [ ] Hizmet sayfalarına ilgili videoyu göm; VideoObject şemasını yalnızca
      gerçekten video varsa ekle.
- [ ] Blog şemalarını LinkedIn carousel ve kısa videoya dönüştür.

### 7.5 İş ortaklığı ve yönlendirme

- [ ] CNC, lazer, otomasyon, test laboratuvarı, patent vekili ve üniversite
      ekipleriyle tamamlayıcı partner ağı oluştur.
- [ ] Çift yönlü yönlendirme kriterlerini ve müşteri sahipliğini yazılı tanımla.
- [ ] Ortak webinar, kontrol listesi veya sektör raporu yayınla.
- [ ] Mevcut müşteriler için etik ve şeffaf referans talep akışı kur.

### 7.6 Ücretli trafik — yalnızca temel hazır olduktan sonra

- [ ] Vaka ve conversion tracking tamamlanmadan geniş Google Ads açma.
- [ ] İlk kampanyayı yüksek niyetli 5–10 sorguyla sınırla.
- [ ] Her reklam kümesini ayrı, birebir ilgili landing page'e gönder.
- [ ] Marka, ticari hizmet ve remarketing kampanyalarını ayır.
- [ ] Negatif anahtar kelimelerle iş ilanı, eğitim, ücretsiz çizim ve akademik
      ödev trafiğini dışla.
- [ ] CPL değil nitelikli lead ve teklif/kazanım oranını optimize et.

---

## 8. Önceliklendirilmiş TODO

### P0 — İlk 14 gün: dönüşüm kaçağını kapat

- [ ] Birincil segment, problem ve vaat kararını ver.
- [ ] Ana sayfa hero metnini somutlaştır.
- [ ] Birincil CTA'nın süre ve çıktısını açıkla.
- [ ] Üç doğrulanmış vaka taslağı çıkar; en az birini yayına al.
- [ ] Kurucu profili, fotoğrafı ve LinkedIn bilgisini güçlendir.
- [ ] Ana sayfaya gerçek CAD/analiz/proje görseli ekle.
- [ ] Üst navigasyonu sadeleştir.
- [ ] Mobil çerez/CTA çakışmasını çöz.
- [ ] Hero ve form conversion event'lerini doğru ölç.
- [ ] `review` blog içeriklerini canlıdan çıkar.
- [ ] Blog tarihlerini gerçek yayın takvimine bağla; rastgele tarih kullanma.
- [ ] Global `HowTo` schema hatasını düzelt ve Person schema ekle.
- [ ] GSC, Bing, sitemap ve IndexNow durumunu doğrula.
- [ ] İhtiyaç analizi e-posta ortam değişkenlerini ve uçtan uca formu test et.

### P1 — Gün 15–45: talep yakalayan siteyi kur

- [ ] Ana sayfayı `değer önerisi → kanıt → hizmet → süreç → vaka → CTA`
      sırasıyla yeniden düzenle.
- [ ] İlk beş ticari niyet landing page'ini yeniden yaz.
- [ ] Hizmet sayfalarına süre, girdi, çıktı, fiyat faktörleri ve uygunluk bölümü
      ekle.
- [ ] Üç vaka çalışmasını tamamla.
- [ ] Örnek teslimat galerisi ekle.
- [ ] Hafif ve amaçlı animasyonları devreye al.
- [ ] First-party lead API + CRM/pipeline kur.
- [ ] İlk 5 Google Business yorumunu topla.
- [ ] Gerçek yayın takviminde haftada 1–2 içerik yayınla.
- [ ] LinkedIn haftalık yayın ritmini başlat.
- [ ] GSC query/page ve GA4 conversion baseline raporunu çıkar.

### P2 — Gün 46–90: otorite ve dağıtımı büyüt

- [ ] OSB, oda ve sektörel dizin citation çalışmalarını tamamla.
- [ ] Partner içerik ve backlink programını başlat.
- [ ] İlk özgün teknik mini raporu yayınla.
- [ ] YouTube/kısa video serisini başlat.
- [ ] E-posta nurture ve teklif takip otomasyonunu kur.
- [ ] Aylık GEO citation test tablosunu başlat.
- [ ] En iyi ticari landing page'de kontrollü Google Ads pilotu aç.
- [ ] Ana sayfa mesajı, CTA metni ve vaka yerleşimi için A/B testleri yap.

---

## 9. 30 / 60 / 90 günlük yol haritası

### İlk 30 gün — Güven ve ölçüm

Hedef: Siteye gelen doğru ziyaretçinin neden iletişime geçmesi gerektiğini
anlaması ve bütün lead yollarının ölçülmesi.

- Konumlandırma netleşmiş.
- Ana sayfa mesajı ve navigasyon sadeleşmiş.
- En az bir güçlü vaka yayında.
- Kurucu/uzman profili güçlenmiş.
- Mobil cookie sorunu çözülmüş.
- GA4/GTM event'leri doğrulanmış.
- Review içerikleri canlıdan ayrılmış.
- GSC/Bing baseline alınmış.

### 31–60 gün — Ticari organik büyüme

Hedef: Yüksek niyetli sorgulardan trafik ve görüşme üretmek.

- Beş ticari landing page yayında.
- Toplam üç vaka yayında.
- Düzenli blog/LinkedIn ritmi başlamış.
- GBP yorum ve fotoğraf çalışması ilerlemiş.
- CRM ve hızlı takip süreci çalışıyor.
- İlk içerik/CTA deneyleri ölçülüyor.

### 61–90 gün — Otorite ve ölçek

Hedef: Takt'ı yalnızca kendi sitesinde değil üçüncü taraf kaynaklarda da görünür
ve tavsiye edilir hale getirmek.

- Sektörel citation ve partner bağlantıları kazanılmış.
- Özgün mini rapor veya webinar yayında.
- Video içerik hattı çalışıyor.
- GEO prompt takibi başlatılmış.
- Nitelikli sorgularda küçük bütçeli reklam pilotu çalışıyor.
- Trafik yerine pipeline ve kazanılan iş raporlanıyor.

---

## 10. Ölçüm modeli

### Kuzey yıldızı

**Aylık nitelikli lead sayısı** ve bu lead'lerden oluşan **teklif/pipeline değeri**.

Ham trafik tek başına başarı sayılmamalı.

### Haftalık metrikler

- Organik gösterim ve tıklama
- Hedef sorgularda konum
- Landing page → CTA tıklama oranı
- Form başlama ve tamamlama oranı
- WhatsApp/telefon/randevu tıklamaları
- Mobil/masaüstü dönüşüm farkı
- Yeni Google Business yorumu

### Aylık iş metrikleri

- Nitelikli lead sayısı
- Lead → görüşme oranı
- Görüşme → teklif oranı
- Teklif → kazanım oranı
- İlk yanıt süresi
- Kaybedilme nedenleri
- Kanal bazında pipeline/kazanılan ciro
- Organik ve AI referral dönüşümü
- Marka mention/citation payı

### Başlangıç hedefi

İlk 30 gün "hedef tutturma" değil baseline toplama dönemidir. Sonraki hedefler
gerçek veriden belirlenmeli. Örnek:

- CTA tıklama oranında önceki döneme göre artış
- Form tamamlama kaybında düşüş
- Niteliksiz lead oranında düşüş
- İlk yanıt süresinde iyileşme
- Ticari niyetli organik landing page sayısında ve gösteriminde artış

---

## 11. İlk test backlog'u

1. Hero:
   - A: "Teknik sürecinizin eksik halkası"
   - B: segment + sonuç odaklı vaat
2. CTA:
   - A: "Projenizi değerlendirelim"
   - B: "15 dakikalık ön değerlendirme planla"
3. Kanıt:
   - A: hizmet listesi önce
   - B: seçilmiş vaka önce
4. Form:
   - A: tam form
   - B: önce hizmet + iletişim, detay ikinci adım
5. Hero görseli:
   - A: statik gerçek proje görseli
   - B: hafif CAD çizim animasyonu

Her test için tek ana metrik seçilmeli. Aynı anda çok sayıda değişken
değiştirilmemeli.

---

## 12. Başarı tanımı

Bu yol haritası tamamlanmış sayılmaz yalnızca sayfalar güzel göründüğünde.
Aşağıdaki kanıtlar gerekir:

- [ ] En az üç doğrulanmış vaka ve gerçek görsel yayında.
- [ ] Kurucu/ekip uzmanlığı görünür ve schema ile bağlı.
- [ ] İncelenmemiş blog yazıları indekslenmiyor.
- [ ] Blog tarihleri gerçek yayın/güncelleme tarihleriyle tutarlı.
- [ ] Ana CTA, form, WhatsApp, telefon ve randevu dönüşümleri ölçülüyor.
- [ ] CRM/pipeline içinde her lead'in kaynağı ve sonucu görülebiliyor.
- [ ] GSC ve Bing doğrulanmış, sitemap sağlıklı.
- [ ] En az beş yüksek ticari niyet landing page'i yayında.
- [ ] Mobil ilk ekran cookie/CTA çakışması çözülmüş.
- [ ] Animasyonlar CWV ve reduced-motion testlerinden geçmiş.
- [ ] Aylık skor kartı trafik değil nitelikli lead ve pipeline raporluyor.

---

## 13. Denetim kanıtları ve referanslar

### Siteye özgü bulgular

- Canlı site: <https://takt.tr>
- Sitemap: 83 URL, kırık link 0, öksüz sayfa 0.
- Ana sayfa meta description: 223 karakter.
- 83 sayfada 30 kısa title, 27 uzun title, 29 kısa meta description ve 15 uzun
  meta description tespit edildi.
- `lib/case-studies.ts`: vaka listesi boş.
- `lib/team.ts`: tek, kısa kurucu profili.
- `content/blog/*/index.md`: 35 yazı aynı tarih.
- 34 yazı `review` statüsünde olmasına rağmen canlı yükleniyor.
- `app/layout.tsx`: HowTo schema global olarak bütün sayfalara ekleniyor.
- `components/HomeHub.tsx`: ana hero CTA tıklamaları ölçülmüyor.
- `components/CookieConsentBanner.tsx`: mobilde sabit ve büyük alt panel.

### Güncel arama görünümü

24 Temmuz 2026 tarihli genel web araması örneklerinde Takt ilk sekiz sonuçta
görünmedi:

- "mühendislik danışmanlığı Ankara"
- "makine tasarım danışmanlığı Ankara"
- "özel makine tasarımı danışmanlık Türkiye"
- "sonlu elemanlar analizi FEA danışmanlık Türkiye"

Öne çıkan rakip örnekleri:

- <https://www.mcmakine.com.tr/makine-tasarimi/>
- <https://www.angmakine.com/makine-tasarim-danismanligi/>
- <https://www.venonyazilim.com/fea-danismanlik>
- <https://www.prosimtech.com.tr/hizmetler/sonlu-elemanlar-analizi/>

### Resmî arama yönergeleri

- Google tarih yönergeleri:
  <https://developers.google.com/search/docs/appearance/publication-dates>
- Google structured data kalite yönergeleri:
  <https://developers.google.com/search/docs/appearance/structured-data/sd-policies>
- Google people-first içerik yönergeleri:
  <https://developers.google.com/search/docs/fundamentals/creating-helpful-content>
