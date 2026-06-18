import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Cadence } from "@/components/Cadence";
import { Eyebrow } from "@/components/Eyebrow";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { breadcrumbSchema } from "@/lib/schema";
import { approachPrinciples, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Yaklaşım — Takt",
  description:
    "Takt, mühendislik operasyonlarına ritim katar. Ölçülü, hızlı ve takip edilebilir çalışma anlayışımız.",
  alternates: { canonical: "/yaklasim" },
  openGraph: {
    title: "Yaklaşım — Takt",
    description:
      "Takt, mühendislik operasyonlarına ritim katar. Ölçülü, hızlı ve takip edilebilir çalışma anlayışımız.",
    url: `${siteConfig.url}/yaklasim`,
  },
};

export default function YaklasimPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Yaklaşım", path: "/yaklasim" },
        ])}
      />

      <Section variant="white" className="pb-12 pt-20 md:pt-28">
        <Eyebrow>YAKLAŞIM</Eyebrow>
        <h1 className="max-w-3xl font-display text-h1 text-ink">
          Mühendislikte doğru tempo.
        </h1>
        <Cadence variant="divider" className="mt-12" />
      </Section>

      <Section>
        <h2 className="font-display text-h2 text-ink">Adımız neyi anlatır</h2>
        <p className="mt-6 max-w-3xl text-body-lg text-steel">
          &ldquo;Takt&rdquo;, üretimde işin akması gereken ritmi tanımlayan bir
          mühendislik terimidir. Biz de işi tam olarak bunun için varız:
          dağınık, gecikmeli ya da kör noktalı süreçlere ölçülebilir bir ritim
          getirmek.
        </p>
      </Section>

      <Section variant="white">
        <h2 className="font-display text-h2 text-ink">Nasıl çalışırız</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {approachPrinciples.map((item) => (
            <article
              key={item.title}
              className="rounded border border-line bg-paper p-6"
            >
              <h3 className="font-display text-h3 text-ink">{item.title}</h3>
              <p className="mt-3 text-body text-steel">{item.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="font-display text-h2 text-ink">Kimlerle çalışırız</h2>
        <p className="mt-6 max-w-3xl text-body-lg text-steel">
          Makina imalatı ve savunma tedarikinde çalışan firmalar ve teknik
          ekipleri; üretime geçmek isteyen ürün/fikir sahipleri; Ar-Ge ve proje
          desteği arayan kurumlar.
        </p>
      </Section>

      <Section variant="ink">
        <h2 className="font-display text-h2 text-white">Tanışalım</h2>
        <div className="mt-8">
          <Button href="/iletisim" variant="light">
            Görüşme planla
          </Button>
        </div>
      </Section>
    </>
  );
}
