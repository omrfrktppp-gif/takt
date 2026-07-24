---
title: "3D Tarama mı, Klasik Ölçüm mü? Doğru Yöntemi Seçme Rehberi"
description: "3D tarama ile CMM ve klasik ölçüm arasındaki fark ne? Doğruluk, veri yoğunluğu, hız ve yüzey kısıtları ekseninde karşılaştırma; hangi işte hangisi seçilmeli."
slug: "3d-tarama-klasik-olcum-karsilastirma"
date: 2026-07-15
updated: 2026-07-25
status: review
kind: article
author: "Ömer Faruk Top"
category: "Satın Alma Rehberi"
tags: ["3d-tarama", "cmm", "olcum", "tersine-muhendislik", "kalite"]
keywords:
  primary: "3D tarama ile klasik ölçüm karşılaştırması"
  secondary: ["3D tarama mı CMM mi", "tersine mühendislikte ölçüm", "optik ölçüm doğruluğu", "3D tarama ne zaman kullanılır"]
cover:
  src: "images/cover.jpg"
  alt: "Bir metal parçanın optik 3D tarayıcı ve koordinat ölçüm cihazıyla ölçülmesini karşılaştıran görsel"
canonical: "https://takt.tr/blog/3d-tarama-klasik-olcum-karsilastirma"
og:
  type: "article"
  image: "images/cover.jpg"
schema: "BlogPosting"
reading_time: 8
---

## 3D Tarama mı, Klasik Ölçüm mü? Doğru Yöntemi Seçme Rehberi

3D tarama ile klasik ölçüm (kumpas, mikrometre, koordinat ölçüm cihazı — CMM) rakip değil, farklı sorulara cevap veren tamamlayıcı yöntemlerdir. Kısa cevap şudur: az sayıda kritik ölçüyü en yüksek doğrulukla doğrulamak istiyorsanız temaslı ölçüm; parçanın tüm yüzey geometrisini yakalamak — tersine mühendislik, çarpılma haritası, kalıp aşınması — istiyorsanız 3D tarama doğru araçtır. Bu yazıda iki yaklaşımın gerçekte neyi ölçtüğünü, güçlü ve zayıf yönlerini ve hizmet alırken nelerin netleştirilmesi gerektiğini ele alıyoruz.

## İki Yöntem Temelde Ne Yapar?

**Temaslı/klasik ölçüm** noktasal çalışır: prob veya ölçü aleti, parçaya tanımlı noktalarda dokunur ve o noktaların koordinatını ya da iki yüzey arasındaki mesafeyi verir. Temaslı CMM'lerin doğruluk beyanı ve kabul testleri [ISO 10360-2](https://www.iso.org/standard/40954.html) standardıyla tanımlanır; üretici, cihazın izin verilen en büyük ölçüm hatasını bu çerçevede beyan eder.

