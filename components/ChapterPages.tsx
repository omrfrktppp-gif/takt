import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { ServiceDetailBody } from "@/components/ServiceDetailBody";
import { PanelCard, SeoPageLayout } from "@/components/SeoPageLayout";
import { Section } from "@/components/Section";
import {
  experienceChapterPath,
  experiencePanelPath,
  getChapter,
  getChapterPanels,
  panelPath,
} from "@/lib/pages";
import { buildMetadata, chapterSeo, panelSeo } from "@/lib/seo";
import { getHizmetSeoContent, getKapasiteSeoContent } from "@/lib/seo-content";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { appointmentCta } from "@/lib/site";
import type { DetailChapterId } from "@/lib/pages";

type ChapterListingPageProps = {
  chapterId: DetailChapterId;
};

export function generateChapterListingMetadata(chapterId: DetailChapterId) {
  const seo = chapterSeo[chapterId];
  return buildMetadata(seo);
}

export function ChapterListingPage({ chapterId }: ChapterListingPageProps) {
  const chapter = getChapter(chapterId);
  const seo = chapterSeo[chapterId];
  const panels = getChapterPanels(chapterId);

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
          <div className="grid gap-6 md:grid-cols-2">
            {panels.map((panel) => (
              <PanelCard
                key={panel.id}
                href={experiencePanelPath(chapterId, panel.id)}
                title={panel.title ?? chapter.label}
                excerpt={panel.body}
              />
            ))}
          </div>
        </Section>
      </PageShell>
    </SeoPageLayout>
  );
}

type ChapterDetailPageProps = {
  chapterId: DetailChapterId;
  panelId: string;
};

export function generateChapterDetailMetadata({
  chapterId,
  panelId,
}: ChapterDetailPageProps) {
  const chapter = getChapter(chapterId);
  const panel = chapter?.panels.find((item) => item.id === panelId);
  if (!chapter || !panel) return {};
  const path = panelPath(chapterId, panelId);
  return buildMetadata(panelSeo(chapter.label, panel, path));
}

export function ChapterDetailPage({
  chapterId,
  panelId,
}: ChapterDetailPageProps) {
  const chapter = getChapter(chapterId);
  const panel = chapter?.panels.find((item) => item.id === panelId);
  if (!chapter || !panel) return null;

  const path = panelPath(chapterId, panelId);
  const title = panel.title ?? chapter.label;
  const parentSeo = chapterSeo[chapterId];
  const seoContent =
    chapterId === "hizmetler"
      ? getHizmetSeoContent(panelId)
      : getKapasiteSeoContent(panelId);
  const serviceDescription = seoContent?.summary ?? panel.body;

  return (
    <SeoPageLayout>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Ana Sayfa", path: "/" },
            { name: chapter.label, path: parentSeo.path },
            { name: title, path },
          ]),
          serviceSchema({
            name: title,
            description: serviceDescription,
            path,
          }),
        ]}
      />

      <PageShell
        eyebrow={chapter.eyebrow}
        title={title}
        description={seoContent?.summary ?? panel.body}
      >
        <Section>
          {seoContent ? (
            <ServiceDetailBody content={seoContent} />
          ) : (
            <div className="max-w-3xl space-y-6 text-body text-steel">
              <p>{panel.body}</p>
            </div>
          )}

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={experienceChapterPath(chapterId)}
              className="text-body text-ink underline decoration-signal underline-offset-4 hover:text-signal"
            >
              ← {chapter.label}
            </Link>
            <Link
              href={appointmentCta.href}
              className="text-body text-ink underline decoration-signal underline-offset-4 hover:text-signal"
            >
              {appointmentCta.label} →
            </Link>
          </div>
        </Section>
      </PageShell>
    </SeoPageLayout>
  );
}

export function generateChapterDetailParams(chapterId: DetailChapterId) {
  return getChapterPanels(chapterId).map((panel) => ({ slug: panel.id }));
}
