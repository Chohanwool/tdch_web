import type { NavigationResponse, NavMenuGroup, NavSubItem } from "@/lib/navigation-types";

function normalizePath(path: string | null | undefined): string {
  if (!path) {
    return "";
  }

  return path.split("#")[0] ?? path;
}

export function toNavMenuGroups(navigation: NavigationResponse): NavMenuGroup[] {
  return navigation.groups.map((group) => ({
    key: group.key,
    href: group.href,
    label: group.label,
    matchPath: group.matchPath,
    linkType: group.linkType,
    contentSiteKey: group.contentSiteKey,
    hiddenInHeader: !group.headerVisible,
    hiddenInMobile: !group.mobileVisible,
    hiddenInLnb: !group.lnbVisible,
    hiddenInBreadcrumb: !group.breadcrumbVisible,
    defaultLandingHref: group.defaultLandingHref,
    items: group.items.map((item) => ({
      key: item.key,
      href: item.href,
      label: item.label,
      matchPath: item.matchPath,
      contentSiteKey: item.contentSiteKey,
      linkType: item.linkType,
      hiddenInHeader: !item.headerVisible,
      hiddenInMobile: !item.mobileVisible,
      hiddenInLnb: !item.lnbVisible,
      hiddenInBreadcrumb: !item.breadcrumbVisible,
      defaultLanding: item.defaultLanding,
    })),
  }));
}

export function matchesNavigationPath(pathname: string, path: string | null | undefined): boolean {
  const normalizedPath = normalizePath(path);
  if (!normalizedPath) {
    return false;
  }

  return pathname === normalizedPath || pathname.startsWith(`${normalizedPath}/`);
}

export function findMatchedNavigationGroup(
  pathname: string,
  groups: NavMenuGroup[],
): NavMenuGroup | undefined {
  return groups.find((group) => {
    const matchesGroup = matchesNavigationPath(pathname, group.matchPath ?? group.href);
    const matchesItem = group.items.some((item) => matchesNavigationPath(pathname, item.matchPath ?? item.href));

    return matchesGroup || matchesItem;
  });
}

export function findMatchedNavigationItem(
  pathname: string,
  group: NavMenuGroup | undefined,
): NavSubItem | undefined {
  return group?.items.find((item) => matchesNavigationPath(pathname, item.matchPath ?? item.href));
}
