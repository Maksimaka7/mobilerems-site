# TASK — /partners hero: split layout with the partnership form on the right

Owner request: turn the /partners hero into a two-column split — the existing
For-Providers copy on the LEFT, the Ivorey “Partner With Us” form on the RIGHT.
Keep the bottom “Request a partnership” section (#partner-form) as-is too
(owner accepts two instances of the form on the page).

File: partners.html only. Keep header/topbar/drawer/footer/disclaimer
byte-identical to other pages.

================================================================
## STEP 1 — Convert the hero to a split
================================================================
Currently the hero is `<section class="page-hero"><div class="wrap">…all copy…</div></section>`.
Restructure it into a two-column hero. Use a NEW wrapper class `.provider-hero`
so we don't disturb `.page-hero` used by other pages.

Replace the whole `<section class="page-hero">…</section>` block with:
```html
<section class="provider-hero">
  <div class="wrap provider-hero-grid">
    <div class="provider-hero-copy">
      <div class="crumbs"><a href="/">Home</a> &nbsp;/&nbsp; For Providers</div>
      <span class="eyebrow">For Providers</span>
      <h1>There's No Standard of Care for Bone Before a Crisis. <em>Be the Practice That Changes That.</em></h1>
      <p>Most patients only learn their bones are fragile after the first fracture. By then the conversation is about recovery, not prevention. REMS&reg; gives you a way to read bone strength years earlier, inside your own practice, with no radiation and no referral.</p>
      <p>MobileREMS brings clinical-grade REMS&reg; assessment to you across South Puget Sound and Greater Seattle. You add a new layer of insight for your patients; we handle the device, the certified operator, and the logistics.</p>
      <p style="font-weight:600;color:var(--ink);">Trusted, validated, radiation-free bone assessment, delivered on site.</p>
      <div class="proof-bar">
        <span>FDA-cleared</span>
        <span>Validated against DXA in 4,300+ patients</span>
        <span>Sub-0.5% precision error</span>
        <span>Radiation-free</span>
        <span>The only REMS&reg; provider in Western Washington</span>
      </div>
      <div class="lead-actions">
        <a class="btn btn-primary" href="#partner-form-hero">Bring REMS&reg; to Your Practice <span class="arr">&rarr;</span></a>
        <a class="btn btn-ghost" href="/assets/clinical-brief.pdf" target="_blank" rel="noopener">Download the Clinical Brief <span class="arr">&rarr;</span></a>
      </div>
    </div>
    <div class="provider-hero-form" id="partner-form-hero">
      <div class="form-card wide">
        <iframe
          src="https://links.ivorey.io/widget/form/qJDn7ir2vDwOw6re8NFz"
          class="ghl-embed"
          id="inline-qJDn7ir2vDwOw6re8NFz-hero"
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-activation-type="alwaysActivated"
          data-deactivation-type="neverDeactivate"
          data-form-name="Partner With Us"
          data-height="798"
          data-layout-iframe-id="inline-qJDn7ir2vDwOw6re8NFz-hero"
          data-form-id="qJDn7ir2vDwOw6re8NFz"
          title="Partner With Us"
          style="width:100%;border:none;border-radius:0;min-height:800px;"
        ></iframe>
      </div>
    </div>
  </div>
</section>
```

CRITICAL — the hero form iframe MUST use a DIFFERENT id than the bottom one.
The bottom section keeps `id="inline-qJDn7ir2vDwOw6re8NFz"`; the hero one uses
`id="inline-qJDn7ir2vDwOw6re8NFz-hero"` (and matching `data-layout-iframe-id`).
The `data-form-id` / src stay the same form. Duplicate DOM ids would break
form_embed.js auto-resize — the `-hero` suffix prevents that.

The hero “Bring REMS to Your Practice” button now anchors to the hero form
wrapper (`#partner-form-hero`) — effectively a no-op scroll since it's right
there, which is fine; or you may keep it pointing to the bottom `#partner-form`.
Either is acceptable; prefer `#partner-form-hero`.

================================================================
## STEP 2 — Keep the bottom section unchanged
================================================================
Leave the existing `<section class="block" id="partner-form">…</section>`
(the “Request a partnership” block with the form + “Book a 15-minute call”)
exactly as it is. Do not remove it. (Owner wants both.)

================================================================
## STEP 3 — CSS (styles.css)
================================================================
Add a provider-hero block. It mirrors `.page-hero` styling (cream background,
bottom border) but is a 2-col grid that stacks on mobile.
```css
.provider-hero{ background: var(--cream); border-bottom: 1px solid var(--rule); }
.provider-hero-grid{
  display:grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items:start;
  padding: 56px var(--gutter) 56px;
}
.provider-hero-copy .crumbs{ font-size:12px; letter-spacing:.06em; color:var(--muted); margin-bottom:20px; text-transform:uppercase; }
.provider-hero-copy .crumbs a{ color:var(--bronze); }
.provider-hero-copy .eyebrow{ margin-bottom:18px; }
.provider-hero-copy h1{ font-size:clamp(32px,3.6vw,52px); margin:0 0 20px; }
.provider-hero-copy p{ font-size:16px; line-height:1.6; color:var(--text); margin:0 0 14px; }
.provider-hero-form .form-card{ margin:0; }
.provider-hero-form .form-card.wide{ max-width:none; }
@media (max-width:980px){
  .provider-hero-grid{ grid-template-columns:1fr; gap:36px; padding:40px var(--gutter); }
}
@media (max-width:560px){
  .provider-hero-grid{ padding:32px var(--gutter); gap:28px; }
  .provider-hero-copy h1{ font-size:30px; }
  .provider-hero-form .form-card.wide{ padding:18px; }
}
```
Note: the global `h1{ font-size:clamp(34px,6vw,82px) }` is overridden here by
`.provider-hero-copy h1` to keep the hero headline from dominating the split.

================================================================
## FINISH
================================================================
- Bump `?v=7` -> `?v=8` on styles.css AND site.js across all 7 HTML pages
  (keep them all in sync).
- Update CLAUDE.md: /partners hero is now a split (copy left, Ivorey form
  right); the same “Partner With Us” form appears twice on the page (hero +
  bottom #partner-form), the hero instance uses id suffix `-hero` to avoid
  duplicate-id breakage of form_embed.js.
- One atomic commit, e.g.
  "feat(partners): split hero with partnership form on the right; assets v8".
  git push.

## VERIFY
- Desktop: hero is two columns — copy left, form right, aligned at top.
- Mobile: copy stacks above the form, comfortable padding, headline not huge.
- BOTH forms render and auto-size (no thin sliver); the two iframes have
  distinct ids (`…Bd` bottom, `…Bd-hero` top).
- Bottom “Request a partnership” section still present and unchanged.
- All 7 pages on ?v=8; header/footer identical; disclaimer intact.
