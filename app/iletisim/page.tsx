import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { buildMetadata, chapterSeo } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(chapterSeo.iletisim);

export default function IletisimPage() {
  redirect("/?b=iletisim");
}
