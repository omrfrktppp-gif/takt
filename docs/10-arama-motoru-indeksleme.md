# Takt — Google & Bing İndeksleme Rehberi
*Doküman 10 · Search Console, Webmaster Tools, IndexNow*

Bu doküman, `takt.tr` sitesinin Google ve Bing tarafından taranması ve yeniden dizine alınması için gerekli dosyaları ve adımları tanımlar.

---

## Projede hazır dosyalar

| Dosya / URL | Amaç |
|-------------|------|
| `https://takt.tr/robots.txt` | Tüm botlara izin + sitemap adresi |
| `https://takt.tr/sitemap.xml` | 42+ URL (bölümler, hizmet/kapasite detay, blog, SSS, KVKK) |
| `https://takt.tr/llms.txt` | AI/GEO bot özeti |
| `https://takt.tr/a8f3c2e1b9d0475682acf1e03b4d1597.txt` | **IndexNow** anahtar dosyası (Bing hızlı bildirim) |
| `lib/indexing.ts` | Merkezi indeksleme yapılandırması |
| `app/api/indexnow/route.ts` | Deploy sonrası toplu URL bildirimi (opsiyonel) |
| `public/BingSiteAuth.xml.example` | Bing XML doğrulama şablonu |
| `public/yandex_d355b3ae5e2c91ac.html` | Yandex HTML dosya doğrulama |

---

## 1. Vercel ortam değişkenleri

Vercel → Project → Settings → Environment Variables:

| Değişken | Nereden alınır | Zorunlu |
|----------|----------------|---------|
| `GOOGLE_SITE_VERIFICATION` | Google Search Console → HTML etiketi → `content=` değeri | Önerilir |
| `BING_MSVALIDATE` | Bing Webmaster Tools → Meta tag → `content=` değeri | Önerilir |
| `INDEXNOW_API_SECRET` | Kendiniz üretin (uzun rastgele string) | Opsiyonel |
| `YANDEX_VERIFICATION` | Yandex Webmaster → meta tag `content=` (alternatif: `yandex_*.html` dosyası) | Önerilir |

Deploy sonrası `<head>` içinde doğrulama meta etiketleri otomatik eklenir (`app/layout.tsx` → `buildSearchVerificationMetadata()`).

**Bing XML doğrulama alternatifi:** `BingSiteAuth.xml.example` dosyasını kopyalayıp `public/BingSiteAuth.xml` olarak kaydedin; `<user>` içine Bing kodunuzu yazın.

---

## 2. Google Search Console

1. [search.google.com/search-console](https://search.google.com/search-console) → **Mülk ekle** → **Alan adı** veya **URL öneki**: `https://takt.tr`
2. **Doğrulama yöntemi:** HTML etiketi  
   - `content="..."` değerini kopyalayın → Vercel'de `GOOGLE_SITE_VERIFICATION` olarak kaydedin → redeploy
3. **Site Haritaları** → Yeni site haritası ekle:  
   `https://takt.tr/sitemap.xml`
4. **Yeniden dizine alma (deploy sonrası):**
   - URL Denetimi → `https://takt.tr/` → **Dizine eklenmesini iste**
   - Önemli sayfalar için tekrarlayın: `/hizmetler/proje-danismanligi`, `/sss`, `/blog`
   - Veya sitemap gönderimi sonrası birkaç gün bekleyin (Google otomatik tarar)

> Google sitemap ping URL'si (2023'te kaldırıldı) artık kullanılmıyor; Search Console yeterli.

---

## 3. Bing Webmaster Tools

1. [bing.com/webmasters](https://www.bing.com/webmasters) → Site ekle: `https://takt.tr`
2. **Doğrulama:** Meta etiket (`BING_MSVALIDATE`) veya `public/BingSiteAuth.xml`
3. **Sitemap gönder:** `https://takt.tr/sitemap.xml`
4. **IndexNow:** Anahtar dosyası zaten yayında. Deploy sonrası API ile bildirim:

```bash
curl -X POST "https://takt.tr/api/indexnow" \
  -H "Authorization: Bearer YOUR_INDEXNOW_API_SECRET" \
  -H "Content-Type: application/json" \
  -d "{}"
```

Boş `{}` gövdesi tüm sitemap URL'lerini Bing/IndexNow ağına bildirir.

---

## 4. Yeni içerik ekledikten sonra

1. `npm run build` — yeni route sitemap'e otomatik girer (`lib/sitemap-routes.ts`)
2. Deploy (Vercel `main` push)
3. Google Search Console → URL Denetimi → yeni URL → Dizine ekle
4. Bing → IndexNow POST (yukarıdaki curl) veya Webmaster Tools → URL Gönder

---

## 5. Kontrol listesi

- [ ] `https://takt.tr/robots.txt` — Sitemap satırı görünüyor
- [ ] `https://takt.tr/sitemap.xml` — XML geçerli, URL'ler 200 dönüyor
- [ ] Google Search Console mülk doğrulandı
- [ ] Sitemap Search Console'a eklendi
- [ ] Bing Webmaster doğrulandı + sitemap eklendi
- [ ] IndexNow anahtar dosyası 200 (`/{key}.txt`)
- [ ] Ana sayfa + 2–3 hizmet sayfası manuel dizine eklendi

---

## 6. Genişletme

| Yeni içerik | Otomatik güncellenen |
|-------------|----------------------|
| Hizmet paneli | sitemap, `/hizmetler/[slug]`, llms.txt (manuel senkron) |
| Blog yazısı | sitemap, `/blog/[slug]` |
| Yeni bölüm | `chapterSeo` → sitemap |

Detay: `docs/09-seo-geo-aeo-altyapi.md`

---

## İlgili dokümanlar

- `04-seo-geo-aeo.md` — SEO/GEO strateji
- `09-seo-geo-aeo-altyapi.md` — Veri dosyaları ve genişletme
