import type { Metadata } from "next";
import { HomeHub } from "@/components/HomeHub";
import { JsonLd } from "@/components/JsonLd";
import { howToSchema } from "@/lib/schema";
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
    absolute:
      "Takt — Mühendislik Danışmanlığı | Tasarım, Analiz ve Proje",
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={howToSchema()} />
      <HomeHub />
    </>
  );
}
