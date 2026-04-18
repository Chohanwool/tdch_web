import "server-only";

import type { MenuType } from "@/lib/admin-menu-api";
import { type ServerFetchInit, serverFetchJsonOrNull } from "@/lib/server-fetch";

const MENU_REVALIDATE_OPTIONS: NonNullable<ServerFetchInit["next"]> = {
  revalidate: 300,
  tags: ["menu"],
};

export interface PublicResolvedMenuPage {
  type: MenuType;
  label: string;
  slug: string;
  fullPath: string;
  parentLabel: string | null;
  staticPageKey: string | null;
  boardKey: string | null;
  redirectTo: string | null;
}

export async function resolvePublicMenuPath(path: string): Promise<PublicResolvedMenuPage | null> {
  return serverFetchJsonOrNull<PublicResolvedMenuPage>(
    `/api/v1/public/menu/resolve?path=${encodeURIComponent(path)}`,
    {
      next: MENU_REVALIDATE_OPTIONS,
    },
  );
}
