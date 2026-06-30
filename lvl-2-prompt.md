LEVEL 2 — macOS Operating System Experience

# Goal

Transform screen contents into macOS-inspired applications.

Keep current laptop model.

Stack:
React
TypeScript
GSAP
Motion

No Three.js.

# Journey section

Replace current screen.

Create Finder app.

Folders:

Android Foundations
React Growth
Architecture
Leadership
Awards

Requirements:
- folder hover scale 1.05
- double click animation
- stagger entrance
- sidebar navigation

# Experience section

Create Timeline app.

Layout:

IBM
Google
DBS
Globals
Adverscribe

Requirements:
- vertical line animation
- cards reveal sequentially
- date indicators
- hover elevation

# Projects section

Create Mission Control.

Cards:

Cencora
Google TDM
DBS
Government
eKYC

Requirements:
- window style cards
- hover enlarge
- active card glow
- smooth transitions

# Skills section

Create Activity Monitor.

Show:

React
TypeScript
Next
Architecture
Node

Use:
- circular progress
- animated values
- capability bars

# Metrics section

Create Analytics app.

Counters:
10M+
30%
50%
4-5
2020

Animate using count-up.

# Vision section

Create Engineering Lab.

Floating nodes.

Connect nodes with SVG lines.

Slow movement.

# Contact

Create Shutdown screen.

Laptop brightness fades.

Button glow remains.

Keep dark Apple aesthetic.

=======================================================================
=======================================================================
=======================================================================

# LEVEL 2 — macOS Operating System Experience

## Objective

Upgrade the existing portfolio into an immersive macOS-inspired operating system.

DO NOT redesign from scratch.

Preserve:
- existing architecture
- laptop centerpiece
- section order
- responsive behavior
- animations already implemented

Only extend the current experience.

---

## Global Rules

- React + Next.js
- TypeScript
- Framer Motion
- GSAP ScrollTrigger only where necessary
- Three.js only for laptop scene
- Keep 60FPS
- Lazy load heavy assets
- Respect prefers-reduced-motion
- No layout shifts
- No animation jank

---

# 1 Desktop Environment

Convert background into a macOS desktop.

Implement:

- beautiful wallpaper
- soft vignette
- animated ambient lighting
- slight parallax
- subtle moving particles
- floating depth

Desktop should feel alive but never distracting.

---

# 2 macOS Dock

Add floating dock.

Requirements:

- centered bottom
- glass morphism
- magnification on hover
- bounce animation on click
- reflection
- soft shadow

Dock icons:

Finder
Projects
Skills
Experience
Terminal
Safari
About
Contact
Resume

Clicking icon should navigate smoothly to related section.

Current section icon remains active.

---

# 3 Menu Bar

Top macOS menu bar.

Include:

Apple logo
Portfolio
File
Edit
View
Window
Help

Right side:

wifi
battery
clock
search

Clock updates every minute.

Scrolling changes menu transparency.

---

# 4 Desktop Icons

Desktop shortcuts.

Examples:

About Me

Projects

Resume

GitHub

LinkedIn

Double click opens related window.

Dragging icons should work.

Positions persist during session.

---

# 5 Finder Windows

Instead of revealing sections directly,
open Finder style windows.

Each section becomes its own window.

Window contains:

toolbar

traffic lights

sidebar

content

Window animation:

scale
fade
slight spring

Close hides window.

Minimize animates into Dock.

Maximize expands fullscreen.

Dragging windows works.

---

# 6 Window Manager

Multiple windows supported.

Implement:

z-index management

focus state

active titlebar

inactive blur

window snapping

smooth drag

constraints inside viewport

---

# 7 Mission Control

Create Mission Control.

Shortcut:

double click desktop

or dock button

or keyboard M

All windows zoom out.

Show every open window.

Selecting one restores focus.

Animated with depth.

---

# 8 Launchpad

Launchpad overlay.

Blur background.

Grid animation.

App icons.

Search field.

Typing filters apps.

ESC closes.

---

# 9 Spotlight Search

Keyboard:

CMD + Space

Overlay appears.

Search:

projects

skills

experience

resume

socials

blog

contact

Results keyboard navigable.

Instant filtering.

---

# 10 Notifications

Notification center.

Used for:

Project completed

Resume downloaded

Email copied

Message sent

Slide from top-right.

Queue notifications.

Auto dismiss.

---

# 11 Context Menu

Right click desktop.

macOS style context menu.

Options:

Open Terminal

Refresh

About

Contact

Download Resume

Close on outside click.

---

# 12 Keyboard Navigation

Implement shortcuts.

CMD+1 About

CMD+2 Projects

CMD+3 Skills

CMD+4 Experience

CMD+5 Contact

CMD+Space Spotlight

ESC closes overlays

Arrow keys navigate menus.

---

# 13 Login Animation

First load:

macOS login screen.

Blur wallpaper.

Profile avatar.

Typing animation.

Enter Portfolio button.

Transition zooms into desktop.

Only first visit.

Remember with localStorage.

---

# 14 Cursor Improvements

Custom cursor.

Hover effects.

Pointer changes:

links

buttons

draggable windows

dock icons

interactive objects

Magnetic buttons.

---

# 15 Sound Effects

Very subtle.

Window open

Window close

Dock click

Notification

Spotlight

Mute by default.

User can enable.

---

# 16 Glass Morphism

Apply Apple design language.

Use:

backdrop-filter

soft borders

translucent panels

layered shadows

light bloom

No excessive blur.

---

# 17 Animations

Use spring physics.

Avoid linear motion.

Windows:

fade

scale

depth

Dock:

magnify

bounce

Menu:

fade

Desktop:

parallax

Everything should feel premium.

---

# 18 State Management

Maintain:

active window

window position

dock state

spotlight

mission control

notifications

desktop icons

Use Zustand.

---

# 19 Performance

Window virtualization.

Memoization.

Lazy imports.

GPU transforms.

requestAnimationFrame.

Avoid rerender storms.

---

# Deliverable

The portfolio should feel like using macOS itself.

The visitor should believe they are interacting with a real operating system rather than scrolling through a website.

All previous Level 1 features must continue functioning without regression.