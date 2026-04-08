# Department of Logistics — logistics_HQ

Premium multi-page React website. See `site/` for the frontend project.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 19 + Vite 6 |
| Language | TypeScript |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion v12 |
| Functions | Cloudflare Pages Functions |
| Deployment | Cloudflare Pages via Wrangler |

---

## Local Development

```bash
cd site
npm install
npm run dev
```

Dev server starts at `http://localhost:5173`.

---

## Environment Variables

Copy the template and fill in your values:

```bash
cp site/.env.example site/.env.local
```

See `site/.env.example` for required variables. Never commit `.env.local`.

---

## Build

```bash
cd site
npm run build
# Output: site/dist/
```

---

## Deployment

```bash
cd site
npm run build
npx wrangler pages deploy dist/ --project-name=YOUR_PROJECT_NAME
```

### Secrets

```bash
npx wrangler pages secret put ZOHO_USER --project-name=YOUR_PROJECT_NAME
npx wrangler pages secret put ZOHO_PASS --project-name=YOUR_PROJECT_NAME
npx wrangler pages secret put CONTACT_TO --project-name=YOUR_PROJECT_NAME
```

---

## Project Structure

```
Logistics/
├── .gitignore
├── README.md
├── assets/          # Source logo assets
└── site/
    ├── functions/   # Cloudflare Pages Functions
    │   └── api/
    │       └── contact.ts
    ├── public/      # Static assets
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── lib/
    └── ...
```

---

## Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/operations` | Operations |
| `/clearance` | Clearance |
| `/protocols` | Protocols |
| `/recovery` | Recovery Division |
| `/intake` | Intake Form |
