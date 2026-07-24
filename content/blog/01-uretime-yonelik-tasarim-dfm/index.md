---
title: "Üretime Yönelik Tasarım (DFM): Maliyeti Tezgâhta Değil, Tasarımda Düşürmek"
description: "Üretime yönelik tasarım (DFM) ile 30 dakikalık talaşlı imalat işçiliğinin tek operasyonlu lazer kesime nasıl indiğini gerçek bir parça örneğiyle anlatıyoruz."
slug: "uretime-yonelik-tasarim-dfm"
date: 2026-03-26
updated: 2026-07-25
status: published
kind: case-study
author: "Ömer Faruk"
category: "DFM/DFA"
tags: ["dfm", "dfa", "aisi-304", "lazer-kesim", "talasli-imalat", "maliyet-dusurme"]
keywords:
  primary: "üretime yönelik tasarım (DFM)"
  secondary: ["DFM nedir", "talaşlı imalattan lazer kesime geçiş", "parça maliyeti düşürme", "AISI 304 üretim"]
cover:
  src: "images/cover.jpg"
  alt: "DFM ile talaşlı imalattan lazer profil kesime geçen AISI 304 sıkma parçası"
canonical: "https://takt.tr/blog/uretime-yonelik-tasarim-dfm"
og:
  type: "article"
  image: "images/cover.jpg"
schema: "TechArticle"
reading_time: 6
---

## Üretime Yönelik Tasarım (DFM): Maliyeti Tezgâhta Değil, Tasarımda Düşürmek

Üretime yönelik tasarım (Design for Manufacturing — DFM), bir parçanın geometrisini ve üretim yöntemini daha tasarım aşamasında birlikte ele alarak operasyon sayısını, işçiliği ve malzeme kaybını düşüren mühendislik disiplinidir. Bu vaka çalışmasında somut sonucu baştan söyleyelim: AISI 304 paslanmaz çelikten torna + freze + tesviye zinciriyle, parça başına yaklaşık 30 dakika işçilikle üretilen bir sıkma parçası, işlevsel ölçüleri birebir korunarak yeniden tasarlandı; hazır boru profilden lazer kesim + kısa tesviye akışına geçildi ve üretim süresi dakikalardan saniyelere indi.

Parça zaten çalışıyordu; sahada sorun çıkarmıyordu. Sorun, çalışması için ödenen bedeldi. Aşağıda bu kararın nasıl verildiğini, hangi soruların sorulduğunu ve aynı yaklaşımın sizin parçalarınızda nerede işe yarayacağını adım adım anlatıyoruz.

### DFM Nedir, Klasik Tasarımdan Farkı Ne?

