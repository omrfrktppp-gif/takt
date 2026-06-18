"use client";

import Link from "next/link";
import { ContactDetails } from "@/components/ContactDetails";
import { ContactForm } from "@/components/ContactForm";
import { Eyebrow } from "@/components/Eyebrow";
import { siteConfig } from "@/lib/site";

export function ContactPanels() {
  return (
    <article
      data-inner-scroll
      className="scroll-panel flex h-full w-full shrink-0 snap-start snap-always items-center overflow-y-auto px-6 py-8 md:px-10"
    >
      <div className="mx-auto w-full max-w-5xl">
        <Eyebrow>İLETİŞİM</Eyebrow>
        <h2 className="mt-4 font-display text-h2 text-ink">Eksik halkayı konuşalım.</h2>
        <p className="mt-3 max-w-2xl text-body text-steel">
          İhtiyacınızı yazın, en kısa sürede dönelim. İlk görüşme bağlayıcı değildir.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <ContactDetails />
          <div className="rounded border border-line bg-white p-5 md:p-6">
            <h3 className="font-display text-h3 text-ink">Mesaj gönderin</h3>
            <div className="mt-5">
              <ContactForm compact />
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 border-t border-line pt-8 md:grid-cols-[1fr_1.2fr] md:items-start">
          <div>
            <p className="font-mono text-eyebrow text-steel">KONUM</p>
            <p className="mt-2 text-body text-ink">{siteConfig.addressLabel}</p>
            <a
              href={siteConfig.mapsUrl}
              className="mt-2 inline-block text-small text-ink underline decoration-signal underline-offset-4 hover:text-signal"
              rel="noopener noreferrer"
              target="_blank"
            >
              Haritada aç →
            </a>
            <p className="mt-6 font-mono text-small text-steel">
              © {new Date().getFullYear()} Takt ·{" "}
              <Link
                href="/kvkk-aydinlatma-metni"
                className="underline decoration-line hover:text-signal"
              >
                KVKK
              </Link>
            </p>
          </div>
          <div className="overflow-hidden rounded border border-line bg-white">
            <iframe
              title="Takt konum — Google Haritalar"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.0!2d32.8597!3d39.9334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d347d520732db1%3A0xbdc57b23c07f742!2sAnkara!5e0!3m2!1str!2str!4v1"
              className="h-48 w-full border-0 md:h-56"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </article>
  );
}
