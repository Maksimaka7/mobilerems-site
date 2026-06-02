# TASK — Replace hero spine animation with founder photo (index.html)

Owner decision: put the founder photo in the homepage hero, REMOVE the
spine-scan animation (do NOT move it to /technology — just remove it; it
stays in git history if ever needed). Photo grade = natural (V1).

================================================================
## STEP 0 — Add the photo file (manual, binary)
================================================================
The processed photo is downloaded to your machine as `founder-hero.jpg`
(852×1065, 4:5, color-graded). Copy it into the repo:
```
cp ~/Downloads/founder-hero.jpg assets/img/founder-hero.jpg
```
(If it's in a different downloads path, adjust. Confirm the file exists at
`assets/img/founder-hero.jpg` before committing — `ls -la assets/img/`.)

================================================================
## STEP 1 — index.html hero markup
================================================================
Inside `.hero-media > .keyframe` there is currently:
```html
<div class="hero-scan" aria-hidden="true"> ...big SVG... </div>
<span class="ph-tag"><b>Image</b> REMS&reg; scan in progress — spine echo</span>
```

- DELETE the entire `<div class="hero-scan">…</div>` block (the whole SVG).
- In its place put the photo + a tone overlay:
```html
<img class="hero-photo" src="/assets/img/founder-hero.jpg"
     alt="Alexandra Kusherets with the Echolight REMS device" />
<span class="hero-photo-tone" aria-hidden="true"></span>
```
- CHANGE the ph-tag text from the placeholder to:
```html
<span class="ph-tag"><b>MobileREMS</b> Echolight REMS&reg; assessment</span>
```
- KEEP both `.hero-float` cards (`.top` “<0.5%” and `.bot` “0 Radiation”)
  exactly as they are.

Result:
```html
<div class="keyframe has-photo">
  <img class="hero-photo" src="/assets/img/founder-hero.jpg" alt="Alexandra Kusherets with the Echolight REMS device" />
  <span class="hero-photo-tone" aria-hidden="true"></span>
  <span class="ph-tag"><b>MobileREMS</b> Echolight REMS&reg; assessment</span>
</div>
```
Note: add the `has-photo` class to that `.keyframe` (only this one on the
home hero; do NOT touch the `.keyframe` look elsewhere).

================================================================
## STEP 2 — styles.css
================================================================
### 2a. Add photo styles (near the hero section rules):
```css
.keyframe.has-photo{
  box-shadow:
    0 40px 80px -50px rgba(54,56,60,.5),
    inset 0 0 0 1px rgba(212,185,133,.55),
    inset 0 0 70px -24px rgba(212,185,133,.45);
}
.keyframe .hero-photo{ width:100%; height:100%; object-fit:cover; object-position:50% 42%; display:block; }
.hero-photo-tone{
  position:absolute; inset:0; z-index:2; pointer-events:none;
  background:linear-gradient(180deg, rgba(212,185,133,.05), rgba(54,56,60,.10));
  mix-blend-mode:multiply;
}
```
(The keyframe already has `overflow:hidden` + the arch border-radius, so the
tone overlay is clipped to the keyhole shape and the inset box-shadow draws
the gold edge along the arch. The ph-tag and float cards sit above via their
own z-index / stacking — verify ph-tag (z-index:3) still shows above the tone.)

### 2b. Remove the now-dead spine animation CSS
Delete the whole block starting at the comment
`/* ===== Hero scan animation (index.html hero .keyframe) ... */`
through the last `.hero-scan .hs-bscan{...}` rule (all `@keyframes hs*` and
`.hero-scan*` and `.hs-*` rules, plus the `prefers-reduced-motion` block that
only targets `.hero-scan`). It's no longer referenced.

================================================================
## STEP 3 — cache bump + CLAUDE.md + commit
================================================================
- Bump `?v=5` -> `?v=6` on styles.css AND site.js across ALL 7 HTML pages.
- CLAUDE.md: note the home hero now uses the founder photo
  (`assets/img/founder-hero.jpg`); the spine-scan animation was removed from
  the hero (still in git history); it was NOT moved to /technology.
- One atomic commit, e.g.
  "feat(hero): replace spine animation with founder photo; assets v6".
  git push.

## VERIFY
- Home hero shows the founder photo inside the keyhole arch, with a soft
  warm tone + gold inner edge — not a raw pasted photo.
- ph-tag reads “MobileREMS · Echolight REMS® assessment”.
- Both float cards still present and not overflowing (esp. mobile — the
  earlier mobile-audit rules should keep them in check; if the photo hero
  makes them overlap on small screens, hide `.hero-float` under 560px).
- No `.hero-scan` / `.hs-` references remain in HTML or CSS.
- Other pages unchanged; cache is v6 everywhere.
