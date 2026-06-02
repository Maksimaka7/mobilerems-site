# MobileREMS by Longevia — Website

Mobile bone quality assessment (Echolight REMS®) — Western Washington.
Multi-page static site: plain HTML/CSS/JS. No build step. Deployed on Netlify.

See `CLAUDE.md` for the detailed conventions; this is the short version.

## Structure
```
index.html            Home
technology.html       The Technology (how it works, benefits, measures, REMS vs DEXA)
who-its-for.html      Who It's For (audiences)
partners.html         For Providers (provider-focused + Partner With Us form)
about.html            About (founder + Longevia)
research.html         Research (publications, authority)
book.html             Book a Scan (B2C early-access form)
assets/css/styles.css Shared styles
assets/js/site.js     Shared behaviour (nav shadow + mobile drawer)
assets/clinical-brief.pdf   Echolight "Bone Identity" brochure (linked from the site)
netlify.toml          Clean URLs, headers, caching
```

## Deploy
Auto-deploys from `main` via Netlify. Publish dir: repo root. No build step.

## Lead capture (forms)
Lead forms are **embedded Ivorey / GoHighLevel iframes**, not our own:
`book.html` = Get Early Access, `partners.html` = Partner With Us. Each page
loads `https://links.ivorey.io/js/form_embed.js` once (it auto-resizes the
iframe). Submissions go straight to Lesya's CRM (Ivorey/GHL).
**Netlify Forms are NOT used** — there is no `forms.html` and `site.js` has no
form handler.

## Conventions
- **Cache-bust:** `styles.css`/`site.js` are referenced as `…?v=N`. Filenames
  aren't content-hashed and `/assets/*` is `must-revalidate`, so when you edit
  anything under `assets/`, bump `?v=N` on every page (keep them in sync).
- **Clean URLs:** pages are linked without `.html` (e.g. `/technology`); each
  needs a matching `200` rewrite in `netlify.toml`.
- **Shared chrome** (topbar/header/drawer/footer/disclaimer) is copy-pasted,
  not templated — change it on every page.

## Brand
Longevia master brand · MobileREMS product. Palette porcelain/cream/charcoal +
logo gold `#D4B985` (the `--gold` token; `--bronze` `#9C7B33` accent). Serif
display (Cormorant Garamond), sans body (Proxima Nova/Montserrat).
