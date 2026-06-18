# Takt — SEO Etiket & Dosya Paketi
*Doküman 07 · Cursor için tam SEO uygulama referansı*

> Felsefe: **doğru etiket, doğru yerde — sayı değil kalite.** `meta keywords` ölü, stuffing zararlı. Aşağıdaki seti tüm sayfalara uygula; "hacim" anahtar kelime haritasından (içerik/başlık/alt metin) gelir, etiket doldurmaktan değil.

---

## 1. Global `<head>` / metadata (her sayfada ortak taban)

Next.js kök `app/layout.tsx`:
```ts
export const metadata = {
  metadataBase: new URL("https://takt.tr"),
  title: { default: "Takt — Mühendislik Danışmanlığı", template: "%s — Takt" },
  description: "Makina imalatı ve sanayide firmaların teknik ekibine dışarıdan güç katan mühendislik danışmanlığı.",
  applicationName: "Takt",
  authors: [{ name: "Takt" }],
  creator: "Takt",
  publisher: "Takt",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    type: "website", locale: "tr_TR", url: "https://takt.tr", siteName: "Takt",
    title: "Takt — Mühendislik Danışmanlığı",
    description: "Teknik ekibinizin eksik halkası.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Takt" }],
  },
  twitter: { card: "summary_large_image", title: "Takt", description: "Teknik ekibinizin eksik halkası.", images: ["/opengraph-image"] },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  manifest: "/site.webmanifest",
  category: "engineering",
};
export const viewport = { themeColor: "#12161C", width: "device-width", initialScale: 1 };
```
`<html lang="tr">` zorunlu. Çoklu dil gelince `alternates.languages` + `hreflang` eklenir (şimdilik tek dil).

---

## 2. Sayfa sayfa meta (her route kendi `metadata`'sını export eder)

Title ≤ ~60 karakter, description ≤ ~155 karakter. Her birinde `alternates.canonical` ilgili route.

| Route | Title | Description |
|---|---|---|
| `/` | Takt — Mühendislik Danışmanlığı | Makina imalatı ve sanayide teknik ekiplere dışarıdan mühendislik gücü: tasarım, analiz, proje ve üretim yönetimi. |
| `/hizmetler` | Hizmetler | Proje danışmanlığı, tasarım, analiz, üretim danışmanlığı, Ar-Ge ve TÜBİTAK/KOSGEB/patent destekleri tek elden. |
| `/kapasitemiz` | Kapasitemiz | 3D tarama/baskı, CNC, lazer kesim, fason üretim, kaynak, kaplama — geniş çözüm ortağı ağıyla tek noktadan. |
| `/yaklasim` | Yaklaşım | Net kapsam, doğru tempo ve gerçekçi mühendislik: süreçlerinize ölçülebilir bir ritim kazandırıyoruz. |
| `/referanslar` | Referanslar | Çalıştığımız proje tipleri ve çalışma alanları. |
| `/iletisim` | İletişim | Projenizdeki eksik halkayı konuşalım. Takt ile görüşme planlayın. |
| `/sss` | Sık Sorulan Sorular | Mühendislik danışmanlığı, hizmetler, üretim modeli ve çalışma süreci hakkında kısa yanıtlar. |

Her hizmet alt sayfası açılırsa (öneri) aynı şablon: `/hizmetler/proje-danismanligi` vb., her biri kendi title/description + Service JSON-LD.

---

## 3. Yapısal veri (JSON-LD) — tam set

### 3.1 Organization / ProfessionalService (kök layout)
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://takt.tr/#org",
  "name": "Takt",
  "alternateName": "Takt Danışmanlık",
  "url": "https://takt.tr",
  "email": "info@takt.tr",
  "description": "Makina imalatı ve sanayide firmalara mühendislik danışmanlığı; tasarım, analiz, proje yönetimi ve üretim koordinasyonu.",
  "areaServed": { "@type": "Place", "name": "Ankara, Türkiye" },
  "knowsAbout": [
    "Mühendislik danışmanlığı","Proje danışmanlığı","Süreç optimizasyonu","Tesis yönetimi",
    "Teknik ekip yönetimi","Makina tasarımı","Sistem tasarımı","Tersine mühendislik",
    "Mühendislik analizi","Simülasyon","Üretim danışmanlığı","Fason üretim","CNC işleme",
    "Lazer kesim","3D tarama","3D baskı","Prototipleme","Seri üretim","Ar-Ge","Ür-Ge",
    "TÜBİTAK proje","KOSGEB","Patent ve marka tescili"
  ],
  "sameAs": ["https://www.linkedin.com/company/takt-danismanlik/", "https://www.instagram.com/takt.eng"]
}
```

### 3.2 WebSite
```json
{ "@context":"https://schema.org","@type":"WebSite","@id":"https://takt.tr/#website",
  "url":"https://takt.tr","name":"Takt","inLanguage":"tr-TR",
  "publisher":{"@id":"https://takt.tr/#org"} }
```

### 3.3 BreadcrumbList (her iç sayfada)
```json
{ "@context":"https://schema.org","@type":"BreadcrumbList",
  "itemListElement":[
    {"@type":"ListItem","position":1,"name":"Ana Sayfa","item":"https://takt.tr/"},
    {"@type":"ListItem","position":2,"name":"Hizmetler","item":"https://takt.tr/hizmetler"}
  ] }
```

### 3.4 Service (7 hizmetin her biri için — hizmet sayfalarında)
Şablon (her hizmet için adı/açıklaması değişir):
```json
{ "@context":"https://schema.org","@type":"Service",
  "serviceType":"Proje Danışmanlığı",
  "name":"Proje Danışmanlığı",
  "description":"Projeleri baştan sona teknik yönetim; üretim, tesis ve süreç optimizasyonu.",
  "provider":{"@id":"https://takt.tr/#org"},
  "areaServed":"Ankara, Türkiye" }
