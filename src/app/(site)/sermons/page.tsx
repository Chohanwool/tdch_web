import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PublicSermonListView from "@/components/public-sermon-list-view";
import { createPageMetadata } from "@/lib/seo";
import { getPublicSermonList } from "@/lib/sermons-api";

export const metadata: Metadata = createPageMetadata({
  title: "설교",
  description: "The 제자교회의 롱폼 설교 말씀과 본문 요약을 확인하실 수 있습니다.",
  path: "/sermons",
});

export default async function SermonsPage() {
  const sermons = await getPublicSermonList("LONGFORM");

  if (!sermons) {
    notFound();
  }

  return <PublicSermonListView sermons={sermons} />;
}
