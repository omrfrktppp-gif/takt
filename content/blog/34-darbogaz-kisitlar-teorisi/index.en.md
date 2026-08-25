---
title: "Bottleneck Management (Theory of Constraints): Solving the Bottleneck, Not Speeding Up Every Station"
description: "What is Theory of Constraints (TOC), how to find bottleneck? Why the slowest station determines the speed of a line and the five-step improvement cycle."
slug: "darbogaz-kisitlar-teorisi"
date: 2026-07-03
updated: 2026-07-25
status: published
kind: article
author: "Ömer Faruk Top"
category: "Engineering Trends"
tags: ["darbogaz", "kisitlar-teorisi", "theory-of-constraints", "surec-optimizasyonu", "verimlilik"]
keywords:
  primary: "bottleneck management (theory of constraints)"
  secondary: ["What is the theory of constraints?", "theory of constraints", "bottleneck analysis", "throughput boost"]
cover:
  src: "images/cover.jpg"
  alt: "Theory of constraints diagram showing bottleneck station and flow in production line"
canonical: "https://takt.tr/en/blog/darbogaz-kisitlar-teorisi"
og:
  type: "article"
  image: "images/cover.jpg"
schema: "TechArticle"
reading_time: 6
---
## Bottleneck Management (Theory of Constraints): Solving the Bottleneck, Not Speeding Up Every Station

The slowest station determines the output of a production line; Therefore, the way to increase efficiency is not to speed up every station at once, but to find that single point - the bottleneck - and solve it. Speeding up a station other than the bottleneck does not change the total output of the line; it just accumulates more semi-finished goods in front of the bottleneck. The systematic name of this approach is developed by Eliyahu Goldratt. [It is the Theory of Constraints (TOC)](https://www.tocinstitute.org/theory-of-constraints.html): The performance of a system is determined by a single constraint that limits it.

The reflex of a business wanting to increase output is often general: faster machine, more operators, shorter cycles everywhere. TOC reverses this reflex — find the constraint first, focus your power there.

## Bottleneck Cause Determinant?

A line consists of consecutive stations and each station has a cycle time. Since products can only pass through the bottleneck at its speed, the station with the longest cycle time determines the throughput of the line, no matter how fast the other stations are. One of the practical ways to find the constraint is, [Lean Production's TOC guide](https://www.leanproduction.com/theory-of-constraints/) As suggested, it is to identify the station with the longest average cycle time from equipment performance data; A backlog of intermediate stock is also a visual sign of a bottleneck.

If you already have a measurement infrastructure, the job becomes easier: [In our OEE and machine monitoring article](https://takt.tr/en/blog/akilli-fabrika-kobi) The data we describe is the direct input of bottleneck detection.

## Why Improvements Done in the Wrong Place Are Wasted?

The most striking result of TOC is that improvement outside the bottleneck does not increase the total throughput of the system. A faster front station only accumulates intermediate stock in front of the bottleneck — [muda in our article](https://takt.tr/en/blog/muda-yedi-israf) "overproduction" and "stock" waste itself. Goldratt's principle summarizes this: an hour lost at the bottleneck is an hour lost in the entire system; An hour saved at a non-bottleneck station is often an illusion. Improvement budget and engineering effort should be concentrated on the bottleneck rather than spread throughout the system.

## How the Five-Step Cycle Works?

[TOC's five focus steps](https://www.tocinstitute.org/theory-of-constraints.html) defines a continuous improvement cycle:

| Step | What to do? |
| --- | --- |
| 1. Determine | Identify the constraint (bottleneck) of the system |
| 2. Exploitation | Operate the bottleneck in its current form most efficiently; don't leave it idle even for a moment |
| 3. Submit | Tune other stations to the rhythm of the bottleneck; neither starve nor accumulate unnecessary stocks.
| 4. Raise | Increase capacity if necessary: ​​investment, additional shift, process improvement |
| 5. Repeat | When the bottleneck is resolved, the new one moves elsewhere; start the loop over |

The order is important: investment (upgrade) is the last step. Many bottlenecks are relieved without spending money — by reducing setup times, shifting breaks, feeding quality parts into the bottleneck. Loop, [In our Kaizen article](https://takt.tr/en/blog/kaizen-surekli-iyilestirme) It aligns with the logic of continuous improvement; The difference is that it focuses the improvement not everywhere but on the one point that really limits the system. [Lean Enterprise Institute comparison](https://www.lean.org/the-lean-post/articles/what-is-the-theory-of-constraints-and-how-does-it-compare-to-lean-thinking/), It discusses in detail this complementarity of TOC and lean thinking..

## Is the Bottleneck Always a Machine??

No — and this is the most often overlooked aspect of the method. Sometimes the bottleneck is an approval process, a policy (“each batch requires manager signature”), a supply constraint, or the knowledge of a single critical operator. These constraints, which are not visible in the machine data, are only found by monitoring the flow end-to-end. Additionally, when a bottleneck is resolved, a new one emerges; TOC is not a one-time project, but a perspective that requires continuity.

Warning signs are familiar: "We're working hard but output isn't increasing", the constant backlog in front of a particular station, the ever-waiting assembly at the end of the line. Each of these is a sign of an undetected bottleneck.

## Conclusion

The Theory of Constraints shows that increasing efficiency is not about speeding up everywhere, but about finding and solving the single point that limits the system. A line is only as fast as its slowest station; Improvement outside the bottleneck is often a waste of labor and even intermediate stock. The correct order: identify the constraint, use it most efficiently, subordinate others to it, upgrade with investment if necessary — and repeat the cycle..

---

**Even though you work hard, is your production output not increasing, are you always stuck at the same point?** Tactically, we examine your line with the Theory of Constraints; We identify the real bottleneck and direct your improvement resource to where it will actually increase output. [Our production consultancy service](https://takt.tr/en/hizmetler/uretim-danismanligi) browse or [contact us](https://takt.tr/en/iletisim).

## Resources

- [Theory of Constraints of Eliyahu M. Goldratt — TOC Institute](https://www.tocinstitute.org/theory-of-constraints.html) (constraint concept and five focusing steps)
- [Theory of Constraints (TOC) — Lean Production](https://www.leanproduction.com/theory-of-constraints/) (bottleneck detection with cycle time data)
- [What is the Theory of Constraints, and How Does it Compare to Lean Thinking? —Lean Enterprise Institute](https://www.lean.org/the-lean-post/articles/what-is-the-theory-of-constraints-and-how-does-it-compare-to-lean-thinking/) (Comparison of TOC and lean thinking)
