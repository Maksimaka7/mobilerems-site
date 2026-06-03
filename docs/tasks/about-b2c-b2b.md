# TASK — Rebuild /about into a B2C + B2B page (split hero, then provider blocks)

Lesya is about to pitch physicians in person, so /about should serve BOTH a
patient (B2C) and a physician/partner (B2B) audience, visually separated so
it's never confusing. Restructure about.html. Keep header/topbar/drawer/
footer/disclaimer byte-identical to other pages.

The founder video facade already exists on the page (`.video-facade`,
data-yt `JejpUNvq6Co`) — reuse it, don't recreate the JS/CSS.

=== COPY ACCURACY FLAG (read first) ===
The provider copy below contains specific personal claims that will be shown
to doctors. Use the copy AS WRITTEN (owner decision), but these must be kept
factually accurate by the owner before/with the outreach (like the FTC note
on provider stats): "work with the healthcare company Allergan Aesthetics",
"twenty years", "a decade in nutrition", "certified Echolight REMS® operator",
"certified health coach". Also: the source doc says "Longevia Center" once
and "Longevia" elsewhere — I standardized to "Longevia" (brand-book master
brand). If "Longevia Center" is the real entity name the owner wants, it's a
one-word swap. Fix the source doc's "Ecolight" → "Echolight REMS®" everywhere.
Minimize em-dashes (brand rule). Keep the global disclaimer.

================================================================
## STEP 1 — page-hero (minor)
================================================================
Keep the `.page-hero`. Update the sub-paragraph to signal both audiences:
> MobileREMS exists because waiting two years for the right bone assessment
> is two years too long. For patients, and for the physicians who care for them.
Eyebrow can stay "Founder's story" or become "Founder &amp; practice" — your call.

================================================================
## STEP 2 — Replace the single `.founder` block with a B2C/B2B split
================================================================
The current first content block is:
```html
<section class="block"><div class="wrap"><div class="founder"> … .pic(video) + personal story … </div></div></section>
```
Replace its inner `.founder` with a two-column split `.about-split`:
- LEFT = B2C: the founder VIDEO facade (move the existing `.pic` with the
  `.video-facade` + its `.ph-tag` here unchanged) + a short personal line +
  a "Book a Scan" button.
- RIGHT = B2B: a bordered card introducing the provider offer + CTAs.

```html
<section class="block">
  <div class="wrap">
    <div class="about-split">
      <div class="about-b2c">
        <div class="pic">
          <button class="video-facade" data-yt="JejpUNvq6Co" aria-label="Play: Alexandra on REMS and MobileREMS">
            <img src="https://i.ytimg.com/vi/JejpUNvq6Co/hqdefault.jpg" alt="" loading="lazy" />
            <span class="vf-play" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>
          </button>
          <span class="ph-tag"><b>Watch</b> Alexandra on MobileREMS</span>
        </div>
      </div>
      <div class="about-b2c-copy">
        <span class="eyebrow">For you</span>
        <blockquote>I brought REMS&reg; here because you don't have time to wait for the system to catch up.</blockquote>
        <p class="who">I'm <b>Alexandra Kusherets.</b> A DEXA flagged something I didn't understand, and I waited two years for a REMS&reg; provider to travel into Washington. I wasn't fragile. I didn't need fear. I needed the full picture. So I founded MobileREMS. You shouldn't have to wait either.</p>
        <p class="who" style="color:var(--muted);">Immune-Centric Longevity Coach &middot; Certified Nutritional Coach &middot; Certified Echolight REMS&reg; Operator</p>
        <div class="lead-actions"><a class="btn btn-primary" href="/book">Book a Scan <span class="arr">&rarr;</span></a></div>
      </div>
    </div>
  </div>
</section>
```
Wait — the split should be VIDEO-left, B2B-right, with the B2C copy under the
video on the left. So put the video `.pic` AND the `.about-b2c-copy` together
in the LEFT column, and the B2B card in the RIGHT column. Structure it as:
```html
<div class="about-split">
  <div class="about-b2c">
    <div class="pic"> …video facade + ph-tag… </div>
    <span class="eyebrow" style="margin-top:22px;">For you</span>
    <blockquote> … </blockquote>
    <p class="who"> …personal story… </p>
    <p class="who" style="color:var(--muted);"> …credentials line… </p>
    <div class="lead-actions"><a class="btn btn-primary" href="/book">Book a Scan &rarr;</a></div>
  </div>
  <aside class="about-b2b">
    <span class="eyebrow">For physicians &amp; organizations</span>
    <h3>Considering REMS&reg; for your patients?</h3>
    <p>MobileREMS brings clinical-grade, radiation-free bone quality assessment to your practice. We handle the device, the certified operator, and the logistics. You read the data and keep the patient relationship.</p>
    <p>Referral relationships, on-site events, or practice arrangements across South Puget Sound and Greater Seattle.</p>
    <div class="lead-actions">
      <a class="btn btn-primary" href="/partners">Partner With Us <span class="arr">&rarr;</span></a>
      <a class="btn btn-ghost" href="/assets/clinical-brief.pdf" target="_blank" rel="noopener">Download the Clinical Brief <span class="arr">&rarr;</span></a>
    </div>
  </aside>
</div>
```

