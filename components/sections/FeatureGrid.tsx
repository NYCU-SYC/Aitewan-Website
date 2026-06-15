import { FeatureCard } from "@/components/cards/FeatureCard";
import { Reveal } from "@/components/ui/Reveal";
import type { Feature } from "@/data/product";

export function FeatureGrid({ features }: { features: Feature[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((f, i) => (
        <Reveal key={f.titleEn ?? f.title} delay={(i % 3) * 0.08}>
          <FeatureCard
            icon={f.icon}
            title={f.title}
            titleEn={f.titleEn}
            body={f.body}
          />
        </Reveal>
      ))}
    </div>
  );
}
