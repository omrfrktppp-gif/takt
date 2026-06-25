---
title: "Kestirimci Bakım: Arızada Durmak Değil, Arızadan Önce Durmak"
description: "Kestirimci bakım (predictive maintenance) nedir, plansız duruşu nasıl azaltır? Titreşim analizi, sensörleme ve gerçek vaka oranlarını kaynaklarla anlatıyoruz."
slug: "kestirimci-bakim"
date: 2026-06-26
updated: 2026-06-26
status: review
author: "Ömer Faruk"
category: "Mühendislik Trendleri"
tags: ["kestirimci-bakim", "predictive-maintenance", "titresim-analizi", "endustri-40", "bakim"]
keywords:
  primary: "kestirimci bakım (predictive maintenance)"
  secondary: ["kestirimci bakım nedir", "titreşim analizi", "plansız duruş", "öngörücü bakım"]
cover:
  src: "images/cover.jpg"
  alt: "Titreşim sensörüyle izlenen makine ve kestirimci bakım gösterge paneli"
canonical: "https://takt.tr/blog/kestirimci-bakim"
og:
  type: "article"
  image: "images/cover.jpg"
schema: "TechArticle"
reading_time: 6
---

## Kestirimci Bakım: Arızada Durmak Değil, Arızadan Önce Durmak

Bakım üç şekilde yapılır. Arıza olunca müdahale eden reaktif bakım en pahalısıdır, çünkü duruş plansız ve çoğu zaman en kötü anda gerçekleşir. Takvime bağlı önleyici bakım daha iyidir ama sağlam parçaları da gereksiz yere değiştirir. Kestirimci bakım ise üçüncü yolu açar: makineyi sürekli izleyip arızanın yaklaştığını verilerden okumak ve müdahaleyi tam zamanında planlamak. Amaç bakımı sıklaştırmak değil, doğru anı bulmaktır.

Kestirimci bakım (Predictive Maintenance — PdM), makinelerin durumunu sensörlerle sürekli izleyerek arıza belirtilerini erken yakalama ve bakımı plansız duruş oluşmadan planlama yaklaşımıdır. Bu yazıda kestirimci bakımın ne olduğunu, hangi verilere dayandığını, plansız duruşu ne kadar azaltabildiğini ve özellikle bir KOBİ için nereden başlanması gerektiğini kaynaklara dayanarak ele alıyoruz.

### Hangi Veriye Bakılır?

Kestirimci bakımın en yaygın ve olgun yöntemi titreşim analizidir. Dönen ekipmanlarda (motor, rulman, pompa, fan, dişli kutusu) gelişen arızalar, titreşim imzasında karakteristik değişiklikler bırakır; bu imza, arıza fiziksel olarak hissedilir hale gelmeden önce okunabilir (Advanced Technology Services; Newark). Titreşimin yanında sıcaklık (termografi), yağ analizi, akustik emisyon ve motor akımı gibi veriler de kullanılır. Ortak mantık aynıdır: bozulma, bir noktada ölçülebilir bir sinyal üretir ve bu sinyal arızadan önce yakalanabilir.

Burada kritik olan, ham veriyi anlamlı bir eşiğe bağlamaktır. Tek bir ölçüm değil, zaman içindeki eğilim önemlidir; bir rulmanın titreşim seviyesinin yavaşça yükselmesi, yaklaşan bir arızanın en güvenilir işaretlerinden biridir.

### Plansız Duruşu Ne Kadar Azaltır?

Kestirimci bakımın değeri, somut duruş azalmalarıyla ölçülür. General Electric'in bir vaka çalışması, kestirimci bakımın plansız duruşu %50'ye kadar azaltabildiğini bildirir (GE Digital, TechRxiv üzerinden aktarılmıştır). Başka bir uygulama vakası, kestirimci bakım analitiğiyle duruşların %30 azaldığını ve varlık güvenilirliğinin arttığını rapor eder (Oxmaint). Bu oranlar işletmeye, ekipmana ve uygulamanın olgunluğuna göre değişir; ancak yön tutarlıdır: doğru kurulmuş bir kestirimci bakım programı, plansız duruşu belirgin biçimde düşürür (Advanced Technology Services).

