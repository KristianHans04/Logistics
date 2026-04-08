# Department of Logistics — logistics_HQ

Premium multi-page website for **logistics_HQ**, deployed at
[logistics.ownthejoke.com](https://logistics.ownthejoke.com) and
[logistics.kristianhans.com](https://logistics.kristianhans.com).

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Local Development](#local-development)
5. [Environment Variables](#environment-variables)
6. [Email Integration (Zoho SMTP)](#email-integration-zoho-smtp)
7. [Building for Production](#building-for-production)
8. [Deployment — Cloudflare Pages](#deployment--cloudflare-pages)
9. [DNS Records](#dns-records)
10. [Pages Reference](#pages-reference)
11. [Design System](#design-system)

---

## Project Overview

The site is built as a premium, serious-looking logistics company website.
All content is written with deliberate double-meaning: straight-faced corporate
logistics on the surface, recognizable inside joke for the group.

Deployment targets:
- `https://logistics.ownthejoke.com` (primary)
- `https://logistics.kristianhans.com` (alias)

Both domains can be connected to the same Cloudflare Pages project.

---

## Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | React 19 + Vite 6 | SPA with client-side routing |
| Language | TypeScript | Strict mode |
| Routing | React Router v7 | `react-router` (not `react-router-dom`) |
| Styling | Tailwind CSS v4 | CSS-first config via `@theme` in `index.css` |
| Animation | Framer Motion v12 | Scroll-triggered reveals, hero entrance |
| Functions | Cloudflare Pages Functions | TypeScript serverless at `functions/api/` |
| Email | Zoho SMTP via TCP socket | Uses `cloudflare:sockets` API |
| Deployment | Cloudflare Pages | Via Wrangler CLI |

---

## Project Structure

```
Logistics/
├── .gitignore
├── README.md
├── assets/                         # Source assets (not deployed directly)
│   ├── logo.png                    # Original logo (white background)
│   ├── logo-transparent.png        # Processed: transparent background
│   └── logo-white.png              # Processed: all-white for dark backgrounds
└── site/                           # Vite project root
    ├── .env.example                # Template for environment variables
    ├── index.html                  # HTML entry (Google Fonts loaded here)
    ├── vite.config.ts              # Vite + Tailwind v4 + path alias
    ├── tsconfig.app.json           # TypeScript config
    ├── package.json
    ├── public/                     # Static assets (served as-is)
    │   ├── logo.png
    │   ├── logo-transparent.png    # Used in header (light backgrounds)
    │   ├── logo-white.png          # Used in hero + footer (dark backgrounds)
    │   └── _redirects              # Cloudflare Pages SPA routing rule
    ├── functions/                  # Cloudflare Pages Functions
    │   └── api/
    │       └── contact.ts          # POST /api/contact — email dispatch
    └── src/
        ├── main.tsx                # App entry: BrowserRouter setup
        ├── App.tsx                 # Route definitions
        ├── index.css               # Tailwind v4 @theme tokens + base styles
        ├── lib/
        │   └── utils.ts            # cn() helper (clsx + tailwind-merge)
        ├── components/
        │   ├── layout/
        │   │   ├── PageLayout.tsx  # Header + Footer + scroll-to-top wrapper
        │   │   ├── SiteHeader.tsx  # Fixed nav with mobile hamburger
        │   │   └── SiteFooter.tsx  # Dark footer with nav + channels
        │   ├── shared/
        │   │   └── ScrollReveal.tsx # Framer Motion scroll-triggered fade-up
        │   └── icons/
        │       └── index.tsx       # Custom monochromatic SVG icons (no Lucide)
        └── pages/
            ├── Home.tsx            # /
            ├── Operations.tsx      # /operations
            ├── Clearance.tsx       # /clearance
            ├── Protocols.tsx       # /protocols
            ├── Recovery.tsx        # /recovery
            ├── Dispatches.tsx      # /dispatches
            └── Intake.tsx          # /intake
```

---

## Local Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
cd site
npm install
npm run dev
```

Dev server starts at `http://localhost:5173`. All routes work immediately.

---

## Environment Variables

The contact form at `/intake` dispatches email via a Cloudflare Pages Function.
Three secrets are required. Without them the form still acknowledges submissions
but does not send email (graceful degradation).

| Variable | Description | Example |
|---|---|---|
| `ZOHO_USER` | Zoho sender address | `intake@logistics.ownthejoke.com` |
| `ZOHO_PASS` | Zoho app-specific password | `xxxx-xxxx-xxxx-xxxx` |
| `CONTACT_TO` | Destination address for notifications | `you@example.com` |

Copy the template for local testing:

```bash
cp site/.env.example site/.env.local
# Edit site/.env.local with real values
```

**Never commit `.env.local` or any file containing credentials.**

---

## Email Integration (Zoho SMTP)

The function at `site/functions/api/contact.ts` connects directly to
`smtp.zoho.com:587` using STARTTLS via Cloudflare's TCP socket API
(`cloudflare:sockets`). Standard SMTP libraries cannot run in Cloudflare
Workers — this uses raw socket access instead.

### Setting up Zoho Mail

1. Log in to [Zoho Mail](https://mail.zoho.com)
2. Go to **Settings > Security > App Passwords**
3. Create an app password named "Logistics HQ"
4. Use that password as `ZOHO_PASS`
5. The sender address (`ZOHO_USER`) must be a verified Zoho address

For `logistics.ownthejoke.com` email addresses:
1. Add the domain in Zoho Mail (free plan supports custom domains)
2. Verify DNS ownership with the TXT record Zoho provides
3. Create a mailbox, e.g. `intake@logistics.ownthejoke.com`

### Adding secrets to the Cloudflare deployment

```bash
cd site
wrangler pages secret put ZOHO_USER --project-name=logistics-hq
wrangler pages secret put ZOHO_PASS --project-name=logistics-hq
wrangler pages secret put CONTACT_TO --project-name=logistics-hq
```

Each command prompts for the value interactively. Values are encrypted at
rest and never stored in plaintext.

You can also manage them in the Cloudflare dashboard:
**Pages > logistics-hq > Settings > Environment Variables**

---

## Building for Production

```bash
cd site
npm run build
```

Output goes to `site/dist/`. The `_redirects` file is included automatically
from `public/` and handles SPA routing on Cloudflare Pages.

The functions in `site/functions/` are deployed separately by Wrangler
and are not part of the `dist/` directory.

---

## Deployment — Cloudflare Pages

### First-time setup

```bash
# Install Wrangler globally if not already present
npm install -g wrangler

# Authenticate with Cloudflare
wrangler login

# Create the Pages project (one time only)
cd site
wrangler pages project create logistics-hq

# Build and deploy
npm run build
wrangler pages deploy dist/ --project-name=logistics-hq
```

### Subsequent deploys

```bash
cd site
npm run build && wrangler pages deploy dist/ --project-name=logistics-hq
```

### After first deploy — add secrets

```bash
wrangler pages secret put ZOHO_USER --project-name=logistics-hq
wrangler pages secret put ZOHO_PASS --project-name=logistics-hq
wrangler pages secret put CONTACT_TO --project-name=logistics-hq
```

---

## DNS Records

Both domains point to the same Cloudflare Pages deployment.

### logistics.ownthejoke.com

In your Cloudflare DNS dashboard for `ownthejoke.com`:

| Type | Name | Target | Proxy status |
|---|---|---|---|
| CNAME | `logistics` | `logistics-hq.pages.dev` | Proxied |

Then in Cloudflare Pages:
1. Go to **Pages > logistics-hq > Custom domains**
2. Click **Set up a custom domain**
3. Enter `logistics.ownthejoke.com`

Cloudflare auto-verifies since the domain is already on Cloudflare.

### logistics.kristianhans.com

Same process. In the DNS dashboard for `kristianhans.com`:

| Type | Name | Target | Proxy status |
|---|---|---|---|
| CNAME | `logistics` | `logistics-hq.pages.dev` | Proxied |

Then add `logistics.kristianhans.com` as a second custom domain in the same
Pages project. Both domains serve the same deployment.

### Zoho Mail DNS (for intake@logistics.ownthejoke.com)

When setting up Zoho Mail on `logistics.ownthejoke.com`, add these DNS records
in your `ownthejoke.com` Cloudflare DNS dashboard:

| Type | Name | Value | Notes |
|---|---|---|---|
| TXT | `@` | `zoho-verification=xxxxx` | Provided by Zoho during setup |
| MX | `@` | `mx.zoho.com` (priority 10) | Inbound mail routing |
| MX | `@` | `mx2.zoho.com` (priority 20) | Inbound mail fallback |
| TXT | `@` | `v=spf1 include:zoho.com ~all` | SPF record for outbound auth |

Zoho's setup wizard provides the exact values.

---

## Pages Reference

| Route | Page | Purpose |
|---|---|---|
| `/` | Home | Department overview, mission, navigation callouts |
| `/operations` | Operations | Six divisions, delivery pipeline timeline |
| `/clearance` | Clearance | Access levels L0-L4, vetting process, intake CTA |
| `/protocols` | Protocols | Ten numbered operational rules |
| `/recovery` | Recovery | Recovery Division, The Fixer, FAQ |
| `/dispatches` | Dispatches | Field reports and internal advisories |
| `/intake` | Intake | Contact/application form |

### API

| Route | Method | Description |
|---|---|---|
| `/api/contact` | `POST` | Receives intake form data, dispatches Zoho email |

---

## Design System

Defined in `site/src/index.css` as Tailwind v4 `@theme` tokens.

### Colors

| Token | Value | Usage |
|---|---|---|
| `--color-surface` | `#ffffff` | Default background |
| `--color-surface-muted` | `#f1f5f9` | Light gray sections |
| `--color-surface-dark` | `#0a1628` | Dark sections (hero, footer, Recovery) |
| `--color-surface-navy` | `#0f172a` | Deeper navy sections |
| `--color-text` | `#0f172a` | Primary text on light backgrounds |
| `--color-text-secondary` | `#475569` | Secondary body text |
| `--color-text-muted` | `#94a3b8` | Labels, captions, metadata |
| `--color-text-inverse` | `#f8fafc` | Text on dark backgrounds |
| `--color-text-inverse-muted` | `#cbd5e1` | Secondary text on dark backgrounds |
| `--color-navy` | `#1e3a5f` | Accent, active states, CTAs |
| `--color-border` | `#e2e8f0` | Borders on light surfaces |
| `--color-border-dark` | `#334155` | Borders on dark surfaces |

No purple. No colorful icons. All icons are monochromatic.

### Typography

| Token | Font |
|---|---|
| `--font-sans` | Inter (all body and UI) |
| `--font-mono` | JetBrains Mono (codes, labels, IDs) |
