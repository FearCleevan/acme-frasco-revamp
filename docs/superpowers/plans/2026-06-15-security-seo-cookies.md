# Security, SEO, Cookies & Contact Form Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add security headers, full SEO (metadata, sitemap, robots, JSON-LD), contact form API route with Google Apps Script integration and rate limiting, a 404 page, cookie consent banner, icon/manifest, and honeypot bot protection to the Frasco Next.js app.

**Architecture:** Static security headers live in `next.config.ts`. SEO is handled by Next.js metadata exports per page plus `app/robots.ts` and `app/sitemap.ts`. The contact form POSTs to `app/api/contact/route.ts` which rate-limits by IP and forwards to a Google Apps Script Web App. Cookie consent is a client component reading/writing a `frasco_consent` cookie, wrapped in a context provider.

**Tech Stack:** Next.js 16.2.9 App Router, React 19, TypeScript, Tailwind CSS (colors: ink=#111111, orange=#e8600c, soft=#eeeeee, ghost=#d8d8d8, lead=#5a5a5a)

---

## File Map

| Action | File |
|--------|------|
| Modify | `next.config.ts` — security headers |
| Modify | `app/layout.tsx` — icon metadata, metadataBase, OG, Twitter, JSON-LD, CookieConsentProvider |
| Create | `app/manifest.ts` — PWA manifest |
| Create | `app/robots.ts` — robots.txt |
| Create | `app/sitemap.ts` — sitemap.xml |
| Modify | `app/page.tsx` — enhanced metadata |
| Modify | `app/about/page.tsx` — enhanced metadata |
| Modify | `app/contact/page.tsx` — enhanced metadata |
| Modify | `app/services/nde-ndt/page.tsx` — enhanced metadata |
| Modify | `app/services/tube-inspection/page.tsx` — enhanced metadata |
| Modify | `app/services/asset-integrity/page.tsx` — enhanced metadata |
| Modify | `app/services/lifting-equipment/page.tsx` — enhanced metadata |
| Create | `app/api/contact/route.ts` — POST handler, rate limiter, Google Apps Script proxy |
| Modify | `components/sections/contact/ContactForm.tsx` — fetch API, honeypot, loading/error states |
| Create | `app/not-found.tsx` — branded 404 page |
| Create | `components/ui/CookieBanner.tsx` — GDPR cookie consent banner |
| Create | `components/providers/CookieConsentProvider.tsx` — cookie context |
| Create | `.env.local.example` — environment variable template |

---

## Task 1: Security Headers

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Replace next.config.ts with headers configuration**

```ts
// next.config.ts
import type { NextConfig } from "next";

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' data: https://fonts.gstatic.com;
  img-src 'self' data: blob:;
  connect-src 'self' https://script.google.com https://script.googleusercontent.com;
  frame-ancestors 'none';
  object-src 'none';
  base-uri 'self';
`.replace(/\n/g, " ").trim();

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Content-Security-Policy", value: ContentSecurityPolicy },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
```

- [ ] **Step 2: Verify the dev server starts without errors**

Run: `npm run dev`
Expected: Server starts on http://localhost:3000 with no errors in the console.

- [ ] **Step 3: Commit**

```bash
git add next.config.ts
git commit -m "feat: add security headers (CSP, HSTS, X-Frame-Options, Permissions-Policy)"
```

---

## Task 2: Icon & Web Manifest

**Files:**
- Modify: `app/layout.tsx` — add `icons` to metadata
- Create: `app/manifest.ts`

- [ ] **Step 1: Add icons to the metadata export in layout.tsx**

Find the existing `export const metadata: Metadata = { ... }` block (lines 41–45) and replace it:

```ts
export const metadata: Metadata = {
  title: "FRASCO | Industrial Inspection Services — Dartmouth, NS",
  description:
    "Certified NDE/NDT, tube inspection, asset integrity and lifting equipment certification. 24/7 availability across Nova Scotia and beyond.",
  icons: {
    icon: [{ url: "/icon.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/icon.png",
  },
};
```

- [ ] **Step 2: Create app/manifest.ts**

```ts
// app/manifest.ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FRASCO Industrial Inspections",
    short_name: "FRASCO",
    description:
      "Certified NDE/NDT, tube inspection, asset integrity and lifting equipment services in Nova Scotia.",
    start_url: "/",
    display: "standalone",
    background_color: "#111111",
    theme_color: "#e8600c",
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png" },
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
```

- [ ] **Step 3: Verify icon appears in browser tab**

Run: `npm run dev`, open http://localhost:3000 in a browser.
Expected: The browser tab shows the icon.png favicon instead of the default Next.js icon.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx app/manifest.ts
git commit -m "feat: add icon.png as favicon and web manifest"
```

---

## Task 3: Global SEO in layout.tsx

**Files:**
- Modify: `app/layout.tsx` — metadataBase, openGraph, twitter, keywords, JSON-LD

- [ ] **Step 1: Replace the metadata export in app/layout.tsx with full SEO metadata**

```ts
export const metadata: Metadata = {
  metadataBase: new URL("https://frasco.ca"),
  title: {
    default: "FRASCO | Industrial Inspection Services — Dartmouth, NS",
    template: "%s | FRASCO Industrial Inspections",
  },
  description:
    "Certified NDE/NDT, tube inspection, asset integrity and lifting equipment certification. 24/7 availability across Nova Scotia and beyond.",
  keywords: [
    "NDE inspection Nova Scotia",
    "NDT services Halifax",
    "industrial inspection Dartmouth",
    "non-destructive testing Nova Scotia",
    "CGSB certified NDT",
    "tube inspection Halifax",
    "heat exchanger inspection Canada",
    "asset integrity inspection Nova Scotia",
    "lifting equipment certification NS",
    "crane inspection Nova Scotia",
    "industrial NDE contractor",
    "frasco.ca",
    "FRASCO inspections",
  ],
  icons: {
    icon: [{ url: "/icon.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://frasco.ca",
    siteName: "FRASCO Industrial Inspections",
    title: "FRASCO | Industrial Inspection Services — Dartmouth, NS",
    description:
      "Certified NDE/NDT, tube inspection, asset integrity and lifting equipment certification. 24/7 availability across Nova Scotia and beyond.",
    images: [{ url: "/icon.png", width: 512, height: 512, alt: "FRASCO Industrial Inspections" }],
  },
  twitter: {
    card: "summary",
    title: "FRASCO | Industrial Inspection Services",
    description:
      "Certified NDE/NDT, tube inspection, asset integrity and lifting equipment certification. 24/7 across Nova Scotia.",
    images: ["/icon.png"],
  },
  alternates: {
    canonical: "https://frasco.ca",
  },
};
```

- [ ] **Step 2: Add JSON-LD local business schema inside RootLayout, before </body>**

In `app/layout.tsx`, add this const before the `export default function RootLayout` line:

```ts
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "FRASCO Industrial Inspections",
  url: "https://frasco.ca",
  telephone: "+19024315483",
  email: "info@frasco.ca",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dartmouth",
    addressRegion: "NS",
    addressCountry: "CA",
  },
  areaServed: {
    "@type": "State",
    name: "Nova Scotia",
  },
  serviceType: [
    "NDE Inspection",
    "NDT Services",
    "Tube Inspection",
    "Asset Integrity Management",
    "Lifting Equipment Certification",
  ],
  openingHours: "Mo-Su 00:00-23:59",
  priceRange: "$$",
};
```

Then inside the `<body>` tag, add the script tag as the first child (before `<LenisProvider>`):

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

- [ ] **Step 3: Verify metadata renders in page source**

Run: `npm run dev`, open http://localhost:3000, view page source (Ctrl+U).
Expected: See `<meta property="og:title"`, `<link rel="canonical"`, and `<script type="application/ld+json">` in the `<head>`.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: add global SEO metadata, Open Graph, Twitter card, and JSON-LD schema"
```

---

## Task 4: Per-Page Metadata

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/about/page.tsx`
- Modify: `app/contact/page.tsx`
- Modify: `app/services/nde-ndt/page.tsx`
- Modify: `app/services/tube-inspection/page.tsx`
- Modify: `app/services/asset-integrity/page.tsx`
- Modify: `app/services/lifting-equipment/page.tsx`

- [ ] **Step 1: Add metadata export to app/page.tsx (home page)**

Add this before `export default function HomePage()`:

```ts
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FRASCO | Industrial Inspection Services — Dartmouth, NS",
  description:
    "Certified NDE/NDT, tube inspection, asset integrity and lifting equipment certification. 24/7 availability across Nova Scotia and beyond.",
  keywords: [
    "NDE inspection Nova Scotia",
    "NDT services Halifax",
    "industrial inspection Dartmouth NS",
    "non-destructive testing Canada",
    "CGSB certified inspectors",
    "frasco.ca",
  ],
  alternates: { canonical: "https://frasco.ca" },
  openGraph: {
    title: "FRASCO | Industrial Inspection Services — Dartmouth, NS",
    description:
      "Certified NDE/NDT, tube inspection, asset integrity and lifting equipment certification. 24/7 availability across Nova Scotia.",
    url: "https://frasco.ca",
  },
};
```

- [ ] **Step 2: Replace metadata in app/about/page.tsx**

Replace the existing `export const metadata = { ... }` block:

```ts
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About FRASCO — CGSB Certified Industrial Inspectors, Dartmouth NS",
  description:
    "Certified NDT personnel based in Dartmouth, NS. Available 24/7 across Nova Scotia, New Brunswick, Newfoundland, and beyond.",
  keywords: [
    "CGSB certified NDT inspectors",
    "industrial inspection company Nova Scotia",
    "NDE company Dartmouth",
    "certified NDT personnel",
    "about FRASCO inspections",
  ],
  alternates: { canonical: "https://frasco.ca/about" },
  openGraph: {
    title: "About FRASCO — CGSB Certified Industrial Inspectors",
    description:
      "Certified NDT personnel based in Dartmouth, NS. Available 24/7 across Nova Scotia, New Brunswick, Newfoundland, and beyond.",
    url: "https://frasco.ca/about",
  },
};
```

- [ ] **Step 3: Replace metadata in app/contact/page.tsx**

Replace the existing `export const metadata = { ... }` block:

```ts
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact FRASCO — Request an Inspection",
  description:
    "Request an inspection or get in touch with Frasco Industrial Inspections. Available 24/7 across Eastern Canada for NDE, tube inspection, asset integrity, and lifting equipment.",
  keywords: [
    "industrial inspection quote Nova Scotia",
    "contact NDT inspector Halifax",
    "request NDE inspection",
    "inspection services Dartmouth NS",
    "FRASCO contact",
  ],
  alternates: { canonical: "https://frasco.ca/contact" },
  openGraph: {
    title: "Contact FRASCO — Request an Inspection",
    description:
      "Request an inspection 24/7 across Eastern Canada. NDE, tube inspection, asset integrity, and lifting equipment.",
    url: "https://frasco.ca/contact",
  },
};
```

- [ ] **Step 4: Replace metadata in app/services/nde-ndt/page.tsx**

Replace the existing `export const metadata = { ... }` block:

```ts
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NDE/NDT Inspection Services — Nova Scotia",
  description:
    "Nine certified NDE/NDT inspection methods. No coating removal required. Same-day results. Available 24/7 across Nova Scotia and beyond.",
  keywords: [
    "non-destructive testing Nova Scotia",
    "NDE inspection Halifax",
    "NDT services Dartmouth",
    "eddy current testing Nova Scotia",
    "CGSB 48.9712 certified",
    "magnetic particle inspection NS",
    "ultrasonic testing Nova Scotia",
  ],
  alternates: { canonical: "https://frasco.ca/services/nde-ndt" },
  openGraph: {
    title: "NDE/NDT Inspection Services — Nova Scotia | FRASCO",
    description:
      "Nine certified NDE/NDT methods, same-day results, available 24/7. Serving Nova Scotia and Eastern Canada.",
    url: "https://frasco.ca/services/nde-ndt",
  },
};
```

- [ ] **Step 5: Replace metadata in app/services/tube-inspection/page.tsx**

Replace the existing `export const metadata = { ... }` block:

```ts
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tube Inspection Services — Heat Exchanger & Boiler NS",
  description:
    "Comprehensive ECT tube inspection for chillers, condensers, heat exchangers, boilers and more. Same-day reporting. Available 24/7.",
  keywords: [
    "tube inspection Nova Scotia",
    "heat exchanger inspection Canada",
    "eddy current tube inspection Halifax",
    "chiller tube inspection NS",
    "NFT tube inspection",
    "condenser tube inspection Eastern Canada",
  ],
  alternates: { canonical: "https://frasco.ca/services/tube-inspection" },
  openGraph: {
    title: "Tube Inspection Services — Heat Exchanger & Boiler | FRASCO",
    description:
      "ECT tube inspection for chillers, condensers, heat exchangers, and boilers. Same-day reporting across Nova Scotia.",
    url: "https://frasco.ca/services/tube-inspection",
  },
};
```

- [ ] **Step 6: Replace metadata in app/services/asset-integrity/page.tsx**

Replace the existing `export const metadata = { ... }` block:

```ts
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asset Integrity Management — Industrial Nova Scotia",
  description:
    "API 510, 570, 653 certified asset integrity inspections. Pressure vessels, piping, storage tanks, and turnaround inspections across Nova Scotia.",
  keywords: [
    "asset integrity inspection Nova Scotia",
    "corrosion inspection NS",
    "API 510 inspection Halifax",
    "pressure vessel inspection Nova Scotia",
    "storage tank inspection Canada",
    "QA QC inspection Nova Scotia",
  ],
  alternates: { canonical: "https://frasco.ca/services/asset-integrity" },
  openGraph: {
    title: "Asset Integrity Management — Industrial Nova Scotia | FRASCO",
    description:
      "API 510/570/653 pressure vessel, piping, and storage tank inspections across Nova Scotia.",
    url: "https://frasco.ca/services/asset-integrity",
  },
};
```

- [ ] **Step 7: Replace metadata in app/services/lifting-equipment/page.tsx**

Replace the existing `export const metadata = { ... }` block:

```ts
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lifting Equipment Certification — Nova Scotia",
  description:
    "CSA-compliant lifting equipment certification for cranes, wire rope, forklifts, gantry cranes and more across Nova Scotia.",
  keywords: [
    "lifting equipment certification NS",
    "crane inspection Nova Scotia",
    "wire rope inspection Halifax",
    "forklift certification Nova Scotia",
    "CSA lifting equipment",
    "gantry crane inspection Canada",
  ],
  alternates: { canonical: "https://frasco.ca/services/lifting-equipment" },
  openGraph: {
    title: "Lifting Equipment Certification — Nova Scotia | FRASCO",
    description:
      "CSA-compliant certification for cranes, wire rope, forklifts, and gantry cranes across Nova Scotia.",
    url: "https://frasco.ca/services/lifting-equipment",
  },
};
```

- [ ] **Step 8: Commit**

```bash
git add app/page.tsx app/about/page.tsx app/contact/page.tsx app/services/nde-ndt/page.tsx app/services/tube-inspection/page.tsx app/services/asset-integrity/page.tsx app/services/lifting-equipment/page.tsx
git commit -m "feat: add per-page SEO metadata with keywords and canonical URLs for all 8 routes"
```

---

## Task 5: robots.ts + sitemap.ts

**Files:**
- Create: `app/robots.ts`
- Create: `app/sitemap.ts`

- [ ] **Step 1: Create app/robots.ts**

```ts
// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://frasco.ca/sitemap.xml",
  };
}
```

- [ ] **Step 2: Create app/sitemap.ts**

```ts
// app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://frasco.ca";
  const lastModified = new Date("2026-06-15");

  return [
    { url: base, lastModified, changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/about`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/services/nde-ndt`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/tube-inspection`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/asset-integrity`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/lifting-equipment`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];
}
```

- [ ] **Step 3: Verify robots and sitemap routes**

Run: `npm run dev`
- Open http://localhost:3000/robots.txt — Expected: plain text file listing rules and sitemap URL
- Open http://localhost:3000/sitemap.xml — Expected: XML sitemap with all 7 URLs

- [ ] **Step 4: Commit**

```bash
git add app/robots.ts app/sitemap.ts
git commit -m "feat: add robots.txt and sitemap.xml via Next.js metadata routes"
```

---

## Task 6: Contact Form API Route + Rate Limiter

**Files:**
- Create: `app/api/contact/route.ts`
- Create: `.env.local.example`

- [ ] **Step 1: Create .env.local.example**

```
# Google Apps Script Web App URL
# Deploy your script as a Web App (Execute as: Me, Who has access: Anyone)
# then paste the deployment URL here
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

Also create `.env.local` with the same content (the user will fill in the real URL later):

```
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/REPLACE_WITH_YOUR_DEPLOYMENT_ID/exec
```

- [ ] **Step 2: Create app/api/contact/route.ts**

```ts
// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();
const LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000;

function getIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = store.get(ip);
  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= LIMIT) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = getIp(req);

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait an hour before submitting again." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot check — bots fill the _hp field, humans don't
  if (body._hp) {
    return NextResponse.json({ success: true });
  }

  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  if (!scriptUrl || scriptUrl.includes("REPLACE_WITH_YOUR_DEPLOYMENT_ID")) {
    console.warn("GOOGLE_SCRIPT_URL is not configured. Form submission skipped.");
    return NextResponse.json({ success: true });
  }

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: body.name,
        company: body.company,
        email: body.email,
        phone: body.phone,
        service: body.service,
        location: body.location,
        message: body.message,
        urgent: body.urgent,
      }),
    });

    if (!response.ok) {
      console.error("Google Apps Script returned:", response.status);
      return NextResponse.json(
        { error: "Failed to send your message. Please call us directly." },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("Failed to reach Google Apps Script:", err);
    return NextResponse.json(
      { error: "Failed to send your message. Please call us directly." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
```

- [ ] **Step 3: Verify the API route responds**

Run: `npm run dev`

In a new terminal, test with curl (or use the browser's fetch):
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"t@t.com","message":"hello","_hp":""}'
```
Expected: `{"success":true}`

- [ ] **Step 4: Commit**

```bash
git add app/api/contact/route.ts .env.local.example
git commit -m "feat: add contact form API route with IP rate limiting and Google Apps Script proxy"
```

---

## Task 7: Google Apps Script Snippet

This is a reference for the user — no code to commit, but the plan must include it.

- [ ] **Step 1: Provide the Google Apps Script to deploy**

In Google Drive, create a new Apps Script project and paste this code, then deploy as a Web App (Execute as: Me, Who has access: Anyone):

```javascript
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var recipient = "info@frasco.ca"; // ← change to the real inbox
    var subject = data.urgent
      ? "🚨 URGENT Inspection Request — " + data.name
      : "New Inspection Request — " + data.name;

    var body = [
      "Name: " + (data.name || "—"),
      "Company: " + (data.company || "—"),
      "Email: " + (data.email || "—"),
      "Phone: " + (data.phone || "—"),
      "Service: " + (data.service || "—"),
      "Location: " + (data.location || "—"),
      "Urgent: " + (data.urgent ? "YES" : "No"),
      "",
      "Message:",
      data.message || "—",
    ].join("\n");

    MailApp.sendEmail(recipient, subject, body);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

After deploying, copy the Web App URL into `.env.local` as `GOOGLE_SCRIPT_URL`.

---

## Task 8: Update ContactForm.tsx

**Files:**
- Modify: `components/sections/contact/ContactForm.tsx`

- [ ] **Step 1: Replace ContactForm.tsx with version that fetches the API, includes honeypot, and handles loading/error states**

```tsx
'use client';

import { useState } from "react";
import { serviceOptions } from "@/lib/data/contact";

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  location: string;
  message: string;
  urgent: boolean;
  _hp: string;
}

type Status = "idle" | "loading" | "success" | "error" | "rate-limited";

const initialState: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  location: "",
  message: "",
  urgent: false,
  _hp: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.status === 429) {
        setStatus("rate-limited");
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || "Something went wrong. Please call us directly.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMsg("Network error. Please check your connection or call us directly.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white border border-ghost shadow-heavy p-8 md:p-12 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-orange flex items-center justify-center mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="font-label text-2xl font-bold text-ink uppercase tracking-tight mb-4">
          Request Received
        </h3>
        <p className="font-body text-lead text-sm leading-relaxed max-w-md mb-8">
          Thank you for contacting Frasco Industrial Inspections. A member of our team will review your request and be in touch within one business day. For urgent matters, please call us directly.
        </p>
        <a
          href="tel:19024315483"
          className="inline-flex items-center gap-2 bg-orange text-white font-label font-bold text-sm uppercase tracking-wider px-8 py-4 hover:bg-ink transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.04 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z" />
          </svg>
          Call 1-902-431-5483
        </a>
      </div>
    );
  }

  if (status === "rate-limited") {
    return (
      <div className="bg-white border border-ghost shadow-heavy p-8 md:p-12 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-ink flex items-center justify-center mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h3 className="font-label text-2xl font-bold text-ink uppercase tracking-tight mb-4">
          Too Many Requests
        </h3>
        <p className="font-body text-lead text-sm leading-relaxed max-w-md mb-8">
          You have submitted too many requests in a short period. Please wait an hour or call us directly.
        </p>
        <a
          href="tel:19024315483"
          className="inline-flex items-center gap-2 bg-orange text-white font-label font-bold text-sm uppercase tracking-wider px-8 py-4 hover:bg-ink transition-colors"
        >
          Call 1-902-431-5483
        </a>
      </div>
    );
  }

  const inputClass =
    "w-full bg-white border border-ghost px-4 py-3 font-body text-sm text-ink placeholder:text-ghost/60 focus:outline-none focus:border-orange transition-colors";
  const labelClass = "block font-mono text-[10px] uppercase tracking-widest text-lead mb-2";

  return (
    <div className="bg-white border border-ghost shadow-heavy p-8 md:p-12">
      <h3 className="font-label text-2xl font-bold text-ink uppercase tracking-tight mb-2">
        Request an Inspection
      </h3>
      <p className="font-body text-sm text-lead mb-8">
        Fill in the details below and our team will get back to you promptly.
      </p>

      {status === "error" && (
        <div className="mb-6 p-4 border border-red-300 bg-red-50 text-red-700 font-body text-sm">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Honeypot — hidden from humans, bots fill this */}
        <input
          name="_hp"
          type="text"
          value={form._hp}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
        />

        {/* Name + Company */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className={labelClass}>
              Full Name <span className="text-orange">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="John Smith"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="company" className={labelClass}>
              Company
            </label>
            <input
              id="company"
              name="company"
              type="text"
              value={form.company}
              onChange={handleChange}
              placeholder="ACME Industries Ltd."
              className={inputClass}
            />
          </div>
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className={labelClass}>
              Email Address <span className="text-orange">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@company.com"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="1-902-000-0000"
              className={inputClass}
            />
          </div>
        </div>

        {/* Service + Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="service" className={labelClass}>
              Service Required
            </label>
            <select
              id="service"
              name="service"
              value={form.service}
              onChange={handleChange}
              className={`${inputClass} cursor-pointer`}
            >
              <option value="">Select a service…</option>
              {serviceOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="location" className={labelClass}>
              Site Location / Province
            </label>
            <input
              id="location"
              name="location"
              type="text"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Halifax, NS"
              className={inputClass}
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className={labelClass}>
            Message / Project Details <span className="text-orange">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={handleChange}
            placeholder="Describe your inspection needs, timeline, equipment involved…"
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Urgent checkbox */}
        <div className="flex items-center gap-3">
          <input
            id="urgent"
            name="urgent"
            type="checkbox"
            checked={form.urgent}
            onChange={handleChange}
            className="w-4 h-4 accent-orange cursor-pointer"
          />
          <label htmlFor="urgent" className="font-mono text-[10px] uppercase tracking-widest text-lead cursor-pointer">
            This is an urgent / emergency request
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-orange text-white font-label font-bold text-sm uppercase tracking-wider px-8 py-4 hover:bg-ink transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Sending…" : "Submit Inspection Request"}
        </button>

        <p className="font-body text-[11px] text-ghost text-center">
          Fields marked <span className="text-orange">*</span> are required. We respond within one business day.
        </p>

      </form>
    </div>
  );
}
```

- [ ] **Step 2: Verify form submits and shows success state**

Run: `npm run dev`, navigate to http://localhost:3000/contact.
Fill in the form with name, email, and message then submit.
Expected: Button shows "Sending…" then transitions to the success screen (since GOOGLE_SCRIPT_URL is not yet real, the API returns success by default).

- [ ] **Step 3: Commit**

```bash
git add components/sections/contact/ContactForm.tsx
git commit -m "feat: wire contact form to API route with loading state, honeypot, and error handling"
```

---

## Task 9: 404 Page

**Files:**
- Create: `app/not-found.tsx`

- [ ] **Step 1: Create app/not-found.tsx**

```tsx
// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ink flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Blueprint grid background */}
      <div className="blueprint opacity-20 absolute inset-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        <p className="font-mono text-[10px] uppercase tracking-widest text-orange mb-6">
          Error 404
        </p>

        <h1 className="font-label text-[120px] md:text-[180px] font-bold text-white/10 leading-none select-none mb-0">
          404
        </h1>

        <h2 className="font-label text-3xl md:text-4xl font-bold text-white uppercase tracking-tight -mt-4 mb-6">
          Page Not Found
        </h2>

        <p className="font-body text-base text-white/60 max-w-md leading-relaxed mb-10">
          This area is off-limits or doesn&apos;t exist. The page you&apos;re looking for may have moved or been removed.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-orange text-white font-label font-bold text-sm uppercase tracking-wider px-8 py-4 hover:bg-white hover:text-ink transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Return Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-label font-bold text-sm uppercase tracking-wider px-8 py-4 hover:border-orange hover:text-orange transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify the 404 page renders**

Run: `npm run dev`, navigate to http://localhost:3000/this-does-not-exist.
Expected: Branded 404 page with dark background, large "404" text, and two CTA buttons.

- [ ] **Step 3: Commit**

```bash
git add app/not-found.tsx
git commit -m "feat: add branded 404 not-found page"
```

---

## Task 10: Cookie Consent Banner & Provider

**Files:**
- Create: `components/providers/CookieConsentProvider.tsx`
- Create: `components/ui/CookieBanner.tsx`
- Modify: `app/layout.tsx` — wrap with provider, render banner

- [ ] **Step 1: Create components/providers/CookieConsentProvider.tsx**

```tsx
// components/providers/CookieConsentProvider.tsx
'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export interface ConsentState {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string | null;
}

