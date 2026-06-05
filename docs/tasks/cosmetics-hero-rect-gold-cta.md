# TASK — Two cosmetic fixes: rectangular hero photo + gold Partner CTA

Two small visual changes. One atomic commit.

================================================================
## FIX 1 — Home hero photo: keyhole arch → rectangle
================================================================
On index.html the founder photo sits in the hero `.keyframe`, which currently
has the keyhole arch shape (`border-radius: 220px 220px 18px 18px`). Owner
wants the photo RECTANGULAR.

In styles.css:
- Change the `.keyframe` border-radius from the arch to a uniform soft
  `18px` (consistent with the site's other cards/frames — do NOT use sharp
  0px corners).
- Check every place that repeats the arch radius for the same element
  (e.g. `.keyframe::after` noise layer, the `.keyframe.has-photo` inset gold
  shadow, `.hero-photo-tone` if it sets a radius) and align them all to the
  same 18px so no layer keeps the old arch.
- Scope: this affects ONLY the home hero (the `.keyframe` is used only
  there). Confirm with a grep that `.keyframe` appears only in index.html.
- The ph-tag and the float cards are position-based and unaffected; verify
  they still sit correctly on the rectangular frame.
- The radial gradient background of `.keyframe` was tuned for the arch
  (highlight at 50% 12%); it still looks fine on a rectangle — leave it
  unless it visibly clashes, in which case soften to a plain cream gradient.

================================================================
## FIX 2 — Header "Partner With Us" button: ghost → gold
================================================================
In the header `.nav-cta` on ALL 9 pages, the Partner button is currently:
```html
<a class="btn btn-ghost" href="/partners"><span class="lbl-full">Partner With Us</span><span class="lbl-short">Partner</span></a>
```
Change its class to the gold fill style:
```html
<a class="btn btn-gold" href="/partners"><span class="lbl-full">Partner With Us</span><span class="lbl-short">Partner</span></a>
```
CRITICAL follow-ups so mobile does not break:
- The mobile rules currently target `.nav-cta .btn-ghost` (compact padding/
  font at the collapse breakpoint, and the lbl-full/lbl-short swap sizing).
  Update those selectors to match the new class (e.g. change them to
  `.nav-cta .btn-gold`, or to a class-agnostic `.nav-cta .btn:not(.btn-primary)`),
  so the button stays visible and compact in the mobile header exactly as
  it does today.
- Verify `btn-gold` has proper hover state and contrasts with the header
  background; it should look like the existing gold buttons (e.g. "Download
  brochure"). The dark "Book a Scan" (btn-primary) next to it stays as is —
  the pair should read clearly (gold + dark).
- ONLY the header instance changes. Any other `btn-ghost` on body content
  (e.g. /partners hero "Download the Clinical Brief", two-path CTAs) stays
  ghost. Grep to be sure you change exactly the 9 header instances.

================================================================
## FINISH
================================================================
- Bump the asset `?v=` by ONE uniformly across ALL 9 HTML pages (styles.css
  AND site.js). Use current+1 whatever the current number is (v17 → v18 if
  the Learn-dropdown task already shipped; otherwise v16 → v17). All pages on
  the SAME number.
- Update CLAUDE.md: home hero photo frame is now rectangular (18px radius,
  arch removed); the header Partner With Us CTA is gold (btn-gold), mobile
  compact rules retargeted accordingly.
- One atomic commit, e.g.
  "style: rectangular hero photo frame + gold Partner CTA; assets bump". git push.

## VERIFY
- Home hero: the founder photo is in a rectangular frame with soft 18px
  corners; gold inner edge + tone overlay follow the new shape; ph-tag and
  float cards sit correctly; nothing else on the page changed shape.
- Header on every page: "Partner With Us" is a gold-filled button; "Book a
  Scan" unchanged next to it; hover states fine.
- Mobile header: the gold Partner button is still pinned, compact, swaps to
  "Partner" on narrow screens, no wrap/overlap; drawer unchanged.
- Body-content ghost buttons unchanged everywhere.
- All 9 pages on the same bumped ?v=; no other regressions.
