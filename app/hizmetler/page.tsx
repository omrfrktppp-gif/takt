import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { Cadence } from "@/components/Cadence";
import { breadcrumbSchema } from "@/lib/schema";
import { servicePillars, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hizmetler — Takt Mühendislik Danışmanlığı",
  description:
    "Mühendislik danışmanlığı, tasarım & geliştirme, analiz & hesaplama, üretim & optimizasyon, Ar-Ge ve proje destekleri. Teknik ekibinizin eksiğini tamamlıyoruz.",
  alternates: { canonical: "/hizmetler" },
  openGraph: {
    title: "Hizmetler — Takt Mühendislik Danışmanlığı",
    description:
      "Mühendislik danışmanlığı, tasarım & geliştirme, analiz & hesaplama, üretim & optimizasyon, Ar-Ge ve proje destekleri. Teknik ekibinizin eksiğini tamamlıyoruz.",
    url: `${siteConfig.url}/hizmetler`,
  },
};

export default function HizmetlerPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Hizmetler", path: "/hizmetler" },
        ])}
      />

      <Section variant="white" className="pb-12 pt-20 md:pt-28">
        <Eyebrow>HİZMETLER</Eyebrow>
        <h1 className="max-w-3xl font-display text-h1 text-ink">
          Eksiği tamamlayan mühendislik hizmetleri
        </h1>
        <p className="mt-6 max-w-2xl text-body-lg text-steel">
          İhtiyacınız tek bir konuda da olabilir, uçtan uca da. Her hizmeti tek
          başına ya da bütünleşik alabilirsiniz.
        </p>
        <Cadence variant="divider" className="mt-12" />
      </Section>

      {servicePillars.map((service, index) => (
        <Section
          key={service.id}
          id={service.id}
          variant={index % 2 === 0 ? "paper" : "white"}
        >
          <Eyebrow>
            {service.number} · {service.title.toUpperCase()}
          </Eyebrow>
          <h2 className="font-display text-h2 text-ink">{service.title}</h2>
          <p className="mt-4 max-w-3xl text-body-lg text-steel">
            {service.description}
          </p>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {service.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded border border-line bg-white px-4 py-3 text-body text-ink"
              >
                <span
                  className="mt-2 inline-block h-3 w-0.5 shrink-0 bg-signal"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </Section>
      ))}

      <Section variant="ink">
        <h2 className="max-w-2xl font-display text-h2 text-white">
          İhtiyacınızı birlikte tanımlayalım.
        </h2>
        <div className="mt-8">
          <Button href="/iletisim" variant="light">
            Görüşme planla
          </Button>
        </div>
      </Section>
    </>
  );
}
