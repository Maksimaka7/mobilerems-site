# TASK — /partners hero: remove bottom form, widen hero form, restyle proof points

Three changes to `partners.html` + `styles.css`. The split hero stays
(copy left, Ivorey form right). Keep header/topbar/drawer/footer/disclaimer
byte-identical to other pages.

Why: the bottom form is a SECOND copy of the same GHL iframe — it loads
`form_embed.js` work twice and slows the page. Removing it leaves ONE form
(faster). The remaining hero form should be a bit wider, and the left-column
proof points should be structured + highlighted instead of a cramped run-on.

================================================================
## CHANGE 1 — Remove the bottom "Request a partnership" section
================================================================
Delete the ENTIRE block:
```html
<section class="block" id="partner-form"> … Request a partnership … </section>
```
(the one containing the second `iframe id="inline-qJDn7ir2vDwOw6re8NFz"` and
the disabled "Book a 15-minute call" button). Remove the whole section.

After removal there is exactly ONE "Partner With Us" iframe on the page — the
hero one (`id="inline-qJDn7ir2vDwOw6re8NFz-hero"`). Leave that hero iframe id
as-is (the `-hero` suffix is harmless now that it's unique).

The hero CTA already anchors to `#partner-form-hero` (the hero form wrapper),
so it still works. Do NOT leave any link pointing to the now-deleted
`#partner-form` — grep partners.html for `#partner-form"` and confirm only
`#partner-form-hero` remains.

================================================================
## CHANGE 2 — Widen the hero form column
================================================================
In styles.css, the split grid is currently:
```css
.provider-hero-grid{ display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:start; padding:56px var(--gutter) 56px; }
```
Give the form a bit more width and tighten the gap:
```css
.provider-hero-grid{ display:grid; grid-template-columns:1fr 1.15fr; gap:44px; align-items:start; padding:56px var(--gutter) 56px; }
```
(Note: the GHL form is internally single-column, so this widens the fields
and makes the form look less narrow; it will not dramatically shorten its
height — that's a limitation of the embed, expected.)

Leave the `@media (max-width:980px)` rule (it already collapses to one column).

================================================================
## CHANGE 3 — Structure + highlight the left-column proof points
================================================================
Inside `.provider-hero-copy`, REPLACE the current proof bar:
```html
<div class="proof-bar"> <span>FDA-cleared</span> … </div>
```
with a highlighted "credentials" panel:
```html
<div class="cred-panel">
  <p class="cred-title">Clinical credentials</p>
  <ul class="cred-list">
    <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" opacity=".25"/><path d="M8 12.5l2.5 2.5L16 9"/></svg><span><b>FDA-cleared</b></span></li>
    <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" opacity=".25"/><path d="M8 12.5l2.5 2.5L16 9"/></svg><span>Validated against DXA in <b>4,300+ patients</b></span></li>
    <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" opacity=".25"/><path d="M8 12.5l2.5 2.5L16 9"/></svg><span><b>Sub-0.5%</b> precision error</span></li>
    <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" opacity=".25"/><path d="M8 12.5l2.5 2.5L16 9"/></svg><span><b>Radiation-free</b></span></li>
    <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" opacity=".25"/><path d="M8 12.5l2.5 2.5L16 9"/></svg><span>The <b>only REMS&reg; provider</b> in Western Washington</span></li>
  </ul>
</div>
```
Add CSS (the panel uses the porcelain bg so it lifts off the cream hero):
```css
.cred-panel{
  margin-top:30px; padding:22px 24px;
  background:var(--bg); border:1px solid var(--rule); border-radius:14px;
  box-shadow:0 18px 44px -34px rgba(54,56,60,.5);
}
.cred-panel .cred-title{
  margin:0 0 14px; font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:var(--bronze);
}
.cred-list{ list-style:none; margin:0; padding:0; display:grid; gap:11px; }
.cred-list li{ display:flex; align-items:flex-start; gap:11px; font-size:14.5px; line-height:1.4; color:var(--ink); }
.cred-list svg{ flex:0 0 auto; width:18px; height:18px; margin-top:1px; color:var(--gold); }
.cred-list b{ font-weight:600; }
@media (max-width:560px){ .cred-panel{ padding:18px 18px; } .cred-list li{ font-size:14px; } }
```
You may leave the old `.proof-bar` CSS in place (it's still used in the home
hero? check — if `.proof-bar` is not referenced anywhere after this change,
remove its CSS too). Grep both HTML and CSS for `proof-bar` and clean up if
unused.

================================================================
## FINISH
================================================================
- Bump `?v=8` -> `?v=9` on styles.css AND site.js across all 7 HTML pages
  (keep in sync).
- Update CLAUDE.md: the `/partners` hero form is now the ONLY "Partner With
  Us" form on the page (the bottom "Request a partnership" section was
  removed); the hero form column is slightly wider (`1fr 1.15fr`); the
  left-column proof points are now a `.cred-panel` credentials list (the old
  proof-bar wording is unchanged, still owner-approved/unsourced — keep the
  FTC note and the global disclaimer).
- One atomic commit, e.g.
  "feat(partners): single hero form, wider form column, credentials panel; assets v9".
  git push.

## VERIFY
- Only ONE ghl-embed iframe on partners.html (the hero, id `…-hero`).
- No bottom "Request a partnership" section; no link to `#partner-form`
  (only `#partner-form-hero`).
- Hero form column visibly wider than before; copy column still fits the
  headline.
- Left column shows the credentials panel (porcelain card, gold checks,
  bold metrics), not the old run-on proof bar.
- Mobile: copy + panel stack above the form; panel padding comfortable.
- All 7 pages on ?v=9; header/footer identical; disclaimer intact.
