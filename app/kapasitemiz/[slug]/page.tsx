import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ChapterDetailPage,
  generateChapterDetailMetadata,
  generateChapterDetailParams,
} from "@/components/ChapterPages";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return generateChapterDetailParams("kapasitemiz");
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return generateChapterDetailMetadata({
    chapterId: "kapasitemiz",
    panelId: slug,
  });
}

export default async function KapasiteDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const panels = generateChapterDetailParams("kapasitemiz");
  if (!panels.some((item) => item.slug === slug)) notFound();

  return <ChapterDetailPage chapterId="kapasitemiz" panelId={slug} />;
}
