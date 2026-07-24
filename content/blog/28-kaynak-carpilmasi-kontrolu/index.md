---
title: "Kaynak Çarpılması Yönetimi: Çarpılmayı Düzeltmek Değil, Oluşmasını Engellemek"
description: "Kaynak çarpılması neden olur, nasıl önlenir? Isı girdisi, kaynak sırası, fikstürleme ve tasarım kararlarıyla çarpılma kontrolü — TWI kaynaklarıyla."
slug: "kaynak-carpilmasi-kontrolu"
date: 2026-06-15
updated: 2026-07-25
status: review
kind: article
author: "Ömer Faruk Top"
category: "Saha & Analiz"
tags: ["kaynak-carpilmasi", "kaynakli-imalat", "isil-girdi", "fikstur", "celik-konstruksiyon"]
keywords:
  primary: "kaynak çarpılması (distortion) kontrolü"
  secondary: ["kaynak çarpılması neden olur", "ısı girdisi", "kaynak sırası", "çarpılma önleme"]
cover:
  src: "images/cover.jpg"
  alt: "Kaynak sırası ve fikstürleme ile çarpılması kontrol edilen çelik konstrüksiyon"
canonical: "https://takt.tr/blog/kaynak-carpilmasi-kontrolu"
og:
  type: "article"
  image: "images/cover.jpg"
schema: "TechArticle"
reading_time: 7
---

## Kaynak Çarpılması Yönetimi: Çarpılmayı Düzeltmek Değil, Oluşmasını Engellemek

Kaynak çarpılması, kaynak bölgesindeki lokal ısınma-soğuma çevriminin malzemede dengesiz genleşme ve büzüşme yaratmasından kaynaklanır; büyük ölçüde tasarım ve süreç kararlarıyla yönetilebilir. Çarpılmış bir parçayı zorlayarak, ısıtarak veya pres altında düzeltmek hem işçilik hem de malzemeye giren kalıcı gerilme demektir. Doğru yaklaşım, oluşan çarpılmayı düzeltmek değil, oluşmasını baştan sınırlamaktır.

