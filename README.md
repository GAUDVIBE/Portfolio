# GAUDVIBE Portfolio

Static one-page portfolio served at **antoinegaudry.fr**. Animated WebGL shader background, sidebar of links (CV, projects, social), in-page preview pane.

Deployed on **Render** (static site) via GitOps from `main`.

---

## Stack

| Layer | Tech |
|---|---|
| Markup / styling | HTML5, CSS3 (Grid, media queries, backdrop-filter) |
| Logic | Vanilla JS (ES6 class), no framework |
| Background | Custom GLSL fragment shader on `<canvas>` via WebGL |
| PDF preview | Pre-rendered PNG of page 1 (200 DPI), click/tap to open the real PDF |
| Hosting | Render — static publish from repo root |
| CDN | Render edge, `Cache-Control: max-age=31536000` on `.js` |

---

## Local development

No build step. Just serve the directory:

```bash
# from repo root
python -m http.server 8080
# → http://localhost:8080
```

Opening `index.html` directly via `file://` works too, except the CV preview (Google Docs Viewer fallback is disabled because we switched to PNG, but PDF embed needs HTTP for the local URL).

---

## Deployment

Render watches `main` (linked via GitHub App, repo-ID based — surviving renames). Every push triggers a redeploy of the static site in ~1 min. Config: `render.yaml`.

The custom domain **antoinegaudry.fr** is configured in the Render dashboard, not in this repo.

---

## GitHub Actions

Two automated workflows live under `.github/workflows/`.

### `screenshots.yml` — external sites

Captures previews of the external destinations (GitHub, YouTube, Instagram, muzikaloid.com) and commits them to `screenshots/`.

| Trigger | When |
|---|---|
| `schedule` | Every Sunday 02:00 UTC |
| `workflow_dispatch` | Manual run from the Actions tab |

Uses Playwright + Chromium at 1280×720. Each URL is wrapped in try/catch — a single failure doesn't break the others.

**To add a new external preview:**
1. Add `{ name, url }` to the `links` array inside the inline script
2. Add a matching entry (`{ text, url, type: 'link', screenshot: 'screenshots/<name>.png' }`) to `this.links` in `buttons.js`
3. Trigger the workflow manually once via Actions → *Update Screenshots* → *Run workflow* (otherwise you wait until next Sunday)

### `cv-png.yml` — CV rendering

Re-renders `CV.pdf` page 1 to `screenshots/cv.png` (200 DPI, ~300 KB) using PyMuPDF.

| Trigger | When |
|---|---|
| `push` to `main` touching `CV.pdf` | Automatic |
| `workflow_dispatch` | Manual run |

The PNG is what mobile users see in the preview pane (the Google Docs Viewer iframe was dropped — it cropped the top of the CV and showed a noisy page/zoom toolbar).

**To update the CV:** just commit a new `CV.pdf` and push. The workflow regenerates the PNG and commits it back to `main` as `Update CV screenshot [automated]`.

---

## File structure

```
.
├── index.html              # entry point — loads shader + buttons
├── shader.js               # WebGL fragment shader (animated background)
├── buttons.js              # sidebar + preview pane logic
├── CV.pdf                  # source CV (manually updated)
├── render.yaml             # Render static-site config
├── screenshots/
│   ├── cv.png              # auto-rendered from CV.pdf (cv-png.yml)
│   ├── github.png          # auto-captured (screenshots.yml)
│   ├── youtube.png         # auto-captured
│   ├── instagram.png       # auto-captured
│   └── muzikaloid.png      # auto-captured (or placeholder while site is offline)
└── .github/workflows/
    ├── screenshots.yml     # weekly external captures
    └── cv-png.yml          # CV PDF → PNG on push
```

---

## Conventions

### Cache-busting JS assets

`render.yaml` sets `Cache-Control: max-age=31536000` (1 year) on `.js`. Browsers and the Render CDN will cling to the old file forever, so **every time you edit `buttons.js` or `shader.js`, bump the query string** in `index.html`:

```html
<script src="buttons.js?v=5"></script>   <!-- bump to ?v=6 on next edit -->
```

Otherwise users won't see your change until the next time they clear their cache.

### Adding a new sidebar item

Edit `this.links` at the top of `buttons.js`:

```js
{ text: 'muzikaloid.com', url: 'https://muzikaloid.com', type: 'link', screenshot: 'screenshots/muzikaloid.png' },
```

Then add the corresponding URL to `screenshots.yml` so the weekly capture stays in sync.

### PDF previews

PDF previews use a single approach on desktop and mobile: `<img src="link.image">` inside a scrollable wrapper. Clicking the image opens the original PDF in a new tab.

The native `<embed src="...pdf#toolbar=0">` approach was dropped because it rendered inconsistently (Google Docs Viewer on mobile cropped content and forced a noisy page/zoom toolbar; native PDF embed UI varied between browsers).

To add a new PDF link, give it `type: 'pdf'` and an `image` field pointing to a pre-rendered PNG (use `cv-png.yml` as a template if you want auto-rendering on push).
