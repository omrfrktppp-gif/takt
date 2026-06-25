import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { SeoPageLayout } from "@/components/SeoPageLayout";
import { getChapter, getChapterPanels } from "@/lib/pages";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata, chapterSeo } from "@/lib/seo";

const seo = chapterSeo.hakkimizda;

export const metadata: Metadata = buildMetadata(seo);

export default function HakkimizdaPage() {
  const chapter = getChapter("hakkimizda");
  const panels = getChapterPanels("hakkimizda");
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
      >
        <Section>
          <div className="max-w-3xl space-y-6 text-body text-steel">
            {panels.map((panel) => (
              <p key={panel.id}>{panel.body}</p>
            ))}
          </div>
        </Section>
      </PageShell>
    </SeoPageLayout>
  );
}
