import type { Metadata } from "next";
import Link from "next/link";
import { Cadence } from "@/components/Cadence";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import {
  processSteps,
  servicePillars,
  siteConfig,
  whyTakt,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Takt — Mühendislik Danışmanlığı | Tasarım, Analiz, Proje Yönetimi",
  description:
    "Makina imalatı ve savunma sanayisindeki firmaların teknik ekibine dışarıdan güç katan mühendislik danışmanlığı. Tasarım, analiz, proje ve imalat yönetimi.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Takt — Mühendislik Danışmanlığı | Tasarım, Analiz, Proje Yönetimi",
    description:
      "Makina imalatı ve savunma sanayisindeki firmaların teknik ekibine dışarıdan güç katan mühendislik danışmanlığı. Tasarım, analiz, proje ve imalat yönetimi.",
    url: siteConfig.url,
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Ana Sayfa", path: "/" }]),
          faqPageSchema(),
        ]}
      />

      <Section variant="white" className="pb-12 pt-20 md:pb-16 md:pt-28">
        <div className="grid items-end gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <Eyebrow>MÜHENDİSLİK DANIŞMANLIĞI</Eyebrow>
            <h1 className="max-w-3xl font-display text-display text-ink">
              Teknik ekibinizin eksik halkası.
            </h1>
            <p className="mt-6 max-w-2xl text-body-lg text-steel">
              Makina imalatı ve savunma tedarikinde çalışan ekiplerin operasyon,
              tasarım ve proje yönetimi yükünü dışarıdan üstleniriz. Doğru
              tempoda, ölçülü ve hızlı.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href="/iletisim">Görüşme planla</Button>
              <Button href="/hizmetler" variant="secondary">
                Hizmetleri gör
              </Button>
            </div>
          </div>
          <Cadence variant="hero" className="justify-center lg:justify-end" />
        </div>
      </Section>

      <Section>
        <Eyebrow>NE YAPIYORUZ</Eyebrow>
        <p className="max-w-3xl text-body-lg text-steel">
          Firmanızın teknik ekibinde bir eksiklik varsa — operasyonda, proje
          yönetiminde, tasarımda ya da analizde — o boşluğu biz kapatırız.
          Sürekli bir kadro maliyeti olmadan, ihtiyaç duyduğunuz mühendislik
          gücünü projeye ekleriz.
        </p>
      </Section>

      <Section variant="white">
        <Eyebrow>HİZMETLER</Eyebrow>
        <h2 className="max-w-2xl font-display text-h2 text-ink">
          Eksiği nerede hissediyorsanız, oradayız.
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {servicePillars.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.short}
              href={`/hizmetler#${service.id}`}
            />
          ))}
        </div>
        <Link
          href="/hizmetler"
          className="mt-8 inline-block text-ink underline decoration-signal underline-offset-4 hover:text-signal"
        >
          Tüm hizmetler
        </Link>
      </Section>

      <Section>
        <Eyebrow>NEDEN TAKT</Eyebrow>
        <h2 className="font-display text-h2 text-ink">Kadro değil, kapasite.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {whyTakt.map((item) => (
            <article
              key={item.title}
              className="rounded border border-line bg-white p-6"
            >
              <h3 className="font-display text-h3 text-ink">{item.title}</h3>
              <p className="mt-3 text-body text-steel">{item.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section variant="white">
        <Eyebrow>NASIL ÇALIŞIRIZ</Eyebrow>
        <h2 className="font-display text-h2 text-ink">Dört vuruşta net ilerleme.</h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <li
              key={step.title}
              className="rounded border border-line bg-paper p-6"
            >
              <p className="font-mono text-eyebrow text-signal">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-h3 text-ink">{step.title}</h3>
              <p className="mt-3 text-body text-steel">{step.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <Eyebrow>SSS</Eyebrow>
        <h2 className="mb-10 font-display text-h2 text-ink">Sık sorulan sorular</h2>
        <FaqList />
      </Section>

      <Section variant="ink">
        <div className="max-w-2xl">
          <Cadence variant="divider" className="mb-8" />
          <h2 className="font-display text-h2 text-white">
            Projenizdeki eksik halkayı konuşalım.
          </h2>
          <div className="mt-8">
            <Button href="/iletisim" variant="light">
              Görüşme planla
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
