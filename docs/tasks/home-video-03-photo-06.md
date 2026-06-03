# TASK — Home: video into "How REMS works" (03), new founder photo into "Why MobileREMS" (06)

Owner swap on the HOME page (index.html only):
- Block 03 "How REMS&reg; works": replace the brochure-cover image with the
  founder VIDEO facade. Keep the text, the chips, and the "View the brochure"
  button (button still opens the PDF).
- Block 06 "Why MobileREMS": replace the video facade with a NEW founder PHOTO.

Net effect: the video moves from 06 up to 03; block 06 gets a photo. /about
is unchanged (its founder video stays). The `.video-facade` JS/CSS already
exists — reuse it.

NOTE (video choice): block 03 reuses the same YouTube id `JejpUNvq6Co` (the
only video provided). It's the founder talking; if a dedicated "how REMS
works" explainer video exists later, it's a one-line id swap. Ship this id now.

================================================================
## STEP 0 — add the new photo (binary, manual)
================================================================
`founder-probe.jpg` (853×1066, 4:5, color-graded to match the hero photo) is
downloaded to your machine. Copy it in:
```
cp ~/Downloads/founder-probe.jpg assets/img/founder-probe.jpg
ls -la assets/img/founder-probe.jpg   # confirm before committing
```

================================================================
## STEP 1 — Block 03 "How REMS works": brochure cover → video facade
================================================================
In index.html, inside `<div class="teaser"> <div class="media">`, REPLACE:
```html
<a class="brochure-cover" href="/assets/clinical-brief.pdf" target="_blank" rel="noopener" aria-label="Open the Echolight REMS brochure (PDF)">
  <img src="/assets/img/brochure-cover.jpg" alt="Echolight REMS — Bone Identity brochure cover" loading="lazy" />
</a>
```
with the video facade:
```html
<button class="video-facade" data-yt="JejpUNvq6Co" aria-label="Play: how REMS works (video)">
  <img src="https://i.ytimg.com/vi/JejpUNvq6Co/hqdefault.jpg" alt="" loading="lazy" />
  <span class="vf-play" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>
</button>
```
Change that block's ph-tag from
`<span class="ph-tag"><b>Brochure</b> Echolight REMS&reg; · Bone Identity (PDF)</span>`
to `<span class="ph-tag"><b>Watch</b> How REMS&reg; works</span>`.
LEAVE the right-side body untouched, INCLUDING the
`<a class="btn btn-ghost" href="/assets/clinical-brief.pdf" ...>View the brochure &rarr;</a>`
button (the PDF stays reachable through it).

### CSS: the facade must fill `.teaser .media`
`.teaser .media` is already a positioned box (the old `.brochure-cover` used
`position:absolute; inset:0`). The existing `.video-facade` rules
(`position:absolute; inset:0; ...`) will fill it the same way. Verify the
video facade renders edge-to-edge in the media box (no leftover mat/padding
from the brochure rule). Then REMOVE the now-unused `.brochure-cover` CSS
rules from styles.css (grep first: `.brochure-cover` is only used on the home
teaser, so it's safe to delete after this change). The `brochure-cover.jpg`
asset can stay in the repo (harmless) or be removed — your call; do NOT remove
clinical-brief.pdf (still linked by the button + other pages).

================================================================
## STEP 2 — Block 06 "Why MobileREMS": video facade → new photo
================================================================
In index.html, inside `<div class="wrap founder"> <div class="pic">`, REPLACE
the whole `<button class="video-facade" ...>…</button>` with:
```html
<img class="founder-photo" src="/assets/img/founder-probe.jpg" alt="Alexandra Kusherets holding the Echolight REMS probe" loading="lazy" />
```
Change that block's ph-tag from
`<span class="ph-tag"><b>Watch</b> Alexandra on MobileREMS</span>`
to `<span class="ph-tag"><b>Founder</b> Alexandra Kusherets &middot; Certified REMS&reg; Operator</span>`.

### CSS: photo fills the `.pic` frame
`.founder .pic` is the portrait frame (the video facade filled it via
`position:absolute; inset:0`). Add:
```css
.founder .pic .founder-photo{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:50% 28%; display:block; border-radius:inherit; }
```
(`object-position:50% 28%` keeps her face high in the frame; tune if needed.)
Optional polish for consistency with the hero photo: a subtle warm tone +
gold inner edge on `.founder .pic` when it holds a photo (you may add an inset
box-shadow `inset 0 0 0 1px rgba(212,185,133,.45)` to `.founder .pic`), but
keep it subtle. The `.ph-tag` stays above the photo.

================================================================
## FINISH
================================================================
- Bump `?v=12` -> `?v=13` on styles.css AND site.js across all 7 HTML pages
  (uniform).
- Update CLAUDE.md: home block 03 "How REMS works" now shows the founder
  VIDEO facade (id `JejpUNvq6Co`) instead of the brochure cover; the "View
  the brochure" button still opens the PDF. Home block 06 "Why MobileREMS"
  now shows a new founder photo `assets/img/founder-probe.jpg` (Alexandra with
  the REMS probe) instead of the video. The video remains on /about. Note the
  block-03 video reuses the founder Short id (swap if a dedicated explainer is
  produced).
- One atomic commit, e.g.
  "feat(home): video in How-REMS-works (03), new founder photo in Why-MobileREMS (06); assets v13".
  git push.

## VERIFY
- Home block 03: video facade (poster + play) fills the media box; clicking
  loads/plays the YouTube player; "View the brochure" button still opens the
  PDF in a new tab; chips + copy unchanged.
- Home block 06: the new founder photo fills the portrait frame, framed by
  the cream `.pic`; caption reads "Founder · Alexandra Kusherets · Certified
  REMS® Operator".
- No leftover `.brochure-cover` markup on index.html; its CSS removed.
- /about unchanged (still has the founder video).
- All 7 pages on ?v=13 (CSS + JS); header/footer identical; disclaimer intact.
