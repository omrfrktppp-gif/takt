# Başlangıç ihtiyaç formu — Drive & e-posta kurulumu
*Doküman 13 · PDF indirme + yükleme altyapısı*

Sayfa: `/kaynaklar/baslangic-kontrol-listesi`

## Nasıl çalışır?

1. Ziyaretçi **PDF indirir** (`public/kaynaklar/takt-baslangic-ihtiyac-formu.pdf`).
2. Interaktif formu bilgisayarında doldurur.
3. **PDF yükler** (sürükle-bırak) veya WhatsApp / e-posta ile gönderir.
4. Tarayıcı:
   - PDF doğrular (yalnızca `.pdf`, max 12 MB),
   - **Web3Forms** ile doğrudan `info@takt.tr` adresine bildirim + ek gönderir (ücretsiz plan — sunucu proxy çalışmaz),
   - (Opsiyonel) sunucu **Google Drive** klasörüne kopyalar (`/api/baslangic-formu/drive`).

## Zorunlu: Web3Forms (e-posta bildirimi)

Ücretsiz planda Web3Forms **yalnızca tarayıcıdan** kabul eder. Vercel sunucu IP'sinden POST 403 döner.

Vercel → **Settings → Environment Variables**:

| Değişken | Açıklama |
|----------|----------|
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Web3Forms panelindeki Access Key (iletişim + lead magnet + PDF yükleme) |

Web3Forms paneli → **Settings** → **Domain Restrictions**: `takt.tr` (geliştirme için `localhost` ekleyin).

Deploy sonrası `/iletisim` ve `/kaynaklar/baslangic-kontrol-listesi` formlarını canlıda test edin.

> Eski `WEB3FORMS_ACCESS_KEY` (sunucu) Pro plan olmadan çalışmaz; kaldırabilirsiniz.

## Opsiyonel: Google Drive (dosya arşivi)

### 1. Google Cloud

1. [Google Cloud Console](https://console.cloud.google.com/) → proje oluşturun.
2. **APIs & Services** → **Google Drive API** → Enable.

### 2. Service account

1. **IAM & Admin** → **Service Accounts** → Create.
2. Keys → **Add key** → JSON indirin.
3. JSON içinden:
   - `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `private_key` → `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` (Vercel’de `\n` satır sonları korunmalı; tüm anahtarı tek satırda yapıştırırken `\n` escape kullanın)

### 3. Drive klasörü (Takt — gelen formlar)

- **Klasör linki:** https://drive.google.com/drive/folders/1YA9TvB55atwCQSA_vOBR_tTzo1xc5kbf
- **Vercel `GOOGLE_DRIVE_FOLDER_ID`:** `1YA9TvB55atwCQSA_vOBR_tTzo1xc5kbf`

1. Bu klasörü Google Cloud **service account** e-postasıyla paylaşın (**Düzenleyici**). Paylaşmadan yükleme Drive'a düşmez.
2. Service account henüz yoksa önce adım 2'yi tamamlayın; JSON'daki `client_email` adresini klasörde "Kişi ekle" ile ekleyin.

### 4. Vercel env

```
GOOGLE_DRIVE_FOLDER_ID=1YA9TvB55atwCQSA_vOBR_tTzo1xc5kbf
GOOGLE_SERVICE_ACCOUNT_EMAIL=...@....iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

Drive yapılandırılmamışsa yükleme yine çalışır; yalnızca e-posta + ek gider.

### 5. Deploy

`main` push veya Vercel redeploy → env değişkenleri yüklensin.

## PDF güncelleme

Kaynak dosyayı değiştirdiğinizde:

```
public/kaynaklar/takt-baslangic-ihtiyac-formu.pdf
```

üzerine kopyalayın → commit → deploy.

## API

`POST /api/baslangic-formu/upload` — `multipart/form-data`

| Alan | Zorunlu | Açıklama |
|------|---------|----------|
| `file` | Evet | PDF |
| `name` | Hayır | Ad soyad |
| `email` | Hayır | Geri dönüş için |
| `company` | Hayır | Firma |
| `botcheck` | Hayır | Honeypot (boş bırakılır) |

## İlgili dosyalar

- `components/BaslangicIhtiyacFormu.tsx` — UI
- `app/api/baslangic-formu/upload/route.ts` — API
- `lib/google-drive.ts` — Drive yükleme
- `lib/form-notify.ts` — Web3Forms bildirimi
- `lib/baslangic-formu.ts` — sabitler
