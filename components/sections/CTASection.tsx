import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

type CTA = { label: string; href: string };

export function CTASection({
  eyebrow = "Contact AItewan",
  title,
  description,
  primary,
  secondary = [],
}: {
  eyebrow?: string;
  title: string;
  description: string;
  primary: CTA;
  secondary?: CTA[];
}) {
  return (
    <section className="relative overflow-hidden bg-brand-950 py-16 sm:py-20">
      <div aria-hidden className="absolute inset-0 medical-grid opacity-[0.15]" />
      {/* travelling light beam along the top edge */}
      <span
        aria-hidden
        className="anim-beam absolute top-0 h-px w-[30%] bg-gradient-to-r from-transparent via-accent-300/90 to-transparent"
      />
      <div
        aria-hidden
        className="anim-drift absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-accent-500/20 blur-3xl"
      />
      <div
        aria-hidden
        className="anim-drift-slow absolute -right-10 -top-10 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl"
      />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-accent-300">
              <Icon name="mail" size={13} />
              {eyebrow}
            </span>
          </div>
          <h2 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-[0.975rem] leading-relaxed text-brand-100/85">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={primary.href} variant="accent" size="lg" arrow>
              {primary.label}
            </Button>
            {secondary.map((s) => (
              <Button key={s.href + s.label} href={s.href} variant="outline" size="lg">
                {s.label}
              </Button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
