import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { ContentCard, ListingGrid, SeoPageLayout } from "@/components/SeoPageLayout";
import { Section } from "@/components/Section";
import { getChapter, getChapterPanels } from "@/lib/pages";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata, chapterSeo } from "@/lib/seo";

const seo = chapterSeo.yaklasim;

export const metadata: Metadata = buildMetadata(seo);

export default function YaklasimPage() {
  const chapter = getChapter("yaklasim");
  const panels = getChapterPanels("yaklasim");
  if (!chapter) return null;

  return (
    <SeoPageLayout>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: chapter.label, path: seo.path },
        ])}
      />

      <PageShell
        eyebrow={chapter.eyebrow}
        title={chapter.label}
        description={seo.description}
        breadcrumbs={[
          { label: "Ana Sayfa", href: "/" },
          { label: chapter.label },
        ]}
      >
        <Section>
          <ListingGrid>
            {panels.map((panel) => (
              <ContentCard
                key={panel.id}
                title={panel.title ?? chapter.label}
              >
                <p className="text-body leading-relaxed text-steel">
                  {panel.body}
                </p>
              </ContentCard>
            ))}
          </ListingGrid>
        </Section>
      </PageShell>
    </SeoPageLayout>
  );
}
