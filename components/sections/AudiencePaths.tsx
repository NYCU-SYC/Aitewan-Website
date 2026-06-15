import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { audiencePaths, type AudiencePath } from "@/data/home";
import { localizeHref, type Locale } from "@/lib/i18n";

const audiencePathsEn: AudiencePath[] = [
  {
    icon: "hospital",
    audience: "Hospitals & Clinical Teams",
    audienceEn: "Hospitals & Clinical Teams",
    blurb: "Adopt AI-assisted brain tumor contouring and connect it to existing PACS / TPS and radiotherapy planning workflows.",
    href: "/zh-TW/clinical-workflow",
    cta: "Explore clinical workflow integration",
  },
  {
    icon: "compliance",
    audience: "Medical AI / SaMD Teams",
    audienceEn: "Medical AI / SaMD Teams",
    blurb: "Practical TFDA, FDA 510(k), ISO 13485, cybersecurity and clinical-validation submission support.",
    href: "/zh-TW/samd-services",
    cta: "Explore SaMD consulting",
  },
  {
    icon: "chart",
    audience: "Investors & Partners",
    audienceEn: "Investors & Partners",
    blurb: "Understand the company positioning, regulatory milestones, awards and patent portfolio.",
    href: "/zh-TW/about",
    cta: "Learn about AItewan",
  },
  {
    icon: "research",
    audience: "Researchers & Clinicians",
    audienceEn: "Researchers & Clinicians",
    blurb: "Browse peer-reviewed work on brain tumor AI, MRI segmentation and radiotherapy-related research.",
    href: "/zh-TW/research-publications",
    cta: "View publications",
  },
];

export function AudiencePaths({ locale = "zh-TW" }: { locale?: Locale }) {
  const items = locale === "en" ? audiencePathsEn : audiencePaths;
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((p, i) => (
        <Reveal key={p.href} delay={(i % 4) * 0.07}>
          <Link
            href={localizeHref(p.href, locale)}
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-900/5"
          >
            <span aria-hidden className="card-accent" />
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-accent-50 text-brand-700 transition-colors group-hover:bg-gradient-to-br group-hover:from-brand-700 group-hover:to-accent-700 group-hover:text-white">
              <Icon name={p.icon} size={22} />
            </div>
            <p className="mt-4 text-[0.7rem] font-semibold uppercase tracking-wider text-accent-700">
              {p.audienceEn}
            </p>
            <h3 className="mt-0.5 text-base font-semibold text-ink">{p.audience}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{p.blurb}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700">
              {p.cta}
              <Icon
                name="arrowRight"
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
