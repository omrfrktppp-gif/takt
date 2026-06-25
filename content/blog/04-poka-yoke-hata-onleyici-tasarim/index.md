---
title: "Poka-Yoke: Hatayı Denetlemek Değil, İmkânsız Kılmak"
description: "Poka-Yoke (hata önleyici tasarım) ile montaj hatalarını kontrol etmek yerine geometriyle imkânsız kılmak. Toyota kökenli yöntemin saha uygulamaları."
slug: "poka-yoke-hata-onleyici-tasarim"
date: 2026-06-26
updated: 2026-06-26
status: review
author: "Ömer Faruk"
category: "DFM/DFA"
tags: ["poka-yoke", "dfa", "hata-onleme", "yalin-uretim", "lazer-kesim"]
keywords:
  primary: "poka-yoke hata önleyici tasarım"
  secondary: ["poka-yoke nedir", "hata önleme", "montaj hatası", "self-locating"]
cover:
  src: "images/cover.jpg"
  alt: "Yanlış yönde takılması fiziksel olarak imkânsız, poka-yoke geometrili lazer kesim parça"
canonical: "https://takt.tr/blog/poka-yoke-hata-onleyici-tasarim"
og:
  type: "article"
  image: "images/cover.jpg"
schema: "TechArticle"
reading_time: 4
---

## Poka-Yoke: Hatayı Denetlemek Değil, İmkânsız Kılmak

Bir montaj hatası tekrar tekrar oluyorsa, operatöre "daha dikkatli ol" demek çözüm değildir. Dikkat tükenir, vardiya uzar, yeni operatör gelir ve hata geri döner. Asıl soru şudur: bu parça neden yanlış takılabiliyor? Hatayı denetlemekle önlemek farklı şeylerdir; biri hatayı yakalamaya, diğeri hatayı en baştan mümkün olmaktan çıkarmaya çalışır.

Poka-Yoke tam da bunu yapar. 1960'larda Toyota Motor Corporation bünyesinde, montaj hatalarını kontrol etmek yerine tasarım aşamasında fiziksel olarak imkânsız kılma fikriyle ortaya çıkmıştır. Bu yazıda Poka-Yoke'un ne olduğunu, montaja yönelik tasarımla (DFA) ilişkisini ve sahadaki somut uygulamalarını ele alıyoruz.

### Poka-Yoke Nedir?

Poka-Yoke, DFA yaklaşımının doğrudan bir alt kırılımı olarak değerlendirilebilir. Temel ilkesi basittir: hatayı operatörün dikkatine bırakmak yerine, hatanın oluşmasını geometriyle engellemek.

Bu yaklaşım üç tür çözüm üzerinden şekillenir: yanlış yönde takılamayan parçalar, eksik parçayla ilerlenemeyen montaj adımları ve ölçüm ya da operatör dikkatine bağımlılığı azaltan hata önleyici geometriler. Ortak nokta, doğru montajın tek mümkün montaj olmasıdır.

### Sahadaki Uygulamalar

Endüstriyel makine tasarımlarında Poka-Yoke yalnızca montaj hatalarını önlemek için değil, aynı zamanda montaj süresini kısaltmak için de kullanılır. Bazı somut DFA temelli Poka-Yoke uygulamaları:

- **Profil yapıların lazer kesimle markalanması ve kodlanması:** Hangi parçanın nereye geldiği parçanın üzerinde yazılıdır; karıştırma ihtimali ortadan kalkar.
- **Çok amaçlı tespit delikleri:** Aynı delik hem konumlama hem montaj referansı sağlar; yanlış konum mümkün olmaz.
- **Referans oluşturan geometrik farklar:** İlk bakışta gereksiz görünen küçük asimetriler, parçanın yalnızca tek doğru yönde oturmasını sağlar.

Özellikle çelik konstrüksiyon yapılarda kullanılan kendini hizalayan (self-locating) arayüzler sayesinde, ölçü almaya gerek kalmadan doğru montaj mümkün hale gelir; tolerans yığılması ve kaynaklı imalat süresi de belirgin şekilde azalır.

### Görünmez Kazanç: Bilişsel Yük

Poka-Yoke'un en az konuşulan faydası, montajı zihinsel olarak hafifletmesidir. Saha geri bildirimleri çoğu zaman aynı yöndedir: üretim eskisine göre kolaylaşır, teknik resim okuma ihtiyacı azalır, süreç olduğundan daha basit algılanır ve kaba tabirle operatör "kafa yormadan" üretir.

Bu küçük bir ayrıntı değildir. Dikkat gerektiren her adım, bir hata olasılığı ve bir yavaşlama noktasıdır. Poka-Yoke bu adımları geometriyle çözdüğünde, hem hız hem tutarlılık operatörden bağımsız hale gelir.

### Sonuç

Poka-Yoke, hatayı sahada yakalamayı değil, tasarımda olanaksız kılmayı hedefler. İyi tasarlanmış bir parça yanlış takılmaya izin vermediğinde, kontrol adımına da gerek kalmaz. DFA ve Poka-Yoke, teoriden çok uygulamada değer üreten; sahadaki montaj problemlerine doğrudan cevap veren tasarım prensipleridir.

### Bu Yaklaşım Nerede Geçerli?

Aynı montaj hatasının tekrar ettiği, ürün karıştırmanın yaşandığı veya montajın operatör deneyimine aşırı bağımlı olduğu her hatta Poka-Yoke uygulanabilir. Bir hata "insan hatası" diye kapatıldığında, çoğu zaman arkasında onu mümkün kılan bir geometri vardır.

---

**Aynı montaj hatası tekrar tekrar mı oluyor?** takt.tr olarak ürünlerinizi Poka-Yoke ve DFA gözüyle yeniden tasarlıyor; hatayı kontrol listesine değil, geometriye çözdürerek montaj hızını ve tutarlılığını artırıyoruz. [İletişime geçin / Poka-Yoke incelemesi talep edin.](https://takt.tr/iletisim)
