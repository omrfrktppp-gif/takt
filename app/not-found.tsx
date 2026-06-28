import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { SeoPageLayout } from "@/components/SeoPageLayout";

export const metadata: Metadata = {
  title: "Sayfa bulunamadı",
  description: "Aradığınız sayfa bulunamadı.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <SeoPageLayout>
      <PageShell
        eyebrow="404"
        title="Sayfa bulunamadı"
        description="Aradığınız adres taşınmış, kaldırılmış veya hiç var olmamış olabilir."
      >
        <Section>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button href="/">Ana sayfa</Button>
            <Button href="/iletisim" variant="secondary">
              İletişim
            </Button>
            <Button href="/blog" variant="secondary">
              Blog
            </Button>
          </div>
          <p className="mt-8 max-w-xl text-body text-steel">
            Yardıma mı ihtiyacınız var?{" "}
            <Link
              href="/sss"
              className="text-ink underline decoration-signal underline-offset-4 hover:text-signal"
            >
              Sık sorulan sorular
            </Link>{" "}
            bölümüne göz atabilir veya{" "}
            <Link
              href="/gorusme-planla"
              className="text-ink underline decoration-signal underline-offset-4 hover:text-signal"
            >
              görüşme planlayabilirsiniz
            </Link>
            .
          </p>
        </Section>
      </PageShell>
    </SeoPageLayout>
  );
}
