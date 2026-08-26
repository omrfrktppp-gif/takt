# Takt — Codex + Antigravity Orkestrasyon Protokolü

## Amaç

Codex bilişsel ve denetleyici katmanda kalır. Google Antigravity kotası,
Cursor kotasıyla **aynı çalışma alanında**, aynı brief disiplininde harcanır.

Antigravity, Cursor’un kardeşi işçidir: GUI’yi tıklamak değil, headless
`agy -p` ile tek seferlik görev koşturmak.

Hedefler:

- Antigravity masaüstü / CLI / SDK kotasını Takt’e bağlamak,
- Codex’in Antigravity’yi Computer Use veya `agy --help` ile keşfetmesini
  yasaklamak,
- Cursor ve Antigravity’nin aynı anda yazmasını engellemek,
- iç içe alt ajanlarla kotayı yakmamak,
- her teslimi Codex’in `git diff` + lint/build ile doğrulaması.

Kardeş protokol: `docs/15-cursor-orkestrasyon.md`.

## Tek çalışma alanı

Bütün ajanlar yalnızca şu klasörde çalışır:

```text
C:\Users\omrfr\OneDrive\Hersik\Belgeler\takt
```

Eski kopya `C:\Users\omrfr\takt` kullanılmaz.

Antigravity IDE açıksa **File → Open Folder** ile tam bu yolu aç. Ayrı bir
klon, OneDrive dışı kopya veya `~/takt` yok.

Kurallar ortak bağdır:

| Katman | Dosya | Kim okur |
|---|---|---|
| Proje kuralı | `AGENTS.md` | Cursor, Antigravity CLI, Antigravity IDE |
| Workspace kuralı | `.agents/rules/takt.md` | Antigravity (Always On) |
| Cursor protokolü | `docs/15-cursor-orkestrasyon.md` | Codex + Cursor işçisi |
| Bu protokol | `docs/18-antigravity-orkestrasyon.md` | Codex + Antigravity işçisi |
| Görev brief’i | `docs/briefs/*.md` | Seçilen tek işçi |

`GEMINI.md` kopyası **yazılmaz**. Aynı metni iki dosyada tutmak kotayı iki
kez yedirir. Antigravity CLI zaten `AGENTS.md` okur.

## Rol dağılımı

### Codex — mimar, ürün sahibi ve denetçi

- İşi `TODO-CODEX.md` içinden seçer.
- Hangi işçinin kotasının kullanılacağına karar verir (aşağıdaki yönlendirme).
- Brief’i `docs/briefs/` altına yazar; sohbete kaynak kod yapıştırmaz.
- İşçiyi **tek komutla** (dispatch script) başlatır.
- Çıktıdan yalnızca teslim raporu + `conversation_id` + token özetini okur.
- `git diff --stat` ve gerekirse dosya diff’ini inceler.
- `npm run lint` / `npm run build` / göreve özgü testi bağımsız çalıştırır.
- Uygulama kodunu yeniden yazmaz.
- Computer Use ile Antigravity veya Cursor penceresine dokunmaz.

### Antigravity — Google kotası işçisi

- Verilen brief dışına taşmadan kod yazar.
- `AGENTS.md` ve `.agents/rules/takt.md` talimatlarını okur.
- Mevcut tasarım sistemini korur.
- Uydurma müşteri, referans, rakam, sertifika üretmez.
- Nested / parallel subagent **başlatmaz** (kota paylaşılır ve hızla biter).
- Testleri çalıştırır, 20 satırı geçmeyen rapor bırakır.
- Commit / push / deploy / hesap ayarı yapmaz.

### Cursor — Cursor kotası işçisi

Davranış `docs/15-cursor-orkestrasyon.md` ile aynıdır. Antigravity ile
**aynı anda yazmaz**.

## Kota yönlendirme

Aynı anda yalnızca **bir yazar**. Codex işi şu tabloya göre verir:

| Durum | İşçi | Kota |
|---|---|---|
| Ürün kararı, brief, diff inceleme, kabul | Codex | ChatGPT / Codex |
| Cursor indeksi, Grok, mevcut Cursor MCP | Cursor `agent -p` | Cursor |
| Gemini ailesi, Google hesabı kotası | `agy -p` | Antigravity (masaüstü+CLI+SDK ortak) |
| Uygulamayı yapanın ikinci görüşü (salt okuma) | Diğer işçi, yazma yasağı | Karşı kota |
| Ekran tıklama, `agy` / `cursor` keşfi | Yasak | En pahalı çöp |

Kota bitince işi diğer işçiye **yeni brief** ile taşı; aynı sohbeti iki
ürüne import etme.

