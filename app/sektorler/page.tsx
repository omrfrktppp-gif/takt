import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { PanelCard, SeoPageLayout } from "@/components/SeoPageLayout";
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
      >
        <Section>
          <div className="grid gap-6 md:grid-cols-2">
            {sectors.map((sector) => (
              <PanelCard
                key={sector.id}
                href={`/sektorler/${sector.id}`}
                title={sector.title}
                excerpt={sector.description}
              />
            ))}
          </div>

          <p className="mt-10 text-body text-steel">
            Sektörünüz listede yoksa{" "}
            <Link
              href="/iletisim"
              className="text-ink underline decoration-signal underline-offset-4 hover:text-signal"
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
