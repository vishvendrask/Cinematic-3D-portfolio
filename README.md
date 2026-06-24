# Vishvendra Singh Khangarot — Cinematic Portfolio

An interactive portfolio for **Vishvendra Singh Khangarot**, Senior Frontend Engineer based in Bangalore, India.

This version is aligned with the June 2026 resume: enterprise frontend work across IBM, Google, DBS Bank, Cencora, Globals ITES and Adverscribe, with a focus on React, TypeScript, Redux Toolkit, React Query, architecture and reusable UI systems.

## ✨ Highlights

- **Cinematic 3D experience** — React Three Fiber + Drei power the floating MacBook and scene-driven storytelling.
- **Resume-backed content** — the site content is mapped to roles, projects, skills and achievements from the PDF.
- **Motion system** — Framer Motion drives the transitions, reveals, counters, tilt cards and scroll-linked narrative.
- **Enterprise-focused data model** — experience, projects and capabilities are centralized in `lib/data.ts`.
- **Accessible and responsive** — respects reduced motion, uses semantic structure and keeps the layout mobile-first.

## Stack

Next.js (App Router) · TypeScript · TailwindCSS · Framer Motion · Lenis · React Three Fiber · Drei · Lucide Icons · Geist font.

## 🚀 Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production build:

```bash
npm run build
npm run start
```

## Project structure

```
app/
  layout.tsx            # Metadata, fonts, providers, chrome
  page.tsx              # Main route
  globals.css           # Tailwind layers and design tokens
components/
  layout/               # Navbar, Footer
  providers/            # Theme and scroll providers
  sections/             # Hero, About, Experience, Projects, Skills, Achievements, FutureVision, Contact
  experience/           # Cinematic scroll narrative and laptop screens
  three/                # Hero scene
  ui/                   # Shared motion and display components
hooks/                  # Shared hooks
lib/                    # constants, data, experience, utils
```

All content lives in `lib/data.ts`, `lib/constants.ts` and `lib/experience.ts`.

## 🎨 Customizing

- **Colors / tokens** — [tailwind.config.ts](tailwind.config.ts)
- **Copy and data** — [lib/data.ts](lib/data.ts), [lib/constants.ts](lib/constants.ts), [lib/experience.ts](lib/experience.ts)
- **3D scene** — [components/three/HeroSceneContent.tsx](components/three/HeroSceneContent.tsx)
