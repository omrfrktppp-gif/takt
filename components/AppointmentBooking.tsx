"use client";

import { Calendar, ExternalLink } from "lucide-react";
import { googleCalendarBookingUrl, siteConfig } from "@/lib/site";

export function AppointmentBooking() {
  const hasCalendarLink = Boolean(googleCalendarBookingUrl);

  return (
    <div className="rounded border border-line bg-white p-6 md:p-8">
      <div className="flex items-start gap-3">
        <Calendar
          className="mt-1 shrink-0 text-signal"
          size={22}
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <div className="flex-1">
          <h2 className="font-display text-h3 text-ink">Görüşme randevusu</h2>
          <p className="mt-3 text-body text-steel">
            Uygun bir zaman seçin; talebiniz Google Takvim üzerinden bize
            iletilir. Onayladığımızda randevu bilgilerini içeren bir e-posta
            alırsınız ve etkinlik takviminize eklenir.
          </p>

          {hasCalendarLink ? (
            <a
              href={googleCalendarBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded bg-ink px-[22px] py-[14px] text-sm font-medium text-white transition-colors hover:bg-signal"
            >
              Randevu oluştur
              <ExternalLink size={16} strokeWidth={1.5} aria-hidden="true" />
            </a>
          ) : (
            <div className="mt-6 rounded border border-line bg-paper p-4">
              <p className="text-small text-steel">
                Google Takvim randevu bağlantısı henüz tanımlanmadı. Şimdilik{" "}
                <a
                  href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Randevu talebi")}`}
                  className="text-ink underline decoration-signal underline-offset-4 hover:text-signal"
                >
                  {siteConfig.email}
                </a>{" "}
                üzerinden görüşme talebi gönderebilirsiniz.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
