# FRASCO Industrial Inspections — FRONTEND_IMPLEMENTATION.md

> **Source:** 7 static HTML pages (no duplicates confirmed)  
> **Target:** Next.js 14 App Router · TypeScript · Tailwind CSS v3  
> **Approach:** Full UI + all interactivity first, mock data only, zero backend dependency  
> **Phase-gate rule:** Stop after each phase, report, wait for explicit "Yes, Proceed"

---

## Overview

Convert the FRASCO Industrial Inspections static HTML prototype (7 pages, one shared design system) into a production-grade Next.js application. The source prototype is a sharp, industrial B2B site for a Nova Scotia NDT inspection company — zero border-radius, JetBrains Mono eyebrows, Syne uppercase headings, Bricolage Grotesque display numerics, orange `#e8600c` as the sole interactive accent, amber `#f5b301` reserved for the Lifting Equipment discipline, and a heavy blueprint-grid motif throughout.

All custom CSS animations from the HTML prototype (`scan-card` sweep, `blueprint` grid overlay, ticker scroll, `sr-hidden`/`sr-visible` scroll-reveal, `anim-revL` clip-path reveal, `anim-line` width grow) must be faithfully reproduced as Tailwind `extend` utilities or `@layer components` rules in `globals.css`.

All Unsplash image URLs will be kept verbatim during frontend-only phase — no local assets needed.

---

## Design System Reference (from prototype audit)

### Color Tokens (`tailwind.config.ts`)
```
ink:    #111111   → primary dark / text
panel:  #1a1a1a   → dark card surface
surface:#222222   → elevated dark
orange: #e8600c   → primary accent (CTAs, active nav, hover states)
amber:  #f5b301   → Lifting Equipment secondary accent
paper:  #f5f5f5   → page background
soft:   #eeeeee   → section alternate background
lead:   #5a5a5a   → muted / secondary text
ghost:  #d8d8d8   → borders, dividers
```

### Font Families
```
display: 'Bricolage Grotesque'  → large stat numbers, hero callouts
label:   'Syne'                 → all headings, nav items, service titles (uppercase)
body:    'Inter Tight'          → all body copy
mono:    'JetBrains Mono'       → eyebrow labels, tags, phone numbers, tracking-widest
```
All four fonts loaded via `next/font/google` in `layout.tsx`.

### Shadow Tokens
```
orange: 0 16px 40px -10px rgba(232,96,12,.3)
heavy:  0 30px 70px -15px rgba(0,0,0,.5)
```

### Border Radius
**Zero throughout** — sharp, industrial aesthetic. No `rounded-*` classes anywhere.

### Blueprint Grid (shared overlay)
```css
background-image: linear-gradient(rgba(232,96,12,.07) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(232,96,12,.07) 1px, transparent 1px);
background-size: 52px 52px;
```
Applied as a Tailwind utility class `.blueprint` in `globals.css`.

---

## Project Structure

```
/frasco/
├── app/
│   ├── layout.tsx                 ← Root layout: fonts, metadata, Navbar + Footer wrappers
│   ├── globals.css                ← All custom animations, .blueprint, .scan-card, .ticker, .sr-hidden
│   ├── page.tsx                   ← Homepage (/)
│   ├── about/
│   │   └── page.tsx               ← About page
│   ├── contact/
│   │   └── page.tsx               ← Contact page
│   └── services/
│       ├── nde-ndt/
│       │   └── page.tsx           ← NDE/NDT service page
│       ├── tube-inspection/
│       │   └── page.tsx           ← Tube Inspection service page
│       ├── asset-integrity/
│       │   └── page.tsx           ← Asset Integrity service page
│       └── lifting-equipment/
│           └── page.tsx           ← Lifting Equipment service page
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx             ← Fixed dark navbar + Services dropdown + mobile toggle
│   │   ├── MobileMenu.tsx         ← Full-screen overlay mobile nav
│   │   └── Footer.tsx             ← 4-column footer
│   ├── ui/
│   │   ├── ScanCard.tsx           ← Wrapper with sweep hover effect
│   │   ├── ScrollReveal.tsx       ← [data-sr] IntersectionObserver client component
│   │   ├── PageHero.tsx           ← Shared 65vh hero for inner pages
│   │   ├── CtaSection.tsx         ← Shared orange CTA band
│   │   ├── ServiceBadge.tsx       ← Eyebrow label pill (orange bg, mono text)
│   │   └── BlueprintSection.tsx   ← Section wrapper with blueprint grid bg
│   └── sections/
│       ├── home/
│       │   ├── HeroSection.tsx
│       │   ├── ServicesGrid.tsx
│       │   ├── StatCounters.tsx
│       │   ├── ProcessSteps.tsx
│       │   ├── IndustriesScroll.tsx
│       │   └── CtaStack.tsx
│       ├── about/
│       │   ├── MissionSection.tsx
│       │   ├── CertificationsGrid.tsx
│       │   ├── IndustriesGrid.tsx
│       │   └── ServiceAreaGrid.tsx
│       ├── services/
│       │   ├── ServiceIntroSection.tsx   ← Shared intro layout (text + stat grid)
│       │   ├── MethodsGrid.tsx           ← Generic n-item service card grid
│       │   ├── DarkFeatureSection.tsx    ← Dark bg feature with bullet list
│       │   └── ServiceProcessSteps.tsx   ← 4-step how-it-works (Tube page)
│       └── contact/
│           ├── ContactInfoPanel.tsx
│           └── ContactForm.tsx
├── lib/
│   └── data/
│       ├── services.ts            ← All service page mock data (methods, types, bullets)
│       ├── industries.ts          ← Industries scroll data
│       ├── stats.ts               ← Homepage stat counters
│       └── certifications.ts     ← Cert cards data
├── public/
│   └── (empty — using Unsplash URLs during frontend phase)
├── tailwind.config.ts
└── next.config.ts
```

