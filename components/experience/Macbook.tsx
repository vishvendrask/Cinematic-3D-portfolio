"use client";

import { useRef } from "react";
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
const LID_OPEN = -0.16;
const LID_CLOSED = 1.52;

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

  // Eased state carried between frames for silky motion.
  const state = useRef({
    rotX: -0.12,
    rotY: 0,
    rotZ: 0,
    posY: 0,
    scale: 1,
    lid: 0,
    glow: 1,
  });

  useFrame((ctx, delta) => {
    const k = sampleKeyframe(getProgress());
    const s = state.current;
    // Frame-rate independent damping.
    const a = 1 - Math.pow(0.0015, delta);

    s.rotX = lerp(s.rotX, k.rotX, a);
    s.rotY = lerp(s.rotY, k.rotY, a);
    s.rotZ = lerp(s.rotZ, k.rotZ, a);
    s.posY = lerp(s.posY, k.posY, a);
    s.scale = lerp(s.scale, k.scale, a);
    s.lid = lerp(s.lid, k.lid, a);
    s.glow = lerp(s.glow, k.glow, a);

    if (root.current) {
      const t = ctx.clock.elapsedTime;
      const floatY = Math.sin(t * 0.6) * 0.05;
      const px = ctx.pointer.x;
      const py = ctx.pointer.y;

      root.current.rotation.x = s.rotX + py * 0.06;
      root.current.rotation.y = s.rotY + px * 0.18;
      root.current.rotation.z = s.rotZ + Math.sin(t * 0.4) * 0.01;
      root.current.position.y = s.posY + floatY;
      root.current.scale.setScalar(s.scale);
    }

    if (hinge.current) {
      hinge.current.rotation.x = lerp(LID_OPEN, LID_CLOSED, s.lid);
    }

    if (screenLight.current) {
      screenLight.current.intensity = 6 * Math.max(0, s.glow);
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
          <meshStandardMaterial color="#04050a" emissive="#0a1b3a" emissiveIntensity={0.4} />
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
