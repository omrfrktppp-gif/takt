import type { Metadata } from "next";
import { HomeExperience } from "@/components/scroll/HomeExperience";
import { buildMetadata } from "@/lib/seo";

type HomePageProps = {
  searchParams: Promise<{ b?: string }>;
};

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Mühendislik Danışmanlığı",
    description:
      "Makina imalatı ve sanayide teknik ekiplere dışarıdan mühendislik gücü: tasarım, analiz, proje ve üretim yönetimi.",
    path: "/",
  }),
  title: {
    absolute: "Takt — Mühendislik Danışmanlığı",
  },
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const { b } = await searchParams;
  return <HomeExperience chapter={b} />;
}
