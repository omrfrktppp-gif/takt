# Takt — AEO (Cevap Motoru Optimizasyonu) Paketi
*Doküman 08 · Cursor için uygulama referansı*

> AEO hedefi: Google öne çıkan cevaplarında, AI Overview'da ve sesli yanıtlarda **cevabın kendisi** olmak. Üç şeyle olur: (1) önce-cevap yapısı, (2) soru-tabanlı başlıklar, (3) zengin FAQ + şema.

---

## 1. Altın kural — önce cevap, sonra bağlam

Her bölüm/sayfa, ilk cümlede **40–60 kelimelik net bir cevap** versin; detay sonra gelsin. Cevap motorları ilk net cümleyi alıntılar.

**Kötü:** "Sektörde uzun yıllara dayanan birikimimizle, çeşitli ihtiyaçlara yönelik olarak fason üretim alanında..."
**İyi (önce cevap):** "Fason üretim, bir ürünün başka bir firmaya ürettirilmesidir. Takt, ihtiyacınızı güvenilir çözüm ortaklarına yönlendirir ve imalatı sizin adınıza koordine eder." → sonra detay.

---

## 2. Soru-tabanlı başlıklar

H2/H3'leri insanların gerçekten aradığı **soru** biçiminde yaz, hemen altında kısa cevap ver:
- "Tersine mühendislik nedir?"
- "TÜBİTAK projesi nasıl hazırlanır?"
- "Fason üretim ne zaman mantıklıdır?"
Bu hem snippet hem AI yanıtı için en güçlü biçim.

---

## 3. Genişletilmiş SSS (AEO'nun kalbi — FAQPage ile işaretle)

Hepsi önce-cevap, kısa ve otoriter. `/sss` sayfasında (`lib/site.ts` → `faqItems`).

**Tanımsal (— "nedir" aramalarını yakalar):**
- **Takt ne iş yapar?** Takt, makina imalatı ve sanayide çalışan firmaların teknik ekibine dışarıdan mühendislik gücü katan bir danışmanlıktır. Proje danışmanlığı, tasarım, analiz, üretim koordinasyonu ve Ar-Ge/proje desteği sunar.
- **Mühendislik danışmanlığı ne işe yarar?** Mühendislik danışmanlığı, bir firmanın teknik kararlarını, tasarımını ve süreçlerini dışarıdan uzman desteğiyle güçlendirmesini sağlar. Eksik kapasiteyi tam zamanlı kadro maliyeti olmadan tamamlar.
- **Tersine mühendislik nedir?** Tersine mühendislik, mevcut bir parça veya ürünün ölçülerek ve analiz edilerek dijital/üretilebilir modeline ulaşılmasıdır. Eski veya teknik resmi olmayan parçaların yeniden üretimini mümkün kılar.
- **Fason üretim nedir?** Fason üretim, bir ürünün başka bir üreticiye yaptırılmasıdır. Takt, işi doğru çözüm ortağıyla eşleştirir ve imalat sürecini sizin adınıza koordine eder.
- **Takt time nedir?** Takt time, üretimde talebi karşılamak için bir ürünün tamamlanması gereken ritmi/temposu tanımlar. Markamızın adı buradan gelir: işi doğru tempoda akıtmak.

**Hizmet / pratik:**
- **Hangi hizmetleri sunuyorsunuz?** Proje danışmanlığı; teknik ekip & süreç yönetimi; tasarım & geliştirme; analiz, hesaplama & raporlama; üretim danışmanlığı; Ar-Ge & Ür-Ge; TÜBİTAK/KOSGEB/Türk Patent destekleri.
- **Üretimi kendiniz mi yapıyorsunuz?** Üretimi geniş çözüm ortağı ağımızla yürütüyoruz; doğru üreticiyle eşleştirir ve süreci sizin adınıza koordine ediyoruz.
- **CNC, lazer kesim, 3D baskı gibi işler yapıyor musunuz?** Evet. CNC işleme/torna, lazer kesim ve markalama, 3D tarama/baskı, kaynak, kaplama ve boyamayı çözüm ortağı ağımızla karşılıyoruz.
- **Prototip ürettiriyor musunuz?** Evet. Prototipleme ve prototipten seri üretime geçiş danışmanlığı veriyoruz.
- **TÜBİTAK/KOSGEB projesinde nasıl destek veriyorsunuz?** Uygun projeyi belirler, teknik dokümanları ve raporları hazırlar, başvurudan yürütmeye kadar süreci yönetiriz.
- **Patent veya marka tescilinde yardımcı oluyor musunuz?** Evet; patent ve marka başvurularını hazırlayıp süreci yürütüyoruz.
- **Tek bir hizmet alabilir miyim?** Evet; hizmetler tek tek de, uçtan uca da alınabilir.
- **Fikrimi üretime nasıl taşıyorsunuz?** Tasarım, analiz, prototipleme ve seri üretime geçiş adımlarıyla fikirden ürüne kadar süreci yönetiyoruz.
- **Nerede hizmet veriyorsunuz?** Ağırlıklı Ankara sanayi ekosistemine; proje bazlı olarak uzaktan da çalışıyoruz.
- **Çalışmaya nasıl başlıyoruz?** İhtiyacınızı kısaca iletin; ilk görüşmede kapsamı netleştirir, takvim ve çıktıları yazılı koyarız. İlk görüşme bağlayıcı değildir.
- **Fiyatlandırma nasıl?** Ücretlendirme projenin kapsamına ve süresine göre belirlenir; net teklifi kapsamı konuştuktan sonra paylaşırız.

