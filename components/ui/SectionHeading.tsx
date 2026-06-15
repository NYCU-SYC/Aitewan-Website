import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  titleEn,
  description,
  align = "left",
  tone = "light",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  titleEn?: string;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  const isCenter = align === "center";
  const dark = tone === "dark";
  return (
    <div
      className={`${isCenter ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      {eyebrow && (
        <div className={`mb-4 flex ${isCenter ? "justify-center" : ""}`}>
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] ${
              dark
                ? "border-white/20 bg-white/[0.06] text-accent-300"
                : "border-accent-200 bg-accent-50/60 text-accent-800"
            }`}
          >
            <span
              className={`dot-pulse h-1.5 w-1.5 rounded-full ${
                dark ? "bg-accent-300" : "bg-accent-500"
              }`}
            />
            {eyebrow}
          </span>
        </div>
      )}
      <h2
        className={`text-2xl font-semibold leading-tight sm:text-3xl lg:text-[2.1rem] ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {titleEn && (
        <p
          className={`mt-1.5 text-sm font-medium ${dark ? "text-brand-200" : "text-ink-muted"}`}
        >
          {titleEn}
        </p>
      )}
      {description && (
        <p
          className={`mt-4 text-[0.975rem] leading-relaxed ${dark ? "text-brand-100/85" : "text-ink-soft"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
