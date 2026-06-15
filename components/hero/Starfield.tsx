"use client";

import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

/**
 * Starfield — a dense, flowing deep-space stardust cosmos behind the brain.
 *
 * Two GPU-animated layers (a deep far field + a closer near field) of many
 * fine blue/white particles. In the vertex shader each particle slowly streams
 * out of the depth toward the viewer (wrapping), gently sways, and twinkles —
 * giving a rich, layered, "snowfall of stardust" feel with real spatial depth.
 * Sizes/speeds/brightness vary per particle. A wrapping group adds pointer
 * parallax. All motion is on the GPU, so even tens of thousands of particles
 * stay cheap. Fog-exempt so distant stars stay crisp.
 */

function softDot() {
  const s = 32;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.4, "rgba(225,238,255,0.6)");
  g.addColorStop(1, "rgba(150,190,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const t = new THREE.CanvasTexture(c);
  t.needsUpdate = true;
  return t;
}

function makeField(count: number, rx: number, ry: number, zNear: number, zFar: number, seed: number) {
  const hash = (n: number) => {
    let t = (n ^ seed) >>> 0;
    t = Math.imul(t ^ (t >>> 15), 1 | t);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const pos = new Float32Array(count * 3);
  const aColor = new Float32Array(count * 3);
  const aSpeed = new Float32Array(count);
  const aPhase = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (hash(i * 4) * 2 - 1) * rx;
    pos[i * 3 + 1] = (hash(i * 4 + 1) * 2 - 1) * ry;
    pos[i * 3 + 2] = zNear + (zFar - zNear) * hash(i * 4 + 2);
    aSpeed[i] = 0.2 + hash(i * 4 + 3) * 0.8;
    aPhase[i] = hash(i * 5 + 7);
    const white = hash(i * 11 + 2) < 0.5;
    const b = 0.55 + 0.45 * hash(i * 7 + 5);
    aColor[i * 3] = Math.min(1, (white ? 1.0 : 0.4) * b);
    aColor[i * 3 + 1] = Math.min(1, (white ? 1.0 : 0.72) * b);
    aColor[i * 3 + 2] = b;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  g.setAttribute("aColor", new THREE.BufferAttribute(aColor, 3));
  g.setAttribute("aSpeed", new THREE.BufferAttribute(aSpeed, 1));
  g.setAttribute("aPhase", new THREE.BufferAttribute(aPhase, 1));
  return g;
}

const STAR_VERT = /* glsl */ `
  attribute vec3 aColor;
  attribute float aSpeed;
  attribute float aPhase;
  uniform float uTime;
  uniform float uSize;
  uniform float uScale;
  uniform float uZNear;
  uniform float uZFar;
  uniform float uFlow;
  varying vec3 vColor;
  varying float vTw;
  void main() {
    vColor = aColor;
    float range = uZFar - uZNear;
    float zz = position.z + uTime * uFlow * (0.4 + aSpeed);  // stream toward viewer
    zz = uZNear + mod(zz - uZNear, range);                   // wrap
    float sway = sin(uTime * 0.18 + aPhase * 6.2831) * 0.6;
    float bob = cos(uTime * 0.13 + aPhase * 5.0) * 0.45;
    vec3 p = vec3(position.x + sway, position.y + bob, zz);
    float tw = 0.5 + 0.5 * sin(uTime * (0.7 + aSpeed * 1.4) + aPhase * 6.2831);
    vTw = 0.45 + 0.55 * tw;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float sz = uSize * (0.5 + aSpeed) * (0.7 + 0.5 * tw);
    gl_PointSize = clamp(sz * uScale / -mv.z, 0.0, 26.0);
    gl_Position = projectionMatrix * mv;
  }
`;
const STAR_FRAG = /* glsl */ `
  uniform sampler2D uTex;
  varying vec3 vColor;
  varying float vTw;
  void main() {
    vec4 t = texture2D(uTex, gl_PointCoord);
    gl_FragColor = vec4(vColor * vTw, 1.0) * t;
  }
`;

function useStarUniforms(tex: THREE.Texture, uSize: number, zNear: number, zFar: number, uFlow: number) {
  return useMemo(
    () => ({
      uTex: { value: tex },
      uTime: { value: 0 },
      uSize: { value: uSize },
      uScale: { value: 700 },
      uZNear: { value: zNear },
      uZFar: { value: zFar },
      uFlow: { value: uFlow },
    }),
    [tex, uSize, zNear, zFar, uFlow],
  );
}

export function Starfield({ density = 1 }: { density?: number }) {
  const tex = useMemo(() => softDot(), []);
  const far = useMemo(() => makeField(Math.round(15400 * density), 36, 24, -46, -3, 0x9e3779b9), [density]);
  const near = useMemo(() => makeField(Math.round(4200 * density), 18, 12, -12, 1.5, 0x85ebca6b), [density]);
  const uFar = useStarUniforms(tex, 0.075, -46, -3, 0.8);
  const uNear = useStarUniforms(tex, 0.14, -12, 1.5, 1.6);
  const fMat = useRef<THREE.ShaderMaterial>(null);
  const nMat = useRef<THREE.ShaderMaterial>(null);
  const grp = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const h = state.gl.domElement.height * 0.5;
    if (fMat.current) {
      fMat.current.uniforms.uTime.value = t;
      fMat.current.uniforms.uScale.value = h;
    }
    if (nMat.current) {
      nMat.current.uniforms.uTime.value = t;
      nMat.current.uniforms.uScale.value = h;
    }
    if (grp.current) {
      grp.current.rotation.y += (state.pointer.x * 0.12 - grp.current.rotation.y) * 0.03;
      grp.current.rotation.x += (state.pointer.y * 0.08 - grp.current.rotation.x) * 0.03;
    }
  });

  return (
    <group ref={grp}>
      <points geometry={far}>
        <shaderMaterial
          ref={fMat}
          uniforms={uFar}
          vertexShader={STAR_VERT}
          fragmentShader={STAR_FRAG}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          fog={false}
        />
      </points>
      <points geometry={near}>
        <shaderMaterial
          ref={nMat}
          uniforms={uNear}
          vertexShader={STAR_VERT}
          fragmentShader={STAR_FRAG}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          fog={false}
        />
      </points>
    </group>
  );
}
