# Takt — Codex Teknik Bakım Listesi
*Otomasyon tamamlananlar + gelecekte güvenle yürütülebilir işler*

Bu dosya yalnızca **hesap erişimi, kimlik doğrulama veya doğrulanmamış gerçek iddia** gerektirmeyen teknik işleri kapsar. Sahip görevleri → `docs/SENIN-YAPACAKLARIN.md`.

---

## Tamamlanan otomasyon (özet)

- [x] **41 yayımlı blog yazısı** — yalnızca `status: published` içerikler canlıda, statik route ve indekslerde
- [x] **3 teknik vaka** blog olarak gömülü (`kind: case-study`): DFM, DFA, termal genleşme
- [x] **Dinamik sitemap** — yayımlı blog + site rotaları otomatik; tarih kaynağı içerik frontmatter
- [x] **Dinamik `llms.txt` / `llms-full.txt`** — blog listesi ve site özeti build ile senkron
- [x] **Üretim kalite paketi** — Playwright: `tests/blog-content.spec.ts`, `tests/site-quality.spec.ts` (erişilebilirlik, 200 yanıt, kırık link)
- [x] **Blog içerik denetimi** — slug benzersizliği, sitemap eşleşmesi, yayın tarihi tutarlılığı
- [x] **Schema/metadata temizliği** — global `HowTo` kaldırıldı; kurucu `Person` ↔ `Organization` bağlantısı düzeltildi
- [x] **Yayın güvenliği** — `review` / taslak içeriklerin sitemap ve public listeye girmesi engellendi

---

## Gelecekte güvenle yürütülebilecek bakım

Deploy öncesi veya içerik güncellemesi sonrası Codex'in tek başına yapabileceği rutin:

| Rutin | Komut / dosya | Sıklık |
|-------|---------------|--------|
| Lint + build | `npm run lint` · `npm run build` | Her değişiklik |
| Blog + sitemap testi | `npm run test:content` | Blog veya `lib/blog*` değişince |
| Site kalite testi | `npm run test:e2e` | UI/layout değişince |
| İndeksleme denetimi | `npm run audit:indexing` | Sitemap/robots/llms değişince |
| Yeni blog (mevcut bilgi) | `content/blog/` + frontmatter doğrulama | Editöryal kuyruk |
| İç link / metadata regresyonu | Playwright + `tests/blog-content.spec.ts` genişletme | Ayda bir veya büyük içerik partisi sonrası |
| `dateModified` | Yalnızca anlamlı içerik değişiminde güncelle | Yazı revizyonunda |
| Performans baseline | Lighthouse (yerel veya CI) | Büyük frontend değişikliği sonrası |

**Yapmama kuralı:** Müşteri adı, proje rakamı, yorum, sertifika, kapasite veya dış profil durumu uydurma; bu unsurlar sahip alanındadır.

**Referans:** Detaylı indeksleme adımları → `docs/10-arama-motoru-indeksleme.md` · QA senaryoları → `docs/11-qa-test-senaryolari.md`
