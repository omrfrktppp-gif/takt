import { EngineeringMachineScene } from "@/components/home/EngineeringMachineScene";
import styles from "./EngineeringMachineScene.module.css";

const steps = [
  {
    number: "01",
    title: "Darboğazı görünür kılarız.",
    text: "İhtiyacı, bağımlılıkları ve eksik teknik girdileri aynı çerçevede toplarız.",
  },
  {
    number: "02",
    title: "Parçaları doğru eksene alırız.",
    text: "Tasarım, analiz ve üretim kararlarını birbiriyle çalışacak biçimde düzenleriz.",
  },
  {
    number: "03",
    title: "Sistemi birlikte doğrularız.",
    text: "Kontrol noktalarını netleştirir, işi ekibinizin çalışma ritmine bağlarız.",
  },
  {
    number: "04",
    title: "Kullanılabilir çıktıyla kapatırız.",
    text: "Model, teknik resim, analiz notu ve imalat paketi sizde devam edebilir.",
  },
] as const;

const outputs = [
  ["3B MODEL", 88],
  ["TEKNİK RESİM", 178],
  ["ANALİZ NOTU", 268],
  ["İMALAT PAKETİ", 358],
] as const;

export function ConversionStory() {
  return (
    <EngineeringMachineScene>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className="font-mono text-eyebrow uppercase tracking-[0.12em] text-white/55">
            Mühendislik akışı
          </p>
          <div>
            <h2
              id="engineering-scene-title"
              className="mt-3 max-w-3xl font-display text-h2 text-white lg:mt-0"
            >
              Sıkışan işi, çalışan bir teknik sisteme dönüştürüyoruz.
            </h2>
            <p className="mt-4 max-w-2xl text-body text-white/65">
              Önce resmi netleştirir, sonra parçaları aynı eksende buluştururuz.
              Sonuç; ekibinizin kullanabileceği, devredilebilir teknik çıktıdır.
            </p>
          </div>
        </div>

        <div className={styles.layout}>
          <div className={styles.visual}>
            <div className={styles.parallax}>
              <svg
                className={styles.svg}
                viewBox="0 0 760 520"
                role="img"
                aria-labelledby="machine-svg-title machine-svg-description"
                preserveAspectRatio="xMidYMid meet"
              >
                <title id="machine-svg-title">
                  Teknik girdiden imalata hazır çıktıya mühendislik akışı
                </title>
                <desc id="machine-svg-description">
                  Darboğaz tespiti, ayrıştırılmış parçalar, eksen üzerinde
                  montaj, tamamlanmış endüstriyel makine ve teslim dosyaları.
                </desc>
                <defs>
                  <pattern
                    id="engineering-grid-small"
                    width="16"
                    height="16"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M16 0H0V16"
                      fill="none"
                      stroke="var(--line)"
                      strokeOpacity="0.1"
                    />
                  </pattern>
                  <pattern
                    id="engineering-grid"
                    width="80"
                    height="80"
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      width="80"
                      height="80"
                      fill="url(#engineering-grid-small)"
                    />
                    <path
                      d="M80 0H0V80"
                      fill="none"
                      stroke="var(--line)"
                      strokeOpacity="0.18"
                    />
                  </pattern>
                  <linearGradient id="machine-face" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="var(--paper)" />
                    <stop offset="1" stopColor="var(--line)" />
                  </linearGradient>
                </defs>

                <rect width="760" height="520" fill="url(#engineering-grid)" />
                <path
                  d="M48 456H712"
                  stroke="var(--line)"
                  strokeOpacity="0.28"
                />
                <path
                  d="M380 48V472"
                  stroke="var(--signal)"
                  strokeDasharray="5 8"
                  strokeOpacity="0.42"
                />

                <g className={styles.blueprint}>
                  <g
                    fill="none"
                    stroke="var(--line)"
                    strokeWidth="1.5"
                    strokeOpacity="0.75"
                  >
                    <rect x="192" y="362" width="376" height="58" />
                    <rect x="228" y="176" width="54" height="186" />
                    <rect x="478" y="176" width="54" height="186" />
                    <rect x="272" y="136" width="216" height="92" />
                    <circle cx="380" cy="248" r="28" />
                    <path d="M380 276V362M188 442H572M188 434V450M572 434V450" />
                    <path d="M164 362V420M156 362H172M156 420H172" />
                  </g>
                  <g
                    fill="var(--line)"
                    fillOpacity="0.7"
                    fontFamily="var(--font-mono), monospace"
                    fontSize="11"
                    letterSpacing="1"
                  >
                    <text x="348" y="458">ANA EKSEN</text>
                    <text x="350" y="438">380 mm</text>
                    <text x="116" y="395">258</text>
                  </g>
                  <path
                    d="M98 112H276L316 152H456"
                    fill="none"
                    stroke="var(--signal)"
                    strokeWidth="2"
                  />
                  <circle cx="316" cy="152" r="7" fill="var(--signal)" />
                  <rect
                    x="68"
                    y="82"
                    width="164"
                    height="44"
                    fill="var(--ink)"
                    stroke="var(--signal)"
                  />
                  <text
                    x="84"
                    y="108"
                    fill="var(--white)"
                    fontFamily="var(--font-mono), monospace"
                    fontSize="11"
                    letterSpacing="1"
                  >
                    DARBOĞAZ / GİRDİ
                  </text>
                </g>

                <g className={styles.exploded}>
                  <g className={styles.base}>
                    <path
                      d="M192 362H568V420H192Z"
                      fill="var(--steel)"
                      stroke="var(--paper)"
                      strokeWidth="2"
                    />
                    <path
                      d="M212 378H548"
                      stroke="var(--line)"
                      strokeOpacity="0.55"
                    />
                  </g>
                  <g className={styles.leftPost}>
                    <rect
                      x="228"
                      y="176"
                      width="54"
                      height="186"
                      fill="var(--steel)"
                      stroke="var(--paper)"
                      strokeWidth="2"
                    />
                    <path
                      d="M242 190V346"
                      stroke="var(--line)"
                      strokeOpacity="0.42"
                    />
                  </g>
                  <g className={styles.rightPost}>
                    <rect
                      x="478"
                      y="176"
                      width="54"
                      height="186"
                      fill="var(--steel)"
                      stroke="var(--paper)"
                      strokeWidth="2"
                    />
                    <path
                      d="M518 190V346"
                      stroke="var(--line)"
                      strokeOpacity="0.42"
                    />
                  </g>
                  <g className={styles.head}>
                    <rect
                      x="272"
                      y="136"
                      width="216"
                      height="92"
                      fill="url(#machine-face)"
                      stroke="var(--paper)"
                      strokeWidth="2"
                    />
                    <rect x="292" y="157" width="92" height="16" fill="var(--ink)" />
                    <circle cx="456" cy="164" r="8" fill="var(--signal)" />
                  </g>
                  <g className={styles.motor}>
                    <rect
                      x="488"
                      y="126"
                      width="82"
                      height="82"
                      fill="var(--ink)"
                      stroke="var(--paper)"
                      strokeWidth="2"
                    />
                    <path
                      d="M505 140V194M518 140V194M531 140V194M544 140V194"
                      stroke="var(--line)"
                      strokeOpacity="0.55"
                    />
                  </g>
                  <g className={styles.tool}>
                    <circle
                      cx="380"
                      cy="248"
                      r="28"
                      fill="var(--ink)"
                      stroke="var(--paper)"
                      strokeWidth="2"
                    />
                    <path
                      d="M380 276V342"
                      stroke="var(--paper)"
                      strokeWidth="10"
                    />
                    <path d="M364 342H396L388 362H372Z" fill="var(--signal)" />
                  </g>
                </g>

                <g className={styles.assembled}>
                  <path
                    d="M192 362H568V420H192Z"
                    fill="var(--steel)"
                    stroke="var(--paper)"
                    strokeWidth="2"
                  />
                  <path
                    d="M208 420V438M552 420V438"
                    stroke="var(--paper)"
                    strokeWidth="8"
                  />
                  <rect
                    x="228"
                    y="176"
                    width="54"
                    height="186"
                    fill="var(--steel)"
                    stroke="var(--paper)"
                    strokeWidth="2"
                  />
                  <rect
                    x="478"
                    y="176"
                    width="54"
                    height="186"
                    fill="var(--steel)"
                    stroke="var(--paper)"
                    strokeWidth="2"
                  />
                  <path d="M282 200H478" stroke="var(--line)" strokeWidth="5" />
                  <rect
                    x="272"
                    y="136"
                    width="216"
                    height="92"
                    fill="url(#machine-face)"
                    stroke="var(--paper)"
                    strokeWidth="2"
                  />
                  <rect x="292" y="157" width="92" height="16" fill="var(--ink)" />
                  <path d="M300 183H390" stroke="var(--steel)" strokeWidth="2" />
                  <circle cx="456" cy="164" r="8" fill="var(--signal)" />
                  <rect
                    x="488"
                    y="126"
                    width="82"
                    height="82"
                    fill="var(--ink)"
                    stroke="var(--paper)"
                    strokeWidth="2"
                  />
                  <path
                    d="M505 140V194M518 140V194M531 140V194M544 140V194"
                    stroke="var(--line)"
                    strokeOpacity="0.55"
                  />
                  <circle
                    cx="380"
                    cy="248"
                    r="28"
                    fill="var(--ink)"
                    stroke="var(--paper)"
                    strokeWidth="2"
                  />
                  <circle cx="380" cy="248" r="8" fill="var(--signal)" />
                  <path
                    d="M380 276V342"
                    stroke="var(--paper)"
                    strokeWidth="10"
                  />
                  <path d="M364 342H396L388 362H372Z" fill="var(--signal)" />
                  <path
                    d="M212 378H548"
                    stroke="var(--line)"
                    strokeOpacity="0.55"
                  />
                </g>

                <g className={styles.outputs}>
                  {outputs.map(([label, y]) => (
                    <g key={label} transform={`translate(584 ${y})`}>
                      <path
                        d="M0 0H112L132 20V62H0Z"
                        fill="var(--ink)"
                        stroke="var(--line)"
                      />
                      <path
                        d="M112 0V20H132"
                        fill="none"
                        stroke="var(--signal)"
                      />
                      <path
                        d="M16 22H78M16 34H98"
                        stroke="var(--line)"
                        strokeOpacity="0.48"
                      />
                      <text
                        x="16"
                        y="52"
                        fill="var(--paper)"
                        fontFamily="var(--font-mono), monospace"
                        fontSize="9"
                        letterSpacing="0.7"
                      >
                        {label}
                      </text>
                    </g>
                  ))}
                </g>
              </svg>
            </div>
            <span className={styles.status} aria-hidden="true">
              Kaydırarak sistemi birleştirin
            </span>
          </div>

          <ol className={styles.steps}>
            {steps.map((step) => (
              <li key={step.number} className={styles.step}>
                <span className={styles.stepNumber}>{step.number}</span>
                <div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepText}>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </EngineeringMachineScene>
  );
}
