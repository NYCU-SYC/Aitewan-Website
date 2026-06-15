import { site, contact } from "@/data/site";
import type { Locale } from "@/lib/i18n";

/**
 * JSON-LD structured data (Organization + WebSite + the flagship SaMD product).
 * Server component — emitted once per page in the locale layout. Only
 * source-backed facts are included (no efficacy or unverified claims). The FDA
 * 510(k) clearance is expressed as a verifiable certification with its official
 * record URL.
 */
export function StructuredData({ locale }: { locale: Locale }) {
  const isEn = locale === "en";
  const orgName = isEn ? site.nameEn : site.name;

  const graph = [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: orgName,
      alternateName: isEn ? site.name : site.nameEn,
      url: site.url,
      logo: `${site.url}/aitewan-logo.svg`,
      email: contact.email,
      telephone: contact.phone,
      faxNumber: contact.fax,
      address: {
        "@type": "PostalAddress",
        streetAddress: "7F, No. 1, Yumin 6th Rd, Beitou District",
        addressLocality: "Taipei",
        addressCountry: "TW",
      },
      description: isEn
        ? "Medical imaging AI company developing physician-supervised brain tumor contouring software and providing SaMD regulatory consulting."
        : "專注於腦部腫瘤 MRI 影像分析、AI 輔助圈註、DICOM 臨床流程整合與 SaMD 醫療器材法規取證的醫療 AI 公司。",
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: orgName,
      inLanguage: isEn ? "en" : "zh-Hant-TW",
      publisher: { "@id": `${site.url}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${site.url}/#liger-medai-platform`,
      name: "Liger MedAI Platform",
      alternateName: isEn ? "Liger Medical Imaging AI Platform" : "Liger 醫學影像 AI 整合平台",
      applicationCategory: "HealthApplication",
      operatingSystem: "Web / DICOM / PACS / FHIR-integrated",
      author: { "@id": `${site.url}/#organization` },
      url: `${site.url}/${locale}/liger-platform`,
      description: isEn
        ? "A TFDA Class II cleared medical-imaging AI integration platform for hospital-side deployment — connecting DICOM/PACS/FHIR and supporting AI model deployment, orchestration, result rendering, audit and multi-module scalability."
        : "已取得 TFDA 第二類醫療器材許可的醫學影像 AI 整合平台，串接 DICOM／PACS／FHIR，支援 AI 模型部署、編排、結果呈現、稽核與多模組擴充，作為醫院端 AI 導入基礎架構。",
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Taiwan TFDA Class II Medical Device Clearance",
        identifier: "衛部醫器製字第008624號",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${site.url}/#deepbt-detector-plus`,
      name: "DeepBT Detector-Plus",
      applicationCategory: "HealthApplication",
      operatingSystem: "Web / DICOM-integrated",
      author: { "@id": `${site.url}/#organization` },
      isPartOf: { "@id": `${site.url}/#liger-medai-platform` },
      description: isEn
        ? "AI-assisted brain tumor contouring software that generates preliminary contours for diagnosed adult brain tumors (brain metastases, meningiomas, acoustic neuromas), with DICOM PR / RTSS output for physician review in radiotherapy planning workflows."
        : "AI 輔助腦部腫瘤圈註軟體：針對已診斷成人腦部腫瘤（腦轉移瘤、腦膜瘤、聽神經瘤）產生初步輪廓，並以 DICOM PR / RTSS 輸出供醫師於放射治療計畫流程中審閱。",
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "U.S. FDA 510(k) Clearance",
          identifier: "K252190",
          url: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K252190",
        },
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Taiwan TFDA Class II Medical Device Clearance",
          identifier: "衛部醫器製字第008460號",
        },
      ],
    },
  ];

  const json = { "@context": "https://schema.org", "@graph": graph };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inline; no user input is interpolated.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
