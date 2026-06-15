import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // Per-route titles are self-contained (see data/route-metadata.ts), so no
  // "%s | AItewan" template here — that previously double-branded titles that
  // already contained "AItewan".
  title: "AItewan BioMedical Technology｜智德萬 AItewan 生醫科技",
  description:
    "Medical imaging AI for AI-assisted brain tumor contouring, DICOM workflow integration, and physician-supervised radiotherapy workflow support.",
  applicationName: "AItewan",
  keywords: [
    "AItewan",
    "DeepBT Detector-Plus",
    "brain tumor contouring",
    "AI-assisted segmentation",
    "SaMD",
    "DICOM PR",
    "DICOM RTSS",
    "TFDA",
    "FDA 510(k)",
    "radiotherapy workflow",
  ],
  authors: [{ name: site.nameEn }],
  openGraph: {
    type: "website",
    siteName: "AItewan BioMedical Technology",
    title: "AItewan BioMedical Technology",
    description:
      "AI-assisted brain tumor contouring and DICOM workflow integration for physician-supervised radiotherapy planning workflows.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-ink">{children}</body>
    </html>
  );
}
