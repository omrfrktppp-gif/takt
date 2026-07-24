---
title: "Makine Görüşü ile Kalite Kontrol: Her Parçayı Denetlemek Değil, Kameraya Denetlettirmek"
description: "Makine görüşü ile kalite kontrol nedir, ne kadar doğrudur? Örnekleme ile %100 denetim farkı, sistem sınırları ve yatırım kararı için pratik bir rehber."
slug: "makine-gorusu-kalite-kontrol"
date: 2026-05-19
updated: 2026-07-25
status: published
kind: article
author: "Ömer Faruk Top"
category: "Mühendislik Trendleri"
tags: ["makine-gorusu", "yapay-zeka", "kalite-kontrol", "kusur-tespiti", "endustri-40"]
keywords:
  primary: "makine görüşü ile kalite kontrol"
  secondary: ["makine görüşü nedir", "yapay zeka kalite kontrol", "otomatik kusur tespiti", "computer vision üretim"]
cover:
  src: "images/cover.jpg"
  alt: "Üretim hattında parçaları denetleyen yapay zeka destekli makine görüşü kamerası"
canonical: "https://takt.tr/blog/makine-gorusu-kalite-kontrol"
og:
  type: "article"
  image: "images/cover.jpg"
schema: "TechArticle"
reading_time: 7
---

## Makine Görüşü ile Kalite Kontrol: Her Parçayı Denetlemek Değil, Kameraya Denetlettirmek

Makine görüşü (machine vision) ile kalite kontrol, kameralarla alınan görüntüleri görüntü işleme veya yapay zekâ algoritmalarıyla analiz ederek parçalardaki kusurları otomatik tespit eden yöntemdir. İnsan denetçinin yorulduğu, dikkatinin dağıldığı ve aynı kusuru farklı kişilerin farklı değerlendirdiği yerde; kamera-yazılım sistemi yorulmadan, tutarlı kararlarla ve gerekirse hattan geçen her parçayı denetleyerek çalışır. Bu yazıda yöntemin nasıl çalıştığını, ne kadar doğru olduğunu, örnekleme denetimine göre farkını ve — en az bunlar kadar önemlisi — sınırlarını ele alıyoruz.

