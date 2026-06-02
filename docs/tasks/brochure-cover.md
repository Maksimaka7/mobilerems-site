# TASK — Brochure: cover image in the "How REMS works" block + activate Clinical Brief buttons

Lesya provided the Echolight "BONE IDENTITY" brochure (PDF). Show its cover
as a clickable image in the home "How REMS works" teaser, and activate the
existing (currently disabled) brochure / Clinical Brief buttons site-wide.
All open the PDF in a new tab.

================================================================
## STEP 0 — add the binary files (manual)
================================================================
Two files are downloaded to your machine: `clinical-brief.pdf` (~10 MB) and
`brochure-cover.jpg` (~80 KB). Copy both into the repo:
```
cp ~/Downloads/clinical-brief.pdf  assets/clinical-brief.pdf
cp ~/Downloads/brochure-cover.jpg  assets/img/brochure-cover.jpg
ls -la assets/clinical-brief.pdf assets/img/brochure-cover.jpg   # verify both exist
```
(Adjust path if your downloads folder differs. Confirm both are present
before committing.)

Canonical PDF URL on the site: `/assets/clinical-brief.pdf`

================================================================
## STEP 1 — index.html: cover image in the "How REMS works" teaser
================================================================
In the `.teaser` block (eyebrow "03 The technology", h2 "How REMS works."),
the left `.teaser .media` currently holds a `.rf` rings SVG + a ph-tag.

- REPLACE the `.rf` SVG block inside `.teaser .media` with a clickable
  brochure cover that opens the PDF in a new tab:
```html
<a class="brochure-cover" href="/assets/clinical-brief.pdf" target="_blank" rel="noopener" aria-label="Open the Echolight REMS brochure (PDF)">
  <img src="/assets/img/brochure-cover.jpg" alt="Echolight REMS — Bone Identity brochure cover" loading="lazy" />
</a>
```
- Update the ph-tag text in that block to: `<b>Brochure</b> Echolight REMS&reg; · Bone Identity (PDF)`
- The "Explore the technology →" button in this teaser's `.body`: change its
  href from `/technology` to `/assets/clinical-brief.pdf` and add
  `target="_blank" rel="noopener"` (owner decision: this button now opens the
  PDF, not the page). Keep the label "Explore the technology →" OR rename to
  "View the brochure →" — use "View the brochure →" since it now opens the PDF.

================================================================
## STEP 2 — activate the brochure / Clinical Brief buttons
================================================================
These are currently `href="#"` with `aria-disabled="true"`. Point them to the
PDF, open in new tab, remove the disabled state:

- **technology.html** `.dl-cta`: the "Download brochure" button
  `<a class="btn btn-gold" href="#" aria-disabled="true">Download brochure ...`
  → `href="/assets/clinical-brief.pdf" target="_blank" rel="noopener"`, remove
  `aria-disabled`. Also update the caption `.s` text "(File to be added.)" →
  remove that parenthetical (it's live now).
- **partners.html**: the hero "Download the Clinical Brief" ghost button and
  any other `aria-disabled` "Clinical Brief" button → same treatment
  (`href="/assets/clinical-brief.pdf" target="_blank" rel="noopener"`, drop
  `aria-disabled`). Leave the "Book a 15-minute call" button disabled (no
  Calendly link yet) — do NOT touch that one.

================================================================
## STEP 3 — CSS (styles.css): cover styling with gold frame
================================================================
Owner wants a soft gold frame/backing so the dark brochure cover sits nicely
in the light layout. Add:
```css
.teaser .media .brochure-cover{
  position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
  padding:34px; box-sizing:border-box; text-decoration:none;
}
.teaser .media .brochure-cover img{
  max-width:100%; max-height:100%; width:auto; height:auto; border-radius:6px;
  box-shadow:0 18px 40px -18px rgba(54,56,60,.55), 0 0 0 1px rgba(212,185,133,.5), 0 0 0 7px rgba(212,185,133,.16);
  transition:transform .25s ease, box-shadow .25s ease;
}
.teaser .media .brochure-cover:hover img{
  transform:translateY(-3px);
  box-shadow:0 26px 52px -20px rgba(54,56,60,.6), 0 0 0 1px rgba(212,185,133,.7), 0 0 0 7px rgba(212,185,133,.22);
}
@media (max-width:920px){ .teaser .media .brochure-cover{ padding:26px; } }
```
(The `.teaser .media` already has the warm gradient background + min-height,
so the padded gold-framed cover reads as a brochure resting on a cream mat.)

================================================================
## FINISH
================================================================
- Bump asset version to the next number CONSISTENTLY across all 7 HTML pages.
  Current state is mixed (some v5, some v6 from the last commit). Set them ALL
  to `?v=7` on both styles.css and site.js so every page matches.
- Update CLAUDE.md: brochure PDF lives at `/assets/clinical-brief.pdf`; the
  home "How REMS works" teaser shows `brochure-cover.jpg` linking to it; the
  Clinical Brief / Download brochure buttons on technology + partners now
  point to it; "Explore the technology" in the home teaser now opens the PDF
  (not /technology). Note the /technology page is still reachable via the nav.
- One atomic commit, e.g.
  "feat: brochure cover in How-REMS-works teaser + activate Clinical Brief PDF links; assets v7".
  git push.

## VERIFY
- Home teaser shows the brochure cover with a gold frame on the cream mat;
  clicking it opens /assets/clinical-brief.pdf in a new tab.
- "View the brochure" button + technology "Download brochure" + partners
  "Clinical Brief" buttons all open the PDF in a new tab; none are disabled.
- "Book a 15-minute call" on partners stays disabled.
- PDF actually loads at https://mobilerems.com/assets/clinical-brief.pdf
- All 7 pages on ?v=7 (styles.css + site.js); no mixed versions remain.
