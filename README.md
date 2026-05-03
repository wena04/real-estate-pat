# Patricia Wen – Real Estate Website

A modern, single-page real estate website for **Patricia Wen**, Keller Williams North Seattle agent and infill developer specializing in ADUs, townhomes, and small multifamily projects across the Puget Sound region.

![Website preview](https://github.com/user-attachments/assets/dbb86866-c13e-4e50-b995-44170a0518e6)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite 8 |
| Routing | React Router DOM 7 |
| UI | React Bootstrap 2 + Bootstrap 5 |
| Icons | react-icons/fi |
| Map | Leaflet + react-leaflet (lazy-loaded) |
| Email | Resend (serverless API function) |
| Hosting | Vercel (recommended) |

---

## Page Sections

| # | Section | Anchor |
|---|---------|--------|
| 1 | Hero (video + CTAs) | `#home` |
| 2 | Our Value (5 icon tiles) | — |
| 3 | Proof (3 stat tiles) | — |
| 4 | Who We Are (3 about tiles) | — |
| 5 | Homeowners (cards + feasibility form) | `#homeowners` |
| 6 | Services (3 pillar cards) | `#services` |
| 7 | Investors (tiles + investor form) | `#investors` |
| 8 | Projects (filters + cards + Leaflet map) | `#projects` |
| 9 | Contact (details + general form) | `#contact` |

---

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

The site runs at `http://localhost:5173` by default.

---

## Content

All site copy and contact info lives in **`src/data/siteContent.json`**.
Projects are in **`src/data/projects.json`** and service-area cities in **`src/data/locations.json`**.

---

## Environment Variables

Create a `.env.local` file at the project root:

\`\`\`
RESEND_API_KEY=re_xxxxxxxxxxxx
\`\`\`

> **Note:** The `from` address in `api/inquiry.js` must use a domain you have verified with [Resend](https://resend.com). Update the `from` field before deploying.

---

## Assets

Place media files in `public/assets/`:

\`\`\`
public/assets/
  video/
    hero.mp4          # hero background video
    hero-poster.jpg   # poster frame shown before video loads
  projects/
    *.jpg             # project photos (filenames match projects.json)
  logo/
    kw-logo.svg       # Keller Williams logo
\`\`\`

---

## Deployment (Vercel)

1. Push to GitHub and import the repo in [Vercel](https://vercel.com).
2. Add `RESEND_API_KEY` as an environment variable.
3. The `api/inquiry.js` file is automatically detected as a Vercel serverless function.

---

## Contact Info

- **Agent:** Patricia Wen
- **Phone:** (206) 619-2199
- **Email:** pwen@kw.com
- **Office:** Keller Williams North Seattle, 10700 Meridian Ave N #100, Seattle, WA 98133
- **WeChat:** Realtor-Patricia
