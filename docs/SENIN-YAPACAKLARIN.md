# Takt — Senin Yapacakların
*Yalnızca site sahibi kimliği, giriş veya doğrulanmış gerçek gerektiren görevler*

Bu listedeki hiçbir madde **Vercel deploy'unu veya sitenin canlı kalmasını engellemez**. Kod, sitemap, blog ve kalite testleri deploy'dan bağımsız çalışır; aşağıdakiler görünürlük, güven ve dönüşümü zamanla güçlendirir.

Codex'in teknik listesi → `docs/TODO-CODEX.md` · GEO aylık takip → `docs/GEO-GORUNURLUK-TAKIP.md`

---

## 1. Arama motoru doğrulama (kimlik / hesap)

- [ ] **Google Search Console** — `https://takt.tr` mülkünü ekle; HTML etiketi `content` değerini Vercel'de `GOOGLE_SITE_VERIFICATION` olarak kaydet → redeploy → doğrula
- [ ] GSC'de site haritası gönder: `https://takt.tr/sitemap.xml`
- [ ] Önemli URL'ler için dizin isteği (ana sayfa, hizmetler, blog hub, yeni yazılar) — `docs/10-arama-motoru-indeksleme.md`
- [ ] **Bing Webmaster Tools** — mülk ekle; meta etiket `BING_MSVALIDATE` veya `public/BingSiteAuth.xml` ile doğrula
- [ ] Bing'de aynı sitemap'i gönder
- [ ] (Opsiyonel) Deploy sonrası IndexNow: `POST https://takt.tr/api/indexnow` — `INDEXNOW_API_SECRET` tanımlı olmalı

---

## 2. Dış profil tutarlılığı (giriş + gerçek bilgi)

Aşağıdaki profillerin **henüz bu doküman yazılırken otomatik güncellendiği iddia edilmez**; senin elle doğrulaman gerekir.

| Kanal | Tutarlı olması gerekenler | Not |
|-------|---------------------------|-----|
| **Google Business Profile** | Ad: Takt · Adres/telefon · Web: `https://takt.tr` · Hizmet açıklaması (Türkçe, marka dili) · Logo/foto (uydurma müşteri yok) | Yerel arama + güven |
| **LinkedIn (şirket / kurucu)** | `sameAs` ile site uyumu · Hizmet özeti · `https://takt.tr` tek canonical web | Schema `Person` / `Organization` ile eşleşmeli |
| **OSTIM / İvedik dizinleri** | Firma adı, iletişim, web sitesi, hizmet alanı — site metinleriyle çelişmesin | B2B yerel keşif |

Kontrol listesi (her profilde aynı mı?):

- [ ] Resmî unvan ve marka adı (Takt)
- [ ] Telefon ve e-posta
- [ ] Web sitesi URL'si: `https://takt.tr`
- [ ] Hizmet dili: tasarım, geliştirme, analiz, üretime hazırlık (abartılı iddia yok)
- [ ] Görsel: logo veya gerçek atölye/CAD görseli (stok sahte fabrika yok)

---

## 3. Gelecek vaka kanıtı (hukuki / ticari onay)

Sitede şu an **3 teknik vaka blog içinde** (DFM, DFA, termal genleşme). Ayrı referans sayfası veya yeni vakalar için:

- [ ] Müşteri **yazılı onayı** olmadan firma adı, logo veya ölçülebilir sonuç ekleme
- [ ] Onaylı rakamlar → `lib/case-studies.ts` veya ilgili blog frontmatter; anonim ise yalnızca sektör + teknik sonuç
- [ ] CAD, analiz çıktısı veya saha fotoğrafı: telif ve gizlilik kontrolü
- [ ] GBP / LinkedIn'de vaka paylaşımı: site URL'si ile aynı anlatım

---

## 4. Ölçüm ve form (hesap erişimi)

Deploy'u bloklamaz; dönüşüm raporlaması için:

- [ ] GTM / GA4'te `lead_form_submit`, `booking_click`, `contact_click` conversion işaretleme
- [ ] Vercel: `RESEND_*` ortam değişkenleri + canlı form testi (`/ihtiyac-analizi`, `/iletisim`)

---

## Öncelik özeti

| Öncelik | Görev | Deploy engeller mi? |
|---------|--------|---------------------|
| P1 | GSC + Bing doğrulama ve sitemap | Hayır |
| P2 | GBP / LinkedIn / OSTIM-İvedik tutarlılık | Hayır |
| P3 | Onaylı yeni vaka veya referans içeriği | Hayır |
| P4 | GA4 conversion + form canlı test | Hayır |
