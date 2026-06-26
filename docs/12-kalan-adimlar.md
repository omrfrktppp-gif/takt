# Takt — Kalan Manuel Adımlar
*Doküman 12 · Faz 3–5 sonrası operasyonel görevler*

Teknik Faz 3 (dönüşüm ölçümü, WhatsApp, lead magnet altyapısı, vaka çalışması modeli, hizmet meta kutuları, blog→hizmet linkleri, sektör sayfaları, schema/sitemap güncellemeleri) kod tarafında tamamlandı.

**Faz 4/5 (teknik) tamamlandı:**
- Öksüz sayfa linkleme: nav + footer (Sektörler hub/slug, Referanslar, Kaynaklar/lead magnet)
- Ana sayfa hero (`giris` bölümü): tagline, CTA, lead magnet linki
- Mobil kalıcı CTA şeridi (`MobileCtaBar`) + WhatsApp butonu konumu
- Bağlamsal lead magnet promosu (hizmet detay + iletişim)
- WhatsApp varsayılan mesajı güncellendi: *"Hizmetleriniz hakkında bilgi almak istiyorum."*

**Faz 6 (teknik P0) tamamlandı:**
- `public/llms.txt` silindi; dinamik `app/llms.txt/route.ts` sektörler, rehberler, kaynaklar ve 35 blogu içerir
- 4 pillar rehber sayfası: `/rehber` hub + `/rehber/[slug]` (topic cluster)
- Blog yazılarında pillar geri linki + görünür yazar künyesi (`/hakkimizda#omer-faruk-top`)
- `WheelScrollController` mobil + `prefers-reduced-motion` bypass doğrulandı (Faz 3)
- Sitemap + GSC URL listesi rehber rotalarıyla güncellendi

Aşağıdaki adımlar manuel veya içerik ekibi tarafından yürütülür.

---

## 1. Arama motoru indeksleme

- [x] **GSC URL listesi** — Faz 6 rehber rotaları eklendi (gen-gsc-urls.mjs)
- [ ] **Google Search Console** — listedeki URL'ler için toplu dizin; Faz 6 `/rehber/*` dahil (`docs/10-arama-motoru-indeksleme.md`)
- [ ] **Sitemap yeniden gönder** — `https://takt.tr/sitemap.xml` (Faz 3 sayfaları sonrası)
- [ ] **IndexNow** — Deploy sonrası `POST https://takt.tr/api/indexnow` (Bearer `INDEXNOW_API_SECRET`)
- [ ] **Bing Webmaster Tools** — Sitemap ve doğrulama kontrolü

---

## 2. Google Business Profile (GBP)

- [x] Profil bilgileri güncel (adres, telefon, web sitesi `https://takt.tr`) — link doğrulandı (`https://maps.app.goo.gl/YUMHiBNjMPWLpg5f9`)
- [x] Hizmet kategorileri ve açıklama Türkçe, marka diliyle uyumlu
- [x] Fotoğraf/logo (uydurma müşteri veya sahte istatistik yok)
- [ ] İlk **3–5 müşteri yorumu** (yerel sıralama + güven) — `SAHIBI-AKSIYONLARI.md` P0-1

---

## 3. Dönüşüm ölçümü (GTM / GA4)

- [x] Kod: `lead_form_submit`, `booking_click`, `contact_click` event'leri (`lib/analytics.ts`)
- [ ] **GTM arayüzü:** Bu event'leri GA4 conversion olarak işaretle
- [ ] Deploy sonrası Tag Assistant ile form, randevu, tel/e-posta/WhatsApp tıklamalarını doğrula

---

## 4. Ekip içeriği (`lib/team.ts`)

- [ ] Kurucu dışı ekip üyesi eklenecekse: `teamMembers` dizisine kayıt (uydurma sertifika veya diploma yok)
- [ ] Kişisel **LinkedIn** URL'si doğrulandığında `linkedin` alanına ekle (founder schema `sameAs`)
- [ ] KVKK veri sorumlusu (`isDataController`) doğru kişide

---

## 5. Vaka çalışmaları (`lib/case-studies.ts`)

- [ ] Müşteri onayı alınmış **rakamlı** proje özetleri `caseStudies` dizisine eklenir (`problem`, `approach`, `results[]`)
- [ ] Logo, isim veya rakam yalnızca izinli ve doğrulanmış içerik
- [ ] Eklendikten sonra `/referanslar` CreativeWork schema otomatik üretir

---

## 6. Başlangıç ihtiyaç formu

- [x] Kod: PDF indirme + WhatsApp/e-posta ile gönderim (`/kaynaklar/baslangic-kontrol-listesi`)
- [x] PDF: `public/kaynaklar/takt-baslangic-ihtiyac-formu.pdf`
- [ ] Canlıda indirme + WP/mailto linklerini test et
- [ ] (İleride) Sunucu tarafı PDF yükleme — `docs/13-baslangic-formu-drive-kurulum.md`

