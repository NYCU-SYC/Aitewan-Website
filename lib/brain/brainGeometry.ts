/**
 * Procedural 3D point-cloud brain geometry.
 *
 * The shape is built from a small set of overlapping ellipsoidal "lobes"
 * (cerebrum hemispheres, temporal lobes, cerebellum, brainstem) combined
 * with a midline longitudinal fissure. This produces a silhouette that
 * reads as a human brain from any rotation, rather than a sphere/blob.
 *
 * Coordinate convention (normalized, roughly [-1, 1]):
 *  - x: left / right (hemisphere split at x = 0)
 *  - y: up / down
 *  - z: front (anterior, +z) / back (posterior, -z)
 */

export type BrainPointCloud = {
  positions: Float32Array;
  colors: Float32Array;
  sizes: Float32Array;
  alphas: Float32Array;
  count: number;
};

export type LesionCluster = {
  /** Normalized center position inside the brain volume. */
  center: [number, number, number];
  /** Spread radius of the cluster. */
  radius: number;
  /** Approx particle count for this cluster. */
  count: number;
};

/** Anatomically-plausible lesion locations, all comfortably inside the brain volume. */
export const LESION_CLUSTERS: LesionCluster[] = [
  { center: [0.33, 0.16, 0.42], radius: 0.085, count: 90 }, // right frontal
  { center: [-0.36, 0.2, -0.12], radius: 0.075, count: 70 }, // left parietal
  { center: [0.4, -0.28, 0.16], radius: 0.06, count: 55 }, // right temporal
];

const BOUNDS = {
  x: 0.84,
  yMin: -0.94,
  yMax: 0.68,
  zMin: -0.86,
  zMax: 1.08,
};

/**
 * Implicit "inside brain" test combining several ellipsoidal lobes.
 */
function insideBrain(x: number, y: number, z: number): boolean {
  const hx = Math.abs(x);

  // Cerebrum — main cortical mass. Slightly rounder frontal pole (+z)
  // than occipital pole (-z), matching real anatomy.
  const zRad = z >= 0 ? 0.97 : 0.8;
  const cerebrum = (hx / 0.6) ** 2 + ((y - 0.06) / 0.5) ** 2 + (z / zRad) ** 2;

  // Temporal lobes — bulge laterally + inferiorly, slightly anterior.
  const temporal = ((hx - 0.4) / 0.3) ** 2 + ((y + 0.36) / 0.32) ** 2 + ((z - 0.08) / 0.58) ** 2;

  // Cerebellum — posterior-inferior lobes either side of midline.
  const cerebellum = ((hx - 0.14) / 0.28) ** 2 + ((y + 0.52) / 0.24) ** 2 + ((z + 0.58) / 0.36) ** 2;

  // Brainstem — narrow midline column extending down.
  const stem = (hx / 0.09) ** 2 + ((y + 0.66) / 0.3) ** 2 + (z / 0.16) ** 2;

  const inside = cerebrum <= 1 || temporal <= 1 || cerebellum <= 1 || stem <= 1;
  if (!inside) return false;

  // Longitudinal fissure: thin midline gap separating the hemispheres,
  // widening slightly toward the vertex.
  if (y > -0.1 && z > -0.5) {
    const gap = 0.045 + 0.05 * Math.max(0, y);
    if (hx < gap) return false;
  }

  return true;
}

/** Cortical-fold style noise used purely for surface shading variation. */
function foldNoise(x: number, y: number, z: number): number {
  const a = Math.sin(x * 14 + z * 9) * Math.cos(y * 11 - x * 5);
  const b = Math.sin(z * 17 + y * 6 - x * 3);
  return (a * 0.6 + b * 0.4 + 1) / 2; // 0..1
}

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/** Simple deterministic PRNG (mulberry32) so the cloud is stable across renders. */
function makeRng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const CORE_COLOR = [0.16, 0.38, 0.92];
const SURFACE_COLOR = [0.46, 0.93, 1.0];

/**
 * Generate the main blue/cyan brain point cloud.
 * Surface ("cortex") points are brighter and slightly larger; interior
 * points are softer, dimmer and more transparent, giving real depth.
 */
