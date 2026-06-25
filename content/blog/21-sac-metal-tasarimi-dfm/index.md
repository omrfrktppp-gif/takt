---
title: "Sac Metal Tasarımı (DFM): Çizimi Değil, Bükümü Tasarlamak"
description: "Sac metal tasarımında büküm payı, K-faktörü ve minimum büküm yarıçapı nedir? Üretilebilir sac parça çizmenin DFM kurallarını örnek ve kaynaklarla anlatıyoruz."
slug: "sac-metal-tasarimi-dfm"
date: 2026-06-26
updated: 2026-06-26
status: review
author: "Ömer Faruk"
category: "DFM/DFA"
tags: ["sac-metal", "dfm", "bukum-payi", "k-faktoru", "lazer-kesim", "abkant"]
keywords:
  primary: "sac metal tasarımı büküm payı (K-faktörü)"
  secondary: ["sac metal DFM", "K-faktörü nedir", "minimum büküm yarıçapı", "büküm payı hesabı"]
cover:
  src: "images/cover.jpg"
  alt: "Abkant preste bükülen sac parça ve büküm payı ile nötr eksen şeması"
canonical: "https://takt.tr/blog/sac-metal-tasarimi-dfm"
og:
  type: "article"
  image: "images/cover.jpg"
schema: "TechArticle"
reading_time: 7
---

## Sac Metal Tasarımı (DFM): Çizimi Değil, Bükümü Tasarlamak

Sac metal parçalarda en sık yapılan tasarım hatası, parçayı bükülmüş haliyle çizip açılımın kendiliğinden doğru çıkacağını varsaymaktır. Oysa sac, büküldüğünde dış yüzeyi uzar, iç yüzeyi kısalır ve yalnızca "nötr eksen" denen ince bir tabaka boyunu korur. Bu yüzden bükülmüş parçanın düz açılımı, kenarların basit toplamı değildir. Sac metal tasarımı, parçanın bitmiş halini çizmek kadar, o hale nasıl büküleceğini tasarlamaktır.

Bu yazıda sac metal tasarımının (Design for Manufacturing — DFM) üç temel kavramını ele alıyoruz: büküm payı (bend allowance), K-faktörü ve minimum büküm yarıçapı. Bu kavramlar, lazer kesim ve abkant pres ile üretilen parçaların hem doğru ölçüde çıkmasını hem de çatlamadan, deforme olmadan bükülmesini belirler.

### Nötr Eksen ve K-Faktörü

Bir sac büküldüğünde malzemenin dış kısmı çekmeye, iç kısmı basmaya maruz kalır. Bu ikisi arasında, ne uzayan ne kısalan bir tabaka vardır: nötr eksen. K-faktörü, bu nötr eksenin malzeme kalınlığına oranıdır (SendCutSend; Protolabs). Değeri 0 ile 0,5 arasında değişir ve büküm payı hesabının temelini oluşturur.

K-faktörü malzemeye, kalınlığa ve büküm yöntemine göre değişir. Protolabs'in verdiği tipik değerler, havalı bükümde (air bend) yaklaşık 0,33, dipten bükümde (bottom bend) yaklaşık 0,42 civarındadır (Protolabs). Buradaki en yaygın hata, CAD yazılımının varsayılan K-faktörünü gerçek malzemeyle doğrulamadan kullanmaktır; bu, açılım ölçüsünün yanlış çıkmasına ve parçanın hatalı boyutlanmasına yol açar (Simutec).

### Büküm Payı

Büküm payı, bir bükümün düz açılımda kapladığı uzunluktur ve nötr eksen üzerinden hesaplanır. Kavramsal olarak:

`Büküm payı = (π/180) × büküm açısı × (büküm yarıçapı + K-faktörü × malzeme kalınlığı)`

Bu formülün pratik anlamı şudur: bir parçanın doğru açılımını çıkarmak için her bükümün payını ayrı ayrı hesaplayıp düz uzunluklara eklemek gerekir. Açılım yanlışsa, lazer kesim doğru olsa bile bükülmüş parça hatalı ölçüde çıkar. Bu yüzden sac metal tasarımında ölçüsel doğruluk, çizimde değil, büküm payı hesabında belirlenir.

### Minimum Büküm Yarıçapı

