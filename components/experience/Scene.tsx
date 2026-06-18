"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
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

/** The full 3D world: lighting, reflections, particles and the laptop. */
export function Scene() {
  const theme = useTheme();
  const bg = theme === "light" ? "#dfe4ee" : "#050507";

  return (
    <>
      <color attach="background" args={[bg]} />
      <fog attach="fog" args={[bg, 9, 20]} />

      <CameraRig />

      <ambientLight intensity={theme === "light" ? 0.85 : 0.45} />
      <directionalLight position={[5, 6, 4]} intensity={1.6} color="#cdd7ff" />
      <pointLight position={[-6, 2, 3]} intensity={28} color="#4d7cff" />
      <pointLight position={[6, -2, 2]} intensity={20} color="#7c5cff" />
      <spotLight position={[0, 8, 3]} angle={0.5} penumbra={1} intensity={30} color="#ffffff" />

      <Macbook />
      <Particles />

      <ContactShadows
        position={[0, -1.1, 0]}
        opacity={0.55}
        scale={14}
        blur={2.6}
        far={4}
        color="#000000"
        resolution={256}
      />

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
