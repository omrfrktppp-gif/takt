---
title: "Prototipten Seri Üretime Geçiş: Adım Adım Kontrol Listesi"
description: "Çalışan bir prototipten seri üretime nasıl geçilir? DFM, tolerans gerçekçiliği, tedarikçi seçimi, numune onayı ve pilot üretim adımlarıyla pratik bir rehber."
slug: "prototipten-seri-uretime-gecis"
date: 2026-07-18
updated: 2026-07-25
status: published
kind: article
author: "Ömer Faruk Top"
category: "Satın Alma Rehberi"
tags: ["prototip", "seri-uretim", "dfm", "ppap", "uretim-yontemi"]
keywords:
  primary: "prototipten seri üretime geçiş"
  secondary: ["prototip seri üretim farkı", "seri üretime hazırlık", "numune onayı PPAP", "pilot üretim"]
cover:
  src: "images/cover.jpg"
  alt: "Tek bir prototip parçadan seri üretim hattına geçişi simgeleyen üretim istasyonu"
canonical: "https://takt.tr/blog/prototipten-seri-uretime-gecis"
og:
  type: "article"
  image: "images/cover.jpg"
schema: "BlogPosting"
reading_time: 9
---

## Prototipten Seri Üretime Geçiş: Adım Adım Kontrol Listesi

Çalışan bir prototip, seri üretime hazır bir ürün değildir. Prototip "bu tasarım işlevini görüyor mu?" sorusuna cevap verir; seri üretim ise "bu tasarım, yüzüncü ve on bininci parçada da aynı kalitede, hedef maliyetle üretilebiliyor mu?" sorusunu sorar. Geçiş; tasarımın üretim sürecine göre yeniden ele alınmasını (DFM), toleransların gerçekçileştirilmesini, sürecin onaylanmasını ve kontrollü bir pilot partiyi kapsayan sistematik bir süreçtir. Bu yazı, o süreci adım adım ve satın alan tarafın gözünden anlatıyor.

## Prototip Neden Doğrudan Seri Üretilemez?

Prototip ile seri parça çoğu zaman farklı süreçlerle üretilir: prototipte CNC'den tek parça işlenen bir gövde, seride döküm veya sac büküm olabilir; 3D baskıyla denenen bir kapak, seride enjeksiyon kalıbına geçer. Süreç değişince kurallar da değişir — çekme açıları, et kalınlıkları, büküm yarıçapları, kaynak erişimi. Prototipte hiç sorun çıkarmayan bir detay, kalıpta üretilemez veya sac bükümde çatlayabilir. İkinci fark ekonomiktir: prototipte parça başı maliyet önemsizdir, seride her saniye ve her gram çarpanla büyür. Üçüncü fark değişkenliktir: tek parçada görünmeyen süreç değişkenliği, binlerce parçada tolerans dışı ürün olarak ortaya çıkar.

## Geçişin Adımları Neler?

