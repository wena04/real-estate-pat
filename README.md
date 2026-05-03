# Patricia Wen — Real Estate Website

A single-page marketing site for **Patricia Wen** (Keller Williams North Seattle): hero, value props, about, featured listings and sales (carousel, tables, activity map), reviews, and contact including WeChat QR.
testing

---

## Tech stack

| Layer     | Technology                                                     |
| --------- | -------------------------------------------------------------- |
| Framework | React 19 + Vite 8                                              |
| Routing   | React Router 7 (`BrowserRouter` + `basename` for GitHub Pages) |
| UI        | React Bootstrap 2 + Bootstrap 5                                |
| Icons     | react-icons (Feather + Tabler, etc.)                           |
| Map       | Leaflet + react-leaflet (lazy-loaded)                          |
| Email     | Optional: Resend via `api/inquiry.js` (Vercel serverless)      |

---

## Page sections

| #   | Section                   | Anchor      |
| --- | ------------------------- | ----------- |
| 1   | Hero                      | `#home`     |
| 2   | Value props (under hero)  | —           |
| 3   | Meet Patricia             | `#about`    |
| 4   | Featured listings & sales | `#listings` |
| 5   | Client reviews            | `#reviews`  |
| 6   | Contact                   | `#contact`  |

---

## Getting started

```bash
npm install
npm run dev
```

The dev server defaults to `http://localhost:5173`.

```bash
npm run build    # production build → dist/
npm run preview  # serve dist locally
npm run lint
```

---

## Content & data

| File                        | Purpose                                                                   |
| --------------------------- | ------------------------------------------------------------------------- |
| `src/data/siteContent.json` | Copy, hero, brand, about, reviews, listings section text, contact, footer |
| `src/data/listings.json`    | For-sale and sold rows (carousel, tables, map lat/lng)                    |

Brand assets under `public/assets/brand/` can be regenerated from the 3-up logo plate with:

```bash
python3 scripts/extract_logo_variants.py
```

Place the source plate at `public/assets/brand/logo-source-plate.png`, or pass a path as the first argument. Requires [Pillow](https://pypi.org/project/pillow/) (`pip install pillow`).

---

## Deployment

### GitHub Pages (static site)

#### Blank white page? (wrong asset paths)

If the tab title loads but the screen is **empty**, open **DevTools → Network**, refresh, and look for **404** on `index-*.js` or `*.css`.

That almost always means the site was built with the **wrong Vite `base`**. This app is meant to live under a **path** such as `https://anthonywen.dev/real-estate-pat/`, so the JS bundle must be requested as `/real-estate-pat/assets/...`, not `/assets/...`.

**Typical cause:** The production build used the **wrong Vite `base`** (for example `base: '/'` while the site is served from `/real-estate-pat/`).

**GitHub Pages (this repo)** — **Settings → Pages → Source: GitHub Actions**. Pushes to **`main`** run `.github/workflows/deploy-github-pages.yml`, which runs `npm run build` with `GITHUB_PAGES=true` so `vite.config.js` sets `base` from `GITHUB_REPOSITORY` (e.g. `/real-estate-pat/`).

If your live URL path is not `/real-estate-pat/`, set `GITHUB_REPOSITORY` correctly on GitHub, or use `npm run build:gh-pages` / `VITE_BASE_PATH` locally so `--base` matches your path (e.g. `/my-repo/`).

**Sanity check locally:**

```bash
npm run build:gh-pages
npm run preview:gh-pages
```

Open the printed `localhost` URL — you should see the full site, not a white page.

**Local check** (same output as `build:gh-pages` when the repo name matches your URL segment):

```bash
GITHUB_PAGES=true GITHUB_REPOSITORY=wena04/real-estate-pat npm run build
npm run preview:gh-pages
```

**Note:** The contact form posts to `/api/inquiry`. That route only exists when you host the **Vercel** (or similar) serverless function. On **GitHub Pages alone**, the site is static; form submissions will not reach Resend unless you point the client at another backend or a form service.

---

### Vercel (recommended for forms + API)

1. Import the repo in [Vercel](https://vercel.com).
2. Add `RESEND_API_KEY` in the project environment variables.
3. Verify the `from` domain in `api/inquiry.js` with [Resend](https://resend.com).

---

## Environment variables (Vercel / inquiry API)

Create `.env.local` at the repo root for local serverless testing if needed:

```
RESEND_API_KEY=re_xxxxxxxxxxxx
```

---

## Public assets

Static files live under `public/` (e.g. `public/assets/hero-seattle-skyline.png`, `public/favicon.png`, listing photos, brand logos). Reference them in data or HTML as paths starting with `/assets/...` from the app; Vite rewrites them for the configured `base` at build time.

---

## Contact (from site content)

Values are driven by `src/data/siteContent.json` — update there, not only in this README.

- **Agent:** Patricia Wen
- **Office:** Keller Williams North Seattle

---

## License

Private project unless otherwise noted.
