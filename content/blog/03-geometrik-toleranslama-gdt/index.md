---
title: "Geometrik Toleranslama (GD&T): Ölçüyü Değil İşlevi Toleranslamak"
description: "GD&T ve tolerans yığılması: her ölçüye dar tolerans vermek neden yanlış? İşlevsel toleranslama ile montajı kilitlemeden maliyeti nasıl düşürürsünüz?"
slug: "geometrik-toleranslama-gdt"
date: 2026-04-01
updated: 2026-07-25
status: published
kind: article
author: "Ömer Faruk"
category: "DFM/DFA"
tags: ["gdt", "tolerans-yigilmasi", "toleranslama", "dfm", "montaj-optimizasyonu"]
keywords:
  primary: "geometrik toleranslama (GD&T)"
  secondary: ["tolerans yığılması", "GD&T nedir", "fonksiyonel tolerans", "datum referans"]
cover:
  src: "images/cover.jpg"
  alt: "Bir montaj zincirinde tolerans yığılmasını gösteren GD&T şeması"
canonical: "https://takt.tr/blog/geometrik-toleranslama-gdt"
og:
  type: "article"
  image: "images/cover.jpg"
schema: "TechArticle"
reading_time: 6
---

## Geometrik Toleranslama (GD&T): Ölçüyü Değil İşlevi Toleranslamak

