import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { assetPath } from "@/lib/asset-path";
import type { Locale } from "@/lib/i18n";

const capabilities: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "cpu",
    title: "深度學習腦瘤分割模型",
    body: "以深度學習對 T1W+C 與 T2W MRI 進行腫瘤偵測與初步分割。",
  },
  {
    icon: "chart",
    title: "多中心回溯性驗證",
    body: "standalone 性能以多國、多中心回溯資料評估，ground truth 由 board-certified radiologists 建立。",
  },
  {
    icon: "workflow",
    title: "DICOM-native 臨床整合",
    body: "以標準 DICOM PR / RTSS 進入既有 PACS / TPS，不改變醫師既有工作環境。",
  },
  {
    icon: "shield",
    title: "SaMD 系統架構",
    body: "模型管理、背景推論與結果回傳，依醫療器材軟體（SaMD）規範設計。",
  },
];

const slogan = ["快速 Fast", "客觀 Objective", "量化 Quantitative", "準確 Accurate", "順暢 Smooth"];
const sloganEn = ["Fast", "Objective", "Quantitative", "Accurate", "Smooth"];

const capabilitiesEn: typeof capabilities = [
  {
    icon: "cpu",
    title: "Deep-learning brain tumor segmentation",
    body: "Deep learning performs tumor detection and preliminary segmentation on T1W+C and T2W MRI.",
  },
  {
    icon: "chart",
    title: "Multicenter retrospective validation",
    body: "Standalone performance was evaluated on multinational, multicenter retrospective data, with ground truth established by board-certified radiologists.",
  },
  {
    icon: "workflow",
    title: "DICOM-native clinical integration",
    body: "Standard DICOM PR / RTSS flows into existing PACS / TPS without changing the physician's working environment.",
  },
  {
    icon: "shield",
    title: "SaMD system architecture",
    body: "Model management, background inference and result return are designed to medical-device software standards.",
  },
];

export function AIShowcase({ locale = "zh-TW" }: { locale?: Locale }) {
  const en = locale === "en";
  const t = (zh: string, eng: string) => (en ? eng : zh);
  const items = en ? capabilitiesEn : capabilities;
  const slogans = en ? sloganEn : slogan;
  return (
    <section className="relative overflow-hidden bg-brand-950 py-20 sm:py-24">
      {/* gradient-mesh backdrop */}
      <div aria-hidden className="absolute inset-0 medical-grid opacity-[0.12]" />
      <div
        aria-hidden
        className="absolute -left-24 top-0 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-brand-500/25 blur-3xl"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Copy */}
          <Reveal>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent-300">
              <span className="h-px w-6 bg-current opacity-60" />
              Core Technology
            </div>
            <h2 className="text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-[2.1rem]">
              {t("從影像分析到臨床整合的核心技術", "Core technology from image analysis to clinical integration")}
            </h2>
            <p className="mt-2 text-sm font-medium text-brand-200">
              AI segmentation · Lesion detection · Workflow integration · Structured reporting
            </p>
            <p className="mt-5 text-[0.975rem] leading-relaxed text-brand-100/85">
              {t(
                "DeepBT 將深度學習腦部腫瘤影像分析整合於臨床工作流程，輔助醫療團隊產生初步輪廓與量化參考。所有 AI 結果皆為輔助參考，須由合格醫療專業人員審閱、確認或修改。",
                "DeepBT integrates deep-learning brain tumor image analysis into clinical workflows, helping teams produce preliminary contours and quantitative references. All AI results are preliminary references and must be reviewed, confirmed or modified by qualified medical professionals.",
              )}
            </p>

            <ul className="mt-7 space-y-4">
              {items.map((c) => (
                <li key={c.title} className="flex gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-accent-300 ring-1 ring-white/15">
                    <Icon name={c.icon} size={20} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{c.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-brand-200/80">{c.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-2">
              {slogans.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs font-medium text-brand-100/90"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              <Link
                href={`/${locale}/technology`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-300 hover:text-accent-200"
              >
                {t("深入了解核心技術", "Explore core technology")}
                <Icon name="arrowRight" size={16} />
              </Link>
              <Link
                href={`/${locale}/evidence-regulatory#validation`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-100/85 hover:text-white"
              >
                {t("查看臨床驗證", "View clinical validation")}
                <Icon name="arrowRight" size={16} className="text-accent-300" />
              </Link>
            </div>
          </Reveal>

          {/* Visual */}
          <Reveal delay={0.12}>
            <div className="relative pb-12">
              {/* glow */}
              <div
                aria-hidden
                className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-accent-500/30 via-brand-500/20 to-transparent blur-2xl"
              />
              {/* dashboard in glass frame */}
              <div className="relative z-10 overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] p-2 shadow-2xl shadow-brand-950/50 backdrop-blur-sm">
                <Image
                  src={assetPath("/images/ai-dashboard.png")}
                  alt={t(
                    "DeepBT AI 腦部腫瘤分析儀表板：軸狀 MRI 腫瘤輪廓與隨時間之體積變化趨勢圖",
                    "DeepBT AI brain tumor analysis dashboard showing axial MRI contours and tumor-volume trend over time",
                  )}
                  width={1100}
                  height={1100}
                  sizes="(min-width: 1024px) 520px, 90vw"
                  className="h-auto w-full rounded-xl"
                />
                {/* scan-line sweep */}
                <span
                  aria-hidden
                  className="anim-scan absolute inset-x-2 h-10 bg-gradient-to-b from-transparent via-accent-300/15 to-transparent"
                />
                {/* status chip */}
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-brand-950/70 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-accent-300 backdrop-blur-md">
                  <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-accent-400" />
                  AI Analysis · For Review
                </span>
              </div>
              <div className="absolute bottom-0 -right-4 z-20 hidden w-36 rounded-2xl border border-accent-300/30 bg-brand-950/70 p-1.5 shadow-2xl shadow-accent-950/40 backdrop-blur-md sm:block lg:-right-8 lg:w-44">
                <Image
                  src={assetPath("/images/brain-3d.png")}
                  alt={t("3D 腦部模型與腫瘤區域標示", "3D brain model with tumor-region marker")}
                  width={1200}
                  height={900}
                  sizes="200px"
                  className="h-auto w-full rounded-xl"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