---

## 4. Şemalar

### 4.1 FAQPage
Yukarıdaki tüm soruları `FAQPage` JSON-LD'ye koy (Question + acceptedAnswer/text). Kaynak: `lib/site.ts` → `faqItems`.

### 4.2 HowTo — "Nasıl çalışıyoruz" (4 adım)
Süreç bölümünü HowTo ile işaretle:
```json
{ "@context":"https://schema.org","@type":"HowTo",
  "name":"Takt ile bir proje nasıl yürür",
  "step":[
    {"@type":"HowToStep","position":1,"name":"Tespit","text":"İhtiyacı ve eksik halkayı birlikte netleştiririz."},
    {"@type":"HowToStep","position":2,"name":"Plan","text":"Kapsam, takvim ve çıktıları yazılı koyarız."},
    {"@type":"HowToStep","position":3,"name":"Uygulama","text":"İşi belirlenen tempoda yürütürüz."},
    {"@type":"HowToStep","position":4,"name":"Teslim","text":"Raporlanabilir, devredilebilir çıktıyla kapatırız."}
  ] }
```

### 4.3 Speakable (sesli yanıt — opsiyonel/yeni)
Önemli cevap bloklarını `speakable` (cssSelector) ile işaretleyebilirsin; sesli asistanlar için bonus.

---

## 5. Hedef soru sorguları (içeriğe ve başlıklara doğal yerleştir)
mühendislik danışmanlığı nedir · tersine mühendislik nedir · fason üretim nedir / nasıl yapılır · cnc torna nedir · 3d tarama ne işe yarar · prototip nasıl üretilir · tübitak projesi nasıl hazırlanır · kosgeb desteği nasıl alınır · ürün fikri üretime nasıl taşınır · patent başvurusu nasıl yapılır · makina tasarımı kimden alınır · ankara mühendislik danışmanlık firması.

---

## 6. Bonus: "nedir" rehber/sözlük içeriği (AEO + GEO en güçlü kaldıraç)
Kısa tanım sayfaları/yazıları aç (her biri bir soruyu tam yanıtlar): "Tersine mühendislik nedir?", "Takt time nedir?", "Fason üretim ne zaman mantıklıdır?". Bunlar hem snippet hem AI alıntısı toplar, hem de iç linkle hizmet sayfalarını besler. İlk paragraf net tanım, sonra Takt'ın bu konudaki hizmetine link.

---

## 7. Kontrol listesi
- [x] Her bölüm önce-cevap (hizmet sayfalarında `lib/seo-content.ts`)
- [x] Başlıklar soru biçiminde (hizmet detay + SSS)
- [x] Genişletilmiş SSS (`/sss`) + FAQPage JSON-LD (16 soru)
- [x] Süreç bölümünde HowTo JSON-LD (layout + `/yaklasim` içerik)
- [ ] Speakable işaretlemesi (opsiyonel)
- [ ] Hedef soru sorguları blog/rehber içeriğinde (ileride)
- [ ] "Nedir" rehber sayfaları (ileride)

## 8. Cursor promptu
> `08-aeo-paketi.md`'yi uygula. Sayfalarda içeriği "önce net cevap, sonra bağlam" biçimine getir; alt başlıkları soru formuna çevir. Genişletilmiş SSS bölümünü ekle ve FAQPage JSON-LD ile işaretle. "Nasıl çalışıyoruz" 4 adımını HowTo JSON-LD ile işaretle. Cevaplar kısa, otoriter ve dosyadaki metinlerle birebir olsun; uydurma bilgi/fiyat yok.
