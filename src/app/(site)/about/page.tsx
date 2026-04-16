import { redirect } from "next/navigation";
import { getNavigationGroupByKey } from "@/lib/navigation-api";
import { getCanonicalStaticPath } from "@/lib/canonical-menu-path";

export default async function AboutPage() {
  const group = await getNavigationGroupByKey("about");
  const fallback = (await getCanonicalStaticPath("about.greeting")) ?? "/";
  redirect(group?.defaultLandingHref ?? fallback);
}
