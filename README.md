# Ever Legit website

Website for Ever Legit LLC: one company, three businesses (Commerce, Software, Agency).
Plain HTML, CSS and JavaScript. There is no build step, so it can be hosted as static files anywhere.

## What is inside

```
index.html            Home: the three businesses, Invoice-Gen.net, how we work, direct contact
commerce/index.html   E-commerce and import-export        everlegit.com/commerce/
software/index.html   SaaS and custom software            everlegit.com/software/
agency/index.html     Digital marketing                   everlegit.com/agency/
work/index.html       Invoice-Gen.net, our own product    everlegit.com/work/
about/index.html      About the company                   everlegit.com/about/
contact/index.html    WhatsApp, email, phone, brief form  everlegit.com/contact/
privacy/index.html    Privacy notice                      everlegit.com/privacy/
404.html              Shown for missing pages
commerce.html, software.html, ...   Old addresses. Each one only forwards to its new address.
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
with a version number (`style.css?v=4`). When you change `style.css`, `main.js` or `config.js`,
raise that number in every page so visitors get the new file.

## Preview on your computer

Open `index.html` in a browser. No server is needed: when the files are opened from a folder,
the script points the page links at each folder's `index.html`.

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
