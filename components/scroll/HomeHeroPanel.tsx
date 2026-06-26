"use client";

import Link from "next/link";
import { Cadence } from "@/components/Cadence";
import { Button } from "@/components/Button";
import { trackEvent } from "@/lib/analytics";
import { appointmentCta, leadMagnet, siteConfig } from "@/lib/site";
import { useScroll } from "@/components/scroll/ScrollContext";

export function HomeHeroPanel() {
  const { scrollToChapter } = useScroll();

  return (
    <article className="scroll-panel flex h-full w-full shrink-0 snap-start snap-always flex-col justify-center px-4 py-4 pb-24 pr-4 md:px-10 md:py-6 md:pb-6 md:pr-28 lg:pr-36">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 md:gap-8">
        <Cadence variant="hero" tickCount={9} activeIndex={4} className="max-w-xs" />
        <div>
          <p className="font-mono text-eyebrow uppercase tracking-[0.12em] text-signal">
            Mühendislik danışmanlığı · Ankara
          </p>
          <h2 className="mt-4 font-display text-[1.75rem] leading-tight text-ink md:text-[2.25rem]">
            {siteConfig.tagline}
          </h2>
          <p className="mt-4 max-w-2xl text-body text-steel md:text-body-lg">
            {siteConfig.description}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Button
            onClick={() => {
              trackEvent("booking_click", { type: "hero_home" });
              scrollToChapter("gorusme-planla");
            }}
          >
            {appointmentCta.label}
          </Button>
          <Button
            variant="secondary"
            href={siteConfig.whatsapp.href}
            onClick={() => trackEvent("contact_click", { channel: "whatsapp_hero" })}
          >
            WhatsApp
          </Button>
          <Link
            href="/iletisim"
            className="text-center text-body text-ink underline decoration-signal underline-offset-4 hover:text-signal sm:text-left"
            onClick={() => trackEvent("contact_click", { channel: "hero_contact" })}
          >
            İletişim →
          </Link>
        </div>
        <p className="text-small text-steel">
          <Link
            href={leadMagnet.href}
            className="text-ink underline decoration-signal underline-offset-4 hover:text-signal"
          >
            {leadMagnet.label}
          </Link>
          {" — "}
          {leadMagnet.description}
        </p>
      </div>
    </article>
  );
}
