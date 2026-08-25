---
title: "FMEA: Predicting Failure Before It Happens, Not Repairing It"
description: "What is FMEA (failure mode and effects analysis)? We explain with an example the method of predicting failures at the design stage by quantifying the risk with RPN.."
slug: "fmea-hata-turu-etki-analizi"
date: 2026-04-16
updated: 2026-07-25
status: published
kind: article
author: "Ömer Faruk"
category: "Quality Principles"
tags: ["fmea", "rpn", "risk-analizi", "kalite", "onleyici-tasarim"]
keywords:
  primary: "FMEA error mode impact analysis"
  secondary: ["What is FMEA", "RPN calculation", "risk prioritization", "preventive design"]
cover:
  src: "images/cover.jpg"
  alt: "Risk prioritization scheme with FMEA table and RPN"
canonical: "https://takt.tr/en/blog/fmea-hata-turu-etki-analizi"
og:
  type: "article"
  image: "images/cover.jpg"
schema: "TechArticle"
reading_time: 6
---
## FMEA: Predicting Failure Before It Happens, Not Repairing It

FMEA (Failure Mode and Effects Analysis), [It is a step-by-step risk analysis method that systematically reveals possible failure modes of a product or process before they occur.](https://asq.org/quality-resources/fmea). Every potential failure; It is scored in terms of severity, probability and detectability, risks are ranked on the same scale and precautions are taken starting from the riskiest one..

Why is it valuable? When a fault occurs in the field, it is expensive to repair it: the line stops, parts are replaced, trust is shaken. If the same malfunction had been foreseen at the design stage, it would have cost as little as a line of notes. The difference is when you see the problem.

### What Questions Does FMEA Ask??

FMEA asks “how can this part/process break down and what happens if it does?” asks the question systematically. Three things are evaluated for every potential failure:

| Size | Question | Scale |
| --- | --- | --- |
| Violence (S) | If there is a malfunction, how severe is the impact? | 1–10 |
| Probability (O) | How often does this malfunction occur? | 1–10 |
| Detectability (D) | How easy is it to catch it before it reaches the customer? | 1–10 (high if elusive) |

FMEA is not a prediction, but a structured prediction. By evaluating each malfunction with the same scale, it turns the feeling of "I don't feel good" into a talkable number..

### How to Calculate RPN?

Risk Priority Number is obtained by multiplying three values:

`RPN = S × O × D`

For example, a fault that has a high severity (S=8), occurs infrequently (O=2) but is difficult to detect (D=7).:

`RPN = 8 × 2 × 7 = 112`

On the other hand, a fault that occurs frequently but is harmless and easily seen receives a low RPN. This way, the team focuses on the one that's actually riskiest, not the "loudest" problem. The real value of RPN is not that it gives an exact number, but that it ranks and prioritizes risks on the same scale.

A current note: on the automotive side, published in 2019 [AIAG & VDA FMEA Handbook](https://www.aiag.org/training-and-resources/manuals/details/FMEAAV-1), Introduced Action Priority (AP) tables instead of RPN; Instead of multiplying the three scores by equal weight, AP prioritizes H/M/L by considering severity first, then probability and detectability. If you work in the automotive supply chain, it is necessary to clarify what methodology your customer expects; RPN's "two different risk profiles can produce the same number" vulnerability is the main justification for this transition.

### Detectability: Most Missed Dimension

Violence and possibility are intuitive; detectability is often overlooked. However, the later a malfunction is detected, the more expensive it is. Here [Poka-Yoke](https://takt.tr/en/blog/poka-yoke-hata-onleyici-tasarim) Combines FMEA: if you treat a hard-to-detect fault (high D) with a geometry that makes it physically impossible, you suddenly reduce both the probability and the risk of detectability. FMEA shows where to intervene; design makes that intervention.

### What are its limits??

The quality of FMEA is limited to the knowledge of the team sitting at the table: faults that no one thinks of will not enter the table. Scoring is subjectivity; Two teams may give different S-O-D to the same malfunction. Therefore, FMEA should not be managed as a one-time document, but as a living document fed by field data — each new type of fault coming from the field should be recorded in the table, and the scores should be updated after the measures taken. For the systematics of data collection from the field [our predictive maintenance article](https://takt.tr/en/blog/kestirimci-bakim) you can look.

### When to do it?

FMEA produces the highest value when commissioning a new product, a new machine or a critical process. If field failure is recurring or the reliability of a product is uncertain, FMEA makes the risk visible and manageable.

---

**Do you want to foresee the risk of failure when commissioning a new product or machine?** At Takt, we carry out design and process FMEA studies; We prioritize risks and prevent the most critical failures in design before they even enter production.. [Contact / Request FMEA study.](https://takt.tr/en/iletisim)

## Resources

- [Failure Mode and Effects Analysis (FMEA) — American Society for Quality (ASQ)](https://asq.org/quality-resources/fmea)
- [AIAG & VDA FMEA Handbook — Automotive Industry Action Group](https://www.aiag.org/training-and-resources/manuals/details/FMEAAV-1)
