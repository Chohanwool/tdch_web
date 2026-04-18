import "server-only";

import type { NavigationResponse, NavMenuGroup } from "@/lib/navigation-types";
import { getOrSetPublicRequestCache } from "@/lib/public-request-cache";
import { type ServerFetchInit, serverFetchJson } from "@/lib/server-fetch";
import { toNavMenuGroups } from "@/lib/navigation-utils";

const MENU_REVALIDATE_OPTIONS: NonNullable<ServerFetchInit["next"]> = {
  revalidate: 300,
  tags: ["menu"],
};

function isVideoHref(href: string): boolean {
  return href.startsWith("/videos/");
}

export async function getNavigationResponse(): Promise<NavigationResponse> {
  return getOrSetPublicRequestCache("navigation-response", () =>
    serverFetchJson<NavigationResponse>("/api/v1/public/menu", {
      next: MENU_REVALIDATE_OPTIONS,
    }),
  );
}

export async function getNavMenuGroups(): Promise<NavMenuGroup[]> {
  const navigation = await getNavigationResponse();
  return toNavMenuGroups(navigation);
}

export async function getNavigationGroupByKey(key: string): Promise<NavMenuGroup | undefined> {
  const groups = await getNavMenuGroups();
  return groups.find((group) => group.key === key);
}

export async function getVideoNavigationLandingHref(): Promise<string | null> {
  const groups = await getNavMenuGroups();
  const videoGroup = groups.find((group) => {
    if (group.defaultLandingHref && isVideoHref(group.defaultLandingHref)) {
      return true;
    }

    if (isVideoHref(group.href)) {
      return true;
    }

    return group.items.some((item) => isVideoHref(item.href));
  });

  if (!videoGroup) {
    return null;
  }

  return (
    videoGroup.defaultLandingHref ??
    videoGroup.items.find((item) => isVideoHref(item.href))?.href ??
    (isVideoHref(videoGroup.href) ? videoGroup.href : null)
  );
}
