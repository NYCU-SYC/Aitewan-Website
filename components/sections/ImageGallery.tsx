"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";

export type GalleryItem = { src: string; caption: string; alt?: string };

/**
 * Accessible, reusable image gallery with a keyboard-operable lightbox
 * (Esc to close, ← / → to navigate). Used for the patent certificate wall and
 * the events / exhibition gallery. Each tile is a real <button> so the gallery
 * is fully keyboard navigable; the close control is labelled.
 */
export function ImageGallery({
  items,
  columns = 3,
  aspect = "portrait",
  closeLabel = "Close",
}: {
  items: GalleryItem[];
  columns?: 2 | 3 | 4;
  aspect?: "portrait" | "landscape" | "square";
  closeLabel?: string;
}) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (active === null) return;
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i === null ? null : (i + 1) % items.length));
      if (e.key === "ArrowLeft") setActive((i) => (i === null ? null : (i - 1 + items.length) % items.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, items.length]);

  useEffect(() => {
    document.body.style.overflow = active !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  const colCls = columns === 4 ? "sm:grid-cols-3 lg:grid-cols-4" : columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";
  const aspectCls = aspect === "landscape" ? "aspect-[4/3]" : aspect === "square" ? "aspect-square" : "aspect-[3/4]";

  return (
    <div>
      <div className={`grid grid-cols-1 gap-4 ${colCls}`}>
        {items.map((item, i) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setActive(i)}
            className="group relative overflow-hidden rounded-2xl border border-line bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-900/5"
          >
            <div className={`relative flex ${aspectCls} items-center justify-center overflow-hidden bg-gradient-to-br from-surface-soft to-white`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.alt ?? item.caption}
                loading="lazy"
                decoding="async"
                className={`${aspect === "portrait" ? "max-h-[94%] w-auto object-contain" : "h-full w-full object-cover"} transition-transform duration-300 group-hover:scale-[1.03]`}
              />
              <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[0.6rem] font-medium text-brand-700 opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100">
                <Icon name="external" size={11} />
              </span>
            </div>
            <p className="px-4 py-3 text-xs font-medium leading-snug text-ink-soft">{item.caption}</p>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && items[active] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={items[active].caption}
          >
            <div className="absolute inset-0 bg-brand-950/80 backdrop-blur-sm" />
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label={closeLabel}
              className="absolute right-4 top-4 z-20 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            >
              <Icon name="close" size={22} />
            </button>
            <motion.figure
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 flex max-h-[88vh] w-full max-w-4xl flex-col items-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={items[active].src}
                alt={items[active].alt ?? items[active].caption}
                className="max-h-[78vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
              />
              <figcaption className="mt-4 max-w-2xl rounded-full bg-white/10 px-4 py-1.5 text-center text-sm text-white backdrop-blur">
                {items[active].caption}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