```
Diğer 6: Teknik Ekip & Süreç Yönetimi · Tasarım & Geliştirme · Analiz, Hesaplama & Raporlama · Üretim Danışmanlığı · Ar-Ge & Ür-Ge Danışmanlığı · TÜBİTAK & KOSGEB & Türk Patent Proje Desteği.

### 3.5 FAQPage (SSS bölümünde — sorular Doküman 08'den)

---

## 4. Gerekli dosyalar

**`public/robots.txt`**
```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: PerplexityBot
Allow: /

Sitemap: https://takt.tr/sitemap.xml
```

**`app/sitemap.ts`** — tüm route'lar (ana + sayfalar + hizmet/kapasite alt sayfaları). `lastModified`, `changeFrequency`, `priority`.

**`app/opengraph-image.tsx`** — dinamik OG.

**`public/site.webmanifest`**
```json
{ "name":"Takt","short_name":"Takt","start_url":"/","display":"standalone",
  "background_color":"#F4F6F4","theme_color":"#12161C",
  "icons":[
    {"src":"/icon-192.png","sizes":"192x192","type":"image/png"},
    {"src":"/icon-512.png","sizes":"512x512","type":"image/png"}
  ] }
```

**Favicon seti:** `favicon.ico`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` (180×180) — kadans tick işaretiyle.

**`public/llms.txt` + `public/llms-full.txt`** — AI botları için site özeti.

---

## 5. Anahtar kelime / konu haritası (asıl "hacim" burada — içerikte, doğal)

Bunları **başlık, ilk paragraf, alt başlık, alt metin ve içerikte doğal** kullan; meta'ya doldurma. Sayfa → hedef terimler:

**Ana Sayfa / marka:** mühendislik danışmanlığı, makina mühendisliği danışmanlık, ankara mühendislik danışmanlık, teknik danışmanlık, sanayi mühendislik desteği, savunma sanayi tedarik mühendislik.

**Proje Danışmanlığı:** proje danışmanlığı, üretim optimizasyonu, proses optimizasyonu, süreç iyileştirme, tesis yönetimi, üretim verimliliği, operasyon danışmanlığı.

**Teknik Ekip & Süreç Yönetimi:** teknik ekip yönetimi, mühendislik süreç yönetimi, iş akışı kurulumu, ar-ge yönetimi, mühendis işe alım danışmanlığı.

**Tasarım & Geliştirme:** özel makina tasarımı, makine tasarımı, sistem tasarımı, ürün tasarımı, tersine mühendislik, tasarım optimizasyonu, imalat projesi, teknik resim.

**Analiz, Hesaplama & Raporlama:** mühendislik analizi, mukavemet hesabı, FEA analizi, simülasyon, mühendislik hesabı, teknik raporlama.

**Üretim Danışmanlığı:** üretim danışmanlığı, fason üretim, fason imalat, imalat koordinasyonu, üretici bulma, çözüm ortağı ağı.

**Kapasite / imalat:** cnc torna, cnc işleme, talaşlı imalat, lazer kesim, lazer markalama, 3d baskı, 3d tarama, hızlı prototip, prototipleme, kaynak işçiliği, metal kaynak, kaplama, boyama, yüzey işlem, seri üretime geçiş.

**Ar-Ge & Ür-Ge:** ar-ge danışmanlığı, ürün geliştirme, ür-ge, fikirden ürüne, ar-ge proje yönetimi.

**TÜBİTAK/KOSGEB/Patent:** tübitak proje hazırlama, tübitak danışmanlık, kosgeb destek, kosgeb raporlama, ar-ge proje desteği, üniversite sanayi iş birliği, patent başvurusu, marka tescili, türk patent.

**Yerel/niş kuyruk:** ankara makina imalatı danışmanlık, ankara cnc fason, savunma sanayi mühendislik danışmanlık, özel makina imalatı danışmanlık.

> Her sayfa 1 ana + birkaç yan terime odaklansın; aynı terimi her yere tıkıştırma. Doğal, okunur metin = hem Google hem AI için en iyisi.

Blog etiketleri (`lib/blog.ts` → `blogTags`) bu konu haritasından türetilir.

---

## 6. Uygulama kontrol listesi
- [x] Kök metadata + viewport + `lang="tr"`
- [x] Her route kendi title/description/canonical'ı
- [x] OG + Twitter her sayfada (dinamik OG görseli)
- [x] JSON-LD: ProfessionalService, WebSite, BreadcrumbList, FAQPage, Service ×7, HowTo
- [x] robots.txt (+ 4 AI botu), sitemap.xml, site.webmanifest
- [x] llms.txt + llms-full.txt canlı
- [x] Blog etiket altyapısı + `lib/seo-keywords.ts`
- [ ] Favicon PNG seti (192/512) — şimdilik `/icon` route
- [ ] Anahtar kelimeler içerikte doğal yerleştirme (sürekli)

---

## 7. Cursor promptu
> `07-seo-etiket-paketi.md` dosyasını uygula. Kök ve her route için `metadata` (title/description/canonical/OG/Twitter) ekle; `lang="tr"` ve viewport/theme-color ayarla. JSON-LD'leri göm: ProfessionalService, WebSite, her iç sayfada BreadcrumbList, SSS'te FAQPage, hizmet sayfalarında Service şeması. `robots.txt`, `sitemap.ts`, `site.webmanifest`, favicon seti ve `opengraph-image.tsx` oluştur. Anahtar kelime haritasındaki terimleri içeriğe doğal yerleştir; meta keywords kullanma, stuffing yapma. Bitince Bölüm 6 kontrol listesini doğrula.