1. **Tasarımı dondurun ve DFM gözüyle yeniden ele alın.** Seri üretim sürecine göre [üretime yönelik tasarım (DFM)](https://takt.tr/blog/uretime-yonelik-tasarim-dfm) ve [montaja yönelik tasarım (DFA)](https://takt.tr/blog/montaja-yonelik-tasarim-dfa) incelemesi yapılmalı; parça sayısı, süreç uyumu ve montaj sırası sorgulanmalıdır.
2. **Kritik ölçüleri ayırın, toleransları gerçekçileştirin.** Her ölçüye dar tolerans vermek maliyeti şişirir; işlevi belirleyen ölçüler [geometrik toleranslama](https://takt.tr/blog/geometrik-toleranslama-gdt) ile tanımlanmalı, gerisi genel toleransa bırakılmalıdır.
3. **Hata modlarını masaya yatırın.** Seriye geçmeden önce tasarım ve süreç [FMEA çalışması](https://takt.tr/blog/fmea-hata-turu-etki-analizi), "binde bir" hataların seri ölçekte ne anlama geleceğini gösterir; kritik noktalara [poka-yoke](https://takt.tr/blog/poka-yoke-hata-onleyici-tasarim) önlemleri bu aşamada eklenir.
4. **Tedarikçileri seçin ve teklifleri aynı bazda karşılaştırın.** Süreç değişimiyle birlikte tedarik zinciri de kurulur; [fason üretici tekliflerini karşılaştırma rehberimiz](https://takt.tr/blog/fason-uretici-teklif-karsilastirma) bu adım için hazırlandı.
5. **Numune onayını sistematik yapın.** Otomotivde bu sürecin kurumsal karşılığı PPAP'tır: [AIAG'nin Production Part Approval Process](https://www.aiag.org/training-and-resources/manuals/details/PPAP-4) el kitabı, tedarikçinin üretim sürecinin tasarım kayıtlarını gerçek üretim koşullarında ve üretim hızında karşılayabildiğini göstermeyi standartlaştırır. Otomotiv dışı sektörlerde birebir PPAP şart olmasa da mantığı evrenseldir: onay numunesi, seri üretim koşullarında üretilmiş olmalıdır — prototip atölyesinde değil.
6. **Pilot parti üretin ve ölçün.** Küçük ama seri koşullarda üretilen bir parti; çevrim süresi, ıskarta oranı ve montaj uyumu hakkında tek numunenin asla veremeyeceği bilgiyi verir.
7. **Seriye geçin, süreci izlemeye devam edin.** Süreç kararlılığı ve yeterliliği izlenmeli; bu konunun çerçevesini [süreç yeteneği yazımızda](https://takt.tr/blog/six-sigma-surec-yetenegi) ele almıştık. Kalite yönetim sisteminin genel çerçevesi için referans [ISO 9001](https://www.iso.org/standard/62085.html) standardıdır.

## Prototip Süreci ile Seri Süreç Nasıl Eşleşir?

| Prototipte kullanılan | Seride tipik karşılığı | Geçişte değişen tasarım kuralları |
|---|---|---|
| CNC'den tek parça işleme | Döküm + kritik yüzeylerde işleme | Çekme açısı, et kalınlığı, işleme payı |
| Polimer 3D baskı | Enjeksiyon kalıplama | Sabit et kalınlığı, çekme açısı, kalıp ayrım hattı |
| Elde kesim + kaynak | Lazer kesim + abkant + fikstürlü kaynak | [Sac DFM kuralları](https://takt.tr/blog/sac-metal-tasarimi-dfm): büküm yarıçapı, K-faktörü |
| Tek tek montaj | Hat/istasyon montajı | DFA: yönlendirme, erişim, standart bağlantı |

Tablo bir uyarıdır: sürecin değiştiği her satırda tasarım "aynı kalamaz". Geçişin en pahalı hatası, prototip geometrisini yeni sürece dokunmadan göndermektir.

## Hangi Bilgileri Hazırlamalısınız?

Seriye geçiş çalışması veya teklif isterken şu girdiler gereklidir:

- **Hacim tahmini:** Yıllık adet ve parti büyüklüğü — süreç seçimini (kalıp mı, işleme mi) bu belirler. Kesin bilmiyorsanız aralık verin; senaryolu teklif isteyin.
- **Hedef maliyet çerçevesi:** Rakam paylaşmak istemeseniz bile "maliyet mi, süre mi, performans mı" önceliğiniz net olmalı.
- **Prototipte öğrenilenler:** Hangi ölçüler kritik çıktı, neler revize edildi, hangi testlerden geçti — bu bilgi FMEA'nın ve tolerans kararlarının girdisidir.
- **Kabul kriterleri:** Numune ve seri parti hangi ölçüm ve testlerle kabul edilecek?
- **Değişiklik yönetimi kuralı:** Tedarikçi süreçte değişiklik yaparsa (malzeme, kalıp, alt tedarikçi) bildirim zorunluluğu baştan yazılmalıdır.

## Riskler ve Kırmızı Bayraklar

- **Tek numuneyle seri onayı:** Bir adet iyi parça, sürecin yeterli olduğunu göstermez; değişkenlik ancak partiyle görülür.
- **Prototip atölyesinde üretilmiş "seri numunesi":** Onay numunesi seri süreçte, seri takımlarla üretilmemişse hiçbir şeyi onaylamaz.
- **Ölçülmemiş kritik ölçüler:** Prototipte hiç ölçülmemiş bir ölçünün seride tolerans dışı çıkması sürpriz değildir.
- **Sözleşmede değişiklik bildirimi yok:** Sessiz süreç değişiklikleri, seri üretimde kalite sorunlarının klasik kaynağıdır.
- **Kalıp yatırımının acele verilmesi:** Tasarım donmadan açılan kalıp, en pahalı revizyon biçimidir.

## Sık Sorulan Sorular

### Seriye geçmeden kaç prototip turu gerekir?

Sabit bir sayı yok; ölçüt tur sayısı değil, çıkış kriteridir: işlev doğrulandı, kritik ölçüler belirlendi, testler geçildi ve tasarım donduruldu ise geçişe hazırsınız demektir.

### PPAP otomotiv dışı projeler için de gerekli mi?

Belge seti olarak şart değil; mantık olarak evet. "Seri koşullarda üretilmiş numune + ölçüm raporu + süreç tanımı" üçlüsü, sektörden bağımsız olarak sağlıklı bir onay tabanıdır.

### Pilot parti kaç adet olmalı?

Parçanın değerine ve sürece bağlıdır; amaç istatistiksel kesinlik değil, süreç değişkenliğini ve montaj uyumunu görmektir. Süreci gerçek hızında, gerçek operatörle çalıştıran en küçük parti doğru başlangıçtır.

### Prototip tedarikçim seri üretimi de yapmalı mı?

Şart değil; prototip atölyeleri ile seri üreticiler farklı uzmanlıklardır. Önemli olan geçişte bilgi kaybını önlemek: çizimler, kritik ölçüler ve öğrenilenler yeni tedarikçiye eksiksiz aktarılmalıdır.

## Sonuç

Prototipten seri üretime geçiş bir sipariş değil, bir mühendislik projesidir: tasarım yeni sürece göre gözden geçirilir, toleranslar gerçekçileşir, hata modları önceden ele alınır, numune seri koşullarda onaylanır ve pilot parti ile değişkenlik görülür. Bu adımların her biri atlanabilir — ama maliyeti seri üretimde, çarpanla ödenir.

---

**Prototibiniz çalışıyor ama seri üretime nasıl taşıyacağınız belirsiz mi?** Takt olarak tasarımınızı seri sürece göre DFM gözüyle inceliyor, tedarikçi seçiminden numune onayına geçiş planını sizinle kuruyoruz. [Üretim danışmanlığı hizmetimize](https://takt.tr/hizmetler/uretim-danismanligi) göz atın veya [iletişime geçin](https://takt.tr/iletisim).

## Kaynaklar

- [Production Part Approval Process (PPAP) — AIAG](https://www.aiag.org/training-and-resources/manuals/details/PPAP-4) (seri parça onay sürecinin endüstri standardı çerçevesi)
- [Automotive Quality Core Tools — AIAG](https://www.aiag.org/expertise-areas/quality) (APQP, PPAP, FMEA, MSA ve SPC temel kalite araçları)
- [ISO 9001:2015 — Quality management systems: Requirements](https://www.iso.org/standard/62085.html) (kalite yönetim sistemi gereklilikleri)