---

## Route Map

| URL | Component | Source HTML |
|-----|-----------|-------------|
| `/` | `app/page.tsx` | `frasco-prototype-5.html` |
| `/about` | `app/about/page.tsx` | `about.html` |
| `/contact` | `app/contact/page.tsx` | `contact.html` |
| `/services/nde-ndt` | `app/services/nde-ndt/page.tsx` | `nde-ndt.html` |
| `/services/tube-inspection` | `app/services/tube-inspection/page.tsx` | `tube-inspection.html` |
| `/services/asset-integrity` | `app/services/asset-integrity/page.tsx` | `asset-integrity.html` |
| `/services/lifting-equipment` | `app/services/lifting-equipment/page.tsx` | `lifting-equipment.html` |

All nav `href` values from the prototype will be updated to these Next.js routes.

---

## Phase-by-Phase Execution Plan

---

### PHASE 1 — Project Bootstrap & Design System Foundation

**Goal:** Scaffold the Next.js project with full Tailwind config, all four Google fonts, `globals.css` animations, and verify the design system renders correctly on a blank page.

**Tasks:**
1. `npx create-next-app@latest frasco --typescript --tailwind --eslint --app --src-dir=no`
2. Install dependencies:
   - `tailwindcss` (already included)
   - No additional runtime deps needed for frontend-only phase
3. Configure `tailwind.config.ts`:
   - Extend `colors` with all 9 custom tokens (`ink`, `panel`, `surface`, `orange`, `amber`, `paper`, `soft`, `lead`, `ghost`)
   - Extend `fontFamily` with all 4 families (`display`, `label`, `body`, `mono`)
   - Extend `boxShadow` with `orange` and `heavy` tokens
   - Set `content` paths
4. Configure `globals.css`:
   - All `@keyframes`: `fadeIn`, `slideUp`, `scaleIn`, `revealL` (clip-path), `lineGrow`, `tick` (ticker), `sweep` (scan-card)
   - `.anim-fade`, `.anim-up`, `.anim-scale`, `.anim-revL`, `.anim-line` animation classes with all delay variants (`.d100` through `.d1000`)
   - `.sr-hidden` / `.sr-visible` scroll-reveal transition classes
   - `.ticker` (continuous `tick` animation, 22s linear infinite)
   - `.scan-card` with `::after` sweep pseudo-element
   - `.blueprint` background-image grid pattern
   - `.no-scroll` scrollbar-none utility
   - Custom scrollbar styling (6px, `#e8600c` thumb, `#111` track)
5. Load all 4 Google Fonts via `next/font/google` in `app/layout.tsx`, apply as CSS variables to `<html>`
6. Set `bg-paper text-ink font-body` on `<body>` in root layout
7. Create a temporary `/` page that renders a color swatch grid + type specimen to verify the token system visually

**Files Created:**
- `app/layout.tsx`
- `app/globals.css`
- `app/page.tsx` (temporary specimen)
- `tailwind.config.ts`
- `next.config.ts`

**Key Concepts:**
- `next/font/google` injects fonts with zero layout shift via CSS variables
- Tailwind `extend` (not `theme` replace) preserves all default utilities
- `globals.css` `@layer base` for custom scrollbar, `@layer utilities` for `.blueprint`, `@layer components` for `.scan-card`

---

### PHASE 2 — Navbar + MobileMenu + Footer (Shared Layout Shell)

**Goal:** Build the three layout components shared by all 7 pages, including the Services dropdown, mobile overlay, and footer — then wire them into `layout.tsx`.

**Tasks:**

