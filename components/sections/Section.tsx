import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type Bg = "white" | "soft" | "muted" | "dark";

/**
 * Section wrapper. Light variants are translucent so the page-wide SiteBackground
 * (gradient + grid + glow) flows through, giving every section shared depth and
 * continuity rather than flat white blocks. Dark sections are opaque and carry
 * their own treatment.
 */
const bgMap: Record<Bg, string> = {
  white: "", // transparent → reveals the site background canvas
  soft: "bg-surface-soft/70",
  muted: "bg-surface-muted/75",
  dark: "bg-brand-950 text-white",
};

export function Section({
  id,
  bg = "white",
  size = "default",
  className = "",
  children,
}: {
  id?: string;
  bg?: Bg;
  size?: "default" | "narrow" | "wide";
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-20 py-16 sm:py-20 ${bgMap[bg]} ${className}`}
    >
      <Container size={size}>{children}</Container>
    </section>
  );
}
