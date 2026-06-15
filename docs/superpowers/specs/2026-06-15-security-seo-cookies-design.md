# Frasco Web App — Security, SEO, Cookies & Contact Form Design

**Date:** 2026-06-15  
**Domain:** frasco.ca  
**Stack:** Next.js 16.2.9, React 19, Tailwind CSS, App Router

---

## 1. Icon & Web Manifest

- `public/icon.png` registered via `metadata.icons` in `app/layout.tsx`
- `app/manifest.ts` → generated `/manifest.webmanifest` linking `icon.png` (name, short_name, icons, theme_color, background_color)
- Shortcut icon (32×32) + apple-touch-icon (180×180) both point to `icon.png`

## 2. Contact Form — API Route + Google Apps Script + Rate Limiting

### API Route: `app/api/contact/route.ts`
- Accepts POST with JSON body: `{ name, company, email, phone, service, location, message, urgent, _hp }`
- `_hp` is a honeypot field — if non-empty, silently return 200 (fool bots)
- In-memory rate limiter: `Map<string, { count: number; resetAt: number }>` keyed by IP
  - Limit: 5 submissions per IP per 60 minutes
  - Returns `429` with `{ error: "Too many requests. Please try again later." }` when exceeded
- Forwards valid submissions as JSON POST to `process.env.GOOGLE_SCRIPT_URL`
- Returns `200 { success: true }` or `500 { error: "..." }` on script failure

### Google Apps Script
- User deploys a Web App script (provided as snippet) that receives JSON and sends email to Frasco inbox
- URL saved in `.env.local` as `GOOGLE_SCRIPT_URL`

### ContactForm.tsx updates
- Adds hidden honeypot `<input name="_hp">` (visually hidden via CSS, not `display:none`)
- `handleSubmit` POSTs to `/api/contact` via `fetch()`
- Shows three states: loading spinner, success screen (existing), error message (rate limited / network failure)

## 3. Security Headers (`next.config.ts`)

Applied via `headers()` to all routes (`source: '/(.*)'`):

| Header | Value |
|---|---|
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `Content-Security-Policy` | `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://script.google.com; frame-ancestors 'none'` |

## 4. SEO Optimization

### Per-page metadata (title, description, keywords, canonical, OG, Twitter)

| Route | Title | Focus Keywords |
|---|---|---|
| `/` | FRASCO Industrial Inspections — NDE/NDT, Tube Inspection, Nova Scotia | NDE inspection Nova Scotia, NDT services Halifax, industrial inspection Dartmouth |
| `/about` | About FRASCO — CGSB Certified Industrial Inspectors, Dartmouth NS | CGSB certified NDT, industrial inspection company Nova Scotia |
| `/contact` | Contact FRASCO — Request an Inspection, frasco.ca | industrial inspection quote Nova Scotia, contact NDT inspector Halifax |
| `/services/nde-ndt` | NDE/NDT Inspection Services — Nova Scotia | non-destructive testing Nova Scotia, NDE inspection Halifax |
| `/services/tube-inspection` | Tube Inspection Services — Heat Exchanger & Boiler | tube inspection Nova Scotia, heat exchanger inspection Canada |
| `/services/asset-integrity` | Asset Integrity Management — Industrial NS | asset integrity inspection, corrosion inspection Nova Scotia |
| `/services/lifting-equipment` | Lifting Equipment Certification — Nova Scotia | lifting equipment certification NS, crane inspection Nova Scotia |

### Global metadata in `layout.tsx`
- `metadataBase: new URL('https://frasco.ca')`
- `openGraph`: type=website, locale=en_CA, site_name=FRASCO, image=`/icon.png`
- `twitter`: card=summary, site=@frasco (placeholder)
- `keywords` array on root layout as fallback

### `app/robots.ts`
- Allow all crawlers
- Disallow `/api/`
- Sitemap: `https://frasco.ca/sitemap.xml`

### `app/sitemap.ts`
- All 8 routes with `lastModified`, `changeFrequency`, `priority`
- Home priority 1.0, service pages 0.8, about/contact 0.7

### JSON-LD Local Business Schema (in `layout.tsx`)
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "FRASCO Industrial Inspections",
  "url": "https://frasco.ca",
  "telephone": "+19024315483",
  "address": { "@type": "PostalAddress", "addressLocality": "Dartmouth", "addressRegion": "NS", "addressCountry": "CA" },
  "areaServed": "Nova Scotia",
  "serviceType": ["NDE Inspection", "NDT Services", "Tube Inspection", "Asset Integrity", "Lifting Equipment Certification"]
}
```

## 5. 404 Page (`app/not-found.tsx`)

- On-brand: dark background, FRASCO wordmark, "404 — Page Not Found"
- Industrial copy: "This area is off-limits or doesn't exist."
- Two CTAs: "Return Home" + "Contact Us"
- No external dependencies

## 6. Cookie Consent (GDPR/PIPEDA-style)

### `components/ui/CookieBanner.tsx`
- Fixed bottom-of-screen banner
- Three categories: **Essential** (always on, locked toggle), **Analytics** (default off), **Marketing** (default off)
- "Manage Preferences" button expands inline category toggles
- "Accept All" / "Save Preferences" / "Decline All" buttons
- Consent stored in cookie `frasco_consent` (JSON: `{ essential: true, analytics: bool, marketing: bool, timestamp: ISO }`) — 12-month expiry
- Banner hidden when valid consent cookie exists

### `components/providers/CookieConsentProvider.tsx`
- Context provider wrapping the app (added to `layout.tsx`)
- Reads `frasco_consent` cookie on mount
- Exports `useCookieConsent()` hook for future analytics gating

## 7. Additional Additions

- **`app/manifest.ts`** — PWA-lite manifest with icon.png
- **Canonical URLs** — `alternates.canonical` on every page metadata
- **`og:image`** — `icon.png` as fallback social share image

---

## Implementation Order

1. Icon + manifest
2. Security headers in next.config.ts
3. SEO — layout.tsx global metadata + JSON-LD
4. Per-page metadata on all 8 routes
5. robots.ts + sitemap.ts
6. API route + rate limiter
7. ContactForm.tsx updates (honeypot + fetch)
8. 404 page
9. Cookie banner + provider
10. `.env.local.example` with `GOOGLE_SCRIPT_URL` placeholder
