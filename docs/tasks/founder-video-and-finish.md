# TASK — Founder video (home + about) + hero padding + finish the polish items

**This task SUPERSEDES `docs/tasks/polish-meta-gold-mobile-cta.md`.** That one
was never executed (the site is still on v9 with old gold). Do NOT run the old
one — run THIS, which includes its items plus the founder video and the hero
padding fix. One atomic commit.

Founder video: Alexandra's YouTube Short, id `JejpUNvq6Co` (vertical 9:16).
It appears in TWO places (the founder block on the home page AND on /about) —
intentional duplication, owner-approved.

================================================================
## PART 1 — Reusable YouTube facade (poster + click-to-load)
================================================================
Don't embed a heavy autoplaying iframe on load. Use a lightweight facade:
a poster image + play button that swaps in the real iframe on click.

### 1a. site.js — add a small handler (alongside the nav/drawer logic)
```js
document.querySelectorAll('.video-facade').forEach(function (f) {
  f.addEventListener('click', function () {
    var id = f.getAttribute('data-yt');
    if (!id) return;
    var ifr = document.createElement('iframe');
    ifr.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&playsinline=1';
    ifr.title = f.getAttribute('aria-label') || 'MobileREMS video';
    ifr.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
    ifr.setAttribute('allowfullscreen', '');
    ifr.className = 'vf-iframe';
    f.replaceWith(ifr);
  });
});
```

