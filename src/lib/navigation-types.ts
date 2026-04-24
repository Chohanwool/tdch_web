export type NavigationLinkType = "INTERNAL" | "ANCHOR" | "EXTERNAL";

export interface NavigationItemDto {
  key: string;
  type?: string;
  label: string;
  href: string;
  matchPath: string | null;
  linkType: NavigationLinkType;
  contentSiteKey?: string | null;
  openInNewTab?: boolean;
  visible: boolean;
  headerVisible: boolean;
  mobileVisible: boolean;
  lnbVisible: boolean;
  breadcrumbVisible: boolean;
  defaultLanding: boolean;
}

export interface NavigationGroupDto {
  key: string;
  type?: string;
  label: string;
  href: string;
  matchPath: string | null;
  linkType: NavigationLinkType;
  contentSiteKey?: string | null;
  openInNewTab?: boolean;
  visible: boolean;
  headerVisible: boolean;
  mobileVisible: boolean;
  lnbVisible: boolean;
  breadcrumbVisible: boolean;
  defaultLandingHref: string | null;
  items: NavigationItemDto[];
}

export interface NavigationResponse {
  groups: NavigationGroupDto[];
}

export interface NavSubItem {
  key: string;
  type?: string;
  href: string;
  label: string;
  matchPath?: string | null;
  linkType: NavigationLinkType;
  contentSiteKey?: string | null;
  openInNewTab?: boolean;
  hiddenInHeader?: boolean;
  hiddenInMobile?: boolean;
  hiddenInLnb?: boolean;
  hiddenInBreadcrumb?: boolean;
  defaultLanding?: boolean;
}

export interface NavMenuGroup {
  key: string;
  type?: string;
  href: string;
  label: string;
  matchPath?: string | null;
  items: NavSubItem[];
  linkType: NavigationLinkType;
  contentSiteKey?: string | null;
  openInNewTab?: boolean;
  hiddenInHeader?: boolean;
  hiddenInMobile?: boolean;
  hiddenInLnb?: boolean;
  hiddenInBreadcrumb?: boolean;
  defaultLandingHref?: string | null;
}
