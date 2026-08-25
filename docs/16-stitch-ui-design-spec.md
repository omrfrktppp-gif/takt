---
spec_id: takt-ui-motion-v1
version: 1.0.0
status: design-source
title: Takt UI, UX ve Scroll Motion Teknik Tasarım Spesifikasyonu
canonical_site: https://takt.tr
language: tr-TR
target_tools:
  - Google Stitch
  - Figma
  - AI coding agents
  - Next.js developers
implementation_stack:
  framework: Next.js App Router
  language: TypeScript
  styling: Tailwind CSS
  motion: Motion
  icons: lucide-react
  hosting: Vercel
last_updated: 2026-07-25
---

# Takt UI, UX ve Scroll Motion Teknik Tasarım Spesifikasyonu

Bu dosya Takt arayüzünün insanlar, tasarım araçları ve kod üreten yapay zekâ
ajanları tarafından aynı şekilde yorumlanması için hazırlanmış normatif tasarım
kaynağıdır.

Bu dokümandaki:

- **MUST / ZORUNLU**: uygulanması gereken değişmez kuralı,
- **SHOULD / ÖNERİLEN**: güçlü varsayılanı,
- **MAY / OPSİYONEL**: bağlama göre kullanılabilecek davranışı

ifade eder.

Bu dosya yeni müşteri, proje sonucu, sertifika, referans veya performans iddiası
üretme yetkisi vermez.

---

## 1. Ürün bağlamı

### 1.1 Site

- URL: `https://takt.tr`
- Marka: Takt
- Pazar: Türkiye, öncelikli bağlam Ankara ve sanayi kuruluşları
- Dil: Türkçe
- Site türü: B2B mühendislik danışmanlığı ve teknik içerik sitesi

### 1.2 Takt ne yapar?

Takt; makina imalatı, teknik tasarım, ürün geliştirme, mühendislik analizi,
proje yönetimi, üretim koordinasyonu ve Ar-Ge/Ür-Ge çalışmalarında dış
mühendislik desteği sunar.

### 1.3 Birincil kullanıcılar

1. Teknik ekibi yetişmeyen makina imalatçısı.
2. Tasarımdan üretime geçişi yönetemeyen sanayi firması.
3. Hesap, analiz veya mühendislik doğrulaması gereken ekip.
4. Prototipten tekrarlanabilir üretime geçmek isteyen kuruluş.
5. Fason üretici ve teknik tedarikçi koordinasyonu gereken karar verici.
6. Projesinin kapsamı, takvimi veya teknik sorumlulukları bulanıklaşan ekip.

### 1.4 Birincil dönüşümler

Öncelik sırası:

1. `/ihtiyac-analizi` akışının tamamlanması.
2. Görüşme talebi.
3. İletişim formu.
4. E-posta veya telefon bağlantısı.
5. Kullanıcının problemiyle eşleşen hizmete geçiş.

Bir viewport içinde birden fazla baskın CTA kullanılmamalıdır.

---

## 2. Tasarım tezi

### 2.1 Ana ifade

> Paper-first teknik editoryal arayüz + CAD/ölçülendirme dili + tek mavi sinyal.

### 2.2 Algısal hedef

Kullanıcı şu dönüşümü hem içerikte hem arayüz hareketinde hissetmelidir:

```text
belirsiz teknik girdi
  -> görünür kısıtlar
  -> ayrıştırılmış sistem
  -> hizalanmış kararlar
  -> devredilebilir teknik çıktı
```

### 2.3 Görsel referansların görevleri

| Referans | Alınacak özellik | Alınmayacak özellik |
|---|---|---|
| Bklit UI | Grid, koordinat, teknik etiket | Tam siyah arayüz, dekoratif yoğunluk |
| Apple | Bölüm temposu, tek odak | Video ağırlığı, aşırı uzun ürün sayfası |
| Bambu Lab | Aşamalı sistem anlatımı | Ağır medya ve ürün reklam dili |
| Path Robotics | Endüstriyel güven | Doğrulanmamış sonuç istatistikleri |
| coss/Origin UI | Form ve erişilebilir mikro durumlar | Genel component-gallery görünümü |
| Kokonut UI | Kontrollü katman ve hover | Neon, pill ve startup estetiği |