### 1b. styles.css — facade + iframe fill the portrait `.pic` frame
The founder `.pic` is the portrait media frame (keyhole-style cream box).
The facade should fill it exactly like the current `.rf` placeholder does.
```css
.video-facade{ position:absolute; inset:0; width:100%; height:100%; padding:0; border:0; cursor:pointer; background:#000; border-radius:inherit; overflow:hidden; display:block; }
.video-facade img{ width:100%; height:100%; object-fit:cover; display:block; opacity:.92; transition:opacity .2s ease; }
.video-facade:hover img{ opacity:1; }
.video-facade .vf-play{ position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:74px; height:74px; border-radius:50%; background:rgba(253,251,246,.92); display:flex; align-items:center; justify-content:center; box-shadow:0 18px 40px -18px rgba(54,56,60,.6); transition:transform .2s ease; }
.video-facade:hover .vf-play{ transform:translate(-50%,-50%) scale(1.06); }
.video-facade .vf-play svg{ width:26px; height:26px; margin-left:3px; color:var(--bronze); }
.vf-iframe{ position:absolute; inset:0; width:100%; height:100%; border:0; border-radius:inherit; }
```
Note: poster uses the YouTube auto thumbnail (owner's choice). For a vertical
Short, `hqdefault.jpg` is 4:3 — `object-fit:cover` fills the portrait frame
(crops sides), no black bars. If on the live site the auto thumbnail looks
bad (wrong frame / letterbox), the documented fallback is to swap the poster
`src` to `/assets/img/founder-hero.jpg` (already in the repo, vertical,
on-brand) — leave a comment to that effect, but ship with the YT thumb first.

================================================================
## PART 2 — Put the facade in BOTH founder blocks
================================================================
Replace the `.rf` placeholder (the inline keyhole SVG) inside the founder
`.pic` with the facade, on BOTH pages. Keep the `.ph-tag` caption.

### index.html — the `<section class="block">` with `.founder` (eyebrow "06 Why MobileREMS")
Replace:
```html
<div class="rf" aria-hidden="true" style="opacity:.45;"><svg viewBox="0 0 100 130">…keyhole…</svg></div>
```
with:
```html
<button class="video-facade" data-yt="JejpUNvq6Co" aria-label="Play: Alexandra on REMS and MobileREMS">
  <img src="https://i.ytimg.com/vi/JejpUNvq6Co/hqdefault.jpg" alt="" loading="lazy" />
  <span class="vf-play" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>
</button>
```
Keep the existing `<span class="ph-tag"><b>Image</b> Alexandra Kusherets &mdash; founder</span>`
but change its label to `<b>Watch</b> Alexandra on MobileREMS`.

### about.html — the founder `.pic` block (same structure, has the same `.rf` placeholder)
Apply the identical replacement (same facade markup + ph-tag label change).

================================================================
## PART 3 — Home hero padding on mobile
================================================================
On mobile the home hero copy (h1 "A new way to see your bones.", the lede
paragraph, and the `.hero-actions` buttons) sits flush against the screen
edges. They must have the standard horizontal gutter like every other
section. Find why the hero loses its side padding on mobile (likely the
`.hero .wrap`/`.hero-inner` rule drops/zeros padding at the mobile
breakpoint) and fix so the hero copy + buttons have `var(--gutter)` left/right
padding on mobile, matching the rest of the page. Don't change desktop.
Example (adapt to the real rule):
```css
@media (max-width:980px){ .hero .hero-inner{ padding-left:var(--gutter); padding-right:var(--gutter); } }
```

================================================================
## PART 4 — Finish the still-pending polish items
================================================================
### 4a. /partners meta (provider focus)
- `<title>` → `For Providers · Bring REMS&reg; to Your Practice · MobileREMS`
- `<meta name="description">` → `Bring radiation-free, clinical-grade REMS&reg; bone assessment to your practice. Partner with the first mobile REMS&reg; provider in Western Washington.`
- `og:title` + `og:description` → same as above. Leave canonical/og:url/og:image/theme-color.

### 4b. Replace ALL remaining old gold `#C0A878` with `#D4B985`
- `#C0A878` → `#D4B985` (inline `.rf` ring SVGs on technology/who-its-for, etc.)
- `%23C0A878` → `%23D4B985` (favicon data-URI on every page)
- `rgba(192, 168, 120` / `rgba(192,168,120` → `rgba(212, 185, 133` (hero-pill pulse keyframe)
Grep *.html + styles.css after: ZERO `C0A878` / `192,168,120` left. (The two
founder-block placeholders that had `#C0A878` are now replaced by the video
facade, so those are gone already — fine.)

### 4c. README.md — sync off Netlify Forms
Rewrite to reality (see CLAUDE.md): static multi-page site, Netlify auto-deploy
from main; lead capture = embedded Ivorey/GoHighLevel iframes (book = Get Early
Access, partners = Partner With Us) to Lesya's CRM; **Netlify Forms NOT used**;
mention `?v=N` cache-bump + clean-URL redirects. Keep it short.

### 4d. Mobile: pin "Partner With Us" in header, remove from drawer
- CSS: at the mobile breakpoint, keep `.nav-cta .btn-ghost` ("Partner With
  Us") VISIBLE next to the burger, compact (`padding:8px 14px; font-size:12.5px;`
  and a touch smaller ≤380px); keep `.nav-cta .btn-primary` ("Book a Scan")
  HIDDEN on mobile. Use the SAME breakpoint at which the nav currently
  collapses to the burger. Logo left, then "Partner With Us" + burger right,
  no wrap/overlap at 360px. If it can't fit at 360px, shorten the visible
  label to "Partner" on mobile only and note it in your report.
- HTML (all 7 pages): delete the drawer line `<a class="dl" href="/partners">Partner With Us</a>`. Keep the 4 nav links + "Book a Scan" in the drawer. Drawer stays identical across all pages.

================================================================
## FINISH
================================================================
- Bump every `?v=` uniformly to ONE above the current value across all 7 HTML
  pages, for BOTH styles.css and site.js (current is v9 → set all to **v10**;
  if some pages already show a higher number, set them all to the same single
  highest+1 — the key is uniformity).
- Update CLAUDE.md: founder video facade (id `JejpUNvq6Co`) on home + /about
  via `.video-facade` (poster = YT thumb, click loads youtube-nocookie iframe;
  site.js handles the swap); home hero has mobile side padding now; /partners
  meta is provider-focused; old `#C0A878` fully removed (all `#D4B985`); README
  synced; mobile "Partner With Us" pinned in header + removed from drawer
  ("Book a Scan" stays in drawer).
- One atomic commit, e.g.
  "feat: founder video (home+about) + hero mobile padding; chore: partners meta, gold cleanup, README, mobile Partner CTA; assets v10".
  git push.

## VERIFY
- Both founder blocks (home + /about) show the video facade (poster + play);
  clicking loads the YouTube player inline and it plays; vertical video fills
  the portrait frame without black bars.
- Home hero copy + buttons have side padding on mobile (not flush to edges).
- partners meta says "For Providers"; no "55+ communities/employers" left.
- No `C0A878` / `192,168,120` anywhere; README no longer cites Netlify Forms.
- Mobile header: logo + "Partner With Us" + burger; "Book a Scan" not in
  header; drawer has no "Partner With Us" but has the 4 links + Book a Scan.
- All 7 pages on the same `?v=` (v10) for CSS + JS; header/footer otherwise
  identical; disclaimer intact.
