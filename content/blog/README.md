# takt.tr Blog — Dosya Sistemi ve Yayın Standardı

Bu klasör, siteye deploy edilecek tüm blog yazılarını barındırır. Her yazı **kendi klasöründe**; gövde, meta veri ve görseller bir arada, sistemli ve taşınabilir biçimde durur. Yapı; Hugo, Astro, Jekyll, Next.js (content collections) gibi statik site üreticileriyle doğrudan uyumlu olacak şekilde tasarlandı.

## Klasör yapısı

```
blog/
├── README.md                 ← bu dosya (standart tanımı)
├── _template/                ← yeni yazı için kopyalanacak boş şablon
│   ├── index.md
│   ├── NOTES.md
│   └── images/
│       └── README.md
│
├── 01-uretime-yonelik-tasarim-dfm/
│   ├── index.md              ← YAML front matter (meta) + gövde (tek kaynak)
│   ├── NOTES.md              ← dahili notlar (yayınlanmaz: ilke kontrolü, yapılacaklar)
│   └── images/               ← bu yazıya ait tüm görseller
│       ├── README.md         ← görsel listesi + alt text manifesti
│       ├── cover.jpg
│       └── ...
│
├── 02-montaja-yonelik-tasarim-dfa/
│   └── ...
└── ...
```

## Adlandırma kuralları

- **Klasör adı:** `NN-slug` biçiminde. `NN` iki haneli sıra numarası (01, 02…), `slug` yazının URL'siyle aynı. Türkçe karakter yok (ı→i, ş→s, ç→c, ğ→g, ü→u, ö→o). Tireyle ayrılır.
- **Slug = URL:** Klasör slug'ı, sitedeki `/blog/<slug>` adresiyle birebir aynı olmalı. Sıra numarası (`NN-`) sadece klasör sıralaması içindir; isteğe bağlı olarak deploy sırasında slug'tan düşürülebilir.
- **Görseller:** küçük harf, tireli, anahtar kelimeli dosya adı (`dfm-talasli-imalat-lazer-kesim.jpg`). Kapak görseli daima `cover.jpg` (veya `.webp`).

## index.md — tek doğruluk kaynağı

Her yazının meta verisi, gövdesinin başındaki **YAML front matter** bloğunda durur. Site üreticisi bu alanlardan `<title>`, meta description, Open Graph, JSON-LD (Article/TechArticle) ve etiket sayfalarını otomatik üretir. Ayrı bir `meta.json` tutulmaz — tekrar ve tutarsızlık riskini önlemek için meta tek yerde toplanır.

### Front matter alanları (standart)

```yaml
---
title: "..."                  # H1 / <title> (50-60 karakter)
description: "..."            # meta description (150-160 karakter)
slug: "uretime-yonelik-tasarim-dfm"
date: 2026-06-26             # ilk yayın
updated: 2026-06-26         # son güncelleme (tazelik sinyali)
status: draft                # draft | review | published
author: "Ömer Faruk"        # yazar
category: "DFM/DFA"         # tek kategori (taksonomi §10.1)
tags: ["dfm","dfa","aisi-304","lazer-kesim"]
keywords:                    # SEO — ana + yan anahtar kelimeler
  primary: "üretime yönelik tasarım (DFM)"
  secondary: ["DFM nedir","talaşlı imalattan lazer kesime geçiş"]
cover:
  src: "images/cover.jpg"
  alt: "..."                 # açıklayıcı, anahtar kelimeli alt text
canonical: "https://takt.tr/blog/uretime-yonelik-tasarim-dfm"
og:
  type: "article"
  image: "images/cover.jpg"
schema: "TechArticle"        # Article | TechArticle
reading_time: 4              # dakika (opsiyonel, üretici hesaplayabilir)
---
```

Gövde, front matter'dan sonra standart Markdown ile yazılır (H2/H3 hiyerarşisi, rehber §9.3).

## images/ klasörü

Her yazının görselleri kendi `images/` klasöründe. İçindeki `README.md` bir **alt text manifestidir**: her görselin dosya adı, ne gösterdiği ve alt text'i listelenir. Bu, görsel SEO'sunu (rehber §9.10) sistemli kılar ve deploy sırasında alt text'lerin kaynağıdır.

## status akışı

`draft` → `review` (Ömer okudu, yorumladı) → `published` (yayında). Deploy script'i yalnızca `status: published` olanları yayına alacak şekilde kurgulanabilir.

## Yeni yazı eklemek

1. `_template/` klasörünü kopyala, `NN-slug` olarak adlandır.
2. `index.md` front matter'ını doldur, gövdeyi yaz (rehber §12 iskeleti).
3. Görselleri `images/`'a koy, `images/README.md` alt text manifestini güncelle.
4. `NOTES.md`'de ilke kontrol listesini işaretle (rehber §11).
5. Hazır olunca `status: published` yap.
```
