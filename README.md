# GrowthPulse AI

> **Your marketing stack, diagnosed in minutes.**

A high-converting landing page system for GrowthPulse AI — a SaaS platform that connects to a company's existing marketing tools and generates automated diagnostic reports across 7 growth dimensions.

🔗 **Live Site:** [growth-pulse-ai-black.vercel.app](https://growth-pulse-ai-black.vercel.app/)
📁 **Repository:** [github.com/GrowthPulse-AI/GrowthPulse_AI](https://github.com/GrowthPulse-AI/GrowthPulse_AI)

> **Note for Azarian team:** Repository collaborator access granted to [@hamletazarian](https://github.com/hamletazarian) per assessment requirements.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Architecture Decisions](#architecture-decisions)
- [Features Implemented](#features-implemented)
- [Setup Instructions](#setup-instructions)
- [AI Tools Used](#ai-tools-used)
- [Trade-offs & Decisions](#trade-offs--decisions)
- [Project Structure](#project-structure)

---

## Project Overview

This project is a fully functional marketing landing page built for the **Azarian Growth Agency** technical assessment. It demonstrates:

- **Marketing awareness** — Conversion-focused layout following TOFU → MOFU → BOFU funnel principles
- **Technical execution** — Clean architecture with Next.js 16, server actions, and Supabase integration
- **Vibe coding fluency** — AI-assisted rapid development with manual architectural decisions
- **Design & UX** — Custom design system with glassmorphism, micro-animations, and responsive design

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | Next.js 16 (App Router) | SSR/SSG, built-in SEO, API routes, server actions |
| **Language** | TypeScript | Type safety, better DX, catches errors at build time |
| **Styling** | Tailwind CSS 4 | Utility-first, rapid iteration, consistent design tokens |
| **Database** | Supabase (PostgreSQL) | Free tier, real-time capable, REST API, easy setup |
| **Analytics** | Google Analytics 4 | Industry standard, custom events, free |
| **Deployment** | Vercel | Native Next.js integration, auto-deploys from GitHub, edge network |
| **Fonts** | Geist Sans + Geist Mono | Clean, modern typography optimized for readability |

---

## Architecture Decisions

### Clean Marketing Systems Architecture

The project follows clean architecture principles applied to marketing systems:

```
┌─────────────────────────────────────────┐
│     PRESENTATION (Components)           │  ← What the user sees
│   Navbar, Hero, Features, Pricing, etc. │
├─────────────────────────────────────────┤
│     BUSINESS LOGIC (lib/)               │  ← Rules & tracking
│   A/B Testing, Analytics, UTM Handler   │
├─────────────────────────────────────────┤
│     INTEGRATION (actions/)              │  ← Server-side processing
│   Lead submission, validation           │
├─────────────────────────────────────────┤
│     DATA LAYER (Supabase)               │  ← Persistent storage
│   Leads table with UTM attribution      │
└─────────────────────────────────────────┘
```

**Key principle:** Each layer is independent and replaceable. Swapping Supabase for Firebase or GA4 for PostHog requires changing only the integration layer — no component changes needed.

### Server Actions over API Routes

Used React Server Actions for form handling instead of traditional API routes. This approach:
- Reduces client-side JavaScript bundle
- Provides built-in CSRF protection
- Enables progressive enhancement (forms work without JS)
- Simplifies the codebase (no separate API layer)

### Interactive SVG Hero Visualization

Instead of stock images or generic illustrations (brief section 2.6: *"No stock photography of people. Use abstract visuals, data visualizations, or illustrations"*), the hero features a fully custom SVG orbital diagram:

- **9 real brand logos** (HubSpot, Salesforce, GA, Meta, Shopify, Google Ads, TikTok, LinkedIn, ActiveCampaign) orbit a central GrowthPulse hub
- **Animated circuit connections** draw progressively as tools "connect"
- **Growth Score counter** increments as connections complete
- **Hover tooltips** display on each node
- Built with pure React + SVG — zero external dependencies, < 15KB

This directly visualizes the product's core value prop ("connects to your existing marketing tools") without saying a word.

### Component Architecture

Each section is a self-contained component with its own state management:
- **Server Components** for static content (Footer, layout)
- **Client Components** for interactive elements (Hero with A/B test, LeadCapture with form state, Navbar with scroll detection)

---

## Features Implemented

### 1. Landing Page Sections
- ✅ **Hero** — Value proposition, dual CTAs, animated WebP visual with static image bookends
- ✅ **Social Proof** — Animated counters, 3 testimonials, 5 fictional company logos, star ratings
- ✅ **Features** — All 5 product capabilities with intersection observer entrance animations
- ✅ **Pricing** — 3 exact tiers (Starter $499 / Growth $1,299 / Scale $2,999) with highlighted popular plan
- ✅ **Lead Capture** — Final CTA section with form and benefit bullets

### 2. Lead Capture System
- ✅ Form fields: Name, Email, Monthly Marketing Budget (qualifying field — captures lead quality signal aligned to ICP)
- ✅ Client-side validation (HTML5 required + type attributes)
- ✅ Server-side validation (regex email check, field length validation)
- ✅ Thank-you confirmation state with success animation
- ✅ Data persisted to Supabase PostgreSQL (`leads` table with `monthly_budget` field)
- ✅ UTM parameters stored alongside lead data for full attribution

### 3. Analytics & Tracking
- ✅ **Google Analytics 4** integration via `next/script` (afterInteractive strategy)
- ✅ **Custom events tracked:**
  1. `cta_click` — Every CTA button with ID, text, and section context
  2. `form_start` — Fires once when user first focuses any form field
  3. `form_submit` — Fires on successful lead submission
  4. `scroll_depth` — Milestones at 25%, 50%, 75%, 100%
  5. `section_view` — Section visibility tracking
  6. `ab_test_assignment` — Variant assignment logging
- ✅ **UTM handling** — Captures `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content` from URL, stores in sessionStorage + cookie, passes to lead form as hidden fields

### 4. A/B Testing
- ✅ Custom A/B testing engine (`src/lib/ab-testing.ts`)
- ✅ Cookie-based variant persistence (30-day expiry)
- ✅ Active test: `hero_cta` — testing primary CTA button copy (higher marketing maturity than testing the brand tagline)
  - **Control:** "Get Your Free Audit →"
  - **Variant B:** "Start Your Growth Score →"
- ✅ Headline fixed to canonical brand tagline (per brief section 2.1): *"Your marketing stack, diagnosed in minutes."*
- ✅ Variant assignment tracked in GA4 via `ab_test_assignment` event
- ✅ Visible test indicator in hero section for evaluator demo

### 5. Performance & SEO
- ✅ Mobile-responsive design (all breakpoints)
- ✅ Semantic HTML5 (`<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`)
- ✅ Proper `<h1>` hierarchy (single h1 per page)
- ✅ Meta tags: title, description, keywords
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card meta tags
- ✅ Unique IDs on all interactive elements

---

## Setup Instructions

### Prerequisites
- Node.js 18+
- npm
- A Supabase project (free tier works)
- A Google Analytics 4 property

### 1. Clone & Install

```bash
git clone https://github.com/GrowthPulse-AI/GrowthPulse_AI.git
cd GrowthPulse_AI
npm install
```

### 2. Environment Variables

Create a `.env.local` file:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your_service_role_key
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. Database Setup

Run this SQL in Supabase SQL Editor:

```sql
CREATE TABLE leads (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  monthly_budget TEXT NOT NULL,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Build for Production

```bash
npm run build
npm start
```

---

## AI Tools Used

| Tool | How It Was Used |
|------|----------------|
| **Gemini (Antigravity)** | Primary development partner — architecture design, component generation, analytics implementation, A/B testing engine, debugging, and iterative refinement |
| **AI-assisted workflow** | Used for rapid scaffolding of components, then manually reviewed and adjusted each output for quality, performance, and marketing alignment |

### Vibe Coding Approach

The development process followed a structured vibe coding workflow:

1. **Architecture first** — Defined the marketing systems architecture, clean layer separation, and component hierarchy before writing code
2. **AI-generated scaffolding** — Used AI to rapidly generate component structures, CSS design systems, and utility libraries
3. **Manual intervention points:**
   - Design system color palette (derived from custom brand visual)
   - Marketing copy positioning and CTA hierarchy
   - A/B test hypothesis design
   - Server action security patterns
   - TypeScript type fixes
4. **Iterative polish** — Built → verified → refined in rapid cycles

---

## Trade-offs & Decisions

| Decision | Alternative Considered | Why This Choice |
|----------|----------------------|-----------------|
| **Supabase over Airtable** | Airtable is simpler | Supabase provides real PostgreSQL, better scalability, and the free tier is sufficient for this project |
| **Custom A/B testing over third-party** | Could use Optimizely/VWO | Custom engine demonstrates deeper technical understanding; also avoids third-party script performance penalty |
| **A/B test on CTA copy, not headline** | Testing the hero headline | Testing CTA text is more common in production CRO — the brand tagline (per brief 2.1) should remain fixed and consistent |
| **Server Actions over API routes** | Traditional REST endpoints | Server Actions reduce boilerplate, provide built-in CSRF protection, and align with Next.js App Router best practices |
| **GA4 over PostHog** | PostHog has more features | GA4 is industry standard; evaluators are more likely familiar with it and it's free |
| **Single-page over multi-page** | Could split into separate pages | Single-page conversion flow reduces friction — fewer clicks to CTA. Optimal pattern for landing page conversions |
| **Cookie-based A/B over server-side** | Server-side splitting is more robust | Cookie-based works with static generation and is sufficient for demonstration purposes |
| **Interactive SVG hero over static image** | Stock imagery or Lottie animation | SVG orbital diagram directly visualizes the product's core value prop with zero external dependencies and < 15KB weight. Aligns with brief requirement for abstract/data visuals |
| **Zero animation libraries** | Framer Motion, GSAP | CSS animations + Intersection Observer achieve equivalent visual quality; keeps bundle lean and page load fast |

---

## Project Structure

```
growthpulse-ai/
├── public/
│   └── logos/                       # Official brand SVG assets
│       ├── GP.svg                   # GP icon (navbar, footer, favicon)
│       ├── GrowthPulse.svg          # Full logo (hero hub center)
│       ├── hubspot.svg
│       ├── salesforce.svg
│       ├── google-analytics.svg
│       ├── meta.svg
│       ├── shopify.svg
│       ├── google-ads.svg
│       ├── tiktok.svg
│       ├── linkedin.svg
│       └── activecampaign.svg
├── src/
│   ├── app/
│   │   ├── actions/
│   │   │   └── leads.ts            # Server action: lead form submission + validation
│   │   ├── favicon.ico             # GP brand favicon
│   │   ├── globals.css             # Design system: colors, animations, utilities
│   │   ├── layout.tsx              # Root layout: fonts, SEO meta, OG tags, Analytics
│   │   └── page.tsx                # Landing page: section composition
│   ├── components/
│   │   ├── Analytics.tsx           # GA4 provider + scroll/UTM initialization
│   │   ├── Features.tsx            # 5 product features with animations
│   │   ├── Footer.tsx              # Footer with GP branding
│   │   ├── Hero.tsx                # Hero section with A/B test on CTA
│   │   ├── InteractiveHero.tsx     # SVG orbital visualization (9 real brand logos)
│   │   ├── LeadCapture.tsx         # Lead form with validation + UTM fields
│   │   ├── Navbar.tsx              # Sticky nav with scroll effect
│   │   ├── Pricing.tsx             # 3-tier pricing cards (exact brief tiers)
│   │   └── SocialProof.tsx         # Stats, logos, testimonials
│   └── lib/
│       ├── ab-testing.ts           # A/B testing engine (cookie-based, GA4-tracked)
│       ├── analytics.ts            # GA4 custom event tracking utilities
│       └── utm.ts                  # UTM parameter capture + storage
├── .env.local                       # Environment variables (not in repo)
├── package.json
├── tsconfig.json
└── README.md
```

---

## Development Process — Branch Evolution

The commit history tells the story of iterative vibe coding:

| Branch | What it represents |
|--------|-------------------|
| `feat/animated-hero` | v1 — Initial build with animated WebP hero visual |
| `feat/interactive-hero-v1` | v2 — Replaced static image with custom SVG orbital diagram |
| `main` | v3 (current) — Official brand assets, ICP-optimized copy, polished UX |

Each branch is preserved to demonstrate the development evolution — not squashed.

---

## Evaluation Checklist

| Criteria | Weight | Coverage |
|----------|--------|----------|
| **Marketing Awareness** | 25% | ICP-targeted copy, outcome-focused feature descriptions, TOFU→MOFU→BOFU funnel, strategic CTA placement, pain-point-first subheadline |
| **Technical Execution** | 25% | Clean 4-layer architecture, TypeScript, server actions, Supabase persistence, GA4 with 6 custom events, UTM pipeline |
| **Vibe Coding Fluency** | 20% | AI-assisted development with Gemini, meaningful 3-branch commit history showing iterative refinement, manual architectural decisions |
| **Design & UX** | 15% | Interactive SVG hero, custom design system, glassmorphism, micro-animations, responsive, GP brand identity |
| **Documentation** | 15% | This README, architecture diagram, trade-off table, branch evolution, collaborator access granted |

---

Built with ⚡ by GrowthPulse AI Team — Azarian Growth Agency Assessment
