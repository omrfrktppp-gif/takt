---
title: "Thermal Expansion Management: Directing Expansion, Not Suppressing it"
description: "How is thermal expansion in high-temperature systems calculated, verified by experiment, and managed with controlled freedom? Field example from a tunnel kiln project."
slug: "termal-genlesme-yonetimi"
date: 2026-05-07
updated: 2026-07-25
status: published
kind: case-study
author: "Ömer Faruk"
category: "Field & Analysis"
tags: ["termal-genlesme", "makine-tasarimi", "termal-gerilme", "pik-dokum", "yuksek-sicaklik"]
keywords:
  primary: "thermal expansion calculation machine design"
  secondary: ["What is thermal expansion?", "thermal stress", "slot mounting", "high temperature design"]
cover:
  src: "images/cover.jpg"
  alt: "Conveyor design that directs thermal expansion at high temperatures with slot mounting"
canonical: "https://takt.tr/en/blog/termal-genlesme-yonetimi"
og:
  type: "article"
  image: "images/cover.jpg"
schema: "TechArticle"
reading_time: 7
---
## Thermal Expansion Management: Directing Expansion, Not Suppressing it

In a machine operating at high temperature, thermal expansion is not prevented; It is calculated, verified by experiment, and managed by releasing it on a defined axis. In this case study, we describe how we applied this approach in a tunnel kiln project rising from 25 °C to approximately 450 °C: a representative 1374 mm cast iron carrier element was calculated to extend by approximately 6.1 mm, this value was verified by controlled heating experiments on the prototype, and the elongation was released in a controlled manner by slotted assembly parallel to the direction of expansion.

If a stone-lined conveyor operates in a narrow space guided by rails consisting of floor and side walls, assuming that the cast parts that make up the conveyor will remain within the dimensions defined in the CAD with temperature change is a fundamental design error that can lead to the system locking up. The question is not whether expansion will happen, but where it will go.

### How to Calculate Thermal Expansion?

Linear thermal expansion, [The expansion coefficient of the material is multiplied by the initial length and temperature difference.](http://hyperphysics.phy-astr.gsu.edu/hbase/thermo/thexp.html) is calculated:

`ΔL = α · L₀ · ΔT`

The system ramps up from 25 °C to approximately 450 °C; temperature difference `ΔT ≈ 425 °C`. The average coefficient of linear expansion for cast iron (grey) casting is approx. `α ≈ 10–11 × 10⁻⁶ 1/°C` is taken; for example [Typical value for ASTM A48 Class 30 gray casting is 10.5 × 10⁻⁶ 1/°C](https://www.pentictonfoundry.com/news/gray-iron-astm-a48-class-30/). For representative load-bearing element (L₀ = 1374 mm, α = 10.5 × 10⁻⁶ 1/°C):

`ΔL = 10,5 × 10⁻⁶ · 1374 · 425 ≈ 6,1 mm`

A single cast element extends approximately 6 mm. In a system that operates guided within the rail and has a limited width, this size is at a level that will directly change the contact conditions..

### What Happens If Expansion Is Blocked??

If extension is completely prevented, the thermal stress that will occur under the ideal elastic assumption is:

`σ = E · α · ΔT`

For gray castings, the modulus of elasticity varies by class; for example [Manufacturer data for Class 40 gray casting is E ≈ 17.7 × 10⁶ psi, i.e. approximately 122 GPa](https://www.dura-bar.com/getmedia/55edfe1d-a9f6-4aa8-bdb9-4819d9cd6130/G2-Gray-Iron-0319.pdf?ext=.pdf). With this value:

`σ ≈ 122 000 · 10,5 × 10⁻⁶ · 425 ≈ 545 MPa`

For comparison: [The tensile strength of Class 30 gray casting is approximately 207 MPa](https://www.pentictonfoundry.com/news/gray-iron-astm-a48-class-30/). That is, the theoretical stress of fully constrained expansion is more than twice the tensile strength of the material at room temperature—and the strength drops even further at operating temperature. The conclusion is clear: it is necessary to direct expansion, not suppress it.

### How the Account was Verified by Experiment?

Calculation is a prediction; the first step was to verify it. We set up an experimental setup in which length measurements are made at different temperatures by applying controlled heat to the produced prototype parts. Measured elongation for each temperature level:

`ΔL_measured = L_T − L₀`

theoretical `ΔL = α · L₀ · ΔT` compared to. Measurements were consistent with the calculated range; This verification enabled design intervention to be undertaken with confidence. The account was conjecture until confirmed in the field; experimentation turned it into design input. The background to this "go and see" discipline [genchi genbutsu in our article](https://takt.tr/en/blog/gemba-genchi-genbutsu) we are telling.

### How Controlled Freedom Was Implemented?

The aim was not to prevent expansion, but to release it along a defined axis. path followed:

- The actual reference length of the part was determined.
- The axis where the expansion is concentrated has been clarified.
- Two free point principle applied.
- Slot mounting was preferred on chain link surfaces; slot direction was defined parallel to the expansion direction.

Slot length, expansion and safety margin were sized together.:

`L_slot ≥ ΔL + safety margin`

Additional allowance for tolerance and temperature uncertainty was added to the expansion of approximately 6 mm. Thus, axial extension is released, transverse stability is maintained and no additional compressive load is transferred to the rails.

### System Level Control

In the high temperature region of the furnace, called "hell", control arms were designed to apply hot retorque on the carrier body in order to manage expansion distances and dislocations on the rails. With this mechanical intervention, differential expansions occurring during operation became traceable, the conveyor direction was kept under control and local stresses were systematically balanced..

### Conclusion

Thermal expansion is not a secondary effect in systems operating at high temperatures. When not calculated, it produces malfunction; When calculated, it becomes a design input. In this project, expansion was quantified, verified by experiment, guided by controlled freedom, and supported by mechanical control at the system level. Uncertainty has become a calculated parameter rather than a risk.

Let's also note its limits: the calculation here considers the linear expansion of a single element. Non-uniform temperature distribution, batch differences in material modulus, and friction at joints deviate actual behavior from the ideal formula — which is why experimental verification is indispensable.

### Where is this approach valid??

Ovens, dryers, heat treatment lines and any system whose temperature varies over a wide range are open to thermal expansion. "It worked when it was cold, but it stuck when it got hot" is almost always a sign of unaccounted for expansion..

---

**Do you have a system operating at high temperatures, do you experience jamming or warping when heated?** At Takt, we calculate thermal expansion, verify it with experiments and translate it into design with the principle of controlled freedom; We convert uncertainty into a measured parameter before entering production. [Contact / Request thermal design support.](https://takt.tr/en/iletisim)

## Resources

- [Thermal Expansion — HyperPhysics, Georgia State University](http://hyperphysics.phy-astr.gsu.edu/hbase/thermo/thexp.html)
- [Gray Iron ASTM A48 Class 30 Data Sheet — Penticton Foundry](https://www.pentictonfoundry.com/news/gray-iron-astm-a48-class-30/)
- [Dura-Bar G2 (ASTM A48 Class 40) Gray Iron Technical Data — Charter Dura-Bar](https://www.dura-bar.com/getmedia/55edfe1d-a9f6-4aa8-bdb9-4819d9cd6130/G2-Gray-Iron-0319.pdf?ext=.pdf)
