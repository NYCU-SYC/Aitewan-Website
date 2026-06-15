import type { Metadata } from "next";
import { getRouteMetadata } from "@/data/route-metadata";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";
import { CTASection } from "@/components/sections/CTASection";
import { milestones } from "@/data/recognition";
import { ctas } from "@/data/site";

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return getRouteMetadata("resources", params);
}

const entries: { icon: IconName; title: string; desc: string; href: string; cta: string }[] = [
  {
    icon: "play",
    title: "影片專區",
    desc: "DeepBT 產品展示影片與媒體採訪。",
    href: "/zh-TW/resources/videos",
    cta: "觀看影片",
  },
  {
    icon: "research",
    title: "學術發表",
    desc: "腦瘤 AI、MRI segmentation 與放射治療相關論文。",
    href: "/zh-TW/research-publications",
    cta: "查看 Publications",
  },
  {
    icon: "file",
    title: "產品資料",
    desc: "DeepBT Detector-Plus 產品與技術說明。",
    href: "/zh-TW/products/deepbt-detector-plus",
    cta: "查看產品",
  },
];

export default async function ResourcesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  void locale;

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="資源中心"
        titleEn="Videos, milestones and resources"
        description="影片展示、公司里程碑與相關資源入口。白皮書與常見問題將於後續階段上線。"
      />
      <Section>
        <div className="grid gap-5 md:grid-cols-3">
          {entries.map((e, i) => (
            <Reveal key={e.href} delay={(i % 3) * 0.07}>
              <Link
                href={e.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg"
              >
                <span aria-hidden className="card-accent" />
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-accent-50 text-brand-700">
                  <Icon name={e.icon} size={22} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink">{e.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{e.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700">
                  {e.cta}
                  <Icon name="arrowRight" size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section bg="soft">
        <Reveal>
          <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-accent-700">
              公司里程碑 · Milestones
            </h2>
            <ol className="mt-6">
              {milestones.map((m, i) => (
                <li key={m.text} className="relative flex gap-5 pb-6 last:pb-0">
                  {i < milestones.length - 1 && (
                    <span aria-hidden className="absolute left-[5px] top-4 h-full w-px bg-gradient-to-b from-accent-400 to-brand-200" />
                  )}
                  <span className="relative mt-1.5 h-[11px] w-[11px] shrink-0 rounded-full border-2 border-accent-500 bg-white" />
                  <div>
                    <span className="text-xs font-bold tabular-nums text-brand-700">{m.date}</span>
                    <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">{m.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </Section>
      <CTASection
        title="找不到您需要的資料？"
        description="歡迎直接與我們聯繫，索取產品資料、驗證摘要或法規說明文件。"
        primary={ctas.contact}
        secondary={[ctas.demo]}
      />
    </>
  );
}
