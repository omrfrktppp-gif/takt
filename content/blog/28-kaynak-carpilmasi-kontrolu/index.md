---
title: "Kaynak Çarpılması Yönetimi: Çarpılmayı Düzeltmek Değil, Oluşmasını Engellemek"
description: "Kaynak çarpılması neden olur, nasıl önlenir? Isı girdisi, kaynak sırası ve fikstürleme ile çarpılmayı tasarımda kontrol etmenin yöntemlerini kaynaklarla anlatıyoruz."
slug: "kaynak-carpilmasi-kontrolu"
date: 2026-06-26
updated: 2026-06-26
status: review
author: "Ömer Faruk"
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
reading_time: 6
---

## Kaynak Çarpılması Yönetimi: Çarpılmayı Düzeltmek Değil, Oluşmasını Engellemek

Kaynaklı bir konstrüksiyon, kaynak bittikten sonra çarpıldığında çoğu zaman geç kalınmıştır. Çarpılmış bir parçayı zorlayarak, ısıtarak veya pres altında düzeltmek hem işçilik hem de malzemenin içine giren kalıcı gerilme demektir. Oysa çarpılma, kaynağın kaçınılmaz bir yan etkisi değil, büyük ölçüde yönetilebilir bir olgudur. Doğru yaklaşım, oluşan çarpılmayı düzeltmek değil, oluşmasını baştan engellemektir.

Bu yazıda kaynak çarpılmasının neden oluştuğunu ve ısı girdisi, kaynak sırası ve fikstürleme ile nasıl kontrol edileceğini kaynaklara dayanarak ele alıyoruz. Konu, daha önceki termal genleşme yazımızla aynı fiziğe dayanır: ısının malzemeyi genleştirip büzüştürmesi.

### Çarpılma Neden Olur?

Lincoln Electric'in net tanımıyla, "kaynaktaki çarpılma, kaynak metalinin ve komşu ana metalin ısınma ve soğuma çevriminde genleşmesi ve büzüşmesinden kaynaklanır" (Lincoln Electric). Mekanizma şudur: kaynak bölgesi yoğun biçimde ısınır ve genleşmek ister; ancak çevresindeki soğuk metal bu genleşmeyi engeller. Soğuma sırasında ise kaynak metali büzüşür ve çevresindeki malzemeyi kendine doğru çeker. Bu büzüşme dengesiz olduğunda parça çarpılır.

Bu, daha önceki termal genleşme yazımızdaki ilkenin bir başka görünümüdür: ısı, malzemede ölçülebilir boyut değişimi yaratır. Kaynakta bu değişim lokal ve dengesiz olduğu için, sonucu çarpılma ve artık gerilmedir.

### Çarpılmayı Kontrol Etmenin Üç Aracı

Çarpılma kontrolü, sektör kaynaklarında tutarlı biçimde üç temel araç etrafında toplanır:

- **Isı girdisini kontrol etmek:** Çarpılmanın temel sürücüsü ısıdır. Dikiş boyutunu gereğinden büyük tutmamak ve ilerleme hızını doğru ayarlamak, parçaya giren toplam ısıyı sınırlar (Xiris; Welding Tables & Fixtures). Gereğinden fazla ısı, gereğinden fazla çarpılma demektir.
- **Kaynak sırası ve tekniği:** Dikişlerin hangi sırayla ve hangi yönde atıldığı, büzüşmenin dengeli dağılmasını belirler. Geri adım (back-step) tekniği ve simetrik kaynak sırası, büzüşme kuvvetlerinin birbirini dengelemesini sağlar (Kicking Horse Welders).
- **Fikstürleme ve bağlama:** Parçayı kaynak sırasında sabitleyen fikstürler ve kelepçeler, çarpılmayı fiziksel olarak kısıtlar ve yapıyı stabilize eder. Doğru fikstür, çarpılmanın oluşmadan engellenmesini sağlar.

Bu üç araç birlikte kullanıldığında çarpılma, düzeltilmesi gereken bir hata olmaktan çıkıp, tasarım ve süreçle yönetilen bir parametreye dönüşür.

### Tasarım Çarpılmayı Nasıl Azaltır?