DFM, tasarımı üretime uydurmaz; tasarımı üretimin gerçeklerine hizalar. Kavram, [Boothroyd Dewhurst'ün DFMA metodolojisiyle](https://www.dfma.com/) sistematik hale gelmiştir: parça maliyetinin belirleyici kısmı — malzeme, operasyon sayısı, tezgâh saati, operatör bağımlılığı — geometriyle birlikte, henüz tasarım masasındayken kilitlenir. Üretim mühendisi sahada ancak sınırlı bir iyileştirme yapabilir; asıl kazanç, parçanın nasıl üretileceğine karar verildiği anda kazanılır ya da kaybedilir.

DFM'in temel sorusu şudur: bu geometri, bu işlevi yerine getirmek için gerçekten gerekli mi, yoksa sadece alışkanlıktan mı böyle çizildi?

### Sahadaki Parça Neden Pahalıydı?

Söz konusu parça silindirik bir sıkma fonksiyonu taşıyordu ve klasik talaşlı imalat akışıyla üretiliyordu:

| Özellik | Mevcut durum |
| --- | --- |
| Malzeme | AISI 304 paslanmaz çelik |
| Operasyonlar | Torna + freze + tesviye |
| İşçilik | Parça başına ~30 dakika |
| Darboğaz | Tezgâh saati ve operatör bağımlılığı |

İlk akla gelen iyileştirme üretimi hızlandırmaktı: CNC torna ve canlı takım, çevrim süresini gerçekten düşürebilirdi. Ancak bu, maliyeti bir kalemden alıp başka kaleme taşıyordu — makine saati, bağlama (fikstür), yatırım ve operatör bağımlılığı devreye giriyordu. Daha hızlı bir talaşlı imalat, hâlâ talaşlı imalattı.

### Asıl Soru: Bu Parça Neden İşleniyor?

DFM, [montaja yönelik tasarımla (DFA)](https://takt.tr/blog/montaja-yonelik-tasarim-dfa) birlikte ele alındığında kritik bir nokta görünür hale geldi: parçanın talaşlı imalatla üretilmesi işlevsel bir zorunluluk değildi. Silindirik form, sıkma fonksiyonu için şart değil, ilk seçilen üretim yönteminin dayattığı bir biçimdi.

Bu fark edildiğinde tasarım hedefi değişti. Amaç daha iyi işlemek değil, işlemeye ihtiyaç bırakmamaktı. Sıkma fonksiyonu ve işlevsel ölçüler korunarak geometri ve üretim yöntemi yeniden tanımlandı; çıkış sorusu "bu parçayı nasıl daha hızlı işleriz" değil, "bu işlevi işleme operasyonu olmadan nasıl elde ederiz" oldu.

### Çözüm: Tek Operasyonda Üretim

Yeniden tanımlanan tasarımda parça, stoktan temin edilen hazır AISI 304 boru profilden üretildi:

- Boru profil, lazer profil kesimle tek operasyonda ve adetli olarak kesildi.
- Kısa bir tesviye sonrası parça kullanıma hazır hale geldi.
- İşlevi sağlayan ölçüler birebir korundu; değişen tek şey, o ölçülere ulaşma yöntemiydi.

Talaşla şekil verilen bir geometri yerine doğru başlangıç malzemesi ve tek bir kesim operasyonu kullanıldı.

### Sonuç Ne Oldu?

- Üretim süresi dakikalardan saniyelere indi.
- Torna ve freze operasyonları tamamen devreden çıktı.
- Talaşlı imalatta kaybedilen hammadde en aza indi.
- Operatör ve bağlama kaynaklı hata payı ortadan kalktı.
- Süreç seri üretime uygun hale geldi.

Kazanç tek bir operasyonun hızlanmasından değil, bir operasyon zincirinin tümden ortadan kalkmasından geldi. Maliyet, tezgâhta değil, tasarım kararında düştü.

### Bu Yaklaşım Hangi Parçalarda İşe Yarar?

DFM incelemesinden en yüksek getiriyi alan parçalar genellikle şu profildedir:

- Tekrarlı üretilen ve birden çok operasyon gerektiren parçalar,
- Geometrisi işlevden değil, "hep böyle üretildi" alışkanlığından gelen parçalar,
- İşçiliği operatör becerisine bağımlı, çevrim süresi değişken parçalar.

Sınırlarını da bilmek gerekir: DFM her parçayı tek operasyona indirmez. Sıkı tolerans ve hassas oturma yüzeyleri gerektiren bölgeler talaşlı bitirme isteyebilir; kazancın gerçekleşmesi için işlevsel ölçülerin kesim yöntemiyle sağlanabildiğinin doğrulanması şarttır. Doğru soru "işlemeyi nasıl kaldırırız" değil, "işlevi bozmadan hangi operasyonlar kaldırılabilir"dir. Bu bakışın israf tarafını [7 israf (muda) yazımızda](https://takt.tr/blog/muda-yedi-israf), toleranslama tarafını ise [GD&T yazımızda](https://takt.tr/blog/geometrik-toleranslama-gdt) ele alıyoruz.

---

**Üretimde tekrar eden, pahalı ya da operatöre bağımlı bir parçanız mı var?** takt.tr olarak, mevcut parçalarınızı işlevini bozmadan DFM/DFA gözüyle yeniden değerlendiriyor, operasyon sayısını ve maliyeti tasarım aşamasında düşürüyoruz. [İletişime geçin / Tasarım gözden geçirme talep edin.](https://takt.tr/iletisim)

## Kaynaklar

- [Boothroyd Dewhurst — Design for Manufacture and Assembly (DFMA) metodolojisi](https://www.dfma.com/)
