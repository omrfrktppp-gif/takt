import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { ExperienceLink, SeoPageLayout } from "@/components/SeoPageLayout";
import { Section } from "@/components/Section";
import { getChapter } from "@/lib/pages";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata, chapterSeo } from "@/lib/seo";

const seo = chapterSeo.hakkimizda;

export const metadata: Metadata = buildMetadata(seo);

export default function HakkimizdaPage() {
  const chapter = getChapter("hakkimizda");
  const intro = chapter?.panels[0]?.body ?? "";

  return (
    <SeoPageLayout>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Hakkımızda", path: seo.path },
          ]),
        ]}
      />

      <PageShell
        eyebrow={chapter?.eyebrow ?? "HAKKIMIZDA"}
        title="Hakkımızda"
        description={seo.description}
      >
        <Section>
          <div className="max-w-3xl space-y-6 text-body text-steel">
            <p>{intro}</p>
            <p>
              Takt, makina imalatı ve savunma sanayisindeki firmaların teknik
              ekibine dışarıdan mühendislik gücü katan Ankara merkezli bir
              danışmanlık ekibidir. Tasarımdan üretime, Ar-Ge&apos;den proje
              yönetimine kadar eksik halkayı tamamlarız.
            </p>
          </div>
          <ExperienceLink chapterId="hakkimizda" />
        </Section>

        <Section variant="white" id="sss">
          <h2 className="font-display text-h2 text-ink">Sık sorulan sorular</h2>
          <p className="mt-4 max-w-2xl text-body text-steel">
            Mühendislik danışmanlığı, hizmet kapsamı ve çalışma modelimiz hakkında
            kısa yanıtlar.{" "}
            <Link
              href="/sss"
              className="text-ink underline decoration-signal underline-offset-4 hover:text-signal"
            >
              Tüm SSS →
            </Link>
          </p>
          <div className="mt-8">
            <FaqList />
          </div>
        </Section>
      </PageShell>
    </SeoPageLayout>
  );
}