Sac, çok keskin bir yarıçapla bükülmeye zorlanırsa dış yüzeyi çatlar. Bu yüzden her malzemenin bir minimum büküm yarıçapı vardır. Yaygın bir başlangıç kuralı, minimum büküm yarıçapının malzeme kalınlığına (1T kuralı) eşit alınmasıdır; ancak bu, malzemeye göre değişir (Woodward Fab):

- Alüminyum: yaklaşık 1T–1,5T
- Yumuşak çelik: yaklaşık 1T–2T
- Paslanmaz çelik: yaklaşık 2T ve üzeri

Paslanmazın daha büyük yarıçap istemesi, daha sert ve gevrek davranmasındandır. Bu sınırı zorlamak, görünür olmayan mikro çatlaklara ve parçanın erken yorulmasına yol açabilir. Tasarım aşamasında malzemeye uygun yarıçap seçmek, üretimde ıskarta ve yeniden işlemeyi önler.

### Diğer Pratik DFM Kuralları

Sac metal tasarımında ölçüsel doğruluğun yanında üretilebilirliği belirleyen başka kurallar da vardır (JLC; Woodward Fab):

- **Minimum flanş uzunluğu:** Bir bükümün tutturulabilmesi için flanş uzunluğu genellikle malzeme kalınlığının en az üç katı olmalıdır; daha kısa flanşlar abkant kalıbında düzgün tutunmaz.
- **Delik-büküm mesafesi:** Deliklerin büküm hattına çok yakın olması, büküm sırasında deliklerin deforme olmasına yol açar.
- **Büküm yönü tutarlılığı:** Mümkün olduğunda bükümleri aynı yönde toplamak, parçanın abkantta daha az çevrilmesini ve hata payının azalmasını sağlar.

Bu kurallar, daha önceki DFM yazımızdaki ilkeyle aynı mantığı taşır: geometri, üretim yönteminin gerçeklerine göre tasarlanmalıdır. Sac metalde bu gerçek, abkant presin ve malzemenin fiziğidir.

### Sonuç

Sac metal tasarımı, parçanın bitmiş halini çizmekten ibaret değildir; o hale nasıl büküleceğini, açılımın nasıl çıkacağını ve malzemenin bükümü kaldırıp kaldıramayacağını tasarlamaktır. K-faktörü, büküm payı ve minimum büküm yarıçapı doğru ele alındığında parça hem doğru ölçüde çıkar hem çatlamadan bükülür. Bu kavramları atlamak, lazer kesim ne kadar hassas olursa olsun, hatalı parça üretir.

### Bu Yaklaşım Nerede Geçerli?

Lazer kesim ve abkant pres ile üretilen tüm sac parçalar bu kuralların kapsamındadır. "Açılımım neden yanlış çıkıyor, parçam neden büküm hattında çatlıyor?" soruları, neredeyse her zaman K-faktörü, büküm payı veya yarıçap seçimine işaret eder.

---

**Sac parçalarınızın açılımı yanlış mı çıkıyor, büküm hatlarında çatlama ya da ölçü sapması mı yaşıyorsunuz?** takt.tr olarak sac metal parçalarınızı DFM gözüyle inceliyor; K-faktörü, büküm payı ve yarıçap seçimini malzemeye ve sürece göre doğrulayarak üretilebilir, doğru ölçülü parçalar tasarlıyoruz. [İletişime geçin / Sac metal DFM incelemesi talep edin.](https://takt.tr/iletisim)

## Kaynaklar
- Sheet Metal Bend Radius Guidelines (K-faktörü değerleri) — Protolabs. https://www.protolabs.com/resources/design-tips/the-basics-of-bend-radii-in-sheet-metal/
- What Is K Factor in Sheet Metal Bending? The Ultimate Guide — SendCutSend. https://sendcutsend.com/blog/what-is-k-factor-in-bending-terminology/
- Sheet Metal Bending Rules: Design, Radius (1T kuralı, malzeme yarıçapları) — Woodward Fab. https://www.woodwardfab.com/blog/sheet-metal-bending-rules/
- Sheet Metal Design for Manufacturing: Tolerances, Bend Allowances and DFM Tips — Simutec. https://simutecra.com/blogs/sheet-metal-design-for-manufacturing-tolerances-bend-allowances-and-dfm-tips
- Sheet Metal Design Guidelines for Bends, DFM (minimum flanş) — JLC. https://jlccnc.com/blog/sheet-metal-design
