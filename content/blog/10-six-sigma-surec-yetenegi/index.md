---
title: "Six Sigma ve Süreç Yeteneği: Tek Parçayı Değil, Süreci Ölçmek"
description: "Süreç yeteneği (Cp/Cpk) nedir? Bir parçanın 'geçer' olması ile sürecin tekrarlanabilir olması arasındaki farkı örnek hesapla anlatıyoruz."
slug: "six-sigma-surec-yetenegi"
date: 2026-06-26
updated: 2026-06-26
status: review
author: "Ömer Faruk"
category: "Kalite İlkeleri"
tags: ["six-sigma", "cp-cpk", "surec-yetenegi", "kalite", "varyasyon"]
keywords:
  primary: "süreç yeteneği Cp Cpk"
  secondary: ["six sigma nedir", "Cpk hesaplama", "süreç yeteneği", "varyasyon kontrolü"]
cover:
  src: "images/cover.jpg"
  alt: "Süreç yeteneği dağılımı ve Cp/Cpk ile tolerans sınırları şeması"
canonical: "https://takt.tr/blog/six-sigma-surec-yetenegi"
og:
  type: "article"
  image: "images/cover.jpg"
schema: "TechArticle"
reading_time: 5
---

## Six Sigma ve Süreç Yeteneği: Tek Parçayı Değil, Süreci Ölçmek

Bir parçayı ölçtünüz, tolerans içinde, "geçer" dediniz. Ama bu, bir sonraki parçanın da geçeceği anlamına gelmez. Tek bir parçanın doğru olması bir olaydır; her parçanın doğru olması bir yetenektir. Kalite, tek parçada değil, sürecin tekrarlanabilirliğinde saklıdır.

Six Sigma'nın temelinde bu ayrım yatar ve süreç yeteneği indeksleriyle (Cp, Cpk) ölçülür. Bu yazıda süreç yeteneğinin ne olduğunu, bir parçanın "geçmesi" ile sürecin "yetenekli olması" arasındaki farkı ve bunun neden maliyet ve güvenilirlik demek olduğunu ele alıyoruz.

### Süreç Yeteneği Nedir?

Süreç yeteneği, bir üretim sürecinin çıktısının tolerans sınırlarına ne kadar rahat sığdığını gösterir. İki şeye bakar: sürecin saçılması (değişkenliği, σ) ve tolerans genişliği (USL − LSL, üst ve alt sınır arası).

İki indeks kullanılır:

`Cp = (USL − LSL) / (6σ)`

`Cpk = min[ (USL − μ) / (3σ) , (μ − LSL) / (3σ) ]`

`Cp` sürecin saçılmasının toleransa kıyasla ne kadar dar olduğunu söyler; ama sürecin ortalanıp ortalanmadığını görmez. `Cpk` ise ortalamanın (μ) merkeze göre kaymasını da hesaba katar. Bu yüzden `Cpk`, gerçek yeteneğin daha dürüst ölçüsüdür.

### Örnek: Geçer Ama Yetenekli Değil

Tolerans 10,0 ± 0,3 mm olsun (USL = 10,3; LSL = 9,7). Süreç ortalaması μ = 10,0 ve standart sapma σ = 0,1 mm:

`Cp = (10,3 − 9,7) / (6 × 0,1) = 0,6 / 0,6 = 1,0`

`Cpk = min[ (10,3 − 10,0)/0,3 , (10,0 − 9,7)/0,3 ] = 1,0`

Cpk = 1,0, sürecin tam sınırda olduğunu gösterir: ortalama her parça geçse bile, küçük bir kayma ya da saçılma artışı anında ıskarta üretmeye başlar. Endüstride genellikle Cpk ≥ 1,33 hedeflenir; bu, tolerans ile süreç arasında güvenli bir tampon demektir. Aynı parçalar tek tek "geçer" olabilir; ama süreç yetenekli olmadığında bu, şans eseri geçmektir.

### Neden Tek Parça Yanıltır?

Tek parça ölçümü sürecin o anki bir fotoğrafıdır; saçılmayı, kaymayı ve eğilimi göstermez. Süreç yeteneği ise dağılımın tamamına bakar. Bir süreç "bugün geçti" diye yarın da geçmez; yetenek, zaman içinde tutarlı kalabilme kapasitesidir. Bu yüzden Six Sigma tek ölçüme değil, sürecin istatistiksel davranışına güvenir.

### Sonuç

Six Sigma ve süreç yeteneği, kaliteyi tek parçadan sürece taşır. "Bu parça geçer mi?" doğru ama yetersiz bir sorudur; asıl soru "bu süreç her parçayı geçirir mi?"dir. Cpk, bu sorunun sayısal cevabıdır ve düşük olduğunda ıskarta, yeniden işleme ve belirsizlik kaçınılmazdır.

### Bu Yaklaşım Nerede Geçerli?

Seri üretim yapan, ıskarta oranı dalgalanan ya da müşteri kalite tutarlılığı isteyen her süreç yetenek analizine açıktır. "Bazen tutuyor bazen tutmuyor" cümlesi, neredeyse her zaman düşük süreç yeteneğinin işaretidir.

---

**Üretiminiz bazen tutup bazen ıskarta mı veriyor?** takt.tr olarak süreçlerinizi Six Sigma ve süreç yeteneği (Cp/Cpk) analiziyle inceliyor; saçılmanın kaynağını bulup süreci tek parça şansından çıkarıp güvenilir hale getiriyoruz. [İletişime geçin / Süreç yeteneği analizi talep edin.](https://takt.tr/iletisim)
