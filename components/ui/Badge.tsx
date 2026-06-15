import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

export function Badge({
  children,
  icon,
  tone = "default",
  className = "",
}: {
  children: ReactNode;
  icon?: IconName;
  tone?: "default" | "accent" | "muted" | "onDark";
  className?: string;
}) {
  const tones = {
    default: "bg-brand-50 text-brand-800 ring-1 ring-brand-100",
    accent: "bg-accent-50 text-accent-800 ring-1 ring-accent-100",
    muted: "bg-surface-muted text-ink-soft ring-1 ring-line",
    onDark: "bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-sm",
  } as const;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${tones[tone]} ${className}`}
    >
      {icon && <Icon name={icon} size={14} className="shrink-0" />}
      {children}
    </span>
  );
}
