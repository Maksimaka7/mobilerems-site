# TASK — /technology: strip to the lean reference hub (remove 3 rich sections)

Owner decision: make /technology match Lesya's reference exactly — a lean hub.
Remove the three sections that the reference does NOT have. Run this AFTER the
hero-reference-align task (the REMS acronym hero must already be in place).

REMOVE these three `<section>` blocks from technology.html entirely:
1. The benefits grid — `<section class="block alt">` with eyebrow
   "02 Why REMS® makes the difference" / h2 "Benefits and advantages of REMS®."
   and the `.ben-grid` of 9 `.ben` cards.
2. The four data points — `<section class="block">` with eyebrow
   "03 Four data points per scan" / h2 "Bone density. Bone quality. Fracture
   risk. Body composition." and the `.cards` of 4 cards.
3. The REMS vs DEXA comparison — `<section class="block alt">` with eyebrow
   "04 What DEXA actually measures" / h2 "DEXA measures density..." and the
   `.cmp` table plus its trailing "Neither FRAX nor TBS... REMS® does." line.

KEEP everything else in the reference's order:
hero (with acronym block) → "Where REMS® Fits" → "How REMS® works, briefly"
teaser (→ /how-rems-works) → "What happens at a REMS® appointment" teaser
(→ /what-to-expect) → "The evidence" (→ /research) → Clinical Reference
download block → two-path "Get Started" CTA → footer → disclaimer.

KEEP (do not remove): the Clinical Reference + brochure download block and the
two "See it in action" videos, and the two-path CTA. (Owner chose to keep the
brochure/videos even though the reference omits them.)

### Section ordering note
After removing the 3 sections, re-check the `.block` / `.block alt`
alternating backgrounds so the remaining sections still alternate cleanly
(no two same-background sections stacked). Adjust the `alt` classes on the
remaining sections as needed for a clean rhythm.

================================================================
## FINISH
================================================================
- No new copy. Only deletions + (if needed) `alt` class re-balancing.
- Bump `?v=` by one uniformly across ALL 9 HTML pages (styles.css AND
  site.js): v19 → v20 (or current+1 if different). All pages same number.
- Any now-unused CSS (.ben-grid/.ben, .cmp/.cmp-row/.cmp-head/.dexa/.rems, and
  the .cards/.idx ONLY IF they are not used by any other page) — check with a
  grep across all HTML before removing. `.cards`/`.idx`/`.duo` are likely used
  elsewhere (what-to-expect, the Where-REMS-Fits duo), so KEEP those; only
  remove `.ben-grid`/`.ben` and the `.cmp*` rules if grep shows they're unused
  anywhere after this change. If unsure, leave the CSS (harmless).
- Update CLAUDE.md: /technology is now the lean reference hub (benefits grid,
  four data points, and REMS-vs-DEXA table removed; brochure/videos kept).
- One atomic commit, e.g. "feat(technology): strip to lean reference hub; assets v20". git push.

## VERIFY
- /technology now reads: hero (acronym block) → Where REMS Fits → How-it-works
  teaser → What-to-expect teaser → Evidence → Clinical Reference + brochure +
  videos → two-path CTA. No benefits grid, no four-data-points, no DEXA table.
- Section backgrounds alternate cleanly; no visual double-background seam.
- The two teasers still link to /how-rems-works and /what-to-expect; evidence
  to /research; downloads work.
- All 9 pages on the same bumped ?v=; header/footer/disclaimer intact; no
  broken CSS from any removals.
