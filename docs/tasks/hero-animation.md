# TASK — Hero scan animation (index.html)

Replace the decorative radiofrequency rings in the homepage hero with an
animated REMS bone-scan SVG. ONLY index.html hero. Do not touch other pages.

## Cycle (~14s loop)
torso silhouette + scan line -> lumbar spine emerges through body ->
zoom into one vertebra -> vertebral body with trabecular (cancellous)
microarchitecture + scan line + probe ripples -> loop.

## Palette (already site brand)
#FDFBF6 bg, #EFEAE2 cream, #C0A878 gold, #9C7B33 bronze, #36383C ink.

------------------------------------------------------------------
## STEP 1 — index.html
In the HERO section find `.hero-media > .keyframe`. Inside it there is:

    <div class="rf" aria-hidden="true">
      <svg viewBox="0 0 200 200" fill="none">
        ... 5 circles ...
      </svg>
    </div>

DELETE that entire `<div class="rf">...</div>` block.
KEEP the `<span class="ph-tag">...</span>` that follows it.
In its place (as first child of .keyframe, before .ph-tag) paste the
HTML snippet from STEP 3 below.

Result structure:
    <div class="keyframe">
      <div class="hero-scan" aria-hidden="true"> ...svg... </div>
      <span class="ph-tag"><b>Image</b> REMS&reg; scan in progress &mdash; spine echo</span>
    </div>

