"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Eyebrow } from "@/components/Eyebrow";
import { appointmentTypes } from "@/lib/site";

export function AppointmentPanels() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = appointmentTypes.find((t) => t.id === selectedId);

  if (!selected) {
    return (
      <div className="flex h-full w-full items-center justify-center px-4 py-4 pb-20 md:px-8 md:pb-16 md:pr-28">
        <div className="mx-auto w-full max-w-md">
          <Eyebrow>RANDEVU</Eyebrow>
          <h2 className="mt-2 font-display text-[1.35rem] text-ink md:mt-3 md:text-h2">
            Randevu türünü seçin
          </h2>
          <div className="mt-5 flex flex-col gap-3 sm:grid sm:grid-cols-2">
            {appointmentTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setSelectedId(type.id)}
                className="rounded border border-line bg-white px-4 py-5 text-left transition-colors active:border-accent active:bg-accent/5 md:px-5 md:py-6"
              >
                <span className="font-display text-base text-ink md:text-h3">
                  {type.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center px-4 py-4 pb-20 md:px-8 md:pb-20 md:pr-28">
      <div className="flex w-full max-w-2xl flex-col">
        <button
          type="button"
          onClick={() => setSelectedId(null)}
          className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-small font-medium text-ink shadow-sm transition-all active:border-accent active:text-accent md:mb-4 md:px-4 md:hover:border-accent md:hover:text-accent"
          aria-label="Randevu türü seçimine dön"
        >
          <ArrowLeft size={15} strokeWidth={2} aria-hidden="true" />
          Geri
        </button>

        <div className="overflow-hidden rounded-lg border border-line bg-white shadow-sm">
          <div className="border-b border-line bg-paper px-3 py-2 md:px-4 md:py-2.5">
            <p className="font-display text-small font-medium text-ink">
              {selected.title}
            </p>
          </div>
          <iframe
            src={selected.url}
            title={`${selected.title} — Google Takvim randevu`}
            className="h-[min(340px,42vh)] w-full border-0 sm:h-[min(380px,44vh)] md:h-[min(460px,50vh)]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
