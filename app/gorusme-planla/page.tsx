import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { buildMetadata, chapterSeo } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(chapterSeo["gorusme-planla"]);

export default function GorusmePlanlaPage() {
  redirect("/?b=gorusme-planla");
}
