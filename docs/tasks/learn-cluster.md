# TASK — Build the "Learn" cluster: /technology hub + /how-rems-works + /what-to-expect

Big task. Lesya provided copy for a 3-page Learn section. Build all three in
OUR design system (do NOT copy her HTML mockups' styling — they use a
different palette/fonts; take only the COPY). Reuse our existing components
(page-hero, .split, .sec-head, .cards, .ben-grid, .cmp, .video / .videos,
.center-narrow, .lead-actions, .feat-inline, .video-facade) and brand tokens.
Header/topbar/drawer/footer/disclaimer stay byte-identical across all pages
(except the footer site-map addition in STEP 4, applied uniformly to all).

Rules: US English; banned AI words (journey, holistic, wellness,
game-changer, seamless); minimize em-dashes; "Echolight REMS®" spelling;
keep the global disclaimer. Phone stays the site's existing (425) 200-4150
(do NOT use 425-681-5838 from her mockup). Scan duration: use "about 30
minutes" (her mockup's 45 min conflicts; 30 is in the primary doc). Entity:
use "Longevia" in prose; "Longevia Health Center" only where a formal/legal
name reads naturally. These three (phone, duration, name) are owner-verify
items — note them in CLAUDE.md.

================================================================
## STEP 0 — add the Clinical Reference PDF (binary, manual)
================================================================
A NEW provider PDF (different from the existing Bone Identity brochure
`clinical-brief.pdf`). Copy the user's uploaded file into the repo:
```
cp ~/Downloads/Echolight_REMS_Clinical_Reference_v1_2.pdf assets/clinical-reference.pdf
ls -la assets/clinical-reference.pdf   # confirm before committing
```
(Find the file in your Downloads; rename to clinical-reference.pdf as above.)
Canonical URL: /assets/clinical-reference.pdf  (OPEN download, no gate.)

================================================================
## PAGE 1 — /technology  (REPLACE current page; it becomes the hub)
================================================================
Keep the strong existing sections (benefits grid, four data points, REMS vs
DEXA table, the videos) but reframe the page as the overview that routes to
the two new pages. New structure, top to bottom:

### Hero (page-hero)
- eyebrow: "A New Standard in Bone Health Assessment"
- h1: "Bone assessment has a new standard. It earned that in Europe. It is now here."
- intro p: "REMS — Radiofrequency Echographic Multi-Spectrometry — measures bone mineral density, bone quality, internal microarchitecture, and a Fragility Score (a structural fracture-risk indicator), plus body composition. Radiation-free, with results the same day."
- small line (use .src or muted): "Validated in Europe since 2013. Included in Italy's national osteoporosis guidelines. FDA-cleared in the US."
- p: "Systematic adoption of new clinical standards takes years, sometimes decades. Your bones do not have that kind of time. You do not have to wait. Echolight REMS® is available in Western Washington, and it is mobile. We come to you."

### Section — Where REMS® Fits (sec-head + prose + a small 2-row "What REMS Reads")
- eyebrow: "Where REMS® Fits"; h2: "No single scan sees everything."
- p: "Understanding your bones is complicated, and the tools that measure them are still catching up. There is no single scan that sees all of it, only a set of readings, each revealing a different part of the picture."
- p: "DEXA has been the standard for forty years. It measures one thing: bone mineral density, in two dimensions. That made it the reference every other tool is judged against. Standard, though, does not mean complete."
- p: "REMS® is a different kind of tool, and a genuinely new one. It reads bone with radiofrequency instead of radiation, and reads something density alone was never built to show: the structural quality of the bone itself, drawn from your own bone."
- A small two-item block "What REMS® Reads" (reuse .cards or a 2-col):
  * "Density — how much mineral is present. REMS® matches DEXA here: the forty-year reference."
  * "Structure — how that bone is actually built, its structural quality."
  caption under it: "Both from a single session, without radiation."
- pull-quote (serif italic, like the existing technology pull-quote): "An engineer assessing a structure does not ask how much material was used. The engineer asks: will it hold. Bone deserves the same question. That is the layer REMS® adds."
- buttons (.lead-actions): Partner With Us (btn-primary → /partners) · Book a Scan (btn-ghost → /book)

