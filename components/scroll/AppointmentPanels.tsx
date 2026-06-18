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
      <div className="flex h-full w-full items-center justify-center px-6 py-8">
        <div className="mx-auto w-full max-w-lg">
          <Eyebrow>RANDEVU</Eyebrow>
          <h2 className="mt-4 font-display text-h2 text-ink">
            Randevu türünü seçin
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {appointmentTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setSelectedId(type.id)}
                className="rounded border border-line bg-white px-6 py-8 text-left transition-colors hover:border-accent hover:bg-accent/5"
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
    <div className="relative flex h-full w-full flex-col px-4 py-4 md:px-6">
      <button
        type="button"
        onClick={() => setSelectedId(null)}
        className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-line bg-white/95 px-3 py-1.5 text-small font-medium text-ink shadow-sm backdrop-blur-sm transition-colors hover:border-accent hover:text-accent md:left-6"
        aria-label="Randevu türü seçimine dön"
      >
        <ArrowLeft size={14} strokeWidth={2} aria-hidden="true" />
        Geri
      </button>
      <div className="min-h-0 flex-1 overflow-hidden rounded border border-line bg-white pt-10">
        <iframe
          src={selected.url}
          title={`${selected.title} — Google Takvim randevu`}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
