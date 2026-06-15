"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import {
  generateBrainPointCloud,
  generateLesionPointCloud,
  type BrainPointCloud,
} from "@/lib/brain/brainGeometry";

const BRAIN_VERTEX = /* glsl */ `
  attribute float aSize;
  attribute float aAlpha;
  varying vec3 vColor;
  varying float vAlpha;
  uniform float uPixelRatio;

  void main() {
    vColor = color;
    vAlpha = aAlpha;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uPixelRatio * (220.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const BRAIN_FRAGMENT = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  uniform float uBrightness;

  void main() {
    vec2 uv = gl_PointCoord.xy - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float falloff = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor * uBrightness, falloff * vAlpha);
  }
`;

const LESION_FRAGMENT = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  uniform float uPulse;

  void main() {
    vec2 uv = gl_PointCoord.xy - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float falloff = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor, falloff * vAlpha * uPulse);
  }
`;

function buildGeometry(data: BrainPointCloud) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(data.positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(data.colors, 3));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(data.sizes, 1));
  geometry.setAttribute("aAlpha", new THREE.BufferAttribute(data.alphas, 1));
  return geometry;
}

function BrainPoints({ count, hoveredRef }: { count: number; hoveredRef: { current: boolean } }) {
  const geometry = useMemo(() => buildGeometry(generateBrainPointCloud(count)), [count]);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const pixelRatio = useMemo(() => (typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1), []);

  useFrame((_, delta) => {
    const material = materialRef.current;
    if (!material) return;
    const target = hoveredRef.current ? 1.18 : 1;
    const u = material.uniforms.uBrightness;
    u.value += (target - u.value) * Math.min(1, delta * 4);
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={BRAIN_VERTEX}
        fragmentShader={BRAIN_FRAGMENT}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
        uniforms={useMemo(() => ({ uPixelRatio: { value: pixelRatio }, uBrightness: { value: 1 } }), [pixelRatio])}
      />
    </points>
  );
}

function LesionPoints() {
  const geometry = useMemo(() => buildGeometry(generateLesionPointCloud()), []);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const pixelRatio = useMemo(() => (typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1), []);

  useFrame(({ clock }) => {
    const material = materialRef.current;
    if (!material) return;
    // Slow, clinical pulse — a gentle highlight rather than an alarm.
    material.uniforms.uPulse.value = 0.82 + Math.sin(clock.elapsedTime * 1.1) * 0.18;
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={BRAIN_VERTEX}
        fragmentShader={LESION_FRAGMENT}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
        vertexColors
        uniforms={useMemo(() => ({ uPixelRatio: { value: pixelRatio }, uPulse: { value: 1 } }), [pixelRatio])}
      />
    </points>
  );
}

function BrainGroup({ count, reduce }: { count: number; reduce: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const hovered = useRef(false);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const scaleTarget = hovered.current ? 1.035 : 1;
    const s = group.scale.x + (scaleTarget - group.scale.x) * Math.min(1, delta * 4);
    group.scale.setScalar(s);

    if (!reduce) {
      // Very slow ambient bob — subtle parallax, never disorienting.
      group.position.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.025;
    }
  });

  return (
    <group
      ref={groupRef}
      rotation={[0.08, -0.35, 0]}
      onPointerEnter={() => (hovered.current = true)}
      onPointerLeave={() => (hovered.current = false)}
    >
      <BrainPoints count={count} hoveredRef={hovered} />
      <LesionPoints />
    </group>
  );
}

export function BrainPointCloudScene({
  particleCount,
  reduce,
}: {
  particleCount: number;
  reduce: boolean;
}) {
  const dpr = useMemo<[number, number]>(() => [1, reduce ? 1.4 : 2], [reduce]);

  return (
    <Canvas
      camera={{ position: [0, 0, 3.1], fov: 32 }}
      dpr={dpr}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      frameloop={reduce ? "demand" : "always"}
    >
      <BrainGroup count={particleCount} reduce={reduce} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.35}
        autoRotate={!reduce}
        autoRotateSpeed={0.45}
        minPolarAngle={Math.PI / 2 - 0.55}
        maxPolarAngle={Math.PI / 2 + 0.55}
      />
    </Canvas>
  );
}
