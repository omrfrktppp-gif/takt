---
title: "Genchi Genbutsu (Gemba): Design Verified in the Field, Not on a CAD Screen"
description: "What is the principle of genchi genbutsu (go and see)? We explain why the designer's visit to the field completes the calculation with the example of a thermal expansion experiment.."
slug: "gemba-genchi-genbutsu"
date: 2026-04-13
updated: 2026-07-25
status: published
kind: article
author: "Ömer Faruk"
category: "Japanese Engineering Principles"
tags: ["gemba", "genchi-genbutsu", "yalin-uretim", "deneysel-dogrulama", "saha"]
keywords:
  primary: "gemba genchi genbutsu engineering"
  secondary: ["What is genchi genbutsu?", "What is gemba?", "go and see", "experimental verification"]
cover:
  src: "images/cover.jpg"
  alt: "Engineer verifying the design in the field: genchi genbutsu approach"
canonical: "https://takt.tr/en/blog/gemba-genchi-genbutsu"
og:
  type: "article"
  image: "images/cover.jpg"
schema: "TechArticle"
reading_time: 5
---
## Genchi Genbutsu (Gemba): Design Verified in the Field, Not on a CAD Screen

Genchi genbutsu — "go and see for yourself" — [It is a core tenet of Toyota's decision-making culture](https://mag.toyota.co.uk/genchi-genbutsu/): To understand a problem, go to where it occurs, the gemba (where the work is done), and make the decision not from reports but from first-hand observation. The translation into engineering language is clear: calculation is a prediction; the field confirms or refutes it. Design ends with measurement, not guesswork.

A design may look perfect in a CAD environment. Dimensions are consistent, assembly is conflict-free, analysis is green. But when the part is made from real material and operates under real conditions, things appear that the model does not see: heat, vibration, tolerance, the operator's hand. Accuracy on screen is no guarantee of accuracy in the field.

### What is Genchi Genbutsu??

Genchi genbutsu means taking the decision from where the phenomenon occurs, not from reports, assumptions, or second-hand information. "Gemba" is the place where work is done: workshop, assembly line, head of the machine. Principle, [Toyota Production System](https://global.toyota/en/company/vision-and-philosophy/production-system/) It's part of problem-solving practice: go and see for yourself before you argue at the table..

In engineering, this means comparing the model with reality. Genchi genbutsu does not end the design with guesswork; ölçümle bitirir.

### Why Account Alone Is Not Enough?

The thermal expansion of the material in a system operating at high temperature can be calculated:

`ΔL = α · L₀ · ΔT`

This calculation gives a prediction. But the expansion coefficient of the casting material is within a range, the temperature distribution is not uniform, and the actual part is not of nominal size. The calculation says "it extends about 6 mm"; true value can only be known when measured.

This is where genchi genbutsu comes into play: controlled heat is applied to the produced prototype parts, the length is measured at different temperatures and the measured elongation is compared with the calculated value.:

`ΔL_measured = L_T − L₀`

When the measurements are consistent with the calculated range, the design decision can be made with confidence. When it doesn't work, going to the field catches a mistake early that could never be seen on paper. End-to-end implementation of this approach [In our tunnel oven thermal expansion case](https://takt.tr/en/blog/termal-genlesme-yonetimi) we are telling.

### Three Benefits of Going to the Field

- **Assumptions are broken:** The "ideal" assumptions in the model (uniform temperature, nominal size, frictionless contact) are tested in the field.
- **Early errors are caught:** A problem is seen in the prototype, not in production; correction cost is low.
- **Design input is strengthened:** Actual behavior measured enables the next design to start more accurately.

### Balanced View: Field Alone Is Not Enough

The symmetry of the principle is important: without calculation the field is blind, without field the account is incomplete. An unplanned field trip does not produce data; Going down to the gemba without knowing what to measure gathers impressions but does not produce decisions. Good practice is to first establish the hypothesis by calculation, then define which quantity will be measured in the field, under what conditions, with what precision. Verification without a measurement plan is not validation.

### Where is the Determinant??

Field verification is decisive in any system where there are effects that are difficult to model, such as high temperature, vibration, and wear. If you hear the sentence "It was like this in the model, but it was different in the field", what is missing is not the calculation, but the step that takes the calculation to the field..

---

**Do your designs turn out to be correct in the model and behave differently in the field?** At Takt, we establish the design with calculations and verify it with experiments; We test the prediction by going to the field and turning the risk into a measured parameter before entering production.. [Contact / Request design verification support.](https://takt.tr/en/iletisim)

## Resources

- [Genchi Genbutsu — Toyota (official Toyota UK publication)](https://mag.toyota.co.uk/genchi-genbutsu/)
- [Toyota Production System — Toyota Motor Corporation (official page)](https://global.toyota/en/company/vision-and-philosophy/production-system/)
- [Thermal Expansion — HyperPhysics, Georgia State University](http://hyperphysics.phy-astr.gsu.edu/hbase/thermo/thexp.html)
