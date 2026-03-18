# Workspace

## Overview

npm workspaces monorepo using TypeScript. Contains a premium EventFlow event management website and supporting infrastructure.

## Stack

- **Monorepo tool**: npm workspaces
- **Node.js version**: 24
- **Package manager**: npm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server (backend)
│   ├── event-flow/         # EventFlow premium event website (frontend, react-vite)
│   └── mockup-sandbox/     # Design mockup sandbox
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## EventFlow Website (artifacts/event-flow)

Premium event management and showcase website. Pure frontend, no backend needed.

### Tech Stack
- React + Vite + TypeScript
- Tailwind CSS v4 with dark luxury theme
- GSAP (animations) + ScrollTrigger (scroll animations)
- @studio-freight/lenis (smooth scrolling)
- Lucide React (icons)

### Design System
- **Colors**: Deep obsidian (#080808) background, cream foreground (#f5f0eb), metallic gold accent (#c9a84c)
- **Fonts**: Playfair Display (headings/display), Inter (body/UI)
- **Style**: Ultra-premium dark luxury, Awwwards-level

### Components
- `Preloader` — animated counter 0-100% with split-open reveal
- `Cursor` — custom cursor with GSAP quickTo tracking
- `Navbar` — glassmorphism sticky nav with hide/show on scroll
- `Hero` — full-screen cinematic slider with split-text GSAP animations
- `Marquee` — dual-row infinite scrolling text ticker
- `FeaturedEvents` — asymmetric grid with parallax + hover effects
- `UpcomingEvents` — animated timeline of upcoming events
- `HorizontalCategories` — GSAP pin + horizontal scroll categories
- `Stats` — animated counting numbers on scroll
- `Process` — 4-step process cards with stagger animation
- `Services` — scroll-tied opacity reveal services list
- `Testimonials` — testimonial cards with stagger entrance
- `ContactCTA` — full-screen CTA with magnetic buttons
- `Footer` — dark footer with links

### Key Hooks
- `useLenis` — initializes Lenis smooth scroll, connects to GSAP ticker
- `use-events` — mock data hooks for hero slides, events, categories

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references.

- **Always typecheck from the root** — run `npm run typecheck`
- **`emitDeclarationOnly`** — only emit `.d.ts` files during typecheck

## Root Scripts

- `npm run build` — runs `typecheck` first, then recursively runs `build` in all packages
- `npm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/event-flow` (`@workspace/event-flow`)

EventFlow premium event management website. Served at `/` path.

- Entry: `src/main.tsx`
- App: `src/App.tsx` — wouter routing, react-query provider
- Pages: `src/pages/Home.tsx` — main home page
- `npm run --workspace @workspace/event-flow dev` — dev server on port 19111

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server (minimal, mostly for future backend needs).

- Entry: `src/index.ts` — reads `PORT`, starts Express
- `npm run --workspace @workspace/api-server dev` — dev server on port 8080

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL (not actively used by event-flow).
