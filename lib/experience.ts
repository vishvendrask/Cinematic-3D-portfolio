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
  /** Uniform laptop scale. */
  scale: number;
  /** Lid state: 0 = fully open, 1 = closed. */
  lid: number;
  /** Camera dolly distance on Z. */
  camZ: number;
  /** Screen brightness / ambient glow multiplier. */
  glow: number;
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
    key: { rotX: d2r(-7), rotY: d2r(0), rotZ: 0, posY: 0, scale: 1, lid: 0, camZ: 6.9, glow: 1 },
  },
  {
    id: "about",
    app: "finder",
    eyebrow: "Finder · The Journey",
    title: "From Android developer to frontend engineer",
    description:
      "The folders trace the path from early web and Android work into React, architecture, reusable systems and team leadership.",
    key: { rotX: d2r(-6), rotY: d2r(-17), rotZ: d2r(1), posY: 0.08, scale: 1.04, lid: 0, camZ: 6.3, glow: 1 },
  },
  {
    id: "experience",
    app: "timeline",
    eyebrow: "Timeline · Career",
    title: "Companies that shaped the craft",
    description:
      "IBM, Google, DBS, Cencora, Globals and Adverscribe — the places where frontend scale, architecture and delivery were sharpened.",
    key: { rotX: d2r(-5), rotY: d2r(16), rotZ: d2r(-1), posY: 0.05, scale: 1.05, lid: 0, camZ: 6.1, glow: 1 },
  },
  {
    id: "projects",
    app: "mission",
    eyebrow: "Mission Control · Selected Work",
    title: "Selected work across enterprise domains",
    description:
      "Project windows hover in space — healthcare, banking, government and identity systems, each with its own constraints.",
    key: { rotX: d2r(-2), rotY: d2r(0), rotZ: 0, posY: -0.02, scale: 1.18, lid: 0, camZ: 5.4, glow: 1.1 },
  },
  {
    id: "skills",
    app: "dashboard",
    eyebrow: "Analytics · Capabilities",
    title: "A live engineering dashboard",
    description:
      "Languages, frontend, architecture, backend, testing and tooling — rendered as live capability rings instead of static badges.",
    key: { rotX: d2r(-6), rotY: d2r(-11), rotZ: d2r(1), posY: 0.06, scale: 1.08, lid: 0, camZ: 5.7, glow: 1 },
  },
  {
    id: "achievements",
    app: "metrics",
    eyebrow: "Metrics · Impact",
    title: "Numbers that moved",
    description:
      "10M+ users served, 30% faster, 50% fewer defects, teams led and awards earned — the measurable impact.",
    key: { rotX: d2r(-7), rotY: d2r(9), rotZ: d2r(-1), posY: 0.05, scale: 1.05, lid: 0, camZ: 6.0, glow: 1 },
  },
  {
    id: "vision",
    app: "ailab",
    eyebrow: "Engineering Lab · Focus Areas",
    title: "What I keep sharpening",
    description:
      "Frontend architecture, design systems, performance, enterprise scale, developer experience and leadership — the problems worth solving next.",
    key: { rotX: d2r(-10), rotY: d2r(-23), rotZ: d2r(2), posY: 0.1, scale: 1.14, lid: 0, camZ: 5.6, glow: 1.15 },
  },
  {
    id: "contact",
    app: "shutdown",
    eyebrow: "Shutdown · Say Hello",
    title: "Let's build something reliable",
    description:
      "The lid closes, the lights fade — but the conversation stays open. Bangalore, India.",
    key: { rotX: d2r(0), rotY: d2r(0), rotZ: 0, posY: -0.18, scale: 0.92, lid: 1, camZ: 7.4, glow: 0.2 },
  },
];

export const SCENE_COUNT = SCENES.length;

/** Smootherstep — C2 continuous easing for buttery keyframe blends. */
function smootherstep(t: number) {
  const x = clamp(t, 0, 1);
  return x * x * x * (x * (x * 6 - 15) + 10);
}

/**
 * Interpolate a {@link Keyframe} for a continuous global progress value.
 * Blends between the two nearest scene keyframes with eased local time.
 */
export function sampleKeyframe(progress: number): Keyframe {
  const segments = SCENE_COUNT - 1;
  const scaled = clamp(progress, 0, 1) * segments;
  const i = clamp(Math.floor(scaled), 0, segments - 1);
  const a = SCENES[i].key;
  const b = SCENES[i + 1].key;
  const t = smootherstep(scaled - i);

  return {
    rotX: lerp(a.rotX, b.rotX, t),
    rotY: lerp(a.rotY, b.rotY, t),
    rotZ: lerp(a.rotZ, b.rotZ, t),
    posY: lerp(a.posY, b.posY, t),
    scale: lerp(a.scale, b.scale, t),
    lid: lerp(a.lid, b.lid, t),
    camZ: lerp(a.camZ, b.camZ, t),
    glow: lerp(a.glow, b.glow, t),
  };
}

/** Nearest scene index for a given global progress (used for screen content). */
export function sceneIndexFor(progress: number): number {
  const segments = SCENE_COUNT - 1;
  return clamp(Math.round(clamp(progress, 0, 1) * segments), 0, segments);
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
