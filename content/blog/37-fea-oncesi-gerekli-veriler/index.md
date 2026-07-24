---
title: "FEA Öncesi Gerekli Veriler: Analiz İçin Kontrol Listesi"
description: "Bir FEA çalışması istemeden önce hangi veriler hazır olmalı? Yükler, malzeme, sınır koşulları, geometri ve kabul kriterleri için pratik bir kontrol listesi."
slug: "fea-oncesi-gerekli-veriler"
date: 2026-07-12
updated: 2026-07-25
status: review
kind: article
author: "Ömer Faruk Top"
category: "Satın Alma Rehberi"
tags: ["fea", "simulasyon", "yapisal-analiz", "veri-hazirligi", "kontrol-listesi"]
keywords:
  primary: "FEA öncesi gerekli veriler"
  secondary: ["FEA için hangi veriler gerekli", "sonlu elemanlar analizi girdileri", "FEA hizmeti alma", "analiz öncesi hazırlık"]
cover:
  src: "images/cover.jpg"
  alt: "Sonlu elemanlar analizi öncesi hazırlanan yük, malzeme ve sınır koşulu verilerini gösteren çalışma masası"
canonical: "https://takt.tr/blog/fea-oncesi-gerekli-veriler"
og:
  type: "article"
  image: "images/cover.jpg"
schema: "BlogPosting"
reading_time: 8
---

## FEA Öncesi Gerekli Veriler: Analiz İçin Kontrol Listesi

