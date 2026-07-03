import { sectors } from "@/lib/sectors";
import { S1_OPTIONS } from "@/lib/ihtiyac-analizi/branches";
import type { FormScreen } from "@/lib/ihtiyac-analizi/types";

const COMPANY_SIZE_OPTIONS = [
  { value: "girisim", label: "Girişim" },
  { value: "1-9", label: "1–9" },
  { value: "10-49", label: "10–49" },
  { value: "50-249", label: "50–249" },
  { value: "250+", label: "250+" },
  { value: "kamu", label: "Kamu / üniversite" },
];

export { COMPANY_SIZE_OPTIONS };

const SECTOR_OPTIONS = [
  ...sectors.map((sector) => ({
    value: sector.id,
    label: sector.title,
  })),
  { value: "diger", label: "Diğer" },
];

export const FORM_SCREENS: Record<string, FormScreen> = {
  "s1-main": {
    id: "s1-main",
    title: "Size en yakın olanı seçin",
    description: "Projenizdeki eksik halka hangisi?",
    questions: [
      {
        id: "s1-main",
        label: "Ana ihtiyaç",
        type: "single",
        required: true,
        options: S1_OPTIONS.map((option) => ({
          value: option.value,
          label: option.label,
        })),
      },
    ],
  },
  "a1-sub": {
    id: "a1-sub",
    title: "Tasarım ihtiyacınız",
    questions: [
      {
        id: "a1-sub",
        label: "Alt ihtiyaç",
        type: "single",
        required: true,
        options: [
          { value: "sifirdan", label: "Sıfırdan tasarım (yeni makina / ürün / sistem)" },
          { value: "iyilestirme", label: "Mevcut tasarımın iyileştirilmesi" },
          { value: "tersine", label: "Tersine mühendislik (mevcut parçayı dijitale taşıma)" },
        ],
      },
    ],
  },
  "a2a-design": {
    id: "a2a-design",
    title: "Sıfırdan tasarım",
    questions: [
      {
        id: "a2a-design",
        label: "Ne tasarlanacak?",
        type: "single",
        required: true,
        options: [
          { value: "makina", label: "Özel makina / tezgâh" },
          { value: "urun", label: "Ürün veya parça" },
          { value: "sistem", label: "Sistem / hat ekipmanı" },
          { value: "otomasyon", label: "Otomasyon içeren düzenek" },
        ],
      },
      {
        id: "a2a-stage",
        label: "Şu an hangi aşamada?",
        type: "single",
        required: true,
        options: [
          { value: "fikir", label: "Sadece fikir var" },
          { value: "konsept", label: "Konsept / kaba taslak hazır" },
          { value: "detay", label: "Detay tasarım sürüyor" },
          { value: "prototip", label: "Prototip var, olgunlaştırılacak" },
        ],
      },
    ],
  },
  "a2b-goals": {
    id: "a2b-goals",
    title: "Mevcut tasarım iyileştirme",
    questions: [
      {
        id: "a2b-goals",
        label: "Hedef ne?",
        type: "multi",
        required: true,
        options: [
          { value: "maliyet", label: "Maliyet düşürme" },
          { value: "performans", label: "Performans artırma" },
          { value: "dfm", label: "Üretilebilirlik (DFM)" },
          { value: "malzeme", label: "Malzeme / proses değişimi" },
          { value: "ariza", label: "Tekrarlayan arızanın giderilmesi" },
        ],
      },
      {
        id: "a2b-data",
        label: "Tasarım verisi elinizde mi?",
        type: "single",
        required: true,
        options: [
          { value: "cad", label: "CAD / 3B model var" },
          { value: "resim", label: "Sadece teknik resim var" },
          { value: "fiziksel", label: "Sadece fiziksel ürün var" },
        ],
      },
    ],
  },
  "a2c-part": {
    id: "a2c-part",
    title: "Tersine mühendislik",
    questions: [
      {
        id: "a2c-part",
        label: "Parça durumu",
        type: "single",
        required: true,
        options: [
          { value: "numune", label: "Numune elimde, gönderebilirim" },
          { value: "yerinde", label: "Parça büyük / sökülemez, yerinde tarama gerekir" },
          { value: "foto", label: "Elimde sadece foto / ölçü var" },
        ],
      },
      {
        id: "a2c-goal",
        label: "Hedef",
        type: "single",
        required: true,
        options: [
          { value: "uretim", label: "Yeniden üretilebilir hale getirmek" },
          { value: "arsiv", label: "CAD arşivi oluşturmak" },
          { value: "revize", label: "Taramadan sonra revize edip iyileştirmek" },
        ],
      },
      {
        id: "a2c-size",
        label: "Yaklaşık parça boyutu",
        type: "single",
        required: true,
        options: [
          { value: "avuc", label: "Avuç içi" },
          { value: "masaustu", label: "Masaüstü" },
          { value: "buyuk", label: "İnsan boyu ve üzeri" },
        ],
      },
    ],
  },
  "a3-req": {
    id: "a3-req",
    title: "Gereksinimler",
    questions: [
      {
        id: "a3-compliance",
        label: "Uygunluk",
        type: "multi",
        optional: true,
        options: [
          { value: "ce", label: "CE gerekli" },
          { value: "atex", label: "ATEX" },
          { value: "gida", label: "Gıda / hijyen" },
          { value: "sartname", label: "Müşteri şartnamesi var" },
          { value: "emniyet", label: "İş güvenliği (makina emniyeti)" },
          { value: "emin-degil", label: "Emin değilim" },
        ],
      },
      {
        id: "a3-note",
        label: "Makina / ürün ne yapmalı?",
        type: "text",
        optional: true,
        placeholder: "Bir cümleyle özetleyin",
      },
    ],
  },
  "b1-type": {
    id: "b1-type",
    title: "Analiz türü",
    questions: [
      {
        id: "b1-type",
        label: "Analiz türü",
        type: "multi",
        required: true,
        options: [
          { value: "fea", label: "Yapısal / mukavemet (FEA)" },
          { value: "yorulma", label: "Yorulma & ömür" },
          { value: "termal", label: "Termal / ısı yönetimi" },
          { value: "titresim", label: "Titreşim & modal" },
          { value: "cfd", label: "Akış (CFD)" },
          { value: "kinematik", label: "Kinematik / mekanizma" },
          { value: "boyut", label: "Boyutlandırma & el hesabı" },
          { value: "tolerans", label: "Tolerans yığılması" },
          { value: "malzeme", label: "Malzeme seçimi / doğrulama" },
          { value: "bilmiyorum", label: "Bilmiyorum — problemi anlatayım" },
        ],
      },
    ],
  },
  "b2-purpose": {
    id: "b2-purpose",
    title: "Analiz amacı",
    questions: [
      {
        id: "b2-purpose",
        label: "Amaç",
        type: "single",
        required: true,
        options: [
          { value: "dogrulama", label: "Yeni tasarımı doğrulamak" },
          { value: "kok-neden", label: "Arızanın kök nedenini bulmak" },
          { value: "optimizasyon", label: "Hafifletme / maliyet optimizasyonu" },
          { value: "ihale", label: "Müşteri / ihale raporu" },
          { value: "ce", label: "CE teknik dosyası" },
          { value: "patent", label: "Patent / proje başvurusu desteği" },
        ],
      },
    ],
  },
  "b3-output": {
    id: "b3-output",
    title: "Eldekiler & çıktı",
    questions: [
      {
        id: "b3-cad",
        label: "CAD modeli",
        type: "single",
        required: true,
        options: [
          { value: "var", label: "Var" },
          { value: "yok", label: "Yok" },
          { value: "kismen", label: "Kısmen" },
        ],
      },
      {
        id: "b3-test",
        label: "Test / saha verisi",
        type: "single",
        required: true,
        options: [
          { value: "var", label: "Var" },
          { value: "yok", label: "Yok" },
        ],
      },
      {
        id: "b3-output",
        label: "Beklenen çıktı",
        type: "single",
        required: true,
        options: [
          { value: "rapor", label: "Teknik rapor" },
          { value: "foy", label: "Hesap föyü seti" },
          { value: "sunum", label: "Yönetim / müşteri sunumu" },
          { value: "sertifika", label: "Sertifikasyon dosyası" },
          { value: "sonuc", label: "Sadece sonuç & öneri" },
        ],
      },
      {
        id: "b3-note",
        label: "Analiz konusu",
        type: "text",
        optional: true,
        placeholder: "Parça / sistem ve merak edilen soru",
      },
    ],
  },
  "c1-method": {
    id: "c1-method",
    title: "Üretim yöntemi",
    questions: [
      {
        id: "c1-method",
        label: "Üretim yöntemi",
        type: "multi",
        required: true,
        options: [
          { value: "lazer", label: "Lazer kesim & markalama" },
          { value: "cnc", label: "CNC işleme & torna" },
          { value: "sac", label: "Sac metal / abkant" },
          { value: "fason", label: "Fason üretim & kaynak" },
          { value: "3d-baski", label: "3D baskı / hızlı prototip" },
          { value: "3d-tarama", label: "3D tarama" },
          { value: "yuzey", label: "Yüzey işlem (kaplama / boyama)" },
          { value: "montaj", label: "Montaj & entegrasyon" },
          { value: "net-degil", label: "Net değil — parçayı anlatayım" },
        ],
      },
    ],
  },
  "c2-quantity": {
    id: "c2-quantity",
    title: "Adet, termin & malzeme",
    questions: [
      {
        id: "c2-adet",
        label: "Adet",
        type: "single",
        required: true,
        options: [
          { value: "tek", label: "1" },
          { value: "kucuk", label: "2–10" },
          { value: "orta", label: "11–100" },
          { value: "seri", label: "100+" },
        ],
      },
      {
        id: "c2-termin",
        label: "Termin",
        type: "single",
        required: true,
        options: [
          { value: "acil", label: "Acil (<2 hafta)" },
          { value: "normal", label: "Normal (2–6 hafta)" },
          { value: "esnek", label: "Esnek" },
        ],
      },
      {
        id: "c2-malzeme",
        label: "Malzeme",
        type: "text",
        optional: true,
        placeholder: "Örn. paslanmaz, alüminyum",
      },
      {
        id: "c2-tolerans",
        label: "Kritik tolerans / yüzey",
        type: "text",
        optional: true,
      },
    ],
  },
  "c3-supplier": {
    id: "c3-supplier",
    title: "Tedarik & kalite",
    questions: [
      {
        id: "c3-durum",
        label: "Durum",
        type: "single",
        required: true,
        options: [
          { value: "eslestirme", label: "Üreticim yok, eşleştirme istiyorum" },
          { value: "koordinasyon", label: "Üreticim var, koordinasyon istiyorum" },
          { value: "kalite", label: "Mevcut üreticide kalite / termin sorunu" },
          { value: "maliyet", label: "Maliyeti düşürmek istiyorum" },
        ],
      },
      {
        id: "c3-kalite",
        label: "Kalite gereksinimi",
        type: "multi",
        optional: true,
        options: [
          { value: "sertifika", label: "Kalite belgesi / sertifika" },
          { value: "izlenebilirlik", label: "İzlenebilirlik (markalama)" },
          { value: "olcum", label: "Ölçüm raporu" },
          { value: "malzeme-sert", label: "Malzeme sertifikası" },
        ],
      },
    ],
  },
  "d1-need": {
    id: "d1-need",
    title: "Ar-Ge ihtiyacı",
    questions: [
      {
        id: "d1-need",
        label: "İhtiyaç",
        type: "single",
        required: true,
        options: [
          { value: "kurgu", label: "Ar-Ge sürecinin kurgulanması (yol haritası)" },
          { value: "prototip", label: "Prototip geliştirme desteği" },
          { value: "seri", label: "Prototipten seri üretime geçiş" },
          { value: "test", label: "Test & doğrulama planlaması" },
          { value: "olgunluk", label: "Teknik olgunluk değerlendirmesi" },
        ],
      },
    ],
  },
  "d2-status": {
    id: "d2-status",
    title: "Proje durumu",
    questions: [
      {
        id: "d2-stage",
        label: "Aşama",
        type: "single",
        required: true,
        options: [
          { value: "fikir", label: "Fikir" },
          { value: "konsept", label: "Konsept doğrulandı" },
          { value: "prototip", label: "Çalışan prototip var" },
          { value: "kucuk-seri", label: "Küçük seri denendi" },
        ],
      },
      {
        id: "d2-ekip",
        label: "Ekip",
        type: "multi",
        optional: true,
        options: [
          { value: "arge", label: "Ar-Ge personeli var" },
          { value: "universite", label: "Üniversite / kurum işbirliği var" },
          { value: "kisitli", label: "Teknik ekip yok / kısıtlı" },
        ],
      },
      {
        id: "d2-note",
        label: "Farkınız",
        type: "text",
        optional: true,
        placeholder: "Projenizin mevcut çözümlerden farkı",
      },
    ],
  },
  "e1-topic": {
    id: "e1-topic",
    title: "Destek konusu",
    questions: [
      {
        id: "e1-topic",
        label: "Destek konusu",
        type: "multi",
        required: true,
        options: [
          { value: "tubitak", label: "TÜBİTAK proje başvurusu" },
          { value: "kosgeb", label: "KOSGEB destekleri" },
          { value: "patent", label: "Patent / faydalı model" },
          { value: "patentlenebilirlik", label: "Patentlenebilirlik / yenilik değerlendirmesi" },
          { value: "dokuman", label: "Teknik doküman & rapor hazırlığı" },
          { value: "yurutme", label: "Devam eden projenin yürütülmesi & raporlama" },
          { value: "program", label: "Hangi program uygun bilmiyorum" },
        ],
      },
    ],
  },
  "e2-status": {
    id: "e2-status",
    title: "Mevcut durum",
    questions: [
      {
        id: "e2-status",
        label: "Mevcut durum",
        type: "multi",
        optional: true,
        options: [
          { value: "ilk", label: "İlk başvurum olacak" },
          { value: "onceki", label: "Daha önce başvurdum" },
          { value: "prototip", label: "Prototip mevcut" },
          { value: "arastirma", label: "Patent araştırması yapıldı" },
          { value: "universite", label: "Üniversite işbirliği var" },
        ],
      },
      {
        id: "e2-program",
        label: "Hedef program",
        type: "text",
        optional: true,
      },
      {
        id: "e2-tarih",
        label: "Hedef başvuru tarihi",
        type: "text",
        optional: true,
      },
    ],
  },
  "f1-type": {
    id: "f1-type",
    title: "İhtiyaç tipi",
    questions: [
      {
        id: "f1-type",
        label: "İhtiyaç tipi",
        type: "single",
        required: true,
        options: [
          { value: "disiplin", label: "Eksik disiplin takviyesi" },
          { value: "surec", label: "Süreç & iş akışı kurulumu" },
          { value: "ise-alim", label: "İşe alım / aday mühendis değerlendirme" },
          { value: "mentorluk", label: "Mentorluk / tasarım gözden geçirme" },
        ],
      },
    ],
  },
  "f1-disiplin": {
    id: "f1-disiplin",
    title: "Hangi disiplin?",
    questions: [
      {
        id: "f1-disiplin",
        label: "Disiplin",
        type: "multi",
        required: true,
        options: [
          { value: "mekanik", label: "Mekanik tasarım" },
          { value: "analiz", label: "Analiz / hesap" },
          { value: "otomasyon", label: "Otomasyon" },
          { value: "uretim", label: "Üretim / imalat takibi" },
          { value: "proje", label: "Proje yönetimi" },
          { value: "kalite", label: "Kalite / süreç" },
        ],
      },
    ],
  },
  "f1-surec": {
    id: "f1-surec",
    title: "Neresi aksıyor?",
    questions: [
      {
        id: "f1-surec",
        label: "Sorun alanları",
        type: "multi",
        required: true,
        options: [
          { value: "planlama", label: "Planlama / takip" },
          { value: "dokuman", label: "Dokümantasyon düzeni" },
          { value: "gozden", label: "Tasarım gözden geçirme" },
          { value: "dis-kaynak", label: "Dış kaynak yönetimi" },
        ],
      },
    ],
  },
  "f1-ise-alim": {
    id: "f1-ise-alim",
    title: "İşe alım",
    questions: [
      {
        id: "f1-ise-alim",
        label: "Pozisyon sayısı ve disiplin",
        type: "text",
        required: true,
        placeholder: "Örn. 2 mekanik mühendis",
      },
    ],
  },
  "f1-mentorluk": {
    id: "f1-mentorluk",
    title: "Ekip büyüklüğü",
    questions: [
      {
        id: "f1-mentorluk",
        label: "Ekip büyüklüğü",
        type: "single",
        required: true,
        options: [
          { value: "1-3", label: "1–3" },
          { value: "4-10", label: "4–10" },
          { value: "10+", label: "10+" },
        ],
      },
    ],
  },
  "f2-model": {
    id: "f2-model",
    title: "Çalışma modeli",
    questions: [
      {
        id: "f2-model",
        label: "Çalışma modeli",
        type: "single",
        required: true,
        options: [
          { value: "surekli", label: "Sürekli destek (aylık)" },
          { value: "proje", label: "Proje bazlı" },
          { value: "tek-sefer", label: "Tek seferlik kurulum / değerlendirme" },
        ],
      },
      {
        id: "f2-note",
        label: "En büyük tıkanma",
        type: "text",
        optional: true,
      },
    ],
  },
  "g1-type": {
    id: "g1-type",
    title: "Proje tipi",
    questions: [
      {
        id: "g1-type",
        label: "Proje tipi",
        type: "single",
        required: true,
        options: [
          { value: "tesis", label: "Yeni üretim hattı / tesis kurulumu" },
          { value: "toparlama", label: "Tıkanmış projenin toparlanması" },
          { value: "kapasite", label: "Kapasite artırımı / proses optimizasyonu" },
          { value: "koordinasyon", label: "Çok paydaşlı işin koordinasyonu" },
          { value: "fizibilite", label: "Yatırım / fizibilite aşamasında teknik değerlendirme" },
        ],
      },
    ],
  },
  "g2-status": {
    id: "g2-status",
    title: "Proje durumu",
    questions: [
      {
        id: "g2-size",
        label: "Proje büyüklüğü",
        type: "single",
        required: true,
        options: [
          { value: "makina", label: "Tek makina / istasyon" },
          { value: "hat", label: "Hat / bölüm" },
          { value: "tesis", label: "Tesis geneli" },
        ],
      },
      {
        id: "g2-ekip",
        label: "İç ekip",
        type: "single",
        required: true,
        options: [
          { value: "guclu", label: "Güçlü, yönetim kapasitesi eksik" },
          { value: "kisitli", label: "Kısıtlı, teknik destek de lazım" },
          { value: "yok", label: "Yok" },
        ],
      },
      {
        id: "g2-note",
        label: "En zorlayan konu",
        type: "text",
        optional: true,
      },
    ],
  },
  "h1-triage": {
    id: "h1-triage",
    title: "Sizi en iyi hangisi tanımlıyor?",
    questions: [
      {
        id: "h1-triage",
        label: "Durum",
        type: "single",
        required: true,
        options: [
          { value: "fikir", label: "Bir fikrim / ihtiyacım var ama nereden başlayacağımı bilmiyorum" },
          { value: "sorun", label: "Bir şey üretiyorum ama sorun var (arıza / kalite / maliyet)" },
          { value: "proje", label: "Projem var, yürütecek güç / düzen yetmiyor" },
          { value: "destek", label: "Devlet desteği / patent aklımda" },
        ],
      },
    ],
  },
  "h1-fikir-type": {
    id: "h1-fikir-type",
    title: "Fikriniz hangisine daha yakın?",
    questions: [
      {
        id: "h1-fikir-type",
        label: "Yönlendirme",
        type: "single",
        required: true,
        options: [
          { value: "urun", label: "Ürün / makina tasarımı" },
          { value: "arge", label: "Ar-Ge / ürün geliştirme süreci" },
        ],
      },
    ],
  },
  "h1-problem-area": {
    id: "h1-problem-area",
    title: "Sorun nerede?",
    questions: [
      {
        id: "h1-problem-area",
        label: "Alan",
        type: "single",
        required: true,
        options: [
          { value: "tasarim", label: "Tasarım / mühendislik tarafında" },
          { value: "uretim", label: "Üretim / imalat tarafında" },
        ],
      },
    ],
  },
  "h1-blocker": {
    id: "h1-blocker",
    title: "Asıl eksiklik ne?",
    questions: [
      {
        id: "h1-blocker",
        label: "Darboğaz",
        type: "single",
        required: true,
        options: [
          { value: "ekip", label: "Teknik ekip / disiplin eksikliği" },
          { value: "surec", label: "Proje yönetimi / koordinasyon eksikliği" },
        ],
      },
    ],
  },
  "s2-time": {
    id: "s2-time",
    title: "Zaman & bütçe",
    questions: [
      {
        id: "s2-urgency",
        label: "Aciliyet",
        type: "single",
        required: true,
        options: [
          { value: "hemen", label: "Hemen başlamalı" },
          { value: "1-3-ay", label: "1–3 ay içinde" },
          { value: "esnek", label: "Esnek / araştırıyorum" },
        ],
      },
      {
        id: "s2-budget",
        label: "Bütçe",
        type: "single",
        required: true,
        options: [
          { value: "belirlendi", label: "Belirlendi" },
          { value: "tahmini", label: "Tahmini var" },
          { value: "yok", label: "Henüz yok" },
        ],
      },
    ],
  },
  "s3-docs": {
    id: "s3-docs",
    title: "Doküman & gizlilik",
    questions: [
      {
        id: "s3-docs",
        label: "Eldekiler",
        type: "multi",
        optional: true,
        options: [
          { value: "cad", label: "CAD / 3B model" },
          { value: "resim", label: "Teknik resim" },
          { value: "sartname", label: "Şartname" },
          { value: "numune", label: "Numune" },
          { value: "foto", label: "Foto / video" },
          { value: "test", label: "Test verisi" },
          { value: "hicbiri", label: "Hiçbiri" },
        ],
      },
      {
        id: "s3-privacy",
        label: "Gizlilik",
        type: "single",
        required: true,
        options: [
          { value: "nda", label: "NDA gerekli" },
          { value: "yok", label: "Kısıt yok" },
          { value: "gorusme", label: "Detayı görüşmede veririm" },
        ],
      },
    ],
  },
  "s4-contact": {
    id: "s4-contact",
    title: "Firma & iletişim",
    questions: [
      { id: "s4-name", label: "Ad soyad", type: "text", required: true },
      { id: "s4-company", label: "Firma", type: "text", optional: true },
      { id: "s4-email", label: "E-posta", type: "text", required: true },
      { id: "s4-phone", label: "Telefon", type: "text", required: true },
      { id: "s4-city", label: "Şehir", type: "text", optional: true },
      {
        id: "s4-size",
        label: "Firma ölçeği",
        type: "single",
        optional: true,
        options: COMPANY_SIZE_OPTIONS,
      },
      {
        id: "s4-sector",
        label: "Sektör",
        type: "single",
        optional: true,
        options: SECTOR_OPTIONS,
      },
    ],
  },
  "s5-summary": {
    id: "s5-summary",
    title: "Özet & gönderim",
    description: "Bilgilerinizi kontrol edin ve nasıl devam etmek istediğinizi seçin.",
    questions: [
      {
        id: "s5-secondary",
        label: "Bunlardan biri de gündeminizde mi?",
        type: "multi",
        optional: true,
        options: [],
      },
    ],
  },
};

export const FIRST_SCREEN_ID = "s1-main";

export const COMMON_TAIL_SCREEN_IDS = [
  "s2-time",
  "s3-docs",
  "s4-contact",
  "s5-summary",
] as const;
