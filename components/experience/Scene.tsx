"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { getProgress, sampleKeyframe } from "@/lib/experience";
import { lerp } from "@/lib/utils";
import { useTheme } from "@/components/providers/ThemeProvider";
import { Macbook } from "./Macbook";
import { Particles } from "./Particles";

/** Eases the camera dolly + parallax from the active keyframe each frame. */
function CameraRig() {
  const { camera, size } = useThree();
  const target = useRef(new THREE.Vector3(0, 0.78, 0));

  useFrame((ctx, delta) => {
    const k = sampleKeyframe(getProgress());
    const a = 1 - Math.pow(0.0025, delta);

    // On wide screens, aim well left of the laptop so it lives in the right
    // ~45% of the frame, leaving the left for prominent narrative sections.
    const desiredTargetX = size.width < 820 ? 0 : -1.9;
    target.current.x = lerp(target.current.x, desiredTargetX, 0.06);

    camera.position.z = lerp(camera.position.z, k.camZ, a);
    camera.position.x = lerp(camera.position.x, ctx.pointer.x * 0.4, 0.05);
    camera.position.y = lerp(camera.position.y, 0.7 + ctx.pointer.y * 0.35, 0.05);
    camera.lookAt(target.current);
  });

  return null;
}

/** Stable fake floor shadow. Avoids framebuffer shimmer from ContactShadows. */
function GroundShadow({ theme }: { theme: "dark" | "light" }) {
  const material = useRef<THREE.MeshBasicMaterial>(null);
  const alphaMap = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const gradient = ctx.createRadialGradient(128, 128, 8, 128, 128, 128);
    gradient.addColorStop(0, "rgba(255,255,255,0.95)");
    gradient.addColorStop(0.42, "rgba(255,255,255,0.48)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  useFrame((ctx, delta) => {
    if (!material.current) return;

    const k = sampleKeyframe(getProgress());
    const a = 1 - Math.pow(0.003, delta);
    const breathe = 1 + Math.sin(ctx.clock.elapsedTime * 0.8) * 0.04;
    const base = theme === "light" ? 0.24 : 0.48;
    material.current.opacity = lerp(material.current.opacity, base * k.shadow * breathe, a);
  });

  if (!alphaMap) return null;

  return (
    <mesh position={[0, -1.08, 0.08]} rotation={[-Math.PI / 2, 0, 0]} scale={[5.4, 3.2, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        ref={material}
        transparent
        depthWrite={false}
        color={theme === "light" ? "#6f778a" : "#000000"}
        opacity={theme === "light" ? 0.24 : 0.48}
        alphaMap={alphaMap}
      />
    </mesh>
  );
}

function CinematicLights({ theme }: { theme: "dark" | "light" }) {
  const keyLight = useRef<THREE.DirectionalLight>(null);
  const leftGlow = useRef<THREE.PointLight>(null);
  const rightGlow = useRef<THREE.PointLight>(null);
  const topSpot = useRef<THREE.SpotLight>(null);

  useFrame((ctx, delta) => {
    const k = sampleKeyframe(getProgress());
    const a = 1 - Math.pow(0.004, delta);
    const breathe = 1 + Math.sin(ctx.clock.elapsedTime * 0.72) * 0.06;
    const themeBoost = theme === "light" ? 0.78 : 1;

    if (keyLight.current) {
      keyLight.current.intensity = lerp(keyLight.current.intensity, 1.45 * themeBoost * breathe, a);
    }

    if (leftGlow.current) {
      leftGlow.current.intensity = lerp(leftGlow.current.intensity, 22 * k.glow * breathe, a);
    }

    if (rightGlow.current) {
      rightGlow.current.intensity = lerp(rightGlow.current.intensity, 18 * k.glow * breathe, a);
    }

    if (topSpot.current) {
      topSpot.current.intensity = lerp(topSpot.current.intensity, 24 * k.reflection * breathe, a);
    }
  });

  return (
    <>
      <ambientLight intensity={theme === "light" ? 0.85 : 0.45} />
      <directionalLight ref={keyLight} position={[5, 6, 4]} intensity={1.6} color="#cdd7ff" />
      <pointLight ref={leftGlow} position={[-6, 2, 3]} intensity={28} color="#4d7cff" />
      <pointLight ref={rightGlow} position={[6, -2, 2]} intensity={20} color="#7c5cff" />
      <spotLight ref={topSpot} position={[0, 8, 3]} angle={0.5} penumbra={1} intensity={30} color="#ffffff" />
    </>
  );
}

/** The full 3D world: lighting, reflections, particles and the laptop. */
export function Scene() {
  const theme = useTheme();
  const bg = theme === "light" ? "#dfe4ee" : "#050507";

  return (
    <>
      <color attach="background" args={[bg]} />
      <fog attach="fog" args={[bg, 9, 20]} />

      <CameraRig />

      <CinematicLights theme={theme} />

      <Macbook />
      <Particles />

      <GroundShadow theme={theme} />

      {/* In-memory studio environment for aluminum reflections (no network). */}
      <Environment resolution={256} frames={1}>
        <color attach="background" args={["#05060a"]} />
        <Lightformer
          form="rect"
          intensity={2.4}
          color="#9db4ff"
          position={[0, 5, -6]}
          scale={[10, 4, 1]}
        />
        <Lightformer
          form="rect"
          intensity={1.6}
          color="#7c5cff"
          position={[-6, 1, 2]}
          scale={[4, 6, 1]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <Lightformer
          form="rect"
          intensity={1.6}
          color="#4d7cff"
          position={[6, 1, 2]}
          scale={[4, 6, 1]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <Lightformer
          form="circle"
          intensity={2}
          color="#ffffff"
          position={[0, -3, 4]}
          scale={[3, 3, 1]}
        />
      </Environment>
    </>
  );
}