**`components/layout/Navbar.tsx`** (Client Component — needs `useState` for mobile toggle):
- Fixed positioning, `z-50`, `bg-ink`, `border-b border-white/10`
- Left: FRASCO logo (orange `3px` bar accent + `font-label font-bold text-xl`)
- Center nav (hidden lg): Services dropdown + Process / Industries (anchor links on homepage) + About
  - Services dropdown: `group-hover:opacity-100` reveal, `w-72` white panel, 4 service links each with orange/amber dot indicator, "Ask us →" footer row
  - Nav links: `font-mono text-[11px] uppercase tracking-widest`
  - Active state: `text-orange` (determined by `usePathname()` from `next/navigation`)
- Right: phone link (hidden sm) + Request Inspection CTA button + mobile hamburger
- `'use client'` — needs `usePathname()` for active state and `useState` for mobile menu

**`components/layout/MobileMenu.tsx`** (Client Component):
- `fixed inset-0 bg-ink z-[100]` overlay
- `translate-x-full` when closed, `translate-x-0` when open — `transition-transform duration-500`
- FRASCO logo top left, X close button top right
- 6 nav links at `text-4xl font-display font-bold`, active link: `text-orange`
- Bottom: "24/7 Response" label + phone number
- Receives `isOpen` + `onClose` props from parent Navbar

**`components/layout/Footer.tsx`** (Server Component):
- `bg-ink text-white pt-16 pb-10`
- 4-column grid: FRASCO description (col-span-2) + Services links + Contact info
- Orange `3px` bar before FRASCO logo text
- Active service link: `text-orange` (determined by `usePathname()` - make Client if needed)
- Bottom row: copyright + About + Contact links

**`app/layout.tsx`** update:
- Import and render `<Navbar />` above `{children}` and `<Footer />` below
- `<main className="flex-grow">` wraps `{children}`
- `overflow-x-hidden min-h-screen flex flex-col` on root div

**Mock Data:** All nav links hardcoded in components (no external data file needed)

**Files Created/Modified:**
- `components/layout/Navbar.tsx`
- `components/layout/MobileMenu.tsx`
- `components/layout/Footer.tsx`
- `app/layout.tsx` (updated)

---

### PHASE 3 — Shared UI Primitives

**Goal:** Build all reusable UI building blocks used across multiple pages before building any full page.

**Components to build:**

**`components/ui/ScrollReveal.tsx`** (Client Component):
- Wraps children in a `div` with `sr-hidden` class
- Uses `useEffect` + `IntersectionObserver` (threshold: 0.1) to add `sr-visible` class when element enters viewport
- Accepts optional `delay` prop (applied as inline `style` on the observer callback timeout)
- Used to wrap any section element that needs scroll-triggered fade-up

**`components/ui/ScanCard.tsx`**:
- A `div` wrapper that applies the `.scan-card` class (sweep effect from `globals.css`)
- Accepts `className` prop for additional Tailwind classes
- All service method cards across NDE/NDT, Asset Integrity, Lifting Equipment, and Tube Inspection pages use this

**`components/ui/PageHero.tsx`**:
- Shared inner page hero: `h-[65vh] min-h-[400px] relative overflow-hidden flex items-center`
- Background image (Unsplash URL) with `object-cover` + `anim-scale` animation
- `bg-ink/75` overlay + `.blueprint opacity-40` overlay
- Blueprint overlay renders as a separate absolute div
- Slot props: `imageUrl`, `tag` (eyebrow mono text), `accentColor` (`orange` | `amber`), `title` (two-line), `subtitle`, `backHref`
- Back link: "← Back to Home" using Next.js `<Link>`
- Certification badge line at bottom left (absolute positioned, optional prop)

**`components/ui/CtaSection.tsx`**:
- Shared `py-20 bg-orange` CTA band used on all inner pages
- Props: `heading`, `body`, `primaryLabel`, `primaryHref`, `secondaryLabel`, `secondaryHref`
- Two-button layout (white button + dark button)

**`components/ui/ServiceBadge.tsx`**:
- Small `bg-orange text-white font-mono text-[10px] uppercase tracking-widest px-2 py-0.5` eyebrow pill
- Used as section labels ("Inspection Capabilities", "Inspection Workflow", etc.)

**`components/ui/BlueprintSection.tsx`**:
- Section wrapper that applies `relative` + `.blueprint` child div overlay
- Used for Process section (homepage), Certifications section (about), hero overlays

**Files Created:**
- `components/ui/ScrollReveal.tsx`
- `components/ui/ScanCard.tsx`
- `components/ui/PageHero.tsx`
- `components/ui/CtaSection.tsx`
- `components/ui/ServiceBadge.tsx`
- `components/ui/BlueprintSection.tsx`

---

### PHASE 4 — Mock Data Layer

**Goal:** Define all typed mock data that pages will consume — service methods, stats, industries, certifications. No API calls.

