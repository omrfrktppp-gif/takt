# Takt — Orkestratör & Cursor Çalışma Rehberi
*Doküman 5 / 5 · Cursor'ın ÖNCE okuyacağı ana dosya*

> Bu dosya, Cursor için projenin **kural ve yön dosyasıdır**. Diğer 4 dokümanı nasıl kullanacağını, neyi nasıl kuracağını ve "bitti" sayılma şartlarını tanımlar.

## 1. Proje tek cümlede
Takt için **SEO/GEO-optimize, modern-minimal, tek dilli (Türkçe) bir kurumsal tanıtım sitesi** kur; `takt.tr` domainine bağla.

## 3. Teknik yığın (karar verildi — değiştirme)
- **Next.js (App Router) + TypeScript**
- **Tailwind CSS** (tasarım token'ları Doküman 1'den `tailwind.config.ts`'e)
- **lucide-react** (ikonlar)
- Deploy: **Vercel** · Domain: **takt.tr** (Natro DNS)
- Form: başta Formspree veya `mailto`

## 8. İş sırası (Cursor'a adım adım)
1. Proje kurulumu: Next.js + TS + Tailwind + lucide-react. Token'ları `tailwind.config` ve `globals.css`'e işle (Dok. 1).
2. Layout: fontlar, nav, footer, kök metadata + Organization JSON-LD (Dok. 1, 4).
3. İmza bileşeni `Cadence` (Dok. 1 · Bölüm 1 & 7).
4. Ana Sayfa → Hizmetler → Yaklaşım → İletişim (Dok. 2 metinleriyle birebir).
5. SEO/GEO: her sayfa metadata, OG, JSON-LD (FAQPage), `robots.txt`, `sitemap.ts`, `llms.txt` (Dok. 4).
6. Kalite geçişi: erişilebilirlik, responsive, performans, kontrol listeleri.
7. Deploy (Vercel) + domain bağlama talimatı (Dok. 3).

*Tam metin: kullanıcı tarafından sağlanan orkestratör dokümanı.*
