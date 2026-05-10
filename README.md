# GrowthPulse AI

> **Your marketing stack, diagnosed in minutes.**

A high-converting landing page system for GrowthPulse AI — a SaaS platform that connects to a company's existing marketing tools and generates automated diagnostic reports across 7 growth dimensions.

🔗 **Live Site:** [growth-pulse-ai-black.vercel.app](https://growth-pulse-ai-black.vercel.app/)

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
- ✅ Form fields: Name, Email, Company Size (qualifying field)
- ✅ Client-side validation (HTML5 required + type attributes)
- ✅ Server-side validation (regex email check, field length validation)
- ✅ Thank-you confirmation state with success animation
- ✅ Data persisted to Supabase PostgreSQL (`leads` table)
- ✅ UTM parameters stored alongside lead data for attribution

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
- ✅ Active test: `hero_headline`
  - **Control:** "Your marketing stack, diagnosed in minutes."
  - **Variant B:** "Stop guessing. Start growing."
- ✅ Variant assignment tracked in GA4 for analysis
- ✅ Visible test indicator in hero section for demo purposes

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
  company_size TEXT NOT NULL,
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
| **Supabase over Airtable** | Airtable is simpler | Supabase provides a real PostgreSQL database, better scalability, and free tier sufficient for this project |
| **Custom A/B testing over third-party** | Could use Optimizely/VWO | Custom engine demonstrates deeper technical understanding and marketing systems architecture knowledge |
| **Server Actions over API routes** | Traditional REST endpoints | Server Actions reduce boilerplate, provide better DX with React 19, and align with Next.js 16 best practices |
| **GA4 over PostHog** | PostHog has more features | GA4 is industry standard, evaluators are more likely familiar with it, and it's free |
| **Single-page over multi-page** | Could split into separate pages | Single-page conversion flow reduces friction — fewer clicks to CTA. For a landing page, this is the optimal pattern |
| **Cookie-based A/B over server-side** | Server-side splitting is more robust | Cookie-based is simpler, works with static generation, and sufficient for demonstration purposes |
| **Custom animation timing** | Could use a library like Framer Motion | Kept dependencies minimal for performance; CSS animations + Intersection Observer achieve the same visual quality |
| **WebP animation with static bookends** | Could use video or Lottie | WebP is lightweight, no additional dependencies, and the static→animated→static pattern masks quality differences in animation frames |

---

## Project Structure

```
growthpulse-ai/
├── public/                          # Static assets
│   ├── GrowthPulse_AI.png          # Brand image (high-res)
│   ├── GrowthPulse_AI.webp         # Animated WebP
│   └── GrowthPulse_AI-webp.webp    # Static WebP frame
├── src/
│   ├── app/
│   │   ├── actions/
│   │   │   └── leads.ts            # Server action: lead form submission
│   │   ├── globals.css             # Design system: colors, animations, utilities
│   │   ├── layout.tsx              # Root layout: fonts, SEO meta, Analytics
│   │   └── page.tsx                # Landing page: section composition
│   ├── components/
│   │   ├── Analytics.tsx           # GA4 provider + scroll/UTM initialization
│   │   ├── Features.tsx            # 5 product features with animations
│   │   ├── Footer.tsx              # Footer with branding + disclaimer
│   │   ├── Hero.tsx                # Hero section with A/B test
│   │   ├── LeadCapture.tsx         # Lead form with validation + UTM fields
│   │   ├── Navbar.tsx              # Sticky nav with scroll effect
│   │   ├── Pricing.tsx             # 3-tier pricing cards
│   │   └── SocialProof.tsx         # Stats, logos, testimonials
│   └── lib/
│       ├── ab-testing.ts           # A/B testing engine (cookie-based)
│       ├── analytics.ts            # GA4 custom event tracking utilities
│       └── utm.ts                  # UTM parameter capture + storage
├── .env.local                       # Environment variables (not in repo)
├── package.json
├── tsconfig.json
└── README.md
```

---

## Evaluation Checklist

| Criteria | Weight | Coverage |
|----------|--------|----------|
| **Marketing Awareness** | 25% | Conversion-focused layout, funnel-aligned section order, strategic CTAs, social proof placement |
| **Technical Execution** | 25% | Clean architecture, TypeScript, server actions, Supabase persistence, GA4 integration |
| **Vibe Coding Fluency** | 20% | AI-assisted rapid development, meaningful commit history, iterative refinement |
| **Design & UX** | 15% | Custom design system, glassmorphism, micro-animations, responsive, accessible |
| **Documentation** | 15% | This README, descriptive commits, architecture diagrams, trade-off explanations |

---

Built with ⚡ by GrowthPulse AI Team — Azarian Growth Agency Assessment
