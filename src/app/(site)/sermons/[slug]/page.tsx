import type { Metadata } from "next";
import {
  generateVideoListMetadata,
  parsePageParam,
  renderVideoListPage,
} from "@/app/(site)/sermons/video-route-renderer";
import { buildVideoListPath } from "@/lib/video-route-utils";

interface SermonListPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{
    page?: string;
  }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
  searchParams,
}: SermonListPageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const currentPage = parsePageParam(resolvedSearchParams?.page);
  return generateVideoListMetadata({
    rootHref: buildVideoListPath(`/sermons/${slug}`),
    slug,
    currentPage,
  });
}

export default async function SermonListPage({ params, searchParams }: SermonListPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const currentPage = parsePageParam(resolvedSearchParams?.page);

  return renderVideoListPage({
    rootHref: buildVideoListPath(`/sermons/${slug}`),
    slug,
    currentPage,
  });
}
