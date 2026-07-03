import type { Metadata } from "next";
import { ThankYouPanel } from "@/components/ihtiyac-analizi/ThankYouPanel";
import { SeoPageLayout } from "@/components/SeoPageLayout";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Talebiniz alındı — Takt",
  robots: { index: false, follow: false },
};

export default function IhtiyacAnaliziTesekkurPage() {
  return (
    <SeoPageLayout>
      <Section>
        <div className="mx-auto max-w-2xl py-12">
          <ThankYouPanel mode="iletisim" />
        </div>
      </Section>
    </SeoPageLayout>
  );
}
