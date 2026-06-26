# Başlangıç ihtiyaç formu — indir + WhatsApp/e-posta
*Doküman 13 · PDF kaynak*

Sayfa: `/kaynaklar/baslangic-kontrol-listesi`

## Akış

1. Ziyaretçi **PDF indirir** (`public/kaynaklar/takt-baslangic-ihtiyac-formu.pdf`).
2. Interaktif formu bilgisayarında doldurur.
3. **WhatsApp** veya **e-posta** ile doldurulmuş PDF’i ekleyerek gönderir.

Site üzerinde dosya yükleme yok; iletişim kanalları hazır linklerle açılır.

## PDF güncelleme

```
public/kaynaklar/takt-baslangic-ihtiyac-formu.pdf
```

üzerine kopyalayın → commit → deploy.

## İleride (opsiyonel)

- Sunucu tarafı PDF yükleme + e-posta bildirimi (Resend vb.)
- Google Drive arşivi

## İlgili dosyalar

- `components/BaslangicIhtiyacFormu.tsx` — indir + WP/mailto
- `lib/baslangic-formu.ts` — PDF yolu
