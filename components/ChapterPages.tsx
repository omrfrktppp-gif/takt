import { JsonLd } from "@/components/JsonLd";
import { DetailPageNav, PageShell } from "@/components/PageShell";
import { ServiceDetailBody } from "@/components/ServiceDetailBody";
import {
  ListingGrid,
  PanelCard,
  SeoPageLayout,
} from "@/components/SeoPageLayout";
import { Section } from "@/components/Section";
import {
  chapterPath,
  getChapter,
  getChapterPanels,
  panelPath,
} from "@/lib/pages";
import { buildMetadata, chapterSeo, panelSeo } from "@/lib/seo";
import { getHizmetSeoContent, getKapasiteSeoContent } from "@/lib/seo-content";
import { breadcrumbSchema, faqPageSchema, serviceSchema } from "@/lib/schema";
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
        breadcrumbs={[
          { label: "Ana Sayfa", href: "/" },
          { label: chapter.label },
        ]}
      >
        <Section>
          <p className="mb-8 max-w-2xl text-body text-steel">
            {panels.length} alan — detay için bir başlık seçin.
          </p>
          <ListingGrid>
            {panels.map((panel) => (
              <PanelCard
                key={panel.id}
                href={panelPath(chapterId, panel.id)}
                title={panel.title ?? chapter.label}
                excerpt={panel.body}
              />
            ))}
          </ListingGrid>
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
          ...(seoContent && seoContent.faq.length > 0
            ? [faqPageSchema(seoContent.faq)]
            : []),
        ]}
      />

      <PageShell
        eyebrow={chapter.eyebrow}
        title={title}
        description={seoContent?.summary ?? panel.body}
        breadcrumbs={[
          { label: "Ana Sayfa", href: "/" },
          { label: chapter.label, href: parentSeo.path },
          { label: title },
        ]}
      >
        <Section>
          {seoContent ? (
            <ServiceDetailBody content={seoContent} />
          ) : (
            <div className="max-w-3xl space-y-6 text-body text-steel">
              <p>{panel.body}</p>
            </div>
          )}

          <DetailPageNav
            backHref={chapterPath(chapterId)}
            backLabel={chapter.label}
            ctaHref={appointmentCta.href}
            ctaLabel={appointmentCta.label}
          />
        </Section>
      </PageShell>
    </SeoPageLayout>
  );
}

export function generateChapterDetailParams(chapterId: DetailChapterId) {
  return getChapterPanels(chapterId).map((panel) => ({ slug: panel.id }));
}