interface ConsentContextValue {
  consent: ConsentState | null;
  hasResponded: boolean;
  saveConsent: (analytics: boolean, marketing: boolean) => void;
}

const COOKIE_NAME = "frasco_consent";
const EXPIRY_DAYS = 365;

function parseCookieConsent(): ConsentState | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`));
  if (!match) return null;
  try {
    const value = decodeURIComponent(match.split("=")[1]);
    return JSON.parse(value) as ConsentState;
  } catch {
    return null;
  }
}

function writeConsentCookie(state: ConsentState) {
  const expires = new Date();
  expires.setDate(expires.getDate() + EXPIRY_DAYS);
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(
    JSON.stringify(state)
  )}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

const ConsentContext = createContext<ConsentContextValue>({
  consent: null,
  hasResponded: false,
  saveConsent: () => {},
});

export function useCookieConsent() {
  return useContext(ConsentContext);
}

export default function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [hasResponded, setHasResponded] = useState(false);

  useEffect(() => {
    const saved = parseCookieConsent();
    if (saved) {
      setConsent(saved);
      setHasResponded(true);
    }
  }, []);

  const saveConsent = useCallback((analytics: boolean, marketing: boolean) => {
    const state: ConsentState = {
      essential: true,
      analytics,
      marketing,
      timestamp: new Date().toISOString(),
    };
    writeConsentCookie(state);
    setConsent(state);
    setHasResponded(true);
  }, []);

  return (
    <ConsentContext.Provider value={{ consent, hasResponded, saveConsent }}>
      {children}
    </ConsentContext.Provider>
  );
}
```

