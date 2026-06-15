"use client";

import dynamic from "next/dynamic";

/**
 * Client-only loader for the WebGL hero (R3F Canvas must not render on the
 * server). The brain point cloud is sampled from /models/brain.glb at runtime.
 */
const BrainPointCloudHero = dynamic(
  () => import("./BrainPointCloudHero").then((m) => m.BrainPointCloudHero),
  { ssr: false },
);

export function BrainHeroClient() {
  return <BrainPointCloudHero />;
}
