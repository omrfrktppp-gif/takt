import type { Metadata } from "next";
import {
  ChapterListingPage,
  generateChapterListingMetadata,
} from "@/components/ChapterPages";

export const metadata: Metadata = generateChapterListingMetadata("hizmetler");

export default function HizmetlerPage() {
  return <ChapterListingPage chapterId="hizmetler" />;
}
