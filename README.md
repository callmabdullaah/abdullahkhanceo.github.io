# Abdullah Khan — reference portfolio

Static HTML/CSS/JavaScript recreation of the supplied dark blue portfolio screenshots. All 11 image positions show a `+` placeholder. No package installation or build is needed. The colourful project remains separate.

## VS Code mein kholen

1. ZIP extract karein.
2. `abdullah-portfolio.code-workspace` ko VS Code mein open karein, ya File → Open Folder se is folder ko select karein.
3. `index.html` browser mein kholen. Live Server extension installed ho to Go Live bhi use kar sakte hain.

## Files

```text
index.html                         Page sections and text
css/style.css                      Theme, layout and responsive styles
js/content.js                      Image paths, sample reviews, social links
js/main.js                         Menu, filtering, lightbox and form
assets/images/                     Your image files
assets/favicon.svg                 Browser icon
.vscode/settings.json              Editor and optional Live Server settings
abdullah-portfolio.code-workspace   VS Code workspace
.nojekyll                          Static GitHub Pages support
```

## Images add karne ka tareeqa

`+` is a visual placeholder, not an upload button. Permanent images add karne ke liye:

1. Image ko `assets/images/` mein copy karein, for example `portrait.jpg`.
2. `js/content.js` mein relevant empty path replace karein:

```js
'hero-portrait': 'assets/images/portrait.jpg',
'about-portrait': 'assets/images/portrait.jpg',
'work-cafe': 'assets/images/cafe.jpg',
```

Eleven slots: four hero collage images, one About portrait and six portfolio images. Paths and filenames are case-sensitive on hosted websites. Missing images fall back to the + placeholder.

## GitHub Pages par hosting

1. GitHub par new repository banayein.
2. Is folder ke **andar ki files** repository root mein upload karein. `index.html` root mein hona chahiye.
3. Repository Settings → Pages mein source **Deploy from a branch** select karein.
4. Branch **main**, folder **/(root)** select karein aur Save karein.
5. Deployment complete hone ke baad Pages section mein live link milega.

Relative asset paths support both a project repository and a user website. No server, secrets, Lovable account or paid dependency is required. Fonts load from Google Fonts with local fallbacks.

## Publishing se pehle

- Project titles and stats (100+ projects, 50+ clients) match the screenshots; check they are accurate.
- Reviews are explicitly labelled samples. Replace them with genuine approved client quotes.
- Contact form opens an email draft via `mailto:`. It does not send email automatically. An email app must be configured. WhatsApp links provide an alternative. For direct delivery, connect a form service separately.
- Replace portfolio titles and images with your actual work.

Responsive layout, keyboard focus, native form validation, reduced-motion support, work filters, project lightbox and review tabs are included. Browser chrome, Windows taskbar and Lovable badge from the reference screenshots are not website content.

## Motion
Count-up statistics, once-only scroll reveals, desktop portrait/panel floating, navigation scroll state and hover effects are in css/animations.css and js/animations.js. Reduced-motion preferences disable decorative animation. No animation dependency is required.
