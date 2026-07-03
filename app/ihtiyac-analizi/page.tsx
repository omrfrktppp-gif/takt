import type { Metadata } from "next";
import { IhtiyacAnaliziWizard } from "@/components/ihtiyac-analizi/IhtiyacAnaliziWizard";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
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

      <PageShell
        eyebrow="İHTİYAÇ ANALİZİ"
        title="Projenizi 2 dakikada tanımlayın"
        description="Kısa sorularla ihtiyacınızı netleştirin; size uygun hizmeti ve sonraki adımı birlikte belirleyelim."
      >
        <Section>
          <IhtiyacAnaliziWizard />
        </Section>
      </PageShell>
    </SeoPageLayout>
  );
}