### 2.4 Yasak görsel kalıplar

- Glassmorphism.
- Neon vurgu.
- Mor/pembe teknoloji gradientleri.
- Büyük pill buton ve etiketler.
- Rastgele 3D küreler.
- Yapay fabrika veya mühendis fotoğrafı.
- Sahte müşteri logosu.
- Video arka plan.
- WebGL/canvas deneyimi.
- Kartların rastgele eğilmesi veya sallanması.
- Her bölümde farklı animasyon dili.
- İçeriği gizleyen uzun intro animasyonu.
- “Kaydırın”, “scroll down” veya benzeri kullanım talimatı.

---

## 3. Değişmez teknik kurallar

```yaml
rendering:
  default: server-rendered
  client_islands: only-where-interaction-is-required
  seo_text_must_exist_without_js: true

scroll:
  vertical_owner: document
  nested_vertical_scroll: forbidden
  scroll_snap: forbidden
  scroll_hijacking: forbidden
  horizontal_page_overflow: forbidden

media:
  video: forbidden
  webgl: forbidden
  canvas: forbidden
  lottie: forbidden
  inline_svg: preferred

motion:
  library: Motion
  second_motion_runtime: forbidden
  reduced_motion: required
  mobile_sticky_story: forbidden

content:
  invented_clients: forbidden
  invented_metrics: forbidden
  invented_certificates: forbidden
  invented_testimonials: forbidden
```

### 3.1 Scroll konteyneri

`document/body` dikey kaydırmanın tek sahibi olmalıdır.

Aşağıdaki yapı yasaktır:

```css
.page-wrapper {
  overflow-y: auto;
}
```

Yatay taşmayı engellemek için şu yaklaşım kullanılabilir:

```css
.page-wrapper {
  overflow-x: clip;
}
```

Sticky bileşenin hiçbir atasında `overflow-y: auto | scroll | hidden`
bulunmamalıdır. `overflow: clip` yalnız davranış tarayıcı testleriyle
doğrulandığında kullanılmalıdır.

---

## 4. Tasarım tokenları

### 4.1 Renkler

```json
{
  "color": {
    "ink": "#12161C",
    "steel": "#4A5563",
    "line": "#D7DCE2",
    "paper": "#F4F6F4",
    "white": "#FFFFFF",
    "signal": "#1F4FE0",
    "signalTint": "rgba(31, 79, 224, 0.08)"
  }
}
```

`signal` tek vurgu rengidir. Sadece CTA, focus, active state, teknik karar
noktası ve önemli bağlantıda kullanılmalıdır.

### 4.2 Tipografi

```json
{
  "font": {
    "display": "Space Grotesk",
    "body": "Inter",
    "mono": "JetBrains Mono"
  },
  "typeScale": {
    "display": "clamp(2.75rem, 6vw, 5.75rem)",
    "h1": "clamp(2.25rem, 4.5vw, 4.5rem)",
    "h2": "clamp(1.875rem, 3vw, 3.25rem)",
    "h3": "clamp(1.25rem, 1.8vw, 1.75rem)",
    "bodyLarge": "clamp(1.0625rem, 1.4vw, 1.25rem)",
    "body": "1rem",
    "small": "0.875rem",
    "eyebrow": "0.6875rem"
  }
}
```

Kurallar:

- H1 tek sayfada bir kez kullanılmalıdır.
- Gövde metni ideal olarak `65–75ch` aralığını geçmemelidir.
- Teknik etiketler mono, uppercase ve `0.08em–0.12em` tracking kullanmalıdır.
- Uzun Türkçe başlıklar `text-wrap: balance` ile dengelenebilir.

### 4.3 Geometri ve boşluk

```json
{
  "radius": {
    "default": "4px",
    "small": "2px",
    "pill": "forbidden"
  },
  "border": {
    "default": "1px solid #D7DCE2",
    "technicalDark": "1px solid rgba(215, 220, 226, 0.25)"
  },
  "layout": {
    "maxContentWidth": "1200px",
    "mobileGutter": "16px",
    "tabletGutter": "24px",
    "desktopGutter": "32px"
  },
  "spacingBase": "4px"
}
```

### 4.4 Motion tokenları