---

## 7. WhatsApp hattı

- [x] Kod: yüzen WhatsApp butonu (`components/WhatsAppButton.tsx`, `lib/site.ts`)
- [x] Varsayılan mesaj güncellendi (hizmetler odaklı metin)
- [ ] Mesajlara kimin bakacağını operasyonel olarak netleştir
- [ ] İşletme numarası değişirse `lib/site.ts` → `whatsapp` güncelle

---

## 8. Blog operasyonu

- [ ] `status: review` yazılar editör incelemesi → `published` (content/blog/*/index.md)
- [ ] Ticari-niyetli yeni yazılar (Faz 3 öneri başlıkları — `SAHIBI-AKSIYONLARI.md` P1-5)
- [ ] Yazı sonu `callToAction` veya frontmatter `related_service` ile hizmet bağlantısı
- [ ] Yeni yazı sonrası: build → deploy → GSC/IndexNow

---

## 9. GEO aylık test

- [ ] ChatGPT, Perplexity, Gemini, Claude'da marka + hizmet sorguları (`docs/04-seo-geo-aeo.md`)
- [x] `https://takt.tr/llms.txt` dinamik route — bayat statik dosya kaldırıldı; blog + sektör + rehber senkron
- [ ] `public/llms-full.txt` — derin GEO içeriği gerektiğinde manuel senkron

---

## 10. Deploy sonrası teknik kontrol

- [ ] `npm run build` geçti
- [ ] `site_audit.py` — ORPHAN: 0 (öksüz sayfa kalmamalı)
- [ ] `https://takt.tr/sitemap.xml` — lastmod tarihleri mantıklı; sektör + kaynak URL'leri dahil
- [ ] `https://takt.tr/hakkimizda` — Person JSON-LD (ekip + founder `knowsAbout`)
- [ ] Hizmet detay — süre/ücret kutusu + FAQPage JSON-LD
- [ ] Blog yazısı — "İlgili hizmet" kartı + Article author şeması
- [ ] PageSpeed Insights (mobil) — CWV ölçümü; scroll-UX mobilde klasik scroll'a düşüyor mu

---

## 11. Faz 6 — manuel / sahip görevleri

- [ ] **SoM (Share of Model) aylık test** — ChatGPT, Perplexity, Gemini, Google AI Mode'da marka + hizmet sorguları (`docs/04-seo-geo-aeo.md`)
- [ ] **Türkçe sanayi/OSB dizin kayıtları** — Ostim, sektör rehberleri, citation çoğaltma
- [ ] **Özgün mini-raporu** + basın bülteni (gerçek veri toplandığında; uydurma istatistik yok)
- [ ] **LinkedIn / kısa video** düzenli yayın ritmi (kurucu + şirket)
- [ ] **GSC re-index** — yeni `/rehber` ve `/rehber/*` URL'leri (`docs/gsc-url-list.txt` güncellendi)
- [ ] **GTM** — conversion event'leri (`docs/12-kalan-adimlar.md` §3)
- [ ] **Ticari-niyetli blog yazıları** — özellikle TÜBİTAK/KOSGEB kümesi (pillar hazır, cluster genişletilecek)
- [ ] **Ana sayfalara özgün istatistik / uzman alıntısı** — yalnızca doğrulanmış veri veya nitel ifadeler

### Etiket hijyeni (Faz 6 inceleme)

Her etiket sayfasında en az 3 yazı hedeflenir. İnce etiketler (<3 yazı):

| Etiket | Yazı sayısı | Not |
|---|---|---|
| `muhendislik-danismanligi` | 0 | Fallback etiket; pratikte kullanılmıyor |
| `teknik-ekip-yonetimi` | 0 | İçerik eklenene kadar etiket sayfası 404 |
| `arge-urge` | 0 | Ar-Ge odaklı yazılar eklenecek |
| `tubitak-kosgeb-patent` | 0 | Ticari blog kümesi planlandı |
| `ankara-sanayi` | 0 | Yerel-niyetli yazılar eklenecek |

3 yazılı etiketler: `proje-danismanligi`, `uretim-danismanligi`, `kalite-ilkeleri` — genişletme önerilir.

---

## İlgili dokümanlar

- `docs/10-arama-motoru-indeksleme.md` — GSC, Bing, IndexNow ayrıntıları
- `docs/09-seo-geo-aeo-altyapi.md` — Veri dosyaları ve genişletme
- `docs/04-seo-geo-aeo.md` — SEO/GEO strateji
- `takt-oneri-yedek/faz3/SAHIBI-AKSIYONLARI.md` — Sahip manuel görevler (GBP yorumları, vaka verisi, PDF, LinkedIn)
