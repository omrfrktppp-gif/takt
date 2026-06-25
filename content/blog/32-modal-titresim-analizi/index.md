---
title: "Modal ve Titreşim Analizi: Statik Dayanım Değil, Rezonanstan Kaçmak"
description: "Modal analiz ve doğal frekans nedir? Statik olarak sağlam bir parçanın neden rezonansta bozulduğunu ve tasarımla rezonanstan kaçınmayı kaynaklarla anlatıyoruz."
slug: "modal-titresim-analizi"
date: 2026-06-26
updated: 2026-06-26
status: review
author: "Ömer Faruk"
category: "Saha & Analiz"
tags: ["modal-analiz", "titresim", "rezonans", "dogal-frekans", "yapisal-analiz"]
keywords:
  primary: "modal analiz (titreşim ve rezonans)"
  secondary: ["modal analiz nedir", "doğal frekans", "rezonans", "titreşim analizi"]
cover:
  src: "images/cover.jpg"
  alt: "Bir yapının doğal frekanslarını ve mod şekillerini gösteren modal analiz sonucu"
canonical: "https://takt.tr/blog/modal-titresim-analizi"
og:
  type: "article"
  image: "images/cover.jpg"
schema: "TechArticle"
reading_time: 6
---

## Modal ve Titreşim Analizi: Statik Dayanım Değil, Rezonanstan Kaçmak

Bir parça statik yük altında fazlasıyla sağlam olabilir; aynı parça çalışma sırasında, taşıdığı yükün çok altındaki bir kuvvetle titreşip kırılabilir. Bu çelişki gibi görünen durumun nedeni rezonanstır. Statik dayanım, parçanın sabit bir yükü taşıyıp taşıyamayacağını söyler; ama dönen, titreşen ya da değişken kuvvete maruz kalan sistemlerde asıl tehlike yükün büyüklüğü değil, frekansıdır. İyi bir dinamik tasarım, parçayı yalnızca güçlü yapmaz; onu rezonanstan uzak tutar.

Bu yazıda modal analizin ne olduğunu, doğal frekans ve rezonans kavramlarını ve statik olarak sağlam bir parçanın neden titreşimle bozulabildiğini kaynaklara dayanarak ele alıyoruz.

### Doğal Frekans ve Rezonans

Her yapının, serbest bırakıldığında titreşmeyi "tercih ettiği" belirli frekansları vardır; bunlara doğal frekanslar denir. Rezonans, bir bileşenin doğal frekansı, ona etki eden dış titreşimin veya zorlayıcı kuvvetin frekansıyla çakıştığında oluşur (Vibration Research; Crystal Instruments). Bu çakışma gerçekleştiğinde, küçük bir kuvvet bile salınım genliğini hızla büyütür; sistem giderek daha çok titreşir ve görece düşük bir uyarımla bile hasara, gürültüye veya erken yorulmaya yol açabilir.

Klasik örnek bir motor ya da fan içeren makinedir: motorun devri, bağlı olduğu şasinin bir doğal frekansına denk geldiğinde, statik olarak fazlasıyla güçlü olan şasi bile şiddetle titreşmeye başlar. Sorun şasinin zayıflığı değil, frekansların çakışmasıdır.

### Modal Analiz Ne Yapar?

Modal analiz, bir yapının dinamik davranışını — doğal frekanslarını ve bu frekanslarda nasıl şekil değiştirdiğini (mod şekillerini) — belirleyen yöntemdir (Autodesk; Crystal Instruments). Yani modal analiz iki soruyu yanıtlar: Bu parça hangi frekanslarda titreşmeye yatkın? Ve her frekansta nasıl bir biçimde salınır?

Bu bilgi tasarım için kritiktir, çünkü tehlikeyi önceden gösterir. Bir makinenin çalışma frekansları (motor devri, geçiş kuvvetleri, darbe frekansları) biliniyorsa, modal analiz parçanın doğal frekanslarının bu çalışma frekanslarına yakın olup olmadığını ortaya koyar. Yakınsa, rezonans riski vardır ve tasarım değiştirilmelidir.

