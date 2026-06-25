import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { SeoPageLayout } from "@/components/SeoPageLayout";
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
      >
        <Section>
          <div className="grid gap-8 md:grid-cols-2">
            {panels.map((panel) => (
              <div key={panel.id} className="max-w-xl">
                <h2 className="font-display text-h3 text-ink">
                  {panel.title ?? chapter.label}
                </h2>
                <p className="mt-3 text-body text-steel">{panel.body}</p>
              </div>
            ))}
          </div>
        </Section>
      </PageShell>
    </SeoPageLayout>
  );
}
