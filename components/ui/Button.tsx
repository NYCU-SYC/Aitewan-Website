import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icon";

type Variant = "primary" | "accent" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-b from-brand-600 to-brand-800 text-white shadow-sm shadow-brand-900/10 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-700/30",
  accent:
    "bg-gradient-to-b from-accent-500 to-accent-700 text-white shadow-sm hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent-600/30",
  secondary:
    "bg-white text-brand-700 ring-1 ring-line-strong hover:-translate-y-0.5 hover:ring-brand-300 hover:bg-brand-50 hover:shadow-md hover:shadow-brand-900/5",
  outline:
    "bg-transparent text-white ring-1 ring-white/40 hover:bg-white/10 hover:ring-white/70",
  ghost: "bg-transparent text-brand-700 hover:bg-brand-50",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-12 px-6 text-base",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
}) {
  const cls = `button-shine group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-none ${variants[variant]} ${sizes[size]} ${className}`;
  const external = href.startsWith("http") || href.startsWith("mailto:");

  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <Icon
          name="arrowRight"
          size={18}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  if (external) {
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