**Optik 3D tarama** alansal çalışır: parça yüzeyinden milyonlarca nokta içeren bir nokta bulutu toplar ve bunu bir yüzey modeline dönüştürür. Optik 3D koordinat ölçüm sistemlerinin kabul ve yeniden doğrulama testleri ise [ISO 10360-13](https://www.iso.org/standard/74957.html) standardında tanımlıdır. Aynı standardın kapsamı önemli bir kısıtı da açık eder: optik sistemlerin performans doğrulaması, taranan yüzeyin özellikleri (parlaklık, renk) belirli bir "işbirlikçi" aralıkta kaldığı sürece geçerlidir — parlak, ayna gibi veya saydam yüzeyler optik tarama için zorlu bölgedir ve çoğu zaman matlaştırıcı sprey gerektirir.

## Hangi Eksende Nasıl Karşılaştırılır?

| Kriter | Klasik ölçüm / CMM | Optik 3D tarama |
|---|---|---|
| Veri türü | Tanımlı noktalarda ölçü | Tüm yüzeyden nokta bulutu |
| Tipik kullanım | Kritik ölçülerin doğrulanması, GD&T raporu | Tersine mühendislik, yüzey karşılaştırma, form haritası |
| Doğruluk çerçevesi | [ISO 10360-2](https://www.iso.org/standard/40954.html) kabul testleri | [ISO 10360-13](https://www.iso.org/standard/74957.html) kabul testleri |
| Ölçülemeyen bölgeler | Derin ve dar cepler proba göre sınırlı | Görüş hattına kapalı bölgeler, parlak/saydam yüzeyler |
| Çıktı | Ölçüm raporu (sayı) | Nokta bulutu, STL/CAD modeli, sapma haritası (renkli) |
| Parça hazırlığı | Genelde yok | Parlak yüzeyde sprey, referans noktaları gerekebilir |

Tablodaki en önemli satır veri türüdür: klasik ölçüm "bu ölçü toleransta mı?" sorusuna, tarama "bu yüzeyin tamamı nominale göre nerede, ne kadar sapıyor?" sorusuna cevap verir.

## Hangi İşte Hangi Yöntem?

- **Teknik resmi olan parçanın kabulü:** Klasik ölçüm/CMM. Kritik ölçüler ve [geometrik toleranslar](https://takt.tr/blog/geometrik-toleranslama-gdt) resimde tanımlıysa, doğrulama da o tanıma göre noktasal yapılmalıdır.
- **Çizimi olmayan parçanın yeniden üretimi (tersine mühendislik):** 3D tarama. Tüm geometri dijitale aktarılır, üzerinden üretilebilir CAD modeli kurulur. Tarama ölçüm adımıdır; tersine mühendislik, tarama verisini üretilebilir modele dönüştürmeyi de kapsar.
- **Kaynaklı yapıda çarpılma kontrolü:** 3D tarama güçlüdür; [kaynak çarpılması](https://takt.tr/blog/kaynak-carpilmasi-kontrolu) gibi tüm yüzeye dağılan sapmalar noktasal ölçümle görülmez, sapma haritasıyla görülür.
- **Dar toleranslı delik çapı, eksen mesafesi:** Temaslı ölçüm. Tek bir kritik ölçünün en güvenilir doğrulaması hâlâ temaslı yöntemdir.
- **Kalıp/fikstür aşınma takibi:** 3D tarama; aynı parçanın dönemsel taramaları karşılaştırılarak aşınma bölgeleri haritalanır.

Çoğu gerçek proje ikisini birlikte kullanır: tarama ile bütünü gör, kritik ölçüleri temaslı yöntemle teyit et.

## Hizmet Alırken Neyi Netleştirmelisiniz?

Ölçüm veya tarama hizmeti isterken şu bilgileri hazırlayın:

1. **Amaç:** Kabul kontrolü mü, tersine mühendislik mi, sapma analizi mi? Yöntem seçimini bu belirler.
2. **Kritik ölçüler ve toleranslar:** Hangi ölçüler karar verdirici? Hepsi değil — kritik olanlar.
3. **Referans (datum) yapısı:** Parça neye göre hizalanacak? Yanlış hizalama, doğru taramayı yanlış rapora çevirir.
4. **Çıktı formatı:** Ölçüm raporu mu, STL mi, parametrik CAD modeli mi? Tarama ile CAD modeli arasındaki modelleme emeği ayrı bir iştir ve ayrıca fiyatlanır.
5. **Yüzey durumu:** Parlak, saydam veya çok koyu yüzeyler varsa önceden bildirin; hazırlık gerekebilir.

## Riskler ve Kırmızı Bayraklar

- **Standarda dayanmayan doğruluk iddiası:** "Mikron hassasiyet" gibi ifadeler, hangi kabul testine göre beyan edildiği söylenmedikçe pazarlama cümlesidir; ISO 10360 serisi tam bu belirsizliği ortadan kaldırmak için vardır.
- **Renkli sapma haritasını kabul raporu sanmak:** Sapma haritası güçlü bir görselleştirmedir ama tolerans kararı, resimdeki datum yapısına göre yapılmış ölçümle verilir.
- **Hizalama yönteminin raporda yazmaması:** Aynı tarama, farklı hizalamayla farklı sapma haritası üretir. Rapor, hizalamanın neye göre yapıldığını belirtmelidir.
- **"Tarama = CAD modeli" varsayımı:** Taramanın çıktısı nokta bulutu/STL'dir; üretimde kullanılacak parametrik model ayrı mühendislik emeğidir.

## Sık Sorulan Sorular

### 3D tarama temaslı ölçümün yerini alır mı?

Genel amaçlı olarak hayır; sorular farklıdır. Tarama yüzeyin bütününü, temaslı ölçüm tanımlı ölçüleri en yüksek güvenle verir. Doğru kurgu çoğu zaman ikisinin birleşimidir.

### Elimde sadece eski, aşınmış bir parça var. Tarama yeterli mi?

Tarama mevcut durumu verir — aşınmış haliyle. Yeniden üretim için mühendislik yorumu gerekir: hangi yüzey aşınmış, nominal ölçü ne olmalıydı? Bu yüzden tersine mühendislik, taramadan fazlasıdır.

### Parlak metal parçalar taranabilir mi?

Çoğu durumda evet, ancak matlaştırıcı sprey veya özel pozlama teknikleri gerekebilir. Bunun ölçüme etkisi ve gerekliliği, işin başında konuşulmalıdır.

### Tarama verisinden doğrudan FEA yapılabilir mi?

Nokta bulutu doğrudan analiz için uygun değildir; önce temiz bir yüzey/katı modele dönüştürülmesi gerekir. Analiz öncesi hazırlık için [FEA öncesi gerekli veriler yazımıza](https://takt.tr/blog/fea-oncesi-gerekli-veriler) bakın.

## Sonuç

3D tarama ile klasik ölçüm arasındaki seçim bir teknoloji tercihi değil, soru tercihidir: "Bu ölçü toleransta mı?" sorusu temaslı ölçümün, "bu yüzeyin bütünü nerede?" sorusu taramanın alanıdır. Her iki dünyada da doğruluk, ISO 10360 serisi gibi kabul testi standartlarına dayandığında anlamlıdır. Amaca göre yöntem, yönteme göre rapor — güvenilir ölçümün sırası budur.

---

**Çizimi olmayan bir parçayı yeniden üretmeniz veya bir yüzeyin nerede saptığını görmeniz mi gerekiyor?** Takt olarak 3D tarama ve tersine mühendislik ihtiyaçlarınızı çözüm ortağı ağımızla koordine ediyor, tarama verisini üretilebilir modele dönüştürüyoruz. [3D tarama kapasitemize](https://takt.tr/kapasitemiz/3d-tarama) göz atın veya [iletişime geçin](https://takt.tr/iletisim).

## Kaynaklar

- [ISO 10360-2:2009 — Acceptance and reverification tests for CMMs: linear dimensions](https://www.iso.org/standard/40954.html) (temaslı koordinat ölçüm cihazlarının kabul testleri)
- [ISO 10360-13:2021 — Acceptance and reverification tests for coordinate measuring systems: Optical 3D CMS](https://www.iso.org/standard/74957.html) (optik 3D ölçüm sistemlerinin kabul testleri ve yüzey kısıtları)
