# TASK — /about: replace the founder video facade with the founder photo

The YouTube auto-thumbnail framed badly on /about (cropped to hands + caption,
no face), so swap the video facade in the /about B2C column for the founder
photo. Use the existing `assets/img/founder-probe.jpg` (already in the repo,
the REMS-probe portrait used on the home block 06). No new binary needed.

This leaves the video ONLY on the home page (block 03). /about and home
block 06 will both show `founder-probe.jpg` — acceptable (same as the video
was duplicated before).

File: about.html + styles.css.

================================================================
## STEP 1 — about.html: facade → photo
================================================================
In the `.about-split > .about-b2c > .pic` block, REPLACE:
```html
<button class="video-facade" data-yt="JejpUNvq6Co" aria-label="Play: Alexandra on REMS and MobileREMS">
  <img src="https://i.ytimg.com/vi/JejpUNvq6Co/hqdefault.jpg" alt="" loading="lazy" />
  <span class="vf-play" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>
</button>
```
with:
```html
<img class="founder-photo" src="/assets/img/founder-probe.jpg" alt="Alexandra Kusherets holding the Echolight REMS probe" loading="lazy" />
```
Change that block's ph-tag from
`<span class="ph-tag"><b>Watch</b> Alexandra on MobileREMS</span>`
to `<span class="ph-tag"><b>Founder</b> Alexandra Kusherets &middot; Certified REMS&reg; Operator</span>`.

================================================================
## STEP 2 — CSS check
================================================================
The `.founder .pic .founder-photo` rule already exists (added for home block
06). The /about photo sits in `.about-b2c .pic`, NOT `.founder .pic`, so make
sure the photo fills the About frame too. Either:
- broaden the existing selector to cover both, e.g.
  `.founder .pic .founder-photo, .about-b2c .pic .founder-photo{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:50% 28%; display:block; border-radius:inherit; }`
- and apply the same subtle gold inner-edge inset to `.about-b2c .pic` that
  `.founder .pic` got, so the two match.
Confirm `.about-b2c .pic` is a positioned box with a defined aspect (it held
the absolute-positioned video facade before, so it should be) — if the photo
collapses, give `.about-b2c .pic` the same portrait sizing the founder `.pic`
uses.

================================================================
## FINISH
================================================================
- Bump `?v=13` -> `?v=14` on styles.css AND site.js across all 7 HTML pages.
- Update CLAUDE.md: /about B2C column now shows the founder photo
  (`founder-probe.jpg`) instead of the video facade; the founder VIDEO now
  appears ONLY on the home page (block 03 "How REMS works"). Home block 06 and
  /about both use `founder-probe.jpg`.
- One atomic commit, e.g.
  "feat(about): swap founder video for founder photo; assets v14". git push.

## VERIFY
- /about B2C (left) column shows the founder photo filling the portrait frame
  (face visible, framed by the cream `.pic`), caption "Founder · Alexandra
  Kusherets · Certified REMS® Operator".
- No `.video-facade` remains on about.html; the B2B card, "Who's behind the
  scan", and coaching sections are unchanged.
- The home page is untouched (video still in block 03, photo in block 06).
- All 7 pages on ?v=14; header/footer identical; disclaimer intact.
