import { Calendar, ExternalLink, Video } from "lucide-react";
import { appointmentTypes } from "@/lib/site";

export function AppointmentBooking() {
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
            İhtiyacınıza uygun randevu türünü seçin. Talebiniz Google Takvim
            üzerinden bize iletilir; onaylandığında randevu bilgilerini içeren
            bir e-posta alırsınız.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {appointmentTypes.map((type) => (
              <article
                key={type.id}
                className="flex flex-col rounded border border-line bg-paper p-5"
              >
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
                  <h3 className="font-display text-h3 text-ink">{type.title}</h3>
                </div>
                <p className="mt-3 flex-1 text-small text-steel">
                  {type.description}
                </p>
                <a
                  href={type.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded bg-ink px-[22px] py-[14px] text-sm font-medium text-white transition-colors hover:bg-signal"
                >
                  Randevu al
                  <ExternalLink size={16} strokeWidth={1.5} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
