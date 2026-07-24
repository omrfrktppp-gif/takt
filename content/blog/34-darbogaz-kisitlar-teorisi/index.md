---
title: "Darboğaz Yönetimi (Kısıtlar Teorisi): Her İstasyonu Hızlandırmak Değil, Darboğazı Çözmek"
description: "Kısıtlar Teorisi (TOC) nedir, darboğaz nasıl bulunur? Bir hattın hızını neden en yavaş istasyonun belirlediği ve beş adımlı iyileştirme döngüsü."
slug: "darbogaz-kisitlar-teorisi"
date: 2026-07-03
updated: 2026-07-25
status: review
kind: article
author: "Ömer Faruk Top"
category: "Mühendislik Trendleri"
tags: ["darbogaz", "kisitlar-teorisi", "theory-of-constraints", "surec-optimizasyonu", "verimlilik"]
keywords:
  primary: "darboğaz yönetimi (kısıtlar teorisi)"
  secondary: ["kısıtlar teorisi nedir", "theory of constraints", "darboğaz analizi", "throughput artırma"]
cover:
  src: "images/cover.jpg"
  alt: "Üretim hattında darboğaz istasyonu ve akışı gösteren kısıtlar teorisi şeması"
canonical: "https://takt.tr/blog/darbogaz-kisitlar-teorisi"
og:
  type: "article"
  image: "images/cover.jpg"
schema: "TechArticle"
reading_time: 6
---

## Darboğaz Yönetimi (Kısıtlar Teorisi): Her İstasyonu Hızlandırmak Değil, Darboğazı Çözmek

