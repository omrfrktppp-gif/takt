---
title: "Sac Metal Tasarımı (DFM): Çizimi Değil, Bükümü Tasarlamak"
description: "Sac metal tasarımında büküm payı, K-faktörü ve minimum büküm yarıçapı nedir? Açılımın doğru çıkması ve çatlamayan büküm için pratik DFM kuralları."
slug: "sac-metal-tasarimi-dfm"
date: 2026-05-25
updated: 2026-07-25
status: review
kind: article
author: "Ömer Faruk Top"
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

Sac metal tasarımında ölçüsel doğruluğu üç kavram belirler: büküm payı (bend allowance), K-faktörü ve minimum büküm yarıçapı. Sac büküldüğünde dış yüzeyi uzar, iç yüzeyi kısalır ve yalnızca "nötr eksen" denen ince bir tabaka boyunu korur; bu yüzden bükülmüş parçanın düz açılımı, kenar uzunluklarının basit toplamı değildir. Bu üç kavramı doğru ele almayan bir çizim, lazer kesim ne kadar hassas olursa olsun hatalı parça üretir.

Sac metalde en sık yapılan tasarım hatası, parçayı bükülmüş haliyle çizip açılımın kendiliğinden doğru çıkacağını varsaymaktır. Sac metal tasarımı, parçanın bitmiş halini çizmek kadar, o hale nasıl büküleceğini tasarlamaktır.

## K-Faktörü Nedir?

