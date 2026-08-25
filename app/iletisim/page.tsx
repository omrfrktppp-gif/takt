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
                  className="inline-flex min-h-11 items-center rounded-sm bg-deep px-5 py-3 text-body text-ink transition-colors hover:bg-signal hover:text-signal-ink"
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
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] lg:gap-10">
              <div>
                <h2 className="font-display text-h3 text-ink">Mesaj gönderin</h2>
                <p className="mt-2 text-body text-steel">
                  Konuyu birkaç cümleyle tarif edin; ilk görüşmeye daha hazırlıklı
                  başlayalım.
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

              <aside
                aria-labelledby="useful-inputs-title"
                className="border-t border-line pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
              >
                <p className="font-mono text-eyebrow uppercase tracking-[0.08em] text-signal-text">
                  İlk değerlendirme
                </p>
                <h3
                  id="useful-inputs-title"
                  className="mt-2 font-display text-h3 text-ink"
                >
                  Elinizde ne varsa belirtin
                </h3>
                <p className="mt-3 text-body text-steel">
                  Hepsinin hazır olması gerekmez. İlk mesajda mevcut olanları
                  belirtmeniz, konuyu daha hızlı çerçevelememize yardımcı olur.
                </p>
                <ul className="mt-5 divide-y divide-line border-y border-line">
                  {[
                    ["01", "Teknik çizim", "Ölçüler, CAD bilgisi veya eskiz"],
                    ["02", "Şartname", "Kritik gereksinimler ve kısıtlar"],
                    ["03", "Fotoğraflar", "Mevcut parça, makina veya saha"],
                    ["04", "Mevcut hesaplar", "Test verisi, rapor veya hesap föyü"],
                  ].map(([index, title, description]) => (
                    <li key={index} className="grid grid-cols-[2rem_1fr] gap-3 py-3">
                      <span
                        aria-hidden="true"
                        className="font-mono text-small text-signal-text"
                      >
                        {index}
                      </span>
                      <span>
                        <strong className="block font-medium text-ink">{title}</strong>
                        <span className="mt-0.5 block text-small text-steel">
                          {description}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 font-mono text-small text-steel">
                  Dosyaları bu formda yüklemeniz gerekmez; mevcut olduklarını
                  belirtmeniz yeterlidir.
                </p>
              </aside>
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
