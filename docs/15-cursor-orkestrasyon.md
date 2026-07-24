# Takt — Codex + Cursor Orkestrasyon Protokolü

## Amaç

Codex bilişsel ve denetleyici katmanda kalır; Cursor içindeki kodlama ajanları
sınırları net uygulama paketlerini gerçekleştirir.

Hedefler:

- daha hızlı uygulama,
- daha az tekrar,
- daha küçük ve kontrollü görev paketleri,
- paralel çalışmada daha az çakışma,
- her değişikliğin bağımsız doğrulanması,
- Codex bağlamının tasarım, ürün, pazarlama ve kalite kararlarına ayrılması.

## Tek çalışma alanı

Bütün ajanlar yalnızca şu klasörde çalışır:

```text
C:\Users\omrfr\OneDrive\Hersik\Belgeler\takt
```

Eski kopya:

```text
C:\Users\omrfr\takt
```

uygulama çalışmaları için kullanılmaz.

## Rol dağılımı

### Codex — mimar, ürün sahibi ve denetçi

- Pazarlama ve ürün kararlarını verir.
- `TODO-CODEX.md` içinden sıradaki işi seçer.
- Görevi küçük ve doğrulanabilir pakete böler.
- Dosya kapsamını, sınırları ve kabul kriterlerini yazar.
- Cursor ajanına uygulama brief'i verir.
- Sonuçtaki `git diff`i satır satır inceler.
- Uydurma iddia, gizlilik, erişilebilirlik ve performans risklerini kontrol eder.
- Build, lint, type-check, site audit ve tarayıcı doğrulamasını bağımsız yapar.
- Gerekirse Cursor'a küçük düzeltme brief'i gönderir.
- Kullanıcıya yalnızca doğrulanmış sonucu bildirir.

### Cursor — uygulama ajanı

- Verilen brief dışına taşmadan kod yazar.
- İlgili dosyaları ve `AGENTS.md` talimatlarını okur.
- Mevcut tasarım sistemini korur.
- Yeni müşteri, referans, rakam, sertifika veya deneyim iddiası üretmez.
- Testleri çalıştırır ve sonucu raporlar.
- Beklenmeyen kapsam veya çakışma görürse durur.
- Deploy, push, commit, hesap ayarı ve harici yayın yapmaz; brief açıkça
  yetkilendirmedikçe yalnızca çalışma alanını değiştirir.

## Görev paketi boyutu

İdeal Cursor görevi:

- 1 ana amaç,
- 2–6 dosya,
- 30–90 dakikalık uygulama kapsamı,
- açık kabul kriterleri,
- tek doğrulama komut grubu.

Tek göreve ana sayfa, blog, form, SEO ve animasyonun tamamı birlikte verilmez.

## Paralel çalışma kuralı

### Aynı çalışma alanında

Tek seferde yalnızca bir ajan dosya yazabilir.

Diğer ajanlar yalnızca:

- read-only analiz,
- kod inceleme,
- test planı,
- alternatif tasarım önerisi

yapabilir.

### Ayrı worktree varsa

Dosya kapsamları kesişmeyen işler paralel verilebilir. Birleştirme öncesinde
Codex her diff'i ayrı inceler.

## Standart görev akışı

1. Codex mevcut `git status` ve ilgili dosyaları inceler.
2. `TODO-CODEX.md` içinden bir görev seçer.
3. Görevi aşağıdaki brief şablonuyla Cursor'a verir.
4. Cursor uygulama ve yerel testleri tamamlar.
5. Codex değişen dosyaları ve diff'i inceler.
6. Codex build/lint ve gerekiyorsa tarayıcı testini tekrarlar.
7. Hata varsa yalnızca hataya yönelik küçük follow-up gönderilir.
8. Kabul kriterleri sağlanınca TODO kapatılır.
9. Commit/push/deploy ayrı ve açık bir işlem olarak ele alınır.

## Cursor brief şablonu

```text
AMAÇ
[Tek cümlelik sonuç]

ÇALIŞMA ALANI
C:\Users\omrfr\OneDrive\Hersik\Belgeler\takt

ÖNCE OKU
- AGENTS.md
- TODO-CODEX.md içindeki [başlık]
- [ilgili dosyalar]

KAPSAM
- [yapılacak iş]
- [yapılacak iş]

DOKUNULABİLECEK DOSYALAR
- path/file.tsx
- path/file.ts

KAPSAM DIŞI
- müşteri/vaka/rakam uydurma
- bağımsız tasarım sistemi değişikliği
- commit/push/deploy
- belirtilmeyen dosyalarda geniş refactor

KABUL KRİTERLERİ
- [gözlemlenebilir davranış]
- [responsive/erişilebilirlik koşulu]
- [test koşulu]

DOĞRULAMA
- npm run lint
- npm run build
- [göreve özgü test]

TESLİM
Değişen dosyaları, test sonucunu ve kalan riski kısa raporla.
```

## Codex inceleme kontrol listesi

- [ ] Diff yalnızca brief kapsamındaki dosyalarda mı?
- [ ] Kullanıcının mevcut değişiklikleri korunmuş mu?
- [ ] Yeni bağımlılık gerçekten gerekli mi?
- [ ] Uydurma veya doğrulanmamış pazarlama iddiası var mı?
- [ ] Mobil ve masaüstü davranış tutarlı mı?
- [ ] Klavye, focus ve reduced-motion çalışıyor mu?
- [ ] LCP/INP/CLS riski yaratılmış mı?
- [ ] Analytics ve çerez davranışı bozulmuş mu?
- [ ] Metadata/schema görünür içerikle uyumlu mu?
- [ ] Lint/build/test gerçekten geçmiş mi?
- [ ] Tarayıcıdaki gerçek sonuç brief'i karşılıyor mu?

## Model seçimi ilkesi

Cursor'daki model seçimi göreve göre yapılır:

- Basit mekanik düzenleme: hızlı/ucuz model
- React bileşeni ve form mantığı: güçlü kodlama modeli
- Animasyon ve karmaşık state: en güçlü uygulama modeli
- İkinci görüş/code review: uygulamayı yapandan farklı model

Model adı değişebileceği için protokol belirli bir modele bağlı değildir.

## Token ve bağlam tasarrufu

- Cursor'a bütün konuşma geçmişi verilmez.
- Brief yalnızca ilgili dosyaları ve kabul kriterlerini gösterir.
- Büyük kaynak metinler yerine dosya yolları verilir.
- İlk seferde geniş görev yerine küçük tamamlanabilir paket verilir.
- Follow-up, tüm görevi yeniden anlatmak yerine yalnızca başarısız kriteri
  belirtir.
- Codex uygulama kodunu yeniden yazmaz; diff ve sonucu denetler.

## İlk önerilen görev sırası

1. Blog `review` içeriklerinin canlıdan çıkarılması
2. Global HowTo ve Person schema düzeltmesi
3. Mevcut lint hatalarının temizlenmesi
4. Mobil çerez/CTA çakışmasının çözülmesi
5. Analytics event standardizasyonu
6. Navigasyon sadeleştirmesi
7. Tasarım token ve tipografi düzeni
8. Ana sayfa scroll anlatısının ilk sahnesi
9. Form first-party API ve UX
10. Blog editoryal/SEO iyileştirmeleri
