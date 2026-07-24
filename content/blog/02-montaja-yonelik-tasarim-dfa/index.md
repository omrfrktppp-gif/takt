---
title: "Montaja Yönelik Tasarım (DFA): Montajı Hatta Değil, Tasarım Masasında Çözmek"
description: "Montaja yönelik tasarım (DFA) ile montaj süresini ve hata payını geometriyle nasıl düşürdüğümüzü; self-locating arayüzler ve parça konsolidasyonu üzerinden anlatıyoruz."
slug: "montaja-yonelik-tasarim-dfa"
date: 2026-03-29
updated: 2026-07-25
status: published
kind: case-study
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
reading_time: 6
---

## Montaja Yönelik Tasarım (DFA): Montajı Hatta Değil, Tasarım Masasında Çözmek

Montaja yönelik tasarım (Design for Assembly — DFA), parçaların nasıl birleştirileceğini montaj hattına bırakmak yerine tasarım aşamasında çözen mühendislik yaklaşımıdır. Bu vaka çalışmasındaki uygulamada, çelik konstrüksiyon yapılarda self-locating (kendini hizalayan) arayüzler kullandık; sonuçta ölçü almaya gerek kalmadan doğru montaj mümkün oldu, tolerans yığılması azaldı, kaynaklı imalat süresi kısaldı ve montaj operatör deneyimine daha az bağımlı hale geldi.

Bir montaj hattında iki operatör aynı ürünü farklı sürelerde, farklı sonuçlarla birleştiriyorsa sorun çoğu zaman operatörde değildir. Parçalar ölçü almayı, hizalamayı, teknik resme tekrar tekrar bakmayı gerektiriyorsa, montajın yavaş ve hataya açık olması tasarımın kendisinde yazılıdır.

### DFA Nedir, Neyi Hedefler?

DFA, montajı hızlandırmayı değil, montajı düşünmeye gerek bırakmamayı hedefler. [Boothroyd Dewhurst'ün DFMA metodolojisinde](https://www.dfma.com/) sistematikleşen bu yaklaşım iki temel soru sorar:

1. **Bu parça sayısı gerçekten gerekli mi?** Birden çok parçanın işlevini tek parçada toplamak (parça konsolidasyonu) hem montaj adımını hem tolerans yığılmasını azaltır.
2. **Parçalar doğru konumu kendileri buluyor mu, yoksa konumu operatör mü belirliyor?** Parçanın yalnızca doğru konumda oturmasına izin veren geometriler (self-locating arayüzler), ölçüm ve dikkat bağımlılığını ortadan kaldırır.

### Sahadaki Problem: Ölçüye Bağımlı Montaj

Çelik konstrüksiyon yapılarda montajın klasik darboğazı ölçüdür. Parçalar düz yüzeyler ve simetrik delik gruplarıyla geldiğinde, doğru konum çizimden okunur, mastarla ölçülür ve kaynaktan önce sabitlenir. Bu akışta her birleşim noktası ayrı bir ölçüm, ayrı bir hata olasılığı ve ayrı bir tolerans katkısı demektir.

Sonuç tanıdıktır: tolerans yığılması (stack-up) birleşimden birleşime büyür; montaj süresi operatörün dikkatine ve deneyimine bağlı kalır; kaynaklı imalatta küçük hizalama sapmaları sonradan düzeltme işçiliği üretir. Bu zincirin sayısal tarafını [GD&T ve tolerans yığılması yazımızda](https://takt.tr/blog/geometrik-toleranslama-gdt) ayrıca ele alıyoruz.

### Çözüm: Geometriyi Referans Yapmak

Çözüm, ölçümü kolaylaştırmak değil, ölçüme gerek bırakmamaktı. Uygulamada üç DFA aracını birlikte kullandık:

- **Çok amaçlı tespit delikleri:** Aynı delik hem konumlama hem montaj referansı görevi görür; ek mastara gerek kalmaz.
- **Lazer kesimle markalama ve kodlama:** Profil ve sac parçalar, hangi parçanın nereye geldiğini gösteren markalarla kesilir; teknik resme dönüp bakma ihtiyacı azalır.
- **Referans oluşturan geometrik farklar:** İlk bakışta gereksiz görünen küçük asimetriler, parçanın tek bir doğru yönde takılmasını sağlar.

Bu arayüzler lazer kesimle tek operasyonda üretildiği için hizalama doğruluğu operatöre değil, kesim hassasiyetine bağlanır. Yanlış takılabilen parçayı geometriyle engelleme fikrinin sistematiği için [Poka-Yoke yazımıza](https://takt.tr/blog/poka-yoke-hata-onleyici-tasarim) bakabilirsiniz.

### Sonuç Ne Oldu?

Self-locating arayüzlerin çelik konstrüksiyona uygulanması şu sonuçları verdi:

- Ölçü almaya gerek kalmadan doğru montaj mümkün hale geldi.
- Tolerans yığılması belirgin şekilde azaldı.
- Kaynaklı imalat süresi kısaldı.
- Montaj, operatör deneyimine daha az bağımlı hale geldi.

Ar-Ge atölyesinden gelen geri bildirim bu sonucu doğruladı: üretim eskisine göre kolaylaştı, teknik resim okuma ihtiyacı azaldı, süreç olduğundan daha basit algılandı. İyi tasarlanmış bir arayüz, montajı yalnızca hızlandırmaz; üzerinde düşünülecek bir iş olmaktan çıkarır.

### DFA Yatırımı Ne Zaman Mantıklı?

DFA çok parçalı her üründe değer üretir; ama özellikle şu koşullarda fark yaratır:

- Montaj süresi operatörden operatöre değişiyorsa,
- Aynı hizalama/konumlama hatası tekrar ediyorsa,
- Kaynaklı imalatta düzeltme işçiliği kabarıyorsa.

Sınırını da söyleyelim: self-locating geometriler kesim ve büküm operasyonlarına küçük bir ek karmaşıklık getirir ve tek seferlik, düşük adetli işlerde bu yatırımın geri dönüşü sınırlı kalabilir. Kazanç, aynı yapının tekrar tekrar üretildiği işlerde birikir. Bir montaj adımı "dikkat gerektiriyor" diye işaretlendiğinde, asıl çözüm operatörü uyarmak değil, o adımı tasarımda dikkat gerektirmeyecek hale getirmektir. Üretim yöntemi tarafındaki ikizini, [DFM vaka çalışmamızda](https://takt.tr/blog/uretime-yonelik-tasarim-dfm) bulabilirsiniz.

---

**Montaj süreniz operatöre göre değişiyor, hata oranınız yüksek ya da kaynaklı imalatta düzeltme işçiliği çok mu fazla?** takt.tr olarak ürünlerinizi DFA gözüyle yeniden değerlendiriyor; parça sayısını, ölçüm bağımlılığını ve montaj süresini tasarım aşamasında düşürüyoruz. [İletişime geçin / Montaj tasarımı incelemesi talep edin.](https://takt.tr/iletisim)

## Kaynaklar

- [Boothroyd Dewhurst — Design for Manufacture and Assembly (DFMA) metodolojisi](https://www.dfma.com/)
