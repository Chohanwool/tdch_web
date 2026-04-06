import type { MetadataRoute } from "next";
import { getNavigationResponse } from "@/lib/navigation-api";
import { SITE_URL } from "@/lib/seo";

function normalizePath(href: string | null | undefined): string {
  if (!href) {
    return "";
  }

  const basePath = href.split("#")[0]?.trim() ?? "";
  if (!basePath || !basePath.startsWith("/")) {
    return "";
  }

  if (basePath === "/") {
    return "/";
  }

  return basePath.replace(/\/+$/, "");
}

function addPath(paths: Set<string>, href: string | null | undefined): void {
  const normalized = normalizePath(href);
  if (!normalized) {
    return;
  }

  paths.add(normalized);
}

function toSitemapEntry(path: string, now: Date): MetadataRoute.Sitemap[number] {
  return {
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1.0 : 0.7,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const navigation = await getNavigationResponse();
  const paths = new Set<string>(["/"]);

  for (const group of navigation.groups) {
    addPath(paths, group.defaultLandingHref ?? group.href);

    for (const item of group.items) {
      if (item.linkType === "EXTERNAL") {
        continue;
      }

      addPath(paths, item.href);
    }
  }

  return Array.from(paths)
    .sort((left, right) => {
      if (left === "/") return -1;
      if (right === "/") return 1;
      return left.localeCompare(right);
    })
    .map((path) => toSitemapEntry(path, now));
}