**`lib/data/services.ts`:**
```ts
// Types
type ServiceMethod = {
  id: number;
  label: string;        // "01 / Core Service"
  title: string;        // "NDE / NDT"
  description: string;
  href: string;
  imageUrl: string;
  accent: 'orange' | 'amber';
  featured?: boolean;   // true = 2-col span on homepage grid
}

type MethodCard = {
  id: number;
  number: string;       // "01"
  title: string;
  description: string;
  iconVariant: 'orange' | 'ink' | 'amber'; // bg color of icon container
  isDark?: boolean;     // last card uses bg-ink
}
```

Exports:
- `homepageServices: ServiceMethod[]` — 4 service cards for homepage grid (NDE spans 2 cols)
- `ndeMethods: MethodCard[]` — 9 NDE/NDT method cards
- `tubeEquipmentTypes: MethodCard[]` — 7 tube inspection equipment types
- `assetServices: MethodCard[]` — 9 asset integrity service cards
- `liftingTypes: MethodCard[]` — 6 lifting equipment categories

**`lib/data/industries.ts`:**
```ts
type Industry = {
  id: number;
  name: string;
  imageUrl: string;
}
// 6 industries for homepage horizontal scroll
// 12 industries for about page grid
```

**`lib/data/stats.ts`:**
```ts
type StatItem = {
  value: string;        // "24/7", "9", "3", "13+", "Same\nDay"
  label: string;
  barColor: 'orange' | 'ink' | 'amber';
}
// 5 stats for homepage stat bar
```

**`lib/data/certifications.ts`:**
```ts
type Certification = {
  id: number;
  title: string;        // "CAN/CGSB-48.9712"
  description: string;
  iconPath: string;     // SVG path data
}
// 3 certifications for about page
```

**`lib/data/contact.ts`:**
```ts
// Contact page mock: form success state, service dropdown options
type ServiceOption = { value: string; label: string }
const serviceOptions: ServiceOption[] = [...]
```

**Files Created:**
- `lib/data/services.ts`
- `lib/data/industries.ts`
- `lib/data/stats.ts`
- `lib/data/certifications.ts`
- `lib/data/contact.ts`

---

### PHASE 5 — Homepage (`/`)

**Goal:** Build the full homepage with all 6 sections, matching the prototype exactly including the ticker, blueprint overlay, CTA stack animation, and industry scroll with arrow navigation.

**Sections to implement (in order):**

**`HeroSection`** (Client Component for ticker animation):
- `min-h-screen flex flex-col relative overflow-hidden`
- Background Unsplash image with `anim-scale d200` + `bg-ink/65 anim-fade d300` overlay + `.blueprint opacity-50`
- Top-right status badge: `w-2 h-2 rounded-full bg-orange animate-pulse` + "24/7 Available · Dartmouth, NS"
- White hero card: `bg-white/95 backdrop-blur-lg border-l-4 border-orange p-8 md:p-12 max-w-[680px]`
  - Eyebrow: 10px line + mono label
  - `<h1>` in `font-label text-3xl sm:text-4xl md:text-[54px]`: "THE STANDARD OF INDUSTRIAL PRECISION" with orange `bg-orange text-white px-2` highlight on "PRECISION" + `anim-revL` clip-path animation
  - Full-width `h-[1px] bg-ghost anim-line` divider
  - Two-col bottom: body text + "View Capabilities" CTA button
  - Credentials ticker bar: `overflow-hidden w-full h-7` wrapper + `.ticker` div with 2× repeated spans of certification labels + orange/amber dots

**`ServicesGrid`** (Server Component):
- `py-24 px-6 bg-white`
- Header: eyebrow + h3 "Four Disciplines. One Certified Standard."
- `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0` grid
- **NDE/NDT card**: `sm:col-span-2 group relative overflow-hidden border border-ghost` — `aspect-[2/1]` image with grayscale→color on hover, gradient overlay, bottom text slot
- **3 single cards**: `aspect-square`, same pattern
- **24/7 Emergency card**: `bg-orange` → `bg-ink` on hover, centered "24/7" + CTA button
- All cards wrapped in `<Link>` from `next/link`
- Scroll reveal on section header and each card

**`StatCounters`** (Server Component):
- `py-20 bg-white border-y border-ghost`
- `grid grid-cols-2 lg:grid-cols-5 gap-y-14 gap-x-8`
- Each stat: `.stat-item flex flex-col` → `.stat-bar` (3px height, orange/ink/amber bg) that expands `width: 100%` on hover via CSS
- Render from `stats` mock data

