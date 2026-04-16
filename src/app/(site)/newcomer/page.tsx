import { redirect } from "next/navigation";
import { getNavigationGroupByKey } from "@/lib/navigation-api";
import { getCanonicalStaticPath } from "@/lib/canonical-menu-path";

export default async function NewcomerPage() {
  const group = await getNavigationGroupByKey("newcomer");
  const fallback = (await getCanonicalStaticPath("newcomer.guide")) ?? "/";
  redirect(group?.defaultLandingHref ?? fallback);
}