### Rezonanstan Nasıl Kaçınılır?

Rezonanstan kaçınmanın temel ilkesi, parçanın doğal frekansını çalışma frekansından yeterince uzak tutmaktır. Yaygın bir tasarım kuralı, doğal frekans ile zorlayıcı frekans arasında en az iki kat fark bırakmaktır (Factor of 2 kuralı) (Vibration Research). Bunu sağlamak için tasarımcının elinde birkaç araç vardır:

- **Rijitliği değiştirmek:** Bir bölgenin kesitini, kalınlığını veya destek noktalarını değiştirmek doğal frekansı kaydırır. Genellikle rijitliği artırmak doğal frekansı yükseltir.
- **Kütleyi değiştirmek:** Kütle eklemek veya azaltmak da doğal frekansı kaydırır; kütle arttıkça doğal frekans genellikle düşer.
- **Sönümleme eklemek:** Sönümleyici elemanlar, rezonans anındaki genlik büyümesini sınırlar.

Önemli olan, bu değişikliklerin rastgele değil, modal analizin gösterdiği frekanslara göre yapılmasıdır. Amaç parçayı sertleştirmek değil, doğal frekansını tehlikeli bölgeden çıkarmaktır.

### Statik Analiz Yeterli Değil

Modal analiz, daha önceki FEA yazımızda ele aldığımız statik yapısal analizi tamamlar ama onun yerini tutmaz. Statik analiz "bu yükü taşır mı?" sorusunu yanıtlar; modal analiz "bu sistem hangi frekanslarda titremeye yatkın?" sorusunu. Dönen, titreşen veya değişken kuvvete maruz kalan her sistemde ikisi birlikte gereklidir. Yalnızca statik dayanıma bakıp dinamik davranışı göz ardı etmek, statik olarak sağlam ama sahada titreyip bozulan bir parça üretmenin en yaygın yoludur.

### Sonuç

Modal ve titreşim analizi, bir parçanın yalnızca ne kadar güçlü olduğunu değil, hangi frekanslarda titremeye yatkın olduğunu gösterir. Dinamik sistemlerde asıl risk, yükün büyüklüğünden çok frekansların çakışmasıdır; rezonans, küçük bir kuvveti yıkıcı bir titreşime çevirebilir. İyi tasarım, parçayı güçlü yapmanın yanında doğal frekansını çalışma frekansından uzak tutar. Statik dayanım gerekli ama yeterli değildir.

### Bu Yaklaşım Nerede Geçerli?

Motor, fan, pompa, kompresör içeren ya da değişken/darbe yüklerine maruz kalan tüm makineler ve yapılar modal analizden faydalanır. "Parça statik olarak sağlam ama çalışırken titriyor, gürültü yapıyor veya erken çatlıyor" durumu, neredeyse her zaman bir rezonans probleminin işaretidir.

---

**Statik olarak sağlam bir parçanız çalışırken titriyor, gürültü yapıyor ya da erken mi çatlıyor?** takt.tr olarak makinelerinizin modal ve titreşim analizini yapıyor; doğal frekansları belirleyip tasarımı rezonanstan uzaklaştırarak titreşim kaynaklı arızaları önlüyoruz. [İletişime geçin / Titreşim ve modal analiz desteği talep edin.](https://takt.tr/iletisim)

## Kaynaklar
- Resonance and the Factor of 2 Rule (rezonans, doğal frekans, tasarım kuralı) — Vibration Research. https://vibrationresearch.com/resources/resonance-factor-of-2-rule/
- Modal Analysis: An In-Depth Look (doğal frekans, mod şekilleri) — Autodesk. https://www.autodesk.com/blogs/design-and-manufacturing/modal-analysis-an-in-depth-look/
- Basics of Modal Testing and Analysis — Crystal Instruments. https://www.crystalinstruments.com/basics-of-modal-testing-and-analysis
