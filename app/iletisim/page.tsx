import type { Metadata } from "next";
import { ContactDetails } from "@/components/ContactDetails";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { ExperienceLink, SeoPageLayout } from "@/components/SeoPageLayout";
import { Section } from "@/components/Section";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata, chapterSeo } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const seo = chapterSeo.iletisim;

export const metadata: Metadata = buildMetadata(seo);

export default function IletisimPage() {
  return (
    <SeoPageLayout>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Hakkımızda", path: "/hakkimizda" },
          { name: "İletişim", path: seo.path },
        ])}
      />

      <PageShell
        eyebrow="İLETİŞİM"
        title="Eksik halkayı konuşalım."
        description={seo.description}
      >
        <Section>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <ContactDetails prominent />
            <ContactForm />
          </div>

          <div className="mt-12 overflow-hidden rounded border border-line bg-white">
            <iframe
              title={`Takt konum — ${siteConfig.addressLabel}`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.addressLabel)}&output=embed&hl=tr`}
              className="h-64 w-full border-0 md:h-80"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <ExperienceLink chapterId="iletisim" />
        </Section>
      </PageShell>
    </SeoPageLayout>
  );
}