### KEEP — Benefits grid (the existing 9-item .ben-grid, eyebrow "02 Why REMS® makes the difference"). Unchanged.

### KEEP — Four data points (the existing .cards 01-04, eyebrow "Four data points per scan"). Unchanged.

### KEEP — REMS® vs DEXA (the existing .cmp table + the "REMS® does." pull line). Unchanged.

### Section — How REMS® works (teaser → links to /how-rems-works)
- eyebrow "The Mechanism"; h2 "How REMS® works, briefly."
- p: "REMS® sends a sound wave into your bone and listens to what comes back. The echo carries information about your specific bone tissue: its density and its internal structure. That acoustic signature is unique to your bone. No hospital. No radiation. No referral required."
- p: "The full mechanism — how the device filters the signal, isolates load-bearing bone, and compares your bone against a reference library of 10,000+ real bone specimens — is worth understanding if you want to know how REMS® produces what it produces."
- button: "See the full mechanism →" (btn-primary → /how-rems-works)

### Section — What to expect (teaser → links to /what-to-expect)
- eyebrow "The Scan Experience"; h2 "What happens at a REMS® appointment."
- p: "A REMS® scan takes about 30 minutes. You lie down. A handheld probe is placed at the lumbar spine and proximal femur. No radiation, no contrast, no medication adjustment. You receive your results in the same session."
- button: "What to expect at your scan →" (btn-ghost → /what-to-expect)

### Section — The Evidence (handoff → /research)
- eyebrow "What the Research Shows"; h2 "The evidence."
- p: "REMS® is not a promising idea waiting for evidence. A decade of independent validation sits behind it: peer-reviewed journals, inclusion in Italy's national osteoporosis guidelines, and institutions that do not take a manufacturer's word for anything."
- p: "Where DEXA is strongest, REMS® agrees with it. The Fragility Score is built from real outcomes. The full record is worth reading."
- button: "See the evidence →" (→ /research)

### Section — Clinical Reference download (OPEN, reuse .dl-cta)
- title: "Echolight REMS® Clinical Reference"
- sub: "The 12-page clinical reference for healthcare providers: peer-reviewed evidence, patient populations, and full technical detail. PDF."
- button: "Download the Clinical Reference →" (btn-gold → /assets/clinical-reference.pdf, target=_blank rel=noopener)
- KEEP the existing brochure download (clinical-brief.pdf) + the two existing videos below it.

### Final CTA — two-path (reuse center-narrow / lead-actions)
- eyebrow "Get Started"; h2 "Two ways to start with REMS®."; line: "The only mobile REMS® service in Western Washington."
- "For clinics, practices & organizations — a new, independent input you read and interpret. Radiation-free, repeatable, and the patient relationship stays with you." → Partner With Us (btn-primary → /partners)
- "For individuals — a complete bone assessment in one session. No radiation, no referral, results reviewed with you the same day." → Book a Scan (btn-ghost → /book)

Keep footer + disclaimer.

================================================================
## PAGE 2 — /how-rems-works  (NEW page)
================================================================
New file how-rems-works.html, same chrome as other pages. Nav: highlight
"The Technology" as active (this is a Technology sub-page).

### Hero (page-hero)
- crumbs: Home / The Technology / How REMS® Works
- eyebrow "The Mechanism"; h1 "How REMS® works."
- p: "REMS® is the technology that finally asks the engineer's question. Not how much material is there. Will it hold. Here is how it does it."
- p: "REMS® sends a sound wave into your bone and listens to what comes back. The echo carries information about your specific bone tissue: its density and its internal structure. That acoustic signature is unique to your bone. No hospital. No radiation. No referral required."

### Video (use the .video-facade pattern, YouTube id D3AswHf6zBo)
Place a single facade (poster = https://i.ytimg.com/vi/D3AswHf6zBo/hqdefault.jpg,
click loads youtube-nocookie). Caption ph-tag: "Watch · How REMS® works".

