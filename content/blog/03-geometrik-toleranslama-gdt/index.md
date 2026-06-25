---
title: "Geometrik Toleranslama (GD&T): Ölçüyü Değil İşlevi Toleranslamak"
description: "GD&T ve tolerans yığılması: her ölçüye dar tolerans vermek neden yanlış? İşlevsel toleranslama ile montajı kilitlemeden maliyeti nasıl düşürürsünüz?"
slug: "geometrik-toleranslama-gdt"
date: 2026-06-26
updated: 2026-06-26
status: review
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
reading_time: 5
---

## Geometrik Toleranslama (GD&T): Ölçüyü Değil İşlevi Toleranslamak

Bir parça tek tek ölçüldüğünde her ölçü sınırların içindedir; ama parçalar birleştiğinde montaj oturmaz. Bu, atölyede en çok kafa karıştıran durumlardan biridir. Sorun çoğu zaman üretimde değil, toleransların nasıl tanımlandığındadır. Her ölçüye dar tolerans yazmak parçayı doğru yapmaz; sadece pahalı yapar.

Geometrik boyutlandırma ve toleranslama (Geometric Dimensioning and Tolerancing — GD&T), toleransı tek tek ölçülere değil, parçanın işlevine bağlamanın yöntemidir. Bu yazıda GD&T'nin ne olduğunu, tolerans yığılmasının montajı nasıl kilitlediğini ve "her yere ±0,01" yaklaşımının neden hem riskli hem pahalı olduğunu ele alıyoruz.

### GD&T Nedir?

GD&T, bir ölçünün ne kadar sapabileceğini değil, bir özelliğin işlevini yerine getirmek için nasıl konumlanması gerektiğini tanımlar. Klasik ± toleranslamada her ölçü bağımsız bir kutudur. GD&T'de ise referanslar (datum), konum, diklik, paralellik ve profil gibi geometrik ilişkiler tanımlanır; tolerans, parçanın gerçekte nasıl çalıştığına bağlanır.

Fark şudur: ± toleranslama parçanın kâğıt üzerinde doğru görünmesini sağlar. GD&T parçanın sahada doğru çalışmasını sağlar.

### Tolerans Yığılması: Sessiz Hata Kaynağı

Bir montaj zinciri düşünün: birbirine eklenen dört parça, her biri ±0,2 mm toleransla üretiliyor. En kötü durumda toplam sapma basitçe toplanır:

`T_toplam = 0,2 + 0,2 + 0,2 + 0,2 = 0,8 mm`

İstatistiksel (RSS) yaklaşımla, sapmaların aynı anda en kötü değerde olması olası olmadığından:

`T_toplam = √(0,2² + 0,2² + 0,2² + 0,2²) ≈ 0,4 mm`

İki sonuç da aynı gerçeği gösterir: bağımsız toleranslar zincirde birikir. Tek bir parça "geçer" olsa bile, zincirin sonunda işlevi bozacak bir sapma oluşabilir. Tolerans yığılması (stack-up), tek tek doğru ama birlikte yanlış parçaların kaynağıdır.

### "Her Yere Dar Tolerans" Neden Yanlış?

Tasarımcı emin olmak istediğinde bütün ölçülere dar tolerans yazma eğilimindedir. Bu, riski azaltıyormuş gibi görünür ama üç yeni sorun üretir:

- **Maliyet artar:** Dar tolerans daha hassas tezgâh, daha çok ölçüm ve daha çok ıskarta demektir.
- **Asıl kritik ölçü gizlenir:** Her şey kritikse, hiçbir şey kritik değildir. Üretim, gerçekten önemli olan ölçüyü ayırt edemez.
- **İşlev yine garanti değildir:** Dar tolerans, yanlış referanstan ölçülüyorsa parçayı yine de işlevsiz bırakabilir.

GD&T bunun tersini yapar: kritik işlevsel ölçüler net referanslarla sıkı tanımlanır, işlevi etkilemeyen ölçüler ise bilinçli olarak gevşek bırakılır. Tolerans, ihtiyaca göre dağıtılır.

### Doğru Yaklaşım: İşlevden Geriye Toleranslama

İşlevsel toleranslamanın mantığı tersine çalışır: önce parçanın hangi yüzeyinin neye temas ettiği, neyi konumladığı belirlenir. Bu yüzeyler datum (referans) olur. Tolerans, bu referanslardan ve işlevsel gereksinimden türetilir. Böylece:

- Montajı belirleyen ölçüler sıkı ve referanslı tanımlanır.
- Geri kalan ölçüler gevşetilerek üretim maliyeti düşer.
- Tolerans bütçesi, zincir boyunca işlevi koruyacak şekilde dağıtılır.

### Sonuç

GD&T, çizimi süslemek için değil, parçanın sahada çalışacağından emin olmak için kullanılır. İyi bir toleranslama her ölçüyü daraltmaz; tolerans bütçesini işlevin gerektirdiği yere taşır. Doğru yapıldığında hem montaj güvenceye alınır hem üretim ucuzlar — çünkü hassasiyet, gerçekten gerekli olan yerde harcanır.

### Bu Yaklaşım Nerede Geçerli?

Çok parçalı montajlar, kaynaklı konstrüksiyonlar ve hassas oturma gerektiren mekanizmalar tolerans yığılmasına en açık yapılardır. "Parçalar tek tek doğru ama montaj tutmuyor" cümlesi duyuluyorsa, sorun neredeyse her zaman tolerans tanımındadır.

---

**Parçalarınız tek tek ölçüde geçtiği halde montajda mı sorun çıkıyor?** takt.tr olarak ürünlerinizi GD&T ve tolerans zinciri analiziyle inceliyor; toleransları işleve göre yeniden dağıtarak hem montajı güvenceye alıyor hem üretim maliyetini düşürüyoruz. [İletişime geçin / Tolerans analizi talep edin.](https://takt.tr/iletisim)
