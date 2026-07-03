# İhtiyaç analizi formu — kurulum
*Doküman 13 · İnteraktif form + Resend*

Sayfa: `/ihtiyac-analizi`  
Eski URL: `/kaynaklar/baslangic-kontrol-listesi` → 301 redirect

## Akış

1. Ziyaretçi `/ihtiyac-analizi` üzerinde dallanmalı formu doldurur (sessionStorage ile devam edebilir).
2. **Randevu oluştur** veya **Sizinle iletişime geçin** CTA’sı `POST /api/ihtiyac-analizi` ile gönderilir.
3. **Resend** ile `info@takt.tr` adresine yapılandırılmış rapor e-postası gider.
4. Randevu CTA → `/gorusme-planla?ref=ihtiyac-analizi`; iletişim CTA → `/ihtiyac-analizi/tesekkur` (noindex).

## Vercel ortam değişkenleri

| Değişken | Açıklama |
|----------|----------|
| `RESEND_API_KEY` | Resend API anahtarı |
| `RESEND_FROM` | Gönderen (örn. `Takt <noreply@takt.tr>`) — domain doğrulaması gerekir |
| `RESEND_TO` | Alıcı (varsayılan `info@takt.tr`) |

`.env.example` dosyasına bakın.

## Faz 2 (opsiyonel)

WhatsApp Cloud API bildirimi için `WHATSAPP_CLOUD_API_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_NOTIFY_TO` — stub hazır (`app/api/ihtiyac-analizi/route.ts`).

## İlgili dosyalar

- `lib/ihtiyac-analizi/` — şema, akış motoru, rapor, doğrulama
- `components/ihtiyac-analizi/` — sihirbaz UI
- `app/ihtiyac-analizi/page.tsx` — sayfa
- `app/api/ihtiyac-analizi/route.ts` — API + Resend
- `lib/site.ts` → `leadMagnet` — site genelinde CTA linki
