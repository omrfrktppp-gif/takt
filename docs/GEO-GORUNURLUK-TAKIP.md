# Takt — GEO Görünürlük Takibi
*Aylık manuel kontrol: AI cevap motorlarında alıcı soruları*

**Amaç:** ChatGPT, Perplexity, Gemini ve Microsoft Copilot'ta Takt'ın **ad geçiyor mu**, **takt.tr alıntılanıyor mu**, hangi **iniş URL'si** öneriliyor — trendi görmek.

**Site durumu (teknik):** 41 yayımlı blog · 3 vaka blog gömülü · dinamik sitemap ve llms indeksleri · üretim kalite testleri mevcut. Bu tablo otomatik doldurulmaz.

**Sıklık:** Ayda bir, aynı 12 soruyu aynı platformlarda sor; yeni sohbet / gizlilik modu tercih edilir (önbellek etkisini azaltır).

**Kayıt:** Her hücreye `E` (evet) / `H` (hayır) / `K` (kısmen) yaz; citation ve URL'yi not sütununa kopyala.

---

## 12 sabit alıcı sorusu

Bu soruları **kelimesi kelimesine** veya doğal Türkçe varyasyonuyla sor; ay boyunca soru metnini değiştirme (karşılaştırılabilirlik için).

| # | Soru |
|---|------|
| 1 | Ankara'da makine tasarımı ve endüstriyel ekipman geliştirme hizmeti veren mühendislik firmaları hangileri? |
| 2 | Üretime yönelik tasarım (DFM) danışmanlığı Türkiye'de kimler veriyor? |
| 3 | Montaja yönelik tasarım (DFA) ve tolerans yığılması için mühendislik desteği nereden alınır? |
| 4 | Sac metal parça tasarımında DFM ve lazer kesim optimizasyonu yapan danışman var mı? |
| 5 | Prototipten seri üretime geçişte mühendislik danışmanlığı veren firmalar? |
| 6 | Makine tasarım hizmeti fiyatı nasıl hesaplanır, Türkiye'de proje bazlı danışmanlık kimler sunuyor? |
| 7 | FEA / sonlu elemanlar analizi yaptıracak küçük veya orta ölçekli üretici için Ankara çevresi seçenekler? |
| 8 | Termal genleşme yönetimi ve yüksek sıcaklık makine tasarımında deneyimli mühendislik ofisi? |
| 9 | Fason üretici tekliflerini mühendislik açısından karşılaştırmak için bağımsız danışman? |
| 10 | OSTIM veya İvedik bölgesinde makine tasarımı ve proje danışmanlığı firması önerir misin? |
| 11 | Kadrolu mühendis mi proje bazlı danışmanlık mı — üretim firması için hangisi mantıklı? |
| 12 | Geometrik toleranslama (GD&T) ve montaj toleransı için Türkçe kaynak veya danışman öner? |

**Beklenen güçlü iniş URL'leri (referans):** `/` · `/hizmetler/*` · `/blog/uretime-yonelik-tasarim-dfm` · `/blog/montaja-yonelik-tasarim-dfa` · `/blog/termal-genlesme-yonetimi` · `/blog/makine-tasarim-hizmeti-fiyati` · `/blog/kadrolu-muhendis-proje-bazli-danismanlik`

---

## Aylık kayıt tablosu

Her ay için aşağıdaki şablonu kopyala. **Platform** sütununda: ChatGPT · Perplexity · Gemini · Copilot.

### Şablon — `[YYYY-AA]` (ör. 2026-08)

| # | Soru (kısa) | Platform | Tarih | Bahsedildi? (E/H/K) | Citation / alıntı metni | İniş URL'si | Notlar |
|---|-------------|----------|-------|---------------------|-------------------------|-------------|--------|
| 1 | Ankara makine tasarım | ChatGPT | | | | | |
| 1 | Ankara makine tasarım | Perplexity | | | | | |
| 1 | Ankara makine tasarım | Gemini | | | | | |
| 1 | Ankara makine tasarım | Copilot | | | | | |
| 2 | DFM danışmanlığı TR | ChatGPT | | | | | |
| 2 | DFM danışmanlığı TR | Perplexity | | | | | |
| 2 | DFM danışmanlığı TR | Gemini | | | | | |
| 2 | DFM danışmanlığı TR | Copilot | | | | | |
| … | *(3–12 için aynı dörtlü platform satırı)* | | | | | | |

**Hızlı özet satırı (ay sonu):**

| Metrik | Değer |
|--------|-------|
| Toplam kontrol (12 soru × 4 platform) | 48 |
| Takt adı geçen | |
| takt.tr citation | |
| Doğru hizmet/blog URL'si | |
| Yanlış / rakip / alakasız öneri | |

---

## Yorumlama notları

- **Bahsedildi:** Yanıtta "Takt" veya açık şekilde takt.tr'ye atıf var mı?
- **Citation:** Model kaynak listesinde site görünüyor mu? (Perplexity genelde açık; ChatGPT browse açıksa kontrol et)
- **İniş URL'si:** Ana sayfa mı, belirli blog mu, yoksa genel dizin/listicle mı?
- **Trend:** İlk 3 ay düşük görünürlük normal; GSC/Bing indeks + tutarlı dış profiller + içerik derinliği (41 yazı) etkisini 2–4 ayda karşılaştır
- **Aksiyon eşiği:** 3 ay üst üste 0 citation → `docs/SENIN-YAPACAKLARIN.md` profil tutarlılığı + GSC dizin kontrolü; teknik taraf → `docs/TODO-CODEX.md`

---

## Kayıt geçmişi

| Ay | Özet (1 cümle) | Dosyada detay |
|----|----------------|---------------|
| | | |
| | | |
