---
title: "Metal Eklemeli İmalat: Her Parçayı Değil, Doğru Parçayı 3D Yazdırmak"
description: "Metal eklemeli imalat (3D baskı) ne zaman gerçekten mantıklı? DfAM gözüyle hangi parçaların basılması değerli, hangilerinin talaşlı/lazer kalması gerektiğini anlatıyoruz."
slug: "metal-eklemeli-imalat"
date: 2026-04-28
updated: 2026-07-25
status: published
kind: article
author: "Ömer Faruk"
category: "Mühendislik Trendleri"
tags: ["eklemeli-imalat", "metal-3d-baski", "dfam", "topoloji", "uretim-yontemi"]
keywords:
  primary: "metal eklemeli imalat (3D baskı)"
  secondary: ["eklemeli imalat nedir", "DfAM", "metal 3D baskı ne zaman", "üretim yöntemi seçimi"]
cover:
  src: "images/cover.jpg"
  alt: "Karmaşık geometrili, topoloji optimizasyonlu metal eklemeli imalat parçası"
canonical: "https://takt.tr/blog/metal-eklemeli-imalat"
og:
  type: "article"
  image: "images/cover.jpg"
schema: "TechArticle"
reading_time: 6
---

## Metal Eklemeli İmalat: Her Parçayı Değil, Doğru Parçayı 3D Yazdırmak

Metal eklemeli imalat (Additive Manufacturing — AM), [uluslararası terminoloji standardı ISO/ASTM 52900'ün tanımıyla](https://www.iso.org/standard/74514.html), üç boyutlu geometriyi malzemeyi ardışık olarak ekleyerek — tipik olarak katman katman — inşa eden üretim yöntemlerinin genel adıdır. Kilit karar şudur: AM her parçayı üretebilir; ama bu, her parçayı üretmesi gerektiği anlamına gelmez. Doğru mühendislik sorusu "basabilir miyiz?" değil, "basmak en doğrusu mu?"dur.

Metal 3D baskı uzun süredir "her şeyi üretebilen" bir teknoloji olarak anlatılıyor. Bu anlatı heyecan verici ama yanıltıcı; aşağıda kararı sayı ve geometri üzerinden netleştiriyoruz.

### Eklemeli İmalat Ne Zaman Mantıklı?

AM'in gerçek üstünlüğü, talaşlı imalatın pahalı veya imkânsız bulduğu yerdedir:

- **Karmaşık geometri:** İç kanallar, kafes (lattice) yapılar, organik formlar. Talaşlı imalatla üretilemeyen geometriler AM ile tek parçada çıkar.
- **Parça konsolidasyonu:** Birden çok parçanın işlevini tek baskıda toplamak; montajı ve tolerans yığılmasını ortadan kaldırmak.
- **Düşük adet / yüksek değer:** Kalıp maliyetini karşılamayan az sayıda, karmaşık ve değerli parça.
- **Hafifletme:** [Topoloji optimizasyonuyla](https://takt.tr/blog/generative-design-topoloji-optimizasyonu) sadece yük yollarında malzeme bırakan, hafif ama dayanıklı parçalar.

Bu durumlarda AM bir gösteriş değil, en ekonomik yöntemdir.

### Ne Zaman Yanlış Tercih?

Aynı teknoloji, yanlış parçada pahalı bir hataya döner:

| Durum | Neden AM değil? | Daha iyi seçenek |
| --- | --- | --- |
| Basit geometri, yüksek adet | Parça başı maliyet rekabet edemez | Lazer kesim, talaşlı imalat |
| Sıkı yüzey/tolerans gereksinimi | Baskı sonrası talaşlı bitirme gerekir; ek maliyet ve süre | Talaşlı imalat veya [hibrit yaklaşım](https://takt.tr/blog/hibrit-imalat-eklemeli-talasli) |
| Büyük, dolu hacimli parça | Baskı süresi ve toz maliyeti hızla artar | Döküm, kaynaklı imalat |
| Maliyet duyarlı seri üretim | Adet arttıkça klasik yöntem ucuzlar | Kalıplı/klasik yöntemler |

[DFM vaka çalışmamızdaki](https://takt.tr/blog/uretime-yonelik-tasarim-dfm) ilke burada da geçerlidir: bazen en akıllı çözüm karmaşık bir baskı değil, doğru profilden tek operasyonlu bir kesimdir. Yöntem parçaya hizmet etmeli; parça yönteme değil.

### DfAM: Basılacaksa, Baskıya Göre Tasarla

Bir parça AM ile üretilecekse, talaşlı imalat için çizilmiş hali genellikle uygun değildir. DfAM (Design for Additive Manufacturing), parçayı baskının gerçeklerine göre tasarlar: destek yapısı ihtiyacını azaltan yönlendirme, baskı yönüne uygun duvar kalınlıkları, kafes yapılarla hafifletme. AM'in değeri, parçayı sadece "basmakla" değil, baskı için yeniden düşünmekle ortaya çıkar.

Teknik sınırlamaları da açık konuşmak gerekir: metal AM parçalarında yüzey pürüzlülüğü ve boyutsal hassasiyet çoğu zaman işlevsel yüzeylerde talaşlı bitirme gerektirir; mekanik özellikler baskı yönüne bağlı (anizotropik) olabilir ve gözeneklilik ile iç gerilmeler süreç kontrolü ister. Kritik uygulamalarda test ve doğrulama bütçesi, baskı maliyetinin yanına baştan yazılmalıdır.

### Karar Nasıl Verilir?

Üç soru çoğu durumu çözer:

1. Geometri, klasik yöntemlerle üretilemeyecek ya da birleştirilemeyecek kadar karmaşık mı?
2. Adet, kalıp/hazırlık maliyetini karşılamayacak kadar düşük mü?
3. Hafifletme ya da konsolidasyon, ürünün ömür maliyetinde ölçülebilir kazanç sağlıyor mu?

Üçüne de "hayır" diyorsanız, klasik yöntem neredeyse her zaman daha ekonomiktir. En az birine "evet" diyorsanız, DfAM gözüyle bir değerlendirme yapılmaya değer.

---

**Bir parça için eklemeli imalat mı, talaşlı mı, lazer mi diye karar veremiyor musunuz?** takt.tr olarak parçalarınızı DFM ve DfAM gözüyle değerlendiriyor; yöntemi işlev, adet ve maliyete göre seçip en ekonomik üretim yolunu belirliyoruz. [İletişime geçin / Üretim yöntemi danışmanlığı talep edin.](https://takt.tr/iletisim)

## Kaynaklar

- [ISO/ASTM 52900:2021 — Additive manufacturing: General principles — Fundamentals and vocabulary](https://www.iso.org/standard/74514.html)
