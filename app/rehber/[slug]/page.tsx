import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { PillarPageBody } from "@/components/PillarPageBody";
import { Section } from "@/components/Section";
import { SeoPageLayout } from "@/components/SeoPageLayout";
import {
  getAllPillarSlugs,
  getPillarBySlug,
} from "@/lib/pillars";
import { breadcrumbSchema, pillarArticleSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPillarSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pillar = getPillarBySlug(slug);
  if (!pillar) return {};

  return buildMetadata({
    title: pillar.title,
    description: pillar.description,
    path: `/rehber/${pillar.slug}`,
  });
}

export default async function PillarPage({ params }: PageProps) {
  const { slug } = await params;
  const pillar = getPillarBySlug(slug);
  if (!pillar) notFound();

  const path = `/rehber/${pillar.slug}`;

  return (
    <SeoPageLayout>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Ana Sayfa", path: "/" },
            { name: "Rehberler", path: "/rehber" },
            { name: pillar.title, path },
          ]),
          pillarArticleSchema(pillar),
        ]}
      />

      <PageShell
        eyebrow="REHBER"
        title={pillar.title}
        description={pillar.description}
      >
        <Section>
          <PillarPageBody pillar={pillar} />

          <p className="mt-12">
            <Link
              href="/rehber"
              className="text-body text-ink underline decoration-signal underline-offset-4 hover:text-signal"
            >
              ← Tüm rehberler
            </Link>
          </p>
        </Section>
      </PageShell>
    </SeoPageLayout>
  );
}