## STEP 2 — assets/css/styles.css
Append the CSS block from STEP 4 to the end of the file.
NOTE: .keyframe must have `position:relative` and `overflow:hidden`
(it already does in the current design — verify, don't duplicate).

## STEP 3 — verify locally, then bump cache + commit
Because styles.css is not content-hashed, bump the asset version so the
new CSS is picked up: change `styles.css?v=2` -> `styles.css?v=3` and
`site.js?v=2` -> `site.js?v=3` in ALL 8 html files (index, technology,
who-its-for, partners, about, research, book, forms). (Single sed is fine.)
Then atomic commit, e.g. "feat(hero): animated REMS spine scan; bump assets v3".
git push -> Netlify auto-deploys.

------------------------------------------------------------------
## HTML SNIPPET (paste inside .keyframe, before .ph-tag)
------------------------------------------------------------------
<div class="hero-scan" aria-hidden="true">
<svg viewBox="0 0 420 520" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
<defs>
<clipPath id="hsVB"><path d="M126,150 L294,150 C312,150 314,160 307,172 C300,205 300,227 307,260 C314,272 312,282 294,282 L126,282 C108,282 106,272 113,260 C120,227 120,205 113,172 C106,160 108,150 126,150 Z"/></clipPath>
</defs>
<g clip-path="none">
 <g class="hs-A">
  <g class="hs-zoom">
   <path d="M150,150 C150,118 182,104 210,104 C238,104 270,118 270,150 C278,206 272,250 264,300 C260,344 270,392 282,440 L138,440 C150,392 160,344 156,300 C148,250 142,206 150,150 Z" fill="#ECE4D6" stroke="#DBD1BF" stroke-width="1"/>
   <g class="hs-ribs" fill="none" stroke="#C9BCA0" stroke-width="1">
    <path d="M204,168 C176,172 160,184 152,200"/><path d="M216,168 C244,172 260,184 268,200"/>
    <path d="M204,192 C174,196 158,210 150,228"/><path d="M216,192 C246,196 262,210 270,228"/>
    <path d="M204,216 C174,220 158,236 152,256"/><path d="M216,216 C246,220 262,236 268,256"/>
   </g>
   <g class="hs-spine" fill="#F3EAD9" stroke="#C0A878" stroke-width="1.4" stroke-linejoin="round">
    <ellipse cx="176" cy="185" rx="11" ry="6"/><ellipse cx="244" cy="185" rx="11" ry="6"/><rect x="184" y="170" width="52" height="30" rx="10"/>
    <ellipse cx="176" cy="223" rx="11" ry="6"/><ellipse cx="244" cy="223" rx="11" ry="6"/><rect x="184" y="208" width="52" height="30" rx="10"/>
    <ellipse cx="176" cy="261" rx="11" ry="6"/><ellipse cx="244" cy="261" rx="11" ry="6"/><rect x="184" y="246" width="52" height="30" rx="10"/>
    <ellipse cx="176" cy="299" rx="11" ry="6"/><ellipse cx="244" cy="299" rx="11" ry="6"/><rect x="184" y="284" width="52" height="30" rx="10"/>
    <ellipse cx="176" cy="337" rx="11" ry="6"/><ellipse cx="244" cy="337" rx="11" ry="6"/><rect x="184" y="322" width="52" height="30" rx="10"/>
   </g>
  </g>
  <g class="hs-sweep">
   <rect x="10" y="135" width="400" height="30" fill="#C0A878" opacity="0.10"/>
   <line x1="14" y1="150" x2="406" y2="150" stroke="#C0A878" stroke-width="1.6" opacity="0.85"/>
   <circle cx="210" cy="150" r="3.5" fill="#9C7B33"/>
  </g>
 </g>
 <g class="hs-B">
  <g class="hs-bzoom">
   <path d="M126,150 L294,150 C312,150 314,160 307,172 C300,205 300,227 307,260 C314,272 312,282 294,282 L126,282 C108,282 106,272 113,260 C120,227 120,205 113,172 C106,160 108,150 126,150 Z" fill="#F3EAD9" stroke="#C0A878" stroke-width="1.8"/>
   <path d="M120,166 C180,160 240,160 300,166" fill="none" stroke="#C0A878" stroke-width="1.3" opacity="0.8"/>
   <path d="M120,266 C180,272 240,272 300,266" fill="none" stroke="#C0A878" stroke-width="1.3" opacity="0.8"/>
   <g class="hs-trab" clip-path="url(#hsVB)" stroke="#9C7B33" stroke-width="0.8" fill="none" stroke-linecap="round"><path d="M207.3,204.7 L218.5,185.4"/><path d="M182.3,222.8 L198.2,225.9"/><path d="M216.2,232.8 L231.5,225.6"/><path d="M234.1,257.9 L238.2,268.5"/><path d="M163.0,165.5 L173.9,185.6"/><path d="M135.3,197.7 L149.8,216.8"/><path d="M241.6,187.2 L236.1,198.2"/><path d="M149.5,231.8 L163.9,221.6"/><path d="M181.2,163.7 L200.6,173.6"/><path d="M273.3,204.0 L282.9,186.6"/><path d="M172.3,234.2 L182.3,222.8"/><path d="M173.9,185.6 L174.8,201.8"/><path d="M239.9,157.3 L248.8,165.7"/><path d="M255.4,200.4 L266.7,214.4"/><path d="M259.0,216.4 L273.3,204.0"/><path d="M155.2,252.8 L172.3,234.2"/><path d="M254.7,190.2 L255.4,200.4"/><path d="M273.3,204.0 L290.8,222.4"/><path d="M189.6,182.1 L199.5,184.7"/><path d="M231.5,225.6 L233.9,239.5"/><path d="M158.0,191.9 L163.0,165.5"/><path d="M253.3,248.7 L265.2,241.9"/><path d="M239.9,157.3 L233.4,174.4"/><path d="M208.7,155.6 L215.1,153.0"/><path d="M233.4,174.4 L248.8,165.7"/><path d="M255.4,200.4 L259.0,216.4"/><path d="M259.0,216.4 L265.2,241.9"/><path d="M189.6,182.1 L186.7,202.4"/><path d="M172.3,234.2 L164.0,252.0"/><path d="M158.0,191.9 L174.8,201.8"/><path d="M200.6,173.6 L216.9,170.2"/><path d="M241.6,187.2 L254.7,190.2"/><path d="M181.6,238.7 L199.6,234.1"/><path d="M269.3,173.7 L282.9,186.6"/><path d="M273.3,204.0 L266.7,214.4"/><path d="M248.2,234.2 L253.3,248.7"/><path d="M253.3,248.7 L250.1,269.4"/><path d="M156.1,205.5 L163.9,221.6"/><path d="M200.6,173.6 L199.5,184.7"/><path d="M174.6,274.1 L182.6,268.2"/><path d="M173.9,185.6 L189.6,182.1"/><path d="M131.3,216.9 L149.8,216.8"/><path d="M181.6,238.7 L181.4,253.0"/><path d="M174.8,201.8 L186.7,202.4"/><path d="M224.9,257.8 L238.2,268.5"/><path d="M199.5,184.7 L207.3,204.7"/><path d="M217.0,267.3 L234.1,257.9"/><path d="M215.1,153.0 L239.9,157.3"/><path d="M254.7,190.2 L276.8,187.9"/><path d="M207.3,204.7 L225.5,202.8"/><path d="M181.4,253.0 L182.6,268.2"/><path d="M233.9,239.5 L248.2,234.2"/><path d="M149.8,216.8 L163.9,221.6"/><path d="M182.6,268.2 L200.6,265.9"/><path d="M216.9,170.2 L233.4,174.4"/><path d="M265.2,241.9 L273.4,259.6"/><path d="M129.4,236.6 L149.5,231.8"/><path d="M186.7,202.4 L207.3,204.7"/><path d="M199.6,234.1 L216.2,232.8"/><path d="M163.9,221.6 L182.3,222.8"/><path d="M269.3,173.7 L276.8,187.9"/><path d="M215.1,153.0 L216.9,170.2"/><path d="M273.3,204.0 L290.8,207.8"/><path d="M189.6,182.1 L200.6,173.6"/><path d="M198.2,225.9 L199.6,234.1"/><path d="M273.4,259.6 L291.5,242.0"/><path d="M172.3,234.2 L181.6,238.7"/><path d="M216.9,170.2 L218.5,185.4"/><path d="M259.0,216.4 L266.7,214.4"/><path d="M163.0,165.5 L181.2,163.7"/><path d="M199.6,234.1 L206.3,251.9"/><path d="M220.9,224.4 L233.9,239.5"/><path d="M206.3,251.9 L224.9,257.8"/><path d="M238.2,268.5 L250.1,269.4"/><path d="M276.8,187.9 L273.3,204.0"/><path d="M199.5,184.7 L218.5,185.4"/><path d="M236.1,198.2 L255.4,200.4"/><path d="M158.0,191.9 L173.9,185.6"/><path d="M149.8,216.8 L149.5,231.8"/><path d="M253.3,248.7 L273.4,259.6"/><path d="M290.8,207.8 L290.8,222.4"/><path d="M200.6,265.9 L217.0,267.3"/><path d="M200.6,173.6 L215.1,153.0"/><path d="M131.3,216.9 L129.4,236.6"/><path d="M135.3,197.7 L156.1,205.5"/><path d="M206.3,251.9 L200.6,265.9"/><path d="M181.2,163.7 L208.7,155.6"/><path d="M156.1,205.5 L174.8,201.8"/><path d="M216.2,232.8 L233.9,239.5"/><path d="M290.8,222.4 L291.5,242.0"/><path d="M255.4,200.4 L273.3,204.0"/><path d="M224.9,257.8 L234.1,257.9"/><path d="M276.8,187.9 L282.9,186.6"/><path d="M158.0,191.9 L156.1,205.5"/><path d="M129.4,236.6 L149.8,216.8"/><path d="M224.9,257.8 L217.0,267.3"/><path d="M164.0,252.0 L181.4,253.0"/><path d="M218.5,185.4 L225.5,202.8"/><path d="M155.2,252.8 L164.0,252.0"/><path d="M156.1,205.5 L149.8,216.8"/><path d="M225.5,202.8 L236.1,198.2"/><path d="M198.2,225.9 L216.2,232.8"/><path d="M248.2,234.2 L265.2,241.9"/><path d="M282.9,186.6 L290.8,207.8"/><path d="M135.3,197.7 L131.3,216.9"/><path d="M248.8,165.7 L269.3,173.7"/><path d="M208.7,155.6 L216.9,170.2"/><path d="M241.6,187.2 L248.8,165.7"/><path d="M265.2,241.9 L291.5,242.0"/><path d="M220.9,224.4 L231.5,225.6"/><path d="M149.5,231.8 L155.2,252.8"/><path d="M225.5,202.8 L220.9,224.4"/><path d="M233.9,239.5 L234.1,257.9"/><path d="M234.1,257.9 L250.1,269.4"/><path d="M233.4,174.4 L241.6,187.2"/><path d="M135.3,197.7 L158.0,191.9"/><path d="M174.6,274.1 L181.4,253.0"/><path d="M220.9,224.4 L216.2,232.8"/><path d="M173.9,185.6 L181.2,163.7"/><path d="M163.9,221.6 L172.3,234.2"/><path d="M241.6,187.2 L255.4,200.4"/><path d="M206.3,251.9 L217.0,267.3"/></g>
   <g class="hs-trab" clip-path="url(#hsVB)" fill="#9C7B33"><circle cx="135.3" cy="197.7" r="1"/><circle cx="131.3" cy="216.9" r="1"/><circle cx="129.4" cy="236.6" r="1"/><circle cx="158.0" cy="191.9" r="1"/><circle cx="156.1" cy="205.5" r="1"/><circle cx="149.8" cy="216.8" r="1"/><circle cx="149.5" cy="231.8" r="1"/><circle cx="155.2" cy="252.8" r="1"/><circle cx="163.0" cy="165.5" r="1"/><circle cx="173.9" cy="185.6" r="1"/><circle cx="174.8" cy="201.8" r="1"/><circle cx="163.9" cy="221.6" r="1"/><circle cx="172.3" cy="234.2" r="1"/><circle cx="164.0" cy="252.0" r="1"/><circle cx="174.6" cy="274.1" r="1"/><circle cx="181.2" cy="163.7" r="1"/><circle cx="189.6" cy="182.1" r="1"/><circle cx="186.7" cy="202.4" r="1"/><circle cx="182.3" cy="222.8" r="1"/><circle cx="181.6" cy="238.7" r="1"/><circle cx="181.4" cy="253.0" r="1"/><circle cx="182.6" cy="268.2" r="1"/><circle cx="208.7" cy="155.6" r="1"/><circle cx="200.6" cy="173.6" r="1"/><circle cx="199.5" cy="184.7" r="1"/><circle cx="207.3" cy="204.7" r="1"/><circle cx="198.2" cy="225.9" r="1"/><circle cx="199.6" cy="234.1" r="1"/><circle cx="206.3" cy="251.9" r="1"/><circle cx="200.6" cy="265.9" r="1"/><circle cx="215.1" cy="153.0" r="1"/><circle cx="216.9" cy="170.2" r="1"/><circle cx="218.5" cy="185.4" r="1"/><circle cx="225.5" cy="202.8" r="1"/><circle cx="220.9" cy="224.4" r="1"/><circle cx="216.2" cy="232.8" r="1"/><circle cx="224.9" cy="257.8" r="1"/><circle cx="217.0" cy="267.3" r="1"/><circle cx="239.9" cy="157.3" r="1"/><circle cx="233.4" cy="174.4" r="1"/><circle cx="241.6" cy="187.2" r="1"/><circle cx="236.1" cy="198.2" r="1"/><circle cx="231.5" cy="225.6" r="1"/><circle cx="233.9" cy="239.5" r="1"/><circle cx="234.1" cy="257.9" r="1"/><circle cx="238.2" cy="268.5" r="1"/><circle cx="248.8" cy="165.7" r="1"/><circle cx="254.7" cy="190.2" r="1"/><circle cx="255.4" cy="200.4" r="1"/><circle cx="259.0" cy="216.4" r="1"/><circle cx="248.2" cy="234.2" r="1"/><circle cx="253.3" cy="248.7" r="1"/><circle cx="250.1" cy="269.4" r="1"/><circle cx="269.3" cy="173.7" r="1"/><circle cx="276.8" cy="187.9" r="1"/><circle cx="273.3" cy="204.0" r="1"/><circle cx="266.7" cy="214.4" r="1"/><circle cx="265.2" cy="241.9" r="1"/><circle cx="273.4" cy="259.6" r="1"/><circle cx="282.9" cy="186.6" r="1"/><circle cx="290.8" cy="207.8" r="1"/><circle cx="290.8" cy="222.4" r="1"/><circle cx="291.5" cy="242.0" r="1"/></g>
   <g class="hs-bscan" clip-path="url(#hsVB)"><rect x="106" y="200" width="208" height="14" fill="#C0A878" opacity="0.12"/><line x1="106" y1="208" x2="314" y2="208" stroke="#C0A878" stroke-width="1.5" opacity="0.9"/></g>
   <circle cx="120" cy="150" r="4" fill="#9C7B33"/>
   <circle cx="120" cy="150" r="6" fill="none" stroke="#C0A878" stroke-width="1.3"><animate attributeName="r" values="6;42" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.5;0" dur="3s" repeatCount="indefinite"/></circle>
   <circle cx="120" cy="150" r="6" fill="none" stroke="#C0A878" stroke-width="1.3"><animate attributeName="r" values="6;42" dur="3s" begin="1.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.5;0" dur="3s" begin="1.5s" repeatCount="indefinite"/></circle>
  </g>
 </g>
</g>
</svg>
</div>

------------------------------------------------------------------
## CSS (append to assets/css/styles.css)
------------------------------------------------------------------
/* ============================================================
   Hero scan animation (index.html hero .keyframe)
   Cycle: torso -> spine emerges -> zoom -> vertebra microarchitecture
   All classes prefixed .hs- to avoid collisions. ~14s loop.
   ============================================================ */
.hero-scan{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
.hero-scan svg{width:100%;height:100%;max-height:100%}
@media (prefers-reduced-motion: reduce){
  .hero-scan .hs-A,.hero-scan .hs-zoom,.hero-scan .hs-ribs,.hero-scan .hs-spine,
  .hero-scan .hs-sweep,.hero-scan .hs-B,.hero-scan .hs-bzoom,.hero-scan .hs-trab,
  .hero-scan .hs-bscan{animation:none!important}
  .hero-scan .hs-B{opacity:0}
  .hero-scan .hs-spine,.hero-scan .hs-ribs{opacity:1}
}
@keyframes hsAFade{0%{opacity:0}5%{opacity:1}40%{opacity:1}48%{opacity:0}100%{opacity:0}}
@keyframes hsRibsIn{0%{opacity:0}8%{opacity:0}20%{opacity:.45}40%{opacity:.45}48%{opacity:0}100%{opacity:0}}
@keyframes hsSpineIn{0%{opacity:0}16%{opacity:0}28%{opacity:1}40%{opacity:1}48%{opacity:0}100%{opacity:0}}
@keyframes hsZoom{0%{transform:scale(1)}28%{transform:scale(1)}48%{transform:scale(2.6)}100%{transform:scale(2.6)}}
@keyframes hsSweep{0%{opacity:0;transform:translateY(0)}5%{opacity:1}8%{transform:translateY(0)}38%{transform:translateY(252px);opacity:1}42%{opacity:0;transform:translateY(252px)}100%{opacity:0}}
@keyframes hsBFade{0%{opacity:0}46%{opacity:0}56%{opacity:1}92%{opacity:1}97%{opacity:0}100%{opacity:0}}
@keyframes hsBZoom{0%{transform:scale(.5)}46%{transform:scale(.5)}56%{transform:scale(1)}100%{transform:scale(1)}}
@keyframes hsTrabIn{0%{opacity:0}58%{opacity:0}68%{opacity:.62}84%{opacity:.62}92%{opacity:.5}97%{opacity:0}100%{opacity:0}}
@keyframes hsBscan{0%{opacity:0;transform:translateY(-66px)}57%{opacity:0;transform:translateY(-66px)}60%{opacity:.9}74%{transform:translateY(66px)}80%{opacity:.9}84%{opacity:0;transform:translateY(66px)}100%{opacity:0}}
.hero-scan .hs-A{animation:hsAFade 14s ease-in-out infinite}
.hero-scan .hs-zoom{transform-box:fill-box;transform-origin:50% 50%;animation:hsZoom 14s ease-in-out infinite}
.hero-scan .hs-ribs{animation:hsRibsIn 14s ease-in-out infinite}
.hero-scan .hs-spine{animation:hsSpineIn 14s ease-in-out infinite}
.hero-scan .hs-sweep{animation:hsSweep 14s ease-in-out infinite}
.hero-scan .hs-B{transform-box:fill-box;transform-origin:50% 50%;animation:hsBFade 14s ease-in-out infinite}
.hero-scan .hs-bzoom{transform-box:fill-box;transform-origin:50% 50%;animation:hsBZoom 14s ease-in-out infinite}
.hero-scan .hs-trab{animation:hsTrabIn 14s ease-in-out infinite}
.hero-scan .hs-bscan{animation:hsBscan 14s ease-in-out infinite}
