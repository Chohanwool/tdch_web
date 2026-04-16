import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PublicSermonListView from "@/components/public-sermon-list-view";
import { createPageMetadata } from "@/lib/seo";
import { getPublicSermonList } from "@/lib/sermons-api";

export const metadata: Metadata = createPageMetadata({
  title: "숏폼 설교",
  description: "The 제자교회의 짧은 말씀 클립과 숏폼 설교를 확인하실 수 있습니다.",
  path: "/sermons/shorts",
});

export default async function SermonShortsPage() {
  const sermons = await getPublicSermonList("SHORTFORM");

  if (!sermons) {
    notFound();
  }

  return <PublicSermonListView sermons={sermons} />;
}
