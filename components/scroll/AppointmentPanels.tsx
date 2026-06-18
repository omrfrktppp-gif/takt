"use client";

import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Eyebrow } from "@/components/Eyebrow";
import { appointmentTypes } from "@/lib/site";

export function AppointmentPanels() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = appointmentTypes.find((t) => t.id === selectedId);

  useEffect(() => {
    setSelectedId(null);
  }, []);

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
                className="rounded border border-line bg-white px-6 py-8 text-left transition-colors hover:border-signal hover:bg-signal/5"
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
    <div className="flex h-full w-full flex-col px-4 py-4 md:px-6">
      <button
        type="button"
        onClick={() => setSelectedId(null)}
        className="mb-3 inline-flex w-fit items-center gap-2 text-small text-steel hover:text-ink"
      >
        <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
        Geri
      </button>
      <div className="min-h-0 flex-1 overflow-hidden rounded border border-line bg-white">
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