================================================================
## STEP 3 — B2B section: "Who's behind the scan" (NEW, after the split)
================================================================
Insert a new `<section class="block alt">` using the existing `.sec-head` +
`.aud-grid`/`.aud` card pattern (2x2). Exact copy:

sec-head: eyebrow "For providers"; h2 "Who's behind the scan.";
intro p: "Every MobileREMS scan is performed by the same certified operator."

Four `.aud` cards:
1. h3 "The same certified operator, every time" — p: "Alexandra Kusherets, founder of Longevia and a certified Echolight REMS&reg; operator. Not a rotating technician. Not a contractor sent for the day. The founder, on every scan, accountable for every result. Your patient is in trained hands."
2. h3 "Twenty years running complex systems" — p: "Before Longevia, Alexandra led global, multimillion-dollar technology programs, including work with the healthcare company Allergan Aesthetics. Precision at scale, delivered on schedule. Run it however suits your practice: send your patient to book directly and keep it off your desk, or coordinate through your own office. The scheduling, the scan, and the report run the same either way. You decide how involved you want to be."
3. h3 "She captures the data. You own the read." — p: "Echolight REMS&reg; hands you a reading nothing else gives you: a structural look at bone quality that density alone can't capture. It doesn't replace anything you already use. You read it. You interpret it. It's your data, and it sharpens the workup you already trust. REMS&reg; assesses bone density and bone quality."
4. h3 "She built this because her own bone was read by density alone" — p: "Ten years into studying nutrition, immunity, and long-term health, Alexandra's own scan came back judged on density alone. She went looking for the structural picture. Nobody local could give it to her, so she brought the service to the area herself. You remain their physician. She brings the layer that completes the view."

================================================================
## STEP 4 — B2B optional coaching section (NEW)
================================================================
Insert `<section class="block">` with a constrained-width prose layout
(`.center-narrow` or a `max-width:760px` wrap):

eyebrow "Optional · only for patients who want it";
h2 "You make the plan. We help them live it.";
paragraphs:
- "You know the gap. You give a patient the plan: the nutrition, the movement, the lifestyle changes that actually move bone. Then life happens, and the plan stays on paper."
- "For patients who want help putting that plan into practice, Longevia offers coaching. Alexandra is a certified health coach with a decade in nutrition, immunity, and longevity. The work is implementation, not interpretation. She helps your patient build the changes you recommended into how they actually live, week to week."
- "Your plan stays yours. We don't change it, reinterpret it, or replace it. We help your patient follow it. Every six months, a radiation-free rescan shows whether it's working."
- (muted, smaller) "This is optional, and only ever offered to patients who want it."

================================================================
## STEP 5 — keep the rest
================================================================
Keep the existing `.brandblock` (Longevia master brand) section and the final
`center-narrow` CTA ("Know your bones before your bones tell you.") as the
closer. Order: page-hero → split → Who's behind the scan → coaching →
brandblock → final CTA → footer.

================================================================
## STEP 6 — CSS (styles.css)
================================================================
```css
.about-split{ display:grid; grid-template-columns:1fr 1fr; gap:48px; align-items:start; }
.about-b2c .pic{ margin-bottom:4px; }
.about-b2c blockquote{ margin:14px 0 12px; }
.about-b2b{ background:var(--bg); border:1px solid var(--rule); border-radius:16px; padding:30px 30px 28px; box-shadow:0 18px 44px -34px rgba(54,56,60,.5); position:sticky; top:96px; }
.about-b2b h3{ margin:12px 0 12px; }
.about-b2b p{ font-size:14.5px; line-height:1.6; color:var(--text); margin:0 0 14px; }
.about-b2b .lead-actions{ margin-top:18px; flex-wrap:wrap; gap:10px; }
@media (max-width:980px){
  .about-split{ grid-template-columns:1fr; gap:32px; }
  .about-b2b{ position:static; }
}
```
(If `.about-b2c .pic` needs an explicit portrait aspect like the old founder
`.pic`, keep whatever the existing `.founder .pic` used so the video frame
looks the same. Reuse `.video-facade` rules as-is.)

================================================================
## FINISH
================================================================
- Bump `?v=11` -> `?v=12` on styles.css AND site.js across all 7 HTML pages.
- Update CLAUDE.md: /about is now a B2C+B2B page (split hero: founder video +
  personal story left, provider card right; then "Who's behind the scan" and
  an optional coaching section for the B2B audience). Note the copy-accuracy
  flag: Alexandra's bio claims (Allergan Aesthetics, twenty years, decade in
  nutrition, certifications) and "Longevia" vs "Longevia Center" must be
  owner-verified before/with the physician outreach; "Echolight REMS®"
  spelling is correct (source doc had "Ecolight").
- One atomic commit, e.g.
  "feat(about): B2C+B2B split — founder video + provider blocks; assets v12".
  git push.

## VERIFY
- /about: split shows founder video + personal story on the left, provider
  card (Partner With Us + Clinical Brief) on the right; stacks on mobile.
- "Who's behind the scan" 2x2 cards render; coaching section reads cleanly.
- Video facade still plays (click loads the YouTube player).
- "Echolight REMS®" spelling (no "Ecolight"); disclaimer intact; minimal em-dashes.
- All 7 pages on ?v=12; header/footer identical.
