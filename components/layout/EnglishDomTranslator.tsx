"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

const exact: Record<string, string> = {
  "繁中": "ZH",
  "語言": "Language",
  "智德萬 AItewan 生醫科技": "AItewan BioMedical Technology",
  "AI 輔助腦部腫瘤圈註，": "AI-assisted brain tumor contouring,",
  "串接臨床放射治療流程": "built into radiotherapy workflows",
  "腦部腫瘤 AI 醫療影像 · SaMD": "Brain Tumor Imaging AI · SaMD",
  "AI 輔助腦部腫瘤圈註 · 放射治療流程支援": "AI-assisted Brain Tumor Contouring · Radiotherapy Workflow Support",
  "AI 輔助腦部腫瘤圈註，串接臨床放射治療流程": "AI-assisted brain tumor contouring for radiotherapy workflows",
  "申請產品展示": "Request a Demo",
  "了解 DeepBT Detector-Plus": "Explore DeepBT Detector-Plus",
  "了解智德萬 AItewan": "Learn About AItewan",
  "從研究成果到臨床可用的醫療 AI 產品": "From research to clinically usable medical AI products",
  "腦部腫瘤放射治療流程的三個痛點": "Three pain points in brain tumor radiotherapy workflows",
  "為 PACS 與治療計畫流程整合而設計": "Designed for PACS and treatment-planning workflow integration",
  "為臨床各方創造的價值": "Value for clinical stakeholders",
  "多中心臨床驗證性能摘要": "Multicenter validation performance summary",
  "法規里程碑與獎項肯定": "Regulatory milestones and innovation awards",
  "學研與臨床合作夥伴": "Academic and clinical partners",
  "不只懂法規，更實際完成 AI SaMD 取證": "Regulatory expertise grounded in real AI SaMD clearance experience",
  "腦瘤 AI 相關同儕審查論文": "Peer-reviewed publications related to brain tumor AI",
  "瀏覽完整學術發表": "View all publications",
  "與智德萬一起，將腦部腫瘤 AI 推進至臨床": "Bring brain tumor AI into clinical workflows with AItewan",
  "產品": "Products",
  "臨床流程": "Clinical Workflow",
  "法規與證據": "Evidence & Regulatory",
  "顧問服務": "Consulting Services",
  "資源": "Resources",
  "關於我們": "About",
  "聯絡我們": "Contact",
  "DeepBT 系列產品": "DeepBT Product Family",
  "核心技術": "Technology",
  "法規里程碑與獎項": "Regulatory Milestones and Awards",
  "臨床驗證與導入": "Clinical Validation and Deployment",
  "專利技術布局": "Patent and Technology Portfolio",
  "資源中心": "Resource Center",
  "影片專區": "Videos",
  "學術發表": "Research Publications",
  "產品與技術": "Product & Technology",
  "公司與資源": "Company & Resources",
  "合規聲明 · Compliance": "Compliance",
  "開啟選單": "Open menu",
  "關閉選單": "Close menu",
  "主選單": "Main navigation",
  "行動選單": "Mobile navigation",
  "腦部腫瘤影像 AI": "Brain tumor imaging AI",
  "DICOM 流程整合": "DICOM workflow integration",
  "SaMD 法規取證": "SaMD regulatory clearance",
  "品質與資安": "Quality and cybersecurity",
  "人工圈註負擔沉重": "Manual contouring burden",
  "跨系統影像與結構交換複雜": "Complex cross-system image and structure exchange",
  "AI 結果需回到既有審閱流程": "AI output must return to existing review workflows",
  "為放射治療計畫流程設計的 AI 輔助圈註": "AI-assisted contouring designed for radiotherapy planning workflows",
  "DeepBT Detector-Plus 做什麼": "What DeepBT Detector-Plus does",
  "三類取證腫瘤類別": "Three cleared tumor categories",
  "MRI 輸入與 DICOM 輸出": "MRI input and DICOM output",
  "產品特色": "Product features",
  "DeepBT Detector-Plus 腦瘤 AI 圈註展示": "DeepBT Detector-Plus brain tumor AI contouring demonstration",
  "臨床導入經驗": "Clinical deployment experience",
  "使用限制與合規聲明": "Limitations and compliance statement",
  "AI 輔助腦部腫瘤圈註系統": "AI-assisted brain tumor contouring system",
  "已診斷成人腦部腫瘤之初步輪廓輔助；結果須由醫療專業人員審閱。": "Preliminary contouring support for diagnosed adult brain tumors; results require review by medical professionals.",
  "腦轉移瘤": "Brain metastasis",
  "腦膜瘤": "Meningioma",
  "聽神經瘤": "Acoustic neuroma",
  "支援腦轉移瘤、腦膜瘤、聽神經瘤": "Supports brain metastases, meningiomas, and acoustic neuromas",
  "已導入台中榮總、新光醫院、台北榮總": "Deployed in major Taiwanese medical centers",
  "DICOM PR / RTSS 臨床流程整合": "DICOM PR / RTSS clinical workflow integration",
  "未來科技獎、國家新創獎肯定": "Future Tech Award and National Innovation Award recognition",
  "台灣 TFDA 第二類醫療器材許可": "Taiwan TFDA Class II medical device registration",
  "美國 FDA 510(k) K252190 clearance": "U.S. FDA 510(k) K252190 clearance",
  "台灣 TFDA 第二類醫療器材查驗登記": "Taiwan TFDA Class II medical device registration",
  "TFDA 二類醫材查驗登記": "TFDA Class II medical device registration",
  "TFDA 二類查驗登記": "TFDA Class II registration",
  "美國 FDA 510(k) 取證輔導": "U.S. FDA 510(k) submission support",
  "TFDA 二類醫材取證輔導": "TFDA Class II submission support",
  "ISO 13485 品質系統建立": "ISO 13485 QMS implementation",
  "SaMD 軟體生命週期文件": "SaMD software lifecycle documentation",
  "TFDA 二類醫材資安檢測與文件輔導": "Medical-device cybersecurity testing and documentation",
  "AI 醫材臨床驗證與性能評估設計": "Clinical validation and performance evaluation design for AI medical devices",
  "專利與產品技術布局諮詢": "Patent and product technology strategy consulting",
  "填寫洽詢表單": "Submit an inquiry",
  "我們可以協助的合作需求": "How we can help",
  "請選擇需求類型並簡述需求，我們將盡快與您聯繫。": "Select your inquiry type and describe your needs. We will contact you as soon as possible.",
  "醫療院所導入 DeepBT Detector-Plus": "Hospital deployment of DeepBT Detector-Plus",
  "申請產品展示 / 觀看展示影片": "Request a product demo or demo video",
  "SaMD 取證諮詢（TFDA / FDA 送件輔導）": "SaMD regulatory consulting (TFDA / FDA submission support)",
  "醫療器材資安輔導": "Medical-device cybersecurity support",
  "專利與技術合作洽詢": "Patent and technology partnership inquiry",
  "台灣 · 臺北": "Taipei, Taiwan",
  "（完整地址請來信洽詢）": "(full address available on request)",
  "待補": "Pending",
  "即將上線": "Coming soon",
  "觀看影片": "Watch videos",
  "查看產品": "View product",
  "查看 Publications": "View publications",
  "公司里程碑 · Milestones": "Company milestones",
  "尋找腦部腫瘤 AI 產品或 SaMD 取證夥伴？": "Looking for a brain tumor AI product or SaMD regulatory partner?",
  "找不到您需要的資料？": "Cannot find what you need?",
  "想看完整的產品操作展示？": "Want to see the full product workflow?",
  "準備啟動您的 SaMD 取證計畫？": "Ready to start your SaMD regulatory plan?",
  "想深入了解 DeepBT 的技術與部署架構？": "Want to learn more about DeepBT technology and deployment architecture?",
  "研究合作與技術交流": "Research collaboration and technical exchange",
  // —— Home redesign (hero / bento / trust) ——
  "為臨床而生的": "Clinical-grade",
  "DeepBT Detector-Plus 協助醫療團隊產生初步腫瘤輪廓，並以標準化 DICOM 回到 PACS / TPS 由醫師審閱、確認或修改，支援放射治療計畫流程。":
    "DeepBT Detector-Plus helps clinical teams generate preliminary tumor contours and returns them as standardized DICOM to PACS / TPS for physicians to review, confirm, or modify — supporting radiotherapy planning workflows.",
  "查看臨床流程": "View Clinical Workflow",
  "查看臨床流程整合": "View clinical workflow integration",
  "TFDA 二類醫材": "TFDA Class II device",
  "AI 產生之輪廓僅作為輔助參考，所有結果皆須由合格醫療專業人員審閱、確認或修改後，方可用於後續治療計畫流程。":
    "AI-generated contours are preliminary references only and must be reviewed, confirmed, or modified by qualified medical professionals before clinical use.",
  "DeepBT Detector-Plus 的核心能力": "Core capabilities of DeepBT Detector-Plus",
  "從 MRI 到治療計畫的六步驟流程": "A six-step flow from MRI to treatment planning",
  "為什麼醫院與夥伴信任 DeepBT": "Why hospitals and partners trust DeepBT",
  // bento cells
  "AI 輔助腫瘤圈註": "AI-assisted tumor contouring",
  "針對已診斷成人腦部腫瘤產生初步輪廓，作為醫師審閱的起點。":
    "Generates preliminary contours for diagnosed adult brain tumors as a starting point for physician review.",
  "三類取證腫瘤": "Three cleared tumor types",
  "腦轉移瘤、腦膜瘤、聽神經瘤。": "Brain metastases, meningiomas, acoustic neuromas.",
  "雙參數 MRI": "Bi-parametric MRI",
  "支援 T1W+C 與 T2W 輸入。": "Supports T1W+C and T2W input.",
  "標準化 DICOM 輸出": "Standardized DICOM output",
  "DICOM PR / RTSS 串接 PACS、TPS。": "DICOM PR / RTSS connects to PACS and TPS.",
  "醫師主導審閱": "Physician-led review",
  "所有結果由合格醫療專業人員確認或修改。":
    "Every result is confirmed or modified by qualified medical professionals.",
  "縱向量化追蹤": "Longitudinal quantification",
  "提供腫瘤體積變化之客觀量化參考。":
    "Provides an objective quantitative reference for tumor-volume change.",
  // trust
  "通過 FDA 與 TFDA 取證的腦瘤 AI 醫材": "A brain tumor AI device cleared by the FDA and TFDA",
  "多中心、多國回溯性驗證資料規模":
    "Scale of the multinational, multicenter retrospective validation dataset",
  "standalone 性能數據（敏感度、Dice 等）於完整臨床驗證頁呈現，正式公開前須經法規／臨床／QA 審核。":
    "Standalone performance figures (sensitivity, Dice, etc.) appear on the full clinical-validation page and require regulatory / clinical / QA review before public release.",
  "完整法規里程碑、臨床驗證、醫院導入與專利技術布局":
    "Full regulatory milestones, clinical validation, hospital deployment, and patent portfolio",
  "臨床病例 / Clinical cases": "Clinical cases",
  "腫瘤 / Tumors": "Tumors",
  "機構 / Institutions": "Institutions",
  "訓練 MRI studies": "Training MRI studies",
  // SaMD + CTA
  "我們具備自有 AI SaMD 產品從研發、醫院導入、臨床驗證到 TFDA 與 FDA 510(k) 取證的實戰經驗，協助醫療 AI 團隊走向臨床落地。":
    "We bring hands-on experience taking our own AI SaMD products from development and hospital deployment through clinical validation to TFDA and U.S. FDA 510(k) clearance — helping medical-AI teams reach the clinic.",
  "無論您是想導入 AI 輔助圈註的醫療院所，或需要 SaMD 取證輔導的醫療 AI 團隊，我們都能提供從產品規劃、臨床流程整合到法規落地的協助。":
    "Whether you are a healthcare institution adopting AI-assisted contouring or a medical-AI team that needs SaMD regulatory support, we can help from product planning and clinical workflow integration through to regulatory clearance.",
  // —— Home 2026 refresh (hero / section titles / tech showcase) ——
  "腦部腫瘤 AI 圈註，": "Brain tumor AI contouring,",
  "整合進放射治療流程": "built into the radiotherapy workflow",
  "DeepBT Detector-Plus 自動產生初步腫瘤輪廓，並以標準化 DICOM 回到 PACS / TPS，由醫師審閱、確認或修改後，支援放射治療計畫流程。":
    "DeepBT Detector-Plus generates preliminary tumor contours and returns them as standardized DICOM to PACS / TPS, where physicians review, confirm, or modify them to support radiotherapy planning.",
  "FDA / TFDA 法規里程碑": "FDA / TFDA regulatory milestones",
  "腦部腫瘤放射治療流程的三個瓶頸": "Three bottlenecks in the brain tumor radiotherapy workflow",
  "一套為臨床打造的 AI 輔助圈註系統": "An AI-assisted contouring system built for the clinic",
  "從 MRI 到治療計畫的六步流程": "A six-step flow from MRI to treatment planning",
  "為不同角色提供清楚的下一步": "A clear next step for every role",
  "從影像分析到臨床整合的核心技術": "Core technology — from image analysis to clinical integration",
  "DeepBT 將深度學習腦部腫瘤影像分析整合於臨床工作流程，輔助醫療團隊產生初步輪廓與量化參考。所有 AI 結果皆為輔助參考，須由合格醫療專業人員審閱、確認或修改。":
    "DeepBT integrates deep-learning brain-tumor image analysis into the clinical workflow, helping teams produce preliminary contours and quantitative references. All AI results are preliminary references and must be reviewed, confirmed, or modified by qualified medical professionals.",
  "深度學習腦瘤分割模型": "Deep-learning brain-tumor segmentation",
  "以深度學習對 T1W+C 與 T2W MRI 進行腫瘤偵測與初步分割。":
    "Deep learning performs tumor detection and preliminary segmentation on T1W+C and T2W MRI.",
  "多中心回溯性驗證": "Multicenter retrospective validation",
  "standalone 性能以多國、多中心回溯資料評估，ground truth 由 board-certified radiologists 建立。":
    "Standalone performance was evaluated on multinational, multicenter retrospective data, with ground truth established by board-certified radiologists.",
  "DICOM-native 臨床整合": "DICOM-native clinical integration",
  "以標準 DICOM PR / RTSS 進入既有 PACS / TPS，不改變醫師既有工作環境。":
    "Standard DICOM PR / RTSS flows into existing PACS / TPS without changing the physician's working environment.",
  "SaMD 系統架構": "SaMD system architecture",
  "模型管理、背景推論與結果回傳，依醫療器材軟體（SaMD）規範設計。":
    "Model management, background inference, and result return — designed to medical-device software (SaMD) standards.",
  "深入了解核心技術": "Explore the core technology",
  "查看臨床驗證": "View clinical validation",
  // —— Contact intents / differentiated CTAs ——
  "醫療院所導入諮詢": "Hospital Deployment Inquiry",
  "研究合作洽詢": "Research Collaboration Inquiry",
  "投資與商業合作": "Investor & Business Partnerships",
  "醫療院所導入 / 臨床合作": "Hospital deployment / clinical collaboration",
  "醫療院所導入 DeepBT Detector-Plus / 臨床合作":
    "Hospital deployment of DeepBT Detector-Plus / clinical collaboration",
  "其他合作洽詢": "Other partnership inquiries",
  "傳真": "Fax",
  "傳真 02-8192-6769": "Fax 02-8192-6769",
  "台北市北投區裕民六路 1 號 7 樓": "7F, No. 1, Yumin 6th Rd, Beitou District, Taipei, Taiwan",
  // —— Products: who it's for ——
  "DICOM PR / RTSS 整合": "DICOM PR / RTSS integration",
  "適用科別與場域": "Where DeepBT fits — specialties & settings",
  "DeepBT 設計用於協助以下臨床與研究情境；所有 AI 結果皆須由合格醫療專業人員審閱、確認或修改。":
    "DeepBT is designed to support the clinical and research settings below; all AI results must be reviewed, confirmed, or modified by qualified medical professionals.",
  "放射腫瘤科": "Radiation oncology",
  "放射治療計畫前的腦部腫瘤輪廓準備與審閱。":
    "Brain-tumor contour preparation and review ahead of radiotherapy planning.",
  "放射科 / 神經影像": "Radiology / neuroimaging",
  "腦部 MRI 腫瘤判讀與初步圈註之輔助參考。":
    "Assistive reference for brain MRI tumor reading and preliminary contouring.",
  "立體定位放射手術（SRS / Gamma Knife）": "Stereotactic radiosurgery (SRS / Gamma Knife)",
  "聽神經瘤、腦膜瘤與多發腦轉移瘤之靶區準備。":
    "Target preparation for acoustic neuromas, meningiomas, and multiple brain metastases.",
  "研究與臨床合作": "Research & clinical collaboration",
  "腦瘤 AI 影像分析、驗證與臨床流程整合之合作。":
    "Collaboration on brain-tumor AI image analysis, validation, and clinical workflow integration.",
};

