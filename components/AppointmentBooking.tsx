"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useId, useState } from "react";
import { Calendar, ExternalLink, Video } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { appointmentTypes } from "@/lib/site";

type AppointmentTypeId = (typeof appointmentTypes)[number]["id"];

const selectionCopy: Record<
  AppointmentTypeId,
  { blurb: string; Icon: typeof Video }
> = {
  "on-gorusme": {
    blurb: "İhtiyacınızı ilk kez netleştirmek istiyorsanız.",
    Icon: Video,
  },
  danismanlik: {
    blurb: "Kapsamı belirli bir teknik işiniz varsa.",
    Icon: Calendar,
  },
};

function AppointmentBookingInner() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");
  const [selectedId, setSelectedId] = useState<AppointmentTypeId | null>(null);
  const choiceGroupId = useId();
  const calendarStatusId = useId();

  const selected = appointmentTypes.find((type) => type.id === selectedId);
  const choiceOrder: AppointmentTypeId[] = ["on-gorusme", "danismanlik"];
  const choiceTypes = choiceOrder
    .map((id) => appointmentTypes.find((type) => type.id === id))
    .filter((type): type is (typeof appointmentTypes)[number] => Boolean(type));

  function selectType(id: AppointmentTypeId) {
    setSelectedId(id);
    trackEvent("booking_click", {
      type: id,
      ...(ref ? { ref } : {}),
    });
  }

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
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-h3 text-ink">Görüşme randevusu</h2>
          <p className="mt-3 text-body text-steel">
            İhtiyacınıza uygun randevu türünü seçin. Takvim{" "}
            <strong className="font-medium text-ink">Türkiye saati</strong> ve{" "}
            <strong className="font-medium text-ink">Türkçe</strong> olarak
            gösterilir.
          </p>

          <p id={calendarStatusId} className="sr-only" aria-live="polite">
            {selected
              ? `${selected.title} takvimi yüklendi.`
              : "Randevu türü henüz seçilmedi."}
          </p>

          {!selected ? (
            <div
              className="mt-8 grid gap-4 sm:grid-cols-2"
              role="group"
              aria-labelledby={choiceGroupId}
            >
              <p id={choiceGroupId} className="sr-only">
                Randevu türü seçimi
              </p>
              {choiceTypes.map((type) => {
                const copy = selectionCopy[type.id];
                const Icon = copy.Icon;
                return (
                  <button
                    key={type.id}
                    type="button"
                    aria-pressed={selectedId === type.id}
                    onClick={() => selectType(type.id)}
                    className="flex w-full flex-col items-start gap-3 rounded border border-line bg-paper p-5 text-left transition-colors duration-200 hover:border-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
                  >
                    <Icon
                      className="shrink-0 text-signal"
                      size={22}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <span className="font-display text-h3 text-ink">
                      {type.title}
                    </span>
                    <span className="text-small text-steel">{copy.blurb}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <section className="mt-8" aria-describedby={calendarStatusId}>
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
                <div className="flex items-start gap-2">
                  {selected.id === "on-gorusme" ? (
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
                      {selected.title}
                    </h3>
                    <p className="mt-1 text-small text-steel">
                      {selectionCopy[selected.id].blurb}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <button
                    type="button"
                    className="text-small text-ink underline decoration-signal underline-offset-4 hover:text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
                    onClick={() => setSelectedId(null)}
                  >
                    Seçimi değiştir
                  </button>
                  <a
                    href={selected.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-small text-ink underline decoration-signal underline-offset-4 hover:text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
                    onClick={() =>
                      trackEvent("booking_click", {
                        type: selected.id,
                        ...(ref ? { ref } : {}),
                      })
                    }
                  >
                    Yeni sekmede aç
                    <ExternalLink
                      size={14}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>

              <div className="overflow-hidden rounded border border-line bg-paper">
                <iframe
                  src={selected.url}
                  title={`${selected.title} — Google Takvim randevu`}
                  className="h-[min(720px,80vh)] w-full border-0 bg-white"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </section>
          )}
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