```json
{
  "motion": {
    "micro": "160ms",
    "content": "280ms",
    "major": "560ms",
    "ambient": "7000ms",
    "easeStandard": "cubic-bezier(0.22, 0.61, 0.36, 1)",
    "scrollLinkedEase": "linear",
    "pointerParallaxMax": "6px"
  }
}
```

---

## 5. Responsive sistemi

### 5.1 Ana hedef ekranlar

| Kimlik | Boyut | Zorunluluk |
|---|---:|---|
| desktop | 1440×900 | Zorunlu |
| tablet | 1024×768 | Davranış tanımı zorunlu |
| mobile | 390×844 | Zorunlu |
| mobile-small | 360×800 | Taşma kontrolü zorunlu |
| desktop-wide | 1600×900 | Max-width kontrolü |

### 5.2 Önerilen breakpointler

```json
{
  "breakpoints": {
    "sm": "640px",
    "md": "768px",
    "lg": "1024px",
    "xl": "1280px"
  }
}
```

### 5.3 Navigasyon ölçüleri

```yaml
nav:
  mobile_height: 56px
  desktop_height: 64px
  position: sticky
  top: 0
  minimum_touch_target: 44px
```

---

## 6. Sayfa şablonları

### 6.1 Route matrisi

| Route | Şablon | Özel ihtiyaç |
|---|---|---|
| `/` | Home | Hero CAD + ana scroll sahnesi |
| `/hizmetler` | Listing | Numaralı teknik hizmet listesi |
| `/hizmetler/[slug]` | Detail | Problem, kapsam, süreç, çıktı |
| `/kapasitemiz` | Listing | Üretim/teknik kapasite matrisi |
| `/kapasitemiz/[slug]` | Detail | Girdi, yöntem, çıktı, sınırlar |
| `/referanslar` | Evidence listing | Vaka kanıt kartları |
| `/sektorler` | Listing | Sektör-problem eşlemesi |
| `/sektorler/[slug]` | Detail | Problem-hizmet-çıktı matrisi |
| `/yaklasim` | Process | Tespit-plan-uygulama-teslim |
| `/hakkimizda` | Corporate | Gerçek kişi/görsel varlıkları |
| `/blog` | Editorial listing | Tarih, tür, konu, okuma süresi |
| `/blog/[slug]` | Article | TOC, tablolar, kaynaklar |
| `/rehber` | Editorial listing | Teknik rehber kümeleri |
| `/rehber/[slug]` | Pillar article | Bölümlenmiş uzun içerik |
| `/ihtiyac-analizi` | Wizard | Canlı teknik föy |
| `/iletisim` | Contact | Form + hazırlık girdileri |
| `/gorusme-planla` | Booking | Net beklenti ve randevu |
| `/sss` | FAQ | Erişilebilir accordion |

### 6.2 Ortak kompakt sayfa başlığı

```yaml
page_header:
  content:
    - breadcrumbs
    - eyebrow
    - h1
    - optional_description
    - cadence_signature
  desktop_target_height: 240-340px
  mobile_target_height: auto
  rule: main-content-visible-in-first-viewport
  cadence_per_page: 1
```

Başlık alanı navigasyon yüksekliğini ikinci kez boşluk olarak eklememelidir.

---

## 7. Ana sayfa mimarisi

```yaml
home_sections:
  - id: hero
    goal: value-proposition
  - id: problem-paths
    goal: self-identification
  - id: engineering-story
    goal: explain-method-with-motion
  - id: services
    goal: map-problem-to-service
  - id: deliverables
    goal: make-output-tangible
  - id: technical-cases
    goal: evidence
  - id: final-cta
    goal: conversion
```

### 7.1 Hero

Masaüstü:

```text
┌───────────────────────────┬───────────────────────────┐
│ CADENCE                   │                           │
│ EYEBROW                   │ TECHNICAL CAD FIELD       │
│ H1                        │ grid / axis / dimensions  │
│ DESCRIPTION               │ input -> delivery trace   │
│ PRIMARY CTA + TEXT LINK   │                           │
│ TRUST NOTE                │ REV. 01                   │
└───────────────────────────┴───────────────────────────┘
```

Mobil:

```text
EYEBROW
H1
DESCRIPTION
PRIMARY CTA
TEXT LINK
CAD FIELD
```

