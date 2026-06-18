import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { buildMetadata, chapterSeo } from "@/lib/seo";

const seo = chapterSeo.hakkimizda;

export const metadata: Metadata = buildMetadata(seo);

export default function HakkimizdaPage() {
  redirect("/?b=hakkimizda");
}
