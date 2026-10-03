# Ever Legit website

Static website for Ever Legit LLC: one company, three businesses (Commerce, Software, Agency).
Plain HTML, CSS and JavaScript. There is no build step, so it works on GitHub Pages as it is.

## What is inside

```
index.html        Home: the three businesses and the company record
commerce.html     E-commerce business
software.html     Software development business
agency.html       Agency business
about.html        About the company
contact.html      Contact form and details
404.html          Shown by GitHub Pages for missing pages
assets/css/style.css     All styles
assets/js/config.js      Your company details (edit this first)
assets/js/main.js        Menu, contact form, fills in details from config.js
assets/fonts/            Red Hat Display and Red Hat Text (SIL Open Font License, see OFL.txt)
assets/img/              Logo files, favicon, social-card.png
```

## Before you publish

1. **Fill in `assets/js/config.js`.** Email, phone, address, registration number and store link.
   Every page reads them from this one file.
2. **Replace the yellow placeholders.** Anything highlighted in yellow on the site is text in
   [SQUARE BRACKETS] that only you know: products, services, projects, your story.
   Search the project for `class="ph"` to find each one and type your text over the bracketed text.
   The yellow highlight disappears once the brackets are gone.
3. **Add images.** Put your pictures in `assets/img/`, then replace each
   `<div class="shot">[ADD IMAGE]</div>` with
   `<img class="shot-img" src="assets/img/your-file.jpg" alt="Short description">`.
4. **Read the copy.** The "How it works" steps on the Software and Agency pages are a sensible
   default, not a description of your real process. Change them to match how you work.

The contact form opens the visitor's email app with the message filled in. It needs your email
address in `config.js` and stores nothing.

## Preview on your computer

Open `index.html` in a browser. No server is needed.

## Publish with GitHub Pages

Create an empty repository on GitHub, then run these commands inside this folder:

```
git init
git add .
git commit -m "Ever Legit website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

Then on GitHub: open the repository, go to **Settings > Pages**, set the source to
**Deploy from a branch**, choose branch **main** and folder **/ (root)**, and save.
After a minute or two the site is live at `https://YOUR-USERNAME.github.io/YOUR-REPO/`.

On a free GitHub account the repository has to be public for GitHub Pages to work.

### Your own domain

In **Settings > Pages**, enter the domain under **Custom domain** and follow GitHub's DNS
instructions. GitHub adds a `CNAME` file to the repository for you.

Once the domain is live, add this line inside `<head>` of each page so links shared on social
media show a preview image (the URL has to be absolute):

```
<meta property="og:image" content="https://YOUR-DOMAIN/assets/img/social-card.png">
```

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