const phrases: Array<[RegExp, string]> = [
  [/智德萬 AItewan 生醫科技股份有限公司/g, "AItewan BioMedical Technology Inc."],
  [/智德萬 AItewan/g, "AItewan"],
  [/智德萬/g, "AItewan"],
  [/腦部腫瘤/g, "brain tumor"],
  [/腦瘤/g, "brain tumor"],
  [/醫療器材/g, "medical device"],
  [/醫療院所/g, "healthcare institutions"],
  [/醫療專業人員/g, "medical professionals"],
  [/醫師/g, "physicians"],
  [/臨床/g, "clinical"],
  [/放射治療/g, "radiotherapy"],
  [/治療計畫/g, "treatment planning"],
  [/影像/g, "imaging"],
  [/圈註/g, "contouring"],
  [/輪廓/g, "contours"],
  [/初步/g, "preliminary"],
  [/審閱/g, "review"],
  [/確認/g, "confirm"],
  [/修改/g, "modify"],
  [/流程/g, "workflow"],
  [/整合/g, "integration"],
  [/輸出/g, "output"],
  [/輸入/g, "input"],
  [/產品/g, "product"],
  [/法規/g, "regulatory"],
  [/證據/g, "evidence"],
  [/專利/g, "patent"],
  [/資安/g, "cybersecurity"],
  [/品質/g, "quality"],
  [/顧問/g, "consulting"],
  [/服務/g, "services"],
  [/資料/g, "data"],
  [/系統/g, "system"],
  [/研究/g, "research"],
  [/發表/g, "publications"],
  [/影片/g, "videos"],
  [/獎項/g, "awards"],
  [/里程碑/g, "milestones"],
  [/學研/g, "academic"],
  [/合作/g, "collaboration"],
  [/夥伴/g, "partners"],
  [/支援/g, "support"],
  [/輔助/g, "assisted"],
  [/導入/g, "deployment"],
  [/取得/g, "obtained"],
  [/通過/g, "cleared"],
  [/已診斷成人/g, "diagnosed adult"],
  [/多中心/g, "multicenter"],
  [/回溯性/g, "retrospective"],
  [/性能/g, "performance"],
  [/摘要/g, "summary"],
  [/偵測/g, "detection"],
  [/分析/g, "analysis"],
  [/腦轉移瘤/g, "brain metastasis"],
  [/腦膜瘤/g, "meningioma"],
  [/聽神經瘤/g, "acoustic neuroma"],
  [/台灣/g, "Taiwan"],
  [/美國/g, "U.S."],
  [/醫院/g, "hospital"],
  [/團隊/g, "team"],
  [/使用/g, "use"],
  [/限制/g, "limitations"],
  [/聲明/g, "statement"],
  [/聯絡/g, "contact"],
  [/洽詢/g, "inquiry"],
  [/需求/g, "needs"],
  [/完整/g, "complete"],
  [/查看/g, "view"],
  [/了解/g, "learn"],
  [/申請/g, "request"],
  [/展示/g, "demo"],
  [/待/g, "pending"],
  [/補/g, "update"],
  [/頁/g, "page"],
  [/類/g, "type"],
  [/三/g, "three"],
  [/二/g, "two"],
  [/一/g, "one"],
];