### The five steps (use .sec-head + a numbered layout; each step has a short
action line, then "Why this matters" and "What REMS® adds" sub-paragraphs)
1. **The Scan** — "A probe is placed at your lumbar spine and proximal femur, the same two sites used in standard bone density assessment. A sound wave enters your bone. The returning echo is captured."
2. **The Filtering** — "REMS® automatically discards everything that is not structural bone. Only the signal from load-bearing bone is kept." Why this matters: "Not everything in a scan's path is structural bone. Calcifications, deposits, and the degenerative changes that accumulate with age can all muddy a reading. To assess the bone that actually bears load, the rest has to be set aside." What REMS® adds: "REMS® isolates the signal from load-bearing bone and discards the rest, automatically, in real time, in a portable setting. What remains is a clean reading of your actual structural bone."
3. **The Analysis** — "Your bone's specific acoustic signature is extracted and analyzed." Why this matters: "Density tells you how much mineral is present. It does not describe how that mineral and collagen are organized, the internal architecture that determines whether bone holds under force. REMS® reads that architecture directly, from the acoustic pattern your bone produces." What REMS® adds: "Two bones with identical density can differ in structural quality, and that difference shows up in the acoustic signature. REMS® reads it."
4. **The Comparison** — "Your signature is compared against a reference database of 10,000+ real bone specimens matched to your age group, sex, and body size, including both structurally healthy bone and bone that has fractured under low force." Why this matters: "A ranking tells you how your bone compares to a reference population. Useful, but it is an average, not your bone. To know whether your structure resembles bone that holds, you need a comparison built from real bone with known outcomes." What REMS® adds: "From that comparison comes the Fragility Score: a structural window into fracture risk, drawn from your own bone rather than estimated from population averages."
5. **Your Results** — "Bone mineral density, T-score and Z-score. Fragility Score, a structural fracture-risk indicator. Body composition: fat mass and BMR. All from one session, reviewed with you the same day." Why this matters: "Meaningful change in bone takes time, and to catch it early your assessment has to be precise enough to separate real change from measurement noise. REMS® precision error is under half a percent at the lumbar spine. Change at six months is detectable. Because it uses no radiation, REMS® can be repeated as often as the clinical picture warrants, six months, not years." What REMS® adds: "Rescan at six months and you see what your protocol actually produced. Not an estimate. A measurement."

### Cross-links (plain text / ghost buttons; ONLY link ones that exist)
- "Want the full clinical picture for providers?" → Download the Clinical Reference (→ /assets/clinical-reference.pdf).
- The "REMS vs DEXA full comparison" and "How to read your report" are NOT built yet → render as plain text (no dead links) or omit.

### Final CTA — same two-path block as page 1. Footer + disclaimer.

================================================================
## PAGE 3 — /what-to-expect  (NEW page)
================================================================
New file what-to-expect.html, same chrome. Nav active: "The Technology".

### Hero (page-hero)
- crumbs: Home / The Technology / What to Expect
- eyebrow "The Scan Experience"; h1 "Preparing for your MobileREMS bone density scan."
- p: "Radiation-free, painless, and complete in a single session, with results explained the same day."

### Section — Before your appointment (sec-head + a labeled list; reuse a clean list style)
- h2 "Preparation is simple."
- items (label + text):
  * "Clothing: Wear comfortable, loose-fitting clothing without metal components such as zippers, belts, or snaps near the waist and hip."
  * "Diet: Avoid food for at least 3 hours before your appointment. Food and gas in the digestive tract can obscure the lower-spine scan. Water is fine until the last hour, then hold off on that too."
  * "Medications: Continue your regular medication schedule. Nothing about the scan requires a change."
  * "Arrival: Your intake forms and payment are completed online when you book, so plan to arrive a few minutes early to settle in before we begin."

