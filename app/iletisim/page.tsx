import type { Metadata } from "next";
import { AppointmentBooking } from "@/components/AppointmentBooking";
import { Cadence } from "@/components/Cadence";
import { ContactDetails } from "@/components/ContactDetails";
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

      <Section id="randevu">
        <AppointmentBooking />
      </Section>

      <Section variant="white">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="mb-6 font-display text-h2 text-ink">Mesaj gönderin</h2>
            <ContactForm />
          </div>
          <ContactDetails />
        </div>
      </Section>

      <Section>
        <Eyebrow>KONUM</Eyebrow>
        <h2 className="font-display text-h2 text-ink">Bizi haritada bulun</h2>
        <p className="mt-4 max-w-2xl text-body text-steel">
          Açık adres yakında eklenecek. Şimdilik Ankara merkezli hizmet
          veriyoruz; haritadan bölgeyi görüntüleyebilirsiniz.
        </p>
        <div className="mt-8 overflow-hidden rounded border border-line bg-white">
          <iframe
            title="Takt konum — Google Haritalar"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.0!2d32.8597!3d39.9334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d347d520732db1%3A0xbdc57b23c07f742!2sAnkara!5e0!3m2!1str!2str!4v1"
            className="h-72 w-full border-0 md:h-96"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <a
          href={siteConfig.mapsUrl}
          className="mt-4 inline-block text-body text-ink underline decoration-signal underline-offset-4 hover:text-signal"
          rel="noopener noreferrer"
          target="_blank"
        >
          Google Haritalar&apos;da aç →
        </a>
      </Section>
    </>
  );
}
