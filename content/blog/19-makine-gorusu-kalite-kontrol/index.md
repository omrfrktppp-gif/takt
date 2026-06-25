---
title: "Makine Görüşü ile Kalite Kontrol: Her Parçayı Denetlemek Değil, Kameraya Denetlettirmek"
description: "Yapay zeka destekli makine görüşü ile kalite kontrol nedir? Otomatik kusur tespitinin doğruluğu, sınırları ve örnekleme denetimine üstünlüğünü kaynaklarla anlatıyoruz."
slug: "makine-gorusu-kalite-kontrol"
date: 2026-06-26
updated: 2026-06-26
status: review
author: "Ömer Faruk"
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
reading_time: 6
---

## Makine Görüşü ile Kalite Kontrol: Her Parçayı Denetlemek Değil, Kameraya Denetlettirmek

Klasik kalite kontrolde her parçayı elle denetlemek çoğu zaman mümkün değildir; bu yüzden örnekleme yapılır. Örnekleme istatistiksel olarak savunulabilir, ama bir gerçeği de kabul eder: denetlenmeyen parçalar arasında kusurlu olanlar müşteriye ulaşabilir. İnsan denetçi ayrıca yorulur, dikkati dağılır ve aynı kusuru farklı kişiler farklı değerlendirir. Makine görüşü bu denklemi değiştirir: denetimi insandan alıp, yorulmayan ve tutarlı karar veren bir kamera-yazılım sistemine devreder.

Makine görüşü (Machine Vision) ile kalite kontrol, kameralarla alınan görüntüleri yapay zeka algoritmalarıyla analiz ederek parçalardaki kusurları otomatik tespit eden yöntemdir. Bu yazıda makine görüşünün ne olduğunu, ne kadar doğru çalıştığını, örnekleme denetimine göre üstünlüğünü ve sınırlarını kaynaklara dayanarak ele alıyoruz.

### Nasıl Çalışır?

Sistem üç katmandan oluşur: görüntüyü alan kameralar ve aydınlatma, görüntüyü işleyen algoritma ve kararı üretime aktaran arayüz. Geleneksel makine görüşü kural tabanlı çalışır (örneğin "şu boyut şu aralıkta olmalı"). Yapay zeka tabanlı sistemler ise derin öğrenme ile çalışır: çok sayıda örnek görüntüden kusurlu ve kusursuz parçayı ayırt etmeyi öğrenir. Bu, çizik, ezik, renk farkı, hizasızlık ve malzeme tutarsızlığı gibi kuralla tanımlaması zor kusurların yakalanmasını sağlar (Bosch; Automate.org).

Modern sistemlerin çözünürlüğü yüksektir. Sektör kaynaklarına göre yapay zeka destekli görsel denetim, 10 mikrondan 10 milimetreye kadar değişen boyutlardaki kusurları — çizik, ezik, renk bozulması, hizasızlık ve malzeme tutarsızlıkları dâhil — tespit edebilmektedir (Intelgic).

### Ne Kadar Doğru?

Akademik çalışmalar, yapay zeka tabanlı denetimin yüksek doğruluk seviyelerine ulaştığını gösterir. Döküm ürünlerin görüntüleri üzerinde yapılan bir derin öğrenme çalışmasında, önerilen modelin denetim doğruluğu %99,86 olarak raporlanmıştır (Artificial Intelligence-Based Smart Quality Inspection for Manufacturing, PMC/NCBI). Bu tür sonuçlar, doğru kurulan ve yeterli veriyle eğitilen sistemlerin insan denetçiyi tutarlılıkta geride bırakabileceğini gösterir; ancak doğruluğun veri kalitesine, aydınlatmaya ve eğitim setinin temsil gücüne bağlı olduğu unutulmamalıdır.

### Örnekleme Yerine %100 Denetim

