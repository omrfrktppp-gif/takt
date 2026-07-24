---
title: "Kestirimci Bakım: Arızada Durmak Değil, Arızadan Önce Durmak"
description: "Kestirimci bakım (predictive maintenance) nedir, plansız duruşu nasıl azaltır? Titreşim analizi, sensörleme ve resmî kaynaklı oranlarla anlatıyoruz."
slug: "kestirimci-bakim"
date: 2026-05-16
updated: 2026-07-25
status: review
kind: article
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

Kestirimci bakım (Predictive Maintenance — PdM), makinelerin durumunu sensörlerle sürekli izleyerek arıza belirtilerini erken yakalayan ve bakımı plansız duruş oluşmadan planlayan yaklaşımdır. Etkisi resmî kaynaklarla belgelidir: [ABD Enerji Bakanlığı'nın Bakım ve İşletme En İyi Uygulamalar Rehberi (PNNL-19634)](https://www.pnnl.gov/main/publications/external/technical_reports/PNNL-19634.pdf), işleyen bir kestirimci bakım programının sektör ortalamasında duruşları %35–45, bakım maliyetlerini %25–30 azalttığını ve arızaların %70–75'ini ortadan kaldırdığını aktarır.

Bakım üç şekilde yapılır ve fark maliyettir:

| Yaklaşım | Mantık | Zayıf yanı |
| --- | --- | --- |
| Reaktif | Arıza olunca müdahale | Duruş plansızdır ve en kötü anda gelir |
| Önleyici (takvimli) | Belirli aralıklarla parça değişimi | Sağlam parçalar da gereksiz değişir |
| Kestirimci | Ölçülen duruma göre, tam zamanında müdahale | Sensör, veri ve disiplin yatırımı ister |

Aynı DOE rehberi, kestirimci bakımın yalnızca takvimli önleyici bakıma kıyasla bile %8–12 ek tasarruf sağlayabildiğini belirtir. Amaç bakımı sıklaştırmak değil, doğru anı bulmaktır.

### Hangi Veriye Bakılır?

Kestirimci bakımın en yaygın ve olgun yöntemi titreşim analizidir. Dönen ekipmanlarda (motor, rulman, pompa, fan, dişli kutusu) gelişen arızalar, titreşim imzasında karakteristik değişiklikler bırakır; makine titreşiminin ölçümü ve değerlendirilmesi için genel çerçeveyi [ISO 20816-1 standardı](https://www.iso.org/standard/63180.html) tanımlar. Titreşimin yanında sıcaklık (termografi), yağ analizi, akustik emisyon ve motor akımı gibi veriler de kullanılır; [DOE rehberi](https://www.pnnl.gov/main/publications/external/technical_reports/PNNL-19634.pdf) bu teknolojileri sistematik olarak listeler. Ortak mantık aynıdır: bozulma, ölçülebilir bir sinyal üretir ve bu sinyal arızadan önce yakalanabilir.

Kritik olan, ham veriyi anlamlı bir eşiğe bağlamaktır. Tek bir ölçüm değil, zaman içindeki eğilim önemlidir; bir rulmanın titreşim seviyesinin yavaşça yükselmesi, yaklaşan arızanın en güvenilir işaretlerinden biridir.

### KOBİ İçin Nereden Başlamalı?

Kestirimci bakım, tüm fabrikayı bir anda sensörle donatmayı gerektirmez. En akıllıca başlangıç hedeflidir: hangi makinenin durması en pahalı? Darboğaz makine, yedeği olmayan ekipman ya da arızası tüm hattı durduran kritik birim. İzleme önce bu makineye kurulur; önlenen tek bir plansız duruş bile sensör maliyetini fazlasıyla karşılayabilir. [DOE rehberinin aktardığı sektör ortalaması yatırım getirisi 10 kata kadar çıkar](https://www.pnnl.gov/main/publications/external/technical_reports/PNNL-19634.pdf) — ama bu ortalamalar iyi kurulmuş programlar içindir; kötü kurulan program bu getiriyi vermez.

Bu yaklaşım, [Kaizen mantığıyla](https://takt.tr/blog/kaizen-surekli-iyilestirme) örtüşür: büyük bir dönüşüm yerine, en kritik noktadan başlayan ölçülebilir bir adım. Sensörleme yaygınlaştıkça, toplanan veri zamanla makinelerin gerçek davranışını öğreten bir tasarım girdisine de dönüşür; bu verinin sanal modelle buluştuğu nokta [dijital ikizdir](https://takt.tr/blog/dijital-ikiz).

### Nerede Yanlış Gider?

Kestirimci bakım sihirli değildir. Yanlış yere konmuş sensör, kötü kalibre edilmiş eşik ya da yorumlanmayan veri, maliyet üretir ama fayda getirmez. Veri toplamak ile karar üretmek farklı şeylerdir; bir gösterge paneli, ona bakıp harekete geçen bir süreç olmadan değer üretmez. Yukarıdaki yüzde aralıkları da sektör ortalamalarıdır — kendi tesisinizde gerçekleşecek kazanç; ekipman kritikliğine, mevcut bakım olgunluğuna ve verinin gerçekten karara bağlanıp bağlanmadığına göre değişir. Kestirimci bakım bir cihaz değil, bir disiplindir: ölç, yorumla, müdahaleyi planla.

### Ne Zaman Öncelikli?

Durması pahalı, yedeği olmayan ya da arızası tüm hattı durduran kritik makineler kestirimci bakımdan en çok faydalanır. "Bu makine durduğunda bana kaça mal oluyor?" sorusu, nereden başlanacağını belirleyen ilk sorudur. Hangi arızanın önce izleneceğini sistematik seçmek için [FMEA yazımızdaki](https://takt.tr/blog/fmea-hata-turu-etki-analizi) risk önceliklendirmesi doğrudan kullanılabilir.

---

**Kritik bir makinenizin plansız duruşları üretiminizi mi vuruyor?** takt.tr olarak en kritik ekipmanınızdan başlayarak sensörleme ve kestirimci bakım stratejisi kuruyor; izlemeyi yatırımın en hızlı geri döndüğü noktaya odaklıyoruz. [İletişime geçin / Bakım stratejisi desteği talep edin.](https://takt.tr/iletisim)

## Kaynaklar

- [Operations & Maintenance Best Practices Guide, Release 3.0 (PNNL-19634) — U.S. Department of Energy / Pacific Northwest National Laboratory](https://www.pnnl.gov/main/publications/external/technical_reports/PNNL-19634.pdf)
- [ISO 20816-1:2016 — Mechanical vibration: Measurement and evaluation of machine vibration, Part 1](https://www.iso.org/standard/63180.html)
