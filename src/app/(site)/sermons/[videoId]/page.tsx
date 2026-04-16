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
    description: sermon.summary || sermon.description || "The 제자교회 설교 영상입니다.",
    path: `/sermons/${sermon.videoId}`,
    publishedTime: sermon.publishedAt ?? undefined,
  });
}

export default async function SermonDetailPage({
  params,
}: {
  params: Promise<{ videoId: string }>;
}) {
  const { videoId } = await params;
  const sermon = await getPublicSermonDetail(videoId);

  if (!sermon) {
    notFound();
  }

  if (sermon.contentForm === "SHORTFORM") {
    redirect(`/sermons/shorts/${sermon.videoId}`);
  }

  return <PublicSermonDetailView sermon={sermon} />;
}