Çarpılma yalnızca kaynakçının değil, tasarımcının da sorumluluğudur. Tasarım kararları, çarpılma eğilimini daha kaynak başlamadan belirler:

- **Kaynak miktarını azaltmak:** Gereğinden büyük veya gereğinden çok dikiş, daha çok ısı ve daha çok çarpılma demektir. İşlevin gerektirdiği minimum kaynağı tasarlamak çarpılmayı doğrudan azaltır.
- **Simetri:** Kaynakları nötr eksene göre simetrik yerleştirmek, büzüşme kuvvetlerinin birbirini dengelemesini sağlar.
- **Kaynak yerini seçmek:** Birleşimleri parçanın rijit bölgelerine yakın konumlandırmak, çarpılmaya direnci artırır.

Bu yaklaşım, daha önceki DFA ve Poka-Yoke yazılarımızdaki ilkeyle örtüşür: problemi sahada çözmek yerine tasarımda önlemek. Çarpılmayı azaltan bir tasarım, kaynakçının işini de kolaylaştırır.

### Eleştirel Bakış

Çarpılma sıfıra indirilemez; amaç onu kabul edilebilir sınırlar içinde tutmaktır. Aşırı fikstürleme veya aşırı kısıtlama, çarpılmayı azaltırken parçanın içinde yüksek artık gerilme bırakabilir; bu gerilme sonradan, yük altında veya işleme sırasında ortaya çıkabilir. Bu yüzden çarpılma kontrolü, daha önceki termal genleşme yazımızdaki "bastırmak değil yönlendirmek" ilkesiyle dengelenmelidir: bazen büzüşmeyi tamamen engellemek yerine, onu tanımlı ve zararsız bir yöne kanalize etmek daha doğrudur.

### Sonuç

Kaynak çarpılması, kaynağın kaçınılmaz bir kaderi değil, ısı girdisi, kaynak sırası ve fikstürleme ile yönetilebilen bir olgudur. Üstelik kontrol, kaynakçıdan önce tasarımda başlar: kaynak miktarını, simetriyi ve birleşim yerini doğru seçen bir tasarım, çarpılmayı oluşmadan azaltır. Çarpılmış parçayı düzeltmek pahalı ve risklidir; onu engellemek ise tasarım ve süreç kararlarıyla mümkündür.

### Bu Yaklaşım Nerede Geçerli?

Çelik konstrüksiyon, şasi, çerçeve ve kaynaklı tüm imalatlar çarpılma riskine açıktır. "Kaynaktan sonra parça çarpılıyor, düzeltmeye işçilik harcıyoruz" cümlesi, ısı girdisi, kaynak sırası veya tasarımda bir iyileştirme fırsatına işaret eder.

---

**Kaynaklı imalatınızda çarpılma, ölçü sapması ve düzeltme işçiliği mi yaşıyorsunuz?** takt.tr olarak kaynaklı konstrüksiyonlarınızı çarpılma gözüyle inceliyor; kaynak miktarını, simetriyi, sırayı ve fikstürlemeyi tasarımda ele alarak çarpılmayı oluşmadan azaltıyoruz. [İletişime geçin / Kaynaklı imalat ve çarpılma desteği talep edin.](https://takt.tr/iletisim)

## Kaynaklar
- Weld Distortion (çarpılmanın nedeni: genleşme/büzüşme) — Lincoln Electric. https://www.lincolnelectric.com/en/welding-and-cutting-resource-center/welding-how-tos/weld-distortion
- Welding Distortion: Causes, Prevention, and Repair (ısı girdisi kontrolü) — Xiris. https://blog.xiris.com/blog/welding-distortion
- Welding Distortion Control: Prevention and Correction Techniques (geri adım, fikstürleme) — Kicking Horse Welders. https://kickinghorsewelders.ca/welding-distortion-control-prevention-and-correction-techniques-ezp-43
- Heat Control in Welding: How to Prevent Warping and Distortion (amperaj, ilerleme hızı) — Welding Tables & Fixtures. https://weldingtablesandfixtures.com/blogs/the-welders-blog/heat-control-in-welding-how-to-prevent-warping-and-distortion
