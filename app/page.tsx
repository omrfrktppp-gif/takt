import type { Metadata } from "next";
import { HomeExperience } from "@/components/scroll/HomeExperience";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type HomePageProps = {
  searchParams: Promise<{ b?: string; p?: string }>;
};

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Mühendislik Danışmanlığı",
    description: siteConfig.description,
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
        Takt — Makina imalatı, Ar-Ge ve savunma sanayisinde mühendislik
        danışmanlığı: tasarım, analiz, proje yönetimi ve üretim koordinasyonu.
      </h1>
      <HomeExperience chapter={b} panel={p} />
    </>
  );
}