### Section (alt) — During the scan
- h2 "What happens during your appointment."
- items:
  * "Comfortable positioning: You lie comfortably on an examination table, face-up."
  * "Application of gel: Your operator applies a small amount of ultrasound gel to the two areas being scanned, your lower spine and your hip."
  * "Ultrasound scan: The REMS® probe moves gently over the skin, capturing measurements of your bone density, bone quality, and 5-year fracture risk. No radiation, no compression, no injection."
  * "Duration: The full appointment is about 30 minutes. The process is painless and requires no recovery time afterward."

### Section — After the scan
- h2 "What to expect after."
- p: "After your scan, the ultrasound gel is wiped clean and you can immediately resume your normal activities. Unlike a hospital DEXA scan, you do not wait for a callback. Your operator walks you through your results in the room, the same day, and your full clinical report arrives by email. You have what you need to follow up with your practitioner."

### Section (alt) — Why MobileREMS (3 benefits, reuse .ben-grid or .cards)
- "Safe and radiation-free: Ultrasound, not X-ray. Safe for repeated use at any age, including pregnancy."
- "Quick and painless: Real-time results, delivered and explained in the same session."
- "Accurate and complete: FDA-cleared technology that assesses bone density, bone quality, and fracture risk, not density alone."

### Final CTA (center-narrow)
- h2 "Schedule your bone density scan today."
- p: "MobileREMS brings clinical-grade bone assessment directly to you across Western Washington. The only mobile REMS® service in the South Puget Sound."
- buttons: Book a Scan (btn-primary → /book) · Partner With Us (btn-ghost → /partners)
- (No Calendly yet; "Book a Scan" → /book as elsewhere.)

Footer + disclaimer.

================================================================
## STEP 4 — wiring (nav, redirects, footer site map)
================================================================
- netlify.toml: add clean-URL 200-redirects for /how-rems-works and
  /what-to-expect mirroring the existing per-page redirect pattern.
- Footer "Explore" column (ALL pages, applied identically): add the two new
  links so the column reads: The Technology / How REMS® Works / What to Expect
  / Who It's For / About / Research. Footer stays byte-identical across pages.
- Top nav: keep the 4 existing items (do NOT add the sub-pages to the top nav);
  the sub-pages are reached via the /technology teasers + footer.

================================================================
## FINISH
================================================================
- Bump `?v=15` -> `?v=16` on styles.css AND site.js across ALL pages
  (now 9 HTML files: the 7 existing + 2 new). All uniform at v16.
- Any new CSS (e.g. the five-step layout, the labeled list) added to styles.css
  using existing tokens; prefer reusing existing component classes.
- Update CLAUDE.md: new Learn cluster — /technology is the hub linking to
  /how-rems-works (with video D3AswHf6zBo) and /what-to-expect; new OPEN PDF
  assets/clinical-reference.pdf (provider clinical reference, distinct from the
  Bone Identity brochure clinical-brief.pdf); footer now lists the two new
  pages; netlify redirects added. Owner-verify flags: phone (425) 200-4150 vs
  her mockup's 425-681-5838; scan duration 30 vs 45 min; "Longevia" vs
  "Longevia Health Center". Note many provider stats are now sourced by the
  Clinical Reference (Cortet 2021 n=4,307 = the "4,300+ patients" claim; LSC
  ~1%; sensitivity/specificity).
- One atomic commit, e.g.
  "feat(learn): technology hub + how-rems-works + what-to-expect pages + clinical reference PDF; assets v16". git push.

## VERIFY
- /technology renders as the hub (hero, Where REMS Fits, kept benefits/4-points/
  comparison, How-it-works teaser → /how-rems-works, What-to-expect teaser →
  /what-to-expect, Evidence → /research, Clinical Reference download, two-path CTA).
- /how-rems-works renders (hero, video facade plays, 5 steps with why/adds,
  two-path CTA); /what-to-expect renders (prep, during, after, 3 benefits, CTA).
- Both new clean URLs resolve (netlify redirects); footer lists them on every page.
- /assets/clinical-reference.pdf downloads (open, no gate).
- All 9 HTML on ?v=16; header/footer identical; disclaimer on every page;
  "Echolight REMS®" spelling; phone (425) 200-4150; no banned AI words.
