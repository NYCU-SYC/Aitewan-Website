import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";

/**
 * Shared subpage hero — a premium dark medical-tech band that matches the
 * homepage hero language (navy gradient + scan-grid + aurora glow + gradient
 * hairline), so every subpage opens with the same high-end, on-brand feel and a
 * consistent dark-hero → light-body rhythm. Server component; entrance + glow
 * are CSS-only and reduced-motion-gated.
 */
export function PageHero({
  eyebrow,
  title,
  titleEn,
  description,
  badges,
  children,
}: {
  eyebrow: string;
  title: string;
  titleEn?: string;
  description?: ReactNode;
  badges?: { icon: IconName; label: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="hero-aurora relative isolate overflow-hidden bg-brand-950 text-white">
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-gradient-to-b from-[#081227] via-brand-950 to-brand-900"
      />
      <div
        aria-hidden
        className="scan-grid absolute inset-0 -z-10 opacity-50 [mask-image:radial-gradient(ellipse_82%_72%_at_50%_28%,#000_30%,transparent_82%)]"
      />
      <div aria-hidden className="gradient-rule absolute inset-x-0 top-0" />

      <Container className="py-16 sm:py-20">
        <div className="anim-rise max-w-3xl">
          <div className="mb-4 flex">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-300/30 bg-white/[0.06] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-accent-200 backdrop-blur-sm">
              <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-accent-400" />
              {eyebrow}
            </span>
          </div>

          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.8rem]">
            {title}
          </h1>

          {titleEn && <p className="mt-2 text-base font-medium text-brand-200">{titleEn}</p>}

          {description && (
            <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-brand-100/85">
              {description}
            </p>
          )}

          {badges && badges.length > 0 && (
            <ul className="mt-7 flex flex-wrap gap-2.5">
              {badges.map((b) => (
                <li
                  key={b.label}
                  className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-brand-100/90"
                >
                  <Icon name={b.icon} size={14} className="text-accent-300" />
                  {b.label}
                </li>
              ))}
            </ul>
          )}

          {children && <div className="mt-7">{children}</div>}
        </div>
      </Container>

      <div aria-hidden className="gradient-rule absolute inset-x-0 bottom-0 opacity-60" />
    </section>
  );
}
