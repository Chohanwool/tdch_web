import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Breadcrumb from "@/components/breadcrumb";
import PageHeader from "@/components/page-header";
import {
  generateVideoDetailMetadata,
  generateVideoListMetadata,
  parsePageParam,
  renderVideoDetailPage,
  renderVideoListPage,
} from "@/app/(site)/sermons/video-route-renderer";
import { getNavMenuGroups } from "@/lib/navigation-api";
import type { NavMenuGroup } from "@/lib/navigation-types";
import { resolveVideoRoute } from "@/lib/video-route-utils";

interface DynamicVideoRoutePageProps {
  params: Promise<{
    segments: string[];
  }>;
  searchParams?: Promise<{
    page?: string;
  }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
  searchParams,
}: DynamicVideoRoutePageProps): Promise<Metadata> {
  const { segments } = await params;
  const pathname = `/${segments.join("/")}`;
  const navMenuGroups = await getNavMenuGroups();
  const currentPage = parsePageParam((await searchParams)?.page);
  const resolvedRoute = resolveVideoRoute(pathname, navMenuGroups);

  if (resolvedRoute?.youtubeVideoId) {
    return generateVideoDetailMetadata({
      rootHref: resolvedRoute.rootHref,
      slug: resolvedRoute.siteKey,
      youtubeVideoId: resolvedRoute.youtubeVideoId,
    });
  }

  if (resolvedRoute) {
    return generateVideoListMetadata({
      rootHref: resolvedRoute.rootHref,
      slug: resolvedRoute.siteKey,
      currentPage,
    });
  }

  const videoGroup = findVideoGroupByHref(pathname, navMenuGroups);
  if (videoGroup) {
    return {
      title: videoGroup.label,
      description: `${videoGroup.label} 영상 메뉴입니다.`,
    };
  }

  return {
    title: "페이지를 찾을 수 없습니다",
    description: "요청하신 페이지를 찾을 수 없습니다.",
  };
}

export default async function DynamicVideoRoutePage({
  params,
  searchParams,
}: DynamicVideoRoutePageProps) {
  const { segments } = await params;
  const pathname = `/${segments.join("/")}`;
  const navMenuGroups = await getNavMenuGroups();
  const currentPage = parsePageParam((await searchParams)?.page);
  const videoGroup = findVideoGroupByHref(pathname, navMenuGroups);

  if (videoGroup) {
    redirect(videoGroup.defaultLandingHref ?? videoGroup.items.find((item) => item.contentSiteKey)?.href ?? videoGroup.href);
  }

  const resolvedRoute = resolveVideoRoute(pathname, navMenuGroups);
  if (!resolvedRoute) {
    notFound();
  }

  if (hasExtraRouteSegments(pathname, resolvedRoute.rootHref, Boolean(resolvedRoute.youtubeVideoId))) {
    notFound();
  }

  if (resolvedRoute.youtubeVideoId) {
    return (
      <main className="w-full md:section-shell md:section-shell--full">
        {await renderVideoDetailPage({
          rootHref: resolvedRoute.rootHref,
          slug: resolvedRoute.siteKey,
          youtubeVideoId: resolvedRoute.youtubeVideoId,
        })}
      </main>
    );
  }

  return (
    <div className="flex w-full flex-col">
      <PageHeader
        title="말씀"
        subtitle="MESSAGE"
        backgroundImageUrl="/images/main_bg/main_bg_sec1.png"
      />
      <Breadcrumb />
      <main className="section-shell section-shell--wide pt-10 md:pt-16">
        {await renderVideoListPage({
          rootHref: resolvedRoute.rootHref,
          slug: resolvedRoute.siteKey,
          currentPage,
        })}
      </main>
    </div>
  );
}

function findVideoGroupByHref(pathname: string, groups: NavMenuGroup[]): NavMenuGroup | undefined {
  return groups.find((group) => group.href === pathname && group.items.some((item) => item.contentSiteKey));
}

function hasExtraRouteSegments(pathname: string, rootHref: string, detailView: boolean): boolean {
  const normalizedPathname = pathname.replace(/\/+$/, "") || "/";
  const normalizedRootHref = rootHref.replace(/\/+$/, "") || "/";
  const remainder = normalizedPathname.slice(normalizedRootHref.length).replace(/^\/+/, "");

  if (!remainder) {
    return false;
  }

  const segments = remainder.split("/").filter(Boolean);
  return detailView ? segments.length !== 1 : segments.length > 0;
}
