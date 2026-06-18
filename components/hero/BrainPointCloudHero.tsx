"use client";

import * as THREE from "three";
import { Component, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useProgress } from "@react-three/drei";
import { useBrainData, BrainPoints, TumorCluster } from "./BrainPointCloud";
import { Starfield } from "./Starfield";
import { assetPath } from "@/lib/asset-path";
import { signalHeroReady } from "@/lib/heroReady";

const MODEL_PATH = assetPath("/models/brain.glb");

/* ---------- rotating brain group (auto-rotate + pointer parallax + float) ---------- */
function BrainScene({ count, offsetX }: { count: number; offsetX: number }) {
  const data = useBrainData(count);
  const g = useRef<THREE.Group>(null);
  const t0 = useRef<number | null>(null);
  const readyFired = useRef(false);

  useFrame((state, delta) => {
    // The model has loaded, been sampled and is now painting its first frame —
    // tell the preloader it can reveal the page.
    if (!readyFired.current) {
      readyFired.current = true;
      signalHeroReady();
    }

    const grp = g.current;
    if (!grp) return;
    // smooth entrance: scale + fade-rotate in over ~1.6s
    if (t0.current === null) t0.current = state.clock.elapsedTime;
    const intro = Math.min(1, (state.clock.elapsedTime - t0.current) / 1.6);
    const ease = 1 - Math.pow(1 - intro, 3);
    const breathe = 1 + 0.014 * Math.sin(state.clock.elapsedTime * 0.8); // breathing glow
    grp.scale.setScalar((0.88 + 0.12 * ease) * breathe);

    grp.rotation.y += delta * 0.2; // auto-rotation (lateral → front → back)
    const px = state.pointer.x;
    const py = state.pointer.y;
    grp.rotation.x += (-py * 0.16 - grp.rotation.x) * 0.05; // tilt toward cursor
    grp.position.x += (offsetX + px * 0.12 - grp.position.x) * 0.05; // parallax
    grp.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.05; // float
  });

  return (
    <group ref={g} position={[offsetX, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
      <BrainPoints positions={data.positions} colors={data.colors} />
      {data.tumors.map((tm, i) => (
        <TumorCluster key={i} center={tm.center} scale={tm.scale} seed={tm.seed} phase={i * 1.7} />
      ))}
    </group>
  );
}

/* ---------- MRI scan sweep — a soft glowing slice that travels through the brain ---------- */
function scanTexture() {
  const s = 128;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(150,235,255,0.5)");
  g.addColorStop(0.5, "rgba(90,190,255,0.2)");
  g.addColorStop(0.84, "rgba(120,222,255,0.34)"); // brighter rim → scan-ring read
  g.addColorStop(1, "rgba(80,150,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const t = new THREE.CanvasTexture(c);
  t.needsUpdate = true;
  return t;
}

function ScanSweep({ offsetX }: { offsetX: number }) {
  const ref = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const tex = useMemo(() => scanTexture(), []);
  useFrame(({ clock }) => {
    const period = 5.5;
    const t = (clock.elapsedTime % period) / period; // 0..1 axial sweep
    if (ref.current) ref.current.position.y = -1.9 + t * 3.8;
    if (matRef.current) matRef.current.opacity = 0.22 * Math.sin(t * Math.PI); // fade at ends
  });
  return (
    <group ref={ref} position={[offsetX, 0, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.1, 72]} />
        <meshBasicMaterial
          ref={matRef}
          map={tex}
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          fog={false}
        />
      </mesh>
    </group>
  );
}

/* ---------- DOM overlays ---------- */
function LoadingOverlay() {
  const { active, progress } = useProgress();
  if (!active) return null;
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-sm">
        <span className="dot-pulse h-2 w-2 rounded-full bg-accent-400" />
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-brand-200/80">
          載入 3D 腦部模型 · {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}

function MissingModel() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center p-6">
      <div className="max-w-md rounded-2xl border border-caution-red/40 bg-caution-red/10 p-5 text-center">
        <p className="text-sm font-semibold text-white">無法載入 3D 腦部模型</p>
        <p className="mt-2 text-xs leading-relaxed text-brand-100/80">
          找不到模型檔案 <code className="font-mono text-accent-200">/public/models/brain.glb</code>
          。請確認檔案已放置於該路徑（程式由 <code className="font-mono text-accent-200">/models/brain.glb</code> 載入），未使用任何替代幾何。
        </p>
      </div>
    </div>
  );
}

class ModelErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

/* ---------- hero canvas ---------- */
export function BrainPointCloudHero() {
  const [status, setStatus] = useState<"checking" | "ok" | "missing">("checking");
  const [shown, setShown] = useState(false);

  // pre-check the model so we can show a clear message if it is missing — but
  // only treat an explicit 404 as missing (a flaky HEAD must not hide a present
  // model; genuine load failures are still caught by the error boundary). There
  // is never a procedural fallback.
  useEffect(() => {
    let alive = true;
    fetch(MODEL_PATH, { method: "HEAD" })
      .then((r) => {
        if (!alive) return;
        setStatus(r.status === 404 ? "missing" : "ok");
      })
      .catch(() => alive && setStatus("ok"));
    return () => {
      alive = false;
    };
  }, []);

  // fade the canvas in once mounted (entrance)
  useEffect(() => {
    if (status !== "ok") return;
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, [status]);

  // if the model is missing there will be no first frame to wait on — release
  // the preloader so it never hangs on the loading screen.
  useEffect(() => {
    if (status === "missing") signalHeroReady();
  }, [status]);

  const { count, offsetX, starDensity } = useMemo(() => {
    if (typeof window === "undefined") return { count: 160000, offsetX: 0.6, starDensity: 2 };
    const w = window.innerWidth;
    if (w < 768) return { count: 90000, offsetX: 0, starDensity: 1.1 };
    if (w < 1100) return { count: 160000, offsetX: 0.35, starDensity: 1.6 };
    return { count: 230000, offsetX: 0.6, starDensity: 2 };
  }, []);

  if (status === "missing") return <MissingModel />;

  return (
    <div className="absolute inset-0">
      <LoadingOverlay />
      {status === "ok" && (
        <ModelErrorBoundary onError={() => setStatus("missing")}>
          <div
            className="h-full w-full transition-opacity duration-[1200ms] ease-out"
            style={{ opacity: shown ? 1 : 0 }}
          >
            <Canvas
              dpr={[1, 1.8]}
              gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
              camera={{ position: [0, 0.2, 6.7], fov: 32 }}
            >
              <fogExp2 attach="fog" args={["#060f2b", 0.018]} />
              <Starfield density={starDensity} />
              <Suspense fallback={null}>
                <BrainScene count={count} offsetX={offsetX} />
                <ScanSweep offsetX={offsetX} />
              </Suspense>
            </Canvas>
          </div>
        </ModelErrorBoundary>
      )}
    </div>
  );
}

export default BrainPointCloudHero;
