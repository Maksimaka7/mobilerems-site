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

- **Lead forms are embedded Ivorey / GoHighLevel iframes** — not our own. `book.html` embeds **Get Early Access** (`86e7Pc45jHgMd5xxlOBd`); `partners.html` embeds **Partner With Us** (`qJDn7ir2vDwOw6re8NFz`). Each iframe (`.ghl-embed`, wrapped in the existing `.form-card`) needs `https://links.ivorey.io/js/form_embed.js` loaded **once per page**, right after the `site.js` `<script>` — the script auto-resizes the iframe to fit (the inline/CSS `min-height` is only the pre-load fallback). Submissions go straight to Lesya's CRM (Ivorey/GHL); a single lead channel, no duplicates. **We no longer use Netlify Forms** — `forms.html` is removed and `site.js` has no form handler (it only does nav-shadow + the mobile drawer).

- **Logo assets** — `assets/img/logo-full.svg` is the full vertical lockup (keyhole + RF waves + wordmark, ~square 192×192); used large on the About `.brandblock`. `assets/img/logo-mark.svg` is the icon only (keyhole + waves, cropped viewBox, no wordmark); used as the `<img>` inside every header `a.brand` (the header stays horizontal: mark + text). Both are gold `#D4B985`. If you regenerate either, keep the gold in sync with `--gold`.

- **Home hero is the founder photo** — `index.html`'s `.hero-media > .keyframe.has-photo` shows `assets/img/founder-hero.jpg` (852×1065, 4:5) clipped to the keyhole arch, with a `.hero-photo-tone` warm overlay and a gold inner-edge `inset` box-shadow. The earlier animated spine-scan SVG (`.hero-scan` / `.hs-*` classes + `@keyframes hs*`) was **removed** from both HTML and CSS — it was not moved to `/technology`; it lives in git history if ever needed.

- **Brochure PDF** — the Echolight "Bone Identity" brochure lives at `/assets/clinical-brief.pdf` (canonical URL). The home "How REMS works" `.teaser` shows `assets/img/brochure-cover.jpg` as a `.brochure-cover` link (gold-framed on the cream mat) that opens the PDF in a new tab; the teaser's button is now "View the brochure" and also opens the PDF (it no longer links to `/technology` — that page is still reachable from the nav). The `.dl-cta` "Download brochure" button on `/technology` and the "Download the Clinical Brief" button on `/partners` both point to the PDF too. All brochure links use `target="_blank" rel="noopener"`. The "Book a 15-minute call" button on `/partners` stays disabled (no Calendly yet).

- **`/partners` is the "For Providers" page** — provider-focused (six sections: hero + proof bar, the four readings, what it does for the practice, patient groups, how it works, request-a-partnership). The hero CTA anchors to `#partner-form` on the final section. **Geography on this page only is "South Puget Sound and Greater Seattle"**; every other page keeps "Western Washington" / "Gig Harbor". It still uses the Ivorey "Partner With Us" form.

## Copy & brand rules (not visible in files)
- Gold is #D4B985 (the official logo gold; the whole site was aligned to it). The prior value was #C0A878. The brand book's #D4C8CA is a typo — never use it anywhere.
- Banned AI words in copy: journey, holistic, wellness, game-changer, seamless. Avoid em-dash as a stylistic device. US English. Vendor name is always "Echolight REMS®".
- Do NOT add the claim "a decade of biological age reversed" (or variants) anywhere on the site — intentionally omitted from /about pending founder sign-off (FTC/medical-claim risk).
- **Provider-page stats are unsourced.** The `/partners` proof bar and copy ("Validated against DXA in 4,300+ patients", "Sub-0.5% precision error", "FDA-cleared", "the only REMS® provider in Western Washington") are owner-approved for the current pre-advertising site but **need sources before any paid advertising** (FTC). The global `.disclaimer` must stay on the page.

## Brand / design tokens

All color, type, and spacing live as CSS custom properties in `:root` at the top of `assets/css/styles.css` (palette porcelain/cream/charcoal + logo gold `--gold: #D4B985`, was `#C0A878`; darker accent `--bronze: #9C7B33`; serif display Cormorant Garamond, sans body Proxima Nova/Montserrat). Use the variables (`--gold`, `--ink`, `--bg`, etc.) rather than hard-coding values.
