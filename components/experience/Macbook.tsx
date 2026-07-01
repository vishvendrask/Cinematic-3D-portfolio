"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { getProgress, sampleKeyframe } from "@/lib/experience";
import { lerp } from "@/lib/utils";
import { SCREEN_H as SCREEN_PIXEL_H, SCREEN_W as SCREEN_PIXEL_W, ScreenStage } from "./Screens";

/* Laptop dimensions (world units). */
const BASE_W = 4.2;
const BASE_D = 2.9;
const BASE_H = 0.16;
const SCREEN_W = 4.0;
const SCREEN_H = 2.55;
const SCREEN_T = 0.09;
const SCREEN_FACE_Z = 0;
const DISPLAY_W = SCREEN_W * 0.84;
const DISPLAY_H = SCREEN_H * 0.76;
const DISPLAY_CENTER_Y = SCREEN_H / 2 + 0.08;
const DISPLAY_DISTANCE_FACTOR =
  400 * Math.min(DISPLAY_W / SCREEN_PIXEL_W, DISPLAY_H / SCREEN_PIXEL_H);

/** Lid hinge angles: open leans slightly back, closed folds flat over deck. */
const LID_OPEN = -0.05;
const LID_CLOSED = 1.53;

const ALUMINUM = {
  color: "#c2c6cd",
  metalness: 0.92,
  roughness: 0.34,
} as const;

/**
 * The floating MacBook — the storytelling device of the whole experience.
 * Reads the global scroll progress every frame and eases the laptop's pose,
 * lid angle and screen glow, while the pointer adds a subtle live parallax.
 */
