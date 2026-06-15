"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";

const emptySubscribe = () => () => {};

/**
 * Hydration-safe reduced-motion flag.
 *
 * `useReducedMotion()` is `false` during SSR but may be `true` on the client's
 * first render (OS「減少動態」), which makes any `reduce ? A : B` branch in
 * rendered markup a hydration mismatch. This hook reports `false` during the
 * hydration render (matching the server snapshot), then the real preference —
 * so it is safe for conditional RENDERING. For animation TIMING (transition
 * objects, which never serialize into DOM), plain `useReducedMotion()` is fine.
 */
export function useReducedMotionSafe() {
  const reduce = useReducedMotion();
  const hydrated = useSyncExternalStore(
    emptySubscribe,
    () => true, // client snapshot (post-hydration)
    () => false // server snapshot
  );
  return hydrated ? !!reduce : false;
}