Klasik kalite kontrolde her parçayı elle denetlemek çoğu zaman mümkün değildir; bu yüzden örnekleme yapılır. Örnekleme, [ISO 2859-1](https://www.iso.org/standard/85464.html) gibi uluslararası standartlarla tanımlanmış, istatistiksel olarak savunulabilir bir yaklaşımdır; ama bir gerçeği de kabul eder: denetlenmeyen parçalar arasındaki kusurlular müşteriye ulaşabilir. Makine görüşü bu denklemi değiştirir.

## Makine Görüşü Sistemi Nasıl Çalışır?

Sistem üç katmandan oluşur: görüntüyü alan kameralar ve aydınlatma, görüntüyü işleyen algoritma ve kararı üretime aktaran arayüz. İki temel yaklaşım vardır:

| Yaklaşım | Nasıl karar verir? | Nerede güçlü? |
| --- | --- | --- |
| Kural tabanlı görüntü işleme | Önceden tanımlı ölçü ve eşiklerle ("şu boyut şu aralıkta olmalı") | Ölçüsel kontrol, varlık/yokluk kontrolü, tekrarlanabilir sahneler |
| Derin öğrenme tabanlı | Çok sayıda örnek görüntüden kusurlu/kusursuz ayrımını öğrenir | Çizik, ezik, renk farkı, doku bozukluğu gibi kuralla tanımlaması zor kusurlar |

Derin öğrenme tabanlı görsel denetimin sanayi uygulamaları ve kurulum gereksinimleri, [Bosch'un görsel kalite denetimi teknik raporunda](https://www.bosch-softwaretechnologies.com/media/images/products/innovation/aiandbigdata/bosch_vqi_whitepaper.pdf) ayrıntılı anlatılır: eğitim verisinin kalitesi, aydınlatmanın kararlılığı ve kusur örneklerinin temsil gücü, sistemin başarısını belirleyen ana etkenlerdir.

## Ne Kadar Doğru?

Akademik çalışmalar, doğru kurulan yapay zekâ tabanlı denetimin yüksek doğruluğa ulaşabildiğini gösteriyor. Döküm parça görüntüleri üzerinde yapılan hakemli bir çalışmada, önerilen derin öğrenme modelinin denetim doğruluğu [%99,86 olarak raporlanmıştır](https://pmc.ncbi.nlm.nih.gov/articles/PMC10058274/). Bu tür sonuçlar, yeterli ve temsili veriyle eğitilen sistemlerin insan denetçiyi tutarlılıkta geçebileceğini gösterir; ancak bu doğruluk laboratuvar koşullarının değil, o çalışmadaki veri setinin sonucudur. Kendi hattınızdaki doğruluk; aydınlatmaya, kamera açısına ve eğitim setinizin gerçek kusur dağılımını ne kadar temsil ettiğine bağlıdır.

## Örnekleme mi, %100 Denetim mi?

Makine görüşünün asıl dönüştürücü yanı, denetimi örneklemden tam denetime taşıyabilmesidir. Bir kamera sistemi, hattan geçen her parçayı çevrim süresini yavaşlatmadan denetleyebilir. Bu, [FMEA yazımızda](https://takt.tr/blog/fmea-hata-turu-etki-analizi) ele aldığımız "saptanabilirlik" boyutuna doğrudan dokunur: saptanması zor olduğu için yüksek risk taşıyan bir kusur, %100 otomatik denetimle saptanabilir hale geldiğinde riski düşer. Üstelik toplanan görüntü verisi, kusurların hangi sıklıkta ve nerede oluştuğunu göstererek kök nedene işaret eder.

Bu noktada bir ilke önemlidir: en iyi çözüm kusuru daha iyi yakalamak değil, kusurun oluşmasını engellemektir. Denetim, [hatayı önleyen tasarımın (Poka-Yoke)](https://takt.tr/blog/poka-yoke-hata-onleyici-tasarim) yerine değil, tamamlayıcısı olarak en güçlüdür.

## Sınırları Neler?

Makine görüşü her kalite problemini çözmez:

- **Kurulum hassasiyeti:** Aydınlatma ve kamera açısı kötü kurulduğunda sistem yanlış pozitif (sağlam parçayı kusurlu sayma) veya yanlış negatif (kusuru kaçırma) üretir.
- **Bilinmeyen kusurlar:** Derin öğrenme modeli, eğitim setinde hiç görmediği yeni bir kusur tipini tanımayabilir.
- **Görsel olmayan özellikler:** Yüzey altı kusurları, iç gerilme ve sertlik kamerayla görülemez; bunlar için farklı muayene yöntemleri gerekir.
- **Sürdürme maliyeti:** Ürün veya proses değiştikçe modelin yeniden eğitilmesi ve düzenli doğrulanması gerekir.

Bu yüzden makine görüşü, neyi denetleyebildiği net tanımlandığında ve periyodik olarak doğrulandığında güvenilirdir.

## Hangi Durumda Yatırım Mantıklı?

| Durum | Makine görüşü uygun mu? |
| --- | --- |
| Yüksek adetli, tekrarlı üretim; görsel kusur kritik | Güçlü aday |
| İnsan denetimi yavaş, tutarsız veya darboğaz | Güçlü aday |
| Sık ürün değişimi, küçük partiler | Dikkat: her üründe yeniden ayar/eğitim maliyeti var |
| Kusurlar görsel değil (iç gerilme, sertlik, sızdırmazlık) | Uygun değil; farklı muayene yöntemi gerekir |
| Kusur kaynağı bilinen bir proses hatası | Önce prosesi düzeltmek daha ekonomik olabilir |

Değerlendirmeye başlarken şu soruların cevabını hazırlamak süreci hızlandırır: Hangi kusur tipleri müşteriye ulaşıyor? Mevcut denetim nasıl yapılıyor ve dakikada kaç parça geçiyor? Kusurlu/kusursuz örnek görüntüler toplanabilir mi? Bu bilgiler, sistemin kural tabanlı mı yoksa öğrenme tabanlı mı kurulacağını belirler.

## Sonuç

Makine görüşü ile kalite kontrol, denetimi insanın yorgunluğundan ve örneklemenin boşluklarından kurtarıp tutarlı ve %100 kapsamlı hale getirebilir. Değeri yalnızca kusuru yakalamasında değil, ürettiği veriyle sürecin kök nedenine ışık tutmasındadır. Doğru kurulduğunda güçlü bir araçtır; ancak neyi göremeyeceğini bilmek, onu doğru kullanmanın ön koşuludur.

---

**Kalite kontrolünüz örneklemeye mi dayanıyor, görsel kusurlar müşteriye mi ulaşıyor?** Takt olarak hangi kusurların otomatik denetimle yakalanabileceğini belirliyor, denetimi örneklemeden tam denetime taşıyan fizibiliteyi sizinle birlikte kuruyoruz. [Üretim danışmanlığı hizmetimize](https://takt.tr/hizmetler/uretim-danismanligi) göz atın veya [iletişime geçin](https://takt.tr/iletisim).

## Kaynaklar

- [Artificial Intelligence-Based Smart Quality Inspection for Manufacturing — PMC / NCBI](https://pmc.ncbi.nlm.nih.gov/articles/PMC10058274/) (derin öğrenme ile %99,86 denetim doğruluğu raporlayan hakemli çalışma)
- [AI Powered Visual Quality Inspection (Whitepaper) — Bosch Software Technologies](https://www.bosch-softwaretechnologies.com/media/images/products/innovation/aiandbigdata/bosch_vqi_whitepaper.pdf) (derin öğrenme tabanlı görsel denetim kurulum gereksinimleri)
- [ISO 2859-1:2026 — Sampling procedures for inspection by attributes](https://www.iso.org/standard/85464.html) (örnekleme denetiminin uluslararası standardı)
