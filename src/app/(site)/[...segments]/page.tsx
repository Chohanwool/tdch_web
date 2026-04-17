import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import MenuStaticPageRenderer from "@/components/menu-static-page-renderer";
import { resolvePublicMenuPath } from "@/lib/public-menu-api";
import { createPageMetadata } from "@/lib/seo";

interface DynamicRoutePageProps {
  params: Promise<{
    segments: string[];
  }>;
}

export const dynamic = "force-dynamic";

function toResolvedPath(segments: string[]): string {
  const normalizedSegments = segments.filter((segment) => segment.length > 0);
  return normalizedSegments.length > 0 ? `/${normalizedSegments.join("/")}` : "/";
}

export async function generateMetadata({
  params,
}: DynamicRoutePageProps): Promise<Metadata> {
  const { segments } = await params;
  const path = toResolvedPath(segments);
  const resolved = await resolvePublicMenuPath(path);

  if (!resolved) {
    return {
      title: "페이지를 찾을 수 없습니다",
      description: "요청하신 페이지를 찾을 수 없습니다.",
    };
  }

  return createPageMetadata({
    title: resolved.label,
    description: `${resolved.label} | The 제자교회`,
    path,
  });
}

export default async function DynamicRoutePage({
  params,
}: DynamicRoutePageProps) {
  const { segments } = await params;
  const path = toResolvedPath(segments);
  const resolved = await resolvePublicMenuPath(path);

  if (!resolved) {
    notFound();
  }

  if (resolved.redirectTo && resolved.redirectTo !== path) {
    redirect(resolved.redirectTo);
  }

  if (resolved.type === "STATIC") {
    if (!resolved.staticPageKey) {
      notFound();
    }
    return <MenuStaticPageRenderer staticPageKey={resolved.staticPageKey} />;
  }

  if (resolved.fullPath !== path) {
    redirect(resolved.fullPath);
  }

  notFound();
}
