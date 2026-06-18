import type { Metadata } from "next";
import { AppointmentBooking } from "@/components/AppointmentBooking";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { ExperienceLink, SeoPageLayout } from "@/components/SeoPageLayout";
import { Section } from "@/components/Section";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata, chapterSeo } from "@/lib/seo";

const seo = chapterSeo["gorusme-planla"];

export const metadata: Metadata = buildMetadata(seo);

export default function GorusmePlanlaPage() {
  return (
    <SeoPageLayout>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Hakkımızda", path: "/hakkimizda" },
          { name: "Görüşme planla", path: seo.path },
        ])}
      />

      <PageShell
        eyebrow="RANDEVU"
        title="Görüşme planla"
        description={seo.description}
      >
        <Section>
          <AppointmentBooking />
          <ExperienceLink chapterId="gorusme-planla" />
        </Section>
      </PageShell>
    </SeoPageLayout>
  );
}
