"use client";

import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import { assetPath } from "@/lib/asset-path";

/**
 * BrainPointCloud — point cloud sampled DIRECTLY from the real anatomical mesh
 * (`/models/brain.glb`). No procedural geometry, no ellipsoids, no fallback.
 *
 * The brain points use a custom shader: bright electric-blue base, a gentle
 * energy-wave + breathing, per-point twinkle and a soft glow. Animation is
 * fully automatic (no pointer-hover highlight). A separate orange-red cluster
 * marks a tumour / lesion with a low-frequency pulsing glow, a soft halo and a
 * slow expanding scan-ripple — an "AI detecting the lesion" feel.
 */

const MODEL_PATH = assetPath("/models/brain.glb");
useGLTF.preload(MODEL_PATH);

/** Soft circular sprite so each point reads as a glowing dot. */
function makeDotTexture() {
  const size = 64;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.5, "rgba(255,255,255,0.78)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

/** Soft radial halo (for the lesion glow). */
function makeHaloTexture() {
  const s = 128;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(255,255,255,0.9)");
  g.addColorStop(0.35, "rgba(255,255,255,0.35)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

/** Thin ring (for the expanding scan ripple). */
function makeRingTexture() {
  const s = 128;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const ctx = c.getContext("2d")!;
  ctx.translate(s / 2, s / 2);
  for (let i = 40; i >= 0; i--) {
    const r = (s / 2) * (0.78 + i * 0.004);
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255,255,255,${0.04})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(0, 0, s * 0.4, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255,255,255,0.85)";
  ctx.lineWidth = 2.5;
  ctx.stroke();
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

export type Tumor = { center: THREE.Vector3; scale: number; seed: number };
export type BrainData = {
  positions: Float32Array;
  colors: Float32Array;
  tumors: Tumor[];
  modelScale: number;
};

/** Loads the GLB and samples the surface (once). Throws if the model is missing. */
export function useBrainData(count: number): BrainData {
  const { scene } = useGLTF(MODEL_PATH);

  return useMemo(() => {
    const hash = (n: number) => {
      let t = (n ^ 0x9e3779b9) >>> 0;
      t = Math.imul(t ^ (t >>> 15), 1 | t);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    scene.updateMatrixWorld(true);
    const triArrays: Float32Array[] = [];
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh || !mesh.geometry) return;
      const g = mesh.geometry.index ? mesh.geometry.toNonIndexed() : mesh.geometry.clone();
      g.applyMatrix4(mesh.matrixWorld);
      triArrays.push(g.getAttribute("position").array as Float32Array);
      g.dispose();
    });
    if (triArrays.length === 0) {
      throw new Error("brain.glb contained no mesh geometry to sample.");
    }

    const total = triArrays.reduce((a, x) => a + x.length, 0);
    const merged = new Float32Array(total);
    let off = 0;
    for (const a of triArrays) {
      merged.set(a, off);
      off += a.length;
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(merged, 3));
    geom.computeBoundingBox();
    const bb = geom.boundingBox!;
    const center = new THREE.Vector3();
    bb.getCenter(center);
    const size = new THREE.Vector3();
    bb.getSize(size);
    const modelScale = 4.1 / Math.max(size.x, size.y, size.z);

    const sampler = new MeshSurfaceSampler(new THREE.Mesh(geom)).build();

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const p = new THREE.Vector3();

    // several lesions on clearly distinct lobes (well separated), with varied sizes
    const lesionTargets = [
      { p: new THREE.Vector3(0.45, 0.62, 0.75), scale: 1.15, seed: 0x85ebca6b }, // large · superior-anterior
      { p: new THREE.Vector3(-0.35, 0.05, -1.15), scale: 0.6, seed: 0x1b56c4f9 }, // small · posterior
      { p: new THREE.Vector3(0.7, -0.45, 0.1), scale: 0.92, seed: 0x9e3779b1 }, // medium · inferior-temporal
    ];
    const bestD = lesionTargets.map(() => Infinity);
    const bestC = lesionTargets.map(() => new THREE.Vector3());

    for (let i = 0; i < count; i++) {
      sampler.sample(p);
      p.sub(center).multiplyScalar(modelScale);
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;

      // bright electric blue — low red keeps the dense additive core blue
      const b = 0.76 + hash(i * 3 + 1) * 0.24;
      const white = hash(i * 3 + 2) < 0.04;
      colors[i * 3] = Math.min(1, (white ? 0.85 : 0.16) * b);
      colors[i * 3 + 1] = Math.min(1, (white ? 0.92 : 0.58) * b);
      colors[i * 3 + 2] = Math.min(1, 1.0 * b);

      for (let ti = 0; ti < lesionTargets.length; ti++) {
        const dd = p.distanceToSquared(lesionTargets[ti].p);
        if (dd < bestD[ti]) {
          bestD[ti] = dd;
          bestC[ti].copy(p);
        }
      }
    }
    const tumors = lesionTargets.map((tg, ti) => ({
      center: bestC[ti].multiplyScalar(0.93),
      scale: tg.scale,
      seed: tg.seed,
    }));

    geom.dispose();
    return { positions, colors, tumors, modelScale };
  }, [scene, count]);
}

/* ---------- brain shader (automatic — no pointer highlight) ---------- */
const BRAIN_VERT = /* glsl */ `
  attribute vec3 aColor;
  attribute float aRnd;
  uniform float uTime;
  uniform float uSize;
  uniform float uScale;
  varying vec3 vColor;
  void main() {
    vColor = aColor;
    vec3 p = position;
    float wave = sin(uTime * 0.9 + p.y * 3.0 + p.x * 2.0) * 0.012;
    p += normalize(p + 0.0001) * wave;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float tw = 0.82 + 0.18 * sin(uTime * 1.6 + aRnd * 6.2831);
    gl_PointSize = clamp(uSize * tw * uScale / -mv.z, 0.0, 48.0);
    gl_Position = projectionMatrix * mv;
  }
`;
const BRAIN_FRAG = /* glsl */ `
  uniform sampler2D uTex;
  uniform float uOpacity;
  varying vec3 vColor;
  void main() {
    vec4 tx = texture2D(uTex, gl_PointCoord);
    gl_FragColor = vec4(vColor * 1.18, 1.0) * tx * uOpacity;  // slight glow boost
  }
`;

/** Bright electric-blue point cloud of the real brain surface. */
export function BrainPoints({ positions, colors }: { positions: Float32Array; colors: Float32Array }) {
  const tex = useMemo(() => makeDotTexture(), []);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    const n = positions.length / 3;
    const rnd = new Float32Array(n);
    const hash = (k: number) => {
      let t = (k ^ 0x27d4eb2f) >>> 0;
      t = Math.imul(t ^ (t >>> 15), 1 | t);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    for (let i = 0; i < n; i++) rnd[i] = hash(i);
    g.setAttribute("aRnd", new THREE.BufferAttribute(rnd, 1));
    return g;
  }, [positions, colors]);

  const uniforms = useMemo(
    () => ({
      uTex: { value: tex },
      uTime: { value: 0 },
      uSize: { value: 0.034 },
      uScale: { value: 700 },
      uOpacity: { value: 1 },
    }),
    [tex],
  );

  useFrame((state) => {
    const m = matRef.current;
    if (!m) return;
    const t = state.clock.elapsedTime;
    m.uniforms.uTime.value = t;
    m.uniforms.uScale.value = state.gl.domElement.height * 0.5;
    m.uniforms.uOpacity.value = 0.92 + 0.08 * Math.sin(t * 0.85); // subtle breathing
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={BRAIN_VERT}
        fragmentShader={BRAIN_FRAG}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Tumour / lesion: orange-red cluster + soft halo + low-freq pulse + scan ripple. */
export function TumorCluster({
  center,
  scale = 1,
  phase = 0,
  seed = 0x85ebca6b,
}: {
  center: THREE.Vector3;
  scale?: number;
  phase?: number;
  seed?: number;
}) {
  const ptsMat = useRef<THREE.PointsMaterial>(null);
  const ptsRef = useRef<THREE.Points>(null);
  const haloMat = useRef<THREE.SpriteMaterial>(null);
  const rippleRef = useRef<THREE.Sprite>(null);
  const rippleMat = useRef<THREE.SpriteMaterial>(null);
  const dot = useMemo(() => makeDotTexture(), []);
  const halo = useMemo(() => makeHaloTexture(), []);
  const ring = useMemo(() => makeRingTexture(), []);

  const geometry = useMemo(() => {
    const n = 1500;
    const pos = new Float32Array(n * 3);
    const col = new Float32Array(n * 3);
    const hash = (k: number) => {
      let t = (k ^ seed) >>> 0;
      t = Math.imul(t ^ (t >>> 15), 1 | t);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const gauss = (seed: number) => {
      const u = Math.max(hash(seed), 1e-6);
      const v = hash(seed + 1);
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    };
    for (let i = 0; i < n; i++) {
      const x = gauss(i * 6) * 0.17;
      const y = gauss(i * 6 + 2) * 0.15;
      const z = gauss(i * 6 + 4) * 0.16;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      const r = Math.hypot(x / 0.17, y / 0.15, z / 0.16);
      const b = Math.max(0.34, 0.92 - r * 0.5);
      col[i * 3] = Math.min(1, 0.95 * b);
      col[i * 3 + 1] = Math.min(1, 0.38 * b);
      col[i * 3 + 2] = Math.min(1, 0.16 * b);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    return g;
  }, [seed]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime + phase; // per-lesion offset so they don't sync
    const pulse = 0.5 + 0.5 * Math.sin(t * 1.4); // low-frequency
    if (ptsRef.current) ptsRef.current.scale.setScalar(1 + 0.06 * Math.sin(t * 1.4));
    if (ptsMat.current) ptsMat.current.opacity = 0.6 + 0.35 * pulse;
    if (haloMat.current) haloMat.current.opacity = 0.18 + 0.27 * pulse;
    // slow expanding scan ripple (loops, fades out as it grows)
    const period = 4.6;
    const frac = (t % period) / period;
    const sc = 0.55 + frac * 1.5;
    if (rippleRef.current) rippleRef.current.scale.set(sc, sc, sc);
    if (rippleMat.current) rippleMat.current.opacity = 0.5 * (1 - frac);
  });

  return (
    <group position={center} scale={scale}>
      {/* soft red halo (always faces camera) */}
      <sprite scale={[0.95, 0.95, 1]}>
        <spriteMaterial
          ref={haloMat}
          map={halo}
          color="#ff5a36"
          transparent
          opacity={0.3}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
      {/* expanding scan ripple */}
      <sprite ref={rippleRef} scale={[0.6, 0.6, 1]}>
        <spriteMaterial
          ref={rippleMat}
          map={ring}
          color="#ff7a4d"
          transparent
          opacity={0.4}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
      {/* the granular lesion cluster */}
      <points ref={ptsRef} geometry={geometry}>
        <pointsMaterial
          ref={ptsMat}
          size={0.055 * scale}
          map={dot}
          vertexColors
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
