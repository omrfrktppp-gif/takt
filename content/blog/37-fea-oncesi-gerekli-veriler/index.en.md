---
title: "Required Data Before FEA: Checklist for Analysis"
description: "What data should be available before requesting an FEA study? A practical checklist for loads, material, boundary conditions, geometry and acceptance criteria."
slug: "fea-oncesi-gerekli-veriler"
date: 2026-07-12
updated: 2026-07-25
status: published
kind: article
author: "Ömer Faruk Top"
category: "Buying Guide"
tags: ["fea", "simulasyon", "yapisal-analiz", "veri-hazirligi", "kontrol-listesi"]
keywords:
  primary: "Required data before FEA"
  secondary: ["What data is required for FEA", "finite element analysis inputs", "Getting FEA service", "preparation before analysis"]
cover:
  src: "images/cover.jpg"
  alt: "Workbench showing load, material and boundary condition data prepared before finite element analysis"
canonical: "https://takt.tr/en/blog/fea-oncesi-gerekli-veriler"
og:
  type: "article"
  image: "images/cover.jpg"
schema: "BlogPosting"
reading_time: 8
---
## Required Data Before FEA: Checklist for Analysis

The quality of a finite element analysis (FEA) is determined in the inputs before the software. Before requesting analysis, five groups of data must be available: the engineering question to be answered, actual geometry, actual loads and scenarios, material data with known heat treatment, and realistic boundary conditions—plus acceptance criteria that tell what the result will be compared to. this article, [Our FEA article](https://takt.tr/en/blog/sonlu-elemanlar-analizi-fea) As a continuation, it lists step by step what the party receiving the analysis service should prepare. Analysis starting with missing data is not delayed; worse, it produces the wrong result that looks believable with the wrong input.

## Which Question Should Be Answered Before Analysis??

The first and most critical input is not a file, but a sentence: **"What decision will be made based on the results of this analysis?"** "Will the part hold up?" and "How many percent can we lighten the part?" requires different analysis constructs; one wants the worst case scenario, the other wants the optimization loop. Unless the decision question is clarified, the scope, and therefore the duration and cost, cannot be clarified. This, [The machine design service price is in our article.](https://takt.tr/en/blog/makine-tasarim-hizmeti-fiyati) It is the same principle as we explained: the proposal for a job whose scope is not defined is also undefined..

## What Data Is Required, What If It Is Missing??

| Dataset | What to include | What happens if it is missing |
|---|---|---|
| Geometry | Current 3D model (STEP/Parasolid), including revision number, weld seams and holes | The old revision is analyzed; the result does not represent the part produced |
| Loads | Size, direction, application point of forces; static or dynamic; number of cycles | Analyst predicts; predicted load is not actual load |
| Scenarios | Normal operation, worst case, accident/crash, transportation-lifting situations | Only the "good day" scenario is confirmed |
| Material | Alloy, standard, heat treatment condition, actual test data if available | Calculation is made with the most optimistic value in the catalog |
| Boundary conditions | What and how the part is connected: bolt, weld, seating surface; adjacent parts in contact | The actually flexible support is modeled as rigid; stresses are incorrectly distributed |
| Acceptance criteria | Which safety coefficient, according to which standard? permissible deflection | "Is the result good?" question remains unanswered |

## Where Should Material Data Come From??

The source of the values ​​on the material card should be questioned. Tensile properties of metallic materials (yield, tensile strength, modulus of elasticity) [ISO 6892-1](https://www.iso.org/standard/78322.html) It is determined by standard test methods such as; The values ​​in the supplier's certificate are based on these tests. Using the actual casting/batch values ​​in the material certificate instead of the catalog value for critical parts allows the analysis to come closer to reality. Heat treatment information is particularly important: the difference in strength between the annealed and hardened state of the same alloy completely changes the analysis result. In welded structures, it should not be forgotten that the weld area behaves differently from the main material.; [weld distortion in our article](https://takt.tr/en/blog/kaynak-carpilmasi-kontrolu) We discussed why this region is critical.

## How to Define Loads and Boundary Conditions?

The most common mistake in load definition is to assume the nominal value is the worst case. Engine starting torque, impact, jamming and maintenance loads may be multiples of the nominal. The second common mistake is to omit the loading history: in a part that has seen millions of cycles, even if the static strength seems adequate, fatigue is decisive — so the number of cycles and the load spectrum must be given to the analyst.

In boundary conditions, the golden rule is this: consider the part not alone, but together with the environment to which it is connected. The bolted connection is not a rigid support; A thin chassis adds flexibility to the part mounted on it. Photographs of connection details and models of adjacent parts enable the analyst to make accurate idealization.

## Acceptance Criteria and Validation Why Should It Be Discussed From the Beginning??

The result of the analysis is not "good" or "bad" per se; It is good or bad according to a criterion. Which safety factor will be applied according to which standard or company rule should be written from the beginning. Two checks are also essential for the internal quality of the analysis itself: network convergence — [NAFEMS' knowledge base](https://www.nafems.org/publications/knowledge-base/the-importance-of-mesh-convergence-part-1/) details the impact of this check on accuracy — and, if possible, physical verification. Verification and validation framework of computational model [ASME V&V 10](https://www.asme.org/codes-standards/find-codes-standards/standard-for-verification-and-validation-in-computational-solid-mechanics) Definitions: Solving the equations correctly is one thing, but whether the model represents reality is another question. If you have historical test, field measurement, or fault data, give it to the analyst; This is the most valuable input that allows the model to be calibrated with reality.

## Risks and Red Flags

Pay attention to the following signs when receiving analysis services::

- **No questions asked:** The analyst who takes the geometry and returns the result directly fills in the missing information with an assumption — which assumption should be written in the report.
- **Report color image only:** The report in which inputs, acceptances, network convergence and criteria are not written cannot be audited.
- **Single scenario:** Study where only rated load is analyzed, does not see the worst case.
- **Material source uncertain:** Material definition at the "we bought steel" level limits the reliability of the result from the start.
- **No validation plan:** "What will we test the result against?" If there is no answer to the question, the analysis remains a hypothesis.

## Frequently Asked Questions

### I don't have a 3D model, only a technical drawing. Can analysis be done??

It can be done; the model is recreated from the image, but this means additional time. If the part is available [Geometry can be digitalized with 3D scanning](https://takt.tr/en/blog/3d-tarama-klasik-olcum-karsilastirma) — It is a practical way, especially for old parts with lost drawings..

### I don't know the exact loads. Can we start anyway?

One can start, but knowing the limit: analysis "what happens under this load?" It answers the question, "What is the load?" cannot answer the question. A sensitivity study for uncertain loads (scanning the load as a range) is a more honest approach..

### Which file format is ideal for analysis??

Neutral formats (STEP, Parasolid) are sufficient in most cases. Source CAD file speeds up work when geometry clean-up and variant trials are required.

### Is FEA required for each part??

No. FEA is an extra cost for simple loading situations that can be safely dimensioned by hand calculation. FEA; generates value at the intersection of complex geometry, multiple load paths and critical outcome risk.

## Conclusion

The quality of FEA starts with the file you prepare, not with the analyst's computer. Decision question, current geometry, real loads and scenarios, sourced material data, realistic boundary conditions and written acceptance criteria — if these six topics are completed, the analysis will be fast, accurate and auditable. If it is missing, even the most expensive software produces a complete looking answer to the missing question.

---

**You want to have an analysis, but you are not sure whether the data you have is sufficient?** As Takt, we define the scope of analysis together with you, identify the missing data and establish a verifiable study.. [Our analysis and calculation service](https://takt.tr/en/hizmetler/analiz-hesaplama) browse or [contact us](https://takt.tr/en/iletisim).

## Resources

- [ASME V&V 10 — Standard for Verification and Validation in Computational Solid Mechanics](https://www.asme.org/codes-standards/find-codes-standards/standard-for-verification-and-validation-in-computational-solid-mechanics) (verification and validation framework of computational model)
- [The Importance of Mesh Convergence — NAFEMS](https://www.nafems.org/publications/knowledge-base/the-importance-of-mesh-convergence-part-1/) (effect of network convergence on analysis accuracy)
- [ISO 6892-1:2019 — Metallic materials: Tensile testing at room temperature](https://www.iso.org/standard/78322.html) (standard testing method of material mechanical properties)
