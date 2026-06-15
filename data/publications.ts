export type Publication = {
  title: string;
  authors: string;
  venue: string;
  year: string;
  summary: string;
  tags: string[];
};

/**
 * Peer-reviewed publications related to brain-tumor AI (Yu-Te Wu et al.).
 * Citations transcribed from the client document. DOIs / PubMed links are NOT
 * fabricated — add official links once provided by the client (待補).
 */
export const publications: Publication[] = [
  {
    title:
      "Combining analysis of multi-parametric MR images into a convolutional neural network: Precise target delineation for vestibular schwannoma treatment planning",
    authors: "Lee WK, Wu CC, Lee CC, et al.; Yu-Te Wu",
    venue: "Artificial Intelligence in Medicine",
    year: "2020;107:101911",
    summary:
      "使用多參數 MRI 與 CNN 進行聽神經瘤治療計畫中的精準靶區輪廓描繪。",
    tags: ["Vestibular Schwannoma", "Multi-parametric MRI", "CNN", "Target Delineation"],
  },
  {
    title:
      "Lesion delineation framework for vestibular schwannoma, meningioma and brain metastasis for gamma knife radiosurgery using stereotactic magnetic resonance images",
    authors:
      "Lee WK, Yang HC, Lee CC, Lu CF, Wu CC, Chung WY, Wu HM, Guo WY, Yu-Te Wu",
    venue: "Computer Methods and Programs in Biomedicine",
    year: "2023;229:107311",
    summary:
      "針對聽神經瘤、腦膜瘤與腦轉移瘤三類腫瘤，建立應用於 Gamma Knife radiosurgery 的 MRI lesion delineation framework。",
    tags: ["Three Tumor Types", "Gamma Knife", "Lesion Delineation"],
  },
  {
    title:
      "Federated Learning: A Cross-Institutional Feasibility Study of Deep Learning Based Intracranial Tumor Delineation Framework for Stereotactic Radiosurgery",
    authors: "Lee WK, Hong JS, Lin YH, et al.; Yu-Te Wu",
    venue: "Journal of Magnetic Resonance Imaging",
    year: "2024;59(6):1967–1975",
    summary:
      "探討跨機構 federated learning 應用於 SRS 腦內腫瘤輪廓描繪的可行性，涵蓋聽神經瘤、腦膜瘤與腦轉移瘤。",
    tags: ["Federated Learning", "SRS", "Multi-Institutional"],
  },
  {
    title:
      "Brain metastasis tumor segmentation and detection using deep learning algorithms: A systematic review and meta-analysis",
    authors: "Wang TW, Hsu MS, Lee WK, Pan HC, Yang HC, Lee CC, Yu-Te Wu",
    venue: "Radiotherapy and Oncology",
    year: "2024;190:110007",
    summary:
      "系統性回顧與統合分析深度學習於腦轉移瘤 segmentation 與 detection 的研究證據。",
    tags: ["Brain Metastasis", "Segmentation", "Meta-Analysis"],
  },
  {
    title:
      "Radiomics of metastatic brain tumor as a predictive image biomarker of progression-free survival in patients with non-small-cell lung cancer with brain metastasis receiving tyrosine kinase inhibitors",
    authors:
      "Wang TW, Chao HS, Chiu HY, Lu CF, Liao CY, Lee Y, Chen JR, Shiao TH, Chen YM, Yu-Te Wu",
    venue: "Radiomics / Predictive Imaging Biomarker",
    year: "—",
    summary:
      "探討腦轉移瘤 radiomics 作為非小細胞肺癌腦轉移病患 progression-free survival 的影像預測生物標記。",
    tags: ["Radiomics", "NSCLC", "Predictive Biomarker"],
  },
  {
    title:
      "Performance of Convolutional Neural Network Models in Meningioma Segmentation in Magnetic Resonance Imaging: A Systematic Review and Meta-Analysis",
    authors:
      "Wang TW, Hong JS, Lee WK, Lin YH, Yang HC, Lee CC, Chen HC, Wu HM, You WC, Yu-Te Wu",
    venue: "Neuroinformatics",
    year: "2025;23(1):14",
    summary: "系統性分析 CNN 模型在 MRI 腦膜瘤 segmentation 的表現。",
    tags: ["Meningioma", "Segmentation", "Meta-Analysis"],
  },
];