Antigravity kotası masaüstü uygulama, `agy` CLI ve SDK arasında **ortaktır**.
IDE’de ajan açıkken Codex’in `agy -p` çalıştırması kotayı çift yakar. Ya IDE
oturumunu kapat ya da o turda yalnızca IDE kullan.

## Bağlantı (Cursor’daki gibi)

Keşif yok. Codex şunları çalıştırmaz:

- `agy` (interaktif TUI)
- `agy --help`
- Antigravity GUI / Computer Use
- `Get-Command agy` döngüsü
- `C:\Users\omrfr\AppData\Local\agy` gezintisi

Tek bağlanma yolu:

```powershell
pwsh -File .\scripts\dispatch-antigravity.ps1 -BriefPath .\docs\briefs\2026-08-26-ornek.md
```

İlk kurulum (bir kez, insan yapar; Codex her turda tekrarlamaz):

1. CLI yoksa: `irm https://antigravity.google/cli/install.ps1 | iex`
2. Binary: `%LOCALAPPDATA%\agy\bin\agy.exe` PATH’te olsun.
3. Bir kez interaktif `agy` ile Google hesabına giriş (keyring).
4. Antigravity IDE kullanılıyorsa aynı klasörü aç.
5. Workspace kuralı `.agents/rules/takt.md` → Always On.

Headless kimlik, önceden cache’lenmiş keyring oturumunu kullanır. Oturum
yoksa `agy -p` asılı kalmaz, `authentication required` ile çıkar.

## Dispatch

Script `scripts/dispatch-antigravity.ps1` şunları yapar:

- çalışma alanına `cd`,
- brief yolunu ajana verir (brief metnini Codex context’ine basmaz),
- `agy -p --output-format json --print-timeout 15m`,
- stdout’dan yalnızca `STATUS`, `CONVERSATION_ID`, token özeti ve `RESPONSE`
  basar.

Örnekler:

```powershell
# Yeni görev
pwsh -File .\scripts\dispatch-antigravity.ps1 `
  -BriefPath .\docs\briefs\2026-08-26-lint.md `
  -SkipPermissions

# Mekanik iş: daha ucuz model
pwsh -File .\scripts\dispatch-antigravity.ps1 `
  -BriefPath .\docs\briefs\2026-08-26-lint.md `
  -Model gemini-3.5-flash-medium `
  -Effort low `
  -SkipPermissions

# Follow-up: yeni ajan değil, aynı conversation
pwsh -File .\scripts\dispatch-antigravity.ps1 `
  -BriefPath .\docs\briefs\2026-08-26-lint-fix.md `
  -ConversationId 055a398f-db14-4c5f-abbb-1bf03f8120a7 `
  -SkipPermissions
```

`-SkipPermissions` yalnızca bu güvenilen repoda, Codex’in yazdığı brief için
kullanılır. Tercih edilen kalıcı yol, `~/.gemini/antigravity-cli/settings.json`
içinde dar allowlist’tir:

```json
{
  "permissions": {
    "allow": [
      "command(git)",
      "command(npm run (build|lint|test|test:content|test:e2e))"
    ]
  }
}
```

Allowlist yoksa headless `agy` shell komutlarını soft-deny eder, iş bitmez,
Codex tekrar dener ve kota yanar.

Varsayılan `--print-timeout` 5 dakikadır; uygulama işi 15 dakikaya çıkarılır.
Daha uzun iş parçalanır, tek canavar prompt verilmez.

## Standart görev akışı

1. Codex `git status --short` bakar; kirli ağaçta ikinci yazar başlatmaz.
2. `TODO-CODEX.md` içinden bir görev seçer, işçiyi tablodan belirler.
3. Brief’i `docs/briefs/YYYY-MM-DD-slug.md` olarak yazar.
4. Antigravity seçildiyse `scripts/dispatch-antigravity.ps1` çalışır.
5. Codex yalnızca script özetini okur (`stream-json` / tool log yok).
6. Codex `git diff --stat` + kapsam içi diff inceler.
7. Codex lint/build/testi kendi çalıştırır.
8. Fail varsa `--ConversationId` ile yalnızca başarısız kriteri düzeltir.
9. Kabul edilince TODO kapanır. Commit/push/deploy ayrı ve açık işlemdir.

## Brief şablonu

`docs/briefs/` altındaki her dosya şu iskeleti kullanır. `İŞÇİ` satırı
zorunludur; yanlış işçiye verilen brief geçersizdir.

```text
İŞÇİ
antigravity

AMAÇ
[Tek cümlelik sonuç]

ÇALIŞMA ALANI
C:\Users\omrfr\OneDrive\Hersik\Belgeler\takt

