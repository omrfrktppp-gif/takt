---
title: "Termal Genleşme Yönetimi: Genleşmeyi Bastırmak Değil, Yönlendirmek"
description: "Yüksek sıcaklık sistemlerinde termal genleşme nasıl hesaplanır, deneyle doğrulanır ve kontrollü serbestlikle yönetilir? Bir tünel fırın projesinden saha örneği."
slug: "termal-genlesme-yonetimi"
date: 2026-06-26
updated: 2026-06-26
status: review
author: "Ömer Faruk"
category: "Saha & Analiz"
tags: ["termal-genlesme", "makine-tasarimi", "termal-gerilme", "pik-dokum", "yuksek-sicaklik"]
keywords:
  primary: "termal genleşme hesabı makine tasarımı"
  secondary: ["termal genleşme nedir", "termal gerilme", "slotlu montaj", "yüksek sıcaklık tasarımı"]
cover:
  src: "images/cover.jpg"
  alt: "Yüksek sıcaklıkta termal genleşmeyi slotlu montajla yönlendiren konveyör tasarımı"
canonical: "https://takt.tr/blog/termal-genlesme-yonetimi"
og:
  type: "article"
  image: "images/cover.jpg"
schema: "TechArticle"
reading_time: 6
---

## Termal Genleşme Yönetimi: Genleşmeyi Bastırmak Değil, Yönlendirmek

Bir makine tasarımı CAD ortamında ölçü belirlemekten ibaret değildir. Bu, 450°C'ye çıkan bir tünel fırın projesinde doğrudan görülür. Taş kaplı bir konveyör, zemin ve yan duvarlardan oluşan raylarla kılavuzlanmış dar bir aralıkta çalışıyorsa, bu konveyörü oluşturan pik döküm parçaların sıcaklık değişiminde CAD'de tanımlanan ölçülerde kalacağını varsaymak, sistemin kilitlenmesine yol açabilecek temel bir tasarım hatasıdır. Yüksek sıcaklıkta ölçüler sabit değildir; soru, genleşmenin olup olmayacağı değil, nereye gideceğidir.

Bu yazıda termal genleşmenin nasıl hesaplandığını, deneyle nasıl doğrulandığını ve kontrollü serbestlik yaklaşımıyla nasıl yönetildiğini gerçek bir tünel fırın projesinden örnekle ele alıyoruz. Tasarım detayı paylaşmadan, hesap ve izlenen yöntem üzerinden.

### Termal Genleşme Hesabı

Sistem 25°C'den yaklaşık 450°C'ye çıkıyor, yani sıcaklık farkı:

`ΔT ≈ 425 °C`

Pik döküm için ortalama lineer genleşme katsayısı `α ≈ 10–11 × 10⁻⁶ 1/°C`. Temsilî bir taşıyıcı eleman için (L₀ = 1374 mm, α = 10,5 × 10⁻⁶ 1/°C):

`ΔL = α · L₀ · ΔT`
`ΔL = 10,5 × 10⁻⁶ · 1374 · 425 ≈ 6,1 mm`

Yani tek bir döküm eleman yaklaşık 6 mm uzar. Ray içinde kılavuzlu çalışan ve genişliği sınırlandırılmış bir sistemde bu büyüklük, temas şartlarını doğrudan değiştirecek seviyededir.

Eğer bu uzama engellenirse, ideal elastik varsayım altında oluşacak termal gerilme:

`σ = E · α · ΔT`

Pik döküm için `E ≈ 110–130 GPa` alındığında:

`σ ≈ 500–600 MPa`

Bu değer, çalışma sıcaklığında zaten düşen malzeme dayanımı düşünüldüğünde güvenli bir senaryo değildir. Sonuç nettir: genleşmeyi bastırmak değil, yönlendirmek gerekir.

### Deneysel Doğrulama

Hesap bir öngörüdür; ilk adım onu doğrulamaktır. Üretilen prototip parçalara kontrollü ısı uygulanarak farklı sıcaklıklarda boy ölçümü yapılan bir deney düzeneği kuruldu. Her sıcaklık seviyesi için ölçülen uzama:

`ΔL_ölçüm = L_T − L₀`

teorik `ΔL = α · L₀ · ΔT` ile karşılaştırıldı. Ölçümler hesaplanan aralıkla tutarlılık gösterdi. Bu doğrulama, tasarım müdahalesine güvenle geçilmesini sağladı. Hesap sahada teyit edilene kadar bir varsayımdı; deney onu tasarım girdisine çevirdi.

### Kontrollü Serbestlik Yaklaşımı

Amaç genleşmeyi engellemek değil, tanımlı bir eksende serbest bırakmaktı. Bunun için izlenen yol:

- Parçanın asıl referans boyu belirlendi.
- Genleşmenin yoğunlaştığı eksen netleştirildi.
- İki serbest nokta prensibi uygulandı.
- Zincir bağlantı yüzeylerinde slotlu montaj tercih edildi; slot yönü genleşme doğrultusuna paralel tanımlandı.

Slot uzunluğu, genleşme ve güvenlik payı birlikte düşünülerek boyutlandırıldı:

`L_slot ≥ ΔL + güvenlik payı`

Yaklaşık 6 mm genleşmeye, tolerans ve sıcaklık belirsizliği için ek pay eklendi. Böylece eksenel uzama serbest bırakıldı, enine stabilite korundu ve raylara ilave sıkışma yükü aktarılmadı.

### Sistem Seviyesinde Kontrol

Fırının "cehennemlik" olarak adlandırılan yüksek sıcaklık bölgesinde, genleşme mesafelerini ve raylardaki dislokasyonları yönetmek amacıyla taşıyıcı gövde üzerine sıcak retork uygulayabilecek kontrol kolları kurgulandı. Bu mekanik müdahaleyle çalışma sırasında oluşan diferansiyel genleşmeler izlenebilir hale geldi, konveyör doğrultusu kontrol altında tutuldu ve lokal zorlanmalar sistematik olarak dengelendi.

### Sonuç

Termal genleşme, yüksek sıcaklıkta çalışan sistemlerde ikincil bir etki değildir. Hesaplanmadığında arıza üretir; hesaplandığında tasarım girdisine dönüşür. Bu projede genleşme sayısallaştırıldı, deneyle doğrulandı, kontrollü serbestlikle yönlendirildi ve sistem seviyesinde mekanik kontrolle desteklendi. Böylece belirsizlik bir risk olmaktan çıkıp hesaplanmış bir parametreye dönüştü.

### Bu Yaklaşım Nerede Geçerli?

Fırınlar, kurutucular, ısıl işlem hatları ve sıcaklığı geniş aralıkta değişen her sistem termal genleşmeye açıktır. "Soğukken çalışıyordu, ısınınca sıkıştı" cümlesi, neredeyse her zaman hesaba katılmamış bir genleşmenin işaretidir.

---

**Yüksek sıcaklıkta çalışan bir sisteminiz mi var, ısındığında sıkışma ya da çarpılma mı yaşıyorsunuz?** takt.tr olarak termal genleşmeyi hesaplıyor, deneyle doğruluyor ve kontrollü serbestlik prensibiyle tasarıma çeviriyoruz; belirsizliği üretime girmeden ölçülmüş bir parametreye dönüştürüyoruz. [İletişime geçin / Termal tasarım desteği talep edin.](https://takt.tr/iletisim)