- [ ] **Step 2: Create components/ui/CookieBanner.tsx**

```tsx
// components/ui/CookieBanner.tsx
'use client';

import { useState } from "react";
import { useCookieConsent } from "@/components/providers/CookieConsentProvider";

export default function CookieBanner() {
  const { hasResponded, saveConsent } = useCookieConsent();
  const [showPreferences, setShowPreferences] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  if (hasResponded) return null;

  function acceptAll() {
    saveConsent(true, true);
  }

  function declineAll() {
    saveConsent(false, false);
  }

  function savePreferences() {
    saveConsent(analytics, marketing);
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed bottom-0 left-0 right-0 z-50 bg-ink border-t border-white/10 shadow-heavy"
    >
      <div className="max-w-7xl mx-auto px-6 py-5">
        {!showPreferences ? (
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <div className="flex-1 min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-widest text-orange mb-1">
                Cookie Preferences
              </p>
              <p className="font-body text-xs text-white/70 leading-relaxed">
                We use essential cookies to keep this site running. With your consent, we may also use analytics and marketing cookies to understand how visitors use the site and to reach you with relevant content.{" "}
                <button
                  onClick={() => setShowPreferences(true)}
                  className="text-orange underline hover:text-white transition-colors"
                >
                  Manage preferences
                </button>
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={declineAll}
                className="font-label font-bold text-xs uppercase tracking-wider text-white/50 hover:text-white transition-colors px-4 py-2 border border-white/20 hover:border-white/50"
              >
                Decline All
              </button>
              <button
                onClick={acceptAll}
                className="font-label font-bold text-xs uppercase tracking-wider bg-orange text-white px-6 py-2 hover:bg-white hover:text-ink transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-orange">
              Manage Cookie Preferences
            </p>

            {/* Essential */}
            <div className="flex items-start gap-4 py-3 border-b border-white/10">
              <div className="flex-1">
                <p className="font-label font-bold text-xs uppercase tracking-wider text-white mb-1">
                  Essential
                </p>
                <p className="font-body text-xs text-white/50">
                  Required for the site to function. Cannot be disabled.
                </p>
              </div>
              <div className="shrink-0 mt-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-orange">Always On</span>
              </div>
            </div>

            {/* Analytics */}
            <div className="flex items-start gap-4 py-3 border-b border-white/10">
              <div className="flex-1">
                <p className="font-label font-bold text-xs uppercase tracking-wider text-white mb-1">
                  Analytics
                </p>
                <p className="font-body text-xs text-white/50">
                  Helps us understand how visitors interact with the site so we can improve it.
                </p>
              </div>
              <button
                role="switch"
                aria-checked={analytics}
                onClick={() => setAnalytics((v) => !v)}
                className={`shrink-0 mt-1 w-10 h-5 rounded-full transition-colors relative ${
                  analytics ? "bg-orange" : "bg-white/20"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                    analytics ? "translate-x-5" : "translate-x-0"
                  }`}
                />
                <span className="sr-only">{analytics ? "Disable analytics" : "Enable analytics"}</span>
              </button>
            </div>

            {/* Marketing */}
            <div className="flex items-start gap-4 py-3 border-b border-white/10">
              <div className="flex-1">
                <p className="font-label font-bold text-xs uppercase tracking-wider text-white mb-1">
                  Marketing
                </p>
                <p className="font-body text-xs text-white/50">
                  Allows us to show you relevant ads and measure campaign effectiveness.
                </p>
              </div>
              <button
                role="switch"
                aria-checked={marketing}
                onClick={() => setMarketing((v) => !v)}
                className={`shrink-0 mt-1 w-10 h-5 rounded-full transition-colors relative ${
                  marketing ? "bg-orange" : "bg-white/20"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                    marketing ? "translate-x-5" : "translate-x-0"
                  }`}
                />
                <span className="sr-only">{marketing ? "Disable marketing" : "Enable marketing"}</span>
              </button>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={declineAll}
                className="font-label font-bold text-xs uppercase tracking-wider text-white/50 hover:text-white transition-colors px-4 py-2 border border-white/20 hover:border-white/50"
              >
                Decline All
              </button>
              <button
                onClick={savePreferences}
                className="font-label font-bold text-xs uppercase tracking-wider bg-orange text-white px-6 py-2 hover:bg-white hover:text-ink transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Update app/layout.tsx to add CookieConsentProvider and CookieBanner**

Add these two imports near the top of `app/layout.tsx` (after the existing imports):

```ts
import CookieConsentProvider from "@/components/providers/CookieConsentProvider";
import CookieBanner from "@/components/ui/CookieBanner";
```

Then wrap the entire body content in `CookieConsentProvider` and add `<CookieBanner />` before the closing `</CookieConsentProvider>`. The body should look like this:

```tsx
<body className="font-body bg-paper text-ink overflow-x-hidden min-h-screen flex flex-col">
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
  />
  <CookieConsentProvider>
    <LenisProvider>
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </LenisProvider>
    <CookieBanner />
  </CookieConsentProvider>
