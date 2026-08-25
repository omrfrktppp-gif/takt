# Takt — Arayüz ve Motion Uygulama Yol Haritası

*25 Temmuz 2026 · Karar ve kabul kaydı*

## 1. Kanıt ve içerik kapısı

- `CaseStudyRecord` modeli problem, kapsam, kısıt, teslim, dayanak ve mevcut
  blog slug'ını taşır.
- `/referanslar`, yayımlanmış teknik vakaları problem → kapsam → teslim
  düzeninde gösterir. Blog bağlantısı yalnız slug gerçekten yayımdaysa oluşur.
- Yeni müşteri adı, logo, fotoğraf veya sonuç metriği kullanıcı onayı olmadan
  eklenmez.

## 2. Kaydırma ve motion temeli

- Belge tek dikey kaydırma sahibi yapılır; `SeoPageLayout` içindeki nested
  vertical scroll kaldırılır, yatay taşma ayrıca kontrol edilir.
- Kullanılmayan özel scroll/snap sistemi route kullanımı doğrulandıktan sonra
  temizlenir.
- Ana sahne yaklaşık `220vh` olur. Sticky panelin gerçek yüksekliği
  `calc(100dvh - var(--nav-h))` değerini aşmaz.
- Dört sahne durumu sabittir: darboğaz, kısıtlar, exploded-view ve tamamlanmış
  sistem/teslimler.
- Motion süresi mikro tepkide 160 ms, içerik girişinde 280 ms, büyük SVG
  dönüşümünde 560 ms'dir. Scroll-linked değerler lineer ilerler.
- Mouse parallax yalnız `pointer:fine` ortamında ve ±6 px içinde çalışır.
  Mobil ve reduced-motion sunumları sticky/parallax kullanmaz.

## 3. Sayfa deneyimleri

- Ana sayfa: değer önerisi → problem seçimi → teknik dönüşüm → hizmet
  eşleştirmesi → doğrulanmış vakalar → tek CTA.
- Hizmet/kapasite: metin duvarları uygun problem, süreç ve teslim bloklarına
  ayrılır.
- Blog: tarih, konu, okuma süresi ve teknik vaka etiketi görünür hiyerarşi
  kazanır; detayda içindekiler ve ilgili hizmet/vaka bağlantıları bulunur.
- İhtiyaç analizi: masaüstünde soru + canlı teknik föy, mobilde doğal tek kolon;
  kalıcı ilerleme, belirgin focus/selected ve soru düzeyinde hata sunumu.
- İletişim: gönderilebilecek çizim, şartname, fotoğraf ve mevcut hesap
  örnekleri açıkça anlatılır.
- Cookie bildirimi içerik akışını itmeyen, erişilebilir kompakt alt panel olur.

## 4. Performans ve kabul kapıları

- Video, WebGL, canvas ve Lottie eklenmez; animasyon client island olarak
  below-fold yüklenir.
- Önemli metin ve bağlantılar Server Component HTML'inde bulunur; SVG tek bilgi
  kaynağı değildir.
- Playwright; sticky konumu, 0→1→2→3 ve ters ilerlemeyi, yatay taşmayı, mobil
  fallback'i ve DOM'da “kaydır/scroll” yönlendirmesi olmadığını doğrular.
- Reduced-motion, klavye sırası, focus görünürlüğü, en az 44 px dokunma hedefi
  ve Axe A/AA kontrolleri geçer.
- Console/hydration, kırık link ve orphan route hatası sıfır olmalıdır.
- Temiz Chrome profilinde Lighthouse Performance ≥90; Accessibility ve SEO
  ≥95 hedeflenir. LCP ve CLS üretim taban değerlerinden kötüleşmemelidir.
- Lint, production build, E2E ve canlı smoke test geçmeden production deploy
  tamamlanmış sayılmaz.

## 5. Yayın ve kayıt

- Önce Vercel preview; masaüstü, mobil ve reduced-motion doğrulaması yapılır.
- Başarılı production deploy sonrasında `/`, `/referanslar`, blog vaka
  bağlantıları, formlar ve navigasyon canlıda yeniden test edilir.
- Commit, test sonucu, deploy URL'si, bilinen sorun ve ertelenen işler
  `docs/15-uygulama-oturum-logu.md` dosyasına yazılır.
- Bilgisayar yalnız tüm değişiklikler kaydedilip push edildiğinde, production
  doğrulandığında ve çalışan süreç kalmadığında 60 saniye gecikmeli kapanır.

