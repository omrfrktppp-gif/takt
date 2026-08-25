---
title: "Geometric Tolerancing (GD&T): Tolerancing Function, Not Dimension"
description: "GD&T and tolerance stacking: why is it wrong to give tight tolerances to every dimension? How to reduce cost without locking the assembly with functional tolerancing?"
slug: "geometrik-toleranslama-gdt"
date: 2026-04-01
updated: 2026-07-25
status: published
kind: article
author: "Ömer Faruk"
category: "DFM/DFA"
tags: ["gdt", "tolerans-yigilmasi", "toleranslama", "dfm", "montaj-optimizasyonu"]
keywords:
  primary: "geometric tolerancing (GD&T)"
  secondary: ["tolerance buildup", "What is GD&T", "functional tolerance", "datum reference"]
cover:
  src: "images/cover.jpg"
  alt: "GD&T diagram showing tolerance stacking in an assembly chain"
canonical: "https://takt.tr/en/blog/geometrik-toleranslama-gdt"
og:
  type: "article"
  image: "images/cover.jpg"
schema: "TechArticle"
reading_time: 6
---
## Geometric Tolerancing (GD&T): Tolerancing Function, Not Dimension

Geometric dimensioning and tolerancing (GD&T) is the definition language that links tolerance to the function of the part, not to individual dimensions: geometric relationships such as position, perpendicularity, parallelism and profile are defined through references (datum); Critical dimensions are left tight, and those that do not affect the function are deliberately left loose. This language is described by two basic standards: On the American side [ASME Y14.5](https://www.asme.org/codes-standards/find-codes-standards/y14-5-dimensioning-tolerancing), In the international GPS system [ISO 1101](https://www.iso.org/standard/66777.html).

Why is it necessary? Because one of the most confusing situations in the workshop is this: when the parts are measured one by one, each measurement is within the limits; But when the parts come together, the assembly does not fit. Most of the time the problem is not in production but in how tolerances are defined. Writing tight tolerances on every dimension does not make the part correct; it just makes it expensive.

### How to Differentiate from GD&T Classic ± Tolerancing?

In classical ± tolerancing, each dimension is an independent box; It ensures that the part looks correct on paper. GD&T, on the other hand, defines how the feature must be positioned to fulfill its function; ensures correct operation of the part in the field.

| Feature | Classic ± tolerance | GD&T |
| --- | --- | --- |
| Reference | The measure itself | Defined datum system |
| Checked | Length/diameter values ​​| Location, direction, form, profile relationships |
| Function link | Indirect | Direct (derived from functional surface) |
| Measurement uncertainty | Reference may be arbitrary | The measurement is made from the defined reference |

### How Tolerance Clutch Locks Up the Assembly?

Consider an assembly chain: four parts joined together, each manufactured to a tolerance of ±0.2 mm. In the worst case the total deviation simply adds up:

`T_toplam = 0,2 + 0,2 + 0,2 + 0,2 = 0,8 mm`

With a statistical (RSS — square root of the sum of squares) approach, deviations are unlikely to be at their worst at the same time.:

`T_toplam = √(0,2² + 0,2² + 0,2² + 0,2²) ≈ 0,4 mm`

Both results show the same truth: individual tolerances accumulate in the chain. Even if a single part "passes", a deflection may occur at the end of the chain that will impair function. Tolerance stacking is the source of parts that are correct individually but wrong together. Field example of reducing this problem with geometry [In our CFA case study](https://takt.tr/en/blog/montaja-yonelik-tasarim-dfa) we told you.

### Why "Tight Tolerance Everywhere" Is Wrong?

When the designer wants to be sure, he tends to write tight tolerances on all dimensions. This appears to reduce risk but creates three new problems:

- **Cost increases:** Closer tolerance means more precise machine, more measurements and more scrap.
- **The actual critical measure is hidden:** If everything is critical, nothing is critical; production cannot distinguish the measure that really matters.
- **Function still not guaranteed:** Close tolerance can still make the part non-functional if measured from the wrong reference.

GD&T does the opposite: critical functional measures are tightly defined with clear references, the rest are relaxed. Tolerance is distributed according to need. The response of the tolerance on the process side — whether the process can actually hold this tolerance — [process capability (Cp/Cpk) in our article](https://takt.tr/en/blog/six-sigma-surec-yetenegi) we are considering.

### How to Perform Back Tolerancing from a Function?

The logic of functional tolerancing works in reverse:

1. It is determined which surface of the part contacts what and what it positions..
2. These surfaces are defined as datum (reference)..
3. The tolerance is derived from these references and the functional requirement.

Thus, the dimensions that determine the assembly are defined tightly and referenced, the remaining dimensions are loosened, reducing the production cost and the tolerance budget is distributed throughout the chain in a way that preserves the function..

### Limits and Practical Warnings

GD&T is not free: both the creator and the reader of the drawing need to know the language, and the measurement side (CMM, suitable jigs) must be set up according to the reference system. If your suppliers cannot read GD&T, symbols added to the drawing produce confusion, not assurance. In this case, the transition should be made gradually; A few critical features that determine the assembly must first be defined with reference.

### Which Products Have Priority??

Multi-part assemblies, welded constructions and mechanisms that require precise seating are the structures most susceptible to tolerance accumulation. If you hear "The individual parts are correct, but the assembly doesn't fit", the problem is almost always in the tolerance definition.

---

**Are there problems with assembly even though your parts are measured one by one?** At Takt, we examine your products with GD&T and tolerance chain analysis; By redistributing tolerances according to function, we ensure assembly and reduce production costs.. [Contact / Request tolerance analysis.](https://takt.tr/en/iletisim)

## Resources

- [ASME Y14.5 — Dimensioning and Tolerancing (standard page)](https://www.asme.org/codes-standards/find-codes-standards/y14-5-dimensioning-tolerancing)
- [ISO 1101:2017 — Geometrical product specifications (GPS): Geometrical tolerance](https://www.iso.org/standard/66777.html)