function replacementWithBoundaries(match: string, replacement: string, offset: number, input: string) {
  const before = input[offset - 1] ?? "";
  const after = input[offset + match.length] ?? "";
  const needsLeft = before !== "" && !/[\s([{"'“‘/·・,.;:!?，。；：、]/.test(before);
  const needsRight = after !== "" && !/[\s)\]}"'”’/·・,.;:!?，。；：、]/.test(after);
  return `${needsLeft ? " " : ""}${replacement}${needsRight ? " " : ""}`;
}

function toEnglish(input: string) {
  const trimmed = input.trim();
  if (!trimmed || !/[\u3400-\u9fff]/.test(trimmed)) return input;

  const leading = input.match(/^\s*/)?.[0] ?? "";
  const trailing = input.match(/\s*$/)?.[0] ?? "";
  let value = exact[trimmed] ?? trimmed;

  if (/[\u3400-\u9fff]/.test(value)) {
    for (const [pattern, replacement] of phrases) {
      value = value.replace(pattern, (match, offset, full) =>
        replacementWithBoundaries(match, replacement, offset, full),
      );
    }
  }

  value = value
    .replace(/[「」『』]/g, "\"")
    .replace(/（/g, "(")
    .replace(/）/g, ")")
    .replace(/，/g, ", ")
    .replace(/。/g, ".")
    .replace(/、/g, ", ")
    .replace(/：/g, ": ")
    .replace(/；/g, "; ")
    .replace(/與/g, " and ")
    .replace(/及/g, " and ")
    .replace(/或/g, " or ")
    .replace(/之/g, " of ")
    .replace(/於/g, " in ")
    .replace(/的/g, "")
    .replace(/為/g, " is ")
    .replace(/由/g, " by ")
    .replace(/至/g, " to ")
    .replace(/到/g, " to ")
    .replace(/以/g, " with ")
    .replace(/[\u3400-\u9fff]+/g, "")
    .replace(/\s+([,.;:!?])/g, "$1")
    .replace(/([([{/])\s+/g, "$1")
    .replace(/\s+([)\]}])/g, "$1")
    .replace(/\s+\/\s+/g, " / ")
    .replace(/\s{2,}/g, " ")
    .trim();

  if (!value) value = "Medical AI workflow support";
  return `${leading}${value}${trailing}`;
}

function translateNode(root: ParentNode) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (parent.closest("[data-no-translate], [translate='no']")) {
        return NodeFilter.FILTER_REJECT;
      }
      if (["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA"].includes(parent.tagName)) {
        return NodeFilter.FILTER_REJECT;
      }
      return /[\u3400-\u9fff]/.test(node.textContent ?? "")
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT;
    },
  });

  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  for (const node of nodes) {
    node.textContent = toEnglish(node.textContent ?? "");
  }

  const attrs = ["alt", "aria-label", "title", "placeholder", "value"];
  for (const element of Array.from(document.querySelectorAll<HTMLElement>("*"))) {
    if (element.closest("[data-no-translate], [translate='no']")) continue;
    for (const attr of attrs) {
      const current = element.getAttribute(attr);
      if (current && /[\u3400-\u9fff]/.test(current)) {
        element.setAttribute(attr, toEnglish(current));
      }
    }
  }
}

export function EnglishDomTranslator({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  useEffect(() => {
    if (locale !== "en" || !pathname.startsWith("/en")) return;

    translateNode(document.body);
    const observer = new MutationObserver((mutations) => {
      if (!window.location.pathname.startsWith("/en")) return;

      for (const mutation of mutations) {
        for (const node of Array.from(mutation.addedNodes)) {
          if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent ?? "";
            if (/[\u3400-\u9fff]/.test(text)) node.textContent = toEnglish(text);
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            translateNode(node as Element);
          }
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [locale, pathname]);

  return null;
}
