import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SermonArchivePage from "@/app/(site)/sermons/components/sermon-archive-page";
import ShortsArchivePage from "@/app/(site)/sermons/components/shorts-archive-page";
import {
  getMediaListStrict,
  MediaListResponse,
  MediaNotFoundError,
} from "@/lib/media-api";
import { createPageMetadata } from "@/lib/seo";

const LONG_FORM_PAGE_SIZE = 6;
const SHORT_FORM_PAGE_SIZE = 24;

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
  const path = currentPage > 1 ? `/sermons/${slug}?page=${currentPage}` : `/sermons/${slug}`;

  try {
    const preview = await getMediaListStrict(slug, 0, 1);
    return createPageMetadata({
      title: preview.menu.name,
      description: buildListDescription(preview),
      path,
    });
  } catch {
    return createPageMetadata({
      title: "예배 영상",
      description: "The 제자교회 예배 영상 아카이브입니다.",
      path,
    });
  }
}

export default async function SermonListPage({ params, searchParams }: SermonListPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const currentPage = parsePageParam(resolvedSearchParams?.page);

  const preview = await loadPreview(slug);

  if (preview.menu.contentKind === "SHORT") {
    const response = await loadShortsResponse(slug);

    return (
      <div className="pb-20">
        <ShortsArchivePage
          siteKey={slug}
          response={response}
          title={response.menu.name}
          subtitle="SHORTS"
          emptyDescription="재생목록에 영상이 쌓이면 이 페이지에 자동으로 노출됩니다."
        />
      </div>
    );
  }

  const [response, latestResponse] = await Promise.all([
    loadLongFormResponse(slug, currentPage),
    getMediaListStrict(slug, 0, 1),
  ]);

  return (
    <div className="pb-20">
      <SermonArchivePage
        siteKey={slug}
        title={response.menu.name}
        subtitle="SERMON PLAYLIST"
        description={`${response.menu.name} 예배 영상을 한곳에서 확인하실 수 있습니다. 운영 메타데이터를 추가하면 본문과 설교자 정보를 함께 더 정제해서 보여줄 수 있습니다.`}
        emptyTitle={`${response.menu.name} 영상이 아직 준비되지 않았습니다.`}
        emptyDescription="백엔드 sync 후 이 영역에서 최신 영상 목록이 자동으로 노출됩니다."
        response={response}
        showIntroCard={false}
        showLatestEmbed
        latestEmbedItem={latestResponse.items[0] ?? null}
        latestEmbedTitle="최신 영상"
        latestEmbedSubtitle="LATEST VIDEO"
        showPlaylistRows
        playlistTitle={`${response.menu.name} 목록`}
        playlistSubtitle="PLAYLIST"
        currentPage={currentPage}
      />
    </div>
  );
}

async function loadPreview(slug: string): Promise<MediaListResponse> {
  try {
    return await getMediaListStrict(slug, 0, 1);
  } catch (error) {
    if (error instanceof MediaNotFoundError) {
      notFound();
    }
    throw error;
  }
}

async function loadShortsResponse(slug: string): Promise<MediaListResponse> {
  try {
    return await getMediaListStrict(slug, 0, SHORT_FORM_PAGE_SIZE);
  } catch (error) {
    if (error instanceof MediaNotFoundError) {
      notFound();
    }
    throw error;
  }
}

async function loadLongFormResponse(slug: string, currentPage: number): Promise<MediaListResponse> {
  try {
    return await getMediaListStrict(slug, currentPage - 1, LONG_FORM_PAGE_SIZE);
  } catch (error) {
    if (error instanceof MediaNotFoundError) {
      notFound();
    }
    throw error;
  }
}

function buildListDescription(response: MediaListResponse): string {
  return response.menu.contentKind === "SHORT"
    ? `${response.menu.name} 쇼츠 콘텐츠를 확인하실 수 있습니다.`
    : `${response.menu.name} 예배 영상을 확인하실 수 있습니다.`;
}

function parsePageParam(page: string | undefined): number {
  const parsed = Number(page);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1;
  }

  return Math.floor(parsed);
}
