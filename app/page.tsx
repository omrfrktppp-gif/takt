import type { Metadata } from "next";
import { HomeExperience } from "@/components/scroll/HomeExperience";
import { buildMetadata } from "@/lib/seo";

type HomePageProps = {
  searchParams: Promise<{ b?: string; p?: string }>;
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
  const { b, p } = await searchParams;
  return (
    <>
      <h1 className="sr-only">
        Takt — Ankara&apos;da makina imalatı ve sanayi için mühendislik
        danışmanlığı: tasarım, analiz, üretim ve Ar-Ge.
      </h1>
      <HomeExperience chapter={b} panel={p} />
    </>
  );
}
