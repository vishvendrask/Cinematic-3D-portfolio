import { clamp, lerp } from "@/lib/utils";

/**
 * The cinematic "operating system" experience is a single continuous scene.
 * Scrolling drives a global progress value in [0, 1] which is mapped onto a set
 * of camera / laptop keyframes and the active on-screen application.
 *
 * The 3D scene reads {@link getProgress} directly inside its render loop so it
 * never triggers React re-renders, while DOM that depends on the *active scene*
 * (the laptop's screen content, dock highlight, …) subscribes via
 * {@link subscribe} + {@link getScene} through `useSyncExternalStore`.
 */

export type AppId =
  | "desktop"
  | "finder"
  | "timeline"
  | "mission"
  | "dashboard"
  | "metrics"
  | "ailab"
  | "shutdown";

/** A single camera + laptop pose. Angles are in radians. */
export interface Keyframe {
  /** Laptop pitch (tilt toward / away from camera). */
  rotX: number;
  /** Laptop yaw (turn left / right). */
  rotY: number;
  /** Laptop roll. */
  rotZ: number;
  /** Vertical float offset. */
  posY: number;
  /** Horizontal stage offset. Positive values move the laptop right. */
  posX: number;
  /** Uniform laptop scale. */
  scale: number;
  /** Lid state: 0 = fully open, 1 = closed. */
  lid: number;
  /** Camera dolly distance on Z. */
  camZ: number;
  /** Screen brightness / ambient glow multiplier. */
  glow: number;
  /** Soft floor shadow multiplier. */
  shadow: number;
  /** Subtle aluminum/display reflection multiplier. */
  reflection: number;
}

export interface Scene {
  id: string;
  app: AppId;
  eyebrow: string;
  title: string;
  description: string;
  key: Keyframe;
}

const d2r = (deg: number) => (deg * Math.PI) / 180;

const INITIAL_KEYFRAME: Keyframe = {
  rotX: d2r(0),
  rotY: d2r(0),
  rotZ: 0,
  posX: 0,
  posY: 0,
  scale: 1,
  lid: 1,
  camZ: 6.9,
  glow: 0.35,
  shadow: 0.72,
  reflection: 0.74,
};

/**
 * The eight acts of the story. Section ids intentionally match the global
 * navigation anchors so the existing nav + smooth-scroll keep working.
 */
export const SCENES: Scene[] = [
  {
    id: "hero",
    app: "desktop",
    eyebrow: "Senior Frontend Engineer · Bangalore, India",
    title: "Building Frontend Systems That Scale",
    description:
      "A cinematic desktop opens on seven years of enterprise frontend delivery across healthcare, banking, government and identity platforms.",
    key: {
      rotX: d2r(0),
      rotY: d2r(0),
      rotZ: 0,
      posX: 0,
      posY: 0,
      scale: 1,
      lid: 0, // Hero opens from the initial closed pose.
      camZ: 6.9,
      glow: 0.92,
      shadow: 0.72,
      reflection: 0.74,
    },
  },
  {
    id: "about",
    app: "finder",
    eyebrow: "Finder · The Journey",
    title: "From Android developer to frontend engineer",
    description:
      "The folders trace the path from early web and Android work into React, architecture, reusable systems and team leadership.",
    key: {
      rotX: d2r(0),
      rotY: d2r(8),
      rotZ: d2r(0),
      posX: 0.50, // translateX(50px)
      posY: 0,
      scale: 1,
      lid: 0, // Open laptop
      camZ: 6.3,
      glow: 1,
      shadow: 0.88,
      reflection: 0.9,
    },
  },
  {
    id: "experience",
    app: "timeline",
    eyebrow: "Timeline · Career",
    title: "Companies that shaped the craft",
    description:
      "IBM, Google, DBS, Cencora, Globals and Adverscribe — the places where frontend scale, architecture and delivery were sharpened.",
    key: {
      rotX: d2r(0),
      rotY: d2r(0),
      rotZ: 0,
      posX: 0,
      posY: 0,
      scale: 1.1, // Scale laptop 1 -> 1.1
      lid: 0,
      camZ: 5.5, // Zoom in
      glow: 1.1,
      shadow: 1,
      reflection: 1,
    },
  },
  {
    id: "projects",
    app: "mission",
    eyebrow: "Mission Control · Selected Work",
    title: "Selected work across enterprise domains",
    description:
      "Project windows hover in space — healthcare, banking, government and identity systems, each with its own constraints.",
    key: {
      rotX: d2r(0),
      rotY: d2r(-10),
      rotZ: 0,
      posX: 0,
      posY: 0.1, // Move upward
      scale: 1.1,
      lid: 0,
      camZ: 5.8,
      glow: 1.12,
      shadow: 0.9,
      reflection: 1.08,
    },
  },
  {
    id: "skills",
    app: "dashboard",
    eyebrow: "Analytics · Capabilities",
    title: "A live engineering dashboard",
    description:
      "Languages, frontend, architecture, backend, testing and tooling — rendered as live capability rings instead of static badges.",
    key: {
      rotX: d2r(4),
      rotY: d2r(-18),
      rotZ: d2r(0),
      posX: 0,
      posY: 0,
      scale: 1.06,
      lid: 0,
      camZ: 5.9,
      glow: 1,
      shadow: 0.94,
      reflection: 1,
    },
  },
  {
    id: "achievements",
    app: "metrics",
    eyebrow: "Metrics · Impact",
    title: "Numbers that moved",
    description:
      "10M+ users served, 30% faster, 50% fewer defects, teams led and awards earned — the measurable impact.",
    key: {
      rotX: d2r(-20), // Top perspective
      rotY: d2r(0),
      rotZ: d2r(0),
      posX: 0,
      posY: 0,
      scale: 1.03,
      lid: 0,
      camZ: 6.05,
      glow: 0.95,
      shadow: 1.12,
      reflection: 0.95,
    },
  },
  {
    id: "future-vision",
    app: "ailab",
    eyebrow: "Engineering Lab · Focus Areas",
    title: "What I keep sharpening",
    description:
      "Frontend architecture, design systems, performance, enterprise scale, developer experience and leadership — the problems worth solving next.",
    key: {
      rotX: d2r(0),
      rotY: d2r(0),
      rotZ: d2r(0),
      posX: 0,
      posY: 0,
      scale: 1, // Slight zoom out
      lid: 0,
      camZ: 6.45,
      glow: 0.9,
      shadow: 0.78,
      reflection: 0.86,
    },
  },
  {
    id: "contact",
    app: "shutdown",
    eyebrow: "Shutdown · Say Hello",
    title: "Let's build something reliable",
    description:
      "The lid closes, the lights fade — but the conversation stays open. Bangalore, India.",
    key: {
      rotX: d2r(0),
      rotY: d2r(0),
      rotZ: 0,
      posX: 0,
      posY: 0,
      scale: 0.92,
      lid: 1, // Close laptop
      camZ: 7.4,
      glow: 0.18, // Decrease brightness
      shadow: 0.52,
      reflection: 0.42,
    },
  },
];

