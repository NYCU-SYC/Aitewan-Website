"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "./Icon";
import { assetPath } from "@/lib/asset-path";

/**
 * Lightweight YouTube embed (facade pattern): shows a poster image + play
 * affordance, and only loads the (privacy-enhanced) iframe on click — keeps the
 * hero/demo sections fast and avoids loading third-party scripts up front.
 */
export function YouTubeFacade({
  videoId,
  poster,
  title,
  className = "",
}: {
  videoId: string;
  poster: string;
  title: string;
  className?: string;
}) {
  const [active, setActive] = useState(false);

  return (
    <div
      className={`group relative aspect-video overflow-hidden rounded-2xl border border-line bg-brand-950 shadow-xl shadow-brand-900/15 ${className}`}
    >
      {active ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerated-encoder; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={`播放影片：${title}`}
          className="absolute inset-0 h-full w-full cursor-pointer"
        >
          <Image
            src={assetPath(poster)}
            alt={title}
            fill
            sizes="(min-width: 1024px) 900px, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-brand-950/10 transition-colors group-hover:bg-brand-950/0" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-700 shadow-lg ring-1 ring-white/60 transition-transform duration-300 group-hover:scale-110">
            <Icon name="play" size={28} className="translate-x-0.5" />
          </span>
        </button>
      )}
    </div>
  );
}