**`ProcessSteps`** (Server Component + ScrollReveal):
- `py-24 px-6 bg-soft relative blueprint`
- Eyebrow + h3 "From Scope to Signed Report"
- `grid grid-cols-1 md:grid-cols-4 gap-6`
- Steps 01–03: `bg-white p-8 border border-ghost` with `text-[100px]` ghost number (absolute positioned), hover: `-translate-y-2 shadow-2xl`
- Step 04: `bg-ink p-8` dark variant, orange heading

**`IndustriesScroll`** (Client Component — needs `useRef` for scroll control):
- `py-24 bg-ink overflow-hidden`
- Left column (lg:max-w-sm): eyebrow + h2 + body + CTA button (all `data-sr` scroll reveal)
- Right column: `overflow-x-auto pb-10 no-scroll scroll-smooth` wrapper with `ref`
  - `flex gap-5 min-w-max` inner row
  - 6 industry cards: `h-[380px] w-[240px] shrink-0 relative overflow-hidden group`
  - Grayscale image → full color on group hover, overlay darkens→lightens on hover
  - Large italic number `text-[80px] text-orange opacity-10` bottom-right
- Arrow nav buttons below (L arrow: `border-white/15`, R arrow: `bg-orange`)
- `scrollBy({ left: ±280, behavior: 'smooth' })` on click

**`CtaStack`** (Client Component — needs IntersectionObserver for stacked card reveal):
- `py-24 px-6 bg-orange`
- Left: stacked card animation — 4 `[data-layer]` divs, `IntersectionObserver` triggers `translate(offset)` reveal
  - Layer 0 (front): `bg-white p-10 md:p-14` with ECG icon, headline, phone, address, CTA
  - Layers 1–3: offset behind with `translate(x,y)` CSS transforms
- Right: h2 + body text + certifications grid (3 cols) + "Learn About Frasco" button

**Files Created:**
- `app/page.tsx`
- `components/sections/home/HeroSection.tsx`
- `components/sections/home/ServicesGrid.tsx`
- `components/sections/home/StatCounters.tsx`
- `components/sections/home/ProcessSteps.tsx`
- `components/sections/home/IndustriesScroll.tsx`
- `components/sections/home/CtaStack.tsx`

---

### PHASE 6 — About Page (`/about`)

**Goal:** Build the full About page — 5 sections + hero.

**Sections:**

**`PageHero`** (reuse shared component):
- imageUrl: mining Unsplash photo
- tag: "Dartmouth, Nova Scotia"
- title: "About / Frasco" (second word muted)
- subtitle: mission sentence

**`MissionSection`** (Server Component):
- `py-24 bg-white`
- Left 3/5: eyebrow + h3 "Increasing Reliability, Productivity & Safety" + 3 paragraphs
- Right 2/5: 3 info cards — headquarters (bg-ink, border-l-4 orange), contact info (bg-soft), 24/7 availability (bg-orange)

**`CertificationsGrid`** (Server Component):
- `py-24 bg-soft relative blueprint`
- Center header + 3-column cert cards from `certifications` mock data
- Each card: white bg, centered icon, title, description, hover border-orange

**`IndustriesGrid`** (Server Component):
- `py-24 bg-ink`
- Left 2/5: eyebrow + h2 + body + CTA button
- Right 3/5: `grid grid-cols-2 sm:grid-cols-3 gap-3` with 12 industry tiles
- Tile: `bg-white/5 border border-white/10 p-5` + orange/amber dot + white label
- First 9 use orange dot, last 3 use amber dot (Maintenance, Environmental, Crane)

**`ServiceAreaGrid`** (Server Component):
- `py-20 bg-white border-t border-ghost`
- Left 1/2: eyebrow + h3 "Local Reach. International Capability." + 6 location items (2-col grid)
- Right 1/2: 2×2 stat blocks (4+, 24/7, 3, 13+)

**Bottom CTA:** reuse `<CtaSection>` with "Ready to Work with Frasco?" copy

**Files Created:**
- `app/about/page.tsx`
- `components/sections/about/MissionSection.tsx`
- `components/sections/about/CertificationsGrid.tsx`
- `components/sections/about/IndustriesGrid.tsx`
- `components/sections/about/ServiceAreaGrid.tsx`

---

### PHASE 7 — NDE/NDT Service Page (`/services/nde-ndt`)

**Goal:** Build the NDE/NDT page — 9 method cards, featured ECT section, certifications row.

**Sections:**

**`PageHero`** (shared):
- Tag: "Non-Destructive Evaluation"
- Title: "NDE / NDT / Services"
- Cert badge line at bottom: "CAN/CGSB-48.9712 Certified · Level II & III Technicians"

**`ServiceIntroSection`** (shared, reusable):
- Left 1/2: h2 + 2 paragraphs
- Right 1/2: stat blocks in grid — `bg-orange` (9 Methods), `bg-ink` (24/7), `bg-soft border` (0 Coating Removal), + `bg-panel text-white border-l-4 border-orange` certifications span

