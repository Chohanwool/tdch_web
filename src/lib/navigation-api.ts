import "server-only";

import { fallbackNavigationResponse } from "@/lib/site-data";
import type { NavigationResponse, NavMenuGroup } from "@/lib/navigation-types";
import { toNavMenuGroups } from "@/lib/navigation-utils";

const DEFAULT_MEDIA_API_BASE_URL = "http://localhost:8080";
const mediaApiBaseUrl =
  process.env.MEDIA_API_BASE_URL ??
  process.env.NEXT_PUBLIC_MEDIA_API_BASE_URL ??
  DEFAULT_MEDIA_API_BASE_URL;

export async function getNavigationResponse(): Promise<NavigationResponse> {
  try {
    const response = await fetch(`${mediaApiBaseUrl}/api/v1/navigation`, {
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: 300,
      },
    });

    if (!response.ok) {
      console.warn(
        `Navigation API request failed: ${response.status} ${response.statusText}. Falling back to static navigation.`,
      );
      return fallbackNavigationResponse;
    }

    return response.json() as Promise<NavigationResponse>;
  } catch (error) {
    console.warn("Failed to fetch navigation. Falling back to static navigation.", error);
    return fallbackNavigationResponse;
  }
}

export async function getNavMenuGroups(): Promise<NavMenuGroup[]> {
  const navigation = await getNavigationResponse();
  return toNavMenuGroups(navigation);
}

export async function getNavigationGroupByKey(key: string): Promise<NavMenuGroup | undefined> {
  const groups = await getNavMenuGroups();
  return groups.find((group) => group.key === key);
}
