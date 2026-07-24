---
title: "FMEA: Arızayı Onarmak Değil, Olmadan Öngörmek"
description: "FMEA (hata türü ve etki analizi) nedir? RPN ile riski sayısallaştırarak arızaları daha tasarım aşamasında öngörmenin yöntemini örnekle anlatıyoruz."
slug: "fmea-hata-turu-etki-analizi"
date: 2026-04-16
updated: 2026-07-25
status: published
kind: article
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
reading_time: 6
---

## FMEA: Arızayı Onarmak Değil, Olmadan Öngörmek

FMEA (Failure Mode and Effects Analysis — Hata Türü ve Etkileri Analizi), [bir ürün veya sürecin olası arıza biçimlerini daha gerçekleşmeden sistematik olarak ortaya koyan, adım adım ilerleyen bir risk analizi yöntemidir](https://asq.org/quality-resources/fmea). Her potansiyel arıza; şiddet, olasılık ve saptanabilirlik boyutlarında puanlanır, riskler aynı ölçekte sıralanır ve en riskli olandan başlanarak önlem alınır.

Neden değerli? Bir arıza sahada ortaya çıktığında onu onarmak pahalıdır: hat durur, parça değişir, güven sarsılır. Aynı arıza tasarım aşamasında öngörülseydi, maliyeti bir satır not kadardı. Aradaki fark, problemi ne zaman gördüğünüzdür.

### FMEA Hangi Soruları Sorar?

FMEA, "bu parça/süreç nasıl bozulabilir ve bozulursa ne olur?" sorusunu sistematik olarak sorar. Her potansiyel arıza için üç şey değerlendirilir:

| Boyut | Soru | Ölçek |
| --- | --- | --- |
| Şiddet (S) | Arıza olursa etkisi ne kadar ağır? | 1–10 |
| Olasılık (O) | Bu arıza ne sıklıkta oluşur? | 1–10 |
| Saptanabilirlik (D) | Müşteriye ulaşmadan ne kadar kolay yakalanır? | 1–10 (yakalanması zorsa yüksek) |

FMEA tahmin değil, yapılandırılmış bir öngörüdür. Her arızayı aynı ölçekle değerlendirerek "içime sinmedi" hissini, üzerinde konuşulabilir bir sayıya çevirir.

### RPN Nasıl Hesaplanır?

Üç değer çarpılarak Risk Öncelik Sayısı (Risk Priority Number) elde edilir:

`RPN = S × O × D`

Örneğin şiddeti yüksek (S=8), seyrek oluşan (O=2) ama saptanması zor (D=7) bir arıza:

`RPN = 8 × 2 × 7 = 112`

Buna karşılık sık oluşan ama zararsız ve kolay görülen bir arıza düşük RPN alır. Böylece ekip, "en gürültülü" probleme değil, gerçekten en riskli olana odaklanır. RPN'nin asıl değeri kesin bir sayı vermesi değil, riskleri aynı ölçekte sıralayıp önceliklendirmesidir.

Güncel bir not: otomotiv tarafında 2019'da yayımlanan [AIAG & VDA FMEA El Kitabı](https://www.aiag.org/training-and-resources/manuals/details/FMEAAV-1), RPN yerine Aksiyon Önceliği (Action Priority — AP) tablolarını getirdi; AP, üç puanı eşit ağırlıkla çarpmak yerine önce şiddeti, sonra olasılığı ve saptanabilirliği gözeterek H/M/L öncelik atar. Otomotiv tedarik zincirinde çalışıyorsanız müşterinizin hangi metodolojiyi beklediğini netleştirmek gerekir; RPN'nin "iki farklı risk profili aynı sayıyı üretebilir" zafiyeti, bu geçişin ana gerekçesidir.

### Saptanabilirlik: En Çok Atlanan Boyut

Şiddet ve olasılık sezgiseldir; saptanabilirlik çoğu zaman atlanır. Oysa bir arıza ne kadar geç fark edilirse o kadar pahalıdır. Burada [Poka-Yoke](https://takt.tr/blog/poka-yoke-hata-onleyici-tasarim) ile FMEA birleşir: saptanması zor bir arızayı (yüksek D), onu fiziksel olarak imkânsız kılan bir geometriyle ele alırsanız, hem olasılığı hem saptanabilirlik riskini birden düşürürsünüz. FMEA nereye müdahale edileceğini gösterir; tasarım o müdahaleyi yapar.

### Sınırları Nedir?

FMEA'nın kalitesi, masaya oturan ekibin bilgisiyle sınırlıdır: kimsenin aklına gelmeyen arıza tabloya girmez. Puanlama öznellik taşır; aynı arızaya iki ekip farklı S-O-D verebilir. Bu yüzden FMEA tek seferlik bir belge değil, saha verisiyle beslenen yaşayan bir doküman olarak yönetilmelidir — sahadan gelen her yeni arıza türü tabloya işlenmeli, alınan önlemler sonrası puanlar güncellenmelidir. Sahadan veri toplamanın sistematiği için [kestirimci bakım yazımıza](https://takt.tr/blog/kestirimci-bakim) bakabilirsiniz.

### Ne Zaman Yapılmalı?

Yeni bir ürün, yeni bir makine ya da kritik bir süreç devreye alınırken FMEA en yüksek değeri üretir. Saha arızası tekrar ediyorsa ya da bir ürünün güvenilirliği belirsizse, FMEA riski görünür ve yönetilebilir kılar.

---

**Yeni bir ürün ya da makine devreye alırken arıza riskini önceden görmek mi istiyorsunuz?** takt.tr olarak tasarım ve süreç FMEA çalışmaları yürütüyor; riskleri önceliklendirip en kritik arızaları daha üretime girmeden tasarımda önlüyoruz. [İletişime geçin / FMEA çalışması talep edin.](https://takt.tr/iletisim)

## Kaynaklar

- [Failure Mode and Effects Analysis (FMEA) — American Society for Quality (ASQ)](https://asq.org/quality-resources/fmea)
- [AIAG & VDA FMEA Handbook — Automotive Industry Action Group](https://www.aiag.org/training-and-resources/manuals/details/FMEAAV-1)
