import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import PublicSermonDetailView from "@/components/public-sermon-detail-view";
import { createVideoMetadata } from "@/lib/seo";
import { getPublicSermonDetail } from "@/lib/sermons-api";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ videoId: string }>;
}): Promise<Metadata> {
  const { videoId } = await params;
  const sermon = await getPublicSermonDetail(videoId);

  if (!sermon) {
    return {};
  }

  return createVideoMetadata({
    title: sermon.title,
    description: sermon.summary || sermon.description || "The 제자교회 숏폼 설교 영상입니다.",
    path: `/sermons/shorts/${sermon.videoId}`,
    publishedTime: sermon.publishedAt ?? undefined,
  });
}

export default async function SermonShortDetailPage({
  params,
}: {
  params: Promise<{ videoId: string }>;
}) {
  const { videoId } = await params;
  const sermon = await getPublicSermonDetail(videoId);

  if (!sermon) {
    notFound();
  }

  if (sermon.contentForm !== "SHORTFORM") {
    redirect(`/sermons/${sermon.videoId}`);
  }

  return <PublicSermonDetailView sermon={sermon} />;
}