Bu kazanç yalnızca duruş süresinden gelmez. Arızanın erken yakalanması, küçük bir parçanın büyük bir hasara yol açmadan değiştirilmesini; bakımın hafta sonu veya planlı duruşa kaydırılmasını; ve yedek parça stokunun ihtiyaca göre yönetilmesini sağlar.

### KOBİ İçin Nereden Başlamalı?

Kestirimci bakım, tüm fabrikayı bir anda sensörle donatmayı gerektirmez. Tersine, en akıllıca başlangıç hedeflidir (IMEC). İlk adım, hangi makinenin durmasının en pahalı olduğunu belirlemektir: darboğaz makine, yedeği olmayan ekipman ya da arızası tüm hattı durduran kritik birim. İzleme önce bu makineye kurulur. Yatırımın geri dönüşü burada en yüksektir, çünkü önlenen tek bir plansız duruş bile sensör maliyetini fazlasıyla karşılayabilir.

Bu yaklaşım, daha önce ele aldığımız Kaizen mantığıyla örtüşür: büyük bir dönüşüm yerine, en kritik noktadan başlayan ölçülebilir bir adım. Sensörleme yaygınlaştıkça, toplanan veri zamanla makinelerin gerçek davranışını öğreten bir tasarım girdisine de dönüşür.

### Eleştirel Bakış

Kestirimci bakım sihirli değildir. Yanlış yere konmuş sensör, kötü kalibre edilmiş eşik ya da yorumlanmayan veri, maliyet üretir ama fayda getirmez. Veri toplamak ile karar üretmek farklı şeylerdir; bir gösterge paneli, ona bakıp harekete geçen bir süreç olmadan değer üretmez. Bu yüzden kestirimci bakım bir cihaz değil, bir disiplindir: ölç, yorumla, müdahaleyi planla.

### Sonuç

Kestirimci bakım, bakımı arızaya tepki olmaktan çıkarıp veriye dayalı bir öngörüye dönüştürür. Doğru makinede, doğru veriyle kurulduğunda plansız duruşu belirgin biçimde azaltır ve bakımı planlanabilir kılar. Değeri, sürekli izlemenin kendisinde değil, izlemenin ürettiği zamanında karardadır.

### Bu Yaklaşım Nerede Geçerli?

Durması pahalı, yedeği olmayan ya da arızası tüm hattı durduran kritik makineler kestirimci bakımdan en çok faydalanır. "Bu makine durduğunda bana kaça mal oluyor?" sorusu, nereden başlanacağını belirleyen ilk sorudur.

---

**Kritik bir makinenizin plansız duruşları üretiminizi mi vuruyor?** takt.tr olarak en kritik ekipmanınızdan başlayarak sensörleme ve kestirimci bakım stratejisi kuruyor; izlemeyi yatırımın en hızlı geri döndüğü noktaya odaklıyoruz. [İletişime geçin / Bakım stratejisi desteği talep edin.](https://takt.tr/iletisim)

## Kaynaklar
- Application of Predictive Maintenance in Manufacturing (GE Digital vaka aktarımı, %50 duruş azalması) — TechRxiv, 2024. https://www.techrxiv.org/doi/10.36227/techrxiv.173532375.50630906
- Reducing Downtime by 30 Percent with Predictive Maintenance — Oxmaint Case Study. https://oxmaint.com/case-study/post/predictive-maintenance-downtime-reduction
- Utilizing Vibration Analysis for Predictive Maintenance — Advanced Technology Services. https://www.advancedtech.com/blog/what-is-vibration-analysis-in-predictive-maintenance/
- From Downtime to Uptime: Using AI for Predictive Maintenance in Manufacturing (KOBİ uygulaması) — IMEC. https://www.imec.org/from-downtime-to-uptime-using-ai-for-predictive-maintenance-in-manufacturing/
