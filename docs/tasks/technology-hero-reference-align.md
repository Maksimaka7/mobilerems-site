# TASK — /technology hero: match Lesya's reference (REMS acronym block, urgency, arrival, breadcrumb)

Align the /technology hero to Lesya's reference mockup (7-rems_technology_v6),
rendered in OUR design system (our gold #D4B985, Cormorant + Montserrat, our
tokens — do NOT import her colors/fonts). Only the hero region of
technology.html changes, plus a breadcrumb fix and new CSS. Everything below
the hero (Where REMS Fits, benefits grid, four data points, REMS vs DEXA,
teasers, evidence, downloads, two-path CTA, footer) stays EXACTLY as-is.

OWNER NOTE (no action unless they say so): Lesya's reference is a leaner hub
that does NOT include our benefits grid / four-data-points / REMS-vs-DEXA
sections. We are KEEPING those (valuable, SEO). If the owner later wants the
page stripped to exactly the reference, that is a separate removal task.

================================================================
## STEP 1 — breadcrumb
================================================================
Current: `<div class="crumbs"><a href="/">Home</a> &nbsp;/&nbsp; The Technology</div>`
Change to: `Home / Learn / REMS Technology` where "Home" links to `/`, and
"Learn" is PLAIN TEXT (not a link — we have no /learn page; do not create a
dead link), "REMS Technology" plain:
```html
<div class="crumbs"><a href="/">Home</a> &nbsp;/&nbsp; Learn &nbsp;/&nbsp; REMS Technology</div>
```

================================================================
## STEP 2 — restructure the hero (replace the current page-hero inner)
================================================================
Keep the eyebrow and h1 exactly. Replace the three prose `<p>`s with: (a) the
REMS acronym block, (b) the validation line, (c) the urgency block, (d) the
arrival callout. Target structure:

```html
<section class="page-hero">
  <div class="wrap">
    <div class="crumbs"><a href="/">Home</a> &nbsp;/&nbsp; Learn &nbsp;/&nbsp; REMS Technology</div>
    <span class="eyebrow">A New Standard in Bone Health Assessment</span>
    <h1>Bone assessment has a new standard. It earned that in Europe. It is now here.</h1>

    <div class="rems-acronym">
      <div class="rems-letters"><span>R</span><span>E</span><span>M</span><span>S</span></div>
      <div class="rems-expansion">
        <span class="rems-word"><b>R</b>adiofrequency</span>
        <span class="rems-word"><b>E</b>chographic</span>
        <span class="rems-word"><b>M</b>ulti</span>
        <span class="rems-word"><b>S</b>pectrometry</span>
      </div>
      <div class="rems-measures-label">Measures</div>
      <ul class="measure-list">
        <li>Bone mineral density</li>
        <li>Bone quality</li>
        <li>Internal microarchitecture, with a Fragility Score for structural fracture risk</li>
        <li>Body composition</li>
      </ul>
      <div class="measure-tags">Radiation-free &middot; Results the same day</div>
    </div>

    <p class="hero-validation">Validated in Europe since 2013. Included in Italy's national osteoporosis guidelines. FDA-cleared in the US.</p>

    <div class="hero-urgency">
      <p>The United States is catching up. Systematic adoption of new clinical standards takes years, sometimes decades. Your bones do not have that kind of time.</p>
      <div class="you-statement">You do not have to wait.</div>
    </div>

    <div class="arrival-callout">Echolight REMS&reg; is now available in Western Washington. And it is mobile. We come to you.</div>
  </div>
</section>
```

================================================================
## STEP 3 — CSS (styles.css), in OUR design system
================================================================
Use existing brand tokens (var(--gold) #D4B985, var(--bronze), var(--serif),
var(--sans)/Montserrat, var(--ink), var(--bg), var(--cream), var(--muted)).
Match names to whatever the stylesheet actually defines.

```css
.rems-acronym{ margin:34px 0 0; padding:32px 36px 28px; background:var(--bg); border-top:1px solid var(--gold); border-bottom:1px solid var(--gold); max-width:820px; }
.rems-letters{ display:flex; gap:24px; margin-bottom:18px; }
.rems-letters span{ font-family:var(--serif); font-weight:500; font-size:64px; line-height:1; color:var(--gold); }
.rems-expansion{ display:flex; flex-wrap:wrap; gap:10px 26px; margin-bottom:24px; }
.rems-word{ font-size:13px; letter-spacing:.02em; color:var(--ink); }
.rems-word b{ color:var(--bronze); font-weight:600; }
.rems-measures-label{ font-size:10px; letter-spacing:.22em; text-transform:uppercase; color:var(--bronze); margin-bottom:12px; }
.measure-list{ list-style:none; margin:0 0 16px; padding:0; }
.measure-list li{ font-size:14px; line-height:1.7; padding:6px 0 6px 18px; position:relative; color:var(--ink); }
.measure-list li::before{ content:""; position:absolute; left:0; top:15px; width:10px; height:1px; background:var(--gold); }
.measure-tags{ font-size:10px; letter-spacing:.2em; text-transform:uppercase; color:var(--muted); }
.hero-validation{ font-size:13px; color:var(--muted); margin-top:24px; }
.hero-urgency{ margin-top:36px; max-width:780px; }
.hero-urgency p{ font-size:15.5px; line-height:1.75; color:var(--ink); margin-bottom:14px; }
.you-statement{ font-family:var(--serif); font-style:italic; font-weight:500; font-size:26px; line-height:1.3; color:var(--bronze); }
.arrival-callout{ margin-top:28px; padding:18px 26px; background:var(--cream); border-left:2px solid var(--gold); font-family:var(--serif); font-size:20px; line-height:1.45; color:var(--ink); max-width:720px; }
@media (max-width:640px){
  .rems-letters span{ font-size:48px; }
  .rems-acronym{ padding:26px 22px; }
  .you-statement{ font-size:22px; }
}
```

================================================================
## FINISH
================================================================
- Bump `?v=18` -> `?v=19` on styles.css AND site.js across ALL 9 HTML pages.
- Update CLAUDE.md: /technology hero now shows the REMS acronym block (R/E/M/S
  + expansion + Measures list + radiation-free/same-day tags), a validation
  line, an urgency block ("You do not have to wait"), and an arrival callout,
  matching Lesya's reference in our design system; breadcrumb is now
  "Home / Learn / REMS Technology" ("Learn" is plain text, no /learn page yet);
  benefits grid / four data points / REMS-vs-DEXA intentionally kept (reference
  is leaner — flagged for owner if they want them removed).
- One atomic commit, e.g. "feat(technology): reference-aligned hero (REMS acronym, urgency, arrival); assets v19". git push.

## VERIFY
- /technology hero shows: eyebrow, h1, the R E M S acronym block with the
  Measures list and tags, validation line, urgency block with the italic
  "You do not have to wait.", and the arrival callout — all in our gold/fonts.
- Breadcrumb reads "Home / Learn / REMS Technology" (Home links to /, Learn is
  plain text, no dead link).
- Everything below the hero is unchanged; mobile hero reads cleanly (acronym
  letters shrink, no overflow).
- All 9 pages on ?v=19; header/footer/disclaimer intact.