Hero CAD animasyonu:

```yaml
hero_cad_motion:
  duration: 6-8s
  loop: true
  affected_properties:
    - stroke-dashoffset
    - opacity
    - transform-scale-on-signal-nodes
  reduced_motion: completed-static-frame
  must_not_move:
    - h1
    - paragraph
    - cta
```

### 7.2 Problem kartı sözleşmesi

```ts
type ProblemPath = {
  id: string;
  category: string;
  title: string;
  href: string;
};
```

Durumlar:

| Durum | Görsel davranış |
|---|---|
| Default | Paper/white, ince line border |
| Hover | Signal-tint yüzey, altta ölçü çizgisi |
| Focus | 2 px signal outline + çizgi |
| Active | Kullanılmaz; kart navigasyon bağlantısıdır |
| Touch | Hover hareketi yok |

### 7.3 Hizmet satırı

```text
[01] [HİZMET BAŞLIĞI]              [KISA AÇIKLAMA] [→]
```

İkon zorunlu değildir. Numara, başlık ve teknik çizgi yeterlidir.

### 7.4 Teslim çıktısı kartı

```ts
type DeliverableCard = {
  code: string;
  title: string;
  description: string;
  optionalAssetId?: string;
};
```

Önerilen çıktı türleri:

- 3B model.
- Teknik resim.
- Analiz notu.
- İmalat paketi.
- BOM/parça listesi.
- Revizyon kaydı.

---

## 8. Ana scroll sahnesi

### 8.1 Durum tipi

```ts
export type EngineeringSceneStep = 0 | 1 | 2 | 3;
export type MotionPreference = "full" | "reduced";
```

### 8.2 Scroll sözleşmesi

```yaml
engineering_scene:
  desktop_min_width: 1024px
  section_height: 220vh
  sticky_top: var(--nav-h)
  sticky_height: calc(100dvh - var(--nav-h))
  scroll_owner: document
  motion_offset:
    - start start
    - end end
  reverse_scroll: required
  blank_scroll_zone: forbidden
  instruction_label: forbidden
```

Sticky iç panel `box-sizing: border-box` kullanmalı; padding, paneli viewport
yüksekliğinden daha büyük hale getirmemelidir.

### 8.3 State eşikleri

```json
{
  "sceneSteps": [
    { "step": 0, "range": [0.0, 0.24], "id": "constraints" },
    { "step": 1, "range": [0.24, 0.49], "id": "explode" },
    { "step": 2, "range": [0.49, 0.74], "id": "align" },
    { "step": 3, "range": [0.74, 1.0], "id": "deliver" }
  ]
}
```

### 8.4 Sahne içerikleri

#### Step 0 — constraints

- Blueprint tam görünür.
- Ana eksen görünür.
- Ölçü çizgileri görünür.
- Darboğaz callout Signal rengindedir.
- Parça dolgu yüzeyleri görünmez.

#### Step 1 — explode

- Blueprint opacity azalır.
- Base aşağıdan gelir.
- Sol ve sağ post ters yatay yönlerden gelir.
- Head üstten gelir.
- Motor sağdan gelir.
- Tool üstten gelir.
- Hareketler teknik ve lineerdir.

#### Step 2 — align

- Parçalar ana eksende birleşir.
- Alignment guide ve datum noktaları görünür.
- Exploded kopya azalırken assembled kopya görünür.
- Overshoot ve spring bounce kullanılmaz.

#### Step 3 — deliver

- Tamamlanmış jenerik makina görünür.
- Sağda dört doküman belirir.
- Dokümanlar 3B model, teknik resim, analiz notu ve imalat paketidir.
- Son Signal noktası aktif hale gelir.

### 8.5 Önerilen Motion eşlemeleri

| Motion value | Input | Output |
|---|---|---|
| blueprint opacity | `0, .14, .24` | `1, 1, 0` |
| exploded opacity | `.12, .22, .54, .64` | `0, 1, 1, 0` |
| assembled opacity | `.50, .68` | `0, 1` |
| outputs opacity | `.69, .84` | `0, 1` |
| output X | `.69, .85` | `34px, 0` |
| base Y | `.22, .56` | `52px, 0` |
| left post X | `.22, .56` | `-56px, 0` |
| right post X | `.22, .56` | `56px, 0` |
| head Y | `.26, .60` | `-58px, 0` |
| motor X | `.28, .62` | `76px, 0` |
| tool Y | `.30, .64` | `-82px, 0` |

