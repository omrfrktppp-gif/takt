# Takt — Arayüz Referans Araştırması

*25 Temmuz 2026 · Uygulama öncesi karar kaydı*

## Tasarım yönü

Takt için seçilen yön, **paper-first teknik editoryal arayüz + tek mavi
sinyal + CAD/ölçülendirme hareketleri** birleşimidir. Koyu ürün lansmanı
estetiği, video ağırlıklı anlatım, pill bileşenler ve yapay proje görselleri
marka guardrail'leriyle uyumlu değildir.

| Referans | Alınacak ilke | Alınmayacak ilke |
|---|---|---|
| [Bklit UI](https://bklit.com/) | Teknik grid, koordinatlar, ölçü çizgileri, mono etiketler | Siyah ağırlıklı tema ve görsel gürültü |
| [Apple MacBook Pro](https://www.apple.com/macbook-pro/) | Tek odaklı bölüm temposu, kademeli ürün anlatımı | Video sayısı, sayfa uzunluğu ve medya ağırlığı |
| [Bambu Lab H2D](https://bambulab.com/en/h2d) | Özelliği problemden çözüme götüren modüler anlatım | Tam ekran ürün filmi ve ağır medya |
| [Path Robotics](https://www.path-robotics.com/) | Endüstriyel güven, problem/çözüm sırası, somut çıktı | Koyu ve sinematik sunum |
| [coss UI / Origin UI](https://originui.com/) | Sakin, erişilebilir navigasyon ve form kalıpları | Jenerik ürün paneli görünümü |
| [Kokonut UI](https://kokonutui.com/) | Katmanlı kart kompozisyonu ve ölçülü hover tepkisi | Parlak glow, yoğun pill ve startup estetiği |
| [Uilora](https://www.uilora.com/) | Derinlik hissi ve hareketli katman fikri | Kinetik tipografi ve sürekli hareket |
| [Creality K2 Plus](https://www.creality.com/products/creality-k2-plus-combo-3d-printer) | Yerel ürün navigasyonu ve özellik sıralaması | Video/canvas ağırlıklı uzun ürün sayfası |

## Mevcut arayüz denetimi

- `SeoPageLayout`, dikey taşmayı kendi üzerinde yöneten bir kapsayıcı
  oluşturuyordu. Ana sahnenin Motion `useScroll` çağrısı ise ayrı bir
  `container` tanımlamadan belge kaydırmasını izliyordu. Bu iki kaydırma
  referansının ayrışması sticky davranışının ve ilerleme hesabının güvenilir
  çalışmasını engelliyordu.
- Ana sahne masaüstünde `310vh` uzunluğa sahipti. Görsel değişim başlamadan
  oluşan mesafe, kullanıcının sahneyi hareket etmeden geçmesine ve metinlerin
  bağlamdan kopmasına yol açıyordu.
- Eski özel scroll/snap bileşenleri güncel ana deneyimle yan yana duruyordu.
  Kullanılmayan parçalar doğrulanarak kaldırılmalı; tek dikey kaydırma sahibi
  belge olmalıdır.
- İç sayfalardaki geniş üst boşluklar, ilk anlamlı içeriği masaüstünde ilk
  ekranın altına itiyordu. Ortak sayfa başlığı sıkılaştırılmalı, içerik
  hiyerarşisi sayfa türüne göre kurulmalıdır.

## Uygulama kararları

- Animasyon altyapısı: mevcut [Motion](https://motion.dev/docs/react-scroll-animations),
  optimize inline SVG ve CSS. İkinci bir motion runtime eklenmeyecek.
- Ana hareket: problem → kısıtlar → exploded-view → birleşmiş sistem ve
  teslimler sırasındaki dört durumlu teknik sahne.
- Sezgisellik: “kaydırın” açıklaması yerine ilk kaydırmada anında tepki,
  sıradaki içeriğin doğal görünmesi ve standart belge kaydırması kullanılacak.
- Masaüstünde sınırlı sticky anlatım; mobilde ardışık, kısa ve statik SVG
  paneller kullanılacak.
- Reduced-motion görünümü animasyonun son, eksiksiz ve okunabilir karesini
  gösterecek.
- Her görünüm alanında yalnız bir baskın hareket bulunacak. Mikro tepkiler
  renk, çizgi ve en fazla birkaç piksellik dönüşümle sınırlı kalacak.

## İçerik ve kanıt sınırı

Repoda yayımlanmış üç teknik vaka kullanılabilir: DFM, DFA ve termal genleşme.
Bunlar müşteri referansı olarak değil, kaynak bloga bağlanan anonim teknik
kayıt olarak gösterilmelidir. Müşteri adı, logo, sertifika, yeni sonuç metriği
veya izin bilgisi eklemek için ayrıca ticari/hukuki onay gerekir.

