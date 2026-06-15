/** 專有名詞對照（規格書 §3.1）— 中英文供未來 /en 版本共用。 */
export const glossary = {
  brainMetastases: { zh: "腦轉移瘤", en: "Brain metastases" },
  meningiomas: { zh: "腦膜瘤", en: "Meningiomas" },
  acousticNeuromas: { zh: "聽神經瘤", en: "Acoustic neuromas" },
  dicomRtss: { zh: "DICOM RT Structure Set", en: "DICOM RTSS" },
  dicomPr: { zh: "DICOM Presentation State", en: "DICOM PR" },
  samd: { zh: "醫療器材軟體", en: "SaMD (Software as a Medical Device)" },
  tps: { zh: "治療計畫系統", en: "TPS (Treatment Planning System)" },
  pacs: { zh: "醫療影像儲傳系統", en: "PACS" },
  t1wc: { zh: "顯影後 T1 加權影像", en: "T1-weighted post-contrast MRI (T1W+C)" },
  t2w: { zh: "T2 加權影像", en: "T2-weighted MRI (T2W)" },
  preliminaryContour: { zh: "初步輪廓", en: "Preliminary contour" },
  physicianReview: { zh: "醫師審閱", en: "Physician-led review" },
} as const;