export function generateBrainPointCloud(count: number, seed = 7): BrainPointCloud {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const alphas = new Float32Array(count);

  const rand = makeRng(seed);

  let i = 0;
  let guard = 0;
  while (i < count && guard < count * 60) {
    guard += 1;
    const x = (rand() * 2 - 1) * BOUNDS.x;
    const y = BOUNDS.yMin + rand() * (BOUNDS.yMax - BOUNDS.yMin);
    const z = BOUNDS.zMin + rand() * (BOUNDS.zMax - BOUNDS.zMin);

    if (!insideBrain(x, y, z)) continue;

    // Near-surface test: shrink the shape slightly outward; if the point
    // no longer fits, it sits within the outer cortical shell.
    const isSurface = !insideBrain(x / 0.9, y / 0.9, z / 0.9);
    const fold = foldNoise(x, y, z);
    const depth = (z - BOUNDS.zMin) / (BOUNDS.zMax - BOUNDS.zMin); // 0 back -> 1 front

    const idx3 = i * 3;
    positions[idx3] = x;
    positions[idx3 + 1] = y;
    positions[idx3 + 2] = z;

    const mixAmount = isSurface ? 0.55 + fold * 0.35 : 0.08 + fold * 0.14;
    const brightness = isSurface ? 0.78 + fold * 0.22 : 0.34 + fold * 0.18 + depth * 0.12;

    colors[idx3] = mix(CORE_COLOR[0], SURFACE_COLOR[0], mixAmount) * brightness;
    colors[idx3 + 1] = mix(CORE_COLOR[1], SURFACE_COLOR[1], mixAmount) * brightness;
    colors[idx3 + 2] = mix(CORE_COLOR[2], SURFACE_COLOR[2], mixAmount) * brightness;

    sizes[i] = isSurface ? 2.0 + depth * 1.1 : 1.0 + depth * 0.7;
    alphas[i] = isSurface ? 0.55 + depth * 0.3 : 0.1 + depth * 0.22;

    i += 1;
  }

  const actual = i;
  return {
    positions: positions.subarray(0, actual * 3) as Float32Array,
    colors: colors.subarray(0, actual * 3) as Float32Array,
    sizes: sizes.subarray(0, actual) as Float32Array,
    alphas: alphas.subarray(0, actual) as Float32Array,
    count: actual,
  };
}

const LESION_COLOR = [1.0, 0.3, 0.34];

/**
 * Generate small red lesion / tumor-candidate clusters embedded inside the
 * brain volume. Points are Gaussian-distributed around each cluster center
 * and clipped to remain inside the brain shape so they read as embedded,
 * not floating outside the surface.
 */
export function generateLesionPointCloud(clusters: LesionCluster[] = LESION_CLUSTERS, seed = 99): BrainPointCloud {
  const totalCount = clusters.reduce((sum, c) => sum + c.count, 0);
  const positions = new Float32Array(totalCount * 3);
  const colors = new Float32Array(totalCount * 3);
  const sizes = new Float32Array(totalCount);
  const alphas = new Float32Array(totalCount);

  const rand = makeRng(seed);
  let i = 0;

  for (const cluster of clusters) {
    let placed = 0;
    let guard = 0;
    while (placed < cluster.count && guard < cluster.count * 40) {
      guard += 1;
      // Gaussian-ish via sum of uniforms (Irwin-Hall approximation).
      const g1 = (rand() + rand() + rand() - 1.5) / 1.5;
      const g2 = (rand() + rand() + rand() - 1.5) / 1.5;
      const g3 = (rand() + rand() + rand() - 1.5) / 1.5;

      const x = cluster.center[0] + g1 * cluster.radius;
      const y = cluster.center[1] + g2 * cluster.radius;
      const z = cluster.center[2] + g3 * cluster.radius;

      if (!insideBrain(x, y, z)) continue;

      const dist = Math.sqrt(g1 * g1 + g2 * g2 + g3 * g3);
      const core = Math.max(0, 1 - dist * 0.6);

      const idx3 = i * 3;
      positions[idx3] = x;
      positions[idx3 + 1] = y;
      positions[idx3 + 2] = z;

      colors[idx3] = LESION_COLOR[0];
      colors[idx3 + 1] = LESION_COLOR[1] * (0.7 + core * 0.3);
      colors[idx3 + 2] = LESION_COLOR[2] * (0.7 + core * 0.3);

      sizes[i] = 1.6 + core * 1.6;
      alphas[i] = 0.55 + core * 0.4;

      i += 1;
      placed += 1;
    }
  }

  const actual = i;
  return {
    positions: positions.subarray(0, actual * 3) as Float32Array,
    colors: colors.subarray(0, actual * 3) as Float32Array,
    sizes: sizes.subarray(0, actual) as Float32Array,
    alphas: alphas.subarray(0, actual) as Float32Array,
    count: actual,
  };
}
