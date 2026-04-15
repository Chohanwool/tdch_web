export type VideoRouteTreeNode = {
  href: string;
  contentSiteKey?: string | null;
  items?: VideoRouteTreeNode[];
};

export interface ResolvedVideoRoute {
  rootHref: string;
  siteKey: string;
  youtubeVideoId?: string;
}

function normalizeRootHref(rootHref: string): string {
  const trimmedHref = rootHref.split(/[?#]/)[0]?.trim() ?? "";
  if (!trimmedHref) {
    return "/";
  }

  const withLeadingSlash = trimmedHref.startsWith("/") ? trimmedHref : `/${trimmedHref}`;
  const normalizedHref = withLeadingSlash.replace(/\/+$/, "");
  return normalizedHref || "/";
}

function joinRootHref(rootHref: string, segment?: string): string {
  const normalizedRootHref = normalizeRootHref(rootHref);
  if (!segment) {
    return normalizedRootHref;
  }

  return normalizedRootHref === "/" ? `/${segment}` : `${normalizedRootHref}/${segment}`;
}

function matchesPathname(pathname: string, rootHref: string): boolean {
  const normalizedRootHref = normalizeRootHref(rootHref);
  return pathname === normalizedRootHref || pathname.startsWith(`${normalizedRootHref}/`);
}

function isLongerRoot(candidateRootHref: string, bestRootHref: string | undefined): boolean {
  return !bestRootHref || candidateRootHref.length > bestRootHref.length;
}

function findBestVideoRoot(
  pathname: string,
  nodes: readonly VideoRouteTreeNode[],
  best?: { rootHref: string; siteKey: string },
): { rootHref: string; siteKey: string } | undefined {
  let currentBest = best;

  for (const node of nodes) {
    const childBest = node.items?.length ? findBestVideoRoot(pathname, node.items, currentBest) : currentBest;
    if (childBest) {
      currentBest = childBest;
    }

    const siteKey = node.contentSiteKey ?? null;
    if (!siteKey || !matchesPathname(pathname, node.href)) {
      continue;
    }

    const candidateRootHref = normalizeRootHref(node.href);
    if (isLongerRoot(candidateRootHref, currentBest?.rootHref)) {
      currentBest = {
        rootHref: candidateRootHref,
        siteKey,
      };
    }
  }

  return currentBest;
}

function findRootHrefBySiteKey(
  siteKey: string,
  nodes: readonly VideoRouteTreeNode[],
  best?: string,
): string | undefined {
  let currentBest = best;

  for (const node of nodes) {
    if (node.items?.length) {
      currentBest = findRootHrefBySiteKey(siteKey, node.items, currentBest);
    }

    if (node.contentSiteKey !== siteKey) {
      continue;
    }

    const candidateRootHref = normalizeRootHref(node.href);
    if (isLongerRoot(candidateRootHref, currentBest)) {
      currentBest = candidateRootHref;
    }
  }

  return currentBest;
}

export function buildVideoListPath(rootHref: string): string {
  return normalizeRootHref(rootHref);
}

export function buildVideoDetailPath(rootHref: string, youtubeVideoId: string): string {
  return joinRootHref(rootHref, youtubeVideoId);
}

export function findVideoRootHrefBySiteKey(
  siteKey: string,
  groups: readonly VideoRouteTreeNode[],
): string | undefined {
  return findRootHrefBySiteKey(siteKey, groups);
}

export function resolveVideoRoute(
  pathname: string,
  groups: readonly VideoRouteTreeNode[],
): ResolvedVideoRoute | undefined {
  const normalizedPathname = normalizeRootHref(pathname);
  const bestRoot = findBestVideoRoot(normalizedPathname, groups);

  if (!bestRoot) {
    return undefined;
  }

  if (normalizedPathname === bestRoot.rootHref) {
    return bestRoot;
  }

  const remainder = normalizedPathname.slice(bestRoot.rootHref.length).replace(/^\/+/, "");
  const pathSegments = remainder.split("/").filter(Boolean);
  const youtubeVideoId = pathSegments[pathSegments.length - 1];

  return youtubeVideoId
    ? {
        ...bestRoot,
        youtubeVideoId,
      }
    : bestRoot;
}
