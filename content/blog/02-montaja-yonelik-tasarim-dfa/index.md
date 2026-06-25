---
title: "Montaja Yönelik Tasarım (DFA): Montajı Hatta Değil, Tasarım Masasında Çözmek"
description: "Montaja yönelik tasarım (DFA) ile montaj süresini ve hata payını geometriyle nasıl düşürdüğümüzü; self-locating arayüzler ve parça konsolidasyonu üzerinden anlatıyoruz."
slug: "montaja-yonelik-tasarim-dfa"
date: 2026-06-26
updated: 2026-06-26
status: review
author: "Ömer Faruk"
category: "DFM/DFA"
tags: ["dfa", "dfm", "self-locating", "celik-konstruksiyon", "lazer-kesim", "montaj-optimizasyonu"]
keywords:
  primary: "montaja yönelik tasarım (DFA)"
  secondary: ["DFA nedir", "self-locating arayüz", "parça konsolidasyonu", "montaj süresi düşürme", "tolerans yığılması"]
cover:
  src: "images/cover.jpg"
  alt: "Self-locating arayüzlerle ölçü almadan hizalanan lazer kesim çelik konstrüksiyon parçaları"
canonical: "https://takt.tr/blog/montaja-yonelik-tasarim-dfa"
og:
  type: "article"
  image: "images/cover.jpg"
schema: "TechArticle"
reading_time: 4
---

## Montaja Yönelik Tasarım (DFA): Montajı Hatta Değil, Tasarım Masasında Çözmek

Bir montaj hattında iki operatör aynı ürünü farklı sürelerde, farklı sonuçlarla birleştiriyorsa sorun çoğu zaman operatörde değildir. Parçalar ölçü almayı, hizalamayı, teknik resme tekrar tekrar bakmayı gerektiriyorsa, montajın yavaş ve hataya açık olması tasarımın kendisinde yazılıdır. Montajdaki zorluk, sahada değil, çizimde başlar.

Montaja yönelik tasarım (Design for Assembly — DFA) tam da bunu hedef alır: parçaların nasıl birleştirileceğini montaj aşamasına bırakmak yerine, tasarım aşamasında çözmek. Bu yazıda DFA'nın ne olduğunu, montaj süresini ve hata payını geometriyle nasıl düşürdüğünü; çelik konstrüksiyon yapılarda kullanılan self-locating (kendini hizalayan) arayüzler üzerinden ele alıyoruz.

### DFA Nedir?

DFA, montajı hızlandırmayı değil, montajı düşünmeye gerek bırakmamayı hedefler.

Bir ürün doğru çalışıyor olabilir; yine de birleştirilmesi zor, yavaş ve operatör becerisine bağımlı olabilir. DFA, bu bağımlılığı azaltmak için iki temel soruyu sorar: Bu parça sayısı gerçekten gerekli mi? Ve bu parçalar, birleşirken doğru konumu kendileri buluyor mu, yoksa konumu operatör mü belirliyor?

Cevaplar genellikle iki yönde değer üretir. Birincisi parça konsolidasyonudur: birden çok parçanın işlevini tek parçada toplamak, hem montaj adımını hem de tolerans yığılmasını azaltır. İkincisi self-locating arayüzlerdir: parçanın yalnızca doğru konumda oturmasına izin veren geometriler.

### Sahadaki Problem: Ölçüye Bağımlı Montaj

Çelik konstrüksiyon yapılarda montajın klasik darboğazı ölçüdür. Parçalar düz yüzeyler ve simetrik delik gruplarıyla geldiğinde, doğru konum çizimden okunur, mastarla ölçülür ve kaynaktan önce sabitlenir. Bu akışta her birleşim noktası ayrı bir ölçüm, ayrı bir hata olasılığı ve ayrı bir tolerans katkısı demektir.

Sonuç tanıdıktır: tolerans yığılması (stack-up), birleşimden birleşime büyür; montaj süresi operatörün dikkatine ve deneyimine bağlı kalır; kaynaklı imalatta küçük hizalama sapmaları sonradan düzeltme işçiliği üretir.

### Çözüm: Geometriyi Referans Yapmak

Çözüm, ölçümü kolaylaştırmak değil, ölçüme gerek bırakmaktır. Çelik konstrüksiyon yapılarda kullanılan self-locating arayüzler bunu sağlar: parça yalnızca doğru konumda oturacak şekilde tasarlanır, yanlış konum fiziksel olarak mümkün olmaz.

Bu yaklaşımda üç DFA aracı birlikte kullanılır:

- **Çok amaçlı tespit delikleri:** Aynı delik hem konumlama hem montaj referansı görevi görür; ek mastara gerek kalmaz.
- **Lazer kesimle markalama ve kodlama:** Profil ve sac parçalar, hangi parçanın nereye geldiğini gösteren markalarla kesilir. Teknik resme dönüp bakma ihtiyacı azalır.
- **Referans oluşturan geometrik farklar:** İlk bakışta gereksiz görünen küçük asimetriler, parçanın tek bir doğru yönde takılmasını sağlar.

Bu arayüzler lazer kesimle tek operasyonda üretildiği için, hizalama doğruluğu operatöre değil, kesim hassasiyetine bağlanır.

### Sonuç

Self-locating arayüzlerin çelik konstrüksiyona uygulanması şu sonuçları verdi:

- Ölçü almaya gerek kalmadan doğru montaj mümkün hale geldi.
- Tolerans yığılması belirgin şekilde azaldı.
- Kaynaklı imalat süresi kısaldı.
- Montaj, operatör deneyimine daha az bağımlı hale geldi.

Ar-Ge atölyesinden gelen geri bildirim bu sonucu doğruladı: üretim eskisine göre kolaylaştı, teknik resim okuma ihtiyacı azaldı, süreç olduğundan daha basit algılandı. İyi tasarlanmış bir arayüz, montajı yalnızca hızlandırmaz; üzerinde düşünülecek bir iş olmaktan çıkarır.

### Bu Yaklaşım Nerede Geçerli?

DFA, çok parçalı her üründe değer üretir; ama özellikle montaj süresinin değişken, hata oranının yüksek ve işin operatör becerisine bağlı olduğu yerlerde fark yaratır. Bir montaj adımı "dikkat gerektiriyor" diye işaretlendiğinde, asıl çözüm operatörü uyarmak değil, o adımı tasarımda dikkat gerektirmeyecek hale getirmektir.

DFA, montaj problemlerini sahadan tasarım masasına taşır. Çözülmesi gereken yer de zaten orasıdır.

---

**Montaj süreniz operatöre göre değişiyor, hata oranınız yüksek ya da kaynaklı imalatta düzeltme işçiliği çok mu fazla?** takt.tr olarak ürünlerinizi DFA gözüyle yeniden değerlendiriyor; parça sayısını, ölçüm bağımlılığını ve montaj süresini tasarım aşamasında düşürüyoruz. [İletişime geçin / Montaj tasarımı incelemesi talep edin.](https://takt.tr/iletisim)
