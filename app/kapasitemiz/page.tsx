import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { buildMetadata, chapterSeo } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(chapterSeo.kapasitemiz);

export default function KapasitemizPage() {
  redirect("/?b=kapasitemiz");
}