Bir sonlu elemanlar analizinin (FEA) kalitesi, yazılımdan önce girdilerde belirlenir. Analiz istemeden önce beş grupta veri hazır olmalıdır: cevaplanacak mühendislik sorusu, güncel geometri, gerçek yükler ve senaryolar, ısıl işlemi bilinen malzeme verisi ve gerçeğe uygun sınır koşulları — artı, sonucun neyle kıyaslanacağını söyleyen kabul kriteri. Bu yazı, [FEA yazımızın](https://takt.tr/blog/sonlu-elemanlar-analizi-fea) devamı olarak, analiz hizmeti alan tarafın hazırlaması gerekenleri adım adım listeler. Eksik veriyle başlayan analiz gecikmez; daha kötüsü, yanlış girdiyle inandırıcı görünen yanlış sonuç üretir.

## Analizden Önce Hangi Soru Cevaplanmalı?

İlk ve en kritik girdi bir dosya değil, bir cümledir: **"Bu analizin sonucuna göre hangi karar verilecek?"** "Parça dayanır mı?" ile "Parçayı yüzde kaç hafifletebiliriz?" farklı analiz kurguları gerektirir; biri en kötü senaryoyu, diğeri optimizasyon döngüsünü ister. Karar sorusu netleşmeden kapsam, dolayısıyla süre ve maliyet de netleşemez. Bu, [makine tasarım hizmeti fiyatı yazımızda](https://takt.tr/blog/makine-tasarim-hizmeti-fiyati) anlattığımız ilkeyle aynıdır: kapsamı tanımlanmamış işin teklifi de tanımsızdır.

## Hangi Veriler Gerekli, Eksikse Ne Olur?

| Veri grubu | İçermesi gerekenler | Eksikse ne olur |
|---|---|---|
| Geometri | Güncel 3B model (STEP/Parasolid), revizyon numarası, kaynak dikişleri ve delikler dahil | Eski revizyon analiz edilir; sonuç üretilen parçayı temsil etmez |
| Yükler | Kuvvetlerin büyüklüğü, yönü, uygulama noktası; statik mi dinamik mi; çevrim sayısı | Analist tahmin eder; tahmin edilen yük gerçek yük değildir |
| Senaryolar | Normal çalışma, en kötü durum, kaza/çarpma, taşıma-kaldırma halleri | Sadece "güzel gün" senaryosu doğrulanır |
| Malzeme | Alaşım, standardı, ısıl işlem durumu, varsa gerçek test verisi | Katalogdaki en iyimser değerle hesap yapılır |
| Sınır koşulları | Parça neye, nasıl bağlı: cıvata, kaynak, oturma yüzeyi; temas eden komşu parçalar | Gerçekte esnek olan mesnet rijit modellenir; gerilmeler yanlış dağılır |
| Kabul kriteri | Hangi emniyet katsayısı, hangi standarda göre; izin verilen sehim | "Sonuç iyi mi?" sorusu cevapsız kalır |

## Malzeme Verisi Nereden Gelmeli?

Malzeme kartındaki değerlerin kaynağı sorgulanmalıdır. Metalik malzemelerin çekme özellikleri (akma, çekme dayanımı, elastisite modülü) [ISO 6892-1](https://www.iso.org/standard/78322.html) gibi standart test yöntemleriyle belirlenir; tedarikçi sertifikasındaki değerler bu testlere dayanır. Kritik parçalarda katalog değeri yerine malzeme sertifikasındaki gerçek döküm/parti değerlerini kullanmak, analizin gerçeğe yaklaşmasını sağlar. Isıl işlem bilgisi özellikle önemlidir: aynı alaşımın tavlanmış ve sertleştirilmiş hali arasındaki dayanım farkı, analiz sonucunu tamamen değiştirir. Kaynaklı yapılarda ise kaynak bölgesinin ana malzemeden farklı davrandığı unutulmamalı; [kaynak çarpılması yazımızda](https://takt.tr/blog/kaynak-carpilmasi-kontrolu) bu bölgenin neden kritik olduğunu ele almıştık.

## Yükler ve Sınır Koşulları Nasıl Tanımlanmalı?

Yük tanımında en sık hata, nominal değeri en kötü durum sanmaktır. Motor kalkış momenti, çarpma, tutukluk (jam) ve bakım sırasındaki yükler nominalin katları olabilir. İkinci sık hata, yükleme geçmişini atlamaktır: milyonlarca çevrim gören bir parçada statik dayanım yeterli görünse bile yorulma belirleyicidir — bu yüzden çevrim sayısı ve yük spektrumu analiste verilmelidir.

Sınır koşullarında ise altın kural şudur: parçayı tek başına değil, bağlandığı ortamla birlikte düşünün. Cıvatalı birleşim rijit mesnet değildir; ince bir şase, üzerine monte edilen parçaya esneklik katar. Bağlantı detaylarının fotoğrafları ve komşu parçaların modelleri, analistin doğru idealizasyon yapmasını sağlar.

## Kabul Kriteri ve Doğrulama Neden Baştan Konuşulmalı?

Analiz sonucu tek başına "iyi" ya da "kötü" değildir; bir kritere göre iyi ya da kötüdür. Hangi emniyet katsayısının, hangi standart veya şirket kuralına göre uygulanacağı baştan yazılmalıdır. Analizin kendi iç kalitesi için de iki kontrol şarttır: ağ yakınsaması — [NAFEMS'in bilgi tabanı](https://www.nafems.org/publications/knowledge-base/the-importance-of-mesh-convergence-part-1/) bu kontrolün doğruluk üzerindeki etkisini ayrıntılı işler — ve mümkünse fiziksel doğrulama. Hesaplamalı modelin doğrulama ve geçerleme çerçevesini [ASME V&V 10](https://www.asme.org/codes-standards/find-codes-standards/standard-for-verification-and-validation-in-computational-solid-mechanics) tanımlar: denklemlerin doğru çözülmesi ayrı, modelin gerçeği temsil etmesi ayrı bir sorudur. Elinizde geçmiş bir test, saha ölçümü veya arıza verisi varsa analiste verin; modelin gerçekle kalibre edilmesini sağlayan en değerli girdi budur.

## Riskler ve Kırmızı Bayraklar

Analiz hizmeti alırken şu işaretlere dikkat edin:

- **Hiç soru sorulmuyor:** Geometriyi alıp doğrudan sonuç dönen analist, eksik bilgiyi varsayımla doldurmuş demektir — hangi varsayımla, raporda yazmalı.
- **Rapor sadece renkli görüntü:** Girdilerin, kabullerin, ağ yakınsamasının ve kriterin yazılmadığı rapor, denetlenemez.
- **Tek senaryo:** Yalnızca nominal yükün analiz edildiği çalışma, en kötü durumu görmez.
- **Malzeme kaynağı belirsiz:** "Çelik aldık" düzeyinde malzeme tanımı, sonucun güvenilirliğini baştan sınırlar.
- **Doğrulama planı yok:** "Sonucu neyle sınayacağız?" sorusunun cevabı yoksa, analiz hipotez olarak kalır.

## Sık Sorulan Sorular

### Elimde 3B model yok, sadece teknik resim var. Analiz yapılabilir mi?

Yapılabilir; model resimden yeniden oluşturulur, ancak bu ek süre demektir. Parça mevcutsa [3B tarama ile geometri dijitale aktarılabilir](https://takt.tr/blog/3d-tarama-klasik-olcum-karsilastirma) — özellikle çizimi kayıp eski parçalarda pratik bir yoldur.

### Yükleri tam bilmiyorum. Yine de başlayabilir miyiz?

Başlanabilir, ama sınırı bilerek: analiz "bu yük altında ne olur?" sorusuna cevap verir, "yük ne?" sorusuna veremez. Belirsiz yüklerde duyarlılık çalışması (yükü aralık olarak taramak) daha dürüst bir yaklaşımdır.

### Analiz için hangi dosya formatı ideal?

Nötr formatlar (STEP, Parasolid) çoğu durumda yeterlidir. Kaynak CAD dosyası, geometri temizliği ve varyant denemeleri gerektiğinde işi hızlandırır.

### Her parça için FEA gerekli mi?

Hayır. El hesabıyla güvenle boyutlandırılabilen basit yükleme halleri için FEA fazladan maliyettir. FEA; karmaşık geometri, çoklu yük yolu ve kritik sonuç riskinin birleştiği yerde değer üretir.

## Sonuç

FEA'nın kalitesi analistin bilgisayarında değil, sizin hazırladığınız dosyada başlar. Karar sorusu, güncel geometri, gerçek yükler ve senaryolar, kaynağı belli malzeme verisi, gerçeğe uygun sınır koşulları ve yazılı kabul kriteri — bu altı başlık tamamsa analiz hızlı, isabetli ve denetlenebilir olur. Eksikse, en pahalı yazılım bile eksik sorunun eksiksiz görünümlü cevabını üretir.

---

**Analiz yaptırmak istiyorsunuz ama elinizdeki verinin yeterli olup olmadığından emin değil misiniz?** Takt olarak analiz kapsamını sizinle birlikte tanımlıyor, eksik veriyi belirleyip doğrulanabilir bir çalışma kuruyoruz. [Analiz ve hesaplama hizmetimize](https://takt.tr/hizmetler/analiz-hesaplama) göz atın veya [iletişime geçin](https://takt.tr/iletisim).

## Kaynaklar

- [ASME V&V 10 — Standard for Verification and Validation in Computational Solid Mechanics](https://www.asme.org/codes-standards/find-codes-standards/standard-for-verification-and-validation-in-computational-solid-mechanics) (hesaplamalı modelin doğrulama ve geçerleme çerçevesi)
- [The Importance of Mesh Convergence — NAFEMS](https://www.nafems.org/publications/knowledge-base/the-importance-of-mesh-convergence-part-1/) (ağ yakınsamasının analiz doğruluğuna etkisi)
- [ISO 6892-1:2019 — Metallic materials: Tensile testing at room temperature](https://www.iso.org/standard/78322.html) (malzeme mekanik özelliklerinin standart test yöntemi)