Bir sac büküldüğünde malzemenin dış kısmı çekmeye, iç kısmı basmaya maruz kalır. İkisi arasında ne uzayan ne kısalan bir tabaka vardır: nötr eksen. [K-faktörü, nötr eksenin konumunun malzeme kalınlığına oranıdır](https://sendcutsend.com/blog/what-is-k-factor-in-bending-terminology/) ve pratikte 0 ile 0,5 arasında değer alır; büküm payı hesabının temelini oluşturur.

K-faktörü malzemeye, kalınlığa ve büküm yöntemine göre değişir. [Protolabs'in sac metal tasarım rehberi](https://www.protolabs.com/resources/design-tips/the-basics-of-bend-radii-in-sheet-metal/), tipik değerlerin büküm yöntemine göre farklılaştığını gösterir (havalı büküm ile dipten büküm aynı K değerini vermez). Buradaki en yaygın hata, CAD yazılımının varsayılan K-faktörünü gerçek malzeme ve gerçek abkant kalıbıyla doğrulamadan kullanmaktır; sonuç, yanlış açılım ve hatalı boyutlanmış parçadır. Seri üretime geçmeden önce, K-faktörünü üreticinizin makinesi ve kalıbıyla yapılan deneme bükümüyle doğrulamak en güvenilir yoldur.

## Büküm Payı Nasıl Hesaplanır?

Büküm payı, bir bükümün düz açılımda kapladığı uzunluktur ve nötr eksen üzerinden hesaplanır:

`Büküm payı = (π/180) × büküm açısı × (iç büküm yarıçapı + K-faktörü × malzeme kalınlığı)`

Pratik anlamı şudur: doğru açılım için her bükümün payı ayrı ayrı hesaplanıp düz uzunluklara eklenir. Açılım yanlışsa, kesim doğru olsa bile bükülmüş parça hatalı ölçüde çıkar. Sac metalde ölçüsel doğruluk çizimde değil, büküm payı hesabında belirlenir.

## Minimum Büküm Yarıçapı Neden Var?

Sac, çok keskin bir yarıçapla bükülmeye zorlanırsa dış yüzeyi çatlar. [Protolabs'in rehberindeki](https://www.protolabs.com/resources/design-tips/the-basics-of-bend-radii-in-sheet-metal/) yaygın başlangıç kuralı, iç büküm yarıçapını en az malzeme kalınlığı kadar (1T) almaktır. Bu bir alt sınırdır; gerçek değer malzemeye ve tavına göre değişir: alüminyum alaşımları genellikle 1T civarından başlarken, paslanmaz çelik gibi daha sert ve pekleşen malzemeler daha büyük yarıçap ister. Kesin değerler için üreticinizin malzeme-kalınlık tablosunu esas alın; [SendCutSend'in malzeme bazlı büküm kılavuzları](https://sendcutsend.com/guidelines/) bu tür tabloların iyi bir örneğidir.

Bu sınırı zorlamak, görünür olmayan mikro çatlaklara ve parçanın erken yorulmasına yol açabilir. Tasarım aşamasında malzemeye uygun yarıçap seçmek, üretimde ıskarta ve yeniden işlemeyi önler.

## Diğer Pratik DFM Kuralları

Ölçüsel doğruluğun yanında üretilebilirliği belirleyen kurallar da vardır:

| Kural | Neden? |
| --- | --- |
| Flanş uzunluğunu yeterli tut (yaygın pratik: kalınlığın en az ~4 katı) | Kısa flanş abkant kalıbında düzgün tutunamaz |
| Delikleri büküm hattından uzak tut | Büküm hattına yakın delikler büküm sırasında deforme olur |
| Bükümleri mümkünse aynı yönde topla | Parça abkantta daha az çevrilir, hata payı azalır |
| Köşe rahatlatma (relief) kesimleri ekle | Büküm hattının kenarında yırtılmayı önler |

Bu değerler üreticiden üreticiye değişir; kesin sınırlar için çalıştığınız atölyenin tasarım kılavuzunu isteyin. Kurallar, [DFM yazımızdaki](https://takt.tr/blog/uretime-yonelik-tasarim-dfm) ilkeyle aynı mantığı taşır: geometri, üretim yönteminin gerçeklerine göre tasarlanmalıdır. Sac metalde bu gerçek, abkant presin ve malzemenin fiziğidir.

## Teklif Almadan Önce Neyi Netleştirmelisiniz?

Bir sac parçayı fason üreticiye gönderirken şu bilgilerin dosyada olması, hem teklifi hem üretimi hızlandırır: malzeme ve kalınlık, iç büküm yarıçapları, kritik ölçülerin hangileri olduğu (hepsi değil), yüzey işlemi ve adet. Açılımı üreticinin çıkarmasına izin vermek çoğu zaman daha sağlıklıdır; çünkü açılım, üreticinin kendi K-faktörü değerleriyle hesaplanmalıdır. [Fason üretici tekliflerini karşılaştırma yazımızda](https://takt.tr/blog/fason-uretici-teklif-karsilastirma) bu konuyu ayrıntılı ele alıyoruz.

## Sonuç

Sac metal tasarımı, parçanın bitmiş halini çizmekten ibaret değildir; o hale nasıl büküleceğini, açılımın nasıl çıkacağını ve malzemenin bükümü kaldırıp kaldıramayacağını tasarlamaktır. K-faktörü, büküm payı ve minimum büküm yarıçapı doğru ele alındığında parça hem doğru ölçüde çıkar hem çatlamadan bükülür.

---

**Sac parçalarınızın açılımı yanlış mı çıkıyor, büküm hatlarında çatlama ya da ölçü sapması mı yaşıyorsunuz?** Takt olarak sac metal parçalarınızı DFM gözüyle inceliyor; K-faktörü, büküm payı ve yarıçap seçimini malzemeye ve sürece göre doğruluyoruz. [Tasarım ve geliştirme hizmetimize](https://takt.tr/hizmetler/tasarim-gelistirme) göz atın veya [iletişime geçin](https://takt.tr/iletisim).

## Kaynaklar

- [The Basics of Bend Radii in Sheet Metal — Protolabs tasarım rehberi](https://www.protolabs.com/resources/design-tips/the-basics-of-bend-radii-in-sheet-metal/) (1T kuralı, K-faktörü ve büküm yöntemi ilişkisi)
- [What Is K-Factor in Sheet Metal Bending? — SendCutSend](https://sendcutsend.com/blog/what-is-k-factor-in-bending-terminology/) (nötr eksen ve K-faktörü tanımı)
- [Design Guidelines — SendCutSend](https://sendcutsend.com/guidelines/) (malzeme bazlı büküm kılavuzları)
