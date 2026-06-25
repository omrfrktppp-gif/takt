---
title: "FMEA: Arızayı Onarmak Değil, Olmadan Öngörmek"
description: "FMEA (hata türü ve etki analizi) nedir? RPN ile riski sayısallaştırarak arızaları daha tasarım aşamasında öngörmenin yöntemini örnekle anlatıyoruz."
slug: "fmea-hata-turu-etki-analizi"
date: 2026-06-26
updated: 2026-06-26
status: review
author: "Ömer Faruk"
category: "Kalite İlkeleri"
tags: ["fmea", "rpn", "risk-analizi", "kalite", "onleyici-tasarim"]
keywords:
  primary: "FMEA hata türü etki analizi"
  secondary: ["FMEA nedir", "RPN hesaplama", "risk önceliklendirme", "önleyici tasarım"]
cover:
  src: "images/cover.jpg"
  alt: "FMEA tablosu ve RPN ile risk önceliklendirme şeması"
canonical: "https://takt.tr/blog/fmea-hata-turu-etki-analizi"
og:
  type: "article"
  image: "images/cover.jpg"
schema: "TechArticle"
reading_time: 5
---

## FMEA: Arızayı Onarmak Değil, Olmadan Öngörmek

Bir arıza sahada ortaya çıktığında onu onarmak pahalıdır: hat durur, parça değişir, güven sarsılır. Aynı arıza tasarım aşamasında öngörülseydi, maliyeti bir satır not kadardı. Aradaki fark, problemi ne zaman gördüğünüzdür. Arızayı onarmak ile öngörmek farklı disiplinlerdir; biri olduktan sonra tepki verir, diğeri olmadan önler.

FMEA (Failure Mode and Effects Analysis — Hata Türü ve Etkileri Analizi), bir ürün veya sürecin olası arıza biçimlerini, daha gerçekleşmeden sistematik olarak ortaya koyma yöntemidir. Bu yazıda FMEA'nın ne olduğunu, riski nasıl sayısallaştırdığını (RPN) ve önceliklendirmeyi nasıl objektif hale getirdiğini ele alıyoruz.

### FMEA Nedir?

FMEA, "bu parça/süreç nasıl bozulabilir ve bozulursa ne olur?" sorusunu sistematik olarak sorar. Her potansiyel arıza için üç şey değerlendirilir:

- **Şiddet (S):** Arıza olursa etkisi ne kadar ağır? (1–10)
- **Olasılık (O):** Bu arıza ne sıklıkta oluşur? (1–10)
- **Saptanabilirlik (D):** Arıza, müşteriye ulaşmadan ne kadar kolay yakalanır? (1–10; yakalanması zorsa yüksek)

FMEA tahmin değil, yapılandırılmış bir öngörüdür. Her arızayı aynı ölçekle değerlendirerek "içime sinmedi" hissini, üzerinde konuşulabilir bir sayıya çevirir.

### Riski Sayısallaştırmak: RPN

Üç değer çarpılarak Risk Öncelik Sayısı (Risk Priority Number) elde edilir:

`RPN = S × O × D`

Örneğin şiddeti yüksek (S=8), seyrek oluşan (O=2) ama saptanması zor (D=7) bir arıza:

`RPN = 8 × 2 × 7 = 112`

Buna karşılık sık oluşan ama zararsız ve kolay görülen bir arıza düşük RPN alır. Böylece ekip, "en gürültülü" probleme değil, gerçekten en riskli olana odaklanır. RPN'nin asıl değeri kesin bir sayı vermesi değil, riskleri aynı ölçekte sıralayıp önceliklendirmesidir.

### Saptanabilirlik: En Çok Atlanan Boyut

Şiddet ve olasılık sezgiseldir; saptanabilirlik çoğu zaman atlanır. Oysa bir arıza ne kadar geç fark edilirse o kadar pahalıdır. Burada Poka-Yoke ile FMEA birleşir: saptanması zor bir arızayı (yüksek D), onu fiziksel olarak imkânsız kılan bir geometriyle ele alırsanız, hem olasılığı hem saptanabilirlik riskini birden düşürürsünüz. FMEA nereye müdahale edileceğini gösterir; tasarım o müdahaleyi yapar.

### Sonuç

FMEA, kalitenin reaktif değil proaktif tarafıdır. Arızayı sahada onarmak yerine, daha tasarım masasındayken olası arızaları sıralar, sayısallaştırır ve en riskli olandan başlayarak önler. İyi yapılmış bir FMEA, "keşke bunu önceden düşünseydik" cümlesini ortadan kaldırmak için vardır.

### Bu Yaklaşım Nerede Geçerli?

Yeni bir ürün, yeni bir makine ya da kritik bir süreç devreye alınırken FMEA en yüksek değeri üretir. Saha arızası tekrar ediyorsa ya da bir ürünün güvenilirliği belirsizse, FMEA riski görünür ve yönetilebilir kılar.

---

**Yeni bir ürün ya da makine devreye alırken arıza riskini önceden görmek mi istiyorsunuz?** takt.tr olarak tasarım ve süreç FMEA çalışmaları yürütüyor; riskleri RPN ile önceliklendirip en kritik arızaları daha üretime girmeden tasarımda önlüyoruz. [İletişime geçin / FMEA çalışması talep edin.](https://takt.tr/iletisim)
