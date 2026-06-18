"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial, Torus } from "@react-three/drei";
import * as THREE from "three";

/** A slowly distorting central icosahedron with an electric-blue glassy material. */
function CoreGeometry() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * 0.08;
    ref.current.rotation.y = t * 0.12;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <Icosahedron ref={ref} args={[1.35, 4]}>
        <MeshDistortMaterial
          color="#3a4cff"
          emissive="#2f3bff"
          emissiveIntensity={0.45}
          roughness={0.2}
          metalness={0.6}
          distort={0.35}
          speed={1.6}
          envMapIntensity={1.2}
        />
      </Icosahedron>
    </Float>
  );
}

/** Orbiting wireframe torus rings adding depth around the core. */
function Rings() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.z = state.clock.elapsedTime * 0.05;
  });
  return (
    <group ref={group}>
      <Float speed={1} rotationIntensity={0.4} floatIntensity={0.8}>
        <Torus args={[2.4, 0.012, 16, 120]} rotation={[Math.PI / 2.4, 0.4, 0]}>
          <meshStandardMaterial
            color="#7c5cff"
            emissive="#7c5cff"
            emissiveIntensity={0.6}
            transparent
            opacity={0.5}
          />
        </Torus>
      </Float>
      <Float speed={0.8} rotationIntensity={0.5} floatIntensity={0.6}>
        <Torus args={[3.1, 0.008, 16, 120]} rotation={[Math.PI / 1.8, -0.3, 0.5]}>
          <meshStandardMaterial
            color="#4d7cff"
            emissive="#4d7cff"
            emissiveIntensity={0.5}
            transparent
            opacity={0.35}
          />
        </Torus>
      </Float>
    </group>
  );
}

interface ParticleFieldProps {
  count?: number;
}

/** A drifting field of points that subtly tracks the pointer for parallax. */
function ParticleField({ count = 900 }: ParticleFieldProps) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 3 + Math.random() * 7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = radius * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.03;
    ref.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    ref.current.position.x = state.pointer.x * 0.4;
    ref.current.position.y = state.pointer.y * 0.3;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#9db4ff"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Camera group that gently parallaxes with the pointer. */
function ParallaxRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      state.pointer.x * 0.18,
      0.05,
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -state.pointer.y * 0.12,
      0.05,
    );
  });
  return <group ref={group}>{children}</group>;
}

export function HeroSceneContent() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={40} color="#4d7cff" />
      <pointLight position={[-5, -3, 2]} intensity={30} color="#7c5cff" />
      <spotLight
        position={[0, 6, 4]}
        angle={0.5}
        penumbra={1}
        intensity={25}
        color="#ffffff"
      />
      <ParallaxRig>
        <CoreGeometry />
        <Rings />
        <ParticleField />
      </ParallaxRig>
    </>
  );
}