ÖNCE OKU
- AGENTS.md
- .agents/rules/takt.md
- TODO-CODEX.md içindeki [başlık]
- [ilgili dosya yolları — içerik yapıştırma]

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
- nested / parallel subagent
- Computer Use, tarayıcı otomasyonu, hesap ayarı

KABUL KRİTERLERİ
- [gözlemlenebilir davranış]
- [responsive/erişilebilirlik koşulu]
- [test koşulu]

DOĞRULAMA
- npm run lint
- npm run build
- [göreve özgü test]

TESLİM
En fazla 20 satır: değişen dosyalar, test sonucu, kalan risk.
```

Cursor işçisi için aynı şablon, `İŞÇİ` satırı `cursor` ve protokol
`docs/15-cursor-orkestrasyon.md`.

## Görev paketi ve paralellik

İdeal Antigravity görevi Cursor ile aynıdır: 1 amaç, 2–6 dosya, tek
doğrulama grubu.

Aynı çalışma alanında tek yazar. Diğeri yalnızca salt okuma (analiz,
review, test planı) yapabilir. Kesişmeyen işler ancak ayrı git worktree
ile paraleldir; birleştirmeden önce Codex her diff’i ayrı inceler.

Antigravity’nin kendi alt ajanları da yazardır. Brief “alt ajan yok”
demedikçe `agy` paralel kota yakabilir. Codex bunu özellikle yasaklar.

## Model seçimi

Model adı değişebilir; `agy models` çıktısına pinlenir, uydurulmaz.
Bilinmeyen `--model` headless’te sessizce düşmez, `ERROR` ile çıkar.

Yönlendirme ilkesi:

- Mekanik düzenleme: Flash / low effort
- Bileşen ve form: varsayılan orta model
- Animasyon, karmaşık state, mimari: Pro / high effort
- Review: uygulamayı yapandan **farklı** işçi veya farklı model

## Token ve kota tasarrufu

- Codex, Antigravity TUI/GUI’sini izlemez.
- Brief sohbete değil dosyaya yazılır; büyük kaynak yerine yol verilir.
- Dispatch çıktısı `json` özetidir; `stream-json` Codex context’ine girmez.
- Follow-up yeni oturum açmaz; `conversation_id` ile devam eder.
- Nested subagent yok.
- IDE ajanı + CLI ajanı aynı anda yok.
- Kota durumunu her turda `agy -p "/usage"` ile kazma. İnsan gerekirse
  interaktif `/usage` bakar; Codex keşif komutu çalıştırmaz.
- Cursor konuşmasını Antigravity’ye (veya tersi) import etme.

## Codex inceleme kontrol listesi

`docs/15-cursor-orkestrasyon.md` listesi geçerlidir. Ek maddeler:

- [ ] Brief’teki `İŞÇİ` satırı gerçekten Antigravity miydi?
- [ ] Cursor aynı anda yazdı mı? (yazdıysa diff karışmıştır)
- [ ] Nested subagent izi var mı? (`subagent_info`, beklenmeyen worktree)
- [ ] Dispatch özetindeki `STATUS` `SUCCESS` mu?
- [ ] `usage.total_tokens` göreve göre makul mü? (keşif/help döngüsü yok)

## Codex kuralı (yapıştır)

ChatGPT masaüstü / Codex skill veya standing instruction:

```text
Antigravity orkestrasyonu (Takt):
- Computer Use YOK, interaktif `agy` YOK, `agy --help` YOK
- Aynı klasör: C:\Users\omrfr\OneDrive\Hersik\Belgeler\takt
- Brief: docs/briefs/YYYY-MM-DD-slug.md (İŞÇİ: antigravity)
- Tek komut: pwsh -File .\scripts\dispatch-antigravity.ps1 -BriefPath <brief> -SkipPermissions
- Çıktıdan STATUS, CONVERSATION_ID, usage, RESPONSE oku; tool log yok
- Doğrulama: git diff --stat + npm run lint / build
- Fail: aynı -ConversationId, yalnızca kırılan kriter
- Alt ajan yasak; Cursor ile aynı anda yazma yasak
- Uygulama kodunu sen yazma
```

## İlk bağlanma doğrulaması

İnsan, Codex’e iş vermeden önce bir kez:

```powershell
cd C:\Users\omrfr\OneDrive\Hersik\Belgeler\takt
agy -p "AGENTS.md ve .agents/rules/takt.md dosyalarını oku. Bu proje tek cümlede nedir, hangi yığım yasaktır değiştirmeye? Kod yazma."
```

Beklenen: Takt kurumsal site, Next.js App Router + Tailwind, yığım
değiştirilmez. Bu cevap gelirse bağlantı tamam; gelmezse klasör yanlış veya
kural Always On değildir.