Makine görüşünün asıl dönüştürücü yanı, denetimi örneklemden tam denetime taşıyabilmesidir. Bir kamera sistemi, hattan geçen her parçayı çevrim süresini yavaşlatmadan denetleyebilir. Bu, bir önceki FMEA yazımızda ele aldığımız "saptanabilirlik" boyutuna doğrudan dokunur: saptanması zor olduğu için yüksek risk taşıyan bir kusur, %100 otomatik denetimle saptanabilir hale geldiğinde riski düşer. Üstelik toplanan görüntü verisi, kusurların hangi sıklıkta ve nerede oluştuğunu göstererek sürecin kök nedenine işaret eder.

Bu noktada bir ilke önemlidir: en iyi çözüm kusuru daha iyi yakalamak değil, kusurun oluşmasını engellemektir. Makine görüşü kusurları güvenilir biçimde yakalar; ancak topladığı veri, sürecin ya da tasarımın düzeltilmesi için kullanıldığında asıl değerini üretir. Denetim, hatayı önleyen tasarımın (Poka-Yoke) yerine değil, tamamlayıcısı olarak en güçlüdür.

### Eleştirel Bakış ve Sınırlar

Makine görüşü her kalite problemini çözmez. Sistem, aydınlatma ve kamera açısı kötü kurulduğunda yanlış pozitif (sağlam parçayı kusurlu sayma) veya yanlış negatif (kusuru kaçırma) üretir. Derin öğrenme modelleri, eğitim setinde olmayan yeni bir kusur tipini tanımayabilir. Ayrıca yüzey altı kusurları, görsel olmayan özellikler (iç gerilme, sertlik) kamera ile görülemez; bunlar için farklı yöntemler gerekir. Bu yüzden makine görüşü, neyi denetleyebildiği net tanımlandığında ve düzenli doğrulandığında güvenilirdir.

### Sonuç

Makine görüşü ile kalite kontrol, denetimi insanın yorgunluğundan ve örneklemenin boşluklarından kurtarıp tutarlı, yüksek doğruluklu ve %100 kapsamlı hale getirebilir. Değeri yalnızca kusuru yakalamasında değil, ürettiği veriyle sürecin kök nedenine ışık tutmasındadır. Doğru kurulduğunda güçlü bir araçtır; ancak neyi göremeyeceğini bilmek, onu doğru kullanmanın ön koşuludur.

### Bu Yaklaşım Nerede Geçerli?

Yüksek adetli üretim, görsel kusurun kritik olduğu ürünler ve insan denetiminin yavaş ya da tutarsız kaldığı hatlar makine görüşünden en çok faydalanır. "Kusurları örnekleyerek mi yakalıyoruz, yoksa her parçayı denetleyebiliyor muyuz?" sorusu, bir değerlendirmenin başlangıç noktasıdır.

---

**Kalite kontrolünüz örneklemeye mi dayanıyor, görsel kusurlar müşteriye mi ulaşıyor?** takt.tr olarak makine görüşü tabanlı denetimi sürecinize entegre ediyor; hangi kusurların otomatik denetimle yakalanabileceğini belirleyip denetimi örneklemeden tam denetime taşıyoruz. [İletişime geçin / Kalite kontrol otomasyonu talep edin.](https://takt.tr/iletisim)

## Kaynaklar
- Artificial Intelligence-Based Smart Quality Inspection for Manufacturing (%99,86 denetim doğruluğu) — PMC / NCBI. https://pmc.ncbi.nlm.nih.gov/articles/PMC10058274/
- Machine Vision: AI driven visual inspection for manufacturing (10 mikron–10 mm kusur tespiti) — Intelgic. https://intelgic.com/machine-vision-system-AI
- Advancing Quality Control with AI-Powered Machine Vision — Automate.org. https://www.automate.org/blogs/advancing-quality-control-with-ai-powered-machine-vision
- AI Powered Quality Inspection (Whitepaper) — Bosch. https://www.bosch-softwaretechnologies.com/media/images/products/innovation/aiandbigdata/bosch_vqi_whitepaper.pdf