export const SCENE_COUNT = SCENES.length;

/**
 * Interpolate a {@link Keyframe} for a continuous global progress value.
 * Each section owns one segment: it starts from the previous section's final
 * pose and lands on its own keyframe by the end of the section.
 */
export function sampleKeyframe(progress: number): Keyframe {
  const segments = SCENE_COUNT;
  const scaled = clamp(progress, 0, 1) * segments;
  const i = clamp(Math.floor(scaled), 0, SCENE_COUNT - 1);
  const a = i === 0 ? INITIAL_KEYFRAME : SCENES[i - 1].key;
  const b = SCENES[i].key;
  const t = clamp(scaled - i, 0, 1);

  return {
    rotX: lerp(a.rotX, b.rotX, t),
    rotY: lerp(a.rotY, b.rotY, t),
    rotZ: lerp(a.rotZ, b.rotZ, t),
    posX: lerp(a.posX, b.posX, t),
    posY: lerp(a.posY, b.posY, t),
    scale: lerp(a.scale, b.scale, t),
    lid: lerp(a.lid, b.lid, t),
    camZ: lerp(a.camZ, b.camZ, t),
    glow: lerp(a.glow, b.glow, t),
    shadow: lerp(a.shadow, b.shadow, t),
    reflection: lerp(a.reflection, b.reflection, t),
  };
}

/** Nearest scene index for a given global progress (used for screen content). */
export function sceneIndexFor(progress: number): number {
  return clamp(Math.floor(clamp(progress, 0, 0.999999) * SCENE_COUNT), 0, SCENE_COUNT - 1);
}

/* ------------------------------------------------------------------ */
/* Render-free global store                                            */
/* ------------------------------------------------------------------ */

type Listener = () => void;

let progress = 0;
let scene = 0;
const listeners = new Set<Listener>();

function emit() {
  for (const l of listeners) l();
}

/** Set the continuous global scroll progress (0..1). Cheap, no React churn. */
export function setProgress(next: number) {
  progress = clamp(next, 0, 1);
  const nextScene = sceneIndexFor(progress);
  if (nextScene !== scene) {
    scene = nextScene;
    emit();
  }
}

/** Read the latest progress — call this inside `useFrame`. */
export function getProgress() {
  return progress;
}

/** Active (nearest) scene index. Use with `useSyncExternalStore`. */
export function getScene() {
  return scene;
}

/** Subscribe to active-scene changes. */
export function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