Geometrik boyutlandırma ve toleranslama (GD&T), toleransı tek tek ölçülere değil, parçanın işlevine bağlayan tanımlama dilidir: referanslar (datum) üzerinden konum, diklik, paralellik ve profil gibi geometrik ilişkiler tanımlanır; kritik ölçüler sıkı, işlevi etkilemeyen ölçüler bilinçli olarak gevşek bırakılır. Bu dil iki temel standartla tarif edilir: Amerikan tarafında [ASME Y14.5](https://www.asme.org/codes-standards/find-codes-standards/y14-5-dimensioning-tolerancing), uluslararası GPS sisteminde ise [ISO 1101](https://www.iso.org/standard/66777.html).

Neden gerekli? Çünkü atölyede en çok kafa karıştıran durumlardan biri şudur: parçalar tek tek ölçüldüğünde her ölçü sınırların içindedir; ama parçalar birleştiğinde montaj oturmaz. Sorun çoğu zaman üretimde değil, toleransların nasıl tanımlandığındadır. Her ölçüye dar tolerans yazmak parçayı doğru yapmaz; sadece pahalı yapar.

### GD&T Klasik ± Toleranslamadan Nasıl Ayrılır?

Klasik ± toleranslamada her ölçü bağımsız bir kutudur; parçanın kâğıt üzerinde doğru görünmesini sağlar. GD&T ise özelliğin işlevini yerine getirmek için nasıl konumlanması gerektiğini tanımlar; parçanın sahada doğru çalışmasını sağlar.

| Özellik | Klasik ± tolerans | GD&T |
| --- | --- | --- |
| Referans | Ölçünün kendisi | Tanımlı datum sistemi |
| Kontrol edilen | Uzunluk/çap değerleri | Konum, yön, form, profil ilişkileri |
| İşlev bağlantısı | Dolaylı | Doğrudan (işlevsel yüzeyden türetilir) |
| Ölçüm belirsizliği | Referans keyfî olabilir | Ölçüm, tanımlı referanstan yapılır |

### Tolerans Yığılması Montajı Nasıl Kilitler?

Bir montaj zinciri düşünün: birbirine eklenen dört parça, her biri ±0,2 mm toleransla üretiliyor. En kötü durumda toplam sapma basitçe toplanır:

`T_toplam = 0,2 + 0,2 + 0,2 + 0,2 = 0,8 mm`

İstatistiksel (RSS — kareler toplamının karekökü) yaklaşımla, sapmaların aynı anda en kötü değerde olması olası olmadığından:

`T_toplam = √(0,2² + 0,2² + 0,2² + 0,2²) ≈ 0,4 mm`

İki sonuç da aynı gerçeği gösterir: bağımsız toleranslar zincirde birikir. Tek bir parça "geçer" olsa bile, zincirin sonunda işlevi bozacak bir sapma oluşabilir. Tolerans yığılması (stack-up), tek tek doğru ama birlikte yanlış parçaların kaynağıdır. Bu problemi geometriyle azaltmanın saha örneğini [DFA vaka çalışmamızda](https://takt.tr/blog/montaja-yonelik-tasarim-dfa) anlatmıştık.

### "Her Yere Dar Tolerans" Neden Yanlış?

Tasarımcı emin olmak istediğinde bütün ölçülere dar tolerans yazma eğilimindedir. Bu, riski azaltıyormuş gibi görünür ama üç yeni sorun üretir:

- **Maliyet artar:** Dar tolerans daha hassas tezgâh, daha çok ölçüm ve daha çok ıskarta demektir.
- **Asıl kritik ölçü gizlenir:** Her şey kritikse, hiçbir şey kritik değildir; üretim gerçekten önemli olan ölçüyü ayırt edemez.
- **İşlev yine garanti değildir:** Dar tolerans, yanlış referanstan ölçülüyorsa parçayı yine de işlevsiz bırakabilir.

GD&T bunun tersini yapar: kritik işlevsel ölçüler net referanslarla sıkı tanımlanır, geri kalanlar gevşetilir. Tolerans, ihtiyaca göre dağıtılır. Toleransın süreç tarafındaki karşılığını — sürecin bu toleransı gerçekten tutup tutamayacağını — [süreç yeteneği (Cp/Cpk) yazımızda](https://takt.tr/blog/six-sigma-surec-yetenegi) ele alıyoruz.

### İşlevden Geriye Toleranslama Nasıl Yapılır?

İşlevsel toleranslamanın mantığı tersine çalışır:

1. Parçanın hangi yüzeyinin neye temas ettiği, neyi konumladığı belirlenir.
2. Bu yüzeyler datum (referans) olarak tanımlanır.
3. Tolerans, bu referanslardan ve işlevsel gereksinimden türetilir.

Böylece montajı belirleyen ölçüler sıkı ve referanslı tanımlanır, geri kalan ölçüler gevşetilerek üretim maliyeti düşer ve tolerans bütçesi zincir boyunca işlevi koruyacak şekilde dağıtılır.

### Sınırlar ve Pratik Uyarılar

GD&T bedava değildir: çizimi hazırlayanın da okuyanın da dili bilmesi gerekir ve ölçüm tarafı (CMM, uygun mastarlar) referans sistemine göre kurulmalıdır. Tedarikçileriniz GD&T okuyamıyorsa, çizime eklenen semboller güvence değil kafa karışıklığı üretir. Bu durumda geçiş kademeli yapılmalı; önce montajı belirleyen birkaç kritik özellik referanslı tanımlanmalıdır.

### Hangi Ürünlerde Öncelikli?

Çok parçalı montajlar, kaynaklı konstrüksiyonlar ve hassas oturma gerektiren mekanizmalar tolerans yığılmasına en açık yapılardır. "Parçalar tek tek doğru ama montaj tutmuyor" cümlesi duyuluyorsa, sorun neredeyse her zaman tolerans tanımındadır.

---

**Parçalarınız tek tek ölçüde geçtiği halde montajda mı sorun çıkıyor?** takt.tr olarak ürünlerinizi GD&T ve tolerans zinciri analiziyle inceliyor; toleransları işleve göre yeniden dağıtarak hem montajı güvenceye alıyor hem üretim maliyetini düşürüyoruz. [İletişime geçin / Tolerans analizi talep edin.](https://takt.tr/iletisim)

## Kaynaklar

- [ASME Y14.5 — Dimensioning and Tolerancing (standart sayfası)](https://www.asme.org/codes-standards/find-codes-standards/y14-5-dimensioning-tolerancing)
- [ISO 1101:2017 — Geometrical product specifications (GPS): Geometrical tolerancing](https://www.iso.org/standard/66777.html)
