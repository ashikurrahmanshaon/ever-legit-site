# Ever Legit website

Website for Ever Legit LLC: one company, three businesses (Commerce, Software, Agency).
Plain HTML, CSS and JavaScript. There is no build step, so it can be hosted as static files anywhere.

## What is inside

```
index.html        Home: the three businesses, ventures, company record, direct contact
commerce.html     E-commerce and import-export
software.html     SaaS and custom software
agency.html       Digital marketing
work.html         Ever Legit's own products and ventures
about.html        About the company, principles and standards
contact.html      WhatsApp, email, phone and the brief form
privacy.html      Privacy notice
404.html          Shown for missing pages
sitemap.xml, robots.txt
assets/css/style.css     All styles
assets/js/config.js      Email and WhatsApp number used by the contact form
assets/js/main.js        Menu and contact form
assets/fonts/            Red Hat Display and Red Hat Text (SIL Open Font License, see OFL.txt)
assets/img/              Logo files, favicon, social-card.png
```

## Company details used on the site

| Detail | Value |
| --- | --- |
| Legal name | Ever Legit LLC |
| Wyoming Filing ID | 2026-001921880 |
| Formed | March 17, 2026 |
| Principal office | 1309 Coffeen Avenue, STE 19438, Sheridan, WY 82801, USA |
| Email | info@everlegit.com |
| Phone and WhatsApp | +1 (307) 424-2312 |

If one of these changes, search the project for the old value and replace it in every file.
The contact form reads the email address and WhatsApp number from `assets/js/config.js`.

The contact form has no backend. It opens WhatsApp or the visitor's email app with the message
filled in, and stores nothing.

## Preview on your computer

Open `index.html` in a browser. No server is needed.

## Updating the live site

The site lives in the GitHub repository `ashikurrahmanshaon/ever-legit-site` and is served on
`everlegit.com`. After changing files in the repository, redeploy the site in the hosting panel
and flush the CDN cache so visitors get the new version.

## Colours

| Use | Colour |
| --- | --- |
| Ink (text, footer) | `#0B1B2B` |
| Commerce | `#12A150` |
| Software | `#1D6FE8` |
| Agency | `#E0782A` |

Each business page sets its colour with a class on `<body>` (`theme-commerce`, `theme-software`,
`theme-agency`). The colour values live at the top of `assets/css/style.css`.

## Logo files

`assets/img/logo.svg` (for light backgrounds), `logo-reversed.svg` (for dark backgrounds),
`logo-llc.svg` (with "LLC"), `icon.svg` and `icon-512.png` (square icon).
