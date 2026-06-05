# TASK — Nav: ADD a "Learn" dropdown alongside "The Technology" (v2 of this task)

OWNER DECISION (updated): "Learn" is ADDED to the nav IN ADDITION to the
existing "The Technology" item — do NOT replace it. If you already executed
the previous version of this task (Learn replaced The Technology), restore
"The Technology" as a plain nav link first, then apply the rest.

Top nav order (5 items):
The Technology · Learn ▾ · Who It's For · About · Research

"Learn" dropdown contains all three Learn pages (owner wants three sub-items;
yes, /technology is intentionally reachable both ways):
1. REMS Technology → /technology
2. How REMS® Works → /how-rems-works
3. What to Expect → /what-to-expect

Applies to ALL 9 HTML pages. Header + drawer identical across pages except
per-page `active` classes. Footer, topbar, netlify.toml unchanged.

================================================================
## STEP 1 — Desktop nav (all 9 pages)
================================================================
Keep `<a href="/technology">The Technology</a>` as-is. AFTER it, insert the
dropdown. The trigger is a BUTTON (toggle), not a link — hover/focus opens it
on desktop, and a tap opens it on touch devices via :focus-within (no JS):

```html
<div class="nav-item has-sub">
  <button type="button" class="nav-sub-trigger" aria-haspopup="true">Learn <svg class="caret" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>
  <div class="nav-sub" role="menu" aria-label="Learn">
    <a href="/technology" role="menuitem">REMS Technology</a>
    <a href="/how-rems-works" role="menuitem">How REMS&reg; Works</a>
    <a href="/what-to-expect" role="menuitem">What to Expect</a>
  </div>
</div>
```

### Active states (per page, same mechanism as today)
- /technology: `active` on the "The Technology" top link (as today) AND on the
  "REMS Technology" sub-link. The Learn trigger itself NOT active here.
- /how-rems-works and /what-to-expect: `active` on the Learn trigger AND on
  the matching sub-link. "The Technology" top link NOT active.
- All other pages: unchanged single active link.

================================================================
## STEP 2 — CSS (styles.css)
================================================================
```css
.nav-links .nav-item.has-sub{ position:relative; display:inline-flex; }
.nav-links .nav-sub-trigger{
  display:inline-flex; align-items:center; gap:6px;
  background:none; border:0; padding:0; cursor:pointer;
  font:inherit; color:inherit; letter-spacing:inherit;
}
/* match the look/hover/active of the sibling nav links — reuse/extend the
   existing .nav-links a rules so the button is visually identical, including
   the active underline treatment */
.nav-links .nav-sub-trigger .caret{ width:10px; height:6px; transition:transform .2s ease; }
.nav-item.has-sub:hover .caret,
.nav-item.has-sub:focus-within .caret{ transform:rotate(180deg); }

.nav-sub{
  position:absolute; top:100%; left:50%; transform:translateX(-50%) translateY(6px);
  min-width:230px; padding:10px; margin-top:10px;
  background:var(--bg); border:1px solid var(--rule); border-radius:14px;
  box-shadow:0 24px 50px -24px rgba(54,56,60,.35);
  opacity:0; visibility:hidden; transition:opacity .18s ease, transform .18s ease;
  z-index:80;
}
.nav-sub::before{ content:""; position:absolute; left:0; right:0; top:-12px; height:12px; } /* hover bridge */
.nav-item.has-sub:hover .nav-sub,
.nav-item.has-sub:focus-within .nav-sub{
  opacity:1; visibility:visible; transform:translateX(-50%) translateY(0);
}
.nav-sub a{ display:block; padding:11px 14px; border-radius:9px; font-size:13.5px; color:var(--ink); text-decoration:none; white-space:nowrap; }
.nav-sub a:hover{ background:var(--cream); }
.nav-sub a.active{ color:var(--bronze); }
```
Checks:
- The trigger must look identical to sibling nav links (font, size, spacing,
  hover, active underline). Reuse the existing `.nav-links a` rules by adding
  the trigger to those selectors rather than duplicating values.
- Nothing in the header may clip the dropdown (no overflow:hidden in the
  chain); dropdown must render above page content.
- WIDTH: the nav now has 5 items. If at the current collapse breakpoint
  (~1000px) the 5 items + 2 CTA buttons crowd or wrap, RAISE the collapse
  breakpoint (e.g. to 1080px) so the burger takes over earlier. Verify there
  is no wrap at any width above the breakpoint.

================================================================
## STEP 3 — Mobile drawer (all 9 pages)
================================================================
Keep the existing `<a class="dl" href="/technology">The Technology</a>`.
AFTER it, insert the Learn group (always expanded, no JS):

```html
<div class="dl-group">
  <span class="dl-label">Learn</span>
  <a class="dl sub" href="/technology">REMS Technology</a>
  <a class="dl sub" href="/how-rems-works">How REMS&reg; Works</a>
  <a class="dl sub" href="/what-to-expect">What to Expect</a>
</div>
```
Then Who It's For / About / Research / Book a Scan unchanged.

```css
.drawer .dl-label{ display:block; padding:14px 0 4px; font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:var(--bronze); }
.drawer .dl.sub{ padding-left:14px; font-size:15px; }
```
(Adapt paddings to the existing `.dl` rules so it reads as one family.)

================================================================
## FINISH
================================================================
- Bump the asset version by ONE uniformly across ALL 9 HTML pages (styles.css
  AND site.js). Current should be v16 → set v17; if the previous version of
  this task already shipped v17, set v18. All pages must end on the SAME number.
- Update CLAUDE.md: top nav = The Technology · Learn ▾ (REMS Technology /
  How REMS® Works / What to Expect) · Who It's For · About · Research; the
  Learn trigger is a button-toggle (hover/focus opens; works on touch via
  focus-within); /technology is intentionally reachable both from the top item
  and from the dropdown (owner decision); drawer has The Technology + an
  always-expanded Learn group; active-state rules as in STEP 1; collapse
  breakpoint raised if it was needed (note the final value).
- One atomic commit, e.g.
  "feat(nav): add Learn dropdown alongside The Technology; assets v17". git push.

## VERIFY
- Desktop: nav shows 5 items; hovering or focusing "Learn" opens the dropdown
  (stays open moving the cursor into it); tapping "Learn" on a touch device
  opens it; the three sub-links navigate correctly.
- The Learn trigger is visually identical to other nav links (+caret), and the
  caret rotates on open; no wrap/crowding at any width above the collapse
  breakpoint.
- Active states: /technology highlights "The Technology" + the REMS Technology
  sub-link; the two new pages highlight "Learn" + their sub-link.
- Drawer: The Technology link AND the Learn group with 3 indented links.
- Header + drawer byte-identical across all 9 pages except active classes.
- All 9 pages on the same bumped ?v=; no layout regressions.
