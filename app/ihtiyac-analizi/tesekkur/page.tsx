import type { Metadata } from "next";
import { ThankYouPanel } from "@/components/ihtiyac-analizi/ThankYouPanel";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { SeoPageLayout } from "@/components/SeoPageLayout";

export const metadata: Metadata = {
  title: "Talebiniz alındı — Takt",
  robots: { index: false, follow: false },
};

export default function IhtiyacAnaliziTesekkurPage() {
  return (
    <SeoPageLayout>
      <PageShell
        eyebrow="İHTİYAÇ ANALİZİ"
        title="Talebiniz alındı"
        breadcrumbs={[
          { label: "Ana Sayfa", href: "/" },
          { label: "İhtiyaç analizi", href: "/ihtiyac-analizi" },
          { label: "Teşekkürler" },
        ]}
      >
        <Section narrow className="!py-10 md:!py-14">
          <ThankYouPanel mode="iletisim" />
        </Section>
      </PageShell>
    </SeoPageLayout>
  );
}
