import { siteConfig } from "@/lib/site";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  /** KVKK veri sorumlusu */
  isDataController?: boolean;
  /** Opsiyonel LinkedIn — doğrulanmış profil URL'si */
  linkedin?: string;
};

export const teamMembers: TeamMember[] = [
  {
    id: "omer-faruk-top",
    name: "Ömer Faruk Top",
    role: "Kurucu",
    bio: "Mühendislik danışmanlığı, proje yönetimi ve teknik koordinasyon alanlarında Takt'ı yürütür.",
    isDataController: true,
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
