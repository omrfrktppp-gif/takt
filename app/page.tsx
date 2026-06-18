import { HomeExperience } from "@/components/scroll/HomeExperience";

type HomePageProps = {
  searchParams: Promise<{ b?: string }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const { b } = await searchParams;
  return <HomeExperience chapter={b} />;
}
