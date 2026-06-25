import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { SeoPageLayout } from "@/components/SeoPageLayout";
import { getAllSectorIds, getSectorById } from "@/lib/sectors";
import { relatedServiceLabel } from "@/lib/blog";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { appointmentCta } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllSectorIds().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sector = getSectorById(slug);
  if (!sector) return {};
  return buildMetadata({
    title: `${sector.title} — Mühendislik danışmanlığı`,
    description: sector.description,
    path: `/sektorler/${sector.id}`,
  });
}

export default async function SektorPage({ params }: PageProps) {
  const { slug } = await params;
  const sector = getSectorById(slug);
  if (!sector) notFound();

  const path = `/sektorler/${sector.id}`;

  return (
    <SeoPageLayout>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Ana Sayfa", path: "/" },
            { name: "Sektörler", path: "/sektorler" },
            { name: sector.title, path },
          ]),
          serviceSchema({
            name: `${sector.title} mühendislik danışmanlığı`,
            description: sector.summary,
            path,
          }),
        ]}
      />

      <PageShell
        eyebrow="SEKTÖRLER"
        title={sector.title}
        description={sector.summary}
      >
        <Section>
          <div className="max-w-3xl space-y-6 text-body text-steel">
            {sector.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10">
            <h2 className="font-display text-h3 text-ink">İlgili hizmetler</h2>
            <ul className="mt-4 space-y-2">
              {sector.relatedPaths.map((href) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-body text-ink underline decoration-signal underline-offset-4 hover:text-signal"
                  >
                    {relatedServiceLabel(href)} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-10 text-body text-steel">
            <Link
              href={appointmentCta.href}
              className="text-ink underline decoration-signal underline-offset-4 hover:text-signal"
            >
              Görüşme planla
            </Link>{" "}
            veya{" "}
            <Link
              href="/iletisim"
              className="text-ink underline decoration-signal underline-offset-4 hover:text-signal"
            >
              iletişime geçin
            </Link>
            .
          </p>
        </Section>
      </PageShell>
    </SeoPageLayout>
  );
}
