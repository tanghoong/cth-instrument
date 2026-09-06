# Status

Where the project stands, what was decided and why, and what is next. The README
is the reference; this is the log.

_Last updated: 2026-09-06._

---

## What exists

Seven custom elements plus one stylesheet, no dependencies, no build step.

| File | Gzipped | What it is |
| --- | --- | --- |
| `src/cth-knob.js` | 23.6 KB | The dial. 42 attributes; everything else orbits it. |
| `src/cth-trace.js` | 8.9 KB | A waveform — a strip or a ring. ECG and voice generators built in. |
| `src/cth-heat.js` | 7.2 KB | Many values on one ring, as coloured cells or as towers. |
| `src/cth-radar.js` | 5.9 KB | A sweeping scope with contacts. |
| `src/cth-level.js` | 4.9 KB | A column: thermometer, tank, tube. |
| `src/cth-horizon.js` | 4.1 KB | An attitude indicator — pitch and roll. |
| `src/cth-rings.js` | 2.0 KB | Layout only: concentric knobs without the arithmetic. |
| `src/cth-skeleton.css` | 1.4 KB | Holds each element's box before its module lands. |

**Verified as of this commit:** 304 Playwright checks pass (`npm test`), plus three
further suites — the playground, the landing page, and all 30 lab dashboards
loading clean. `npm run check` parses all seven modules.

---

## Decisions worth remembering

These came out of things that went wrong. They are the reasons the code looks
the way it does.

**The loading jump cannot be fixed from JavaScript.** Each element sizes itself
from inside its own shadow root, which does not exist until the module runs, so
any CSS a module injects arrives exactly too late to have held the space. Hence
`cth-skeleton.css`, a plain stylesheet for the `<head>`. Measured: the landing
page jumped 3110px before, 5px after.

**Spinning up and coasting down are different curves.** Easing toward zero
approaches it and never arrives — the first turntable was still creeping round
nine seconds after being stopped. Wind-up is exponential (a motor), coast-down
is linear (friction), and only the second one actually stops.

**Rounding an accumulated total feeds error back in.** The endless encoder
rounded its running total every frame, so every small step rounded up and a slow
half-turn arrived as two thirds of one. Keep the exact total; round only what is
committed.

**Narrowing a caption is not automatically an improvement.** It is anchored by
its first line, so a second line reaches further down than the wide single line
ever did — and down is the direction a circle runs out in. The fit is measured
and only applied when it actually pulls the corners in.

**A custom property computes to its own token stream.** `getComputedStyle` on
`--label-y` returns the string `calc(190px * .285)`, which parses as nothing.
Measure the element instead.

**Length and colour saying the same thing reads as noise.** 365 towers each in a
different hue is 365 things to read instead of one shape, which is why `bars`
defaults to a single colour.

**Silence has to be genuinely flat.** A nearly-still voice trace still reads as
noise. And the phrasing has to be faster than life: a realistic 6.8-second phrase
fills a 1.9-second window, so the trace looks like it never stops talking.

**A scrim has to be above what it is hiding.** The first one sat under the trace
and dimmed the background while the line still crossed the digits.

---

## Recent rounds

1. **Rebuilt without jQuery** — SVG, custom elements, scoped to round dials.
2. **The lab** — 30 themed full-screen dashboards, shared panel framework.
3. **Landing page** — rewritten as a product page.
4. **VU** — meter ballistics and peak hold.
5. **`range`, `endless`, `<cth-trace>`, `<cth-heat>`** — two input modes, two elements.
6. **Composition** — `slot="inset"`, `pulse`, `shape="bars"`.
7. **Skeleton, voice, `button`, `gas`** — the loading fix and four features.
8. **Review round** — year ring rebuilt to a reference, scrim, gas, thermometer.
9. **`spin`, caption fitting, `user-select`** — the turntable and the text rules.
10. **The world view** — `trend`, `states`, `turn`, and nine everyday dials.
11. **Hero slider** — four scenes, auto-advancing, pausing on hover.
12. **Renamed `cth-instrument`** — the project outgrew "knob": every element,
    custom property, class and file moved from `cj-` to `cth-`.

---

## The lab, page by page

Every dashboard already had its own palette. This pass gives each one the
furniture of the thing it is actually depicting — a cockpit gets a cockpit,
not a blue-tinted grid of the same dials. Deliberately inconsistent between
pages: the shared framework is `panel.js`, the character is per page.

Done, and what it got:

| Page | Treatment |
| --- | --- |
| `gundam` | A linear seat, laid out around the suit. Attitude left, the frame large in the centre, the Minovsky scope right; the pilot’s ECG in a band under it; the eight section readings, then the quantities. The frame is a front elevation — V-fin, chest vents, cockpit hatch, shield on one arm and a beam rifle in the other hand — with each armour section coloured from its own integrity in four steps, and the held equipment left uncoloured because it has none. Armour plates notched at two corners, scanlines and a glass vignette over the lot, a caution lamp that only exists when there is something to say. |

Not started: aviation, alien, body, business, charm, countries, emotion,
ferrari, food, futuristic, jobs, kitchen, lifeos, malaysia, micro,
money, nuclear, population, religions, resources, salary, server, singapore,
spacex, steampunk, stocks, submarine, war, worldclock.
---

## Next

Nothing here is started.

**Asked for and not yet done**

- **Curved captions.** A caption bent along the ring, the way `<cth-heat labels>`
  already sets month names round a year. Raised for the turntable, where a
  straight caption under a record is the weakest part of the layout. Needs a
  decision on whether it belongs on `cth-knob` or stays a heat-ring feature.

**Proposed, not confirmed**

- **A day/night ring that reads a clock** — sun to moon over 24 hours, sky
  gradient behind. `turn` covers the two-state version; this is the continuous one.
- **Lab dashboards for the world view** — money, home, energy. The elements are
  all there; these would be compositions, not new code.
- **A `<cth-knob>` docs page** separate from the landing page, once the attribute
  table outgrows a section.

**Known limits**

- `cth-radar`'s phosphor tail needs `color-mix` (Chrome 111+). Everything else
  works on the older floor stated in the README, and the scope still draws
  without it — only the fading trail behind the beam does not.
- `cth-skeleton.css` reserves `cth-level`'s height approximately: a column's height
  depends on whether it is showing a readout and a label, and three CSS rules
  cover the common cases rather than all four.
- A caption is refitted on resize, not on a font swap. A late-loading webfont
  that changes text metrics will not trigger a refit.

---

## Working notes

- Source files are CRLF. Patch scripts must normalise line endings or every
  multi-line match silently misses.
- Backticks and `$` inside `node -e "…"` are eaten by the shell. Write patch
  scripts to a file instead.
- The dev server must be served from the repository root, not from a subfolder,
  or `../src/` escapes the document root. `npm run dev`.
- Headless Chromium does not fire `requestAnimationFrame` for roughly the first
  second after load. The test suite waits 800ms after navigation for this reason;
  anything measuring an animation needs the same.
