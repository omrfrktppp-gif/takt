import type { Metadata } from "next";
import { Cadence } from "@/components/Cadence";
import { ContactForm } from "@/components/ContactForm";
import { Eyebrow } from "@/components/Eyebrow";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "İletişim — Takt",
  description: "Projenizdeki eksik halkayı konuşalım. Takt ile görüşme planlayın.",
  alternates: { canonical: "/iletisim" },
  openGraph: {
    title: "İletişim — Takt",
    description: "Projenizdeki eksik halkayı konuşalım. Takt ile görüşme planlayın.",
    url: `${siteConfig.url}/iletisim`,
  },
};

export default function IletisimPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "İletişim", path: "/iletisim" },
        ])}
      />

      <Section variant="white" className="pb-12 pt-20 md:pt-28">
        <Eyebrow>İLETİŞİM</Eyebrow>
        <h1 className="max-w-3xl font-display text-h1 text-ink">
          Eksik halkayı konuşalım.
        </h1>
        <p className="mt-6 max-w-2xl text-body-lg text-steel">
          İhtiyacınızı kısaca yazın, en kısa sürede dönelim. İlk görüşme
          bağlayıcı değildir.
        </p>
        <Cadence variant="divider" className="mt-12" />
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <ContactForm />

          <aside className="rounded border border-line bg-white p-6">
            <h2 className="font-display text-h3 text-ink">Doğrudan iletişim</h2>
            <ul className="mt-6 space-y-4 text-body">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-ink underline decoration-signal underline-offset-4 hover:text-signal"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.linkedin}
                  className="text-ink underline decoration-signal underline-offset-4 hover:text-signal"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  LinkedIn şirket sayfası
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </Section>
    </>
  );
}
