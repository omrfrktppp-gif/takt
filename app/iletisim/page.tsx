import type { Metadata } from "next";
import Link from "next/link";
import { ContactDetails } from "@/components/ContactDetails";
import { ContactForm } from "@/components/ContactForm";
import { FormSuccessBanner } from "@/components/FormSuccessBanner";
import { JsonLd } from "@/components/JsonLd";
import { LazyGoogleMap } from "@/components/LazyGoogleMap";
import { LeadMagnetPromo } from "@/components/LeadMagnetPromo";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { SeoPageLayout } from "@/components/SeoPageLayout";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata, chapterSeo } from "@/lib/seo";
import { appointmentCta, siteConfig } from "@/lib/site";

const seo = chapterSeo.iletisim;

export const metadata: Metadata = buildMetadata(seo);

export default async function IletisimPage({
  searchParams,
}: {
  searchParams: Promise<{ gonderildi?: string }>;
}) {
  const { gonderildi } = await searchParams;
  const successMessage = gonderildi
    ? "Aldık. En kısa sürede dönüş yapacağız."
    : null;

  return (
    <SeoPageLayout>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "İletişim", path: seo.path },
        ])}
      />

      <PageShell
        eyebrow="İLETİŞİM"
        title="İletişim"
        description="Projenizdeki eksik halkayı konuşalım. Ankara İvedik OSB merkezimizden, proje bazlı olarak da uzaktan çalışıyoruz."
        breadcrumbs={[
          { label: "Ana Sayfa", href: "/" },
          { label: "İletişim" },
        ]}
      >
        <Section>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-8">
              <ContactDetails prominent />

              <div>
                <Link
                  href={appointmentCta.href}
                  className="inline-flex min-h-11 items-center rounded-sm bg-ink px-5 py-3 text-body text-paper transition-colors hover:bg-signal"
                >
                  {appointmentCta.label} →
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded border border-line">
              <LazyGoogleMap
                src={siteConfig.mapsEmbedUrl}
                title="Takt — Ankara İvedik OSB konum"
                className="h-full min-h-[280px] w-full border-0 sm:min-h-[320px]"
              />
            </div>
          </div>

          <div className="interactive-card mt-12 md:mt-14">
            <h2 className="font-display text-h3 text-ink">Mesaj gönderin</h2>
            <p className="mt-2 text-body text-steel">
              Formu doldurun; en kısa sürede dönüş yapalım.
            </p>
            {successMessage ? (
              <div className="mt-6">
                <FormSuccessBanner message={successMessage} />
              </div>
            ) : null}
            <div className={successMessage ? "mt-4" : "mt-6"}>
              <ContactForm compact />
            </div>
          </div>

          <div className="mt-10">
            <LeadMagnetPromo />
          </div>
        </Section>
      </PageShell>
    </SeoPageLayout>
  );
}
