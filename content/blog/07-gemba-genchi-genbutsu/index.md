---
title: "Genchi Genbutsu (Gemba): CAD Ekranında Değil, Sahada Doğrulanan Tasarım"
description: "Genchi genbutsu (git ve gör) ilkesi nedir? Tasarımcının sahaya inmesinin hesabı neden tamamladığını termal genleşme deney örneğiyle anlatıyoruz."
slug: "gemba-genchi-genbutsu"
date: 2026-06-26
updated: 2026-06-26
status: review
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
reading_time: 4
---

## Genchi Genbutsu (Gemba): CAD Ekranında Değil, Sahada Doğrulanan Tasarım

Bir tasarım CAD ortamında kusursuz görünebilir. Ölçüler tutarlı, montaj çakışmasız, analiz yeşil. Ama parça gerçek malzemeden üretilip gerçek koşulda çalıştığında, modelin görmediği şeyler ortaya çıkar: ısı, titreşim, tolerans, operatörün eli. Ekrandaki doğruluk, sahadaki doğruluğun garantisi değildir.

Genchi genbutsu — "git ve gör" — Toyota üretim sisteminin temel ilkelerinden biridir: bir problemi anlamak için onun gerçekleştiği yere, gembaya (sahaya) gitmek. Bu yazıda bu ilkenin mühendislikte ne anlama geldiğini ve tasarımcının sahaya inmesinin bir hesabı nasıl tamamladığını bir termal genleşme örneğiyle ele alıyoruz.

### Genchi Genbutsu Nedir?

Genchi genbutsu, kararı raporlardan, varsayımlardan veya ikinci el bilgiden değil, olgunun gerçekleştiği yerden almak demektir. "Gemba" işin yapıldığı yerdir: atölye, montaj hattı, makinenin başı. İlke şunu söyler: bir problemi masada tartışmadan önce git ve kendi gözünle gör.

Mühendislik diline çevrildiğinde bu, modeli gerçekle karşılaştırmak anlamına gelir. Hesap bir öngörüdür; saha onu doğrular ya da çürütür. Genchi genbutsu, tasarımı varsayımla bitirmez; ölçümle bitirir.

### Hesap Bir Başlangıçtır, Son Değil

Yüksek sıcaklıkta çalışan bir sistemde malzemenin termal genleşmesi hesaplanabilir:

`ΔL = α · L₀ · ΔT`

Bu hesap bir öngörü verir. Ama döküm malzemenin genleşme katsayısı bir aralıktır, sıcaklık dağılımı düzgün değildir ve gerçek parça nominal ölçüde değildir. Hesap "yaklaşık 6 mm uzar" der; gerçek değer ancak ölçülünce bilinir.

Genchi genbutsu burada devreye girer: üretilen prototip parçalara kontrollü ısı uygulanır, farklı sıcaklıklarda boy ölçülür ve ölçülen uzama hesaplanan değerle karşılaştırılır:

`ΔL_ölçüm = L_T − L₀`

Ölçümler hesaplanan aralıkla tutarlı çıktığında, tasarım kararına güvenle geçilebilir. Tutmadığında ise sahaya inmek, kâğıt üzerinde asla görülemeyecek bir hatayı erkenden yakalar. Hesap, sahada doğrulanana kadar bir hipotezdir.

### Sahaya İnmenin Üç Kazancı

- **Varsayım kırılır:** Modeldeki "ideal" kabuller (düzgün sıcaklık, nominal ölçü, sürtünmesiz temas) sahada test edilir.
- **Erken hata yakalanır:** Bir problem üretimde değil prototipte görülür; düzeltme maliyeti düşüktür.
- **Tasarım girdisi güçlenir:** Ölçülen gerçek davranış, bir sonraki tasarımın daha doğru başlamasını sağlar.

### Sonuç

Genchi genbutsu, mühendisi ekranın başından kaldırıp işin olduğu yere götürür. Hesap olmadan saha kör, saha olmadan hesap eksiktir. İyi tasarım ikisini birleştirir: öngörüyü hesapla kurar, doğruluğu sahada ölçer.

### Bu Yaklaşım Nerede Geçerli?

Yüksek sıcaklık, titreşim, aşınma gibi modellemesi zor etkilerin olduğu her sistemde saha doğrulaması belirleyicidir. "Modelde böyle çıkmıştı ama sahada farklı oldu" cümlesi duyuluyorsa, eksik olan hesap değil, hesabı sahaya götüren adımdır.

---

**Tasarımlarınız modelde doğru çıkıp sahada farklı mı davranıyor?** takt.tr olarak tasarımı hesapla kurup deneyle doğruluyor; öngörüyü sahaya inerek test ediyor ve riski üretime girmeden ölçülmüş bir parametreye çeviriyoruz. [İletişime geçin / Tasarım doğrulama desteği talep edin.](https://takt.tr/iletisim)
