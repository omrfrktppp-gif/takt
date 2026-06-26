import type { Metadata } from "next";
import Link from "next/link";
import { BaslangicIhtiyacFormu } from "@/components/BaslangicIhtiyacFormu";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { SeoPageLayout } from "@/components/SeoPageLayout";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const path = "/kaynaklar/baslangic-kontrol-listesi";

export const metadata: Metadata = buildMetadata({
  title: "Başlangıç İhtiyaç Formu",
  description:
    "Özel makine ve Ar-Ge projeleri için interaktif başlangıç ihtiyaç formunu indirin, doldurun ve PDF olarak yükleyin veya WhatsApp/e-posta ile gönderin.",
  path,
});

export default function BaslangicKontrolListesiPage() {
  return (
    <SeoPageLayout>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Kaynaklar", path },
        ])}
      />

      <PageShell
        eyebrow="KAYNAKLAR"
        title="Başlangıç ihtiyaç formu"
        description="Projeye başlamadan önce kapsam, kısıt ve çıktıları netleştirmenize yardımcı olan interaktif PDF form."
      >
        <Section>
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="max-w-xl space-y-4 text-body text-steel">
              <p>
                Başlangıç ihtiyaç formunu indirdikten sonra interaktif PDF
                dosyasını ihtiyaçlarınıza göre doldurabilir ve bize bu
                sayfadan, WhatsApp yoluyla veya e-posta üzerinden
                gönderebilirsiniz.
              </p>
              <p>
                Form; ihtiyaç tanımı, teknik kısıtlar, üretim yöntemi, teslim
                formatı ve paydaş sorumlulukları gibi erken aşama sorularını tek
                yerde toplar. İlk görüşme bağlayıcı değildir.
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

            <BaslangicIhtiyacFormu />
          </div>
        </Section>
      </PageShell>
    </SeoPageLayout>
  );
}
