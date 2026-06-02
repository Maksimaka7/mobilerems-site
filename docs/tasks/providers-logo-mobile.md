# TASK — Logo + brand gold + /partners rebuild + mobile polish

Three related changes in one pass. Read all sections before starting.
New logo asset is already in the repo: `assets/img/logo-full.svg`
(vertical lockup: keyhole + RF waves + wordmark; gold #D4B985, grey #858A90).

================================================================
## PART A — Logo + brand gold
================================================================

### A1. Brand gold value
The official logo uses gold `#D4B985` (lighter than the site's current
`#C0A878`). Per owner decision, align the site to the logo:
- In styles.css `:root`, change `--gold: #C0A878;` to `--gold: #D4B985;`
- Leave `--bronze: #9C7B33;` unchanged (darker accent still reads well).
- Do NOT change any other token.

### A2. Header logo (all 8 pages incl. forms is gone — so all 7 pages)
The current header `.brand` draws an inline keyhole SVG + text. The new
lockup is VERTICAL (icon over wordmark) and too tall for the 76px header.
So: keep the header horizontal, but swap the hand-drawn keyhole for the
real keyhole from the logo file, and recolor to the new gold.

Simplest robust approach: in every page header, replace the inline
`<svg viewBox="0 0 100 130">…keyhole…</svg>` inside `a.brand` with an
`<img>` of just the keyhole. Since logo-full.svg is the full lockup,
create a second asset `assets/img/logo-mark.svg` containing ONLY the
keyhole+waves glyph (no wordmark), viewBox cropped to the icon, gold
#D4B985. (Extract the icon paths: classes st0/st1/st3/st4/st5 are the
gold keyhole+waves; the two `<g>` blocks of class st2 are the wordmark
text — omit those for the mark-only version. Crop viewBox to roughly
"55 10 85 125" around the keyhole, tune as needed.)
Then header markup becomes:
```html
<a class="brand" href="/" aria-label="MobileREMS by Longevia home">
  <img src="/assets/img/logo-mark.svg" alt="" width="30" height="38" />
  <span class="brand-name"><b>MobileREMS</b><small>by Longevia</small></span>
</a>
```
Keep the existing `.brand-name` text styling. Header stays byte-identical
across all pages.

### A3. Use the full lockup somewhere prominent
On the About page (`about.html`) the `.brandblock` currently draws an
inline keyhole `.mark`. Replace that inline SVG with the full lockup:
```html
<img class="mark" src="/assets/img/logo-full.svg" alt="MobileREMS by Longevia" />
```
(Keep the `.mark` sizing rules; adjust width if needed so the wordmark is legible.)

================================================================
## PART B — Rebuild /partners with new “For Providers” content
================================================================
REPLACE the body content of `partners.html` with the new provider-focused
content below. Keep header / topbar / drawer / footer / disclaimer
byte-identical to other pages. Keep the page at the SAME url (/partners).

KEEP the existing Ivorey embed form (`qJDn7ir2vDwOw6re8NFz`, “Partner With
Us”) — it is the CRM form (CC360 / GoHighLevel). Do NOT change it. It goes
in Section 6.

Geography on THIS page only: use “South Puget Sound and Greater Seattle”
(as in the copy). Other pages keep Western Washington / Gig Harbor.
Claims: use the copy AS WRITTEN (owner decision; site is not advertising
yet, no source confirmation needed now). KEEP the disclaimer at the bottom.

