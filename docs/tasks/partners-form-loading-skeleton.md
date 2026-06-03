# TASK — /partners hero form: loading skeleton behind the Ivorey iframe

The Ivorey/GoHighLevel form is a third-party iframe (links.ivorey.io). While
their server/script loads, the user sees an empty white box (the reserved
min-height). We can't speed up their load (third-party), but we can make the
wait read as "loading" instead of broken: show a skeleton placeholder behind
the iframe and hide it once the form loads.

File: partners.html + styles.css + site.js. Only the hero form block changes.

NOTE (be honest in the result/commit): this is a loading-state UX only. It
does NOT make the form load faster. If the form regularly hangs for many
seconds, that's an Ivorey/GHL-side issue worth raising with them; our markup
(iframe + form_embed.js once per page) is correct and unchanged.

================================================================
## STEP 1 — wrap the iframe with a skeleton (partners.html)
================================================================
Current hero form block:
```html
<div class="provider-hero-form" id="partner-form-hero">
  <div class="form-card wide">
    <iframe src="https://links.ivorey.io/widget/form/qJDn7ir2vDwOw6re8NFz" class="ghl-embed" id="inline-qJDn7ir2vDwOw6re8NFz-hero" ... style="width:100%;border:none;border-radius:0;min-height:800px;"></iframe>
  </div>
</div>
```
Add a `.form-loading` skeleton sibling BEFORE the iframe and add `is-loading`
to the `.form-card`:
```html
<div class="form-card wide is-loading">
  <div class="form-loading" aria-hidden="true">
    <div class="fl-row"><span class="fl-label"></span><span class="fl-input"></span></div>
    <div class="fl-row"><span class="fl-label"></span><span class="fl-input"></span></div>
    <div class="fl-row"><span class="fl-label"></span><span class="fl-input"></span></div>
    <div class="fl-row"><span class="fl-label"></span><span class="fl-input"></span></div>
    <div class="fl-note">Loading the secure partnership form…</div>
  </div>
  <iframe src="https://links.ivorey.io/widget/form/qJDn7ir2vDwOw6re8NFz"
    class="ghl-embed" id="inline-qJDn7ir2vDwOw6re8NFz-hero"
    data-layout="{'id':'INLINE'}" data-trigger-type="alwaysShow"
    data-activation-type="alwaysActivated" data-deactivation-type="neverDeactivate"
    data-form-name="Partner With Us" data-height="798"
    data-layout-iframe-id="inline-qJDn7ir2vDwOw6re8NFz-hero"
    data-form-id="qJDn7ir2vDwOw6re8NFz" title="Partner With Us"
    style="width:100%;border:none;border-radius:0;min-height:800px;"></iframe>
</div>
```
Keep all the iframe's existing data-* attributes and id EXACTLY as they are.

================================================================
## STEP 2 — CSS (styles.css)
================================================================
```css
.form-card.is-loading{ position:relative; }
.form-card .ghl-embed{ position:relative; z-index:2; background:transparent; }
.form-loading{
  position:absolute; inset:0; z-index:1; padding:8px 4px;
  display:flex; flex-direction:column; gap:22px; justify-content:flex-start;
  pointer-events:none;
}
.form-loading .fl-row{ display:flex; flex-direction:column; gap:10px; }
.form-loading .fl-label{ width:38%; height:12px; border-radius:4px; }
.form-loading .fl-input{ width:100%; height:44px; border-radius:8px; }
.form-loading .fl-label, .form-loading .fl-input{
  background:linear-gradient(90deg, var(--cream) 25%, #f3eee4 37%, var(--cream) 63%);
  background-size:400% 100%; animation:flShimmer 1.4s ease infinite;
}
.form-loading .fl-note{ margin-top:6px; font-size:13px; color:var(--muted); text-align:center; }
@keyframes flShimmer{ 0%{ background-position:100% 0; } 100%{ background-position:0 0; } }
.form-card:not(.is-loading) .form-loading{ display:none; }
@media (prefers-reduced-motion: reduce){ .form-loading .fl-label,.form-loading .fl-input{ animation:none; } }
```
Rationale: the iframe sits on top (`z-index:2`, transparent bg) so the moment
Ivorey paints the real form it visually covers the skeleton; the JS then
removes `.is-loading` to drop the skeleton from the layout.

================================================================
## STEP 3 — hide the skeleton when the form loads (site.js)
================================================================
Add a small, defensive handler (alongside the existing nav/drawer + video
facade logic):
```js
(function(){
  var card = document.querySelector('.form-card.is-loading');
  if(!card) return;
  var ifr = card.querySelector('iframe.ghl-embed');
  if(!ifr) return;
  var done = function(){ card.classList.remove('is-loading'); };
  ifr.addEventListener('load', function(){ setTimeout(done, 400); });
  setTimeout(done, 6000); // safety net: drop the skeleton after 6s regardless
})();
```

================================================================
## FINISH
================================================================
- Bump `?v=14` -> `?v=15` on styles.css AND site.js across all 7 HTML pages.
- Update CLAUDE.md: the /partners hero form now shows a shimmer skeleton
  ("Loading the secure partnership form…") behind the Ivorey iframe until it
  loads (site.js removes `.is-loading` on iframe load, 6s fallback). Loading
  state only; Ivorey load speed is third-party.
- One atomic commit, e.g.
  "feat(partners): loading skeleton behind the Ivorey form; assets v15". git push.

## VERIFY
- On a fresh load of /partners, the form area shows a shimmer skeleton +
  "Loading the secure partnership form…" instead of a blank white box.
- When the Ivorey form finishes loading, the skeleton disappears and the real
  form shows (no double-form, no leftover skeleton).
- The skeleton never persists (6s fallback removes it even if `load` misfires).
- The iframe id / data-* unchanged; form still submits to the CRM.
- All 7 pages on ?v=15; header/footer identical; disclaimer intact.