### 8.6 SVG katman sözleşmesi

Ana SVG önerilen ölçüsü: `viewBox="0 0 760 520"`.

Zorunlu grup kimlikleri:

```text
background_grid
main_axis
measurement_lines
constraint_callout
blueprint_outline
exploded_base
exploded_left_post
exploded_right_post
exploded_head
exploded_motor
exploded_tool
alignment_guides
assembled_machine
output_3d_model
output_technical_drawing
output_analysis_note
output_manufacturing_package
signal_nodes
```

SVG kuralları:

- Her hareketli parça ayrı `<g id="">` olmalıdır.
- Aynı parça farklı frame’lerde aynı koordinat sistemi ve aynı ID’yi korumalıdır.
- Stroke’lar mümkün olduğunca `currentColor` veya CSS variable kullanmalıdır.
- Raster görsel gömülmemelidir.
- Metinler path’e çevrilmeden önce ayrı grup olarak teslim edilmelidir.
- Karmaşık mask/clip-path yalnız zorunluysa kullanılmalıdır.
- SVG içindeki anlamlı görsel için `<title>` ve `<desc>` bulunmalıdır.
- Dekoratif SVG `aria-hidden="true"` olmalıdır.

### 8.7 Pointer davranışı

```yaml
pointer_parallax:
  condition: hover:hover AND pointer:fine AND min-width:1024px
  maximum_x: 6px
  maximum_y: 6px
  spring:
    stiffness: 120
    damping: 24
  text_motion: forbidden
  cta_motion: forbidden
```

### 8.8 Mobil sahne

Mobilde sticky kullanılmaz.

```yaml
mobile_engineering_story:
  layout: sequential-cards
  card_count: 4
  motion: optional-short-in-view-reveal
  autoplay_loop: false
  horizontal_scroll: false
  final_state_visible_without_js: true
```

Her kart:

1. Küçük statik SVG.
2. Adım numarası.
3. Başlık.
4. En fazla iki cümle açıklama.

### 8.9 Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  /* sticky kaldır */
  /* section height auto */
  /* assembled machine görünür */
  /* output documents görünür */
  /* parallax ve stroke loop kapalı */
}
```

Reduced-motion kullanıcısı eksik veya boş sahne görmemelidir.

---

## 9. Vaka ve referans veri sözleşmesi

```ts
export type CaseStudyEvidence = {
  kind: "image" | "drawing" | "calculation" | "document" | "source";
  label: string;
  assetId?: string;
  sourceUrl?: string;
};

export type CaseStudyRecord = {
  id: string;
  title: string;
  sector: string;
  problem: string;
  scope: string;
  constraints: string[];
  deliverables: string[];
  evidence: CaseStudyEvidence[];
  relatedBlogSlug?: string;
};
```

### 9.1 Kanıt kuralları

- `evidence` boşsa sonuç iddiası gösterilmemelidir.
- Doğrulanmamış sayı metrik kartına dönüştürülmemelidir.
- Müşteri adı izinli değilse sektör + teknik problem kullanılmalıdır.
- Logo bulunmaması tasarım hatası sayılmamalıdır.
- Vaka kartı `problem -> müdahale -> çıktı` akışını göstermelidir.

### 9.2 Vaka kartı

```text
┌─────────────────────────────────┐
│ [problem] ─ [scope] ─ [output]  │
│                                 │
│ SEKTÖR / TEKNİK VAKA            │
│ Vaka başlığı                    │
│ Kısa problem ve kapsam          │
│                                 │
│ Teknik vakayı okuyun →          │
└─────────────────────────────────┘
```

---

## 10. Blog ve rehber sistemi

### 10.1 Liste kartı veri modeli

```ts
type EditorialCard = {
  type: "technical-case" | "article" | "guide";
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  updatedAt?: string;
  readingTimeMinutes?: number;
  href: string;
};
```

### 10.2 Blog liste hiyerarşisi

1. Yayın türü.
2. Başlık.
3. Açıklama.
4. Kategori, tarih ve okuma süresi.
5. İlgili hizmet.

### 10.3 Blog detay

```yaml
article:
  reading_width: 680-720px
  desktop_toc: sticky
  mobile_toc: inline-or-collapsible
  supports:
    - h2
    - h3
    - tables
    - formulas
    - code
    - blockquotes
    - source_links
  final_cta_count: 1
