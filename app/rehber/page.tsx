import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { ListingGrid, PanelCard, SeoPageLayout } from "@/components/SeoPageLayout";
import { Section } from "@/components/Section";
import { pillars } from "@/lib/pillars";
import { breadcrumbSchema, collectionPageSchema } from "@/lib/schema";
import { buildMetadata, rehberSeo } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(rehberSeo);

export default function RehberHubPage() {
  return (
    <SeoPageLayout>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Ana Sayfa", path: "/" },
            { name: rehberSeo.title, path: rehberSeo.path },
          ]),
          collectionPageSchema(rehberSeo),
        ]}
      />

      <PageShell
        eyebrow="REHBERLER"
        title="Teknik rehberler"
        description="Tersine mühendislik, mühendislik analizi, yalın üretim ve destek programları üzerine kapsamlı rehberler — ilgili blog yazıları ve hizmetlerle bağlantılı."
        breadcrumbs={[
          { label: "Ana Sayfa", href: "/" },
          { label: rehberSeo.title },
        ]}
      >
        <Section>
          <p className="mb-8 max-w-2xl text-body text-steel">
            {pillars.length} rehber kümesi — konuya göre derinlemesine içerik ve
            ilgili hizmet bağlantıları.
          </p>
          <ListingGrid>
            {pillars.map((pillar) => (
              <PanelCard
                key={pillar.id}
                href={`/rehber/${pillar.slug}`}
                title={pillar.title}
                excerpt={pillar.summary}
              />
            ))}
          </ListingGrid>

          <p className="mt-10 text-body text-steel">
            Konu başlıklarını blog yazılarında da{" "}
            <Link
              href="/blog"
              className="touch-target-inline text-ink underline decoration-signal underline-offset-4 transition-colors hover:text-signal"
            >
              ayrıntılı inceliyoruz
            </Link>
            .
          </p>
        </Section>
      </PageShell>
    </SeoPageLayout>
  );
}
