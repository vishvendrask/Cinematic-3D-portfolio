"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getProgress } from "@/lib/experience";
import { clamp } from "@/lib/utils";

interface ParticlesProps {
  count?: number;
}

/** Ambient floating particles surrounding the laptop; fade out at shutdown. */
export function Particles({ count = 700 }: ParticlesProps) {
  const ref = useRef<THREE.Points>(null);
  const mat = useRef<THREE.PointsMaterial>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 4 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = (radius * Math.sin(phi) * Math.sin(theta) - 2) * 0.6;
      arr[i * 3 + 2] = radius * Math.cos(phi) - 2;
    }
    return arr;
  }, [count]);

  useFrame((ctx, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02;
      ref.current.position.x = ctx.pointer.x * 0.3;
      ref.current.position.y = ctx.pointer.y * 0.2;
    }
    if (mat.current) {
      // Fade particles away during the shutdown act.
      const fade = 1 - clamp((getProgress() - 0.86) / 0.12, 0, 1);
      mat.current.opacity = 0.6 * fade;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={mat}
        size={0.025}
        color="#9db4ff"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