Konu, [termal genleşme yazımızla](https://takt.tr/blog/termal-genlesme-yonetimi) aynı fiziğe dayanır: ısı, malzemede ölçülebilir boyut değişimi yaratır. Kaynakta bu değişim lokal ve dengesiz olduğu için sonuç çarpılma ve artık gerilmedir.

## Çarpılma Neden Olur?

[TWI'nin (The Welding Institute) teknik kaynağına](https://www.twi-global.com/technical-knowledge/job-knowledge/distortion-types-and-causes-033) göre mekanizma şudur: kaynak, birleşim kenarlarını çok lokal ısıttığı için ısınan bölge genleşmek ister ama çevresindeki soğuk metal buna izin vermez; soğuma sırasında kaynak metali ve ısı tesiri altındaki bölge büzüşürken soğuk ana metal buna direnir ve malzemenin akma sınırını aşan gerilmeler kalıcı şekil değişimi bırakır. Aynı kaynak, çarpılmanın altı temel biçimde görüldüğünü belirtir: boyuna büzülme, enine büzülme, açısal çarpılma, eğilme (bowing), çukurlaşma (dishing) ve burulma.

## Çarpılma Hangi Araçlarla Kontrol Edilir?

Kontrol araçları üç başlıkta toplanır; ilk ikisi [TWI'nin tasarım](https://www.twi-global.com/technical-knowledge/job-knowledge/distortion-prevention-by-design-034) ve [imalat teknikleri](https://www.twi-global.com/technical-knowledge/job-knowledge/distortion-control-prevention-by-fabrication-techniques-036) rehberlerinde ayrıntılı işlenir:

| Araç | Ne yapılır? | Neden işe yarar? |
| --- | --- | --- |
| Kaynak metalini azaltmak | Dikişi işlevin gerektirdiği boyutta tutmak; aşırı kaynaktan kaçınmak | Daha az ergimiş metal = daha az büzüşme; köşe dikişinde bacak boyunu büyütmek dayanım katmadan çarpılmayı artırır |
| Yerleşim ve denge | Dikişleri nötr eksene yakın ve simetrik yerleştirmek; iki tarafı dönüşümlü kaynatmak | Büzüşme kuvvetleri birbirini dengeler, kaldıraç etkisi azalır |
| Sıra ve teknik | Geri adım (back-step) / atlamalı (skip) kaynak; uzun dikişi tek yönde bitirmemek | Büzüşme birikmeden dağıtılır |
| Fikstür ve ön ayar | Kaynak sırasında bağlama; gerekirse ön eğme/ön ayar (pre-set) | Hareket kısıtlanır ya da beklenen büzüşme önceden telafi edilir |

## Tasarımcı Çarpılmayı Nasıl Azaltır?

Çarpılma yalnızca kaynakçının değil, tasarımcının da sorumluluğudur. [TWI'nin tasarım rehberindeki](https://www.twi-global.com/technical-knowledge/job-knowledge/distortion-prevention-by-design-034) ilkeler tasarım masasında uygulanır:

- **Kaynağı ortadan kaldır:** Büküm ya da standart profil kullanarak dikişi tamamen kaldırmak çoğu zaman mümkündür — bu aynı zamanda [DFM yazımızdaki](https://takt.tr/blog/uretime-yonelik-tasarim-dfm) operasyon azaltma ilkesidir.
- **Minimum kaynak metali:** Ağız açısını ve kök boşluğunu yeterli nüfuziyet için gereken en küçük değerde tutmak; sürekli yerine aralıklı (intermittent) dikiş düşünmek.
- **Nötr eksene yakın, simetrik dikişler:** Büzüşme kuvvetlerinin kaldıraç etkisini azaltır.

Bu yaklaşım, [Poka-Yoke yazımızdaki](https://takt.tr/blog/poka-yoke-hata-onleyici-tasarim) ilkeyle örtüşür: problemi sahada çözmek yerine tasarımda önlemek.

## Aşırı Kısıtlamanın Riski Ne?

Çarpılma sıfıra indirilemez; amaç onu kabul edilebilir sınırda tutmaktır. Fikstürle aşırı kısıtlama çarpılmayı azaltırken parçada yüksek artık gerilme bırakabilir; [TWI'nin ön ayar ve kısıtlama rehberi](https://www.twi-global.com/technical-knowledge/job-knowledge/distortion-prevention-by-pre-setting-pre-bending-or-use-of-restraint-035), kısıtlamayla çalışırken çatlama riskinin ve kilitli gerilmelerin dikkate alınması gerektiğini belirtir. Bazen büzüşmeyi tamamen engellemek yerine, onu tanımlı ve zararsız bir yöne kanalize etmek daha doğrudur — [termal genleşme yazımızdaki](https://takt.tr/blog/termal-genlesme-yonetimi) "bastırma, yönlendir" ilkesi.

## Sonuç

Kaynak çarpılması kaçınılmaz bir kader değil; ısı girdisi, dikiş yerleşimi, kaynak sırası ve fikstürleme ile yönetilebilen bir olgudur. Kontrol, kaynakçıdan önce tasarımda başlar: kaynak miktarını, simetriyi ve birleşim yerini doğru seçen tasarım, çarpılmayı oluşmadan azaltır. Çarpılmış parçayı düzeltmek pahalı ve risklidir; onu sınırlamak tasarım ve süreç kararlarıyla mümkündür.

---

**Kaynaklı imalatınızda çarpılma, ölçü sapması ve düzeltme işçiliği mi yaşıyorsunuz?** Takt olarak kaynaklı konstrüksiyonlarınızı çarpılma gözüyle inceliyor; kaynak miktarını, simetriyi, sırayı ve fikstürlemeyi tasarımda ele alıyoruz. [Tasarım ve geliştirme hizmetimize](https://takt.tr/hizmetler/tasarim-gelistirme) göz atın veya [iletişime geçin](https://takt.tr/iletisim).

## Kaynaklar

- [Distortion — Types and Causes — TWI](https://www.twi-global.com/technical-knowledge/job-knowledge/distortion-types-and-causes-033) (çarpılma mekanizması ve altı temel biçimi)
- [Distortion — Prevention by Design — TWI](https://www.twi-global.com/technical-knowledge/job-knowledge/distortion-prevention-by-design-034) (kaynak metalini azaltma, nötr eksen, dengeli kaynak)
- [Distortion Control — Prevention by Fabrication Techniques — TWI](https://www.twi-global.com/technical-knowledge/job-knowledge/distortion-control-prevention-by-fabrication-techniques-036) (geri adım/atlamalı kaynak, punta ve sıra)
- [Distortion — Prevention by Pre-setting, Pre-bending or Use of Restraint — TWI](https://www.twi-global.com/technical-knowledge/job-knowledge/distortion-prevention-by-pre-setting-pre-bending-or-use-of-restraint-035) (kısıtlama, ön eğme ve artık gerilme uyarısı)
