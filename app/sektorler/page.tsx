import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { ListingGrid, PanelCard, SeoPageLayout } from "@/components/SeoPageLayout";
import { Section } from "@/components/Section";
import { sectors } from "@/lib/sectors";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const path = "/sektorler";

export const metadata: Metadata = buildMetadata({
  title: "Sektörler",
  description:
    "Savunma sanayi, gıda makineleri, otomotiv yan sanayi ve tıbbi cihaz projelerinde mühendislik danışmanlığı.",
  path,
});

export default function SektorlerPage() {
  return (
    <SeoPageLayout>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Sektörler", path },
        ])}
      />

      <PageShell
        eyebrow="SEKTÖRLER"
        title="Sektörler"
        description="Farklı sanayi dikeylerinde tasarım, analiz, üretim koordinasyonu ve proje danışmanlığı."
        breadcrumbs={[
          { label: "Ana Sayfa", href: "/" },
          { label: "Sektörler" },
        ]}
      >
        <Section>
          <p className="mb-8 max-w-2xl text-body text-steel">
            {sectors.length} sektör — projenize uygun dikeyi seçin veya doğrudan
            iletişime geçin.
          </p>
          <ListingGrid>
            {sectors.map((sector) => (
              <PanelCard
                key={sector.id}
                href={`/sektorler/${sector.id}`}
                title={sector.title}
                excerpt={sector.description}
              />
            ))}
          </ListingGrid>

          <p className="mt-10 text-body text-steel">
            Sektörünüz listede yoksa{" "}
            <Link
              href="/iletisim"
              className="touch-target-inline text-ink underline decoration-signal underline-offset-4 transition-colors hover:text-signal"
            >
              iletişime geçin
            </Link>
            ; benzer proje tiplerinde de çalışıyoruz.
          </p>
        </Section>
      </PageShell>
    </SeoPageLayout>
  );
}
