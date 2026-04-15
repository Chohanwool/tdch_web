import type { Metadata } from "next";
import {
  generateVideoDetailMetadata,
  renderVideoDetailPage,
} from "@/app/(site)/sermons/video-route-renderer";
import { buildVideoListPath } from "@/lib/video-route-utils";

interface SermonDetailRouteProps {
  params: Promise<{
    slug: string;
    youtubeVideoId: string;
  }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: SermonDetailRouteProps): Promise<Metadata> {
  const { slug, youtubeVideoId } = await params;
  return generateVideoDetailMetadata({
    rootHref: buildVideoListPath(`/sermons/${slug}`),
    slug,
    youtubeVideoId,
  });
}

export default async function SermonDetailRoute({ params }: SermonDetailRouteProps) {
  const { slug, youtubeVideoId } = await params;
  return renderVideoDetailPage({
    rootHref: buildVideoListPath(`/sermons/${slug}`),
    slug,
    youtubeVideoId,
  });
}
