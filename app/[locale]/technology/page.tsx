import type { Metadata } from "next";
import { getRouteMetadata } from "@/data/route-metadata";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";
import { CTASection } from "@/components/sections/CTASection";
import { ComplianceNotice } from "@/components/ui/ComplianceNotice";
import { AiPipelineGraphic } from "@/components/sections/AiPipelineGraphic";
import { LesionReviewVisual } from "@/components/sections/LesionReviewVisual";
import { modalities, dicomOutputs } from "@/data/product";
import { ctas } from "@/data/site";

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return getRouteMetadata("technology", params);
}

const pipeline: { icon: IconName; step: string; title: string; body: string }[] = [
  {
    icon: "mri",
    step: "Input",
    title: "Bi-parametric MRI 輸入",
    body: "T1W+C 與 T2W 序列；符合條件之已診斷成人腦部腫瘤 MRI studies。",
  },
  {
    icon: "cpu",
    step: "Inference",
    title: "深度學習分割與偵測",
    body: "腦轉移瘤、腦膜瘤、聽神經瘤三類腫瘤之初步 ROI / 輪廓產生與特徵萃取。",
  },
  {
    icon: "workflow",
    step: "Output",
    title: "標準化 DICOM 輸出",
    body: "DICOM PR / RTSS 物件回到 PACS、影像瀏覽器與治療計畫系統。",
  },
  {
    icon: "review",
    step: "Review",
    title: "醫師審閱與確認",
    body: "所有 AI 結果由合格醫療專業人員於熟悉環境中審閱、確認或修改。",
  },
];

// extensibility of DeepBT beyond viewing AI results (from the company's services)
const valueAdds: { icon: IconName; title: string; body: string }[] = [
  { icon: "chart", title: "篩檢排序", body: "依優先順序排列待判讀案例，協助臨床分流。" },
  { icon: "review", title: "主動危急通知", body: "對需優先關注之案例主動提示，縮短反應時間。" },
  { icon: "workflow", title: "行動與遠距服務", body: "支援行動與遠距情境下的影像檢視與協作。" },
  { icon: "layers", title: "客製化整合", body: "依醫療院所流程與系統環境提供客製化整合。" },
];

// broader imaging-AI R&D competencies (research areas, not all cleared products)
const competencies = [
  "多類型腦瘤自動分類",
  "多類型腦瘤自動圈註",
  "動靜脈畸形 (AVM) 偵測",
  "血流動力參數估算",
  "CT 冠狀動脈鈣化偵測",
  "生理訊號分析與識別",
];

export default async function TechnologyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  void locale;

  return (
    <>
      <PageHero
        eyebrow="Technology"
        title="核心技術"
        titleEn="From MRI input to physician-reviewed DICOM output"
        description="DeepBT 的技術核心是把深度學習腦部腫瘤分析，包裝成可整合、可審閱、可取證的醫療器材軟體（SaMD）。"
        badges={[
          { icon: "layers", label: "Bi-parametric MRI" },
          { icon: "workflow", label: "DICOM PR / RTSS" },
          { icon: "quality", label: "SaMD 系統架構" },
        ]}
      />

      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Analysis Pipeline"
            title="分析管線"
            titleEn="Input → AI Inference → DICOM Output → Physician Review"
            className="mb-10"
          />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pipeline.map((p, i) => (
            <Reveal key={p.title} delay={(i % 4) * 0.07}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg">
                <span aria-hidden className="card-accent" />
                <span className="text-[0.68rem] font-bold uppercase tracking-wider text-accent-700">
                  {p.step}
                </span>
                <span className="mt-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-accent-50 text-brand-700">
                  <Icon name={p.icon} size={22} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="mt-10">
            <AiPipelineGraphic />
          </div>
        </Reveal>
        <ComplianceNotice className="mt-8" />
      </Section>

      {/* Lesion-wise review */}
      <Section bg="soft">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Lesion-wise Review"
              title="病灶層級的審閱導向設計"
              titleEn="Candidate contours organized for physician review"
              description="AI 針對每一個候選病灶產生初步輪廓，並以病灶為單位整理結果，協助醫療團隊逐一檢視、確認或修改 — 而非以整張影像的黑盒輸出取代專業判讀。"
            />
            <ul className="mt-6 space-y-3 text-sm text-ink-soft">
              {[
                "逐病灶之初步輪廓與量化資訊整理",
                "結果以 DICOM PR / RTSS 回到熟悉的審閱環境",
                "醫師逐一審閱、確認或修改後方進入治療計畫流程",
              ].map((t, i) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-700">
                    {i + 1}
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <LesionReviewVisual />
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Quantitative Tracking"
              title="縱向腫瘤量化追蹤"
              titleEn="Longitudinal volume tracking across time points"
              description="沿時間軸比較多次 MRI 檢查之腫瘤體積與變化趨勢，提供醫療團隊客觀的量化參考；所有量化結果仍須由醫師判讀。"
            />
            <ul className="mt-6 space-y-3 text-sm text-ink-soft">
              {modalities.map((m) => (
                <li key={m.code} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 rounded-md bg-accent-50 px-2 py-0.5 text-[0.7rem] font-semibold text-accent-700">
                    {m.code}
                  </span>
                  {m.name} — {m.note}
                </li>
              ))}
              {dicomOutputs.map((d) => (
                <li key={d.code} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 rounded-md bg-brand-50 px-2 py-0.5 text-[0.7rem] font-semibold text-brand-700">
                    {d.code}
                  </span>
                  {d.name} — {d.note}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-line bg-brand-950 p-2 shadow-xl">
              <Image
                src="/images/ai-dashboard.png"
                alt="DeepBT 腫瘤體積隨時間變化之量化分析儀表板示意"
                width={1100}
                height={1100}
                sizes="(min-width: 1024px) 540px, 90vw"
                className="h-auto w-full rounded-xl"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* extensibility + broader competencies (migrated from the company's services) */}
      <Section bg="soft">
        <Reveal>
          <SectionHeading
            eyebrow="Beyond Viewing"
            title="可擴充的臨床加值應用"
            titleEn="Value-add applications that fit existing clinical workflows"
            description="DeepBT 不只是檢視 AI 結果——透過良好的擴充性，可進一步優化醫師既有工作流程並創造附加價值。"
            className="mb-10"
          />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {valueAdds.map((v, i) => (
            <Reveal key={v.title} delay={(i % 4) * 0.07}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg">
                <span aria-hidden className="card-accent" />
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-accent-50 text-brand-700">
                  <Icon name={v.icon} size={22} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 rounded-2xl border border-line bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-accent-700">
              更廣的影像 AI 研發能量
            </h3>
            <p className="mt-2 text-sm text-ink-soft">
              核心團隊在醫學影像 AI 的研發涵蓋多個方向（屬研發能量，並非全部皆為已取證之醫療器材）：
            </p>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {competencies.map((c) => (
                <li
                  key={c}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-soft px-3 py-1.5 text-xs font-medium text-ink-soft"
                >
                  <Icon name="cpu" size={13} className="text-brand-700" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>

      <CTASection
        title="想深入了解 DeepBT 的技術與部署架構？"
        description="歡迎與我們的工程與法規團隊討論 DICOM 整合、部署模式與資安要求。"
        primary={ctas.demo}
        secondary={[{ label: "了解臨床流程", href: "/zh-TW/clinical-workflow" }, ctas.contact]}
      />
    </>
  );
}
