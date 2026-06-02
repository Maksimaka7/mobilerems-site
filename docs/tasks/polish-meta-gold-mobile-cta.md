# TASK — Polish pass: /partners meta, gold cleanup, README, mobile Partner CTA

Four small, unrelated cleanups in one commit. Keep shared chrome
(header/topbar/drawer/footer/disclaimer) byte-identical across all 7 pages
EXCEPT for the intentional drawer change in PART D (which is applied to all
pages identically).

================================================================
## PART A — /partners meta tags (provider focus)
================================================================
partners.html `<head>` still has the OLD audience wording. Update to match
the page (For Providers). Replace:
- `<title>` → `For Providers · Bring REMS&reg; to Your Practice · MobileREMS`
  (currently "For Partners · …")
- `<meta name="description">` content →
  `Bring radiation-free, clinical-grade REMS® bone assessment to your practice. Partner with the first mobile REMS® provider in Western Washington.`
- `<meta property="og:title">` → same as the new title.
- `<meta property="og:description">` → same as the new description.
Leave canonical, og:url, og:image, theme-color as they are. Do not touch
other pages' meta.

================================================================
## PART B — Replace remaining old gold #C0A878 with #D4B985
================================================================
The brand gold is `#D4B985` (the `--gold` token was updated long ago), but a
few hard-coded instances of the OLD gold `#C0A878` still survive in inline
SVGs, the favicon data-URI, and a pulse keyframe. Replace ALL remaining
occurrences across every HTML and CSS file:
- `#C0A878` → `#D4B985`   (inline `.rf` ring SVGs on technology/who-its-for/etc., any inline strokes/fills)
- `%23C0A878` → `%23D4B985`   (URL-encoded # inside the favicon `data:image/svg+xml` on every page)
- `rgba(192, 168, 120` and `rgba(192,168,120` → `rgba(212, 185, 133`   (the hero-pill pulse keyframe in styles.css; #D4B985 = 212,185,133)
Grep both *.html and styles.css afterwards to confirm ZERO `C0A878` /
`192,168,120` / `192, 168, 120` remain. Prefer the `--gold` / `--bronze`
variables where an inline value is easily swappable, but a literal
`#D4B985` is fine for inline SVG fills/strokes that can't use a CSS var.

================================================================
## PART C — README.md sync
================================================================
README.md still documents the old Netlify Forms setup. Rewrite the relevant
parts to match reality (see CLAUDE.md as the source of truth):
- Static multi-page site, no build, Netlify auto-deploy from main.
- Lead capture is **embedded Ivorey / GoHighLevel iframes** (book.html =
  Get Early Access; partners.html = Partner With Us), submissions go to
  Lesya's CRM. **Netlify Forms are NOT used** (forms.html removed; site.js
  has no form handler).
- Mention the `?v=N` cache-bump rule and clean-URL redirects in netlify.toml.
Keep it short; don't duplicate all of CLAUDE.md, just stop it from being wrong.

================================================================
## PART D — Mobile: pin "Partner With Us" in the header, remove from drawer
================================================================
Owner request: on mobile, the "Partner With Us" button should be visible in
the top header next to the logo (currently only the burger shows on mobile),
and it should be REMOVED from the slide-in drawer menu.

### D1. Show the Partner button on mobile (CSS, styles.css)
Today the header `.nav-cta` shows "Partner With Us" + "Book a Scan" on desktop
and collapses to just the burger on mobile (the two `.btn`s are hidden at the
mobile breakpoint). Change it so on mobile:
- "Partner With Us" (the `.btn-ghost` in `.nav-cta`) STAYS visible, sits
  left of the burger, with compact styling so it fits a ~360px viewport.
- "Book a Scan" (the `.btn-primary` in `.nav-cta`) STAYS hidden on mobile
  (it remains in the drawer).
- The burger stays at the far right.

Give the Partner button a compact mobile size, e.g. under the mobile
breakpoint:
```css
@media (max-width:860px){
  .nav-cta .btn-primary{ display:none; }       /* Book a Scan stays in drawer */
  .nav-cta .btn-ghost{ display:inline-flex; padding:8px 14px; font-size:12.5px; } /* Partner With Us, compact */
}
@media (max-width:380px){
  .nav-cta .btn-ghost{ padding:7px 11px; font-size:11.5px; }
}
```
(Match the actual existing breakpoint used to hide the nav — if the nav
collapses at a different width than 860px, use that same width so the burger
appears at the same point the Partner button switches to compact. The key
outcome: logo left, then on the right "Partner With Us" + burger, no overlap,
no wrap, fits ~360px. If "Partner With Us" cannot fit without wrapping at
360px even at 11.5px, it's acceptable to shorten the visible label to
"Partner" ONLY on mobile via a span swap — but try to keep the full label
first; note in your report which you did.)

### D2. Remove "Partner With Us" from the drawer (HTML, all 7 pages)
In the mobile `.drawer` on every page, DELETE the line:
```html
<a class="dl" href="/partners">Partner With Us</a>
```
Keep the other drawer links (The Technology / Who It's For / About / Research)
and the "Book a Scan" button in the drawer. The drawer block must stay
identical across all 7 pages after the removal.

================================================================
## FINISH
================================================================
- Bump `?v=9` -> `?v=10` on styles.css AND site.js across all 7 HTML pages.
- Update CLAUDE.md: note (a) /partners meta now provider-focused; (b) the old
  #C0A878 gold is fully gone (everything is #D4B985 now); (c) on mobile the
  "Partner With Us" CTA is pinned in the header and removed from the drawer
  ("Book a Scan" stays in the drawer).
- One atomic commit, e.g.
  "chore: partners meta + gold cleanup + README; feat: mobile Partner CTA in header; assets v10".
  git push.

## VERIFY
- partners.html title/description/og say "For Providers" / new description;
  no "55+ communities" or "employers" left in its meta.
- No `C0A878`, `%23C0A878`, or `192,168,120` anywhere in HTML/CSS.
- README no longer mentions Netlify Forms as the lead mechanism.
- Mobile (≤860px): header shows logo + "Partner With Us" + burger; "Book a
  Scan" not in header; tapping burger opens a drawer WITHOUT "Partner With
  Us" but WITH the 4 nav links + Book a Scan. No overlap/wrap at 360px.
- Desktop unchanged (both buttons in header as before).
- All 7 pages on ?v=10; header/footer otherwise identical; disclaimer intact.
