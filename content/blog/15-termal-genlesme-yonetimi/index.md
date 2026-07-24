---
title: "Termal Genleşme Yönetimi: Genleşmeyi Bastırmak Değil, Yönlendirmek"
description: "Yüksek sıcaklık sistemlerinde termal genleşme nasıl hesaplanır, deneyle doğrulanır ve kontrollü serbestlikle yönetilir? Bir tünel fırın projesinden saha örneği."
slug: "termal-genlesme-yonetimi"
date: 2026-05-07
updated: 2026-07-25
status: published
kind: case-study
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
reading_time: 7
---

## Termal Genleşme Yönetimi: Genleşmeyi Bastırmak Değil, Yönlendirmek

Yüksek sıcaklıkta çalışan bir makinede termal genleşme engellenmez; hesaplanır, deneyle doğrulanır ve tanımlı bir eksende serbest bırakılarak yönetilir. Bu vaka çalışmasında, 25 °C'den yaklaşık 450 °C'ye çıkan bir tünel fırın projesinde bu yaklaşımı nasıl uyguladığımızı anlatıyoruz: 1374 mm'lik temsilî bir pik döküm taşıyıcı elemanın yaklaşık 6,1 mm uzayacağı hesaplandı, bu değer prototip üzerinde kontrollü ısıtma deneyleriyle doğrulandı ve uzama, genleşme doğrultusuna paralel slotlu montajla kontrollü biçimde serbest bırakıldı.

Taş kaplı bir konveyör, zemin ve yan duvarlardan oluşan raylarla kılavuzlanmış dar bir aralıkta çalışıyorsa, konveyörü oluşturan döküm parçaların sıcaklık değişiminde CAD'de tanımlanan ölçülerde kalacağını varsaymak, sistemin kilitlenmesine yol açabilecek temel bir tasarım hatasıdır. Soru, genleşmenin olup olmayacağı değil, nereye gideceğidir.

### Termal Genleşme Nasıl Hesaplanır?

