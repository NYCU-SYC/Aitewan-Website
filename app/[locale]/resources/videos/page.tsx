import type { Metadata } from "next";
import { getRouteMetadata } from "@/data/route-metadata";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { Reveal } from "@/components/ui/Reveal";
import { YouTubeFacade } from "@/components/ui/YouTubeFacade";
import { CTASection } from "@/components/sections/CTASection";
import { videos } from "@/data/videos";
import { ctas } from "@/data/site";

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return getRouteMetadata("videos", params);
}

export default async function VideosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  void locale;

  const published = videos.filter((v) => v.reviewStatus === "verified" && v.youtubeId);
  const pending = videos.filter((v) => v.reviewStatus !== "verified");

  return (
    <>
      <PageHero
        eyebrow="Videos"
        title="影片專區"
        titleEn="Product demonstrations and media coverage"
        description="DeepBT 產品展示與媒體採訪影片。所有展示內容皆呈現「AI 輔助、醫師審閱」之工作流程。"
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          {published.map((v, i) => (
            <Reveal key={v.id} delay={i * 0.08}>
              <div>
                <YouTubeFacade videoId={v.youtubeId!} poster={v.poster} title={v.title} />
                <h2 className="mt-4 text-base font-semibold text-ink">{v.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{v.description}</p>
                <p className="mt-2 text-xs leading-relaxed text-ink-muted">{v.disclaimer}</p>
              </div>
            </Reveal>
          ))}
        </div>
        {pending.length > 0 && (
          <Reveal delay={0.1}>
            <div className="mt-12 rounded-2xl border border-dashed border-line-strong bg-surface-soft p-6">
              <p className="text-sm font-semibold text-ink">即將上線</p>
              <ul className="mt-2 space-y-1 text-sm text-ink-muted">
                {pending.map((v) => (
                  <li key={v.id}>
                    {v.title} — 待去識別化確認、字幕與 16:9 poster 完成後上線。
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}
      </Section>
      <CTASection
        title="想看完整的產品操作展示？"
        description="申請產品展示，我們將安排線上或現場的 DeepBT 工作流程示範。"
        primary={ctas.demo}
        secondary={[ctas.contact]}
      />
    </>
  );
}
