import type { Metadata } from "next";
import { IhtiyacAnaliziWizard } from "@/components/ihtiyac-analizi/IhtiyacAnaliziWizard";
import { Eyebrow } from "@/components/Eyebrow";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { SeoPageLayout } from "@/components/SeoPageLayout";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata, ihtiyacAnaliziSeo } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(ihtiyacAnaliziSeo);

export default function IhtiyacAnaliziPage() {
  return (
    <SeoPageLayout>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "İhtiyaç analizi", path: ihtiyacAnaliziSeo.path },
        ])}
      />

      <Section variant="white" className="pb-4 pt-20 md:pt-24">
        <Eyebrow>İHTİYAÇ ANALİZİ</Eyebrow>
        <h1 className="max-w-2xl font-display text-h2 text-ink md:text-h1">
          Projenizi 2 dakikada tanımlayın
        </h1>
      </Section>

      <Section className="!py-4 md:!py-6">
        <IhtiyacAnaliziWizard />
      </Section>
    </SeoPageLayout>
  );
}