```

---

## 11. İhtiyaç analizi UX sözleşmesi

### 11.1 Layout

Masaüstü:

```text
┌──────────────────────────────────────┐
│ compact page title                   │
├───────────────────────┬──────────────┤
│ question / options    │ live brief   │
│ validation            │ summary      │
│ back / continue       │ blueprint    │
└───────────────────────┴──────────────┘
```

Mobil:

```text
compact title
progress
question
options
validation
live summary
back / continue
```

### 11.2 Form durumları

```ts
type WizardVisualState =
  | "initial"
  | "selected"
  | "validating"
  | "invalid"
  | "submitting"
  | "success"
  | "server-error";
```

### 11.3 Teknik föy

Teknik föy yalnız kullanıcının verdiği cevaplardan oluşur.

Önerilen alanlar:

- Ana ihtiyaç.
- Proje aşaması.
- Teknik girdiler.
- Beklenen çıktı.
- Zamanlama.
- İletişim tercihi.

Boş alanlar tahmin edilmemelidir.

### 11.4 Erişilebilirlik

- Her input gerçek label almalıdır.
- Hata metni `aria-describedby` ile input’a bağlanmalıdır.
- Hatalı input `aria-invalid="true"` almalıdır.
- Gönderim ve sonuç durumu `aria-live` ile bildirilmelidir.
- Dokunma hedefi en az 44×44 px olmalıdır.
- Selected state yalnız renkle anlatılmamalıdır.
- Klavye focus sırası görsel sırayla aynı olmalıdır.

---

## 12. Cookie, mobil CTA ve katmanlar

### 12.1 Z-index sözleşmesi

```json
{
  "zIndex": {
    "content": 0,
    "stickySection": 10,
    "nav": 50,
    "mobileMenu": 60,
    "mobileCta": 70,
    "cookieConsent": 80,
    "dialog": 100
  }
}
```

### 12.2 Cookie paneli

```yaml
cookie_consent:
  position: fixed-bottom
  modal: false
  pushes_document_content: false
  mobile_position: above-mobile-cta-and-safe-area
  actions:
    - accept
    - necessary-only
  minimum_target: 44px
