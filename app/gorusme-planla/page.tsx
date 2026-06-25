import type { Metadata } from "next";
import Link from "next/link";
import { AppointmentBooking } from "@/components/AppointmentBooking";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { SeoPageLayout } from "@/components/SeoPageLayout";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata, chapterSeo } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const seo = chapterSeo["gorusme-planla"];

export const metadata: Metadata = buildMetadata(seo);

export default function GorusmePlanlaPage() {
  return (
    <SeoPageLayout>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Görüşme Planla", path: seo.path },
        ])}
      />

      <PageShell
        eyebrow="RANDEVU"
        title="Görüşme planla"
        description="İhtiyacınıza uygun randevu türünü seçin. Takvim Türkiye saati ve Türkçe olarak gösterilir."
      >
        <Section>
          <AppointmentBooking />

          <p className="mt-8 text-body text-steel">
            Randevu öncesi kısa bir özet paylaşmak isterseniz{" "}
            <Link
              href="/iletisim"
              className="text-ink underline decoration-signal underline-offset-4 hover:text-signal"
            >
              iletişim formu
            </Link>{" "}
            veya{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-ink underline decoration-signal underline-offset-4 hover:text-signal"
            >
              {siteConfig.email}
            </a>{" "}
            üzerinden de yazabilirsiniz.
          </p>
        </Section>
      </PageShell>
    </SeoPageLayout>
  );
}
