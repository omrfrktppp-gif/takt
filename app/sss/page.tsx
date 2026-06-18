import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { SeoPageLayout } from "@/components/SeoPageLayout";
import { Section } from "@/components/Section";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { buildMetadata, chapterSeo } from "@/lib/seo";

const seo = chapterSeo.sss;

export const metadata: Metadata = buildMetadata(seo);

export default function SssPage() {
  return (
    <SeoPageLayout>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Ana Sayfa", path: "/" },
            { name: "SSS", path: seo.path },
          ]),
          faqPageSchema(),
        ]}
      />

      <PageShell
        eyebrow="SSS"
        title="Sık sorulan sorular"
        description={seo.description}
      >
        <Section>
          <p className="mb-8 max-w-2xl text-body text-steel">
            Mühendislik danışmanlığı, hizmet kapsamı ve çalışma modelimiz hakkında
            kısa yanıtlar. Daha fazla bilgi için{" "}
            <Link
              href="/?b=hakkimizda"
              className="text-ink underline decoration-signal underline-offset-4 hover:text-signal"
            >
              hakkımızda
            </Link>{" "}
            sayfasına bakabilir veya{" "}
            <Link
              href="/?b=iletisim"
              className="text-ink underline decoration-signal underline-offset-4 hover:text-signal"
            >
              iletişime
            </Link>{" "}
            geçebilirsiniz.
          </p>
          <FaqList />
        </Section>
      </PageShell>
    </SeoPageLayout>
  );
}
