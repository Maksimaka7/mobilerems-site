# MobileREMS by Longevia — Website

Mobile bone quality assessment (Echolight REMS®) — Western Washington.
Multi-page static site: plain HTML/CSS/JS. Deployed on Netlify.

## Structure
```
index.html            Home
technology.html       The Technology (how it works, benefits, measures, REMS vs DEXA)
who-its-for.html      Who It's For (audiences)
partners.html         For Partners (verticals + B2B form)
about.html            About (founder + Longevia)
research.html         Research (publications, authority)
book.html             Book a Scan (B2C early-access form)
assets/css/styles.css Shared styles
assets/js/site.js     Shared behaviour (nav, drawer, forms)
netlify.toml          Clean URLs, headers, caching
```

## Deploy
Auto-deploys from `main` via Netlify. Publish dir: repo root. No build step.

## Forms
Netlify Forms (`data-netlify="true"`) with honeypot. Forms: `partner-inquiry`, `early-access`.

## Brand
Longevia master brand · MobileREMS product. Palette porcelain/cream/charcoal + brushed gold (#C0A878). Serif display (Cormorant Garamond), sans body (Proxima Nova/Montserrat).
