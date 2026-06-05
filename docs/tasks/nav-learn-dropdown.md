# TASK — Nav: "Learn" dropdown (replaces "The Technology" item) with 3 sub-pages

Owner request: a "Learn" item in the top nav holding the three Learn pages as
a submenu. Decision (state in commit): "Learn" REPLACES the current
"The Technology" nav item — the three sub-pages ARE the Learn cluster, so a
separate "The Technology" item would duplicate.

Submenu items (in this order):
1. REMS Technology → /technology
2. How REMS® Works → /how-rems-works
3. What to Expect → /what-to-expect

Applies to ALL 9 HTML pages (header + drawer must stay identical across
pages except the per-page `active` classes, same as today). Footer, topbar,
netlify.toml unchanged.

================================================================
## STEP 1 — Desktop nav (all 9 pages)
================================================================
Replace `<a href="/technology" ...>The Technology</a>` in `.nav-links` with a
dropdown item. The trigger is still a real link to the hub (/technology), so
it works without JS and is SEO/no-JS safe:

```html
<div class="nav-item has-sub">
  <a href="/technology" class="nav-sub-trigger">Learn <svg class="caret" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></a>
  <div class="nav-sub" role="menu" aria-label="Learn">
    <a href="/technology" role="menuitem">REMS Technology</a>
    <a href="/how-rems-works" role="menuitem">How REMS&reg; Works</a>
    <a href="/what-to-expect" role="menuitem">What to Expect</a>
  </div>
</div>
```
Keep Who It's For / About / Research as plain links after it.

### Active states (per page, same mechanism as today)
- On /technology, /how-rems-works, /what-to-expect: add `active` to the
  `.nav-sub-trigger` AND to the matching submenu link.
- Other pages keep their existing single `active` link.

================================================================
## STEP 2 — CSS (styles.css)
================================================================
Hover + keyboard (focus-within) dropdown, with a hover bridge so it doesn't
close between trigger and panel. Match brand tokens.

```css
.nav-links .nav-item.has-sub{ position:relative; display:inline-flex; }
.nav-links .nav-sub-trigger{ display:inline-flex; align-items:center; gap:6px; }
.nav-links .nav-sub-trigger .caret{ width:10px; height:6px; transition:transform .2s ease; }
.nav-item.has-sub:hover .nav-sub-trigger .caret,
.nav-item.has-sub:focus-within .nav-sub-trigger .caret{ transform:rotate(180deg); }

.nav-sub{
  position:absolute; top:100%; left:50%; transform:translateX(-50%) translateY(6px);
  min-width:230px; padding:10px; margin-top:10px;
  background:var(--bg); border:1px solid var(--rule); border-radius:14px;
  box-shadow:0 24px 50px -24px rgba(54,56,60,.35);
  opacity:0; visibility:hidden; transition:opacity .18s ease, transform .18s ease;
  z-index:80;
}
/* hover bridge: keeps the menu open while the cursor crosses the gap */
.nav-sub::before{ content:""; position:absolute; left:0; right:0; top:-12px; height:12px; }
.nav-item.has-sub:hover .nav-sub,
.nav-item.has-sub:focus-within .nav-sub{
  opacity:1; visibility:visible; transform:translateX(-50%) translateY(0);
}
.nav-sub a{
  display:block; padding:11px 14px; border-radius:9px;
  font-size:13.5px; color:var(--ink); text-decoration:none; white-space:nowrap;
}
.nav-sub a:hover{ background:var(--cream); }
.nav-sub a.active{ color:var(--bronze); }
```
If `.nav-links` (or the header) has `overflow:hidden` anywhere, remove/adjust
it so the dropdown isn't clipped. Verify the dropdown sits above page content
(header stacking context / z-index).

The trigger inherits the existing nav link styling (incl. the `active`
underline) — verify the caret doesn't break the underline/spacing.

================================================================
## STEP 3 — Mobile drawer (all 9 pages)
================================================================
Replace the flat `<a class="dl" href="/technology">The Technology</a>` with a
simple Learn group (no JS accordion — always expanded, simple and reliable):

```html
<div class="dl-group">
  <span class="dl-label">Learn</span>
  <a class="dl sub" href="/technology">REMS Technology</a>
  <a class="dl sub" href="/how-rems-works">How REMS&reg; Works</a>
  <a class="dl sub" href="/what-to-expect">What to Expect</a>
</div>
```
Keep Who It's For / About / Research / Book a Scan below it, unchanged.

```css
.drawer .dl-label{ display:block; padding:14px 0 4px; font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:var(--bronze); }
.drawer .dl.sub{ padding-left:14px; font-size:15px; }
```
(Adapt paddings to the existing `.dl` rules so it reads as one family.)

================================================================
## FINISH
================================================================
- Bump `?v=16` -> `?v=17` on styles.css AND site.js across ALL 9 HTML pages.
- Update CLAUDE.md: top nav now has a "Learn" dropdown (replacing the
  "The Technology" item) → REMS Technology / How REMS® Works / What to Expect;
  drawer has a matching always-expanded Learn group; active-state rule (trigger
  + sub-link active on the three Learn pages). Header/drawer remain identical
  across all 9 pages except per-page active classes.
- One atomic commit, e.g.
  "feat(nav): Learn dropdown with three sub-pages; assets v17". git push.

## VERIFY
- Desktop: hovering "Learn" opens the dropdown (and it stays open while moving
  the cursor into it); keyboard Tab reaches the three items; clicking "Learn"
  itself goes to /technology; dropdown not clipped by the header.
- The caret rotates on open; nav spacing/underline not broken.
- On each of the 3 Learn pages, "Learn" is highlighted and the right sub-item
  is marked active; other pages unchanged.
- Mobile drawer shows the Learn group with 3 indented links; all work.
- Header + drawer byte-identical across all 9 pages except active classes.
- All 9 pages on ?v=17; no other layout regressions.
