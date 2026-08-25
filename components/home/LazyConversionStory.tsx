"use client";

import dynamic from "next/dynamic";

const ConversionStory = dynamic(
  () =>
    import("@/components/home/ConversionStory").then(
      (module) => module.ConversionStory,
    ),
  {
    ssr: false,
    loading: () => (
      <section
        className="border-y border-ink/10 bg-deep text-ink"
        aria-labelledby="engineering-poster-title"
      >
        <div className="mx-auto grid w-full max-w-content gap-8 px-4 py-16 md:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:py-20">
          <div>
            <p className="font-mono text-eyebrow uppercase tracking-[0.12em] text-ink/55">
              Mühendislik akışı
            </p>
            <h2
              id="engineering-poster-title"
              className="mt-3 font-display text-h2 text-ink"
            >
              Sıkışan işi, çalışan bir teknik sisteme dönüştürüyoruz.
            </h2>
            <p className="mt-4 text-body text-ink/65">
              Darboğazdan devredilebilir teknik çıktıya uzanan tek akış.
            </p>
          </div>
          <svg
            viewBox="0 0 560 260"
            className="w-full border border-ink/15 bg-ink/[0.03]"
            role="img"
            aria-label="Birleşmiş jenerik makine ve teknik teslim dosyaları"
          >
            <path
              d="M20 224H540M280 20V240"
              stroke="var(--line)"
              strokeDasharray="4 7"
              strokeOpacity=".25"
            />
            <g fill="var(--steel)" stroke="var(--paper)">
              <rect x="82" y="182" width="278" height="34" />
              <rect x="118" y="92" width="34" height="90" />
              <rect x="290" y="92" width="34" height="90" />
            </g>
            <rect
              x="152"
              y="72"
              width="138"
              height="58"
              fill="var(--paper)"
              stroke="var(--line)"
            />
            <circle cx="222" cy="139" r="15" fill="var(--signal)" />
            {[58, 124, 190].map((y) => (
              <g key={y} transform={`translate(400 ${y})`}>
                <path
                  d="M0 0H90L106 16V48H0Z"
                  fill="var(--ink)"
                  stroke="var(--line)"
                />
                <path d="M90 0V16H106" fill="none" stroke="var(--signal)" />
              </g>
            ))}
          </svg>
        </div>
      </section>
    ),
  },
);

export function LazyConversionStory() {
  return <ConversionStory />;
}
