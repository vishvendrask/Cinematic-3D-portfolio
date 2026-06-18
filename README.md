# Vishvendra Singh Khangarot — Cinematic Portfolio

An Awwwards-caliber, cinematic portfolio for **Vishvendra Singh Khangarot**, Senior Frontend Engineer (Bangalore, India). Built as a premium interactive product experience — inspired by Apple, Linear, Vercel, Stripe, Framer and TinyPod.

## ✨ Highlights

- **Cinematic 3D hero** — React Three Fiber + Drei: distorting core geometry, orbiting wireframe rings and a pointer-parallax particle field.
- **Smooth scrolling** — Lenis synced with GSAP `ScrollTrigger`.
- **Motion everywhere** — Framer Motion text reveals, staggered entrances, parallax, magnetic buttons, 3D tilt cards, animated counters, blended mouse follower, ambient gradient blobs and film grain.
- **Glassmorphism design system** — `#050505` background, charcoal surfaces, electric-blue → purple accent gradients, off-white type.
- **Accessible & performant** — respects `prefers-reduced-motion`, semantic markup, SEO metadata, adaptive DPR for the 3D canvas, mobile-first responsive.

## 🧱 Stack

Next.js (App Router) · TypeScript · TailwindCSS · Framer Motion · GSAP + ScrollTrigger · Lenis · React Three Fiber · Drei · Lucide Icons · Geist font.

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

## 🗂 Architecture

```
app/
  layout.tsx            # Fonts, metadata, providers, chrome
  page.tsx              # Section composition
  globals.css           # Tailwind layers + design tokens
components/
  layout/               # Navbar, Footer
  providers/            # Lenis + GSAP smooth scroll
  sections/             # Hero, About, Experience, Projects, Skills,
                        # Achievements, FutureVision, Contact
  three/                # R3F hero scene + content
  ui/                   # MagneticButton, TiltCard, MouseFollower,
                        # TextReveal, AnimatedCounter, SectionHeading,
                        # AmbientGlow, GrainOverlay
hooks/                  # useMagnetic, useTilt, useMousePosition,
                        # usePrefersReducedMotion
lib/                    # constants, data (content), utils
```

All content lives in [lib/data.ts](lib/data.ts) and [lib/constants.ts](lib/constants.ts) — edit there to update experience, projects, skills, achievements, links and copy.

## 🎨 Customizing

- **Colors / tokens** — [tailwind.config.ts](tailwind.config.ts)
- **Copy & data** — [lib/data.ts](lib/data.ts), [lib/constants.ts](lib/constants.ts)
- **3D scene** — [components/three/HeroSceneContent.tsx](components/three/HeroSceneContent.tsx)

> Replace the placeholder email and social URLs in [lib/constants.ts](lib/constants.ts) with real ones before deploying.
