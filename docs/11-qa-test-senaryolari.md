# Takt — QA Test Senaryoları
*Doküman 11 · “En kurcalayıcı kullanıcı” matrisi*

Amaç: scroll deneyimi, deep link, nav, form ve SEO geçişlerinde kırılmaları yakalamak.

---

## A. Deep link / URL kurcalama

| # | Senaryo | URL / aksiyon | Beklenen |
|---|---------|---------------|----------|
| A1 | Geçersiz bölüm | `/?b=xyz` | Ana sayfa (hakkımızda), URL `/` temizlenir |
| A2 | Gizli bölüm | `/?b=referanslar` | Ana sayfa, URL temizlenir |
| A3 | Geçersiz panel | `/?b=hizmetler&p=sahte-slug` | Hizmetler, ilk panel |
| A4 | Panel tek başına | `/?p=proje-danismanligi` | Hiçbir şey olmaz (b yok) |
| A5 | Hash + query çakışması | `/?b=iletisim#hizmetler` | **İletişim** açılır (query kazanır, hash silinir) |
| A6 | Sadece hash | `/#kapasitemiz` | Kapasitemiz bölümü |
| A7 | SEO → scroll | `/hizmetler/proje-danismanligi` footer linki | `/?b=hizmetler&p=proje-danismanligi` |

---

## B. Scroll / wheel (masaüstü)

| # | Senaryo | Aksiyon | Beklenen |
|---|---------|---------|----------|
| B1 | Hızlı tekerlek spam | 20× wheel down/up | Bölüm atlama, takılma yok |
| B2 | Alt üçte yatay | Hizmetlerde alt bölgede yatay wheel | Panel değişir |
| B3 | Form kenarı | İletişim formunda wheel (textarea) | Önce form scroll, sonra bölüm |
| B4 | Harita üstü wheel | İletişim haritasında wheel | Harita yakınlaşır (chapter scroll değil) |
| B5 | Kadans tıklama spam | Panel ruler’a 5× hızlı tık | Son hedef panel |

---

## C. Mobil nav

| # | Senaryo | Aksiyon | Beklenen |
|---|---------|---------|----------|
| C1 | Menü aç → bölüm seç | Hamburger → İletişim | Menü kapanır, iletişim açılır |
| C2 | Menü açık resize | Menü açıkken pencere ≥1024px | Menü kapanır |
| C3 | Blog → geri | Blog → Nav Hizmetler | Doğru bölüm, doğru active state |

---

## D. Form / randevu

| # | Senaryo | Aksiyon | Beklenen |
|---|---------|---------|----------|
| D1 | Boş gönder | Gönder (boş) | HTML5 validation |
| D2 | Çift tık gönder | Gönder ×2 hızlı | Tek istek |
| D3 | Randevu seç → geri | Görüşme planla → tip seç → browser back | Makul davranış |
| D4 | KVKK link | Aydınlatma metni yeni sekme | Form state korunur |

---

## E. SEO sayfaları

| # | Senaryo | URL | Beklenen |
|---|---------|-----|----------|
| E1 | Bölüm redirect | `/hakkimizda` | `/?b=hakkimizda` |
| E2 | SSS breadcrumb | `/sss` | JSON-LD BreadcrumbList |
| E3 | 404 | `/olmayan-sayfa` | 404 sayfası |

---

## Bilinen düzeltmeler (2026-06)

- **A1/A2:** Geçersiz `?b=` → `router.replace("/")`
- **A5:** `?b=` varken hash handler devre dışı; hash temizlenir
- **C2:** Desktop genişlikte mobil menü otomatik kapanır
- **Deep link timing:** `requestAnimationFrame` retry (refs hazır olana kadar)

---

## Çalıştırma

```bash
npm run dev
# Tarayıcı: http://localhost:3000
# Yukarıdaki URL’leri sırayla dene
```

Canlı: `https://takt.tr` — aynı matris.
