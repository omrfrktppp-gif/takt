"use client";

import { useEffect, useRef, useState } from "react";
import { Cadence } from "@/components/Cadence";

const storySteps = [
  {
    id: "tespit",
    eyebrow: "01 · Tespit",
    title: "Önce teknik darboğazı görünür kılarız.",
    description:
      "Sorunu yalnızca tarif etmekle kalmaz; kararları, bağımlılıkları ve eksik teknik girdileri aynı çerçevede toplarız.",
    output: "Netleştirilmiş ihtiyaç ve öncelik sırası",
  },
  {
    id: "ritim",
    eyebrow: "02 · Ritim",
    title: "İşi ekibinizin temposuna bağlarız.",
    description:
      "Kapsamı, sorumlulukları ve kontrol noktalarını yazılı hale getirir; süreci görünür bir çalışma ritmiyle yürütürüz.",
    output: "Kapsam, takvim ve takip düzeni",
  },
  {
    id: "teslim",
    eyebrow: "03 · Teslim",
    title: "Kararı kullanılabilir çıktıya dönüştürürüz.",
    description:
      "Model, teknik resim, analiz, rapor veya üretim koordinasyonu: iş sizde devam edebilecek biçimde kapanır.",
    output: "Devredilebilir teknik çıktı",
  },
] as const;

export function ConversionStory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visibleEntry) return;
        const nextIndex = Number(
          (visibleEntry.target as HTMLElement).dataset.storyIndex,
        );
        if (Number.isFinite(nextIndex)) setActiveIndex(nextIndex);
      },
      {
        rootMargin: "-30% 0px -45% 0px",
        threshold: [0.2, 0.5, 0.8],
      },
    );

    stepRefs.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="border-b border-line bg-ink text-white"
      aria-labelledby="home-calisma-ritmi"
    >
      <div className="mx-auto grid w-full max-w-content gap-12 px-4 py-20 md:px-6 md:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-mono text-eyebrow uppercase tracking-[0.12em] text-white/55">
            Çalışma ritmi
          </p>
          <h2
            id="home-calisma-ritmi"
            className="mt-4 max-w-md font-display text-h2 text-white"
          >
            Belirsizlikten, takip edilebilir teknik ilerlemeye.
          </h2>
          <p className="mt-5 max-w-md text-body text-white/65">
            Her adım bir sonrakinin girdisini üretir. Böylece proje yalnızca
            ilerlemiş görünmez; gerçekten karar verilebilir hale gelir.
          </p>
          <Cadence
            variant="divider"
            activeIndex={activeIndex + 2}
            pulseKey={storySteps[activeIndex].id}
            className="mt-10"
          />
          <p className="mt-5 font-mono text-small text-white/55" aria-live="polite">
            {storySteps[activeIndex].output}
          </p>
        </div>

        <ol className="space-y-8 lg:space-y-16">
          {storySteps.map((step, index) => {
            const active = index === activeIndex;
            return (
              <li key={step.id}>
                <article
                  ref={(element) => {
                    stepRefs.current[index] = element;
                  }}
                  data-story-index={index}
                  className={`min-h-[46vh] border-l px-6 py-10 transition-all duration-500 md:px-10 lg:flex lg:min-h-[58vh] lg:flex-col lg:justify-center ${
                    active
                      ? "border-signal bg-white/[0.06]"
                      : "border-white/15"
                  }`}
                >
                  <p className="font-mono text-eyebrow uppercase tracking-[0.12em] text-[#8ba8ff]">
                    {step.eyebrow}
                  </p>
                  <h3
                    className={`mt-5 max-w-xl font-display text-h2 transition-colors duration-500 ${
                      active ? "text-white" : "text-white/65"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`mt-5 max-w-xl text-body-lg transition-colors duration-500 ${
                      active ? "text-white/75" : "text-white/65"
                    }`}
                  >
                    {step.description}
                  </p>
                  <div className="mt-10 border-t border-white/15 pt-5">
                    <p className="font-mono text-eyebrow uppercase tracking-[0.08em] text-white/65">
                      Bu adımın çıktısı
                    </p>
                    <p className="mt-2 text-body text-white">{step.output}</p>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
