<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Takt — Cursor Orkestratör

## Proje
SEO/GEO-optimize, modern-minimal, tek dilli (Türkçe) kurumsal tanıtım sitesi · `takt.tr`

## Teknik yığın (değiştirme)
Next.js App Router · TypeScript · Tailwind CSS · lucide-react · Vercel deploy

## Dokümanlar (`docs/`)
| Dosya | İçerik |
|---|---|
| `01-marka-kimligi.md` | Renk, font, geometri, kadans imzası |
| `02-icerik-ve-sayfalar.md` | Site haritası + birebir metinler |
| `03-domain-ve-yayinlama.md` | Vercel + Natro DNS |
| `04-seo-geo-aeo.md` | Meta, schema, robots, llms.txt |
| `10-arama-motoru-indeksleme.md` | Google/Bing indeksleme + IndexNow |
| `05-orkestrator-cursor-rehberi.md` | İş sırası + bitti tanımı |
| `09-seo-geo-aeo-altyapi.md` | SEO veri dosyaları + genişletme rehberi |

## Marka guardrail'leri
- Sadece Doküman 1 token'ları; tek aksan `--signal`; paper-first
- Kadans cetveli her sayfada bir kez, aşırıya kaçma
- Uydurma müşteri, sertifika, istatistik YOK
- Kopya Türkçe, kurumsal "biz" dili

## İş sırası
1. ✅ Kurulum & tasarım sistemi
2. ✅ Cadence + Nav/Footer + metadata/JSON-LD
3. ✅ Sayfalar (Dok. 2 metinleri birebir)
4. ✅ SEO/GEO tam kontrol listesi
5. ✅ Deploy (Vercel + takt.tr DNS — kod tarafı tamam; GSC/Bing/GBP manuel → `docs/10-arama-motoru-indeksleme.md`)
