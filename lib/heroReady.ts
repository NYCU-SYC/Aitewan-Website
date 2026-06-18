/**
 * Tiny coordination signal between the WebGL hero (which is slow to load — it
 * downloads /models/brain.glb and samples up to 230k points) and the
 * full-screen <HeroPreloader/>.
 *
 * The brain calls `signalHeroReady()` once it has rendered its first frame (or
 * if the model is missing / errors). The preloader listens for that signal and
 * fades out. A persisted flag covers the race where the brain becomes ready
 * *before* the preloader has attached its listener (e.g. a warm model cache, or
 * an SPA navigation back to the home page).
 */
export const HERO_READY_EVENT = "aitewan:hero-ready";

declare global {
  interface Window {
    __aitewanHeroReady?: boolean;
  }
}

/** Mark the hero as loaded and notify any listening preloader. Idempotent. */
export function signalHeroReady(): void {
  if (typeof window === "undefined") return;
  window.__aitewanHeroReady = true;
  window.dispatchEvent(new Event(HERO_READY_EVENT));
}

/** Whether the hero already signalled ready (handles the listen-too-late race). */
export function isHeroReady(): boolean {
  return typeof window !== "undefined" && window.__aitewanHeroReady === true;
}
