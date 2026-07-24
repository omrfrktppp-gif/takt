---
title: "Six Sigma ve Süreç Yeteneği: Tek Parçayı Değil, Süreci Ölçmek"
description: "Süreç yeteneği (Cp/Cpk) nedir? Bir parçanın 'geçer' olması ile sürecin tekrarlanabilir olması arasındaki farkı örnek hesapla anlatıyoruz."
slug: "six-sigma-surec-yetenegi"
date: 2026-04-22
updated: 2026-07-25
status: review
kind: article
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
reading_time: 6
---

## Six Sigma ve Süreç Yeteneği: Tek Parçayı Değil, Süreci Ölçmek

Süreç yeteneği, [kontrol altındaki bir sürecin çıktısının tolerans sınırlarına ne kadar rahat sığdığını, Cp ve Cpk gibi yetenek indeksleriyle ölçen istatistiksel yaklaşımdır](https://www.itl.nist.gov/div898/handbook/pmc/section1/pmc16.htm). Tek cümlelik cevap: bir parçanın ölçüde "geçer" çıkması bir olaydır; her parçanın geçmesi ise sürecin saçılmasıyla toleransın oranına bağlı bir yetenektir — ve bu oran hesaplanabilir.

Bir parçayı ölçtünüz, tolerans içinde, "geçer" dediniz. Ama bu, bir sonraki parçanın da geçeceği anlamına gelmez. Kalite, tek parçada değil, sürecin tekrarlanabilirliğinde saklıdır. Six Sigma'nın temelinde bu ayrım yatar.

### Cp ve Cpk Nasıl Hesaplanır?

Süreç yeteneği iki şeye bakar: sürecin saçılması (standart sapma, σ) ve tolerans genişliği (USL − LSL, üst ve alt sınır arası). [NIST/SEMATECH e-El Kitabı'nın tanımladığı](https://www.itl.nist.gov/div898/handbook/pmc/section1/pmc16.htm) iki temel indeks:

`Cp = (USL − LSL) / (6σ)`

`Cpk = min[ (USL − μ) / (3σ) , (μ − LSL) / (3σ) ]`

`Cp` sürecin saçılmasının toleransa kıyasla ne kadar dar olduğunu söyler; ama sürecin ortalanıp ortalanmadığını görmez. `Cpk` ise ortalamanın (μ) merkeze göre kaymasını da hesaba katar. Bu yüzden `Cpk`, gerçek yeteneğin daha dürüst ölçüsüdür.

### Örnek: Geçer Ama Yetenekli Değil

Tolerans 10,0 ± 0,3 mm olsun (USL = 10,3; LSL = 9,7). Süreç ortalaması μ = 10,0 ve standart sapma σ = 0,1 mm:

`Cp = (10,3 − 9,7) / (6 × 0,1) = 0,6 / 0,6 = 1,0`

`Cpk = min[ (10,3 − 10,0)/0,3 , (10,0 − 9,7)/0,3 ] = 1,0`

Cpk = 1,0, sürecin tam sınırda olduğunu gösterir: [normal dağılım varsayımıyla bu, yaklaşık %0,27 (binde 2,7) ıskarta demektir ve küçük bir kayma anında bu oranı büyütür](https://www.itl.nist.gov/div898/handbook/pmc/section1/pmc16.htm). Endüstride bu yüzden genellikle daha yüksek hedefler (örneğin Cpk ≥ 1,33; toleransın 8σ'ya oranı) kullanılır — tolerans ile süreç arasında güvenli bir tampon. Aynı parçalar tek tek "geçer" olabilir; ama süreç yetenekli olmadığında bu, şans eseri geçmektir.

| Cp (süreç ortalanmışsa) | Tolerans / saçılma | Beklenen ıskarta |
| --- | --- | --- |
| 1,00 | 6σ | %0,27 |
| 1,33 | 8σ | 64 ppm |
| 1,66 | 10σ | 0,6 ppm |
| 2,00 | 12σ | 2 ppb |

(Kaynak: [NIST/SEMATECH e-Handbook, "What is Process Capability?"](https://www.itl.nist.gov/div898/handbook/pmc/section1/pmc16.htm))

### Neden Tek Parça Yanıltır?

Tek parça ölçümü sürecin o anki bir fotoğrafıdır; saçılmayı, kaymayı ve eğilimi göstermez. Süreç yeteneği ise dağılımın tamamına bakar. Bir süreç "bugün geçti" diye yarın da geçmez; yetenek, zaman içinde tutarlı kalabilme kapasitesidir.

### Sınırları ve Ön Koşulları

Cp/Cpk hesabı iki varsayıma dayanır ve ikisi de sahada sık ihlal edilir. Birincisi, [süreç istatistiksel kontrol altında olmalı ve veri yaklaşık normal dağılmalıdır; ayrıca güvenilir bir tahmin için yeterli örneklem (pratikte onlarca bağımsız ölçüm) gerekir](https://www.itl.nist.gov/div898/handbook/pmc/section1/pmc16.htm). Kontrol altında olmayan (eğilimli, sıçramalı) bir süreçte hesaplanan Cpk anlık ve yanıltıcıdır. İkincisi, indeks ölçüm sisteminin kendisinden etkilenir: ölçüm belirsizliği süreç saçılmasına karışır. Önce ölçüm sistemi, sonra kontrol, en son yetenek analizi gelir.

Toleransın kendisinin doğru tanımlanması ise ayrı bir konudur: yanlış referanstan verilmiş dar bir toleransın Cpk'sı yüksek olsa bile parça işlevsiz kalabilir. Bu bağlantıyı [GD&T yazımızda](https://takt.tr/blog/geometrik-toleranslama-gdt) ele alıyoruz; saçılmayı tasarım aşamasında küçültmenin yolu için [Taguchi robust tasarım yazımıza](https://takt.tr/blog/taguchi-robust-tasarim) bakabilirsiniz.

### Ne Zaman Yapılmalı?

Seri üretim yapan, ıskarta oranı dalgalanan ya da müşterisi kalite tutarlılığı isteyen her süreç yetenek analizine açıktır. "Bazen tutuyor bazen tutmuyor" cümlesi, neredeyse her zaman düşük süreç yeteneğinin işaretidir.

---

**Üretiminiz bazen tutup bazen ıskarta mı veriyor?** takt.tr olarak süreçlerinizi Six Sigma ve süreç yeteneği (Cp/Cpk) analiziyle inceliyor; saçılmanın kaynağını bulup süreci tek parça şansından çıkarıp güvenilir hale getiriyoruz. [İletişime geçin / Süreç yeteneği analizi talep edin.](https://takt.tr/iletisim)

## Kaynaklar

- [What is Process Capability? — NIST/SEMATECH e-Handbook of Statistical Methods](https://www.itl.nist.gov/div898/handbook/pmc/section1/pmc16.htm)
- [Process Capability — American Society for Quality (ASQ)](https://asq.org/quality-resources/process-capability)
