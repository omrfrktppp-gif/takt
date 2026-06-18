import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { ExperienceLink, SeoPageLayout } from "@/components/SeoPageLayout";
import { Section } from "@/components/Section";
import { getChapter, getChapterPanels } from "@/lib/pages";
import { breadcrumbSchema } from "@/lib/schema";
import { processSteps } from "@/lib/site";
import { buildMetadata, chapterSeo } from "@/lib/seo";

const seo = chapterSeo.yaklasim;

export const metadata: Metadata = buildMetadata(seo);

export default function YaklasimPage() {
  const chapter = getChapter("yaklasim");
  const panels = getChapterPanels("yaklasim");

  return (
    <SeoPageLayout>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Hakkımızda", path: "/hakkimizda" },
          { name: chapter?.label ?? "Yaklaşım", path: seo.path },
        ])}
      />

      <PageShell
        eyebrow={chapter?.eyebrow ?? "YAKLAŞIMIMIZ"}
        title="Yaklaşımımız"
        description={seo.description}
      >
        <Section>
          <div className="max-w-3xl space-y-10">
            {panels.map((panel) => (
              <section key={panel.id}>
                {panel.title ? (
                  <h2 className="font-display text-h3 text-ink">{panel.title}</h2>
                ) : null}
                <p
                  className={
                    panel.title ? "mt-4 text-body text-steel" : "text-body text-steel"
                  }
                >
                  {panel.body}
                </p>
              </section>
            ))}
          </div>
          <ExperienceLink chapterId="yaklasim" />
        </Section>

        <Section variant="white">
          <h2 className="font-display text-h2 text-ink">
            Takt ile bir proje nasıl yürür?
          </h2>
          <p className="mt-4 max-w-2xl text-body text-steel">
            İhtiyacı netleştirir, kapsamı yazılı koyar, belirlenen tempoda yürütür
            ve devredilebilir çıktıyla kapatırız.
          </p>
          <ol className="mt-8 max-w-3xl space-y-6">
            {processSteps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="font-mono text-eyebrow text-signal">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-h3 text-ink">{step.title}</h3>
                  <p className="mt-2 text-body text-steel">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>
      </PageShell>
    </SeoPageLayout>
  );
}
