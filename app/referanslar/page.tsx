import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { ExperienceLink, SeoPageLayout } from "@/components/SeoPageLayout";
import { Section } from "@/components/Section";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata, chapterSeo } from "@/lib/seo";

const seo = chapterSeo.referanslar;

export const metadata: Metadata = buildMetadata(seo);

export default function ReferanslarPage() {
  return (
    <SeoPageLayout>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Hakkımızda", path: "/hakkimizda" },
          { name: "Referanslar", path: seo.path },
        ])}
      />

      <PageShell
        eyebrow="REFERANSLAR"
        title="Referanslar"
        description={seo.description}
      >
        <Section>
          <div className="max-w-2xl rounded border border-dashed border-line bg-white p-8">
            <p className="font-display text-h3 text-ink">Yakında</p>
            <p className="mt-4 text-body text-steel">
              Proje referanslarımız ve vaka çalışmaları hazırlanıyor. Gizlilik
              gerektiren işlerde detay paylaşımı müşteri onayına tabidir.
            </p>
            <p className="mt-6 text-body text-steel">
              Bu arada hizmetlerimizi{" "}
              <Link
                href="/hizmetler"
                className="text-ink underline decoration-signal underline-offset-4 hover:text-signal"
              >
                hizmetler
              </Link>{" "}
              sayfasından inceleyebilir veya{" "}
              <Link
                href="/gorusme-planla"
                className="text-ink underline decoration-signal underline-offset-4 hover:text-signal"
              >
                görüşme planlayabilirsiniz
              </Link>
              .
            </p>
          </div>
          <ExperienceLink chapterId="hakkimizda" label="Ana sayfaya dön" />
        </Section>
      </PageShell>
    </SeoPageLayout>
  );
}