Bir üretim hattının çıktısını en yavaş istasyonu belirler; bu yüzden verimliliği artırmanın yolu her istasyonu birden hızlandırmak değil, o tek noktayı — darboğazı — bulup çözmektir. Darboğaz dışındaki bir istasyonu hızlandırmak hattın toplam çıktısını değiştirmez; yalnızca darboğazın önünde daha çok yarı mamul biriktirir. Bu yaklaşımın sistematik adı, Eliyahu Goldratt'ın geliştirdiği [Kısıtlar Teorisi'dir (Theory of Constraints — TOC)](https://www.tocinstitute.org/theory-of-constraints.html): bir sistemin performansı, onu sınırlayan tek bir kısıt tarafından belirlenir.

Çıktıyı artırmak isteyen işletmenin refleksi çoğu zaman geneldir: daha hızlı tezgâh, daha çok operatör, her yerde daha kısa çevrim. TOC bu refleksi tersine çevirir — önce kısıtı bul, gücünü oraya yoğunlaştır.

## Darboğaz Neden Belirleyici?

Bir hat ardışık istasyonlardan oluşur ve her istasyonun bir çevrim süresi vardır. Ürünler darboğazdan ancak onun hızında geçebildiği için, diğer istasyonlar ne kadar hızlı olursa olsun hattın çıktı hızını (throughput) en uzun çevrim süreli istasyon belirler. Kısıtı bulmanın pratik yollarından biri, [Lean Production'ın TOC rehberinin](https://www.leanproduction.com/theory-of-constraints/) önerdiği gibi ekipman performans verisinden en uzun ortalama çevrim süreli istasyonu tespit etmektir; birikmiş ara stok yığını da darboğazın görsel işaretidir.

Zaten ölçüm altyapınız varsa iş kolaylaşır: [OEE ve makine izleme yazımızda](https://takt.tr/blog/akilli-fabrika-kobi) anlattığımız veri, darboğaz tespitinin doğrudan girdisidir.

## Yanlış Yere Yapılan İyileştirme Neden Boşa Gider?

TOC'un en çarpıcı sonucu şudur: darboğaz dışındaki iyileştirme, sistemin toplam çıktısını artırmaz. Daha hızlı bir ön istasyon yalnızca darboğazın önünde ara stok biriktirir — [muda yazımızdaki](https://takt.tr/blog/muda-yedi-israf) "fazla üretim" ve "stok" israflarının ta kendisi. Goldratt'ın ilkesi bunu özetler: darboğazda kaybedilen bir saat tüm sistemde kaybedilen bir saattir; darboğaz olmayan istasyonda kazanılan bir saat ise çoğu zaman yanılsamadır. İyileştirme bütçesi ve mühendislik eforu, sistemin geneline yayılmak yerine darboğaza yoğunlaştırılmalıdır.

## Beş Adımlı Döngü Nasıl İşler?

[TOC'un beş odaklanma adımı](https://www.tocinstitute.org/theory-of-constraints.html) sürekli iyileştirme döngüsü tanımlar:

| Adım | Ne yapılır? |
| --- | --- |
| 1. Belirle | Sistemin kısıtını (darboğazı) tespit et |
| 2. Sömür | Darboğazı mevcut haliyle en verimli işlet; bir an bile boş bırakma |
| 3. Tabi kıl | Diğer istasyonları darboğazın ritmine ayarla; ne aç bırak ne önünde gereksiz stok biriktir |
| 4. Yükselt | Gerekirse kapasiteyi artır: yatırım, ek vardiya, süreç iyileştirme |
| 5. Tekrarla | Darboğaz çözülünce yenisi başka yere kayar; döngüyü baştan başlat |

Sıralama önemlidir: yatırım (yükseltme) son adımdır. Çoğu darboğaz, para harcamadan — ayar sürelerini kısaltarak, molaları kaydırarak, darboğaza kaliteli parça besleyerek — rahatlar. Döngü, [Kaizen yazımızdaki](https://takt.tr/blog/kaizen-surekli-iyilestirme) sürekli iyileştirme mantığıyla örtüşür; farkı, iyileştirmeyi her yere değil sistemi gerçekten sınırlayan tek noktaya odaklamasıdır. [Lean Enterprise Institute'un karşılaştırması](https://www.lean.org/the-lean-post/articles/what-is-the-theory-of-constraints-and-how-does-it-compare-to-lean-thinking/), TOC ile yalın düşüncenin bu tamamlayıcılığını ayrıntılı ele alır.

## Darboğaz Her Zaman Bir Makine mi?

Hayır — ve bu, yöntemin en sık gözden kaçan yanıdır. Darboğaz bazen bir onay süreci, bir politika ("her parti müdür imzası bekler"), bir tedarik kısıtı ya da tek bir kritik operatörün bilgisidir. Makine verisinde görünmeyen bu kısıtlar, ancak akışın uçtan uca izlenmesiyle bulunur. Ayrıca darboğaz çözüldüğünde yenisi ortaya çıkar; TOC tek seferlik bir proje değil, süreklilik gerektiren bir bakış açısıdır.

Uyarı işaretleri tanıdıktır: "Çok çalışıyoruz ama çıktı artmıyor", belirli bir istasyonun önünde sürekli yığılma, hattın sonunda sürekli bekleyen montaj. Bunların her biri, tespit edilmemiş bir darboğazın işaretidir.

## Sonuç

Kısıtlar Teorisi, verimliliği artırmanın her yeri hızlandırmak değil, sistemi sınırlayan tek noktayı bulup çözmek olduğunu gösterir. Bir hat en yavaş istasyonu kadar hızlıdır; darboğaz dışındaki iyileştirme çoğu zaman boşa emek, hatta ara stok israfıdır. Doğru sıra: kısıtı belirle, onu en verimli kullan, diğerlerini ona tabi kıl, gerekiyorsa yatırımla yükselt — ve döngüyü tekrarla.

---

**Çok çalıştığınız halde üretim çıktınız mı artmıyor, hep aynı noktada mı tıkanıyorsunuz?** Takt olarak hattınızı Kısıtlar Teorisi ile inceliyor; gerçek darboğazı tespit edip iyileştirme kaynağınızı çıktıyı gerçekten artıracak noktaya yönlendiriyoruz. [Üretim danışmanlığı hizmetimize](https://takt.tr/hizmetler/uretim-danismanligi) göz atın veya [iletişime geçin](https://takt.tr/iletisim).

## Kaynaklar

- [Theory of Constraints of Eliyahu M. Goldratt — TOC Institute](https://www.tocinstitute.org/theory-of-constraints.html) (kısıt kavramı ve beş odaklanma adımı)
- [Theory of Constraints (TOC) — Lean Production](https://www.leanproduction.com/theory-of-constraints/) (çevrim süresi verisiyle darboğaz tespiti)
- [What is the Theory of Constraints, and How Does it Compare to Lean Thinking? — Lean Enterprise Institute](https://www.lean.org/the-lean-post/articles/what-is-the-theory-of-constraints-and-how-does-it-compare-to-lean-thinking/) (TOC ve yalın düşüncenin karşılaştırması)
