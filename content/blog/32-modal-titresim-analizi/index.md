---
title: "Modal Analiz: Titreşimi Susturmak Değil, Rezonanstan Kaçınmak"
description: "Modal analiz nedir, rezonans neden tehlikeli? Doğal frekans, tahrik frekansı ayrımı ve titreşim problemlerinin tasarımda önlenmesi — pratik bir rehber."
slug: "modal-titresim-analizi"
date: 2026-06-27
updated: 2026-07-25
status: review
kind: article
author: "Ömer Faruk Top"
category: "Saha & Analiz"
tags: ["modal-analiz", "titresim", "rezonans", "dogal-frekans", "fea"]
keywords:
  primary: "modal analiz (doğal frekans)"
  secondary: ["modal analiz nedir", "rezonans nedir", "doğal frekans hesabı", "titreşim analizi"]
cover:
  src: "images/cover.jpg"
  alt: "Bir makine şasisinin mod şekillerini gösteren modal analiz sonucu"
canonical: "https://takt.tr/blog/modal-titresim-analizi"
og:
  type: "article"
  image: "images/cover.jpg"
schema: "TechArticle"
reading_time: 6
---

## Modal Analiz: Titreşimi Susturmak Değil, Rezonanstan Kaçınmak

Modal analiz, bir yapının doğal frekanslarını ve bu frekanslarda aldığı şekilleri (mod şekillerini) belirleyen analizdir; amacı titreşimi bastırmak değil, yapının doğal frekanslarıyla çalışma sırasındaki tahrik frekanslarının çakışmasını — yani rezonansı — tasarım aşamasında önlemektir. Her yapının, üzerine hiçbir kuvvet uygulanmasa da "tercih ettiği" salınım frekansları vardır; sorun, dışarıdan gelen periyodik bir kuvvetin bu frekanslardan birine denk gelmesiyle başlar.

Titreşim problemi çoğu zaman sahada, makine çalışmaya başladıktan sonra fark edilir: gürültü, gevşeyen bağlantılar, çatlayan kaynaklar. O aşamada çözüm pahalıdır. Modal analiz bu problemi tasarım masasında, üretimden önce görünür kılar.

## Rezonans Neden Bu Kadar Tehlikeli?

Rezonansta yapıya giren enerji her çevrimde birikir; küçük ve masum görünen bir tahrik kuvveti, doğal frekansla çakıştığında büyüyen genliklere ulaşır. Sonuç, kuvvetin büyüklüğüyle değil, frekansıyla ilgilidir — bu yüzden sahada "bu kadar küçük motor bu şasiyi nasıl sallıyor?" şaşkınlığı yaşanır. Genliğin sınırını yalnızca yapıdaki sönüm belirler ve çelik konstrüksiyonlarda yapısal sönüm genellikle düşüktür.

Mühendislik tarihinin en bilinen örneklerinden biri, 1940'ta rüzgâr kaynaklı titreşimle çöken Tacoma Narrows Köprüsü'dür; olayın mekanizması ve dersleri [Washington Eyaleti Ulaştırma Bakanlığı'nın resmî tarihçesinde](https://wsdot.wa.gov/tacoma-narrows-bridge-history) belgelenmiştir. Köprü ölçeğinde yaşanan bu ders, makine şasisi ölçeğinde her gün geçerlidir: yapı, tahrik frekansına "hazırlıksız" yakalanmamalıdır.

## Modal Analiz Ne Söyler?

Modal analiz iki temel çıktı üretir:

- **Doğal frekanslar:** Yapının hangi frekanslarda rezonansa girebileceği listesi.
- **Mod şekilleri:** Her doğal frekansta yapının nasıl şekil değiştirdiği — hangi bölgenin en çok hareket ettiği.

Bu iki bilgi, tasarım kararına şöyle dönüşür: makinedeki tahrik kaynakları (motor devri, dişli geçiş frekansı, pompa kanat frekansı, dengesizlik) listelenir ve doğal frekanslarla karşılaştırılır. Çakışma ya da yakınlık varsa tasarım değiştirilir: rijitlik artırılır (frekans yükselir), kütle dağılımı değiştirilir, ya da tahrik frekansı kaydırılır. Mod şekli, müdahalenin nereye yapılacağını gösterir — en çok hareket eden bölgeye eklenen bir destek, frekansı en verimli şekilde kaydırır.

## Statik Analiz Yeterli Değil mi?

Değildir. [FEA yazımızda](https://takt.tr/blog/sonlu-elemanlar-analizi-fea) ele aldığımız statik analiz, "bu yapı bu yükü taşır mı?" sorusuna cevap verir; modal analiz ise "bu yapı bu devirde titrer mi?" sorusuna. Statik olarak fazlasıyla güvenli bir şasi, ilk doğal frekansı motor devrine denk geldiğinde sahada problem üretir. Dönen ekipman taşıyan her şaside, statik doğrulamanın yanına modal doğrulama konmalıdır.

Modal analizin de sınırları vardır: sonucun doğruluğu sınır koşullarının (yapının nasıl mesnetlendiğinin) gerçeğe uygunluğuna güçlü biçimde bağlıdır ve cıvatalı bağlantıların rijitliği modeli etkiler. Kritik yapılarda hesaplanan frekanslar, sahada deneysel modal test (çekiç testi veya çalışır durumda ölçüm) ile doğrulanmalıdır — [FEA yazımızdaki](https://takt.tr/blog/sonlu-elemanlar-analizi-fea) "öngör, deneyle doğrula" ilkesi burada da geçerlidir.

## Hangi Durumda Modal Analiz İstemelisiniz?

| Durum | Modal analiz gerekli mi? |
| --- | --- |
| Şasi/platform üzerinde dönen ekipman (motor, fan, pompa) var | Evet — tahrik frekansları doğal frekanslarla karşılaştırılmalı |
| Sahada gürültü, gevşeyen cıvata, çatlayan kaynak şikâyeti | Evet — mevcut problem büyük olasılıkla rezonans kaynaklı |
| Değişken devirli sürücü (VSD) ile geniş devir aralığı taranıyor | Evet — aralık içindeki her frekans potansiyel çakışma |
| Yalnızca statik yük taşıyan, tahrik içermeyen yapı | Genellikle hayır — statik analiz yeterli olabilir |

## Sonuç

Modal analiz, yapının doğal frekanslarını ve mod şekillerini üretimden önce görünür kılarak rezonans problemini tasarım aşamasında önler. Titreşim problemi sahada çözülmesi en pahalı problemlerden biridir; masada önlenmesi ise çoğu zaman bir destek sacı veya rijitlik artışı kadar basittir. Dönen ekipman taşıyan hiçbir yapı, modal doğrulama olmadan "bitmiş" sayılmamalıdır.

---

**Makinenizde gürültü, gevşeyen bağlantılar ya da açıklayamadığınız titreşim mi var?** Takt olarak yapılarınızın doğal frekanslarını hesaplıyor, tahrik kaynaklarınızla karşılaştırıp rezonans riskini tasarım aşamasında çözüyoruz. [Analiz ve hesaplama hizmetimize](https://takt.tr/hizmetler/analiz-hesaplama) göz atın veya [iletişime geçin](https://takt.tr/iletisim).

## Kaynaklar

- [Tacoma Narrows Bridge History — Washington State Department of Transportation](https://wsdot.wa.gov/tacoma-narrows-bridge-history) (1940 çöküşünün resmî tarihçesi ve mühendislik dersleri)
