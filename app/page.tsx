import { redirect } from "next/navigation";

/** Locale-first routing: zh-TW is the primary locale (en reserved). */
export default function RootRedirect() {
  redirect("/zh-TW");
}
