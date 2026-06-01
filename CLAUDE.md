# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing site for **MobileREMS by Longevia** — mobile bone quality assessment (Echolight REMS®) in Western Washington. A multi-page **static** site: hand-written HTML per page, one shared `assets/css/styles.css`, one shared `assets/js/site.js`. No framework, no bundler, **no build step**. Deployed on Netlify (auto-deploy from `main`, publish dir = repo root).

## Commands

There is no build, lint, or test tooling. To preview locally, serve the repo root over HTTP (clean-URL redirects won't apply, but pages load):

```
python3 -m http.server 8000   # then open http://localhost:8000/index.html
```

## Conventions that span multiple files

These are the rules that aren't obvious from any single file and are easy to get wrong:

- **Cache-busting `?v=N`** — `styles.css` and `site.js` are referenced as `/assets/css/styles.css?v=2` and `/assets/js/site.js?v=2`. Filenames are NOT content-hashed and `netlify.toml` sets `/assets/*` to `must-revalidate`. Whenever you edit a file under `assets/`, **bump the `?v=` number on every `<link>`/`<script>` across all HTML pages** (they must stay in sync) or deployed pages load stale CSS/JS. This is why the recent git history is full of "bust asset cache" commits.

- **Clean URLs** — pages are linked without `.html` (e.g. `<a href="/technology">`). Each works only because `netlify.toml` has a `200` rewrite from `/technology` → `/technology.html`. **Adding a new page means adding a matching `[[redirects]]` block** in `netlify.toml`.

- **Shared nav is duplicated, not included** — there is no templating. The top bar, header nav, and mobile drawer markup are copy-pasted into every page. Adding/renaming a nav link means editing every HTML file. `site.js` expects the elements `#header`, `#burger`, `#drawer`, `#drawer-close` to exist on each page.

- **Netlify Forms** — forms use `data-netlify="true"` + `netlify-honeypot="bot-field"`. Netlify detects forms at build time from static HTML, but real forms are submitted via AJAX (`site.js`), so they are also mirrored as `hidden` plain forms in **`forms.html`** purely for detection. **Any new form, or new field on an existing form, must be added to `forms.html` too** or submissions are rejected. Existing forms: `partner-inquiry` (partners.html) and `early-access` (book.html). `site.js` special-cases the name `partner-inquiry` for its success message — match that name exactly when wiring success copy.

## Brand / design tokens

All color, type, and spacing live as CSS custom properties in `:root` at the top of `assets/css/styles.css` (palette porcelain/cream/charcoal + brushed gold `#C0A878`; serif display Cormorant Garamond, sans body Proxima Nova/Montserrat). Use the variables (`--gold`, `--ink`, `--bg`, etc.) rather than hard-coding values.