**`MethodsGrid`** (shared, receives `ndeMethods` data):
- `py-24 bg-soft`
- Eyebrow + h3 "Nine Certified NDE / NDT Methods"
- `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5`
- Each item: `ScanCard` wrapper → `bg-white border border-ghost p-8` → icon div + number + title + description
- Card 09 (Remote Visual): `bg-ink` dark variant, orange title
- All items from `ndeMethods` mock data

**`DarkFeatureSection`** (shared, reusable):
- `py-24 bg-ink relative overflow-hidden` with `.blueprint opacity-30`
- Left: eyebrow + h2 "Eddy Current Testing — The Gold Standard" + 2 paragraphs + 5 bullet list + CTA button
- Right: 2×2 stat grid (±0.1mm, Live, 0, L II+III)

**Certifications row** (inline on page — not a shared component):
- `py-20 bg-white border-t border-ghost`
- 3-column cert cards (same cards as About page, can reuse `CertificationsGrid`)

**Bottom CTA:** `<CtaSection>` "Ready to Book an NDT Inspection?"

**Files Created:**
- `app/services/nde-ndt/page.tsx`
- `components/sections/services/ServiceIntroSection.tsx`
- `components/sections/services/MethodsGrid.tsx`
- `components/sections/services/DarkFeatureSection.tsx`

---

### PHASE 8 — Tube Inspection Service Page (`/services/tube-inspection`)

**Goal:** Build the Tube Inspection page — 7 equipment type cards + ECT feature + 4-step process.

**Sections:**

**`PageHero`** (shared):
- Tag: "Preventative Inspection"
- Title: "Tube / Inspection"
- Badge: "Eddy Current Technology · All Tube Materials · Portable Equipment"

**`ServiceIntroSection`** (shared, reused with `tubeEquipmentTypes` stat blocks):
- Left: h2 "Know What's Inside Your Tubes Before It Fails" + 2 paragraphs
- Right: 2×2 stat blocks (7 Equipment Types, ECT Primary Method) + `border-l-4 border-orange` "Why Tube Inspection?" callout

**`MethodsGrid`** (shared, receives `tubeEquipmentTypes` data):
- `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5`
- Each card shows large `text-[80px]` number in orange (opacity-20) instead of icon box — different from NDE grid
- Card 07 (Boilers): `bg-ink` dark variant, `sm:col-span-2 lg:col-span-1` responsive spans

**`DarkFeatureSection`** (shared, reused — "ECT Primary Technology"):
- Right side: 2-slot grid (ECT/NFT colored blocks) + deliverables list panel

**`ServiceProcessSteps`** (tube-page exclusive):
- `py-20 bg-white`
- h3 "How a Tube Inspection Works"
- 4-column grid: steps 1–3 `bg-soft border border-ghost p-8 text-center`, step 4 `bg-ink` dark

**Bottom CTA:** "Don't Wait for a Leak to Find Out"

**Files Created:**
- `app/services/tube-inspection/page.tsx`
- `components/sections/services/ServiceProcessSteps.tsx`

---

### PHASE 9 — Asset Integrity Service Page (`/services/asset-integrity`)

**Goal:** Build the Asset Integrity page — 9 service cards, dark turnaround feature.

**Sections:**

**`PageHero`** (shared):
- Tag: "QA · QC · Compliance"
- Title: "Asset / Integrity"
- Badge: "API 510 · 570 · 653 · CWB CSA W178.2 Certified"

**`ServiceIntroSection`** (shared):
- Left: h2 "Keeping Your Production Online and Safe" + 2 paragraphs
- Right: `bg-orange` (9 Service Areas), `bg-ink` (API CWB codes) + callout

**`MethodsGrid`** (shared, receives `assetServices` data):
- 9 cards in `lg:grid-cols-3` — same scan-card pattern as NDE page
- Card 09 (Turnaround): `bg-ink` dark, orange title
- Cards alternate icon colors (orange, ink, amber)

**`DarkFeatureSection`** (shared — "Turnaround Inspection — Zero Surprises"):
- Left: h2 + 2 paragraphs + 5 bullets + "Plan Your Turnaround →" CTA
- Right: 2×2 stat grid (API, CWB/orange, 24/7, Same Day)

**Bottom CTA:** "Protect Your Assets. Stay Compliant."

**Files Created:**
- `app/services/asset-integrity/page.tsx`

---

### PHASE 10 — Lifting Equipment Service Page (`/services/lifting-equipment`)

**Goal:** Build the Lifting Equipment page — amber accent variant, 6 equipment type cards.

**Note:** This is the only page that uses amber `#f5b301` as the accent color throughout instead of orange. The `PageHero` accent prop = `amber`, scan-card sweep uses amber gradient, CTA section uses `bg-amber`, bullet dots are amber.

**Sections:**

