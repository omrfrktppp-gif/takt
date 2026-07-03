import type { ServiceBranchId } from "@/lib/ihtiyac-analizi/types";

export type ServiceBranch = {
  id: ServiceBranchId;
  s1Value: string;
  label: string;
  shortLabel: string;
  path: string;
  typicalDuration?: string;
};

export const SERVICE_BRANCHES: ServiceBranch[] = [
  {
    id: "tasarim-gelistirme",
    s1Value: "A",
    label: "Tasarım & Geliştirme",
    shortLabel: "Tasarım & Geliştirme",
    path: "/hizmetler/tasarim-gelistirme",
    typicalDuration: "2–10 hafta",
  },
  {
    id: "analiz-hesaplama",
    s1Value: "B",
    label: "Analiz, Hesaplama & Raporlama",
    shortLabel: "Analiz & Raporlama",
    path: "/hizmetler/analiz-hesaplama",
    typicalDuration: "1–4 hafta",
  },
  {
    id: "uretim-danismanligi",
    s1Value: "C",
    label: "Üretim Danışmanlığı",
    shortLabel: "Üretim Danışmanlığı",
    path: "/hizmetler/uretim-danismanligi",
    typicalDuration: "2–8 hafta",
  },
  {
    id: "arge-urge",
    s1Value: "D",
    label: "Ar-Ge & Ür-Ge Danışmanlığı",
    shortLabel: "Ar-Ge & Ür-Ge",
    path: "/hizmetler/arge-urge",
  },
  {
    id: "tubitak-kosgeb",
    s1Value: "E",
    label: "TÜBİTAK & KOSGEB & Türk Patent Proje Desteği",
    shortLabel: "TÜBİTAK / KOSGEB / Patent",
    path: "/hizmetler/tubitak-kosgeb",
  },
  {
    id: "teknik-ekip",
    s1Value: "F",
    label: "Teknik Ekip & Süreç Yönetimi",
    shortLabel: "Teknik Ekip & Süreç",
    path: "/hizmetler/teknik-ekip",
  },
  {
    id: "proje-danismanligi",
    s1Value: "G",
    label: "Proje Danışmanlığı",
    shortLabel: "Proje Danışmanlığı",
    path: "/hizmetler/proje-danismanligi",
    typicalDuration: "2–12 hafta",
  },
];

export function getServiceByS1Value(value: string): ServiceBranch | undefined {
  return SERVICE_BRANCHES.find((branch) => branch.s1Value === value);
}

export function getServiceById(id: ServiceBranchId): ServiceBranch | undefined {
  return SERVICE_BRANCHES.find((branch) => branch.id === id);
}

export const S1_OPTIONS = [
  {
    value: "A",
    label: "Bir makina / ürün tasarlatmak veya geliştirmek istiyorum",
  },
  {
    value: "B",
    label: "Hesap, analiz veya mühendislik doğrulaması lazım",
  },
  { value: "C", label: "Parçamı / ürünümü ürettirmek istiyorum" },
  { value: "D", label: "Fikrimi ürüne dönüştürmek istiyorum (Ar-Ge / Ür-Ge)" },
  { value: "E", label: "TÜBİTAK / KOSGEB / patent desteği arıyorum" },
  { value: "F", label: "Teknik ekibime dış güç veya süreç düzeni lazım" },
  { value: "G", label: "Projem dağınık / tıkandı, teknik yönetim lazım" },
  { value: "H", label: "Emin değilim — yönlendirin" },
] as const;
