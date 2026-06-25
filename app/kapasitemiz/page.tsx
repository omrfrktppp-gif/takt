import type { Metadata } from "next";
import {
  ChapterListingPage,
  generateChapterListingMetadata,
} from "@/components/ChapterPages";

export const metadata: Metadata = generateChapterListingMetadata("kapasitemiz");

export default function KapasitemizPage() {
  return <ChapterListingPage chapterId="kapasitemiz" />;
}
