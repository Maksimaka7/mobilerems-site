# TASK — Replace Netlify forms with Ivorey (GoHighLevel) embeds

Lesya's CRM (Ivorey / GoHighLevel) already has the two matching forms and is
set up to receive + route leads there. We switch fully to her embedded forms
and REMOVE our Netlify Forms. Single lead channel, no duplicates.

Form IDs:
- Get Early Access (B2C, /book): `86e7Pc45jHgMd5xxlOBd`
- Partner With Us (B2B, /partners): `qJDn7ir2vDwOw6re8NFz`
Embed host: https://links.ivorey.io  | script: https://links.ivorey.io/js/form_embed.js

------------------------------------------------------------------
## STEP 1 — book.html  (Get Early Access)
In the `<section class="block">` there is `.split.media-right` containing a
`.form-card` (left) and a `.prose` “What to expect” block (right).

- DELETE the entire `.form-card` div (the whole `<form name="early-access">…</form>` and its wrapper `.form-card`).
- KEEP the `.prose` “What to expect” block exactly as is.
- In place of `.form-card`, put the Ivorey embed wrapped in a `.form-card` so it keeps the same panel styling:

```html
<div class="form-card">
  <iframe
    src="https://links.ivorey.io/widget/form/86e7Pc45jHgMd5xxlOBd"
    class="ghl-embed"
    id="inline-86e7Pc45jHgMd5xxlOBd"
    data-layout="{'id':'INLINE'}"
    data-trigger-type="alwaysShow"
    data-activation-type="alwaysActivated"
    data-deactivation-type="neverDeactivate"
    data-form-name="Get Early Access"
    data-layout-iframe-id="inline-86e7Pc45jHgMd5xxlOBd"
    data-form-id="86e7Pc45jHgMd5xxlOBd"
    title="Get Early Access"
    style="width:100%;border:none;border-radius:0;min-height:560px;"
  ></iframe>
</div>
```

------------------------------------------------------------------
## STEP 2 — partners.html  (Partner With Us)
Find the `.form-card.wide` containing `<form name="partner-inquiry">…</form>`.
- DELETE the whole `<form name="partner-inquiry">…</form>`.
- Inside the same `.form-card.wide`, put:

```html
<iframe
  src="https://links.ivorey.io/widget/form/qJDn7ir2vDwOw6re8NFz"
  class="ghl-embed"
  id="inline-qJDn7ir2vDwOw6re8NFz"
  data-layout="{'id':'INLINE'}"
  data-trigger-type="alwaysShow"
  data-activation-type="alwaysActivated"
  data-deactivation-type="neverDeactivate"
  data-form-name="Partner With Us"
  data-height="798"
  data-layout-iframe-id="inline-qJDn7ir2vDwOw6re8NFz"
  data-form-id="qJDn7ir2vDwOw6re8NFz"
  title="Partner With Us"
  style="width:100%;border:none;border-radius:0;min-height:800px;"
></iframe>
```

------------------------------------------------------------------
## STEP 3 — load the Ivorey script ONCE per page
The embed needs `form_embed.js` (it auto-resizes the iframe height).
On BOTH book.html and partners.html, add this right before `</body>`,
AFTER the existing `<script src="/assets/js/site.js?v=3"></script>` line:

```html
<script src="https://links.ivorey.io/js/form_embed.js"></script>
```

Do NOT add it more than once per page.

------------------------------------------------------------------
## STEP 4 — CSS (assets/css/styles.css)
Append:

```css
/* Ivorey / GoHighLevel embedded forms */
.ghl-embed{display:block;width:100%;border:none;background:transparent;}
.form-card .ghl-embed{min-height:560px;}
.form-card.wide .ghl-embed{min-height:800px;}
```
(The inline style min-heights are the fallback before form_embed.js runs;
the script then sets the real height. Keep both.)

------------------------------------------------------------------
## STEP 5 — remove dead Netlify Forms wiring
- DELETE the file `forms.html` (it only existed for Netlify form detection).
- In `assets/js/site.js`: REMOVE the Netlify AJAX form handler block
  (the code that intercepts `form[data-netlify]` submit, posts to "/", and
  shows the inline success message). Leave nav-shadow + mobile-drawer logic intact.
- netlify.toml: no change needed (form detection can stay off).
- Remove now-unused form CSS only if clearly dead (optional; safe to leave).

------------------------------------------------------------------
## STEP 6 — cache bump + commit
- Bump `?v=3` -> `?v=4` on styles.css AND site.js across ALL remaining HTML
  files (index, technology, who-its-for, partners, about, research, book).
  (forms.html is being deleted.)
- Atomic commit, e.g.:
  "feat(forms): replace Netlify forms with Ivorey GHL embeds; remove forms.html; bump assets v4"
- git push -> Netlify auto-deploys.

------------------------------------------------------------------
## STEP 7 — update CLAUDE.md
Replace the "Forms (Netlify Forms)" knowledge with:
- Lead forms are embedded Ivorey/GoHighLevel iframes (book = Get Early Access
  86e7Pc45jHgMd5xxlOBd; partners = Partner With Us qJDn7ir2vDwOw6re8NFz),
  loaded via https://links.ivorey.io/js/form_embed.js (include once per page).
- We no longer use Netlify Forms; forms.html removed; site.js has no form handler.
- Submissions go straight to Lesya's CRM (Ivorey/GHL).

------------------------------------------------------------------
## VERIFY before commit
- /book shows the embedded form in the left card; “What to expect” still on the right.
- /partners shows the embedded form inside the wide card.
- Both forms render (script loads, height auto-fits, no thin sliver).
- No leftover references to early-access / partner-inquiry / data-netlify.
- Pages still have identical header/footer/topbar/drawer.
