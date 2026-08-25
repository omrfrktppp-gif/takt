# İngilizce site yapısı

## Rota modeli

- Türkçe ana dil ve kök rotadır: `/`, `/hizmetler`, `/blog/...`
- İngilizce sürüm `/en` öneki kullanır: `/en`, `/en/hizmetler`, `/en/blog/...`
- TR/EN seçici aynı sayfanın diğer dildeki karşılığına gider.
- İngilizce blog liste, etiket ve detay sayfaları sunucuda İngilizce olarak oluşturulur.

## Metin kaynakları

- Blog dışı İngilizce metinler: `public/locales/en/`
- Blog Türkçe kaynak: `content/blog/<NN-slug>/index.md`
- Blog İngilizce kaynak: `content/blog/<NN-slug>/index.en.md`
- Blog görselleri iki dilde aynı `images/` klasörünü kullanır.

## Yayın öncesi kapılar

1. Blog dışı İngilizce sayfalar sunucu tarafı sözlüklere taşınır; geçici istemci çeviri köprüsü kaldırılır.
2. Her sayfada İngilizce metin, bağlantı ve form akışı görsel olarak kontrol edilir.
3. Canonical ve `hreflang` çiftleri TR/EN karşılıklı doğrulanır.
4. İngilizce rotalar sitemap'e alınır ve geçici `noindex` kaldırılır.
5. Türkçe ve İngilizce bloglarda kırık iç/dış bağlantı taraması çalıştırılır.
6. Build, lint, TypeScript ve Playwright kontrolleri geçmeden deploy yapılmaz.
