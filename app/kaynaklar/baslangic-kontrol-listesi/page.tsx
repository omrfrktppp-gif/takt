import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { LeadMagnetForm } from "@/components/LeadMagnetForm";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { SeoPageLayout } from "@/components/SeoPageLayout";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const path = "/kaynaklar/baslangic-kontrol-listesi";

export const metadata: Metadata = buildMetadata({
  title: "Özel Makine Projesi Başlangıç Kontrol Listesi",
  description:
    "Özel makine veya sistem projesine başlamadan önce netleştirmeniz gereken teknik ve operasyonel maddeler. Ücretsiz kontrol listesi talebi.",
  path,
});

export default function BaslangicKontrolListesiPage() {
  return (
    <SeoPageLayout>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Kaynaklar", path: "/kaynaklar/baslangic-kontrol-listesi" },
        ])}
      />

      <PageShell
        eyebrow="KAYNAKLAR"
        title="Özel Makine Projesi Başlangıç Kontrol Listesi"
        description="Projeye başlamadan önce kapsam, kısıt ve çıktıları netleştirmenize yardımcı olacak kısa bir kontrol listesi."
      >
        <Section>
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="max-w-xl space-y-4 text-body text-steel">
              <p>
                Özel makine veya endüstriyel sistem projelerinde erken aşamada
                netleştirilmeyen maddeler ileride revizyon, gecikme ve maliyet
                sürprizine dönüşür.
              </p>
              <p>
                Bu kontrol listesi; ihtiyaç tanımı, teknik kısıtlar, üretim
                yöntemi, teslim formatı ve paydaş sorumlulukları gibi başlangıç
                sorularını tek sayfada toplar.
              </p>
              <p>
                E-posta adresinizi bırakın; liste hazır olduğunda paylaşılır.
                İlk görüşme bağlayıcı değildir.
              </p>
              <p>
                Acil bir ihtiyaç varsa{" "}
                <Link
                  href="/iletisim"
                  className="text-ink underline decoration-signal underline-offset-4 hover:text-signal"
                >
                  iletişim
                </Link>{" "}
                veya{" "}
                <Link
                  href="/gorusme-planla"
                  className="text-ink underline decoration-signal underline-offset-4 hover:text-signal"
                >
                  görüşme planlama
                </Link>{" "}
                sayfasını kullanabilirsiniz.
              </p>
            </div>

            <div className="rounded border border-line bg-white p-6">
              <h2 className="font-display text-h3 text-ink">Listeyi talep edin</h2>
              <div className="mt-6">
                <LeadMagnetForm />
              </div>
            </div>
          </div>
        </Section>
      </PageShell>
    </SeoPageLayout>
  );
}
