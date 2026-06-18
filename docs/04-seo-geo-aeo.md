# Takt — SEO / GEO / AEO
*Doküman 4 / 5 — güncel*

İlgili paketler: `07-seo-etiket-paketi.md` (meta + JSON-LD + anahtar kelime haritası), `08-aeo-paketi.md` (SSS + HowTo + önce-cevap yapısı), **`09-seo-geo-aeo-altyapi.md`** (veri dosyaları + genişletme rehberi).

## metadataBase
`https://takt.tr`

## URL yapısı
| URL | Tür |
|-----|-----|
| `/` | İnteraktif ana deneyim (scroll) |
| `/hakkimizda` | SEO sayfası (SSS özeti → `/sss`) |
| `/hizmetler` | Hizmet listesi |
| `/hizmetler/[slug]` | Hizmet detay (7 sayfa) |
| `/kapasitemiz` | Kapasite listesi |
| `/kapasitemiz/[slug]` | Kapasite detay |
| `/yaklasim` | Yaklaşım |
| `/iletisim` | İletişim + form + harita |
| `/gorusme-planla` | Randevu |
| `/blog` | Blog indeks |
| `/blog/[slug]` | Yazı |
| `/blog/etiket/[tag]` | Etiket arşivi |
| `/sss` | Genişletilmiş SSS (FAQPage JSON-LD) |

## JSON-LD
- `ProfessionalService` + `WebSite` + `HowTo` (layout)
- `BreadcrumbList` (tüm SEO sayfaları)
- `FAQPage` (`/sss`)
- `Service` (hizmet/kapasite detay)
- `Article` (blog yazıları)

## Dosyalar
- `public/robots.txt` — GPTBot, ClaudeBot, Google-Extended, PerplexityBot Allow
- `app/sitemap.ts` — dinamik rota listesi (`lib/sitemap-routes.ts`)
- `public/llms.txt` + `public/llms-full.txt` — AI botları için site özeti
- `lib/seo.ts` — metadata şablonları
- `lib/blog.ts` — yazı ve etiket kaynağı (Dok. 07 konu haritası)

## Blog ekleme
1. `lib/blog.ts` → `blogTags` dizisine etiket ekleyin
2. Aynı dosyada `blogPosts` dizisine yazıyı ekleyin
3. `draft: true` kaldırın → build sonrası sitemap ve sayfa otomatik oluşur

## Kontrol listesi
- [x] Her SEO sayfasında benzersiz title + description + canonical
- [x] Tek h1, hiyerarşik başlıklar (SEO sayfaları)
- [x] OG + Twitter + opengraph-image
- [x] JSON-LD: Organization, WebSite, HowTo, Breadcrumb, FAQ, Service, Article
- [x] robots.txt + sitemap + llms.txt + llms-full.txt
- [x] Ayrı crawlable URL'ler (redirect kaldırıldı)
- [x] Blog altyapısı (içerik bekliyor)
- [ ] Google Search Console kaydı
- [ ] Google Business Profile
- [ ] OG görsel / logo asset'leri
- [ ] Referanslar sayfası (içerik)

## Ölçüm (GEO/AEO)
Ayda bir 20–30 sabit prompt ile test:
- "Ankara mühendislik danışmanlığı"
- "özel makina tasarımı danışmanlık"
- "TÜBİTAK proje danışmanlığı Ankara"

ChatGPT, Perplexity, Gemini'de Takt geçiyor mu takip edin.
