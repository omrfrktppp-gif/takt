import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import {
  ContentCard,
  ListingGrid,
  SeoPageLayout,
} from "@/components/SeoPageLayout";
import { Section } from "@/components/Section";
import { getPostBySlug } from "@/lib/blog";
import {
  caseStudyRecords,
  caseStudyRecordSchema,
} from "@/lib/case-study-records";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata, chapterSeo } from "@/lib/seo";
import { appointmentCta } from "@/lib/site";

const seo = chapterSeo.referanslar;

const customerReferences = [
  {
    name: "Alpagu Savunma",
    logo: "/referanslar/alpagu-savunma.webp",
    width: 704,
    height: 720,
    imageClassName: "max-h-44 md:max-h-52",
  },
  {
    name: "EGC Teknoloji",
    logo: "/referanslar/egc-teknoloji.webp",
    width: 900,
    height: 385,
    imageClassName: "max-h-28 md:max-h-32",
  },
  {
    name: "Zera Technology & Innovation",
    logo: "/referanslar/zera-technology.webp",
    width: 500,
    height: 500,
    imageClassName: "max-h-40 md:max-h-48",
  },
] as const;

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
  const studies = caseStudyRecords.map((study) => ({
    ...study,
    relatedBlogExists: Boolean(getPostBySlug(study.relatedBlogSlug)),
  }));

  return (
    <SeoPageLayout>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Ana Sayfa", path: "/" },
            { name: "Referanslar", path: seo.path },
          ]),
          ...studies.map((study) =>
            caseStudyRecordSchema(study, study.relatedBlogExists),
          ),
        ]}
      />

      <PageShell
        eyebrow="REFERANSLAR"
        title="Birlikte üretiyor, sonuçlandırıyor, ilerliyoruz."
        description="Müşteri referanslarımızı ve proje deneyimimizi bir arada görün."
        breadcrumbs={[
          { label: "Ana Sayfa", href: "/" },
          { label: "Referanslar" },
        ]}
      >
        <Section>
          <div className="grid gap-10 border-b border-line pb-12 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.7fr)] lg:items-end">
            <div className="max-w-3xl">
              <p className="font-mono text-eyebrow uppercase tracking-wide text-signal-text">
                MÜŞTERİ REFERANSLARI
              </p>
              <h2 className="mt-3 font-display text-h2 text-ink">
                Güven, teknik iş birliğiyle büyür.
              </h2>
              <p className="mt-4 max-w-2xl text-body leading-relaxed text-steel">
                Mühendislik, teknoloji ve savunma projelerinde birlikte
                çalıştığımız firmalar.
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-line bg-line">
              <div className="bg-white p-5 md:p-6">
                <dt className="font-mono text-small uppercase tracking-wide text-steel">
                  Tamamlanan projeler
                </dt>
                <dd className="mt-2 font-display text-h1 text-ink">11</dd>
              </div>
              <div className="bg-white p-5 md:p-6">
                <dt className="font-mono text-small uppercase tracking-wide text-steel">
                  Aktif projeler
                </dt>
                <dd className="mt-2 font-display text-h1 text-signal-text">2+</dd>
              </div>
            </dl>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-3">
            {customerReferences.map((customer) => (
              <figure
                key={customer.name}
                className="flex min-h-72 flex-col bg-white p-6 md:min-h-80 md:p-8"
              >
                <div className="flex flex-1 items-center justify-center py-4">
                  <div className="flex min-h-44 w-full items-center justify-center rounded-sm bg-[#F4F6F4] p-5 shadow-[inset_0_0_0_1px_rgba(18,22,28,0.08)]">
                  <Image
                    src={customer.logo}
                    width={customer.width}
                    height={customer.height}
                    sizes="(max-width: 767px) 70vw, 28vw"
                    alt={`${customer.name} logosu`}
                    className={`h-auto w-auto max-w-full object-contain ${customer.imageClassName}`}
                  />
                  </div>
                </div>
                <figcaption className="border-t border-line pt-4 text-center font-mono text-small uppercase tracking-wide text-steel">
                  {customer.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>

        <Section variant="white">
          <div className="max-w-3xl">
            <p className="font-mono text-eyebrow uppercase tracking-wide text-signal-text">
              TEKNİK VAKALAR
            </p>
            <h2 className="mt-3 font-display text-h2 text-ink">
              Problemi, kararı ve teslimi birlikte görün.
            </h2>
            <p className="mt-4 text-body leading-relaxed text-steel">
              Yayımlanmış teknik vaka kayıtlarımız; darboğazı, proje kapsamını ve
              teslim edilen mühendislik çıktısını izlenebilir bir düzende gösterir.
            </p>
          </div>

          <div className="mt-12 space-y-6">
            {studies.map((study, index) => (
              <article
                key={study.id}
                id={study.id}
                className="interactive-card overflow-hidden p-0"
              >
                <header className="grid gap-5 border-b border-line p-6 md:grid-cols-[5rem_minmax(0,1fr)] md:p-8">
                  <p
                    aria-hidden="true"
                    className="font-mono text-h3 text-signal-text"
                  >
                    {(index + 1).toString().padStart(2, "0")}
                  </p>
                  <div>
                    <p className="font-mono text-eyebrow uppercase tracking-wide text-steel">
                      {study.sector}
                    </p>
                    <h2 className="mt-2 max-w-3xl font-display text-h2 text-ink">
                      {study.title}
                    </h2>
                  </div>
                </header>

                <div className="grid gap-px bg-line lg:grid-cols-3">
                  <div className="bg-white p-6 md:p-8">
                    <p className="font-mono text-small uppercase tracking-wide text-signal-text">
                      01 · Problem
                    </p>
                    <p className="mt-4 text-body leading-relaxed text-steel">
                      {study.problem}
                    </p>
                  </div>
                  <div className="bg-white p-6 md:p-8">
                    <p className="font-mono text-small uppercase tracking-wide text-signal-text">
                      02 · Kapsam
                    </p>
                    <p className="mt-4 text-body leading-relaxed text-steel">
                      {study.scope}
                    </p>
                    <ul className="mt-5 space-y-3 text-body text-ink">
                      {study.constraints.map((constraint) => (
                        <li
                          key={constraint}
                          className="grid grid-cols-[0.75rem_1fr] gap-2"
                        >
                          <span aria-hidden="true" className="text-signal-text">
                            —
                          </span>
                          <span>{constraint}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white p-6 md:p-8">
                    <p className="font-mono text-small uppercase tracking-wide text-signal-text">
                      03 · Teslim
                    </p>
                    <ul className="mt-4 space-y-3 text-body text-ink">
                      {study.deliverables.map((deliverable) => (
                        <li
                          key={deliverable}
                          className="grid grid-cols-[0.75rem_1fr] gap-2"
                        >
                          <span aria-hidden="true" className="text-signal-text">
                            +
                          </span>
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-paper p-6 md:p-8">
                  <p className="font-mono text-small uppercase tracking-wide text-steel">
                    Yayımlanmış dayanak
                  </p>
                  <dl className="mt-5 grid gap-5 md:grid-cols-2">
                    {study.evidence.map((evidence) => (
                      <div
                        key={evidence.label}
                        className="border-l-2 border-signal pl-4"
                      >
                        <dt className="font-medium text-ink">
                          {evidence.label}
                        </dt>
                        <dd className="mt-2 text-body leading-relaxed text-steel">
                          {evidence.detail}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  {study.relatedBlogExists ? (
                    <Link
                      href={`/blog/${study.relatedBlogSlug}`}
                      className="touch-target-inline mt-6 text-body text-ink underline decoration-signal underline-offset-4 transition-colors hover:text-signal-text"
                    >
                      Teknik vakanın tamamını okuyun →
                    </Link>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section>
          <div className="max-w-3xl">
            <p className="font-mono text-eyebrow uppercase tracking-wide text-signal-text">
              ÇALIŞMA ALANLARI
            </p>
            <h2 className="mt-3 font-display text-h2 text-ink">
              Benzer problemlerde üstlendiğimiz teknik roller
            </h2>
            <p className="mt-4 text-body leading-relaxed text-steel">
              Projenizin yukarıdaki vakalarla birebir aynı olması gerekmez.
              Aşağıdaki alanlar, probleme hangi teknik kapasiteyle yaklaşacağımızı
              gösterir.
            </p>
          </div>

          <ListingGrid className="mt-12">
            {workAreas.map((area) => (
              <ContentCard key={area.title} title={area.title}>
                <p className="text-body text-steel">{area.body}</p>
                <Link
                  href={area.href}
                  className="touch-target-inline mt-2 text-body text-ink underline decoration-signal underline-offset-4 transition-colors hover:text-signal-text"
                >
                  İlgili hizmet →
                </Link>
              </ContentCard>
            ))}
          </ListingGrid>

          <p className="mt-12 text-body text-steel">
            Projenizi konuşmak için{" "}
            <Link
              href={appointmentCta.href}
              className="touch-target-inline text-ink underline decoration-signal underline-offset-4 transition-colors hover:text-signal-text"
            >
              görüşme planlayabilir
            </Link>{" "}
            veya{" "}
            <Link
              href="/iletisim"
              className="touch-target-inline text-ink underline decoration-signal underline-offset-4 transition-colors hover:text-signal-text"
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
