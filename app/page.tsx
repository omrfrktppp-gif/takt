import type { Metadata } from "next";
import { HomeExperience } from "@/components/scroll/HomeExperience";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Mühendislik Danışmanlığı",
    description: siteConfig.description,
    path: "/",
  }),
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  title: {
    absolute: "Takt — Mühendislik Danışmanlığı",
  },
};

export default function HomePage() {
  return (
    <>
      <h1 className="sr-only">
        Takt — Makina imalatı, Ar-Ge ve savunma sanayisinde mühendislik
        danışmanlığı: tasarım, analiz, proje yönetimi ve üretim koordinasyonu.
      </h1>
      <HomeExperience />
    </>
  );
}
