import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { FormSuccessBanner } from "@/components/FormSuccessBanner";
import { JsonLd } from "@/components/JsonLd";
import { LeadMagnetPromo } from "@/components/LeadMagnetPromo";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { SeoPageLayout } from "@/components/SeoPageLayout";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata, chapterSeo } from "@/lib/seo";
import {
  appointmentCta,
  formatSiteAddressLines,
  siteConfig,
} from "@/lib/site";

const seo = chapterSeo.iletisim;
const addressLines = formatSiteAddressLines();

export const metadata: Metadata = buildMetadata(seo);

export default async function IletisimPage({
  searchParams,
}: {
  searchParams: Promise<{ gonderildi?: string; lead?: string }>;
}) {
  const { gonderildi, lead } = await searchParams;
  const successMessage = gonderildi
    ? "Aldık. En kısa sürede dönüş yapacağız."
    : lead
      ? "Teşekkürler. Talebiniz bize ulaştı."
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
      >
        <Section>
          <div className="grid gap-10 md:grid-cols-2">
            <div className="space-y-6 text-body text-steel">
              <div>
                <h2 className="font-display text-h3 text-ink">Adres</h2>
                <p className="mt-2">
                  {addressLines[0]}
                  <br />
                  {addressLines[1]}
                </p>
                <a
                  href={siteConfig.mapsUrl}
                  className="mt-2 inline-block text-ink underline decoration-signal underline-offset-4 hover:text-signal"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Google Haritalar&apos;da aç →
                </a>
              </div>

              <div>
                <h2 className="font-display text-h3 text-ink">Telefon</h2>
                <a
                  href={siteConfig.phoneHref}
                  className="mt-2 inline-block text-ink hover:text-signal"
                >
                  {siteConfig.phone}
                </a>
              </div>

              <div>
                <h2 className="font-display text-h3 text-ink">E-posta</h2>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="mt-2 inline-block text-ink hover:text-signal"
                >
                  {siteConfig.email}
                </a>
              </div>

              <div className="pt-2">
                <Link
                  href={appointmentCta.href}
                  className="inline-block rounded-sm bg-ink px-5 py-3 text-body text-paper transition-colors hover:bg-signal"
                >
                  {appointmentCta.label} →
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded border border-line">
              <iframe
                src={siteConfig.mapsEmbedUrl}
                title="Takt — Ankara İvedik OSB konum"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full min-h-[320px] w-full border-0"
              />
            </div>
          </div>

          <div className="mt-12 rounded border border-line bg-white p-6 md:p-8">
            <h2 className="font-display text-h3 text-ink">Mesaj gönderin</h2>
            <p className="mt-2 text-body text-steel">
              Formu doldurun; en kısa sürede dönüş yapalım.
            </p>
            {successMessage ? (
              <div className="mt-6">
                <FormSuccessBanner message={successMessage} />
              </div>
            ) : null}
            <div className={successMessage ? "mt-2" : "mt-6"}>
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
