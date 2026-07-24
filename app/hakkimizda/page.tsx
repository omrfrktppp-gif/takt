import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { SeoPageLayout } from "@/components/SeoPageLayout";
import { getChapter, getChapterPanels } from "@/lib/pages";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata, chapterSeo } from "@/lib/seo";
import { teamMembers } from "@/lib/team";

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

          <div className="mt-12 max-w-3xl border-l-2 border-signal bg-white p-6 md:p-8">
            <p className="font-mono text-eyebrow uppercase tracking-[0.08em] text-signal">
              Sorumlu kişi
            </p>
            {teamMembers.map((member) => (
              <div key={member.id} className="mt-4">
                <h2 className="font-display text-h3 text-ink">{member.name}</h2>
                <p className="mt-1 font-mono text-small text-steel">
                  {member.role}
                </p>
                <p className="mt-4 text-body text-steel">{member.bio}</p>
              </div>
            ))}
          </div>
        </Section>
      </PageShell>
    </SeoPageLayout>
  );
}
