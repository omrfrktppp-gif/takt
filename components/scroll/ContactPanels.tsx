"use client";

import Link from "next/link";
import { ContactDetails } from "@/components/ContactDetails";
import { ContactForm } from "@/components/ContactForm";
import { Eyebrow } from "@/components/Eyebrow";
import { formatSiteAddressLines, siteConfig } from "@/lib/site";

const panelClass =
  "scroll-panel flex h-full w-full shrink-0 snap-start snap-always flex-col justify-center px-4 py-4 pb-20 md:px-8 md:py-5 md:pb-5 md:pr-28 lg:pr-36";

function ContactHeader() {
  return (
    <>
      <Eyebrow>İLETİŞİM</Eyebrow>
      <h2 className="mt-2 font-display text-[1.35rem] leading-tight text-ink md:mt-3 md:text-h2 lg:text-[1.65rem]">
        Eksik halkayı konuşalım.
      </h2>
      <p className="mt-2 text-small text-steel md:text-body">
        İhtiyacınızı yazın, en kısa sürede dönelim.
      </p>
    </>
  );
}

function ContactMapBlock() {
  return (
    <>
      <p className="font-mono text-eyebrow text-steel">KONUM</p>
      <p className="mt-1 text-body text-ink">
        {formatSiteAddressLines().map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>
      <a
        href={siteConfig.mapsUrl}
        className="mt-1 inline-block text-small text-ink underline decoration-signal underline-offset-4 hover:text-signal"
        rel="noopener noreferrer"
        target="_blank"
      >
        Haritada aç →
      </a>
      <div className="mt-4 overflow-hidden rounded border border-line bg-white">
        <iframe
          title="Takt konum — Google Haritalar"
          src={siteConfig.mapsEmbedUrl}
          className="h-40 w-full border-0 sm:h-44 md:h-36"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <p className="mt-4 font-mono text-small text-steel">
        © {new Date().getFullYear()} Takt ·{" "}
        <Link
          href="/kvkk-aydinlatma-metni"
          className="underline decoration-line hover:text-signal"
        >
          KVKK
        </Link>
      </p>
    </>
  );
}

/** Mobil: 3 yatay panel — bilgi | form | harita */
function ContactMobilePanels() {
  return (
    <>
      <article className={panelClass}>
        <div className="mx-auto w-full max-w-md">
          <ContactHeader />
          <ContactDetails className="mt-5" />
        </div>
      </article>

      <article className={panelClass}>
        <div className="mx-auto flex h-full w-full max-w-md flex-col justify-center">
          <div className="rounded border border-line bg-white p-4">
            <h3 className="font-display text-h3 text-ink">Mesaj gönderin</h3>
            <div className="scroll-inner scrollbar-none mt-4 max-h-[min(52vh,420px)] overflow-y-auto">
              <ContactForm compact dense />
            </div>
          </div>
        </div>
      </article>

      <article className={panelClass}>
        <div className="mx-auto w-full max-w-md">
          <ContactMapBlock />
        </div>
      </article>
    </>
  );
}

/** Masaüstü: tek panel, yan yana */
function ContactDesktopPanel() {
  return (
    <article className={`${panelClass} hidden lg:flex`}>
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ContactHeader />
            <ContactDetails prominent className="mt-6" />
          </div>
          <div className="lg:col-span-7">
            <div className="rounded border border-line bg-white p-5">
              <h3 className="font-display text-h3 text-ink">Mesaj gönderin</h3>
              <div className="scroll-inner scrollbar-none mt-4 max-h-[min(280px,38vh)] overflow-y-auto pr-1">
                <ContactForm compact dense />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 grid items-center gap-4 border-t border-line pt-6 md:grid-cols-[1fr_1.4fr]">
          <div className="text-small">
            <p className="font-mono text-eyebrow text-steel">KONUM</p>
            <p className="mt-1 text-ink">
              {formatSiteAddressLines().map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
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
              src={siteConfig.mapsEmbedUrl}
              className="h-36 w-full border-0"
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

export function ContactPanels() {
  return (
    <>
      <div className="contents lg:hidden">
        <ContactMobilePanels />
      </div>
      <ContactDesktopPanel />
    </>
  );
}