**`PageHero`** (shared, `accentColor="amber"`):
- Tag: "Certification & Compliance"
- Title: "Lifting / Equipment"
- Badge: "Regulatory Compliant · Certified Inspectors · All Lifting Equipment"

**`ServiceIntroSection`** (shared, amber accent variant):
- Left: h2 "A Wide Variety Of Solutions For Every Situation" + 2 paragraphs
- Right: `bg-amber text-ink` (6 Equipment Types), `bg-ink` (CSA Compliant) + `border-l-4 border-amber` callout

**`MethodsGrid`** (shared, receives `liftingTypes` data, `accentColor="amber"`):
- 6 cards, all icon boxes use `bg-amber/20` with amber stroke
- Card 06 (Work Station Cranes): `bg-ink` dark, amber title

**`DarkFeatureSection`** (shared — amber bullets instead of orange):
- Left: h2 "Crane Inspection That Keeps Workers Safe" + amber `h-[1px] w-10 bg-amber` divider
- "Book Lifting Equipment Inspection →" CTA: `bg-amber text-ink hover:bg-orange hover:text-white`
- Right: 2×2 grid (amber top-left, white/5 others)

**`CtaSection`** (amber variant):
- `py-20 bg-amber`
- "Keep Your Lifts Certified & Safe"
- Primary: `bg-ink text-white hover:bg-orange`
- Secondary: `bg-white text-ink hover:bg-ink hover:text-white`

**Files Created:**
- `app/services/lifting-equipment/page.tsx`

---

### PHASE 11 — Contact Page (`/contact`)

**Goal:** Build the Contact page — info panel left, functional mock form right, quick links grid at bottom.

**Sections:**

**Hero Band** (inline, not `PageHero` component — this page uses a shorter `py-20` dark band, not 65vh):
- `bg-ink relative overflow-hidden py-20` + `.blueprint opacity-30`
- Back link + eyebrow + h1 "Request an Inspection." + subtitle

**`ContactInfoPanel`** (Client Component for phone link behavior):
- `bg-ink text-white p-8 border-l-4 border-orange` — phone number block (icon + label + linked number)
- Fax block
- Email block
- `bg-soft border border-ghost p-8` — address + service area
- `bg-orange text-white p-8` — 24/7 emergency block + "Call Now" CTA

**`ContactForm`** (Client Component):
- `useForm` pattern with React `useState` for all field values and `formSubmitted` boolean
- Fields: Name*, Company, Email*, Phone, Service (select), Location, Message*, Urgent (checkbox)
- On submit (mock): set `formSubmitted = true`, swap form for success state
- Success state: orange checkmark icon + "Request Received" + thank you text
- `focus:border-orange focus:ring-orange/12` focus styles
- **No actual email sending** — frontend mock only
- Input style: `border border-ghost px-4 py-3 font-body text-sm`, no border-radius
- Validation: HTML5 `required` attributes only for frontend phase

**Quick Links grid** (4 service cards):
- `py-20 bg-soft border-t border-ghost`
- `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4`
- Each: white card, orange/amber dot icon, bold title, description text
- NDE/NDT, Tube, Asset: `hover:border-orange`; Lifting: `hover:border-amber`

**Files Created:**
- `app/contact/page.tsx`
- `components/sections/contact/ContactInfoPanel.tsx`
- `components/sections/contact/ContactForm.tsx`

---

### PHASE 12 — Polish, Responsiveness & Animation Audit

**Goal:** Full cross-page polish pass — verify every animation, all responsive breakpoints (mobile/tablet/desktop), active nav states, and hover interactions match the prototype exactly.

**Checklist:**

**Animations:**
- [ ] Hero `anim-scale` image entrance on `/`
- [ ] Hero card `anim-up d700` on `/`  
- [ ] "PRECISION" text `anim-revL` clip-path reveal on `/`
- [ ] `anim-line` width-grow divider on `/`
- [ ] Ticker `tick` 22s infinite loop on `/`
- [ ] `scan-card::after` sweep on all service cards (all service pages)
- [ ] `[data-sr]` scroll-reveal on all sections across all 7 pages
- [ ] `sr-delay` stagger (150ms, 300ms, 450ms) on process steps and cert cards
- [ ] Industries scroll card grayscale→color, overlay darken→lighten on hover
- [ ] `CtaStack` layer offset animation on scroll-into-view
- [ ] `stat-bar` width expand on `.stat-item:hover`
- [ ] Service card `-translate-y-1 shadow-xl` on hover
- [ ] Page hero `anim-scale` on all inner pages

