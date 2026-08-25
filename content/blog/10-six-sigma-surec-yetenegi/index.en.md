---
title: "Six Sigma and Process Capability: Measuring the Process, Not the Single Part"
description: "What is process capability (Cp/Cpk)? We explain the difference between a part being 'passable' and the process being repeatable with an example calculation.."
slug: "six-sigma-surec-yetenegi"
date: 2026-04-22
updated: 2026-07-25
status: published
kind: article
author: "Ömer Faruk"
category: "Quality Principles"
tags: ["six-sigma", "cp-cpk", "surec-yetenegi", "kalite", "varyasyon"]
keywords:
  primary: "process capability Cp Cpk"
  secondary: ["What is six sigma?", "cpk calculation", "process capability", "variation control"]
cover:
  src: "images/cover.jpg"
  alt: "Diagram of process capability distribution and tolerance limits with Cp/Cpk"
canonical: "https://takt.tr/en/blog/six-sigma-surec-yetenegi"
og:
  type: "article"
  image: "images/cover.jpg"
schema: "TechArticle"
reading_time: 6
---
## Six Sigma and Process Capability: Measuring the Process, Not the Single Part

Process capability, [It is a statistical approach that measures how easily the output of a controlled process fits within tolerance limits with capability indices such as Cp and Cpk.](https://www.itl.nist.gov/div898/handbook/pmc/section1/pmc16.htm). One-sentence answer: it is an event when a part "passes" the measure; The passing of each part is an ability that depends on the ratio of the tolerance to the scatter of the process — and this ratio can be calculated.

You measured a part, it was within tolerance, and you said "it passes". But that doesn't mean the next part will pass. Quality lies not in a single part, but in the repeatability of the process. This distinction lies at the basis of Six Sigma.

### How to Calculate Cp and Cpk?

Process capability looks at two things: the scatter of the process (standard deviation, σ) and the tolerance width (USL − LSL, between the upper and lower limit).. [Defined by the NIST/SEMATECH e-Handbook](https://www.itl.nist.gov/div898/handbook/pmc/section1/pmc16.htm) two basic indexes:

`Cp = (USL − LSL) / (6σ)`

`Cpk = min[ (USL − μ) / (3σ), (μ − LSL) / (3σ) ]`

`Cp` tells you how narrow the scatter of the process is compared to the tolerance; but it doesn't see whether the process is centered or not. `Cpk` It also takes into account the shift of the mean (μ) relative to the center. For this reason `Cpk`, is a more honest measure of true talent.

### Example: Passable But Not Skilled

Let the tolerance be 10.0 ± 0.3 mm (USL = 10.3; LSL = 9.7). Process mean μ = 10.0 and standard deviation σ = 0.1 mm:

`Cp = (10,3 − 9,7) / (6 × 0,1) = 0,6 / 0,6 = 1,0`

`Cpk = min[ (10,3 − 10,0)/0,3, (10,0 − 9,7)/0,3 ] = 1,0`

Cpk = 1.0 indicates that the process is at full limit: [Assuming a normal distribution, this means approximately 0.27% (2.7 per thousand) of scrap, and a small shift instantly magnifies this rate](https://www.itl.nist.gov/div898/handbook/pmc/section1/pmc16.htm). In industry, higher targets (e.g. Cpk ≥ 1.33; ratio of tolerance to 8σ) are therefore often used—a safe buffer between tolerance and process. The same parts may "pass" individually; But when the process is not skilled, it's a matter of luck.

| Cp (if process is centered) | Tolerance / scatter | Expected discard |
| --- | --- | --- |
| 1,00 | 6σ | %0,27 |
| 1.33 | 8σ | 64ppm |
| 1.66 | 10σ | 0.6ppm |
| 2.00 | 12σ | 2ppb |

(Source: [NIST/SEMATECH e-Handbook, "What is Process Capability?"](https://www.itl.nist.gov/div898/handbook/pmc/section1/pmc16.htm))

### Why One Part Misleads?

A single part measurement is a snapshot of the process at the moment; It does not show scattering, drift or bias. Process capability looks at the entire distribution. A process does not pass tomorrow just because it passed today; talent is the capacity to remain consistent over time.

### Limits and Prerequisites

The Cp/Cpk calculation relies on two assumptions, both of which are frequently violated in the field. first one, [the process must be under statistical control and the data must be approximately normally distributed; also requires a sufficient sample (in practice dozens of independent measurements) for a reliable estimate](https://www.itl.nist.gov/div898/handbook/pmc/section1/pmc16.htm). Cpk calculated in an uncontrolled (trending, jumping) process is instantaneous and misleading. Second, the index is affected by the measurement system itself: measurement uncertainty is introduced into process scattering. First comes the measurement system, then control, and lastly talent analysis..

The correct definition of the tolerance itself is a separate issue: even if the Cpk of a narrow tolerance given from the wrong reference is high, the part may remain dysfunctional. this link [In our article on GD&T](https://takt.tr/en/blog/geometrik-toleranslama-gdt) We consider; For a way to reduce scattering at the design stage [Taguchi robust design article](https://takt.tr/en/blog/taguchi-robust-tasarim) you can look.

### When to do it?

Any process that engages in mass production, has fluctuating scrap rates, or whose customers require quality consistency is open to capability analysis. "Sometimes it works, sometimes it doesn't" is almost always a sign of low process ability.

---

**Is your production sometimes successful and sometimes discarded?** At Takt, we examine your processes with Six Sigma and process capability (Cp/Cpk) analysis; We find the source of the scattering and make the process reliable by removing the monolithic chance. [Contact / Request process capability analysis.](https://takt.tr/en/iletisim)

## Resources

- [What is Process Capability? — NIST/SEMATECH e-Handbook of Statistical Methods](https://www.itl.nist.gov/div898/handbook/pmc/section1/pmc16.htm)
- [Process Capability — American Society for Quality (ASQ)](https://asq.org/quality-resources/process-capability)
