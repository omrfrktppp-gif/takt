# Takt — SEO / GEO / AEO Altyapı Rehberi
*Doküman 09 · Teknik referans — veri odaklı genişletme*

> Bu doküman, mevcut SEO/GEO/AEO altyapısının **nerede, nasıl** genişletileceğini tanımlar. Strateji ve kontrol listesi için `04-seo-geo-aeo.md`; meta/etiket paketi için `07-seo-etiket-paketi.md`; AEO içerik kuralları için `08-aeo-paketi.md`; yayın sonrası durum için `06-seo-guncelleme.md`.

---

## Mimari özeti

| Katman | Dosya(lar) | Rol |
|--------|------------|-----|
| İçerik kaynağı | `lib/content.ts` | Scroll bölümleri + paneller (tek kaynak) |
| SEO meta | `lib/seo.ts` | `chapterSeo`, `buildMetadata()`, `panelSeo()` |
| Derin SEO içerik | `lib/seo-content.ts` | Hizmet/kapasite detay sayfaları (AEO blokları) |
| Anahtar kelime haritası | `lib/seo-keywords.ts` | İçerik yazımı referansı (meta'ya kopyalanmaz) |
| JSON-LD | `lib/schema.ts` | Organization, WebSite, HowTo, FAQ, Service, Article |
| Site sabitleri | `lib/site.ts` | `faqItems`, `processSteps`, iletişim, nav |
| Blog | `lib/blog.ts` | `blogTags`, `blogPosts` |
| Sitemap | `lib/sitemap-routes.ts` | Tüm statik URL'ler |
| AI bot özeti | `public/llms.txt`, `public/llms-full.txt` | GEO/AEO indeks |
| URL yardımcıları | `lib/pages.ts` | `panelPath()`, `experiencePanelPath()`, `detailChapters` |

**İki yüzey:**
1. **Scroll deneyimi** — `/` ve `/?b=chapter&p=panel` (WheelScrollController)
2. **Crawlable SEO sayfaları** — `/hizmetler/[slug]`, `/kapasitemiz/[slug]`, `/blog`, `/sss`, `/kvkk-aydinlatma-metni`

Bölüm listeleri (`/hizmetler`, `/hakkimizda` vb.) metadata koruyarak `/?b=...` adresine yönlendirir; detay slug sayfaları tam içerik + schema ile kalır.

---

## Yeni hizmet paneli ekleme

1. **`lib/content.ts`** — `hizmetler` bölümüne panel ekle (`id`, `title`, `body`)
2. **`lib/seo-content.ts`** — `hizmetSeoContent[panelId]` ile AEO içeriği (summary, sections, faq)
3. **`lib/seo-keywords.ts`** — `seoKeywordMap`'e konu anahtar kelimeleri (opsiyonel, içerik referansı)
4. **`public/llms.txt`** — Hizmetler listesine satır ekle
5. **`public/llms-full.txt`** — Tam içerik güncelle
6. Build → otomatik: `/hizmetler/[slug]`, sitemap, `generateStaticParams`

Slug = panel `id`. SEO path: `/hizmetler/{id}`.

---

## Yeni kapasite paneli ekleme

1. **`lib/content.ts`** — `kapasitemiz` bölümüne panel ekle
2. **`lib/seo-content.ts`** — `kapasiteSeoContent[panelId]` (şu an boş kayıt; genişletmeye hazır)
3. **`lib/seo-keywords.ts`** — `kapasite` veya panel bazlı konu ekle
4. **`public/llms.txt`** + **`llms-full.txt`** güncelle
5. Build → `/kapasitemiz/[slug]` + sitemap otomatik

---

## Yeni scroll bölümü (chapter) ekleme

1. **`lib/content.ts`** — `chapters` dizisine chapter ekle
2. **`lib/seo.ts`** — `chapterSeo` kaydı (title, description, path)
3. **`app/{path}/page.tsx`** — metadata + `redirect("/?b=...")` (mevcut örnekler: `app/hizmetler/page.tsx`)
4. **`lib/sitemap-routes.ts`** — `chapterSeo` döngüsü otomatik ekler
5. Nav: `visibleChapters` filtresi ile otomatik görünür (`hidden: true` ile gizlenebilir)

Deep link: `/?b={chapterId}` ve `/?b={chapterId}&p={panelId}`.

---

## FAQ ekleme / güncelleme

| Konum | Kullanım |
|-------|----------|
| `lib/site.ts` → `faqItems` | Genel SSS (`/sss`, FAQPage JSON-LD) |
| `lib/seo-content.ts` → panel `faq` | Hizmet/kapasite detay mini SSS |
| `public/llms.txt` | AI bot özeti (kısa yanıtlar) |

Yeni genel soru: `faqItems` dizisine ekle → `/sss` ve `faqPageSchema()` otomatik güncellenir. `llms.txt` SSS bölümünü senkron tut.

---

## Blog yazısı ekleme

`lib/blog.ts`:

```ts
// 1. Etiket yoksa blogTags'e ekle
// 2. blogPosts'a yazı ekle
// 3. draft: true → yayına alırken kaldır
```

Build sonrası otomatik: `/blog/{slug}`, etiket arşivleri, `articleSchema()`, sitemap.

---

## JSON-LD ekleme

| Schema | Fonksiyon | Nerede kullanılır |
|--------|-----------|-------------------|
| ProfessionalService | `organizationSchema()` | `app/layout.tsx` |
| WebSite | `websiteSchema()` | `app/layout.tsx` |
| HowTo | `howToSchema()` | `app/layout.tsx` (`processSteps`) |
| BreadcrumbList | `breadcrumbSchema()` | SEO sayfaları |
| FAQPage | `faqPageSchema()` | `/sss` |
| Service | `serviceSchema()` | Hizmet/kapasite detay |
| Article | `articleSchema()` | Blog yazıları |

Yeni schema türü: `lib/schema.ts`'e fonksiyon ekle, ilgili `page.tsx`'te `<JsonLd data={...} />`.

---

## Sitemap

`lib/sitemap-routes.ts` → `getStaticSitemapEntries()`:

- `/`, `/blog`, `/kvkk-aydinlatma-metni`
- Tüm `chapterSeo` path'leri
- `detailChapters` (`hizmetler`, `kapasitemiz`) altındaki tüm paneller
- Yayınlanmış blog yazıları + etiket arşivleri (yazısı olan etiketler)

Yeni statik sayfa: `entries` dizisine veya uygun döngüye ekle. Build hedefi: **42+ route** (içerik arttıkça artar).

---

## llms.txt senkronizasyonu

`public/llms.txt` — kısa indeks (botlar için). Yeni hizmet, kapasite, sayfa veya SSS eklediğinizde güncelleyin.

`public/llms-full.txt` — tam metin + URL listesi. Büyük içerik değişikliklerinde güncelleyin.

---

## Metadata şablonu

```ts
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sayfa Başlığı",
  description: "≤155 karakter özet.",
  path: "/route",
});
```

Title şablonu kök layout'ta: `%s — Takt`. Ana sayfa `title.absolute` kullanır.

---

## Scroll vs SEO ayrımı

| Özellik | Scroll (`/`) | SEO sayfaları |
|---------|--------------|---------------|
| Navigasyon | `scrollToChapter()` | `<Link href>` |
| Scrollbar | Gizli (wheel + kadans) | `scrollbar-none` |
| Footer | Yok (scroll bölümleri) | `SeoPageLayout` içinde |
| Metadata | Ana sayfa metadata | Sayfa bazlı `generateMetadata` |

SEO detay sayfalarından scroll'a link: `experiencePanelPath(chapterId, panelId)` → `/?b=...&p=...`. **"İnteraktif deneyimde aç" butonu kullanılmaz.**

---

## Kontrol listesi (yeni içerik sonrası)

- [ ] `npm run build` — route sayısı ve TypeScript hatasız
- [ ] Benzersiz title + description + canonical
- [ ] İlgili JSON-LD render ediliyor
- [ ] `llms.txt` güncel
- [ ] Sitemap'te yeni URL var
- [ ] AEO: ilk paragrafta 40–60 kelimelik net cevap (`08-aeo-paketi.md`)

---

## İlgili dokümanlar

| Dosya | İçerik |
|-------|--------|
| `04-seo-geo-aeo.md` | URL yapısı, kontrol listesi, ölçüm |
| `06-seo-guncelleme.md` | Yayın sonrası düzeltme paketi durumu |
| `07-seo-etiket-paketi.md` | Meta, OG, JSON-LD örnekleri |
| `08-aeo-paketi.md` | Önce-cevap, soru başlıkları, SSS seti |
