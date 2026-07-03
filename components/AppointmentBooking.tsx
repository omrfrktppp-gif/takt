"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Calendar, ExternalLink, Video } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { appointmentTypes } from "@/lib/site";

function AppointmentBookingInner() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");

  return (
    <div className="rounded border border-line bg-white p-6 md:p-8">
      {ref === "ihtiyac-analizi" ? (
        <p className="mb-6 rounded border border-signal/20 bg-signal/5 px-4 py-3 text-body text-steel">
          İhtiyaç analizi formunuz bize ulaştı. Aşağıdan size uygun randevu
          türünü seçerek görüşme planlayabilirsiniz.
        </p>
      ) : null}
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
            İhtiyacınıza uygun randevu türünü seçin. Takvim{" "}
            <strong className="font-medium text-ink">Türkiye saati</strong> ve{" "}
            <strong className="font-medium text-ink">Türkçe</strong> olarak
            gösterilir.
          </p>

          <div className="mt-8 space-y-10">
            {appointmentTypes.map((type) => (
              <section key={type.id}>
                <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-2">
                    {type.id === "on-gorusme" ? (
                      <Video
                        className="mt-0.5 shrink-0 text-signal"
                        size={18}
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    ) : (
                      <Calendar
                        className="mt-0.5 shrink-0 text-signal"
                        size={18}
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    )}
                    <div>
                      <h3 className="font-display text-h3 text-ink">
                        {type.title}
                      </h3>
                      <p className="mt-1 text-small text-steel">
                        {type.description}
                      </p>
                    </div>
                  </div>
                  <a
                    href={type.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-small text-ink underline decoration-signal underline-offset-4 hover:text-signal"
                    onClick={() =>
                      trackEvent("booking_click", {
                        type: type.id,
                        ...(ref ? { ref } : {}),
                      })
                    }
                  >
                    Yeni sekmede aç
                    <ExternalLink size={14} strokeWidth={1.5} aria-hidden="true" />
                  </a>
                </div>

                <div className="overflow-hidden rounded border border-line bg-paper">
                  <iframe
                    src={type.url}
                    title={`${type.title} — Google Takvim randevu`}
                    className="h-[min(720px,80vh)] w-full border-0 bg-white"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AppointmentBooking() {
  return (
    <Suspense fallback={null}>
      <AppointmentBookingInner />
    </Suspense>
  );
}
