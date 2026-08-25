# Takt — Claude SEO/GEO/AEO skill kurulumu

Bu dizin, `takt.tr` üzerinde SEO / GEO / AEO çalışması yapmak için proje düzeyinde
kurulmuş skill ve subagent'ları içerir. Proje düzeyinde durduğu için hem yerel
makinede hem de bulut oturumlarında (Claude Code on the web) otomatik yüklenir.

## Kaynaklar

| Paket | Kaynak | Lisans | Kapsam |
|---|---|---|---|
| `claude-seo` v2.2.4 | [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo) | MIT | 31 skill + 18 subagent: teknik SEO, schema, E-E-A-T, sitemap, GEO, local, backlink, Google API'leri |
| `gtm-engineer-skills` | [onvoyage-ai/gtm-engineer-skills](https://github.com/onvoyage-ai/gtm-engineer-skills) | MIT | 12 skill: AEO denetimi ve kod düzeyinde iyileştirme, GEO içerik hattı, içerik doğruluk denetimi |

## Dizin yapısı

```
.claude/
├── agents/                 18 SEO subagent'ı (claude-seo)
└── skills/
    ├── seo/                orkestratör + Python runtime (bin/, scripts/, schema/, data/)
    ├── seo-*/              30 alt skill
    └── <gtm skills>/       audit-website-aeo, improve-aeo-geo, write-seo-geo-content, ...
```

## Python runtime (yalnızca `seo-*` skill'leri için)

`claude-seo` içindeki Python araçları izole bir sanal ortamda çalışır. Bu ortam
makineye özeldir ve git'e girmez (`.gitignore`). Yeni bir makinede veya yeni bir
bulut oturumunda bir kez sağlamak gerekir:

```bash
./.claude/skills/seo/bin/claude-seo setup     # venv + Chromium kurar (~1.5 GB)
./.claude/skills/seo/bin/claude-seo doctor    # salt-okunur durum kontrolü
```

`gtm-engineer-skills` tarafındaki script'ler saf Node.js'tir, kurulum gerektirmez:

```bash
node .claude/skills/audit-website-aeo/scripts/aeo-audit.mjs https://takt.tr --max-pages=20
```

## Marka guardrail'leri

Bu skill'ler üçüncü taraf araçlardır; ürettikleri öneriler `AGENTS.md`'deki marka
kurallarının **altında** kalır. Özellikle:

- Uydurma müşteri, sertifika veya istatistik **yok** — skill bir "sosyal kanıt" veya
  "istatistik ekle" önerisi verirse, yalnızca doğrulanabilir veriyle uygulanır.
- Kopya Türkçe ve kurumsal "biz" dilinde kalır; skill'lerin İngilizce şablonları
  birebir kullanılmaz.
- Renk, tipografi ve geometri yalnızca Doküman 1 token'larından gelir.

`audit-content` skill'i bu guardrail'lerin ilkiyle doğrudan örtüşür: yayından önce
uydurma istatistik ve ölü bağlantı taraması yapar.

## Kaldırma

```bash
rm -rf .claude/skills .claude/agents
```