Lineer termal genleşme, [malzemenin genleşme katsayısı, başlangıç boyu ve sıcaklık farkının çarpımıyla](http://hyperphysics.phy-astr.gsu.edu/hbase/thermo/thexp.html) hesaplanır:

`ΔL = α · L₀ · ΔT`

Sistem 25 °C'den yaklaşık 450 °C'ye çıkıyor; sıcaklık farkı `ΔT ≈ 425 °C`. Pik (gri) döküm için ortalama lineer genleşme katsayısı yaklaşık `α ≈ 10–11 × 10⁻⁶ 1/°C` alınır; örneğin [ASTM A48 Class 30 gri döküm için tipik değer 10,5 × 10⁻⁶ 1/°C'dir](https://www.pentictonfoundry.com/news/gray-iron-astm-a48-class-30/). Temsilî taşıyıcı eleman için (L₀ = 1374 mm, α = 10,5 × 10⁻⁶ 1/°C):

`ΔL = 10,5 × 10⁻⁶ · 1374 · 425 ≈ 6,1 mm`

Tek bir döküm eleman yaklaşık 6 mm uzar. Ray içinde kılavuzlu çalışan ve genişliği sınırlandırılmış bir sistemde bu büyüklük, temas şartlarını doğrudan değiştirecek seviyededir.

### Genleşme Engellenirse Ne Olur?

Uzama tamamen engellenirse, ideal elastik varsayım altında oluşacak termal gerilme:

`σ = E · α · ΔT`

Gri döküm için elastisite modülü sınıfa göre değişir; örneğin [Class 40 gri döküm için üretici verisi E ≈ 17,7 × 10⁶ psi, yani yaklaşık 122 GPa'dır](https://www.dura-bar.com/getmedia/55edfe1d-a9f6-4aa8-bdb9-4819d9cd6130/G2-Gray-Iron-0319.pdf?ext=.pdf). Bu değerle:

`σ ≈ 122 000 · 10,5 × 10⁻⁶ · 425 ≈ 545 MPa`

Karşılaştırma için: [Class 30 gri dökümün çekme dayanımı yaklaşık 207 MPa'dır](https://www.pentictonfoundry.com/news/gray-iron-astm-a48-class-30/). Yani tam kısıtlanmış genleşmenin teorik gerilmesi, malzemenin oda sıcaklığındaki çekme dayanımının iki katından fazladır — üstelik çalışma sıcaklığında dayanım daha da düşer. Sonuç nettir: genleşmeyi bastırmak değil, yönlendirmek gerekir.

### Hesap Deneyle Nasıl Doğrulandı?

Hesap bir öngörüdür; ilk adım onu doğrulamaktı. Üretilen prototip parçalara kontrollü ısı uygulanarak farklı sıcaklıklarda boy ölçümü yapılan bir deney düzeneği kurduk. Her sıcaklık seviyesi için ölçülen uzama:

`ΔL_ölçüm = L_T − L₀`

teorik `ΔL = α · L₀ · ΔT` ile karşılaştırıldı. Ölçümler hesaplanan aralıkla tutarlılık gösterdi; bu doğrulama, tasarım müdahalesine güvenle geçilmesini sağladı. Hesap sahada teyit edilene kadar bir varsayımdı; deney onu tasarım girdisine çevirdi. Bu "git ve gör" disiplininin arka planını [genchi genbutsu yazımızda](https://takt.tr/blog/gemba-genchi-genbutsu) anlatıyoruz.

### Kontrollü Serbestlik Nasıl Uygulandı?

Amaç genleşmeyi engellemek değil, tanımlı bir eksende serbest bırakmaktı. İzlenen yol:

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

Termal genleşme, yüksek sıcaklıkta çalışan sistemlerde ikincil bir etki değildir. Hesaplanmadığında arıza üretir; hesaplandığında tasarım girdisine dönüşür. Bu projede genleşme sayısallaştırıldı, deneyle doğrulandı, kontrollü serbestlikle yönlendirildi ve sistem seviyesinde mekanik kontrolle desteklendi. Belirsizlik, bir risk olmaktan çıkıp hesaplanmış bir parametreye dönüştü.

Sınırlarını da not edelim: buradaki hesap, tekil bir elemanın lineer genleşmesini ele alır. Düzgün olmayan sıcaklık dağılımı, malzeme katsayısındaki parti farkları ve birleşim noktalarındaki sürtünme, gerçek davranışı ideal formülden saptırır — deneysel doğrulamanın vazgeçilmez olmasının nedeni de budur.

### Bu Yaklaşım Nerede Geçerli?

Fırınlar, kurutucular, ısıl işlem hatları ve sıcaklığı geniş aralıkta değişen her sistem termal genleşmeye açıktır. "Soğukken çalışıyordu, ısınınca sıkıştı" cümlesi, neredeyse her zaman hesaba katılmamış bir genleşmenin işaretidir.

---

**Yüksek sıcaklıkta çalışan bir sisteminiz mi var, ısındığında sıkışma ya da çarpılma mı yaşıyorsunuz?** takt.tr olarak termal genleşmeyi hesaplıyor, deneyle doğruluyor ve kontrollü serbestlik prensibiyle tasarıma çeviriyoruz; belirsizliği üretime girmeden ölçülmüş bir parametreye dönüştürüyoruz. [İletişime geçin / Termal tasarım desteği talep edin.](https://takt.tr/iletisim)

## Kaynaklar

- [Thermal Expansion — HyperPhysics, Georgia State University](http://hyperphysics.phy-astr.gsu.edu/hbase/thermo/thexp.html)
- [Gray Iron ASTM A48 Class 30 Data Sheet — Penticton Foundry](https://www.pentictonfoundry.com/news/gray-iron-astm-a48-class-30/)
- [Dura-Bar G2 (ASTM A48 Class 40) Gray Iron Technical Data — Charter Dura-Bar](https://www.dura-bar.com/getmedia/55edfe1d-a9f6-4aa8-bdb9-4819d9cd6130/G2-Gray-Iron-0319.pdf?ext=.pdf)
