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
      <div className="flex h-full w-full items-center justify-center px-5 py-5 pr-14 pb-14 md:px-8 md:pr-28 md:pb-16">
        <div className="mx-auto w-full max-w-md">
          <Eyebrow>RANDEVU</Eyebrow>
          <h2 className="mt-3 font-display text-h2 text-ink">
            Randevu türünü seçin
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {appointmentTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setSelectedId(type.id)}
                className="rounded border border-line bg-white px-5 py-6 text-left transition-colors hover:border-accent hover:bg-accent/5"
              >
                <span className="font-display text-h3 text-ink">
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
    <div className="flex h-full w-full items-center justify-center px-5 py-5 pr-14 pb-16 md:px-8 md:pr-28 md:pb-20">
      <div className="flex w-full max-w-2xl flex-col">
        <button
          type="button"
          onClick={() => setSelectedId(null)}
          className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-small font-medium text-ink shadow-sm transition-all hover:border-accent hover:text-accent hover:shadow-md"
          aria-label="Randevu türü seçimine dön"
        >
          <ArrowLeft size={15} strokeWidth={2} aria-hidden="true" />
          Randevu türüne dön
        </button>

        <div className="overflow-hidden rounded-lg border border-line bg-white shadow-sm">
          <div className="border-b border-line bg-paper px-4 py-2.5">
            <p className="font-display text-small font-medium text-ink">
              {selected.title}
            </p>
          </div>
          <iframe
            src={selected.url}
            title={`${selected.title} — Google Takvim randevu`}
            className="h-[min(420px,48vh)] w-full border-0 md:h-[min(460px,50vh)]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
