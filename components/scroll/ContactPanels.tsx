"use client";

import Link from "next/link";
import { ContactDetails } from "@/components/ContactDetails";
import { ContactForm } from "@/components/ContactForm";
import { Eyebrow } from "@/components/Eyebrow";
import { siteConfig } from "@/lib/site";

export function ContactPanels() {
  return (
    <>
      <article className="scroll-panel flex h-full w-full shrink-0 snap-start snap-always items-center px-6 py-8 md:px-10">
        <div className="mx-auto w-full max-w-md">
          <Eyebrow>İLETİŞİM</Eyebrow>
          <h2 className="mt-4 font-display text-h2 text-ink">Bize ulaşın</h2>
          <ContactDetails className="mt-8" />
        </div>
      </article>

      <article className="scroll-panel flex h-full w-full shrink-0 snap-start snap-always items-center px-6 py-8 md:px-10">
        <div className="mx-auto w-full max-w-lg">
          <Eyebrow>MESAJ</Eyebrow>
          <h2 className="mt-4 font-display text-h3 text-ink">Mesaj gönderin</h2>
          <div className="mt-6">
            <ContactForm compact />
          </div>
        </div>
      </article>

      <article className="scroll-panel flex h-full w-full shrink-0 snap-start snap-always items-center px-6 py-8 md:px-10">
        <div className="mx-auto w-full max-w-xl">
          <Eyebrow>KONUM</Eyebrow>
          <h2 className="mt-4 font-display text-h3 text-ink">Ankara</h2>
          <p className="mt-2 text-small text-steel">
            Açık adres yakında eklenecek.
          </p>
          <div className="mt-4 overflow-hidden rounded border border-line bg-white">
            <iframe
              title="Takt konum — Google Haritalar"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.0!2d32.8597!3d39.9334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d347d520732db1%3A0xbdc57b23c07f742!2sAnkara!5e0!3m2!1str!2str!4v1"
              className="h-56 w-full border-0 md:h-64"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <a
            href={siteConfig.mapsUrl}
            className="mt-3 inline-block text-small text-ink underline decoration-signal underline-offset-4 hover:text-signal"
            rel="noopener noreferrer"
            target="_blank"
          >
            Haritada aç →
          </a>
        </div>
      </article>

      <article className="scroll-panel flex h-full w-full shrink-0 snap-start snap-always items-center px-6 py-8 md:px-10">
        <div className="mx-auto w-full max-w-md text-center">
          <p className="font-mono text-small text-steel">
            © {new Date().getFullYear()} Takt
          </p>
          <Link
            href="/kvkk-aydinlatma-metni"
            className="mt-2 inline-block font-mono text-small text-steel hover:text-signal"
          >
            KVKK Aydınlatma Metni
          </Link>
        </div>
      </article>
    </>
  );
}
