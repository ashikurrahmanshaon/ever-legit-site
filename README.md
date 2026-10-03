# Ever Legit website

Website for Ever Legit LLC: one company, three businesses (Commerce, Software, Agency).
Plain HTML, CSS and JavaScript. There is no build step, so it can be hosted as static files anywhere.

## What is inside

```
index.html        Home: the three businesses, Invoice-Gen.net, how we work, direct contact
commerce.html     E-commerce and import-export
software.html     SaaS and custom software
agency.html       Digital marketing
work.html         Invoice-Gen.net, our own product
about.html        About the company, principles and standards
contact.html      WhatsApp, email, phone and the brief form
privacy.html      Privacy notice
404.html          Shown for missing pages
sitemap.xml, robots.txt
assets/css/style.css     All styles and motion
assets/js/config.js      Email and WhatsApp number used by the contact form
assets/js/main.js        Header, menu, scroll reveals and contact form
assets/fonts/            Red Hat Display and Red Hat Text (SIL Open Font License, see OFL.txt)
assets/img/              Logo files, favicon, social-card.png
```

## Contact details used on the site

| Detail | Value |
| --- | --- |
| Company | Ever Legit LLC |
| Address | 1309 Coffeen Avenue, STE 19438, Sheridan, WY 82801, USA |
| Email | info@everlegit.com |
| Phone and WhatsApp | +1 (307) 424-2312 |

If one of these changes, search the project for the old value and replace it in every file.
The contact form reads the email address and WhatsApp number from `assets/js/config.js`.

The contact form has no backend. It opens WhatsApp or the visitor's email app with the message
filled in, and stores nothing.

## Motion

Animations live in `assets/css/style.css` under the "motion" heading. They are switched off
automatically for visitors whose device asks for reduced motion.

## Updating the live site

The site lives in the GitHub repository `ashikurrahmanshaon/ever-legit-site` and is served on
`everlegit.com`. The host caches the stylesheet and scripts for a week, so the pages link them
with a version number (`style.css?v=3`). When you change `style.css`, `main.js` or `config.js`,
raise that number in every page so visitors get the new file.

## Preview on your computer

Open `index.html` in a browser. No server is needed.

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