```

Cookie paneli WhatsApp ve mobil CTA ile üst üste gelmemelidir.

---

## 13. Dışarıdan sağlanacak asset sözleşmesi

Gerçek asset sağlanmadığında AI sahte alternatif üretmemelidir.

### 13.1 Asset veri modeli

```ts
type ExternalAssetRequirement = {
  id: string;
  suggestedFileName: string;
  format: "svg" | "webp" | "png";
  aspectRatio: string;
  minimumSize?: string;
  purpose: string;
  altTextRequired: boolean;
  mobileCrop?: string;
  fallback: "technical-placeholder" | "omit-section" | "vector-diagram";
};
```

### 13.2 Başlangıç asset manifesti

| ID | Dosya | Format | Oran | Kullanım | Fallback |
|---|---|---|---|---|---|
| brand-logo | `brand-logo-horizontal.svg` | SVG | intrinsic | Nav/footer | Metin logo |
| brand-mark | `brand-mark.svg` | SVG | 1:1 | Favicon/işaret | Metin logo |
| case-dfm-cover | `case-dfm-cover.webp` | WebP | 16:10 | Vaka/blog | Teknik SVG |
| case-dfm-diagram | `case-dfm-diagram.svg` | SVG | 16:9 | Vaka kanıtı | Sadece metin |
| case-dfa-cover | `case-dfa-cover.webp` | WebP | 16:10 | Vaka/blog | Teknik SVG |
| case-thermal-cover | `case-thermal-expansion-cover.webp` | WebP | 16:10 | Vaka/blog | Teknik SVG |
| case-thermal-diagram | `case-thermal-expansion-diagram.svg` | SVG | 16:9 | Hesap diyagramı | Sadece metin |
| founder-portrait | `founder-portrait.webp` | WebP | 4:5 | Hakkımızda | Görsel alanını kaldır |
| team-workshop | `team-workshop.webp` | WebP | 16:10 | Hakkımızda | Görsel alanını kaldır |

---

## 14. Google Stitch teslim sözleşmesi

Stitch çıktısı tek ana sayfa görseliyle sınırlı olmamalıdır.

### 14.1 Zorunlu çıktı grupları

```text
01-DESIGN-SYSTEM
02-COMPONENTS
03-PAGES-DESKTOP-1440
04-PAGES-MOBILE-390
05-MOTION-STORYBOARD
06-SVG-EXPORT
07-HANDOFF.md
08-DESIGN-TOKENS.json
09-ASSET-MANIFEST.md
```

### 14.2 Zorunlu desktop ekranları

1. Ana sayfa.
2. Hizmetler.
3. Hizmet detay.
4. Kapasite.
5. Referanslar.
6. Blog listesi.
7. Blog detay.
8. İhtiyaç analizi ilk adım.
9. İhtiyaç analizi orta adım.
10. İhtiyaç analizi sonuç/özet.
11. İletişim.
12. Hakkımızda.
13. Sektör detay.

### 14.3 Zorunlu mobile ekranları

1. Ana sayfa hero.
2. Mobil menü.
3. Dört teknik sahne kartı.
4. Vaka kartı.
5. İhtiyaç analizi.
6. Cookie + mobile CTA birlikte.
7. Blog detay.
8. Footer.

### 14.4 Motion storyboard dosyaları

```text
home-motion-00-blueprint.svg
home-motion-01-constraints.svg
home-motion-02-exploded.svg
home-motion-03-alignment.svg
home-motion-04-delivery.svg
home-motion-master.svg
```

Tüm frame’ler aynı `viewBox` ve aynı grup ID’lerini kullanmalıdır.

---

## 15. Bileşen envanteri

| Bileşen | Varyantlar | Zorunlu durumlar |
|---|---|---|
| Button | signal, dark, light, text | default, hover, focus, disabled, loading |
| Header | desktop, mobile | default, scrolled, menu-open |
| ProblemPath | link | default, hover, focus |
| ServiceRow | link | default, hover, focus |
| DeliverableCard | static/link | default, hover |
| CaseCard | link | default, hover, missing-asset |
| EditorialCard | case/article/guide | default, hover |
| PageHeader | compact | desktop, mobile |
| Breadcrumb | default | wrapped-mobile |
| FormOption | single/multiple | default, selected, focus, error, disabled |
| FormProgress | determinate | initial, progress, complete |
| BriefSummary | live | empty, partial, complete |
| Accordion | FAQ | closed, open, focus |
| CookieConsent | bottom panel | desktop, mobile |
| Footer | grouped | desktop, mobile |

---

## 16. Erişilebilirlik kabul kriterleri

```yaml
accessibility:
  wcag_target: AA
  minimum_touch_target: 44x44
  focus_visible: required
  color_only_state: forbidden
  reduced_motion: required
  keyboard_navigation: required
  semantic_headings: required
  decorative_svg_hidden: required
  informative_svg_named: required
```

Kontroller:

- Sayfada tek H1.
- Heading seviyeleri atlamıyor.
- Focus görünür.
- Link ve buton işlevleri ayrışıyor.
- Form label’ları görünür veya erişilebilir.
- Hata mesajları alanla ilişkili.
- Accordion klavyeyle açılıp kapanıyor.
- Reduced-motion’da bilgi kaybı yok.
- Signal/white ve ink/paper kontrastları AA seviyesinde.

---

## 17. Performans bütçesi

```yaml
performance_budget:
  lighthouse_performance: ">= 90"
  lighthouse_accessibility: ">= 95"
  lighthouse_seo: ">= 95"
  cls: 0
  animation_incremental_js_gzip: "<= 35KB target"
  video_bytes: 0
  webgl: false
  canvas: false
  below_fold_motion_lazy_loaded: true
  static_motion_poster: required
