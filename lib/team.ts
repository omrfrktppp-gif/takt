import { siteConfig } from "@/lib/site";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  profileLabel: string;
  headline: string;
  image?: string;
  experienceLead?: string;
  experienceSummary?: string;
  areasLabel: string;
  sectors?: readonly string[];
  /** KVKK veri sorumlusu */
  isDataController?: boolean;
  /** Opsiyonel LinkedIn — doğrulanmış profil URL'si */
  linkedin?: string;
  linkedinLabel?: string;
};

export const teamMembers: TeamMember[] = [
  {
    id: "omer-faruk-top",
    name: "Ömer Faruk Top",
    role: "Kurucu · Proje ve Mühendislik Yöneticisi",
    bio: "Farklı sektörlerdeki mühendislik projelerinde teknik koordinasyon ve proje yönetimi görevleri üstlenen Takt kurucusu.",
    profileLabel: "Kurucu · Doğrudan muhatabınız",
    headline: "Farklı sektörlerde proje koordinasyonu.",
    image: "/team/omer-faruk-top.webp",
    experienceSummary:
      "Ömer Faruk Top, Takt’ın kurucusu ve projelerde müşterinin ana teknik muhatabıdır. Farklı sektörlerde ve farklı ölçeklerde yürütülen mühendislik çalışmalarında proje koordinasyonu, ürün geliştirme ve teknik ekip yönetimi görevleri üstlenmiştir. Takt bünyesinde ihtiyacın netleştirilmesi, gerekli uzmanlıkların belirlenmesi, doğru teknik kişilerin projeye dâhil edilmesi ve sürecin müşteriyle koordinasyonundan sorumludur.",
    areasLabel: "Proje deneyiminin bulunduğu alanlar",
    sectors: [
      "Otomotiv ve elektrikli araçlar",
      "Yenilenebilir enerji",
      "Endüstriyel üretim hatları",
      "Gıda makineleri",
      "Eklemeli imalat",
      "Tersine mühendislik",
      "Endüstriyel ürün geliştirme",
      "Proje yönetimi",
      "Teknik ekip yönetimi",
      "Biyomedikal",
    ],
    isDataController: true,
    linkedin: "https://www.linkedin.com/in/omrfrktp/",
    linkedinLabel: "Ömer Faruk Top’un LinkedIn profilini görüntüleyin",
  },
  {
    id: "kerem-demir",
    name: "Kerem Demir",
    role: "Elektrik-Elektronik Mühendisi",
    bio: "Takt projelerinde elektronik sistemler ve donanım geliştirme alanında görev alan elektrik-elektronik mühendisi.",
    profileLabel: "Elektronik ve donanım",
    headline: "Elektronik sistemler ve donanım geliştirme.",
    image: "/team/kerem-demir.webp",
    experienceLead:
      "Kerem Demir, Elektrik-Elektronik Mühendisidir ve Takt bünyesindeki projelerde elektronik donanım geliştirme alanında görev almaktadır.",
    experienceSummary:
      "Devre ve PCB tasarımı, mikrodenetleyiciler, mikroişlemciler ve gömülü sistemler üzerine çalışmalar yürütmektedir. Elektronik ürün geliştirme süreçlerinin yanı sıra sertifikasyon ve teknik uygunluk çalışmalarında deneyim sahibidir. Projelerde elektronik mimarinin oluşturulması, donanım geliştirme ve teknik gereksinimlerin belirlenmesine katkı sağlamaktadır.",
    areasLabel: "Deneyiminin bulunduğu alanlar",
    sectors: [
      "Devre tasarımı",
      "PCB ve elektronik kart tasarımı",
      "Gömülü sistemler",
      "Mikrodenetleyiciler",
      "Mikroişlemciler",
      "Robotik",
      "Haberleşme sistemleri",
      "Model uydu sistemleri",
      "Elektronik ürün geliştirme",
      "Sertifikasyon ve teknik uygunluk",
    ],
    linkedin: "https://www.linkedin.com/in/kerem-demir-264126164/",
    linkedinLabel: "Kerem Demir’in LinkedIn profilini görüntüleyin",
  },
];

export function personIdForMember(member: TeamMember): string {
  return `${siteConfig.url}/#person-${member.id}`;
}

export function getTeamMemberByName(name: string): TeamMember | undefined {
  const normalized = name.trim();
  if (normalized === "Ömer Faruk") {
    return teamMembers.find((member) => member.name === "Ömer Faruk Top");
  }
  return teamMembers.find(
    (member) =>
      member.name === normalized || member.name.startsWith(`${normalized} `),
  );
}
