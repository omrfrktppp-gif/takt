"use client";

import Link from "next/link";
import { ContactDetails } from "@/components/ContactDetails";
import { ContactForm } from "@/components/ContactForm";
import { Eyebrow } from "@/components/Eyebrow";
import { siteConfig } from "@/lib/site";

export function ContactPanels() {
  return (
    <article className="scroll-panel flex h-full w-full shrink-0 snap-start snap-always items-center justify-center px-5 py-5 pr-14 md:px-8 md:pr-28 lg:pr-36">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Eyebrow>İLETİŞİM</Eyebrow>
            <h2 className="mt-3 font-display text-h2 text-ink md:text-[1.65rem]">
              Eksik halkayı konuşalım.
            </h2>
            <p className="mt-2 text-small text-steel md:text-body">
              İhtiyacınızı yazın, en kısa sürede dönelim.
            </p>
            <ContactDetails prominent className="mt-6" />
          </div>

          <div className="lg:col-span-7">
            <div className="rounded border border-line bg-white p-4 md:p-5">
              <h3 className="font-display text-h3 text-ink">Mesaj gönderin</h3>
              <div className="mt-4 max-h-[min(300px,42vh)] overflow-y-auto pr-1">
                <ContactForm compact dense />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 grid items-center gap-4 border-t border-line pt-5 md:grid-cols-[1fr_1.4fr]">
          <div className="text-small">
            <p className="font-mono text-eyebrow text-steel">KONUM</p>
            <p className="mt-1 text-ink">{siteConfig.addressLabel}</p>
            <a
              href={siteConfig.mapsUrl}
              className="mt-1 inline-block text-ink underline decoration-signal underline-offset-4 hover:text-signal"
              rel="noopener noreferrer"
              target="_blank"
            >
              Haritada aç →
            </a>
            <p className="mt-3 font-mono text-small text-steel">
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
              className="h-32 w-full border-0 md:h-36"
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
