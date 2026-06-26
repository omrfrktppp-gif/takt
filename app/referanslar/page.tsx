import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { SeoPageLayout } from "@/components/SeoPageLayout";
import {
  caseStudies,
  caseStudySchema,
  hasCaseStudies,
} from "@/lib/case-studies";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata, chapterSeo } from "@/lib/seo";
import { appointmentCta } from "@/lib/site";

const seo = chapterSeo.referanslar;

const workAreas = [
  {
    title: "Makina imalatı",
    body: "Özel makina ve endüstriyel sistem projelerinde tasarım, analiz, imalat koordinasyonu ve seri üretime geçiş desteği veriyoruz.",
    href: "/hizmetler/tasarim-gelistirme",
  },
  {
    title: "Ar-Ge ve ürün geliştirme",
    body: "Fikirden prototipe, prototipten ürüne giden süreçlerde teknik yol haritası, dokümantasyon ve olgunluk yönetimi sağlıyoruz.",
    href: "/hizmetler/arge-urge",
  },
  {
    title: "Tersine mühendislik",
    body: "Teknik resmi olmayan veya eski parçaların 3D tarama ve modelleme ile yeniden üretilebilir hale getirilmesinde destek oluyoruz.",
    href: "/kapasitemiz/3d-tarama",
  },
  {
    title: "Proje danışmanlığı",
    body: "Üretim, tesis ve süreç projelerinde kapsam, takvim ve teknik koordinasyonu tek muhatap olarak yürütüyoruz.",
    href: "/hizmetler/proje-danismanligi",
  },
] as const;

export const metadata: Metadata = buildMetadata(seo);

export default function ReferanslarPage() {
  return (
    <SeoPageLayout>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Ana Sayfa", path: "/" },
            { name: "Referanslar", path: seo.path },
          ]),
          ...(hasCaseStudies ? caseStudies.map(caseStudySchema) : []),
        ]}
      />

      <PageShell
        eyebrow="REFERANSLAR"
        title="Referanslar"
        description={
          hasCaseStudies
            ? "Çalıştığımız proje tipleri ve seçilmiş vaka çalışmaları."
            : "Çalıştığımız proje tipleri ve çalışma alanları. İsimlendirilmiş vaka çalışmaları yakında."
        }
      >
        <Section>
          <div className="max-w-3xl space-y-6 text-body text-steel">
            <p>
              Müşteri gizliliğine saygı duyuyoruz. Aşağıda sık çalıştığımız proje
              tiplerini ve teknik alanları özetliyoruz.
            </p>
            {!hasCaseStudies && (
              <p>
                İsimlendirilmiş vaka çalışmaları ve proje özetleri yakında bu sayfada
                yer alacak.
              </p>
            )}
          </div>

          {hasCaseStudies && (
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {caseStudies.map((study) => (
                <article
                  key={study.id}
                  id={study.id}
                  className="rounded border border-line bg-white p-6"
                >
                  <p className="text-caption uppercase tracking-wide text-steel">
                    {study.sector}
                  </p>
                  <h2 className="mt-2 font-display text-h3 text-ink">
                    {study.title}
                  </h2>
                  <p className="mt-3 text-body text-steel">{study.problem}</p>
                  <p className="mt-2 text-body text-steel">{study.approach}</p>
                  {study.results.length > 0 && (
                    <ul className="mt-4 list-disc space-y-1 pl-5 text-body text-ink">
                      {study.results.map((result) => (
                        <li key={result}>{result}</li>
                      ))}
                    </ul>
                  )}
                  {(study.relatedPath ?? study.href) && (
                    <Link
                      href={study.relatedPath ?? study.href!}
                      className="mt-4 inline-block text-body text-ink underline decoration-signal underline-offset-4 hover:text-signal"
                    >
                      İlgili hizmet →
                    </Link>
                  )}
                </article>
              ))}
            </div>
          )}

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {workAreas.map((area) => (
              <article
                key={area.title}
                className="rounded border border-line bg-white p-6"
              >
                <h2 className="font-display text-h3 text-ink">{area.title}</h2>
                <p className="mt-3 text-body text-steel">{area.body}</p>
                <Link
                  href={area.href}
                  className="mt-4 inline-block text-body text-ink underline decoration-signal underline-offset-4 hover:text-signal"
                >
                  İlgili hizmet →
                </Link>
              </article>
            ))}
          </div>

          <p className="mt-12 text-body text-steel">
            Projenizi konuşmak için{" "}
            <Link
              href={appointmentCta.href}
              className="text-ink underline decoration-signal underline-offset-4 hover:text-signal"
            >
              görüşme planlayabilir
            </Link>{" "}
            veya{" "}
            <Link
              href="/iletisim"
              className="text-ink underline decoration-signal underline-offset-4 hover:text-signal"
            >
              iletişime
            </Link>{" "}
            geçebilirsiniz.
          </p>
        </Section>
      </PageShell>
    </SeoPageLayout>
  );
}
