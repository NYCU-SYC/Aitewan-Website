import Link from "next/link";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Static-export friendly locale landing page for GitHub Pages. */
export default function RootPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-soft px-6 text-center text-ink">
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace("${basePath}/zh-TW/");`,
        }}
      />
      <div>
        <h1 className="text-2xl font-bold text-brand-900">智德萬生醫科技</h1>
        <p className="mt-3 text-sm text-ink-soft">
          Redirecting to the Traditional Chinese website.
        </p>
        <Link
          href="/zh-TW"
          className="mt-6 inline-flex h-11 items-center rounded-full bg-brand-700 px-5 text-sm font-medium text-white transition-colors hover:bg-brand-800"
        >
          前往網站
        </Link>
      </div>
    </main>
  );
}