</body>
```

- [ ] **Step 4: Verify cookie banner appears on first visit**

Run: `npm run dev`, open http://localhost:3000 in a private/incognito window.
Expected: Cookie banner appears at the bottom of the page.
Click "Manage preferences" — Expected: toggles for Analytics and Marketing appear.
Click "Accept All" — Expected: banner disappears and does not reappear on page refresh.
Open DevTools → Application → Cookies → check `frasco_consent` cookie exists with JSON value.

- [ ] **Step 5: Commit**

```bash
git add components/providers/CookieConsentProvider.tsx components/ui/CookieBanner.tsx app/layout.tsx
git commit -m "feat: add GDPR-style cookie consent banner with Essential/Analytics/Marketing categories"
```

---

## Task 11: Final Build Verification

- [ ] **Step 1: Run production build**

```bash
npm run build
```
Expected: Build completes with no TypeScript errors and no build failures. You may see warnings about missing `GOOGLE_SCRIPT_URL` — that is expected until the user deploys their Apps Script.

- [ ] **Step 2: Verify all routes in dev**

Run: `npm run dev` and check each of these URLs returns the expected content:
- http://localhost:3000 — home page with cookie banner on first visit
- http://localhost:3000/robots.txt — robots.txt with sitemap pointer
- http://localhost:3000/sitemap.xml — XML sitemap with 7 URLs
- http://localhost:3000/manifest.webmanifest — JSON manifest
- http://localhost:3000/this-does-not-exist — branded 404 page
- http://localhost:3000/contact — contact form (submit to see success state)

- [ ] **Step 3: Final commit**

```bash
git add .env.local.example
git commit -m "chore: add env.local.example with GOOGLE_SCRIPT_URL placeholder"
```

---

## Post-Implementation: User Action Required

After implementation is complete, the user must:

1. **Deploy the Google Apps Script:**
   - Open https://script.google.com
   - Create a new project, paste the script from Task 7
   - Change `recipient` to the real Frasco email address
   - Click Deploy → New Deployment → Web App
   - Set "Execute as: Me" and "Who has access: Anyone"
   - Copy the Web App URL

2. **Set the environment variable:**
   - Paste the URL into `.env.local` as `GOOGLE_SCRIPT_URL=<your_url>`
   - For production (Vercel/Netlify/etc.), add `GOOGLE_SCRIPT_URL` in the hosting dashboard's environment variables section

3. **Test a real form submission** after setting the URL.
