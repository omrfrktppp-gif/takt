---
title: "Poka-Yoke: Hatayı Denetlemek Değil, İmkânsız Kılmak"
description: "Poka-Yoke (hata önleyici tasarım) ile montaj hatalarını kontrol etmek yerine geometriyle imkânsız kılmak. Yalın üretim kökenli yöntemin saha uygulamaları."
slug: "poka-yoke-hata-onleyici-tasarim"
date: 2026-04-04
updated: 2026-07-25
status: published
kind: article
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
reading_time: 5
---

## Poka-Yoke: Hatayı Denetlemek Değil, İmkânsız Kılmak

Poka-Yoke, Japonca "istemsiz hata" (poka) ve "önleme" (yoke) kelimelerinden gelen, [hatayı kaynağında yakalayıp basit ve ucuz düzeneklerle önlemeyi hedefleyen](https://www.lean.org/lexicon-terms/poka-yoke/) yalın üretim yöntemidir. Özü şudur: operatörün dikkatine güvenmek yerine, yanlış parça takmayı, parça atlamayı ya da ters takmayı fiziksel olarak imkânsız kılmak.

Bir montaj hatası tekrar tekrar oluyorsa, operatöre "daha dikkatli ol" demek çözüm değildir. Dikkat tükenir, vardiya uzar, yeni operatör gelir ve hata geri döner. Asıl soru şudur: bu parça neden yanlış takılabiliyor? Hatayı denetlemekle önlemek farklı disiplinlerdir; biri hatayı yakalamaya, diğeri hatayı en baştan mümkün olmaktan çıkarmaya çalışır.

### Poka-Yoke Nedir, Neden Kontrolden Güçlüdür?

[Lean Enterprise Institute'un tanımıyla](https://www.lean.org/lexicon-terms/poka-yoke/) poka-yoke'nin amacı, kusuru kaynağında yakalayarak yüzde yüz kaliteye ulaşmaktır; örnekleme ile kontrol, kusurlu partilerin gözden kaçmasına her zaman açıktır, yüzde yüz kontrol ise hem pahalıdır hem kusurun nedenini ortadan kaldırmaz. Kaynağında önleme ise hem kontrolü hem kusuru birlikte eritir.

Tasarım tarafında poka-yoke, [montaja yönelik tasarımın (DFA)](https://takt.tr/blog/montaja-yonelik-tasarim-dfa) doğrudan bir alt kırılımı olarak değerlendirilebilir ve üç tür çözüm üzerinden şekillenir:

- Yanlış yönde takılamayan parçalar,
- Eksik parçayla ilerlenemeyen montaj adımları,
- Ölçüm ya da operatör dikkatine bağımlılığı azaltan hata önleyici geometriler.

Ortak nokta, doğru montajın tek mümkün montaj olmasıdır.

### Sahada Nasıl Uygulanır?

Endüstriyel makine tasarımlarında poka-yoke yalnızca hatayı önlemek için değil, montaj süresini kısaltmak için de kullanılır. Uyguladığımız somut DFA temelli örnekler:

- **Profil yapıların lazer kesimle markalanması ve kodlanması:** Hangi parçanın nereye geldiği parçanın üzerinde yazılıdır; karıştırma ihtimali ortadan kalkar.
- **Çok amaçlı tespit delikleri:** Aynı delik hem konumlama hem montaj referansı sağlar; yanlış konum mümkün olmaz.
- **Referans oluşturan geometrik farklar:** İlk bakışta gereksiz görünen küçük asimetriler, parçanın yalnızca tek doğru yönde oturmasını sağlar.

Özellikle çelik konstrüksiyon yapılarda kullanılan kendini hizalayan (self-locating) arayüzler sayesinde, ölçü almaya gerek kalmadan doğru montaj mümkün hale gelir; tolerans yığılması ve kaynaklı imalat süresi de belirgin şekilde azalır.

### Görünmez Kazanç: Bilişsel Yük

Poka-yoke'nin en az konuşulan faydası, montajı zihinsel olarak hafifletmesidir. Saha geri bildirimleri çoğu zaman aynı yöndedir: üretim eskisine göre kolaylaşır, teknik resim okuma ihtiyacı azalır, süreç olduğundan daha basit algılanır ve kaba tabirle operatör "kafa yormadan" üretir.

Bu küçük bir ayrıntı değildir. Dikkat gerektiren her adım, bir hata olasılığı ve bir yavaşlama noktasıdır. Poka-yoke bu adımları geometriyle çözdüğünde, hem hız hem tutarlılık operatörden bağımsız hale gelir.

### Sınırları Nedir?

Poka-yoke her hatayı geometriyle çözmez. Kusurun kaynağı proses parametresiyse (yanlış tork, eksik kaynak nüfuziyeti), fiziksel kilit yerine sensör/ekipman temelli önlemler gerekir. Ayrıca her hata önleyici geometri, kesim ve tasarım tarafına küçük bir ek iş getirir; yatırım, hatanın sıklığı ve maliyetiyle orantılı seçilmelidir. Hangi hatanın önce ele alınacağını sistematik biçimde önceliklendirmek için [FMEA yazımızdaki](https://takt.tr/blog/fmea-hata-turu-etki-analizi) risk analizi doğal bir başlangıçtır: saptanması zor bir hatayı, onu imkânsız kılan bir geometriyle çözmek, riski iki boyutta birden düşürür.

### Nerede Uygulanmalı?

Aynı montaj hatasının tekrar ettiği, ürün karıştırmanın yaşandığı veya montajın operatör deneyimine aşırı bağımlı olduğu her hat poka-yoke adayıdır. Bir hata "insan hatası" diye kapatıldığında, çoğu zaman arkasında onu mümkün kılan bir geometri vardır.

---

**Aynı montaj hatası tekrar tekrar mı oluyor?** takt.tr olarak ürünlerinizi Poka-Yoke ve DFA gözüyle yeniden tasarlıyor; hatayı kontrol listesine değil, geometriye çözdürerek montaj hızını ve tutarlılığını artırıyoruz. [İletişime geçin / Poka-Yoke incelemesi talep edin.](https://takt.tr/iletisim)

## Kaynaklar

- [Poka Yoke — Lean Enterprise Institute Lexicon](https://www.lean.org/lexicon-terms/poka-yoke/)
- [Toyota Production System — Toyota Motor Corporation (resmî sayfa)](https://global.toyota/en/company/vision-and-philosophy/production-system/)
