---
title: "Modal Analysis: Avoiding Resonance, Not Silencing Vibration"
description: "What is modal analysis, why is resonance dangerous? Natural frequency, drive frequency separation and preventing vibration problems in design — a practical guide."
slug: "modal-titresim-analizi"
date: 2026-06-27
updated: 2026-07-25
status: published
kind: article
author: "Ömer Faruk Top"
category: "Field & Analysis"
tags: ["modal-analiz", "titresim", "rezonans", "dogal-frekans", "fea"]
keywords:
  primary: "modal analysis (natural frequency)"
  secondary: ["What is modal analysis?", "What is resonance?", "natural frequency calculation", "vibration analysis"]
cover:
  src: "images/cover.jpg"
  alt: "Modal analysis result showing the mode shapes of a machine chassis"
canonical: "https://takt.tr/en/blog/modal-titresim-analizi"
og:
  type: "article"
  image: "images/cover.jpg"
schema: "TechArticle"
reading_time: 6
---
## Modal Analysis: Avoiding Resonance, Not Silencing Vibration

Modal analysis is the analysis that determines the natural frequencies of a structure and the shapes (mode shapes) it takes at these frequencies; Its purpose is not to suppress vibration, but to prevent the natural frequencies of the structure from overlapping the drive frequencies during operation - that is, resonance - at the design stage. Every structure has its "preferred" frequencies of oscillation, even when no force is applied to it; The problem begins when a periodic force coming from outside coincides with one of these frequencies..

Vibration problems are often noticed in the field after the machine starts working: noise, loose connections, cracked welds. At that stage, the solution is expensive. Modal analysis makes this problem visible at the design table, before production.

## Why Resonance Is So Dangerous?

The energy entering the structure during resonance accumulates in each cycle; A seemingly small and innocent driving force reaches growing amplitudes when it coincides with the natural frequency. The result is about the frequency of the force, not its magnitude — so in the field it's "how does such a small engine shake this chassis?" surprise occurs. The limit of the amplitude is determined only by the damping in the structure, and structural damping is generally low in steel constructions.

One of the best-known examples in engineering history is the Tacoma Narrows Bridge, which collapsed in 1940 due to wind-induced vibration; The mechanism and lessons of the event [Official history of the Washington State Department of Transportation](https://www.wsdot.wa.gov/TNBhistory/) documented. This lesson learned at the bridge scale applies every day at the machine frame scale: the structure must not be caught "unprepared" for the drive frequency.

## What Does Modal Analysis Say??

Modal analysis produces two basic outputs:

- **Natural frequencies:** List of frequencies at which the structure can resonate.
- **Mode shapes:** How the structure changes shape at each natural frequency — which region moves the most.

These two parts of information translate into the design decision as follows: the excitation sources in the machine (motor speed, gear engagement frequency, pump vane frequency, imbalance) are listed and compared with the natural frequencies. If there is overlap or closeness, the design is changed: the stiffness is increased (frequency increases), the mass distribution is changed, or the drive frequency is shifted. The mode shape shows where to intervene — a boost added to the area with the most movement shifts the frequency most efficiently.

## Is Static Analysis Not Enough??

It is not. [In our FEA article](https://takt.tr/en/blog/sonlu-elemanlar-analizi-fea) The static analysis we are considering is "Can this structure carry this load?" answers the question; modal analysis is "Will this structure vibrate in this period?" to the question. A chassis that is too statically safe will create problems in the field when its first natural frequency coincides with the engine speed. Modal verification must be included alongside static verification on every chassis carrying rotating equipment.

Modal analysis also has its limits: the accuracy of the result depends strongly on the fidelity of the boundary conditions (how the structure is supported), and the stiffness of the bolted connections affects the model. Calculated frequencies at critical structures must be verified in the field by experimental modal testing (hammer test or operational measurement) — [In our FEA article](https://takt.tr/en/blog/sonlu-elemanlar-analizi-fea) The principle of "predict, verify with experiment" also applies here.

## When Should You Request Modal Analysis??

| Status | Is modal analysis necessary? |
| --- | --- |
| There is rotating equipment (motor, fan, pump) on the chassis/platform | Yes — excitation frequencies should be compared to natural frequencies |
| Complaints about noise in the field, loose bolts, cracked welds | Yes — the current problem is most likely caused by resonance |
| Wide speed range is scanned with variable speed drive (VSD) | Yes — every frequency within range potential overlap |
| Structure carrying only static load, no drive | Usually not — static analysis may be sufficient |

## Conclusion

Modal analysis prevents the resonance problem at the design stage by making the natural frequencies and mode shapes of the structure visible before production. The vibration problem is one of the most expensive problems to solve in the field; Preventing it on the table is often as simple as a support sheet or increased rigidity. No structure carrying rotating equipment should be considered "finished" without modal verification.

---

**Does your machine have noise, loose connections or vibration that you cannot explain?** We tactfully calculate the natural frequencies of your structures, compare them with your drive sources and solve the resonance risk at the design stage.. [Our analysis and calculation service](https://takt.tr/en/hizmetler/analiz-hesaplama) browse or [contact us](https://takt.tr/en/iletisim).

## Resources

- [Tacoma Narrows Bridge History — Washington State Department of Transportation](https://www.wsdot.wa.gov/TNBhistory/) (The official history of the 1940 collapse and its engineering lessons)
