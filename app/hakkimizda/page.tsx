import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { SeoPageLayout } from "@/components/SeoPageLayout";
import { getChapter, getChapterPanels } from "@/lib/pages";
import { breadcrumbSchema, personSchema } from "@/lib/schema";
import { buildMetadata, chapterSeo } from "@/lib/seo";
import { teamMembers } from "@/lib/team";

const seo = chapterSeo.hakkimizda;

export const metadata: Metadata = buildMetadata(seo);

export default function HakkimizdaPage() {
  const chapter = getChapter("hakkimizda");
  const panels = getChapterPanels("hakkimizda");
  if (!chapter) return null;

  const dataController = teamMembers.find((member) => member.isDataController);

  return (
    <SeoPageLayout>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Ana Sayfa", path: "/" },
            { name: chapter.label, path: seo.path },
          ]),
          ...teamMembers.map(personSchema),
        ]}
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

          {teamMembers.length > 0 && (
            <div className="mt-12 max-w-3xl rounded border border-line bg-white p-6 md:p-8">
              <h2 className="font-display text-h3 text-ink">Ekip</h2>
              <p className="mt-4 text-body text-steel">
                Takt, mühendislik danışmanlığı ve proje koordinasyonu odaklı küçük
                bir ekiptir.
                {dataController && (
                  <>
                    {" "}
                    Kişisel verilerin korunması kapsamında veri sorumlusu{" "}
                    <strong className="font-medium text-ink">
                      {dataController.name}
                    </strong>
                    &apos;tur.
                  </>
                )}
              </p>
              <dl className="mt-6 space-y-4 text-body">
                {teamMembers.map((member) => (
                  <div key={member.id}>
                    <dt className="font-medium text-ink">{member.name}</dt>
                    <dd className="mt-1 text-steel">
                      {member.role}. {member.bio}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </Section>
      </PageShell>
    </SeoPageLayout>
  );
}
