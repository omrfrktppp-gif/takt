# Takt — SEO/AEO/GEO Güncelleme Paketi
*Doküman 06 · Yayın sonrası düzeltmeler*

> Site canlı: https://takt.tr · Bu paket tespit edilen zayıf noktaları çözer.

---

## Uygulama durumu

- [x] **#1 Gerçek route'lar** — `/hakkimizda`, `/hizmetler`, `/hizmetler/[slug]`, `/kapasitemiz`, `/kapasitemiz/[slug]`, `/yaklasim`, `/referanslar`, `/iletisim`, `/gorusme-planla`, `/blog`, `/sss`
- [x] **#4 İçerik derinliği** — 7 hizmet sayfası `lib/seo-content.ts` ile genişletildi (önce cevap, kimler için, nasıl, senaryo, mini FAQ)
- [x] **#2 llms.txt** — `public/llms.txt` güncel; `public/llms-full.txt` eklendi
- [x] **#3 FAQ + FAQPage** — 16 soru (Dok. 08) `lib/site.ts`; `/sss` (FAQPage JSON-LD); `/hakkimizda#sss` özet
- [x] **HowTo JSON-LD** — 4 adım süreç (`lib/schema.ts` → `howToSchema()`, kök layout)
- [x] **ProfessionalService** — `knowsAbout` ve `description` güncellendi; `sameAs` LinkedIn + Instagram
- [x] **#6 OG görseli** — `app/opengraph-image.tsx` (dinamik)
- [x] **sitemap.xml** — `lib/sitemap-routes.ts` tüm rotaları kapsar
- [ ] **#5 Off-page** — LinkedIn düzenli içerik, Google Business Profile, Search Console (manuel)

---

## Weak #1 — Gerçek route (TAMAMLANDI)

Ana sayfa (`/`) scroll deneyimi korunur; her bölümün crawlable SEO sayfası vardır. Scroll bölümleri `/?b=...` ve alt paneller `/?b=...&p=...` ile ana sayfada açılır; SEO sayfaları aynı site içinde kalır, ayrı “deneyim” butonu yoktur.

---

## Weak #4 — İçerik derinliği (TAMAMLANDI — hizmetler)

Her hizmet detay sayfası: özet cevap → kimler için → nasıl çalışıyoruz → örnek senaryolar → mini FAQ.

Kapasite detay sayfaları kısa panel metniyle; ileride genişletilebilir.

Blog altyapısı hazır (`lib/blog.ts`); içerik kullanıcı tarafından doldurulacak.

---

## Weak #2 — llms.txt (TAMAMLANDI)

- `public/llms.txt` — kısa indeks, tüm route'lar, iletişim
- `public/llms-full.txt` — tam site içeriği + URL'ler
- Canlı iletişim: **info@takt.tr**, +90 551 981 4728
- LinkedIn: https://www.linkedin.com/company/takt-danismanlik/

---

## Weak #3 — FAQ (TAMAMLANDI — Dok. 08 genişletildi)

16 soru: tanımsal (Takt, mühendislik danışmanlığı, tersine mühendislik, fason üretim, takt time) + hizmet/pratik (hizmetler, üretim modeli, CNC/lazer/3D, prototip, TÜBİTAK/KOSGEB, patent, tek hizmet, fikirden üretime, konum, başlangıç, fiyatlandırma).

Sayfalar: `/sss` (FAQPage schema), `/hakkimizda#sss` (liste, schema yok — tekrar önlenir)

---

## JSON-LD özeti

| Tür | Konum |
|-----|-------|
| ProfessionalService + WebSite | `app/layout.tsx` |
| BreadcrumbList | Tüm SEO sayfaları |
| FAQPage | `/sss`, `/hakkimizda` |
| Service | `/hizmetler/[slug]`, `/kapasitemiz/[slug]` |
| Article | `/blog/[slug]` |

---

## Weak #6 — OG / favicon (KISMEN)

- [x] Dinamik OG: `app/opengraph-image.tsx`
- [ ] Logo asset / favicon iyileştirmesi (isteğe bağlı)
- [ ] Referans görselleri (içerik gelince)

---

## Weak #5 — Off-page (MANUEL)

1. LinkedIn şirket sayfası — düzenli teknik post
2. Google Business Profile
3. Google Search Console + Bing Webmaster → sitemap gönder
4. Sektör dizinleri, teknopark/oda linkleri
5. Tutarlı NAP (info@takt.tr, telefon, Ankara)

---

## Blog ekleme

1. `lib/blog.ts` → `blogTags` ve `blogPosts`
2. `draft: true` kaldır → build sonrası sitemap'e eklenir

---

## Ölçüm (GEO/AEO)

Ayda bir sabit prompt listesi ile test:
- "Ankara mühendislik danışmanlığı"
- "özel makina tasarımı danışmanlık"
- "TÜBİTAK proje danışmanlığı Ankara"

ChatGPT, Perplexity, Gemini'de Takt geçiyor mu takip edin.
