# Takt — Kalan Manuel Adımlar
*Doküman 12 · Faz 2 sonrası operasyonel görevler*

Teknik Faz 2 (schema, sitemap lastmod, dinamik llms.txt, ekip/vaka altyapısı) kod tarafında tamamlandı. Aşağıdaki adımlar manuel veya içerik ekibi tarafından yürütülür.

---

## 1. Arama motoru indeksleme

- [ ] **Google Search Console** — `docs/gsc-url-list.txt` içindeki **70 URL** için toplu dizin veya URL Denetimi (`docs/10-arama-motoru-indeksleme.md`)
- [ ] **Sitemap yeniden gönder** — `https://takt.tr/sitemap.xml` (blog 16–35 ve Faz 2 değişiklikleri sonrası)
- [ ] **IndexNow** — Deploy sonrası `POST https://takt.tr/api/indexnow` (Bearer `INDEXNOW_API_SECRET`)
- [ ] **Bing Webmaster Tools** — Sitemap ve doğrulama kontrolü

---

## 2. Google Business Profile (GBP)

- [x] Profil bilgileri güncel (adres, telefon, web sitesi `https://takt.tr`) — **kullanıcı tamamladı — link doğrulandı** (`https://maps.app.goo.gl/YUMHiBNjMPWLpg5f9`)
- [x] Hizmet kategorileri ve açıklama Türkçe, marka diliyle uyumlu — kullanıcı tamamladı
- [x] Fotoğraf/logo (uydurma müşteri veya sahte istatistik yok) — kullanıcı tamamladı

Site tarafı: `lib/site.ts` → `mapsUrl`, embed koordinatları ve schema `hasMap` / `sameAs` güncel.

---

## 3. Ekip içeriği (`lib/team.ts`)

- [ ] Kurucu dışı ekip üyesi eklenecekse: `teamMembers` dizisine kayıt (uydurma sertifika veya diploma yok)
- [ ] LinkedIn veya iletişim linkleri yalnızca doğrulanmış profiller için
- [ ] KVKK veri sorumlusu (`isDataController`) doğru kişide

---

## 4. Vaka çalışmaları (`lib/case-studies.ts`)

- [ ] Müşteri onayı alınmış proje özetleri `caseStudies` dizisine eklenir
- [ ] Logo, isim veya rakam yalnızca izinli ve doğrulanmış içerik
- [ ] Eklendikten sonra `/referanslar` CreativeWork schema otomatik üretir

---

## 5. Blog operasyonu

- [ ] `status: review` yazılar editör incelemesi → `published` (content/blog/*/index.md)
- [ ] Kapak görselleri: `content/blog/NN-slug/images/` (README’ye bakın)
- [ ] Yeni yazı sonrası: build → deploy → GSC/IndexNow

---

## 6. GEO aylık test

- [ ] ChatGPT, Perplexity, Gemini, Claude’da marka + hizmet sorguları (`docs/04-seo-geo-aeo.md`)
- [ ] `https://takt.tr/llms.txt` dinamik çıktısı güncel blog listesini içeriyor mu kontrol
- [ ] `public/llms-full.txt` — derin GEO içeriği gerektiğinde manuel senkron

---

## 7. Deploy sonrası teknik kontrol

- [ ] `npm run build` geçti
- [ ] `https://takt.tr/sitemap.xml` — lastmod tarihleri mantıklı
- [ ] `https://takt.tr/hakkimizda` — Person JSON-LD (ekip)
- [ ] Hizmet detay — FAQPage JSON-LD (panel SSS)
- [ ] Blog yazısı — Article author Person şeması

---

## Faz 3 (sıradaki)

Faz 2 + blog 16–35 deploy doğrulandıktan sonra Faz 3’e geçilir: ekip içeriği (`lib/team.ts`), onaylı vaka çalışmaları (`lib/case-studies.ts`), GSC/IndexNow toplu indeksleme ve GEO aylık test döngüsü (yukarıdaki açık maddeler).

---

## İlgili dokümanlar

- `docs/10-arama-motoru-indeksleme.md` — GSC, Bing, IndexNow ayrıntıları
- `docs/09-seo-geo-aeo-altyapi.md` — Veri dosyaları ve genişletme
- `docs/04-seo-geo-aeo.md` — SEO/GEO strateji
