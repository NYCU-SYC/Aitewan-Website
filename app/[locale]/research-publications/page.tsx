import type { Metadata } from "next";
import { getRouteMetadata } from "@/data/route-metadata";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PublicationCard } from "@/components/cards/PublicationCard";
import { CTASection } from "@/components/sections/CTASection";
import { publications } from "@/data/publications";
import { ctas } from "@/data/site";

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return getRouteMetadata("research-publications", params);
}

export default async function ResearchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  void locale;

  return (
    <>
      <PageHero
        eyebrow="Research"
        title="學術發表"
        titleEn="Peer-Reviewed Publications Related to Brain Tumor AI"
        description="以下整理與腦瘤 AI、MRI segmentation、radiomics 與放射治療相關之國際期刊論文（Yu-Te Wu 等參與或通訊作者）。"
        badges={[
          { icon: "research", label: "Vestibular Schwannoma" },
          { icon: "brain", label: "Brain Metastasis" },
          { icon: "contour", label: "Meningioma Segmentation" },
        ]}
      />

      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {publications.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.08}>
              <PublicationCard pub={p} />
            </Reveal>
          ))}
        </div>
        <p className="mt-8 rounded-xl border border-line bg-surface-soft p-4 text-xs leading-relaxed text-ink-muted">
          引用資訊轉錄自客戶提供之資料；正式 DOI 與 PubMed 連結待補後將補上，本網站不杜撰未提供之連結或編號。
        </p>
      </Section>

      <CTASection
        title="研究合作與技術交流"
        description="歡迎研究者、臨床醫師與醫療 AI 團隊與智德萬交流腦瘤 AI 影像分析與臨床驗證相關研究。"
        primary={ctas.research}
        secondary={[ctas.patent, ctas.contact]}
      />
    </>
  );
}
