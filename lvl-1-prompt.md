LEVEL 1 — Cinematic Camera + Laptop Motion

# Goal

Upgrade the existing portfolio without changing layout or content.

Current architecture already has:
- Left content card.
- Right laptop.
- ScrollTrigger sections.
- Screen content changes.

Keep everything.

Add cinematic camera and laptop motion.

# Stack

React
TypeScript
GSAP
ScrollTrigger
Lenis

No Three.js yet.

# Requirements

Laptop must remain sticky.

Each section has its own timeline.

Hero:
- Laptop closed.
- Slowly opens while entering.

Journey:
- Slight rotateY(8deg).
- TranslateX(50px).

Experience:
- Camera zoom in.
- Scale laptop 1 → 1.1.

Projects:
- RotateY(-10deg).
- Move upward.

Skills:
- Side angle.
- rotateX(4deg).

Metrics:
- Top perspective.

Vision:
- Slight zoom out.

Contact:
- Laptop closes.
- Brightness decreases.

# Motion

Use GSAP timelines.

Scrub true.

ease none.

Motion must feel like Apple keynote.

No abrupt transitions.

# Effects

Add:
- subtle reflection
- screen glow
- shadow intensity changes
- breathing ambient light

Use transform3d only.

No layout shift.

Target 60fps.

Preserve responsiveness.