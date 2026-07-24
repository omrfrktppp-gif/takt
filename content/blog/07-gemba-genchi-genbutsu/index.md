---
title: "Genchi Genbutsu (Gemba): CAD Ekranında Değil, Sahada Doğrulanan Tasarım"
description: "Genchi genbutsu (git ve gör) ilkesi nedir? Tasarımcının sahaya inmesinin hesabı neden tamamladığını termal genleşme deney örneğiyle anlatıyoruz."
slug: "gemba-genchi-genbutsu"
date: 2026-04-13
updated: 2026-07-25
status: published
kind: article
author: "Ömer Faruk"
category: "Japon Mühendislik İlkeleri"
tags: ["gemba", "genchi-genbutsu", "yalin-uretim", "deneysel-dogrulama", "saha"]
keywords:
  primary: "gemba genchi genbutsu mühendislik"
  secondary: ["genchi genbutsu nedir", "gemba nedir", "git ve gör", "deneysel doğrulama"]
cover:
  src: "images/cover.jpg"
  alt: "Tasarımı sahada doğrulayan mühendis: genchi genbutsu yaklaşımı"
canonical: "https://takt.tr/blog/gemba-genchi-genbutsu"
og:
  type: "article"
  image: "images/cover.jpg"
schema: "TechArticle"
reading_time: 5
---

## Genchi Genbutsu (Gemba): CAD Ekranında Değil, Sahada Doğrulanan Tasarım

Genchi genbutsu — "git ve kendin gör" — [Toyota'nın karar alma kültürünün temel ilkelerinden biridir](https://mag.toyota.co.uk/genchi-genbutsu/): bir problemi anlamak için onun gerçekleştiği yere, gembaya (işin yapıldığı yere) gitmek ve kararı raporlardan değil, birinci elden gözlemden almak. Mühendislik diline çevirisi nettir: hesap bir öngörüdür; saha onu doğrular ya da çürütür. Tasarım, varsayımla değil, ölçümle biter.

Bir tasarım CAD ortamında kusursuz görünebilir. Ölçüler tutarlı, montaj çakışmasız, analiz yeşil. Ama parça gerçek malzemeden üretilip gerçek koşulda çalıştığında, modelin görmediği şeyler ortaya çıkar: ısı, titreşim, tolerans, operatörün eli. Ekrandaki doğruluk, sahadaki doğruluğun garantisi değildir.

### Genchi Genbutsu Nedir?

Genchi genbutsu, kararı raporlardan, varsayımlardan veya ikinci el bilgiden değil, olgunun gerçekleştiği yerden almak demektir. "Gemba" işin yapıldığı yerdir: atölye, montaj hattı, makinenin başı. İlke, [Toyota Üretim Sistemi'nin](https://global.toyota/en/company/vision-and-philosophy/production-system/) problem çözme pratiğinin parçasıdır: masada tartışmadan önce git ve kendi gözünle gör.

Mühendislikte bu, modeli gerçekle karşılaştırmak anlamına gelir. Genchi genbutsu, tasarımı varsayımla bitirmez; ölçümle bitirir.

### Hesap Neden Tek Başına Yetmez?

Yüksek sıcaklıkta çalışan bir sistemde malzemenin termal genleşmesi hesaplanabilir:

`ΔL = α · L₀ · ΔT`

Bu hesap bir öngörü verir. Ama döküm malzemenin genleşme katsayısı bir aralıktır, sıcaklık dağılımı düzgün değildir ve gerçek parça nominal ölçüde değildir. Hesap "yaklaşık 6 mm uzar" der; gerçek değer ancak ölçülünce bilinir.

Genchi genbutsu burada devreye girer: üretilen prototip parçalara kontrollü ısı uygulanır, farklı sıcaklıklarda boy ölçülür ve ölçülen uzama hesaplanan değerle karşılaştırılır:

`ΔL_ölçüm = L_T − L₀`

Ölçümler hesaplanan aralıkla tutarlı çıktığında, tasarım kararına güvenle geçilebilir. Tutmadığında ise sahaya inmek, kâğıt üzerinde asla görülemeyecek bir hatayı erkenden yakalar. Bu yaklaşımın uçtan uca uygulamasını [tünel fırın termal genleşme vakamızda](https://takt.tr/blog/termal-genlesme-yonetimi) anlatıyoruz.

### Sahaya İnmenin Üç Kazancı

- **Varsayım kırılır:** Modeldeki "ideal" kabuller (düzgün sıcaklık, nominal ölçü, sürtünmesiz temas) sahada test edilir.
- **Erken hata yakalanır:** Bir problem üretimde değil prototipte görülür; düzeltme maliyeti düşüktür.
- **Tasarım girdisi güçlenir:** Ölçülen gerçek davranış, bir sonraki tasarımın daha doğru başlamasını sağlar.

### Dengeli Bakış: Saha da Tek Başına Yetmez

İlkenin simetrisi önemlidir: hesap olmadan saha kör, saha olmadan hesap eksiktir. Plansız saha gezisi veri üretmez; neyi ölçeceğini bilmeden gembaya inmek, izlenim toplar ama karar üretmez. İyi pratik, önce hipotezi hesapla kurmak, sonra sahada hangi büyüklüğün, hangi koşulda, hangi hassasiyetle ölçüleceğini tanımlamaktır. Ölçüm planı olmayan doğrulama, doğrulama değildir.

### Nerede Belirleyici?

Yüksek sıcaklık, titreşim, aşınma gibi modellemesi zor etkilerin olduğu her sistemde saha doğrulaması belirleyicidir. "Modelde böyle çıkmıştı ama sahada farklı oldu" cümlesi duyuluyorsa, eksik olan hesap değil, hesabı sahaya götüren adımdır.

---

**Tasarımlarınız modelde doğru çıkıp sahada farklı mı davranıyor?** takt.tr olarak tasarımı hesapla kurup deneyle doğruluyor; öngörüyü sahaya inerek test ediyor ve riski üretime girmeden ölçülmüş bir parametreye çeviriyoruz. [İletişime geçin / Tasarım doğrulama desteği talep edin.](https://takt.tr/iletisim)

## Kaynaklar

- [Genchi Genbutsu — Toyota (resmî Toyota UK yayını)](https://mag.toyota.co.uk/genchi-genbutsu/)
- [Toyota Production System — Toyota Motor Corporation (resmî sayfa)](https://global.toyota/en/company/vision-and-philosophy/production-system/)
- [Thermal Expansion — HyperPhysics, Georgia State University](http://hyperphysics.phy-astr.gsu.edu/hbase/thermo/thexp.html)