Map content to existing design components (reuse classes; don't invent new
unless needed):
- **Section 1 Hero** → `.page-hero` with eyebrow “For Providers”, h1
  “There's No Standard of Care for Bone Before a Crisis. <em>Be the Practice
  That Changes That.</em>”, the sub-paragraphs, a trust line, then a
  PROOF BAR (horizontal strip): FDA-cleared · Validated against DXA in
  4,300+ patients · Sub-0.5% precision error · Radiation-free · The only
  REMS provider in Western Washington. Buttons: “Bring REMS to Your
  Practice →” (anchor to #partner-form) and “Download the Clinical Brief →”
  (href="#" disabled for now, like the brochure CTA on /technology).
- **Section 2 The Layer** → a `.split` or `.sec-head` + the four readings
  as `.cards` (01 Bone Density, 02 Bone Quality, 03 Trabecular
  Architecture, 04 Fragility Score). Include the supporting paragraphs.
  The three “links not published yet” — render as plain text or omit the
  links (hold until live); do NOT create dead links.
- **Section 3 What it does for your practice** → `.sec-head` + 3-4 sub
  blocks (Sharper clinical decisions / A differentiator / A cash-pay line /
  Beyond the scan). Cards or a stacked prose layout, your call — match
  site style. The Longevia Coaching link: plain text for now.
- **Section 4 Your Patients** → reuse the list style (like `.vert li` or a
  clean 2-col list). 11 patient groups from the copy. The two links: hold
  (plain text, not published).
- **Section 5 How it works** → 5 numbered steps (eyebrow-num style or
  `.cards`): We Come to You / The Economics Fit / They Receive a Full
  Assessment / You Receive the Report / We Stay in Touch.
- **Section 6 Request a Partnership** → `.sec-head` (“Start the
  Conversation” / heading / the South Puget Sound + Greater Seattle
  paragraph + “Scheduling for **June 2026** and beyond” — note: changed
  from April to June per owner) + the Ivorey form in `.form-card.wide`
  with `id="partner-form"` on the wrapping section so the hero button
  anchors to it. Keep “Book a 15-minute call” as a secondary ghost button
  (href="#" for now unless a Calendly link is provided).
- **Disclaimer**: the existing site-wide `.disclaimer` already covers this;
  the copy's own disclaimer paragraph can be merged/skipped since the
  global one says the same thing. Keep the global disclaimer.

Minimize em-dash usage and avoid the banned AI words where easy, but do not
distort the copy.

### Proof bar — add a small reusable style if needed
```css
.proof-bar{display:flex;flex-wrap:wrap;gap:10px 22px;align-items:center;margin-top:28px;padding-top:22px;border-top:1px solid var(--rule);font-size:13px;color:var(--charcoal);}
.proof-bar span{display:flex;align-items:center;gap:10px;}
.proof-bar span + span::before{content:"·";color:var(--gold);margin-right:10px;}
```

================================================================
## PART C — Mobile polish (all pages)
================================================================
From a mobile audit. Apply in styles.css.

### C1. Gutter on small screens
`--gutter` is 32px everywhere and feels tight on phones. Add:
```css
@media (max-width:560px){ :root{ --gutter:20px; } }
```

### C2. Hero (home) on mobile
- h1 min is too big. Change `h1{ font-size: clamp(46px,6vw,82px);}` to
  `clamp(34px,6vw,82px)`.
- Reduce hero vertical padding on mobile (the `@media (max-width:980px)`
  block) e.g. padding `36px 0 48px`.
- The hero float cards (`.hero-float.top/.bot`) overflow on small screens.
  Under `@media (max-width:560px)`: make them static or hide the bottom
  one, e.g. `.hero-float{position:static;display:inline-block;margin:10px 8px 0 0;}`
  or simply `display:none` on `.hero-float` under 480px if cleaner.
  Use judgment; they must not overlap text or escape the frame.

### C3. Section padding on mobile
`section.block{ padding:100px 0; }` is heavy on phones. Add:
```css
@media (max-width:560px){ section.block{ padding:56px 0; } .sec-head{ margin-bottom:36px; } }
```

### C4. Inner page-hero padding on mobile
```css
@media (max-width:560px){ .page-hero .wrap{ padding:40px var(--gutter) 36px; } }
```

### C5. Forms on mobile
- `.form-card{ padding:44px; }` is too much on phones:
```css
@media (max-width:560px){ .form-card, .form-card.wide{ padding:22px; } }
```
- The Ivorey iframe min-heights cause big empty space. Reduce fallback:
  change `.form-card .ghl-embed{min-height:560px;}` to `min-height:480px;`
  and `.form-card.wide .ghl-embed{min-height:800px;}` to `min-height:620px;`
  (form_embed.js still auto-resizes to real content height).

================================================================
## FINISH
================================================================
- Create `assets/img/logo-mark.svg` (icon-only) as described in A2.
- Bump cache `?v=4` -> `?v=5` on styles.css AND site.js across all 7 HTML.
- Update CLAUDE.md:
  * brand gold is now #D4B985 (logo-aligned); note #C0A878 was the prior value.
  * logo assets: assets/img/logo-full.svg (lockup), logo-mark.svg (header icon).
  * /partners is now the For Providers page (provider-focused), geography
    “South Puget Sound / Greater Seattle” on that page only; still uses the
    Ivorey “Partner With Us” form.
  * Open item: provider-page stats (4,300+ patients, LSC ~1% vs DXA ~5%)
    need sources before any paid advertising (FTC). Disclaimer must stay.
- One atomic commit, e.g.
  "feat: official logo + brand gold #D4B985, rebuild /partners (For
  Providers), mobile polish; assets v5". git push.

## VERIFY
- Header shows the real keyhole mark in new gold, identical across pages.
- About page shows full lockup.
- /partners renders all 6 sections; hero button anchors to the form;
  Ivorey form unchanged and present; disclaimer present.
- Mobile: hero text not cramped, no overflowing float cards, forms not
  overly tall, comfortable gutters.
- No dead links created for “not yet published” items.
