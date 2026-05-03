# Patricia Wen – Real Estate Website

This is a modern, single-page real estate website for **Patricia Wen**, Keller Williams North Seattle agent serving buyers and sellers across the Puget Sound.

![Website preview](https://github.com/user-attachments/assets/dbb86866-c13e-4e50-b995-44170a0518e6)

---

## Tech Stack

| Layer     | Technology                            |
| --------- | ------------------------------------- |
| Framework | React 19 + Vite 8                     |
| Routing   | React Router DOM 7                    |
| UI        | React Bootstrap 2 + Bootstrap 5       |
| Icons     | react-icons/fi                        |
| Map       | Leaflet + react-leaflet (lazy-loaded) |
| Email     | Resend (serverless API function)      |
| Hosting   | Vercel (recommended)                  |

---

## Page Sections

| #   | Section                                           | Anchor      |
| --- | ------------------------------------------------- | ----------- |
| 1   | Hero                                              | `#home`     |
| 2   | Value props (under hero)                          | —           |
| 3   | Meet Patricia                                     | `#about`    |
| 4   | Featured listings & sales (carousel, tables, map) | `#listings` |
| 5   | Reviews                                           | `#reviews`  |
| 6   | Contact                                           | `#contact`  |

---

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

The site runs at `http://localhost:5173` by default.

---

## Content

Copy, contact info, and performance stats live in **`src/data/siteContent.json`**. Listing rows, carousel items, and map coordinates live in **`src/data/listings.json`**.

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
hero.mp4 # hero background video
hero-poster.jpg # poster frame shown before video loads
projects/
\*.jpg # property thumbnails (paths referenced in listings.json)
logo/
kw-logo.svg # Keller Williams logo
\`\`\`

---

## Deployment (Vercel)

1. Push to GitHub and import the repo in [Vercel](https://vercel.com).
2. Add `RESEND_API_KEY` as an environment variable.
3. The `api/inquiry.js` file is automatically detected as a Vercel serverless function.

---

## Contact Info

- **Agent:** Patricia Wen
- **Phone:** (206) 619-0217
- **Email:** patriciarwen@gmail.com
- **Office:** Keller Williams North Seattle, 10700 Meridian Ave N #100, Seattle, WA 98133
- **WeChat:** Realtor-Patricia
