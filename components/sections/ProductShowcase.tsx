import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { ctas } from "@/data/site";
import { assetPath } from "@/lib/asset-path";

const highlights = [
  "三類取證腫瘤：腦轉移瘤、腦膜瘤、聽神經瘤",
  "雙參數 MRI 輸入：T1W+C 與 T2W",
  "標準化 DICOM PR / RTSS 輸出，串接 PACS / TPS",
  "AI 初步輪廓，由醫師審閱、確認或修改",
];

/** Home product showcase — image-rich split section (DeepRad-style rhythm). */
export function ProductShowcase() {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
      {/* Visual */}
      <Reveal>
        <div className="relative mx-auto max-w-md lg:max-w-none">
          <div
            aria-hidden
            className="absolute -inset-5 -z-10 rounded-[2rem] bg-gradient-to-tr from-brand-100/80 via-accent-100/60 to-transparent blur-xl"
          />
          <div className="tech-panel-scan anim-subtle-glow overflow-hidden rounded-2xl border border-line bg-white p-3 shadow-xl shadow-brand-900/10">
            <Image
              src={assetPath("/images/mri-modalities.png")}
              alt="DeepBT 支援之雙參數 MRI 輸入：T1W+C 顯影後 T1 與 T2W 影像"
              width={620}
              height={620}
              sizes="(min-width: 1024px) 480px, 90vw"
              className="h-auto w-full rounded-xl"
            />
          </div>
          {/* floating spec chip */}
          <div className="anim-float absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-line bg-white/90 px-4 py-2 text-xs font-semibold text-brand-700 shadow-lg backdrop-blur-sm">
            <Icon name="layers" size={15} className="text-accent-600" />
            Bi-parametric MRI · T1W+C / T2W
          </div>
        </div>
      </Reveal>

      {/* Copy */}
      <Reveal delay={0.1}>
        <SectionHeading
          eyebrow="DeepBT Detector-Plus"
          title="AI 輔助腦部腫瘤圈註系統"
          titleEn="AI-Assisted Brain Tumor Contouring System"
          description="針對已診斷之成人腦部腫瘤產生初步輪廓，支援放射治療計畫前置作業，並以標準化 DICOM 物件回到醫師既有的臨床工作環境。"
        />
        <ul className="mt-6 space-y-3">
          {highlights.map((h) => (
            <li key={h} className="flex items-start gap-3 text-[0.95rem] text-ink-soft">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent-700">
                <Icon name="check" size={13} />
              </span>
              {h}
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button href={ctas.product.href} arrow>
            了解產品功能
          </Button>
          <Button href={ctas.demo.href} variant="secondary">
            {ctas.demo.label}
          </Button>
        </div>
      </Reveal>
    </div>
  );
}