**Responsive breakpoints:**
- [ ] Navbar: hidden nav links on mobile → hamburger → full-screen overlay
- [ ] Hero card: `max-w-[680px]` card left-aligned on desktop, full-width on mobile
- [ ] Services grid: 1 col → 2 col → 3 col (NDE spans 2 at sm+)
- [ ] Stats: 2 col → 5 col at lg
- [ ] Process steps: 1 col → 4 col at md
- [ ] Industries scroll: horizontal scroll on mobile, natural on lg
- [ ] CTA Stack: stacked vertically on mobile
- [ ] Method grids: 1 → 2 → 3 col, tube: + xl:4-col
- [ ] About industries: 2 → 3 col
- [ ] Contact: single col → left/right split at lg

**Active states:**
- [ ] Current page nav item = `text-orange`
- [ ] Current service in dropdown = `bg-soft` background + orange title
- [ ] Current service in footer links = `text-orange`
- [ ] Mobile menu current page = `text-orange`

**Files Modified:**
- All component files (targeted tweaks only)
- `globals.css` (any missing utilities discovered during audit)

---

## Mock Data Inventory

All images reference Unsplash URLs from the prototype directly. No `<Image>` optimization domain config needed during frontend phase — use standard `<img>` tags with the same `src` as prototype, or configure `next.config.ts` with `images.remotePatterns` for `images.unsplash.com` to enable `next/image`.

### Image URLs (from prototype, all kept as-is)

| Usage | URL |
|-------|-----|
| Homepage hero | `photo-1581092160562-40aa08e78837` |
| NDE/NDT hero | `photo-1581092918056-0c4c3acd3789` |
| NDE service card | `photo-1581092918056-0c4c3acd3789` |
| Tube hero | `photo-1565043666747-69f6646db940` |
| Asset hero | `photo-1518709268805-4e9042af9f23` |
| Lifting hero | `photo-1504917595217-d4dc5ebe6122` |
| About hero | `photo-1567789884554-0b844b597180` |
| Industry: Energy | `photo-1581091226825-a6a2a5aee158` |
| Industry: Refining | `photo-1518709268805-4e9042af9f23` |
| Industry: Power | `photo-1565043666747-69f6646db940` |
| Industry: Marine | `photo-1504917595217-d4dc5ebe6122` |
| Industry: Mining | `photo-1567789884554-0b844b597180` |
| Industry: Construction | `photo-1581092160562-40aa08e78837` |

---

## Technical Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| Router | App Router (Next.js 14) | Modern, server components by default |
| Styling | Tailwind CSS v3 | Matches prototype toolchain |
| Server vs Client | Default server, `'use client'` only where state/effects needed | Performance |
| Font loading | `next/font/google` | Zero layout shift, self-hosted automatically |
| Images | `<img>` tags in Phase 1–11, migrate to `next/image` in Phase 12 | Simplest path first |
| Animations | CSS in `globals.css` @keyframes + Tailwind classes | Exact match to prototype |
| Scroll reveal | Custom `ScrollReveal.tsx` Client Component | No lib dependency |
| Form | React `useState` mock | No backend dependency |
| Nav active state | `usePathname()` from `next/navigation` | App Router standard |
| No external UI libs | Pure Tailwind | Design system already fully defined |

---

## Dependency List (Frontend Phase Only)

```json
{
  "dependencies": {
    "next": "^14.x",
    "react": "^18.x",
    "react-dom": "^18.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "@types/react": "^18.x",
    "@types/node": "^20.x",
    "tailwindcss": "^3.x",
    "autoprefixer": "^10.x",
    "postcss": "^8.x",
    "eslint": "^8.x",
    "eslint-config-next": "^14.x"
  }
}
```

**Zero additional runtime dependencies.** No animation library, no form library, no icon library — all icons are inline SVGs transcribed from the prototype.

---

## Phase Summary Table

| Phase | What Gets Built | New Files | Complexity |
|-------|-----------------|-----------|------------|
| 1 | Project scaffold, Tailwind config, globals.css, fonts | 5 | Medium |
| 2 | Navbar + MobileMenu + Footer | 4 | High |
| 3 | Shared UI primitives (6 components) | 6 | Medium |
| 4 | Mock data layer (5 data files) | 5 | Low |
| 5 | Homepage (6 section components) | 8 | High |
| 6 | About page (4 section components) | 6 | Medium |
| 7 | NDE/NDT page (3 new section components) | 5 | Medium |
| 8 | Tube Inspection page (1 new section component) | 3 | Low-Medium |
| 9 | Asset Integrity page (0 new section components) | 2 | Low |
| 10 | Lifting Equipment page (amber variant) | 2 | Low-Medium |
| 11 | Contact page (2 section components, form logic) | 4 | Medium |
| 12 | Polish + animation audit + responsive QA | 0 new | High |

**Total files: ~50 across 12 phases**

---

*Generated from design audit of 7 FRASCO HTML prototype files. Zero duplicates detected. Backend implementation plan will be generated separately upon approval.*