```

Animasyon yalnız transform, opacity ve SVG stroke değerlerini değiştirmelidir.
Scroll sırasında layout ölçümü tekrar tekrar yapılmamalıdır.

---

## 18. Uygulama sırası

AI ajanı için önerilen karar sırası:

```text
1. Gerçek vaka ve asset durumunu denetle.
2. Sahte iddia içeren içeriği reddet veya placeholder olarak işaretle.
3. Document scroll mimarisini doğrula.
4. Tasarım tokenlarını uygula.
5. Ortak nav/page-header/footer sistemini kur.
6. Ana sayfa statik bilgi mimarisini kur.
7. Hero CAD alanını ekle.
8. Static engineering poster ekle.
9. Desktop scroll-linked scene ekle.
10. Mobile sequential scene ekle.
11. Reduced-motion final state ekle.
12. Hizmet, çıktı ve vaka bileşenlerini uygula.
13. Form ve canlı brief UX’ini uygula.
14. Blog ve iç sayfa şablonlarını uygula.
15. Erişilebilirlik testleri.
16. Scroll/sticky görsel testleri.
17. Performance/build testleri.
18. Preview deploy ve canlı smoke test.
```

---

## 19. Otomatik test sözleşmesi

### 19.1 Scroll sahnesi

Test edilebilir DOM önerisi:

```html
<section
  data-engineering-scene
  data-scene-step="0"
  aria-labelledby="engineering-scene-title"
>
</section>
```

Playwright senaryosu:

1. Desktop viewport `1440×900`.
2. Sahne başlangıcına git.
3. `data-scene-step` başlangıçta `0`.
4. %30 noktada `1`.
5. %55 noktada `2`.
6. %85 noktada `3`.
7. Ters kaydırmada değerler geri gider.
8. Sticky panelin `top` değeri nav yüksekliğine yakındır.
9. Sahne yatay taşma üretmez.
10. DOM’da kullanıcıya scroll talimatı bulunmaz.

### 19.2 Mobil

1. Viewport `390×844`.
2. Sticky scene yok.
3. Dört mobil sahne görünür.
4. `document.scrollWidth <= document.clientWidth`.
5. Bütün dokunma hedefleri en az 44 px.

### 19.3 Reduced motion

1. `prefers-reduced-motion: reduce`.
2. Sticky kaldırılmıştır.
3. Tamamlanmış makina görünür.
4. Teslim dokümanları görünür.
5. Loop ve parallax yoktur.

### 19.4 Genel

- Console error: `0`.
- Hydration error: `0`.
- Kırık iç link: `0`.
- Axe serious/critical violation: `0`.
- Bütün ana route’lar HTTP 200.

---

## 20. Tasarım tamamlama kontrol listesi

```yaml
definition_of_done:
  product:
    - value-proposition-understandable-in-5-seconds
    - problem-self-selection-visible
    - one-dominant-cta-per-viewport
    - verified-evidence-only
  visual:
    - paper-first
    - single-signal-color
    - technical-grid-language
    - no-generic-saas-aesthetic
  motion:
    - immediate-scroll-response
    - no-scroll-instruction
    - reverse-scroll-supported
    - mobile-sequential-fallback
    - reduced-motion-complete
  ux:
    - content-visible-in-first-viewport
    - no-large-dead-zones
    - compact-cookie-panel
    - compact-footer
    - accessible-form-states
  technical:
    - document-only-vertical-scroll
    - no-horizontal-overflow
    - no-video-webgl-canvas
    - server-rendered-essential-content
    - svg-layer-contract-preserved
  handoff:
    - desktop-screens
    - mobile-screens
    - motion-storyboard
    - svg-master
    - design-tokens-json
    - asset-manifest
    - handoff-notes
```

---

## 21. Son tasarım ilkesi

Takt arayüzü “hareketli olduğu için modern” görünmemelidir. Hareket,
mühendislik sürecindeki neden-sonuç ilişkisini görünür hale getirmelidir.

Her tasarım kararı şu sorulardan en az birine cevap vermelidir:

1. Kullanıcı problemini daha hızlı tanıyor mu?
2. Teknik sürecin nasıl ilerlediğini daha iyi anlıyor mu?
3. Teslim edilecek çıktıyı daha somut görüyor mu?
4. Takt’a güvenmek için doğrulanabilir kanıt buluyor mu?
5. Sonraki doğru adıma daha az tereddütle geçiyor mu?

Bu soruların hiçbirine cevap vermeyen dekorasyon veya animasyon kaldırılmalıdır.