export function Macbook() {
  const root = useRef<THREE.Group>(null);
  const hinge = useRef<THREE.Group>(null);
  const screenLight = useRef<THREE.PointLight>(null);
  const displayMaterial = useRef<THREE.MeshStandardMaterial>(null);
  const reflectionMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const haloMaterial = useRef<THREE.MeshBasicMaterial>(null);

  const reflectionMap = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 160;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const gradient = ctx.createLinearGradient(0, 0, 256, 160);
    gradient.addColorStop(0, "rgba(255,255,255,0)");
    gradient.addColorStop(0.3, "rgba(255,255,255,0.34)");
    gradient.addColorStop(0.48, "rgba(255,255,255,0.08)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 160);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  // Eased state carried between frames for silky motion.
  const state = useRef({
    rotX: -0.12,
    rotY: 0,
    rotZ: 0,
    posX: 0,
    posY: 0,
    scale: 1,
    // Normalized lid value: 0 = fully open, 1 = fully closed.
    // Start closed on page load.
    lid: 1,
    glow: 0.35,
    reflection: 0.74,
  });
  // Tracks whether the lid has finished its opening animation.
  const lidLocked = useRef(false);
  // Tracks whether the lid has ever been opened during the session.

  useFrame((ctx, delta) => {
    const k = sampleKeyframe(getProgress());
    const s = state.current;
    // Frame-rate independent damping.
    const a = 1 - Math.pow(0.0015, delta);

    s.rotX = lerp(s.rotX, k.rotX, a);
    s.rotY = lerp(s.rotY, k.rotY, a);
    s.rotZ = lerp(s.rotZ, k.rotZ, a);
    s.posX = lerp(s.posX, k.posX, a);
    s.posY = lerp(s.posY, k.posY, a);
    s.scale = lerp(s.scale, k.scale, a);
  // Keep lid open when at the very top (progress === 0).
  // During the initial load the lid should be open, and scrolling back to the top
  // should not trigger a closing animation.
  // When at the very top (progress === 0) we keep the current lid state
  // to avoid forcing it closed. The lid will only animate for any other
  // progress value.
  // Keep lid open when at the very top (progress === 0) to prevent it from
  // closing after the initial load animation. The lid state uses a normalized
  // value where 1 represents fully open.
  // Apply lid animation only when the scroll progress is beyond a tiny
  // threshold. This prevents the lid from being forced closed when the user
  // scrolls back to the very top (progress ≈ 0).
  // Animate lid until it reaches the fully open position, then lock it.
  if (!lidLocked.current) {
    s.lid = lerp(s.lid, k.lid, a);
    // When the lid is effectively open, lock it.
    if (s.lid < 0.01) {
      s.lid = 0;
      lidLocked.current = true;
    }
  } else {
    // Keep lid open after it has been locked.
    s.lid = 0;
  }
  s.glow = lerp(s.glow, k.glow, a);
  s.reflection = lerp(s.reflection, k.reflection, a);

    if (root.current) {
      const t = ctx.clock.elapsedTime;
      const floatY = Math.sin(t * 0.6) * 0.05;
      const breathe = 1 + Math.sin(t * 0.85) * 0.035;
      const px = ctx.pointer.x;
      const py = ctx.pointer.y;

      root.current.rotation.x = s.rotX + py * 0.06;
      root.current.rotation.y = s.rotY + px * 0.18;
      root.current.rotation.z = s.rotZ + Math.sin(t * 0.4) * 0.01;
      root.current.position.x = s.posX;
      root.current.position.y = s.posY + floatY;
      root.current.scale.setScalar(s.scale * breathe);
    }

    if (hinge.current) {
      hinge.current.rotation.x = lerp(LID_OPEN, LID_CLOSED, s.lid);
    }

    if (screenLight.current) {
      const breathe = 1 + Math.sin(ctx.clock.elapsedTime * 1.2) * 0.08;
      screenLight.current.intensity = 6 * Math.max(0, s.glow) * breathe;
    }

    if (displayMaterial.current) {
      displayMaterial.current.emissiveIntensity = 0.22 + s.glow * 0.42;
      displayMaterial.current.opacity = 0.42 + Math.min(0.58, s.glow * 0.58);
    }

    if (reflectionMaterial.current) {
      const breathe = 1 + Math.sin(ctx.clock.elapsedTime * 0.9) * 0.06;
      reflectionMaterial.current.opacity = 0.13 * s.reflection * breathe;
    }

    if (haloMaterial.current) {
      const breathe = 1 + Math.sin(ctx.clock.elapsedTime * 0.75) * 0.08;
      haloMaterial.current.opacity = 0.08 * s.glow * breathe;
    }
  });

  return (
    <group ref={root} position={[0, 0, 0]}>
      {/* Base / keyboard deck */}
      <RoundedBox args={[BASE_W, BASE_H, BASE_D]} radius={0.06} smoothness={4}>
        <meshStandardMaterial {...ALUMINUM} />
      </RoundedBox>

      {/* Keyboard well */}
      <mesh position={[0, BASE_H / 2 + 0.001, 0.18]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[BASE_W * 0.92, BASE_D * 0.82]} />
        <meshStandardMaterial color="#0b0c10" metalness={0.5} roughness={0.6} />
      </mesh>

      {/* Trackpad */}
      <mesh position={[0, BASE_H / 2 + 0.002, BASE_D * 0.28]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.4, 0.95]} />
        <meshStandardMaterial color="#15171c" metalness={0.4} roughness={0.45} />
      </mesh>

      {/* Lid + screen, hinged at the back edge */}
      <group ref={hinge} position={[0, BASE_H / 2, -BASE_D / 2]}>
        {/* Lid back panel (aluminum) */}
        <RoundedBox
          args={[SCREEN_W, SCREEN_H, SCREEN_T]}
          radius={0.05}
          smoothness={4}
          position={[0, SCREEN_H / 2, -SCREEN_T / 2]}
        >
          <meshStandardMaterial {...ALUMINUM} />
        </RoundedBox>

        {/* Black display substrate */}
        <mesh position={[0, SCREEN_H / 2, SCREEN_FACE_Z + 0.002]}>
          <planeGeometry args={[SCREEN_W * 0.94, SCREEN_H * 0.9]} />
          <meshStandardMaterial
            ref={displayMaterial}
            transparent
            color="#04050a"
            emissive="#0a1b3a"
            emissiveIntensity={0.4}
            metalness={0.1}
            roughness={0.18}
          />
        </mesh>

        {/* Subtle glass sweep reflection above the live screen content. */}
        {reflectionMap && (
          <mesh position={[0, SCREEN_H / 2, SCREEN_FACE_Z + 0.006]}>
            <planeGeometry args={[SCREEN_W * 0.9, SCREEN_H * 0.84]} />
            <meshBasicMaterial
              ref={reflectionMaterial}
              transparent
              depthWrite={false}
              opacity={0.1}
              color="#ffffff"
              alphaMap={reflectionMap}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        )}

        {/* Soft halo around the display that fades during shutdown. */}
        <mesh position={[0, SCREEN_H / 2, SCREEN_FACE_Z + 0.003]}>
          <planeGeometry args={[SCREEN_W * 1.02, SCREEN_H * 0.98]} />
          <meshBasicMaterial
            ref={haloMaterial}
            transparent
            depthWrite={false}
            opacity={0.08}
            color="#6f8cff"
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Live HTML screen content — kept comfortably inside the bezel */}
        <Html
          transform
          occlude={false}
          wrapperClass="pointer-events-none"
          position={[0, DISPLAY_CENTER_Y, SCREEN_FACE_Z + 0.004]}
          distanceFactor={DISPLAY_DISTANCE_FACTOR}
          zIndexRange={[8, 0]}
        >
          <ScreenStage />
        </Html>

        {/* Screen glow spilling onto the deck */}
        <pointLight
          ref={screenLight}
          position={[0, SCREEN_H / 2, 0.6]}
          color="#6f8cff"
          intensity={6}
          distance={6}
          decay={2}
        />
      </group>
    </group>
  );
}
